import e from '$db/gel/edgeql-js'
import { client } from '$routes/api/db/dbGel/dbGel'
import {
	TokenApiError,
	TokenApiId,
	TokenApiIds,
	TokenApiUserParmsGet,
	TokenApiUserParmsSet
} from '$utils/types.token'
import { MethodResult, required, valueOrDefault } from '$utils/types'
import { debug } from '$utils/utils.debug'

const FILENAME = 'src/routes/api/db/dbGel/dbGelQueries.ts'

const shapeCodeAction = e.shape(e.sys_core.SysCodeAction, (ca) => ({
	_class: ca.codeType.name,
	_type: ca.name
}))

const shapeDataObjActionGroup = e.shape(e.sys_core.SysDataObjActionGroup, (g) => ({
	_dataObjActions: e.select(g.dataObjActions, (i) => ({
		_action: e.select(i.action, (a) => ({
			...shapeUserAction(a)
		})),
		_codeColor: i.codeColor.name,
		headerAlt: true,
		isListRowAction: i.isListRowAction,
		order_by: i.orderDefine
	}))
}))

const SysDataObjColumnItemChange = e.shape(e.sys_core.SysDataObjColumnItemChange, (t) => ({
	_codeAccess: t.codeAccess.name,
	_codeItemChangeAction: t.codeItemChangeAction.name,
	_codeItemChangeValueType: t.codeItemChangeValueType.name,
	_codeOp: t.codeOp.name,
	_columns: t.columns.column.name,
	_valueTargetIdAttribute: t.valueTargetAttribute.id,
	_valueTargetIdCode: t.valueTargetCode.id,
	_valueTriggerIdsAttribute: t.valueTriggerAttributes.id,
	_valueTriggerIdsCode: t.valueTriggerCodes.id,
	retrieveParmKey: true,
	valueTargetScalar: true,
	valueTriggerScalar: true,
	order_by: t.orderDefine
}))

const shapeDataObjQueryRider = e.shape(e.sys_core.SysDataObjQueryRider, (qr) => ({
	_codeQueryAction: qr.codeQueryAction.name,
	_codeQueryPlatform: qr.codeQueryPlatform.name,
	_codeQueryType: qr.codeQueryType.name,
	_codeTriggerTiming: qr.codeTriggerTiming.name,
	parmValueStr: true
}))
const shapeDataObjQueryRiderClient = e.shape(e.sys_core.SysDataObjQueryRider, (qr) => ({
	...shapeDataObjQueryRider(qr),
	_codeQueryFunction: qr.codeQueryFunction.name,
	_codeUserMsgDelivery: qr.codeUserMsgDelivery.name,
	_navDestination: e.select(qr.navDestination, (nd) => ({
		...shapeNavDestination(nd)
	})),
	userMsg: true,
	filter: e.op(qr.codeQueryPlatform.name, '=', 'client')
}))
const shapeDataObjQueryRiderServer = e.shape(e.sys_core.SysDataObjQueryRider, (qr) => ({
	...shapeDataObjQueryRider(qr),
	expr: true,
	filter: e.op(qr.codeQueryPlatform.name, '=', 'server')
}))

const shapeDataObjTable = e.shape(e.sys_core.SysDataObjTable, (dot) => ({
	_columnParent: dot.columnParent.name,
	_columnsId: dot.columnsId.name,
	exprFilterUpdate: true,
	index: true,
	indexParent: true,
	isTableExtension: true,
	_table: e.select(dot.table, (tbl) => ({
		...shapeTable(dot.table)
	})),
	order_by: dot.index
}))

const shapeFieldEmbedListSelect = e.shape(e.sys_core.SysDataObjFieldEmbedListSelect, (fels) => ({
	_actionGroupModal: e.select(fels.actionGroupModal, (afg) => ({
		...shapeDataObjActionGroup(afg)
	})),
	_dataObjListId: fels.dataObjList.id,
	btnLabelComplete: true
}))

const shapeGridStyle = e.shape(e.sys_core.SysGridStyle, (gs) => ({
	exprTrigger: true,
	prop: true,
	propValue: true
}))

const shapeLinkItemsSource = e.shape(e.sys_core.SysDataObjFieldListItems, (fli) => ({
	_props: e.select(fli.props, (prop) => ({
		expr: true,
		header: true,
		isDisplayId: true,
		key: true,
		orderSort: true,
		order_by: prop.orderDefine
	})),
	_querySource: e.select(fli, (fli) => ({
		...shapeQuerySource(fli)
	})),
	displayIdSeparator: true,
	name: true
}))

