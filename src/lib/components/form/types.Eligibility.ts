import { State } from '$comps/app/types.state.svelte'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj.svelte'
import {
	arrayOfClass,
	DataManager,
	DataManagerNode,
	DataObj,
	type DataRecord,
	getArray,
	isPlainObject,
	memberOfEnum,
	nbrOptional,
	nbrRequired,
	recordValueGet,
	recordValueSet,
	required,
	strOptional,
	strRequired,
	valueOrDefault,
	MethodResult
} from '$utils/types'
import { Field, PropsFieldInit } from '$comps/form/field.svelte'
import { DbTableQueryGroup } from '$lib/queryClient/types.queryClient'
import { clientQueryExpr } from '$lib/queryClient/types.queryClient'
import { FieldAccess } from '$comps/form/field.svelte'
import { FieldToggle } from '$comps/form/fieldToggle'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/dataObj/types.eligibility.ts'

export class Eligibility {
	description: string
	fields: Field[] = []
	header: string
	name: string
	nodes: EligibilityNode[]
	propEligibilityData: string = 'eligibilityData'
	propEligibilityStatus: string = 'valueBoolean'
	rawProps: RawDataObjPropDisplay[] = []
	sm: State
	tableGroup: DbTableQueryGroup = new DbTableQueryGroup([])
	tree: EligibilityNode[]
	constructor(obj: any) {
		const clazz = 'Eligibility'
		obj = valueOrDefault(obj, {})
		this.description = strRequired(obj.description, clazz, 'description')
		this.header = strRequired(obj.header, clazz, 'header')
		this.name = strRequired(obj.name, clazz, 'name')
		this.nodes = arrayOfClass(EligibilityNode, obj._nodes)
		this.sm = required(obj.sm, clazz, 'sm')

		// derived
		this.setDependencies()
		this.tree = this.buildTree(this.nodes)
		this.rawProps = this.buildProps(this.tree)
		this.fields = this.initFields(this.rawProps)
	}

	setDependencies() {
		this.nodes.forEach((node) => {
			if (node.nodeIdxDependent) {
				const parentName = `nodeProp${node.nodeIdxDependent}`
				const parent = this.nodes.find((n) => n.name === parentName)
				if (parent) {
					parent.dependents.push(node.name)
				}
			}
		})
	}

	buildProps(tree: EligibilityNode[]): RawDataObjPropDisplay[] {
		let nodeIdxCounter = -1
		const buildPropsAdd = (obj: any) => {
			nodeIdxCounter++
			const config = {
				_codeAccess: obj._codeAccess,
				_codeFieldElement: obj._codeFieldElement,
				_column: {
					_codeDataType: obj._codeDataType || 'none',
					description: obj.description || '',
					header: obj.header || obj.name,
					name: obj.name
				},
				_itemChanges: obj._itemChanges,
				_propName: obj.name,
				headerAlt: obj.header || obj.name,
				id: `dynamic_raw_prop_${obj.name}_${nodeIdxCounter}`,
				isDisplay: true,
				isDisplayable: true,
				orderDefine: nodeIdxCounter * 10,
				propNameKeyPrefix: obj.propNameKeyPrefix,
				propNameKeySuffix: obj.propNameKeySuffix
			}
			const propRaw = new RawDataObjPropDisplay(config, this.tableGroup)
			rawProps.push(propRaw)
		}

		const buildPropsAddSectionEnd = () => {
			return buildPropsAdd({
				_codeDataType: 'none',
				_codeFieldElement: 'tagSection',
				name: 'custom_section_end'
			})
		}

		const buildPropsAddSectionStart = (obj: any) => {
			return buildPropsAdd({
				_codeDataType: 'none',
				_codeFieldElement: 'tagSection',
				header: obj.header,
				name: 'custom_section_start'
			})
		}

		const buildPropsAddToggle = (node: EligibilityNode) => {
			node.setPropNameKey(this.propEligibilityData, this.propEligibilityStatus)

			const getItemChanges = () => {
				let itemChanges: DataRecord[] = []
				if (node.dependents.length > 0) {
					itemChanges = [
						{
							_codeAccess: 'required',
							_codeItemChangeAction: 'none',
							_codeItemChangeTriggerType: 'itemChangeTypeOp',
							_codeOp: 'true',
							_columns: node.dependents,
							orderDefine: 0
						},
						{
							_codeAccess: 'readOnly',
							_codeItemChangeAction: 'setScalar',
							_codeItemChangeTriggerType: 'itemChangeTypeOp',
							_codeOp: 'false',
							_columns: node.dependents,
							orderDefine: 1,
							valueTargetScalar: 'false'
						}
					]
				}
				return itemChanges
			}

			return buildPropsAdd({
				_codeAccess: node.exprState ? FieldAccess.readonly : FieldAccess.required,
				// _codeAccess: FieldAccess.required,
				_codeDataType: 'bool',
				_codeFieldElement: 'toggle',
				_itemChanges: getItemChanges(),
				description: node.description,
				exprPreset: node.exprState,
				header: node.header + (node.exprState ? ' (computed)' : ''),
				name: node.name,
				propNameKeyPrefix: node.propNameKeyPrefix,
				propNameKeySuffix: node.propNameKeySuffix
			})
		}

		const build = (node: EligibilityNode | undefined) => {
			if (!node) return

			// Process the current node
			switch (node.codeEligibilityType) {
				case EligibilityType.eligibilityGroupAnd:
				case EligibilityType.eligibilityGroupOr:
					buildPropsAddSectionStart({ header: node.header })
					break

				case EligibilityType.eligibilityExpr:
				case EligibilityType.eligibilityManual:
					buildPropsAddToggle(node)
			}

			// Recursively traverse child nodes
			if (node.children && node.children.length > 0) {
				node.children.forEach((child) => build(child))
				buildPropsAddSectionEnd()
			}
		}

		const rawProps: RawDataObjPropDisplay[] = []
		tree.forEach((rootNode) => {
			build(rootNode)
		})
		return rawProps
	}

