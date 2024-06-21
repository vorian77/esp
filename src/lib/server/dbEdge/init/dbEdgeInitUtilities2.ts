import { createClient } from 'edgedb'
import e, { is } from '$lib/dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'
import {
	booleanOrDefaultJSON,
	booleanOrDefaultParm,
	sectionHeader
} from '$server/dbEdge/init/dbEdgeInitUtilities1'

const client = createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export async function execute(query: string) {
	await client.execute(query)
}

export async function review(file: string, query: string) {
	if (!query) return
	const result = await client.query(query)
	console.log()
	console.log(`${file}.review...`)
	console.log('query:', query)
	console.log('result:', result)
	console.log()
}

export async function addAnalytic(data: any) {
	sectionHeader(`addAnalytic - ${data.name}`)
	const query = e.params(
		{
			description: e.optional(e.str),
			header: e.optional(e.str),
			name: e.str,
			owner: e.str,
			parms: e.optional(e.array(e.json)),
			statuses: e.optional(e.array(e.json))
		},
		(p) => {
			return e.insert(e.sys_rep.SysAnalytic, {
				createdBy: e.select(e.sys_user.getRootUser()),
				description: p.description,
				header: p.header,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				owner: e.select(e.sys_core.getEnt(p.owner)),
				parms: e.for(e.array_unpack(p.parms), (p) => {
					return e.insert(e.sys_rep.SysRepParm, {
						codeParmType: e.select(
							e.sys_core.getCode(
								'ct_sys_do_field_parm_type',
								e.cast(e.str, e.json_get(p, 'codeParmType'))
							)
						),
						createdBy: e.select(e.sys_user.getRootUser()),
						description: e.cast(e.str, e.json_get(p, 'description')),
						fieldListItems: e.select(
							e.sys_core.getDataObjFieldListItems(e.cast(e.str, e.json_get(p, 'fieldListItems')))
						),
						fieldListItemsParmName: e.cast(e.str, e.json_get(p, 'fieldListItemsParmName')),
						header: e.cast(e.str, e.json_get(p, 'header')),
						isMultiSelect: e.cast(e.bool, e.json_get(p, 'isMultiSelect')),
						isRequired: e.cast(e.bool, e.json_get(p, 'isRequired')),
						linkTable: e.select(e.sys_db.getTable(e.cast(e.str, e.json_get(p, 'linkTable')))),
						modifiedBy: e.select(e.sys_user.getRootUser()),
						name: e.cast(e.str, e.json_get(p, 'name')),
						orderDefine: e.cast(e.int16, e.json_get(p, 'orderDefine'))
					})
				}),
				statuses: e.for(e.array_unpack(p.statuses), (s) => {
					return e.insert(e.sys_rep.SysAnalyticStatus, {
						codeStatus: e.select(
							e.sys_core.getCode(
								'ct_sys_rep_analytic_status',
								e.cast(e.str, e.json_get(s, 'codeStatus'))
							)
						),
						comment: e.cast(e.str, e.json_get(s, 'comment')),
						createdBy: e.select(e.sys_user.getRootUser()),
						expr: e.cast(e.str, e.json_get(s, 'expr')),
						modifiedBy: e.select(e.sys_user.getRootUser())
					})
				})
			})
		}
	)
	return await query.run(client, data)
}

export async function addCode(data: any) {
	const query = e.params(
		{
			owner: e.str,
			codeType: e.str,
			parent: e.optional(e.json),
			header: e.optional(e.str),
			name: e.str,
			order: e.int16,
			valueDecimal: e.optional(e.float64),
			valueInteger: e.optional(e.int64),
			valueString: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.sys_core.SysCode, {
				owner: e.select(e.sys_core.getEnt(p.owner)),
				codeType: e.select(e.sys_core.getCodeType(p.codeType)),
				parent: e.select(
					e.sys_core.getCode(
						e.cast(e.str, e.json_get(p.parent, 'codeType')),
						e.cast(e.str, e.json_get(p.parent, 'code'))
					)
				),
				header: p.header,
				name: p.name,
				order: p.order,
				valueDecimal: p.valueDecimal,
				valueInteger: p.valueInteger,
				valueString: p.valueString,
				createdBy: e.select(e.sys_user.getRootUser()),
				modifiedBy: e.select(e.sys_user.getRootUser())
			})
		}
	)
	return await query.run(client, data)
}

export async function addCodeType(data: any) {
	const query = e.params(
		{
			owner: e.str,
			parent: e.optional(e.str),
			header: e.optional(e.str),
			name: e.str,
			order: e.int16
		},
		(p) => {
			return e.insert(e.sys_core.SysCodeType, {
				owner: e.select(e.sys_core.getEnt(p.owner)),
				parent: e.select(e.sys_core.getCodeType(p.parent)),
				header: p.header,
				name: p.name,
				order: p.order,
				createdBy: e.select(e.sys_user.getRootUser()),
				modifiedBy: e.select(e.sys_user.getRootUser())
			})
		}
	)
	return await query.run(client, data)
}