const shapeNavDestination = e.shape(e.sys_core.SysNavDestination, (nd) => ({
	_codeDestinationType: nd.codeDestinationType.name,
	_nodeDestination: nd.nodeDestination.name,
	backCount: true
}))

const shapeNodeObjAction = e.shape(e.sys_core.SysNodeObjAction, (na) => ({
	_codeAction: na.codeAction.name,
	_dataObjId: na.nodeObj.dataObj.id,
	_nodeObjId: na.nodeObj.id
}))
const shapeNodeObj = e.shape(e.sys_core.SysNodeObj, (n) => ({
	_actions: e.select(n.actions, (a) => ({
		...shapeNodeObjAction(a)
	})),
	_children: e.select(n.children, (c) => ({
		_nodeObjId: c.nodeObj.id,
		order_by: c.orderDefine
	})),
	_codeComponent: n.codeComponent.name,
	_codeIcon: n.codeIcon.name,
	_codeNodeType: n.codeNodeType.name,
	_codeQueryOwnerType: n.codeQueryOwnerType.name,
	_dataObjId: n.dataObj.id,
	_ownerId: n.owner.id,
	_selectListItems: e.select(n.selectListItems, (sli) => ({
		_header: n.selectListItemsHeader,
		_parmValue: n.selectListItemsParmValue,
		...shapeLinkItemsSource(sli)
	})),
	header: true,
	id: true,
	isAlwaysRetrieveData: true,
	isHideRowManager: true,
	name: true,
	orderDefine: true,
	page: true,
	order_by: n.orderDefine
}))

const shapeQuerySource = e.shape(e.sys_core.SysObjDb, (db) => ({
	exprFilter: true,
	exprSort: true,
	exprWith: true,
	exprUnions: true,
	id: true,
	listPresetExpr: true,
	_parent: e.select({
		_columnName: db.parentColumn.name,
		_columnIsMultiSelect: db.parentColumn.isMultiSelect,
		_filterExpr: db.parentFilterExpr,
		_table: e.select(db.parentTable, (t) => ({
			...shapeTable(t)
		}))
	}),
	_queryRidersClient: e.select(db.queryRiders, (qr) => ({
		...shapeDataObjQueryRiderClient(qr)
	})),
	_queryRidersServer: e.select(db.queryRiders, (qr) => ({
		...shapeDataObjQueryRiderServer(qr)
	})),
	_table: e.select(db.table, (t) => ({
		...shapeTable(t)
	})),
	_tables: e.select(db.tables, (dot) => ({
		...shapeDataObjTable(dot)
	}))
}))

const shapeObjAttr = e.shape(e.sys_core.SysObjAttr, (o) => ({
	_codeAttrType: o.codeAttrType.name,
	id: true,
	name: true
}))

const shapeObjAttrAccess = e.shape(e.sys_core.SysObjAttrAccess, (a) => ({
	_codeAttrTypeAccess: a.codeAttrTypeAccess.name,
	_obj: e.select(a.obj, (obj) => ({
		...shapeObjAttr(obj)
	}))
}))

const shapeObjAttrAction = e.shape(e.sys_core.SysObjAttrAction, (a) => ({
	_codeAttrTypeAction: a.codeAttrTypeAction.name,
	_obj: e.select(a.obj, (obj) => ({
		...shapeObjAttr(obj)
	}))
}))

const shapeObjAttrExpr = e.shape(e.sys_core.SysObjAttrExpr, (a) => ({
	_codeAttrTypeAction: a.codeAttrTypeAction.name,
	expr: true
}))

const shapeObjAttrTypeApp = e.shape(e.sys_user.SysApp, (a) => ({
	_appHeader: e.select(a.appHeader, (ah) => ({
		_codeIcon: ah.codeIcon.name,
		id: true,
		header: true,
		name: true,
		orderDefine: true
	})),
	_nodes: e.select(a.nodes, (n) => ({
		...shapeNodeObj(n),
		order_by: n.orderDefine
	})),
	_ownerId: a.owner.id,
	id: true,
	name: true
}))