	buildTree(nodes: EligibilityNode[]): EligibilityNode[] {
		const nodeMap = new Map<number, EligibilityNode>()
		const rootNodes: EligibilityNode[] = []

		// First pass: create all nodes and store them in a map
		nodes.forEach((node) => {
			nodeMap.set(node.nodeIdx, node)
		})

		// Second pass: build parent-child relationships
		nodes.forEach((node) => {
			const treeNode = nodeMap.get(node.nodeIdx)!

			if (node.nodeIdxParent === undefined || node.nodeIdxParent === null) {
				// Root node
				rootNodes.push(treeNode)
			} else {
				// Child node - find parent and add to its children
				const parent = nodeMap.get(node.nodeIdxParent)
				if (parent) {
					parent.children.push(treeNode)
				}
			}
		})

		// Third pass: sort children by order property
		const sortNodesByOrder = (nodes: EligibilityNode[]): EligibilityNode[] => {
			return nodes.sort((a, b) => (a.order || 0) - (b.order || 0))
		}

		// Sort root nodes by order
		sortNodesByOrder(rootNodes)

		// Recursively sort children at each level
		const sortChildrenRecursively = (node: EligibilityNode): void => {
			if (node.children && node.children.length > 0) {
				sortNodesByOrder(node.children)
				node.children.forEach(sortChildrenRecursively)
			}
		}

		rootNodes.forEach(sortChildrenRecursively)

		return rootNodes
	}

	callbackSetFieldValue = async (
		dm: DataManager,
		dataObjId: string,
		row: number,
		field: Field
	): Promise<void> => {
		const clazz = 'Eligibility.callbackSetFieldValue'
		const dmn: DataManagerNode = required(dm.getNode(dataObjId), clazz, 'dmn')
		const eligibilityData: EligibilityNodeValues = recordValueGet(
			dmn.recordsDisplay[row],
			this.propEligibilityData
		)
		const eligibilityStatusValue = this.evalEligibilityStatus(eligibilityData)
		const eligibilityStatusField = dmn.dataObj.getField(this.propEligibilityStatus)
		await dmn.setFieldValAsync(row, eligibilityStatusField, eligibilityStatusValue)
	}