export async function addColumn(data: any) {
	sectionHeader(`addColumn - ${data.name}`)
	const query = e.params(
		{
			classProps: e.optional(e.str),
			codeAlignment: e.optional(e.str),
			codeDataType: e.str,
			exprSelect: e.optional(e.str),
			exprStorageKey: e.optional(e.str),
			header: e.str,
			headerSide: e.optional(e.str),
			isExcludeInsert: e.optional(e.bool),
			isExcludeSelect: e.optional(e.bool),
			isExcludeUpdate: e.optional(e.bool),
			isMultiSelect: e.optional(e.bool),
			isNonData: e.optional(e.bool),
			isSelfReference: e.optional(e.bool),
			matchColumn: e.optional(e.str),
			maxLength: e.optional(e.int16),
			maxValue: e.optional(e.float64),
			minLength: e.optional(e.int16),
			minValue: e.optional(e.float64),
			name: e.str,
			owner: e.str,
			pattern: e.optional(e.str),
			patternMsg: e.optional(e.str),
			patternReplacement: e.optional(e.str),
			placeHolder: e.optional(e.str),
			spinStep: e.optional(e.str),
			togglePresetTrue: e.optional(e.bool),
			toggleValueFalse: e.optional(e.str),
			toggleValueShow: e.optional(e.bool),
			toggleValueTrue: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.sys_db.SysColumn, {
				owner: e.select(e.sys_core.getEnt(p.owner)),
				classProps: p.classProps,
				codeAlignment: e.select(
					e.sys_core.getCode(
						'ct_db_col_alignment',
						e.op(p.codeAlignment, 'if', e.op('exists', p.codeAlignment), 'else', 'left')
					)
				),
				codeDataType: e.sys_core.getCode('ct_db_col_data_type', p.codeDataType),
				createdBy: e.select(e.sys_user.getRootUser()),
				exprStorageKey: p.exprStorageKey,
				header: p.header,
				headerSide: p.headerSide,
				isExcludeInsert: booleanOrDefaultParm(p.isExcludeInsert, false),
				isExcludeSelect: booleanOrDefaultParm(p.isExcludeSelect, false),
				isExcludeUpdate: booleanOrDefaultParm(p.isExcludeUpdate, false),
				isMultiSelect: booleanOrDefaultParm(p.isMultiSelect, false),
				isNonData: booleanOrDefaultParm(p.isNonData, false),
				isSelfReference: booleanOrDefaultParm(p.isSelfReference, false),
				matchColumn: p.matchColumn,
				maxLength: p.maxLength,
				maxValue: p.maxValue,
				minLength: p.minLength,
				minValue: p.minValue,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				pattern: p.pattern,
				patternMsg: p.patternMsg,
				patternReplacement: p.patternReplacement,
				placeHolder: p.placeHolder,
				spinStep: p.spinStep,
				togglePresetTrue: p.togglePresetTrue,
				toggleValueFalse: p.toggleValueFalse,
				toggleValueShow: p.toggleValueShow,
				toggleValueTrue: p.toggleValueTrue
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObj(data: any) {
	sectionHeader(`addDataObj - ${data.name}`)

	const actionsQuery = data.actionsQuery && data.actionsQuery.length > 0 ? data.actionsQuery : []

	const query = e.params(
		{
			actionFieldGroup: e.optional(e.str),
			actionsQuery: e.optional(e.array(e.json)),
			codeCardinality: e.str,
			codeComponent: e.str,
			codeListEditPresetType: e.optional(e.str),
			description: e.optional(e.str),
			exprFilter: e.optional(e.str),
			exprObject: e.optional(e.str),
			exprSort: e.optional(e.str),
			fields: e.optional(e.array(e.json)),
			header: e.optional(e.str),
			isAlwaysRetrieveData: e.optional(e.bool),
			isAlwaysRetrieveDataObject: e.optional(e.bool),
			isListEdit: e.optional(e.bool),
			isListHideSearch: e.optional(e.bool),
			listEditPresetExpr: e.optional(e.str),
			listReorderColumn: e.optional(e.str),
			name: e.str,
			owner: e.str,
			parentColumn: e.optional(e.str),
			parentFilterExpr: e.optional(e.str),
			parentTable: e.optional(e.str),
			processType: e.optional(e.str),
			subHeader: e.optional(e.str),
			tables: e.optional(e.array(e.json)),
			withs: e.optional(e.array(e.json))
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObj, {
				actionFieldGroup: e.select(e.sys_core.getDataObjActionFieldGroup(p.actionFieldGroup)),
				actionsQuery: e.for(e.array_unpack(p.actionsQuery), (a) => {
					return e.insert(e.sys_core.SysDataObjActionQuery, {
						name: e.cast(e.str, e.json_get(a, 'name')),
						createdBy: e.select(e.sys_user.getRootUser()),
						modifiedBy: e.select(e.sys_user.getRootUser()),
						parms: e.for(e.array_unpack(e.cast(e.array(e.json), e.json_get(a, 'parms'))), (p) => {
							return e.insert(e.sys_core.SysDataObjActionQueryParm, {
								createdBy: e.select(e.sys_user.getRootUser()),
								key: e.cast(e.str, e.json_get(p, 'key')),
								modifiedBy: e.select(e.sys_user.getRootUser()),
								value: e.cast(e.str, e.json_get(p, 'value'))
							})
						}),
						triggers: e.for(
							e.array_unpack(e.cast(e.array(e.json), e.json_get(a, 'triggers'))),
							(t) => {
								return e.insert(e.sys_core.SysDataObjActionQueryTrigger, {
									codeQueryType: e.select(
										e.sys_core.getCode(
											'ct_sys_do_query_type',
											e.cast(e.str, e.json_get(t, 'codeQueryType'))
										)
									),
									codeTriggerTiming: e.select(
										e.sys_core.getCode(
											'ct_sys_do_action_query_trigger_timing',
											e.cast(e.str, e.json_get(t, 'codeTriggerTiming'))
										)
									),
									createdBy: e.select(e.sys_user.getRootUser()),
									modifiedBy: e.select(e.sys_user.getRootUser())
								})
							}
						)
					})
				}),
				codeCardinality: e.select(e.sys_core.getCode('ct_sys_do_cardinality', p.codeCardinality)),
				codeComponent: e.select(e.sys_core.getCode('ct_sys_do_component', p.codeComponent)),
				codeListEditPresetType: e.select(
					e.sys_core.getCode('ct_sys_do_list_edit_preset_type', p.codeListEditPresetType)
				),
				columns: e.for(e.array_unpack(p.fields), (f) => {
					return e.insert(e.sys_core.SysDataObjColumn, {
						column: e.select(e.sys_db.getColumn(e.cast(e.str, e.json_get(f, 'columnName')))),

						/* DB */
						codeDbDataOp: e.sys_core.getCode(
							'ct_sys_do_field_op',
							e.cast(e.str, e.json_get(f, 'codeDbDataOp'))
						),

						codeDbDataSourceValue: e.op(
							e.sys_core.getCode(
								'ct_sys_do_field_source_value',
								e.cast(e.str, e.json_get(f, 'codeDbDataSourceValue'))
							),
							'if',
							e.op('exists', e.cast(e.str, e.json_get(f, 'codeDbDataSourceValue'))),
							'else',
							e.sys_core.getCode('ct_sys_do_field_source_value', 'edgeDB')
						),

						codeSortDir: e.select(
							e.sys_core.getCode(
								'ct_sys_do_field_sort_dir',
								e.cast(e.str, e.json_get(f, 'codeSortDir'))
							)
						),

						exprCustom: e.cast(e.str, e.json_get(f, 'exprCustom')),

						exprPreset: e.cast(e.str, e.json_get(f, 'exprPreset')),

						indexTable: e.cast(e.int16, e.json_get(f, 'indexTable')),

						isDisplayable: e.cast(e.bool, e.json_get(f, 'isDisplayable')),

						isExcludeInsert: booleanOrDefaultJSON(f, 'isExcludeInsert', false),

						isExcludeSelect: booleanOrDefaultJSON(f, 'isExcludeSelect', false),

						isExcludeUpdate: booleanOrDefaultJSON(f, 'isExcludeUpdate', false),

						linkColumns: e.for(
							e.enumerate(e.array_unpack(e.cast(e.array(e.str), e.json_get(f, 'linkColumns')))),
							(c) => {
								return e.insert(e.sys_core.SysDataObjColumnLink, {
									column: e.select(e.sys_db.getColumn(c[1])),
									orderDefine: c[0],
									createdBy: e.select(e.sys_user.getRootUser()),
									modifiedBy: e.select(e.sys_user.getRootUser())
								})
							}
						),
						linkExprPreset: e.cast(e.str, e.json_get(f, 'linkExprPreset')),
						linkExprSave: e.cast(e.str, e.json_get(f, 'linkExprSave')),
						linkExprSelect: e.cast(e.str, e.json_get(f, 'linkExprSelect')),
						linkTable: e.select(
							e.sys_db.getTable(
								e.op(
									'SysUser',
									'if',
									e.op(
										e.cast(e.str, e.json_get(f, 'columnName')),
										'in',
										e.set('createdBy', 'modifiedBy')
									),
									'else',
									e.cast(e.str, e.json_get(f, 'linkTable'))
								)
							)
						),
						orderSort: e.cast(e.int16, e.json_get(f, 'orderSort')),

						/* Element */
						codeAccess: e.select(
							e.sys_core.getCode(
								'ct_sys_do_field_access',
								e.op(
									e.cast(e.str, e.json_get(f, 'codeAccess')),
									'if',
									e.op('exists', e.cast(e.str, e.json_get(f, 'codeAccess'))),
									'else',
									e.op(
										'required',
										'if',
										e.op('exists', e.cast(e.int16, e.json_get(f, 'orderDisplay'))),
										'else',
										e.cast(e.str, e.json_get(f, 'codeAccess'))
									)
								)
							)
						),

						codeAlignmentAlt: e.sys_core.getCode(
							'ct_db_col_alignment',
							e.cast(e.str, e.json_get(f, 'codeAlignmentAlt'))
						),

						codeColor: e.select(
							e.sys_core.getCode('ct_sys_tailwind_color', e.cast(e.str, e.json_get(f, 'codeColor')))
						),

						codeFieldElement: e.select(
							e.sys_core.getCode(
								'ct_sys_do_field_element',
								e.op(
									e.cast(e.str, e.json_get(f, 'codeFieldElement')),
									'if',
									e.op('exists', e.cast(e.str, e.json_get(f, 'codeFieldElement'))),
									'else',
									e.op(
										'text',
										'if',
										e.op('exists', e.cast(e.int16, e.json_get(f, 'orderDisplay'))),
										'else',
										e.cast(e.str, e.json_get(f, 'codeFieldElement'))
									)
								)
							)
						),

						/* custom column */
						customColActionMethod: e.cast(
							e.str,
							e.json_get(e.json_get(e.json_get(f, 'customElement'), 'action'), 'method')
						),
						customColActionType: e.cast(
							e.str,
							e.json_get(e.json_get(e.json_get(f, 'customElement'), 'action'), 'type')
						),
						customColActionValue: e.cast(
							e.str,
							e.json_get(e.json_get(e.json_get(f, 'customElement'), 'action'), 'value')
						),
						customColAlign: e.cast(e.str, e.json_get(e.json_get(f, 'customElement'), 'align')),
						customColCodeColor: e.select(
							e.sys_core.getCode(
								'ct_sys_tailwind_color',
								e.cast(e.str, e.json_get(e.json_get(f, 'customElement'), 'color'))
							)
						),
						customColLabel: e.cast(e.str, e.json_get(e.json_get(f, 'customElement'), 'label')),
						customColPrefix: e.cast(e.str, e.json_get(e.json_get(f, 'customElement'), 'prefix')),
						customColSize: e.cast(e.str, e.json_get(e.json_get(f, 'customElement'), 'size')),
						customColSource: e.cast(e.str, e.json_get(e.json_get(f, 'customElement'), 'source')),
						customColSourceKey: e.cast(
							e.str,
							e.json_get(e.json_get(f, 'customElement'), 'sourceKey')
						),

						fieldEmbedListConfig: e.select(
							e.sys_core.getDataObjFieldEmbedListConfig(
								e.cast(e.str, e.json_get(f, 'fieldEmbedListConfig'))
							)
						),

						fieldEmbedListEdit: e.select(
							e.sys_core.getDataObjFieldEmbedListEdit(
								e.cast(e.str, e.json_get(f, 'fieldEmbedListEdit'))
							)
						),

						fieldEmbedListSelect: e.select(
							e.sys_core.getDataObjFieldEmbedListSelect(
								e.cast(e.str, e.json_get(f, 'fieldEmbedListSelect'))
							)
						),

						fieldListItems: e.select(
							e.sys_core.getDataObjFieldListItems(e.cast(e.str, e.json_get(f, 'fieldListItems')))
						),

						fieldListItemsParmName: e.cast(e.str, e.json_get(f, 'fieldListItemsParmName')),

						headerAlt: e.cast(e.str, e.json_get(f, 'headerAlt')),

						height: e.cast(e.int16, e.json_get(f, 'height')),

						isDisplayBlock: booleanOrDefaultJSON(f, 'isDisplayBlock', false),

						nameCustom: e.cast(e.str, e.json_get(f, 'nameCustom')),

						orderCrumb: e.cast(e.int16, e.json_get(f, 'orderCrumb')),

						orderDefine: e.cast(e.int16, e.json_get(f, 'orderDefine')),

						orderDisplay: e.cast(e.int16, e.json_get(f, 'orderDisplay')),

						width: e.cast(e.int16, e.json_get(f, 'width')),

						createdBy: e.select(e.sys_user.getRootUser()),

						modifiedBy: e.select(e.sys_user.getRootUser())
					})
				}),

				createdBy: e.select(e.sys_user.getRootUser()),
				description: p.description,
				exprFilter: p.exprFilter,
				exprObject: p.exprObject,
				exprSort: p.exprSort,
				header: p.header,
				isAlwaysRetrieveData: booleanOrDefaultParm(p.isAlwaysRetrieveData, false),
				isAlwaysRetrieveDataObject: booleanOrDefaultParm(p.isAlwaysRetrieveDataObject, false),
				isListEdit: booleanOrDefaultParm(p.isListEdit, false),
				isListHideSearch: booleanOrDefaultParm(p.isListHideSearch, false),
				listEditPresetExpr: p.listEditPresetExpr,
				listReorderColumn: e.select(e.sys_db.getColumn(p.listReorderColumn)),
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				owner: e.select(e.sys_core.getEnt(p.owner)),
				parentColumn: e.select(e.sys_db.getColumn(p.parentColumn)),
				parentFilterExpr: p.parentFilterExpr,
				parentTable: e.select(e.sys_db.getTable(p.parentTable)),
				processType: e.select(e.sys_core.getCode('ct_sys_do_dynamic_process_type', p.processType)),
				subHeader: p.subHeader,
				tables: e.for(e.array_unpack(p.tables), (t) => {
					return e.insert(e.sys_core.SysDataObjTable, {
						columnParent: e.select(
							e.sys_db.getColumn(e.cast(e.str, e.json_get(t, 'columnParent')))
						),
						createdBy: e.select(e.sys_user.getRootUser()),
						index: e.cast(e.int16, e.json_get(t, 'index')),
						indexParent: e.cast(e.int16, e.json_get(t, 'indexParent')),
						modifiedBy: e.select(e.sys_user.getRootUser()),
						table: e.select(e.sys_db.getTable(e.cast(e.str, e.json_get(t, 'table'))))
					})
				})
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObjActionFieldGroup(data: any) {
	sectionHeader(`addDataObjActionGroup - ${data.name}`)
	const query = e.params(
		{
			actionFieldItems: e.json,
			name: e.str,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObjActionFieldGroup, {
				actionFieldItems: e.assert_distinct(
					e.set(
						e.for(e.json_array_unpack(p.actionFieldItems), (a) => {
							return e.insert(e.sys_core.SysDataObjActionFieldGroupItem, {
								createdBy: e.select(e.sys_user.getRootUser()),
								action: e.select(e.sys_core.getDataObjActionField(e.cast(e.str, a[0]))),
								modifiedBy: e.select(e.sys_user.getRootUser()),
								orderDefine: e.cast(e.int16, a[1])
							})
						})
					)
				),
				createdBy: e.select(e.sys_user.getRootUser()),
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				owner: e.select(e.sys_core.getEnt(p.owner))
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObjFieldEmbedListConfig(data: any) {
	sectionHeader(`addDataObjFieldEmbedListConfig - ${data.name}`)

	const query = e.params(
		{
			actionFieldGroupModal: e.str,
			dataObjEmbed: e.str,
			dataObjModal: e.str,
			name: e.str,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObjFieldEmbedListConfig, {
				actionFieldGroupModal: e.select(
					e.sys_core.getDataObjActionFieldGroup(p.actionFieldGroupModal)
				),
				createdBy: e.select(e.sys_user.getRootUser()),
				dataObjEmbed: e.select(e.sys_core.getDataObj(p.dataObjEmbed)),
				dataObjModal: e.select(e.sys_core.getDataObj(p.dataObjModal)),
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				owner: e.select(e.sys_core.getEnt(p.owner))
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObjFieldEmbedListEdit(data: any) {
	sectionHeader(`addDataObjFieldEmbedListEdit - ${data.name}`)

	const query = e.params(
		{
			dataObjEmbed: e.str,
			name: e.str,
			owner: e.str,
			parmValueColumnType: e.optional(e.str),
			parmValueColumnValue: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObjFieldEmbedListEdit, {
				createdBy: e.select(e.sys_user.getRootUser()),
				dataObjEmbed: e.select(e.sys_core.getDataObj(p.dataObjEmbed)),
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				owner: e.select(e.sys_core.getEnt(p.owner)),
				parmValueColumnType: e.select(e.sys_db.getColumn(p.parmValueColumnType)),
				parmValueColumnValue: e.select(e.sys_db.getColumn(p.parmValueColumnValue))
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObjFieldEmbedListSelect(data: any) {
	sectionHeader(`addDataObjFieldEmbedListSelect - ${data.name}`)

	const query = e.params(
		{
			actionFieldGroupModal: e.optional(e.str),
			btnLabelComplete: e.optional(e.str),
			dataObjList: e.str,
			name: e.str,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObjFieldEmbedListSelect, {
				actionFieldGroupModal: e.select(
					e.sys_core.getDataObjActionFieldGroup(p.actionFieldGroupModal)
				),
				btnLabelComplete: p.btnLabelComplete,
				createdBy: e.select(e.sys_user.getRootUser()),
				dataObjList: e.select(e.sys_core.getDataObj(p.dataObjList)),
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				owner: e.select(e.sys_core.getEnt(p.owner))
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObjActionField(data: any) {
	sectionHeader(`addDataObjActionField - ${data.name}`)
	const query = e.params(
		{
			actionFieldConfirms: e.array(e.json),
			actionFieldShows: e.array(e.json),
			codeActionFieldTriggerEnable: e.str,
			codeActionFieldType: e.str,
			codeColor: e.optional(e.str),
			header: e.str,
			isListRowAction: e.bool,
			name: e.str,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObjActionField, {
				actionFieldConfirms: e.for(e.array_unpack(p.actionFieldConfirms), (a) => {
					return e.insert(e.sys_core.SysDataObjActionFieldConfirm, {
						codeConfirmType: e.select(
							e.sys_core.getCode(
								'ct_sys_do_action_field_confirm_type',
								e.cast(e.str, e.json_get(a, 'codeConfirmType'))
							)
						),
						codeTriggerConfirmConditional: e.select(
							e.sys_core.getCode(
								'ct_sys_do_action_field_trigger',
								e.cast(e.str, e.json_get(a, 'codeTriggerConfirmConditional'))
							)
						),
						confirmButtonLabelCancel: e.cast(e.str, e.json_get(a, 'confirmButtonLabelCancel')),
						confirmButtonLabelConfirm: e.cast(e.str, e.json_get(a, 'confirmButtonLabelConfirm')),
						confirmMessage: e.cast(e.str, e.json_get(a, 'confirmMessage')),
						confirmTitle: e.cast(e.str, e.json_get(a, 'confirmTitle')),
						createdBy: e.select(e.sys_user.getRootUser()),
						modifiedBy: e.select(e.sys_user.getRootUser())
					})
				}),
				actionFieldShows: e.for(e.array_unpack(p.actionFieldShows), (a) => {
					return e.insert(e.sys_core.SysDataObjActionFieldShow, {
						codeTriggerShow: e.select(
							e.sys_core.getCode(
								'ct_sys_do_action_field_trigger',
								e.cast(e.str, e.json_get(a, 'codeTriggerShow'))
							)
						),
						createdBy: e.select(e.sys_user.getRootUser()),
						isRequired: e.cast(e.bool, e.json_get(a, 'isRequired')),
						modifiedBy: e.select(e.sys_user.getRootUser())
					})
				}),
				codeActionFieldTriggerEnable: e.select(
					e.sys_core.getCode('ct_sys_do_action_field_trigger', p.codeActionFieldTriggerEnable)
				),
				codeActionFieldType: e.select(
					e.sys_core.getCode('ct_sys_do_action_field_type', p.codeActionFieldType)
				),
				codeColor: e.select(e.sys_core.getCode('ct_sys_tailwind_color', p.codeColor)),

				createdBy: e.select(e.sys_user.getRootUser()),
				header: p.header,
				isListRowAction: booleanOrDefaultParm(p.isListRowAction, false),
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				owner: e.select(e.sys_core.getEnt(p.owner))
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObjFieldItems(data: any) {
	sectionHeader(`addDataObjFieldItems - ${data.name}`)
	const query = e.params(
		{
			codeDataTypeDisplay: e.optional(e.str),
			codeMask: e.optional(e.str),
			exprFilter: e.optional(e.str),
			exprSort: e.optional(e.str),
			exprPropDisplay: e.optional(e.str),
			exprWith: e.optional(e.str),
			name: e.str,
			owner: e.str,
			table: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObjFieldListItems, {
				codeDataTypeDisplay: e.sys_core.getCode('ct_db_col_data_type', p.codeDataTypeDisplay),
				codeMask: e.sys_core.getCode('ct_db_col_mask', p.codeMask),
				createdBy: e.select(e.sys_user.getRootUser()),
				exprFilter: p.exprFilter,
				exprSort: p.exprSort,
				exprPropDisplay: p.exprPropDisplay,
				exprWith: p.exprWith,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				owner: e.select(e.sys_core.getEnt(p.owner)),
				table: e.select(e.sys_db.getTable(p.table))
			})
		}
	)
	return await query.run(client, data)
}

export async function addMigration(data: any) {
	sectionHeader(`addMigration - ${data.name}`)
	const query = e.params(
		{
			description: e.optional(e.str),
			name: e.str,
			owner: e.str,
			sourceTables: e.array(e.json),
			targetTables: e.array(e.json)
		},
		(p) => {
			return e.insert(e.sys_migr.SysMigr, {
				description: p.description,
				name: p.name,
				owner: e.select(e.sys_core.getEnt(p.owner)),
				tablesSource: e.for(e.array_unpack(p.sourceTables), (t) => {
					return e.insert(e.sys_migr.SysMigrSourceTable, {
						codeMigrSourceType: e.select(
							e.sys_core.getCode(
								'ct_sys_migr_source_type',
								e.cast(e.str, e.json_get(t, 'codeMigrSourceType'))
							)
						),
						columns: e.for(
							e.array_unpack(e.cast(e.array(e.json), e.json_get(t, 'columns'))),
							(c) => {
								return e.insert(e.sys_migr.SysMigrSourceColumn, {
									codeDataType: e.select(
										e.sys_core.getCode(
											'ct_db_col_data_type',
											e.cast(e.str, e.json_get(c, 'codeDataType'))
										)
									),
									name: e.cast(e.str, e.json_get(c, 'name')),
									createdBy: e.select(e.sys_user.getRootUser()),
									modifiedBy: e.select(e.sys_user.getRootUser())
								})
							}
						),
						exprSelect: e.cast(e.str, e.json_get(t, 'exprSelect')),
						name: e.cast(e.str, e.json_get(t, 'name')),
						createdBy: e.select(e.sys_user.getRootUser()),
						modifiedBy: e.select(e.sys_user.getRootUser())
					})
				}),
				tablesTarget: e.for(e.array_unpack(p.targetTables), (t) => {
					return e.insert(e.sys_migr.SysMigrTargetTable, {
						columns: e.for(
							e.array_unpack(e.cast(e.array(e.json), e.json_get(t, 'columns'))),
							(c) => {
								return e.insert(e.sys_migr.SysMigrTargetColumn, {
									column: e.select(e.sys_db.getColumn(e.cast(e.str, e.json_get(c, 'column')))),
									expr: e.cast(e.str, e.json_get(c, 'expr')),
									isActive: e.cast(e.bool, true),
									orderDefine: e.cast(e.int16, e.json_get(c, 'orderDefine')),
									createdBy: e.select(e.sys_user.getRootUser()),
									modifiedBy: e.select(e.sys_user.getRootUser())
								})
							}
						),
						isActive: e.cast(e.bool, true),
						isInitTable: e.cast(e.bool, e.json_get(t, 'isInitTable')),
						orderDefine: e.cast(e.int16, e.json_get(t, 'orderDefine')),
						table: e.select(e.sys_db.getTable(e.cast(e.str, e.json_get(t, 'name')))),
						createdBy: e.select(e.sys_user.getRootUser()),
						modifiedBy: e.select(e.sys_user.getRootUser())
					})
				}),
				createdBy: e.select(e.sys_user.getRootUser()),
				modifiedBy: e.select(e.sys_user.getRootUser())
			})
		}
	)
	return await query.run(client, data)
}

export async function addNodeFooter(data: any) {
	sectionHeader(`addNodeFooter - ${data.name}`)
	const query = e.params(
		{
			codeIcon: e.str,
			codeType: e.str,
			dataObj: e.optional(e.str),
			header: e.optional(e.str),
			name: e.str,
			orderDefine: e.int16,
			owner: e.str,
			page: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.sys_core.SysNodeObj, {
				codeIcon: e.select(e.sys_core.getCode('ct_sys_node_obj_icon', p.codeIcon)),
				codeNavType: e.select(e.sys_core.getCode('ct_sys_node_obj_nav_type', 'footer')),
				codeNodeType: e.select(e.sys_core.getCode('ct_sys_node_obj_type', p.codeType)),
				createdBy: e.select(e.sys_user.getRootUser()),
				dataObj: e.select(e.sys_core.getDataObj(p.dataObj)),
				header: p.header,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				orderDefine: p.orderDefine,
				owner: e.select(e.sys_core.getEnt(p.owner)),
				page: p.page
			})
		}
	)
	return await query.run(client, data)
}

export async function addNodeProgram(data: any) {
	sectionHeader(`addNodeProgram - ${data.name}`)
	const query = e.params(
		{
			codeIcon: e.str,
			header: e.optional(e.str),
			name: e.str,
			orderDefine: e.int16,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysNodeObj, {
				codeIcon: e.select(e.sys_core.getCode('ct_sys_node_obj_icon', p.codeIcon)),
				codeNavType: e.select(e.sys_core.getCode('ct_sys_node_obj_nav_type', 'tree')),
				codeNodeType: e.select(e.sys_core.getCode('ct_sys_node_obj_type', 'program')),
				createdBy: e.select(e.sys_user.getRootUser()),
				header: p.header,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				orderDefine: p.orderDefine,
				owner: e.select(e.sys_core.getEnt(p.owner))
			})
		}
	)
	return await query.run(client, data)
}

export async function addNodeProgramObj(data: any) {
	sectionHeader(`addNodeProgramObj - ${data.name}`)
	const query = e.params(
		{
			codeIcon: e.str,
			dataObj: e.optional(e.str),
			header: e.optional(e.str),
			name: e.str,
			orderDefine: e.int16,
			owner: e.str,
			parentNodeName: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.sys_core.SysNodeObj, {
				codeIcon: e.select(e.sys_core.getCode('ct_sys_node_obj_icon', p.codeIcon)),
				codeNavType: e.select(e.sys_core.getCode('ct_sys_node_obj_nav_type', 'tree')),
				codeNodeType: e.select(e.sys_core.getCode('ct_sys_node_obj_type', 'programObject')),
				createdBy: e.select(e.sys_user.getRootUser()),
				dataObj: e.select(e.sys_core.getDataObj(p.dataObj)),
				header: p.header,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				orderDefine: p.orderDefine,
				owner: e.select(e.sys_core.getEnt(p.owner)),
				parent: e.select(e.sys_core.getNodeObjByName(p.parentNodeName))
			})
		}
	)
	return await query.run(client, data)
}

export async function addOrg(data: any) {
	const query = e.params(
		{
			name: e.str,
			header: e.optional(e.str),
			creator: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysOrg, {
				owner: e.select(e.sys_core.getRootObj()),
				name: p.name,
				header: p.header,
				createdBy: e.select(e.sys_user.getRootUser()),
				modifiedBy: e.select(e.sys_user.getRootUser())
			})
		}
	)
	return await query.run(client, data)
}

export async function addReport(data: any) {
	sectionHeader(`addReport - ${data.name}`)
	const query = e.params(
		{
			actionFieldGroup: e.str,
			analytics: e.optional(e.array(e.str)),
			description: e.optional(e.str),
			elements: e.optional(e.array(e.json)),
			exprFilter: e.optional(e.str),
			exprObject: e.optional(e.str),
			exprSort: e.optional(e.str),
			header: e.optional(e.str),
			name: e.str,
			owner: e.str,
			parms: e.optional(e.array(e.json)),
			tables: e.optional(e.array(e.json))
		},
		(p) => {
			return e.insert(e.sys_rep.SysRep, {
				actionFieldGroup: e.select(e.sys_core.getDataObjActionFieldGroup(p.actionFieldGroup)),
				analytics: e.assert_distinct(
					e.set(
						e.for(e.array_unpack(p.analytics), (a) => {
							return e.select(e.sys_rep.getAnalytic(a))
						})
					)
				),
				createdBy: e.select(e.sys_user.getRootUser()),
				description: p.description,
				elements: e.for(e.array_unpack(p.elements), (el) => {
					return e.insert(e.sys_rep.SysRepEl, {
						codeAlignment: e.sys_core.getCode(
							'ct_db_col_alignment',
							e.cast(e.str, e.json_get(el, 'codeAlignment'))
						),
						codeDataType: e.sys_core.getCode(
							'ct_db_col_data_type',
							e.cast(e.str, e.json_get(el, 'codeDataType'))
						),
						codeDbDataSourceValue: e.sys_core.getCode(
							'ct_sys_do_field_source_value',
							e.cast(e.str, e.json_get(el, 'codeDbDataSourceValue'))
						),
						codeFieldElement: e.sys_core.getCode(
							'ct_sys_do_field_element',
							e.cast(e.str, e.json_get(el, 'codeFieldElement'))
						),
						codeReportElementType: e.select(
							e.sys_core.getCode(
								'ct_sys_rep_element_type',
								e.cast(e.str, e.json_get(el, 'codeReportElementType'))
							)
						),
						codeSortDir: e.sys_core.getCode(
							'ct_sys_do_field_sort_dir',
							e.cast(e.str, e.json_get(el, 'codeSortDir'))
						),

						column: e.select(e.sys_db.getColumn(e.cast(e.str, e.json_get(el, 'columnName')))),
						createdBy: e.select(e.sys_user.getRootUser()),
						description: e.cast(e.str, e.json_get(el, 'description')),
						exprCustom: e.cast(e.str, e.json_get(el, 'exprCustom')),
						header: e.cast(e.str, e.json_get(el, 'header')),
						indexTable: e.cast(e.int16, e.json_get(el, 'indexTable')),
						isDisplayable: e.cast(e.bool, e.json_get(el, 'isDisplayable')),
						modifiedBy: e.select(e.sys_user.getRootUser()),
						nameCustom: e.cast(e.str, e.json_get(el, 'nameCustom')),
						orderDefine: e.cast(e.int16, e.json_get(el, 'orderDefine')),
						orderDisplay: e.cast(e.int16, e.json_get(el, 'orderDisplay')),
						orderSort: e.cast(e.int16, e.json_get(el, 'orderSort'))
					})
				}),
				exprFilter: p.exprFilter,
				exprObject: p.exprObject,
				exprSort: p.exprSort,
				header: p.header,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				owner: e.select(e.sys_core.getEnt(p.owner)),
				parms: e.for(e.array_unpack(p.parms), (p) => {
					return e.insert(e.sys_rep.SysRepParm, {
						codeParmType: e.select(
							e.sys_core.getCode(
								'ct_sys_do_field_parm_type',
								e.cast(e.str, e.json_get(p, 'codeParmType'))
							)
						),
						createdBy: e.select(e.sys_user.getRootUser()),
						description: e.cast(e.str, e.json_get(p, 'description')),
						fieldListItems: e.select(
							e.sys_core.getDataObjFieldListItems(e.cast(e.str, e.json_get(p, 'fieldListItems')))
						),
						fieldListItemsParmName: e.cast(e.str, e.json_get(p, 'fieldListItemsParmName')),
						header: e.cast(e.str, e.json_get(p, 'header')),
						isMultiSelect: e.cast(e.bool, e.json_get(p, 'isMultiSelect')),
						isRequired: e.cast(e.bool, e.json_get(p, 'isRequired')),
						linkTable: e.select(e.sys_db.getTable(e.cast(e.str, e.json_get(p, 'linkTable')))),
						modifiedBy: e.select(e.sys_user.getRootUser()),
						name: e.cast(e.str, e.json_get(p, 'name')),
						orderDefine: e.cast(e.int16, e.json_get(p, 'orderDefine'))
					})
				}),
				tables: e.for(e.array_unpack(p.tables), (t) => {
					return e.insert(e.sys_core.SysDataObjTable, {
						columnParent: e.select(
							e.sys_db.getColumn(e.cast(e.str, e.json_get(t, 'columnParent')))
						),
						createdBy: e.select(e.sys_user.getRootUser()),
						index: e.cast(e.int16, e.json_get(t, 'index')),
						indexParent: e.cast(e.int16, e.json_get(t, 'indexParent')),
						modifiedBy: e.select(e.sys_user.getRootUser()),
						table: e.select(e.sys_db.getTable(e.cast(e.str, e.json_get(t, 'table'))))
					})
				})
			})
		}
	)
	return await query.run(client, data)
}

export async function addReportUser(data: any) {
	sectionHeader(`addReportUser - ${data.report} - ${data.user}`)
	const query = e.params(
		{
			header: e.str,
			report: e.str,
			user: e.str
		},
		(p) => {
			return e.insert(e.sys_rep.SysRepUser, {
				createdBy: e.select(e.sys_user.getRootUser()),
				headerUser: p.header,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				orderDefine: 10,
				report: e.select(e.sys_rep.getReport(p.report)),
				user: e.select(e.sys_user.getUser(p.user))
			})
		}
	)
	return await query.run(client, data)
}

export async function addUser(data: any) {
	sectionHeader(`addUser - ${data.userName}`)
	const CREATOR = e.select(e.sys_user.getRootUser())
	const query = e.params(
		{
			firstName: e.str,
			lastName: e.str,
			owner: e.str,
			password: e.str,
			userName: e.str
		},
		(p) => {
			return e.insert(e.sys_user.SysUser, {
				createdBy: CREATOR,
				modifiedBy: CREATOR,
				owner: e.select(e.sys_core.getOrg(p.owner)),
				password: p.password,
				person: e.insert(e.default.SysPerson, {
					firstName: p.firstName,
					lastName: p.lastName
				}),
				userName: p.userName
			})
		}
	)
	return await query.run(client, data)
}

export async function addUserOrg(data: any) {
	sectionHeader(`addUser - ${data.userName} - org: ${data.orgName}`)
	const query = e.params(
		{
			orgName: e.str,
			userName: e.str
		},
		(p) => {
			return e.update(e.sys_user.SysUser, (u) => ({
				filter: e.op(u.userName, '=', p.userName),
				set: {
					orgs: {
						'+=': e.select(e.sys_core.getOrg(p.orgName))
					}
				}
			}))
		}
	)
	return await query.run(client, data)
}

// tables: e.select(
// 	e.assert_distinct(
// 		e.for(
// 			e.array_unpack(
// 				e.cast(
// 					e.array(e.str),
// 					e.json_get(e.cast(e.json, e.json_get(f, 'column')), 'tables')
// 				)
// 			),
// 			(t) => {
// 				return e.sys_db.getTable(t)
// 			}
// 		)
// 	)
// )

// fieldsDb: e.for(e.array_unpack(p.fields), (f) => {
// 	return e.insert(e.sys_core.SysDataObjFieldDb, {
// 		column: e.select(e.sys_db.getColumn(e.cast(e.str, e.json_get(f, 'columnName'))))
// 	})
// }),

// fieldsEl: e.for(e.array_unpack(p.fields), (f) => {
// 	return e.insert(e.sys_core.SysDataObjFieldEl, {
// 		column: e.select(e.sys_db.getColumn(e.cast(e.str, e.json_get(f, 'columnName'))))
// 	})
// }),