const shapeObjAttrTypeTask = e.shape(e.sys_user.SysTask, (t) => ({
	_codeIconName: t.codeIcon.name,
	_codeRenderType: t.codeRenderType.name,
	_codeStatusObjName: t.codeStatusObj.name,
	_ownerId: t.owner.id,
	_pageDataObjId: t.pageDataObj.id,
	_targetDataObjId: t.targetDataObj.id,
	_targetDataObjOwnerId: t.targetDataObj.owner.id,
	_targetDataObjRenderPlatform: t.targetDataObj.codeDoRenderPlatform.name,
	_targetNodeObj: e.select(t.targetNodeObj, (n) => ({
		...shapeNodeObj(n)
	})),
	description: true,
	exprShow: true,
	exprStatus: true,
	exprWith: true,
	hasAltOpen: true,
	header: true,
	id: true,
	isPinToDash: true,
	name: true,
	noDataMsg: true
}))

const shapeObjAttrVirtual = e.shape(e.sys_core.SysObjAttrVirtual, (v) => ({
	expr: true,
	_attrsAccess: e.select(v.attrsAccess, (a) => ({
		...shapeObjAttrAccess(a)
	})),
	_attrsAction: e.select(v.attrsAction, (a) => ({
		...shapeObjAttrAction(a)
	}))
}))

const shapeTable = e.shape(e.sys_db.SysTable, (t) => ({
	hasMgmt: true,
	mod: true,
	name: true
}))

const shapeUserAction = e.shape(e.sys_user.SysUserAction, (ua) => ({
	_actionConfirms: e.select(ua.actionConfirms, (c) => ({
		_codeConfirmType: c.codeConfirmType.name,
		_codeTriggerConfirmConditional: c.codeTriggerConfirmConditional.name,
		confirmButtonLabelCancel: true,
		confirmButtonLabelConfirm: true,
		confirmMessage: true,
		confirmTitle: true
	})),
	_codeAction: e.select(ua.codeAction, (ca) => ({
		...shapeCodeAction(ca)
	})),
	_codeConfirmType: ua.codeConfirmType.name,
	_navDestination: e.select(ua.navDestination, (nd) => ({
		...shapeNavDestination(nd)
	})),
	exprAction: ua.exprAction,
	exprEnable: ua.exprEnable,
	exprShow: ua.exprShow,
	exprShowExpr: ua.exprShowExpr,
	exprWith: ua.exprWith,
	header: ua.header,
	name: ua.name
}))

export async function getDataObjActionGroup(token: TokenApiId) {
	const query = e.select(e.sys_core.SysDataObjActionGroup, (a) => ({
		...shapeDataObjActionGroup(a),
		filter_single: e.op(a.name, '=', token.id)
	}))
	return await query.run(client)
}