	evalEligibilityStatus(eligibilityData: EligibilityNodeValues): boolean {
		const getExpr = (eligibilityData: EligibilityNodeValues): string => {
			const computeExprNode = (
				node: EligibilityNode,
				eligibilityData: EligibilityNodeValues
			): string => {
				const getValue = (
					node: EligibilityNode,
					eligibilityData: EligibilityNodeValues
				): string => {
					const key = node.name + '.valueBoolean'
					const value = recordValueGet(eligibilityData, key)
					return value ? value.toString() : 'false' // temp - should not consider groups
				}

				switch (node.codeEligibilityType) {
					case EligibilityType.eligibilityExpr:
					case EligibilityType.eligibilityManual:
						return getValue(node, eligibilityData)

					case EligibilityType.eligibilityGroupAnd:
						if (node.children.length === 0) {
							return 'true' // Empty AND group is true
						}
						if (node.children.length === 1) {
							return computeExprNode(node.children[0], eligibilityData)
						}
						const andExpressions = node.children.map((child) =>
							computeExprNode(child, eligibilityData)
						)
						return `(${andExpressions.join(' && ')})`

					case EligibilityType.eligibilityGroupOr:
						if (node.children.length === 0) {
							return 'false' // Empty OR group is false
						}
						if (node.children.length === 1) {
							return computeExprNode(node.children[0], eligibilityData)
						}
						const orExpressions = node.children.map((child) =>
							computeExprNode(child, eligibilityData)
						)
						return `(${orExpressions.join(' || ')})`

					default:
						return 'true' // Default fallback
				}
			}

			// setEligibility
			if (this.tree.length === 0) {
				return 'true'
			}

			// If multiple root nodes, combine with AND
			if (this.tree.length === 1) {
				return computeExprNode(this.tree[0], eligibilityData)
			} else {
				const expressions = this.tree.map((node) => computeExprNode(node, eligibilityData))
				return `(${expressions.join(' && ')})`
			}
		}
		// evaluate eligibility status
		return eval(getExpr(eligibilityData))
	}

	async getDataExpr(props: PropsFieldInit, expr: string): Promise<MethodResult> {
		const clazz = 'Eligibility.getData'
		let result: MethodResult = await clientQueryExpr(clazz, expr, {}, props.sm)
		if (result.error) return result
		const rawData = result.data.rawDataList[0]
		return new MethodResult(rawData)
	}

	getPropExpr(eligTypes: EligibilityType[]) {
		let expr = ''
		this.nodes.forEach((node) => {
			if (eligTypes.includes(node.codeEligibilityType)) {
				if (expr) expr += ', '
				expr += this.getPropExprNode(node, node.exprState || '(SELECT false)')
			}
		})
		return `SELECT ${expr ? `{${expr}}` : `<json>{}`}`
	}

	getPropExprNode = (node: EligibilityNode, value: any) => {
		return `${node.name} := { id := <uuid>'${node.id}', valueBoolean := ${value} }`
	}

	getNode(id: string): EligibilityNode | undefined {
		return this.nodes.find((n) => n.id === id)
	}

	getNodeName(id: string): string {
		const node = this.getNode(id)
		return node ? node.name : ''
	}

	initFields(rawProps: RawDataObjPropDisplay[]) {
		const clazz = `${FILENAME}.FieldEmbedDetail.initFields`
		const propsFieldInit = new PropsFieldInit({ sm: this.sm })
		let fields: Field[] = []
		for (let i = 0; i < rawProps.length; i++) {
			const p: RawDataObjPropDisplay = rawProps[i]
			let result: MethodResult = DataObj.fieldsCreateItem(propsFieldInit, p)
			if (result.error) return fields
			const field: Field = result.data
			if (field instanceof FieldToggle) {
				field.callbackSetFieldValue = this.callbackSetFieldValue
			}
			fields.push(field)
		}
		DataObj.loadItemChangedTriggers(fields)
		return fields
	}

	async retrieve(props: PropsFieldInit, csfId: string): Promise<MethodResult> {
		let result: MethodResult

		const getDataCombined = (
			dataExisting: EligibilityNodeItem[],
			dataExpr: EligibilityNodeValues
		): EligibilityNodeValues => {
			// remove data from existing that is not among the nodes of the current eligibility
			for (let i = dataExisting.length - 1; i >= 0; i--) {
				const item = dataExisting[i]
				if (!this.nodes.some((node) => node.id === item.id)) {
					dataExisting.splice(i, 1)
				}
			}

			const dataCombined = dataExisting.reduce(
				(accumulator: EligibilityNodeValues, currentNode: EligibilityNodeItem) => {
					const nodeKey = this.getNodeName(currentNode.id)
					accumulator[nodeKey] = currentNode
					return accumulator
				},
				{ ...dataExpr }
			)

			// preset manual values
			this.nodes
				.filter((node) => {
					return node.codeEligibilityType === EligibilityType.eligibilityManual
				})
				.forEach((node) => {
					const nodeKey = this.getNodeName(node.id)
					if (!Object.hasOwn(dataCombined, nodeKey)) {
						dataCombined[nodeKey] = { id: node.id, valueBoolean: false }
					}
				})

			return dataCombined
		}

		const getDataCsf = async (): Promise<MethodResult> => {
			const exprExisting = `SELECT app_cm::CmCsfEligibility {eligibilityData} FILTER .csf.id = <uuid>'${csfId}'`
			let result = await this.getDataExpr(props, exprExisting)
			if (result.error) return result
			const data = result.data
			return isPlainObject(data) && Object.entries(data).length > 0
				? new MethodResult(data.eligibilityData)
				: new MethodResult([])
		}

		const getDataExpr = async (): Promise<MethodResult> => {
			const expr = this.getPropExpr([EligibilityType.eligibilityExpr])
			return await this.getDataExpr(props, expr)
		}

		// getDataExisting
		// -- data csf
		result = await getDataCsf()
		if (result.error) return result
		const dataExisting: EligibilityNodeItem[] = result.data

		// -- data from expression
		result = await getDataExpr()
		if (result.error) return result
		const dataExpr = result.data

		// -- data combined
		const eligibilityData: EligibilityNodeValues = getDataCombined(dataExisting, dataExpr)
		props.data.rowsRetrieved.setDetailRecordValue(this.propEligibilityData, eligibilityData)

		// set status
		const eligibilityStatus = this.evalEligibilityStatus(eligibilityData)
		props.data.rowsRetrieved.setDetailRecordValue(this.propEligibilityStatus, eligibilityStatus)

		return new MethodResult()
	}