export async function getDataObjById(token: TokenApiId) {
	const shapeProp = e.shape(e.sys_core.SysDataObjColumn, (doc) => ({
		...shapeColumnHasItems(doc),
		_codeSortDir: doc.codeSortDir.name,
		_columnBacklink: doc.columnBacklink.name,
		_itemChanges: e.select(doc.itemChanges, (t) => ({
			...SysDataObjColumnItemChange(t)
		})),
		_link: e.select(doc, (l) => ({
			_columns: e.select(l.linkColumns, (c) => ({
				_name: c.column.name,
				order_by: c.orderDefine
			})),
			_exprCustom: l.exprCustom,
			_table: e.select(l.linkTable, (t) => ({
				hasMgmt: true,
				mod: true,
				name: true
			}))
		})),
		_linkItemsSource: e.select(doc.fieldListItems, (fli) => ({
			_parmValue: doc.fieldListItemsParmValue,
			_parmValueList: doc.fieldListItemsParmValueList,
			...shapeLinkItemsSource(fli)
		})),
		_propName: e.op(doc.nameCustom, '??', doc.column.name),
		exprCustom: true,
		exprPreset: true,
		exprSave: true,
		id: true,
		indexTable: true
	}))

	const shapePropDB = e.shape(e.sys_core.SysDataObjColumn, (doc) => ({
		...shapeProp(doc),
		_codeDataType: doc.column.codeDataType.name,
		_codeDbDataSourceValue: doc.codeDbDataSourceValue.name,
		_fieldEmbedListConfig: e.select(doc.fieldEmbedListConfig, (fe) => ({
			_dataObjEmbedId: fe.dataObjEmbed.id
		})),
		_fieldEmbedListEdit: e.select(doc.fieldEmbedListEdit, (fe) => ({
			_dataObjEmbedId: fe.dataObjEmbed.id
		})),
		_fieldEmbedListSelect: e.select(doc.fieldEmbedListSelect, (fe) => ({
			_dataObjListId: fe.dataObjList.id
		})),
		_isMultiSelect: doc.column.isMultiSelect,
		_isSelfReference: doc.column.isSelfReference
	}))

	const shapeColumnHasItems = e.shape(e.sys_core.SysDataObjColumn, (doc) => ({
		_hasItems: e.op('exists', doc.fieldListItems)
	}))

	const query = e.select(e.sys_core.SysDataObj, (do1) => {
		return {
			description: true,
			header: true,
			id: true,
			isInitialValidationSilent: true,
			isListEdit: true,
			isListSuppressFilterSort: true,
			isListSuppressSelect: true,
			isRetrieveReadonly: true,
			name: true,
			subHeader: true,
			_actionGroup: e.select(do1.actionGroup, (afg) => ({
				...shapeDataObjActionGroup(afg)
			})),
			_codeCardinality: do1.codeCardinality.name,
			_codeDataObjType: do1.codeDataObjType.name,
			_codeDoQueryType: do1.codeDoQueryType.name,
			_codeDoRenderPlatform: do1.codeDoRenderPlatform.name,
			_codeListPresetType: do1.codeListPresetType.name,
			_gridStyles: e.select(do1.gridStyles, (gs) => ({
				...shapeGridStyle(gs)
			})),
			_listReorderColumn: do1.listReorderColumn.name,
			_ownerId: do1.owner.id,
			_processType: do1.processType.name,
			_querySource: e.select(do1, (do1) => ({
				...shapeQuerySource(do1)
			})),

			/* props */
			_propsCrumb: e.select(do1.columns, (doc) => ({
				_name: doc.column.name,
				_nameCustom: doc.nameCustom,
				filter: e.op('exists', doc.orderCrumb),
				order_by: doc.orderCrumb
			})),
			_propsDisplay: e.select(do1.columns, (doc) => ({
				_column: e.select(doc.column, (c) => ({
					_codeAlignment: c.codeAlignment.name,
					_codeDataType: c.codeDataType.name,
					classProps: true,
					exprStorageKey: true,
					header: true,
					headerSide: true,
					inputMask: true,
					isFormTag: true,
					isMultiSelect: true,
					matchColumn: true,
					maxLength: true,
					maxValue: true,
					minLength: true,
					minValue: true,
					name: true,
					pattern: true,
					patternMsg: true,
					patternReplacement: true,
					placeHolder: true,
					spinStep: true,
					toggleContinueRequiresTrue: true,
					togglePresetTrue: true,
					toggleValueFalse: true,
					toggleValueShow: true,
					toggleValueTrue: true
				})),
				...shapeProp(doc),
				_codeAccess: doc.codeAccess.name,
				_codeAlignmentAlt: doc.codeAlignmentAlt.name,
				_codeColor: doc.codeColor.name,
				_codeFieldElement: doc.codeFieldElement.name,
				_customCol: e.select(doc, (c) => ({
					_action: e.select(c.action, (a) => ({
						...shapeUserAction(a)
					})),
					_customColCodeComponent: c.customColCodeComponent.name,
					customColActionValue: true,
					customColAlign: true,
					customColIsSubHeader: true,
					customColLabel: true,
					customColPrefix: true,
					customColRawHTML: true,
					customColSize: true,
					customColSource: true,
					customColSourceKey: true
				})),
				_fieldEmbedListConfig: e.select(doc.fieldEmbedListConfig, (fe) => ({
					_actionGroupModal: e.select(fe.actionGroupModal, (afg) => ({
						...shapeDataObjActionGroup(afg)
					})),
					_dataObjEmbedId: fe.dataObjEmbed.id,
					_dataObjModalId: fe.dataObjModal.id
				})),
				_fieldEmbedListEdit: e.select(doc.fieldEmbedListEdit, (fe) => ({
					_dataObjEmbedId: fe.dataObjEmbed.id
				})),
				_fieldEmbedListSelect: e.select(doc.fieldEmbedListSelect, (fe) => ({
					...shapeFieldEmbedListSelect(fe)
				})),
				_fieldEmbedShellFields: e.select(doc.customEmbedShellFields, (ce) => ({
					_name: ce.column.name,
					order_by: ce.orderDefine
				})),
				_gridStyles: e.select(doc.gridStyles, (gs) => ({
					...shapeGridStyle(gs)
				})),
				headerAlt: true,
				height: true,
				inputMaskAlt: true,
				isDisplay: true,
				isDisplayable: true,
				isDisplayBlock: true,
				orderDefine: true,
				orderSort: true,
				width: true,
				order_by: doc.orderDefine
			})),

			_propsSaveInsert: e.select(do1.columns, (doc) => ({
				...shapePropDB(doc),
				filter: e.op(
					e.bool(false),
					'if',
					e.op(
						e.op(doc.column.codeDataType.name, '=', 'link'),
						'and',
						e.op(
							e.op('not', e.op('exists', doc.linkTable)),
							'and',
							e.op('not', e.op('exists', doc.fieldListItems))
						)
					),
					'else',
					e.op(
						e.op(doc.codeDbDataSourceValue.name, '!=', 'calculate'),
						'and',
						e.op(
							e.op(doc.column.isExcludeInsert, '=', e.bool(false)),
							'and',
							e.op(doc.isExcludeInsert, '=', e.bool(false))
						)
					)
				)
			})),

			_propsSaveUpdate: e.select(do1.columns, (doc) => ({
				...shapePropDB(doc),
				filter: e.op(
					e.bool(false),
					'if',
					e.op(
						e.op(doc.column.codeDataType.name, '=', 'link'),
						'and',
						e.op(
							e.op('not', e.op('exists', doc.linkTable)),
							'and',
							e.op('not', e.op('exists', doc.fieldListItems))
						)
					),
					'else',
					e.op(
						e.op(doc.codeDbDataSourceValue.name, '!=', 'calculate'),
						'and',
						e.op(
							e.op(doc.column.isExcludeUpdate, '=', e.bool(false)),
							'and',
							e.op(doc.isExcludeUpdate, '=', e.bool(false))
						)
					)
				)
			})),

			_propsSelect: e.select(do1.columns, (doc) => ({
				...shapePropDB(doc),
				filter: e.op(
					e.op(doc.column.isExcludeSelect, '=', e.bool(false)),
					'and',
					e.op(doc.isExcludeSelect, '=', e.bool(false))
				)
			})),

			_propsSelectPreset: e.select(do1.columns, (doc) => ({
				...shapePropDB(doc),
				filter: e.op(
					e.op('exists', doc.exprPreset),
					'or',
					e.op(
						e.op(doc.column.name, '=', 'createdBy'),
						'or',
						e.op(doc.column.name, '=', 'modifiedBy')
					)
				)
			})),

			_propsSort: e.select(do1.columns, (doc) => ({
				...shapePropDB(doc),
				filter: e.op('exists', doc.orderSort),
				order_by: doc.orderSort
			})),

			filter_single: e.op(do1.id, '=', e.cast(e.uuid, token.id))
		}
	})

	return await query.run(client)
}

export async function getDataObjByName(token: TokenApiId) {
	const result = await getDataObjId(token)
	return result?.id ? await getDataObjById(new TokenApiId(result.id)) : undefined
}

export async function getDataObjId(token: TokenApiId) {
	const query = e.select(e.sys_core.SysDataObj, (do1) => ({
		id: true,
		filter_single: e.op(do1.name, '=', token.id)
	}))
	return await query.run(client)
}

export async function getDBObjectLinks(token: TokenApiId) {
	const query = e.select(e.schema.Link, (link) => ({
		id: true,
		linkObject: link.source.name,
		linkProp: link.name,
		linkPropType: link.target.name,
		cardinality: true,
		required: true,
		filter: e.op(
			e.op(link.target.name, '=', token.id),
			'or',
			e.op(
				link.target,
				'in',
				e.select(e.schema.ObjectType, (ot) => ({ filter: e.op(ot.name, '=', token.id) })).ancestors
			)
		)
	}))
	return await query.run(client)
}

export async function getLinkItemsSource(token: TokenApiId) {
	const query = e.select(e.sys_core.SysDataObjFieldListItems, (fli) => ({
		...shapeLinkItemsSource(fli),
		filter_single: e.op(fli.id, '=', e.cast(e.uuid, token.id))
	}))
	return await query.run(client)
}