	treeDisplay(tree: EligibilityNode[]): string {
		const lines: string[] = []
		const displayNode = (
			node: EligibilityNode,
			prefix: string = '',
			isLast: boolean = true
		): void => {
			// Create the current line with tree visualization characters
			const connector = isLast ? '└── ' : '├── '
			lines.push(`${prefix}${connector}${node.name} (ID: ${node.nodeIdx})`)

			// Prepare prefix for children
			const childPrefix = prefix + (isLast ? '    ' : '│   ')

			// Display children
			if (node.children && node.children.length > 0) {
				node.children.forEach((child, index) => {
					const isLastChild = index === node.children.length - 1
					displayNode(child, childPrefix, isLastChild)
				})
			}
		}

		// Display all root nodes
		tree.forEach((rootNode, index) => {
			const isLastRoot = index === tree.length - 1
			displayNode(rootNode, '', isLastRoot)
		})

		return lines.join('\n')
	}
}

export class EligibilityNode {
	children: EligibilityNode[] = []
	codeEligibilityType: EligibilityType
	dependents: string[] = []
	description?: string
	exprState?: string
	header: string
	id: string
	name: string
	nodeIdx: number
	nodeIdxDependent?: number
	nodeIdxParent?: number
	order: number
	propNameKey?: string
	propNameKeyPrefix?: string
	propNameKeySuffix?: string
	constructor(obj: any) {
		const clazz = 'EligibilityNode'
		obj = valueOrDefault(obj, {})
		this.codeEligibilityType = memberOfEnum(
			obj._codeEligibilityType,
			clazz,
			'codeEligibilityType',
			'EligibilityType',
			EligibilityType
		)
		this.description = strOptional(obj.description, clazz, 'description')
		this.exprState = strOptional(obj.exprState, clazz, 'exprState')
		this.header = strRequired(obj.header, clazz, 'header')
		this.id = strRequired(obj.id, clazz, 'id')
		this.nodeIdx = nbrRequired(obj.nodeIdx, clazz, 'nodeIdx')
		this.nodeIdxDependent = nbrOptional(obj.nodeIdxDependent, clazz, 'nodeIdxDependent')
		this.nodeIdxParent = nbrOptional(obj.nodeIdxParent, clazz, 'nodeIdxParent')
		this.order = nbrRequired(obj.order, clazz, 'order')

		// derived properties
		this.name = this.getNodeName(this.nodeIdx)
	}

	getNodeName(id: number): string {
		return `nodeProp${id}`
	}
	setPropNameKey(prefix: string, suffix: string) {
		this.propNameKeyPrefix = prefix
		this.propNameKeySuffix = suffix
		this.propNameKey = `${this.propNameKeyPrefix}.${this.name}.${this.propNameKeySuffix}`
	}
}

export type EligibilityNodeItem = {
	id: string
	valueBoolean: boolean
}

export type EligibilityNodeItemClient = {
	[key: string]: EligibilityNodeItem
}

export type EligibilityNodeValues = Record<string, EligibilityNodeItem>

export enum EligibilityType {
	eligibilityManual = 'eligibilityManual',
	eligibilityExpr = 'eligibilityExpr',
	eligibilityGroupAnd = 'eligibilityGroupAnd',
	eligibilityGroupOr = 'eligibilityGroupOr'
}