export async function getNodeByNodeId(token: TokenApiId) {
	let query = e.select(e.sys_core.SysNodeObj, (n) => ({
		...shapeNodeObj(n),
		filter_single: e.op(n.id, '=', e.cast(e.uuid, token.id))
	}))
	return await query.run(client)
}

export async function getNodesChildren(token: TokenApiIds) {
	const query = e.params({ ids: e.array(e.uuid) }, ({ ids }) =>
		e.select(e.sys_core.SysNodeObj, (n) => ({
			...shapeNodeObj(n),
			filter: e.op(n.id, 'in', e.array_unpack(ids))
		}))
	)
	return await query.run(client, { ids: token.ids })
}

export async function getObjAttrTypeApp(token: TokenApiIds) {
	const query = e.params({ ids: e.array(e.uuid) }, ({ ids }) =>
		e.select(e.sys_user.SysApp, (a) => ({
			...shapeObjAttrTypeApp(a),
			filter: e.op(a.id, 'in', e.array_unpack(ids))
		}))
	)
	return await query.run(client, { ids: token.ids })
}
export async function getObjAttrTypeTask(token: TokenApiIds) {
	const query = e.params({ ids: e.array(e.uuid) }, ({ ids }) =>
		e.select(e.sys_user.SysTask, (a) => ({
			...shapeObjAttrTypeTask(a),
			filter: e.op(a.id, 'in', e.array_unpack(ids))
		}))
	)
	return await query.run(client, { ids: token.ids })
}

export async function getReportUser(repUserId: string) {
	const shapeRepEl = e.shape(e.sys_rep.SysRepEl, (re) => ({
		_codeAlignment: re.codeAlignment.name,
		_codeDataType: re.codeDataType.name,
		_codeDbDataSourceValue: re.codeDbDataSourceValue.name,
		_codeFieldElement: re.codeFieldElement.name,
		_codeReportElementType: re.codeReportElementType.name,
		_codeSortDir: re.codeSortDir.name,
		_column: e.select(re.column, (c) => ({
			_codeAlignment: c.codeAlignment.name,
			_codeDataType: c.codeDataType.name,
			header: c.header,
			name: c.name
		})),
		_link: e.select(re, (el) => ({
			_columns: e.select(el.linkColumns, (lc) => ({
				_name: lc.column.name,
				order_by: lc.orderDefine
			}))
		})),
		description: true,
		exprCustom: true,
		header: true,
		id: true,
		indexTable: true,
		isDisplay: true,
		isDisplayable: true,
		nameCustom: true,
		orderDefine: true,
		orderDisplay: true,
		orderSort: true
	}))

	const query = e.select(e.sys_rep.SysRepUser, (r) => ({
		descriptionUser: true,
		headerUser: true,
		id: true,
		parms: e.select(r.parms, (parm) => ({
			parm: e.select(parm.parm, (p) => ({
				_codeDataType: p.codeDataType.name,
				_codeFieldElement: p.codeFieldElement.name,
				_linkItemsSource: e.select(p.fieldListItems, (fli) => ({
					_parmValue: p.fieldListItemsParmValue,
					...shapeLinkItemsSource(fli)
				})),
				description: true,
				exprFilter: true,
				header: true,
				isMultiSelect: true,
				isRequired: true,
				name: true
			})),
			parmValue: true
		})),

		report: e.select(r.report, (rep) => ({
			_actionGroup: e.select(rep.actionGroup, (afg) => ({
				...shapeDataObjActionGroup(afg)
			})),
			_ownerId: rep.owner.id,
			description: true,
			elements: e.select(rep.elements, (repE) => ({
				...shapeRepEl(repE),
				order_by: repE.orderDefine
			})),
			elementsSort: e.select(rep.elements, (repE) => ({
				...shapeRepEl(repE),
				filter: e.op('exists', repE.orderSort),
				order_by: repE.orderSort
			})),
			exprFilter: true,
			exprSort: true,
			exprWith: true,
			header: true,
			id: true,
			name: true,
			tables: e.select(rep.tables, (t) => ({
				...shapeDataObjTable(t)
			}))
		})),
		filter: e.op(r.id, '=', e.cast(e.uuid, repUserId))
	}))
	return await query.run(client)
}

export async function getUserByUserId(token: TokenApiId) {
	try {
		const query = e.select(e.sys_user.SysUser, (u) => ({
			_attrsAccess: e.select(u.userTypes.attrsAccess, (a) => ({
				...shapeObjAttrAccess(a)
			})),
			_attrsAction: e.select(u.userTypes.attrsAction, (a) => ({
				...shapeObjAttrAction(a)
			})),
			_attrsExpr: e.select(u.userTypes.attrsExpr, (a) => ({
				...shapeObjAttrExpr(a)
			})),
			_attrsVirtual: e.select(u.userTypes.attrsVirtual, (a) => ({
				...shapeObjAttrVirtual(a)
			})),
			_personId: u.person.id,
			_preferences: e.select(e.sys_user.SysUserPref, (p) => ({
				_codeType: p.codeType.name,
				filter: e.op(p.isActive, '=', true)
			})),
			_system: e.select(e.sys_core.SysSystem, (s) => ({
				_orgName: s.owner.name,
				appName: true,
				file: true,
				header: true,
				id: true,
				logoMarginRight: true,
				logoWidth: true,
				name: true,
				filter_single: e.op(s, '=', u.defaultSystem)
			})),
			avatar: u.person.avatar,
			firstName: u.person.firstName,
			fullName: u.person.fullName,
			id: true,
			lastName: u.person.lastName,
			name: true,
			orgs: true,
			systems: true,
			filter_single: e.op(u.id, '=', e.cast(e.uuid, token.id))
		}))
		return new MethodResult(await query.run(client))
	} catch (error) {
		return new MethodResult({
			error: {
				function: FILENAME,
				file: 'getUserByUserId',
				msgSystem: JSON.stringify(error),
				msgUser: 'Unable to retrieve user information'
			}
		})
	}
}

export async function sysErrorAdd(token: TokenApiError) {
	const userId = valueOrDefault(token.error._sessionId, '')
	console.log('sysErrorAdd.userId', userId)
	let query = e.insert(e.default.SysError, {
		errCode: token.error.code,
		errFile: token.error.file,
		errFunction: token.error.function,
		errMsgSystem: token.error.msgSystem,
		errMsgUser: token.error.msgUser,
		errStatus: token.error.status,
		user: e.op(
			e.cast(e.sys_user.SysUser, e.set()),
			'if',
			e.op(userId, '=', ''),
			'else',
			e.sys_user.getUserById(userId)
		)
	})
	return await query.run(client)
}

export async function sysErrorGet(token: TokenApiId) {
	const query = e.select(e.default.SysError, (err) => ({
		_sessionId: err.user.id,
		code: err.errCode,
		file: err.errFile,
		function: err.errFunction,
		id: true,
		msgSystem: err.errMsgSystem,
		msgUser: err.errMsgUser,
		status: err.errStatus,
		filter_single: e.op(err.id, '=', e.cast(e.uuid, token.id))
	}))
	return await query.run(client)
}

export async function sysUserParmsGet(token: TokenApiUserParmsGet) {
	const query = e.select(e.sys_user.SysUserParm, (p) => ({
		_codeType: p.codeType.name,
		parmData: true,
		filter: e.op(
			e.op(p.user, '=', e.sys_user.getUserById(token.idUser)),
			'and',
			e.op(p.idFeature, '=', e.cast(e.int64, token.idFeature))
		)
	}))
	return await query.run(client)
}

export async function sysUserParmsSet(data: any) {
	debug('sysUserParmsSet', 'data', data)
	const query = e.params(
		{
			items: e.array(e.json)
		},
		(p) => {
			return e.for(e.array_unpack(p.items), (item) => {
				return e
					.insert(e.sys_user.SysUserParm, {
						codeType: e.sys_core.getCode(
							'ct_sys_feature_parm_type',
							e.cast(e.str, e.json_get(item, 'type'))
						),
						idFeature: e.cast(e.int64, e.json_get(item, 'idFeature')),
						parmData: e.cast(e.json, e.json_get(item, 'data')),
						user: e.select(e.sys_user.getUserById(e.cast(e.str, e.json_get(item, 'idUser'))))
					})
					.unlessConflict((parm) => ({
						on: e.tuple([parm.user, parm.idFeature, parm.codeType]),
						else: e.update(parm, () => ({
							set: {
								parmData: e.cast(e.json, e.json_get(item, 'data'))
							}
						}))
					}))
			})
		}
	)
	return await query.run(client, data)
}
