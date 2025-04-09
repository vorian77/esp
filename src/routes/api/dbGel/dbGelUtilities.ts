import e from '$db/gel/edgeql-js'
import { client, sectionHeader } from '$routes/api/dbGel/dbGel'
import { TokenApiId, TokenApiIds } from '$utils/types.token'
import { TokenApiDbTableColumns, TokenApiUserId, TokenApiUserPref } from '$utils/types.token'
import { getArray, Node } from '$utils/types'
import { debug } from '$utils/utils.debug'

const shapeAttr = e.shape(e.sys_core.SysAttr, (a) => ({
	_codeAttrType: a.codeAttrType.name,
	_obj: a.obj.name,
	id: true
}))

const shapeAttrAccess = e.shape(e.sys_core.SysAttrAccess, (aa) => ({
	_attr: e.select(aa.attr, (a) => ({
		...shapeAttr(a)
	})),
	_codeAttrAccessSource: aa.codeAttrAccessSource.name,
	_codeAttrAccessType: aa.codeAttrAccessType.name,
	_codeAttrType: aa.codeAttrType.name
}))

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
	_codeFunction: qr.codeFunction.name,
	_codeQueryType: qr.codeQueryType.name,
	_codeTriggerTiming: qr.codeTriggerTiming.name,
	_codeType: qr.codeType.name,
	_codeUserDestination: qr.codeUserDestination.name,
	_codeUserMsgDelivery: qr.codeUserMsgDelivery.name,
	expr: true,
	functionParmValue: true,
	userMsg: true
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

const shapeLinkItemsSource = e.shape(e.sys_core.SysDataObjFieldListItems, (fli) => ({
	_props: e.select(fli.props, (prop) => ({
		expr: true,
		header: true,
		isDisplayId: true,
		key: true,
		orderSort: true,
		order_by: prop.orderDefine
	})),
	_table: e.select(fli.table, (t) => ({
		hasMgmt: true,
		mod: true,
		name: true
	})),
	displayIdSeparator: true,
	exprFilter: true,
	exprSort: true,
	exprWith: true,
	name: true
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
	_codeIcon: n.codeIcon.name,
	_codeNodeType: n.codeNodeType.name,
	_codeQueryOwnerType: n.codeQueryOwnerType.name,
	_dataObjId: n.dataObj.id,
	_ownerId: n.owner.id,
	header: true,
	id: true,
	isAlwaysRetrieveData: true,
	isDynamicChildrenSystemParents: true,
	isHideRowManager: true,
	name: true,
	orderDefine: true,
	page: true,
	order_by: n.orderDefine
}))

const shapeTable = e.shape(e.sys_db.SysTable, (t) => ({
	hasMgmt: true,
	mod: true,
	name: true
}))

const shapeTask = e.shape(e.sys_user.SysTask, (t) => ({
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
	hasAltOpen: true,
	header: true,
	id: true,
	isPinToDash: true,
	name: true,
	noDataMsg: true
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
	_actionShows: e.select(ua.actionShows, (s) => ({
		_codeExprOp: s.codeExprOp.name,
		_codeTriggerShow: s.codeTriggerShow.name,
		exprField: true,
		exprValue: true,
		isRequired: true
	})),
	_codeAction: e.select(ua.codeAction, (ca) => ({
		...shapeCodeAction(ca)
	})),
	_codeTriggerEnable: ua.codeTriggerEnable.name,
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
		_hasItems: e.op(
			e.op('exists', doc.fieldListItems),
			'or',
			e.op(e.count(e.select(doc.items)), '>', 0)
		)
	}))

	const query = e.select(e.sys_core.SysDataObj, (do1) => {
		return {
			description: true,
			exprFilter: true,
			exprSort: true,
			exprWith: true,
			header: true,
			id: true,
			isInitialValidationSilent: true,
			isListEdit: true,
			isListSuppressFilterSort: true,
			isListSuppressSelect: true,
			isRetrieveReadonly: true,
			listEditPresetExpr: true,
			name: true,
			subHeader: true,
			_actionGroup: e.select(do1.actionGroup, (afg) => ({
				...shapeDataObjActionGroup(afg)
			})),
			_attrsAccessGroup: e.select(do1.attrsAccess, (aa) => ({
				...shapeAttrAccess(aa)
			})),
			_codeCardinality: do1.codeCardinality.name,
			_codeComponent: do1.codeComponent.name,
			_codeDataObjType: do1.codeDataObjType.name,
			_codeDoQueryType: do1.codeDoQueryType.name,
			_codeDoRenderPlatform: do1.codeDoRenderPlatform.name,
			_codeListEditPresetType: do1.codeListEditPresetType.name,
			_listReorderColumn: do1.listReorderColumn.name,
			_ownerId: do1.owner.id,
			_parent: e.select({
				_columnName: do1.parentColumn.name,
				_columnIsMultiSelect: do1.parentColumn.isMultiSelect,
				_filterExpr: do1.parentFilterExpr,
				_table: e.select(do1.parentTable, (t) => ({
					...shapeTable(t)
				}))
			}),
			_processType: do1.processType.name,
			_queryRiders: e.select(do1.queryRiders, (qr) => ({
				...shapeDataObjQueryRider(qr)
			})),
			_tables: e.select(do1.tables, (t) => ({
				...shapeDataObjTable(t)
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

				_items: e.select(doc.items, (i) => ({
					itemData: true,
					itemDisplay: true,
					order_by: i.orderDefine
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

export async function getFieldEmbedListSelect(token: TokenApiId) {
	const query = e.select(e.sys_core.SysDataObjFieldEmbedListSelect, (fels) => ({
		...shapeFieldEmbedListSelect(fels),
		filter_single: e.op(fels.name, '=', token.id)
	}))
	return await query.run(client)
}

export async function getLinkItemsSource(token: TokenApiId) {
	const query = e.select(e.sys_core.SysDataObjFieldListItems, (fli) => ({
		...shapeLinkItemsSource(fli),
		filter_single: e.op(fli.name, '=', e.cast(e.str, token.id))
	}))
	return await query.run(client)
}

export async function getNode(token: TokenApiId) {
	let query = e.select(e.sys_core.SysNodeObj, (n: any) => ({
		...shapeNodeObj(n),
		filter_single: e.op(n.id, '=', e.cast(e.uuid, token.id))
	}))
	return await query.run(client)
}

export async function getNodesSystemParents(token: TokenApiId) {
	const query = e.select(e.sys_core.SysNodeObj, (n) => ({
		...shapeNodeObj(n),
		filter: e.op(
			e.op(n.codeNodeType.name, '=', 'system'),
			'and',
			e.op(
				n.owner,
				'in',
				e.select(e.sys_core.SysSystem, (s) => ({
					filter: e.op(s.id, '=', e.cast(e.uuid, token.id))
				})).systemParents
			)
		)
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
	const result = await query.run(client, { ids: token.ids })
	return result
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

export async function getTableColumns(token: TokenApiDbTableColumns) {
	const query = e.select(e.schema.ObjectType, (ot) => ({
		name: true,
		links: e.select(ot.links, (l) => ({
			name: l.name,
			readonly: l.readonly,
			required: l.required,
			datatype: l.target.name,
			filter: e.op(l.name, '!=', '__type__')
		})),
		properties: e.select(ot.properties, (p) => ({
			name: p.name,
			readonly: p.readonly,
			required: p.required,
			datatype: p.target.name
		})),
		filter: e.op(ot.name, '=', token.tableModule + '::' + token.tableName)
	}))
	return await query.run(client)
}

export async function getUserByUserId(token: TokenApiUserId) {
	const query = e.select(e.sys_user.SysUser, (u) => ({
		_attrs: e.select(u.userTypes.attrs, (a) => ({
			...shapeAttr(a)
		})),
		_personId: u.person.id,
		_preferences: e.select(e.sys_user.SysUserPrefType, (p) => ({
			_codeType: p.codeType.name,
			isActive: true,
			filter: e.op(p.user.id, '=', u.id)
		})),
		_resources_app: e.select(e.sys_user.SysApp, (app) => ({
			_appHeader: e.select(app.appHeader, (ah) => ({
				_codeIcon: ah.codeIcon.name,
				id: true,
				header: true,
				name: true,
				orderDefine: true
			})),
			_nodes: e.select(app.nodes, (n) => ({
				...shapeNodeObj(n),
				order_by: n.orderDefine
			})),
			_ownerId: app.owner.id,
			id: true,
			name: true,
			filter: e.op(app.id, 'in', u.userTypes.resources.id),
			order_by: app.appHeader.orderDefine
		})),
		_resources_task: e.select(e.sys_user.SysTask, (res) => ({
			...shapeTask(res),
			filter: e.op(
				e.op(res.id, 'in', u.userTypes.resources.id),
				'or',
				e.op(res.isGlobalResource, '=', true)
			),
			order_by: res.orderDefine
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
		orgs: true,
		systems: true,
		userName: true,
		filter_single: e.op(u.id, '=', e.cast(e.uuid, token.userId))
	}))
	return await query.run(client)
}

export async function getUserPref(token: TokenApiUserPref) {
	const query = e.select(e.sys_user.SysUserPref, (p) => ({
		data: true,
		idFeature: true, // "data" returns corrupted w/o another property in the select
		filter_single: e.op(
			e.op(p.user, '=', e.sys_user.getUserById(token.idUser)),
			'and',
			e.op(p.idFeature, '=', e.cast(e.uuid, token.idFeature))
		)
	}))
	return await query.run(client)
}

export async function isObjectLink(objName: string, linkName: string) {
	const query = e.select(e.sys_core.isObjectLink(objName, linkName))
	return await query.run(client)
}

export async function setUserPref(token: TokenApiUserPref) {
	const CREATOR = e.sys_user.getUserById(token.idUser)
	const query = e
		.insert(e.sys_user.SysUserPref, {
			data: e.cast(e.json, JSON.stringify(token.data)),
			idFeature: e.cast(e.uuid, token.idFeature),
			user: e.select(e.sys_user.getUserById(token.idUser)),
			createdBy: CREATOR,
			modifiedBy: CREATOR
		})
		.unlessConflict((pref) => ({
			on: e.tuple([pref.idFeature, pref.user]),
			else: e.update(pref, () => ({
				set: {
					data: e.cast(e.json, JSON.stringify(token.data)),
					modifiedBy: CREATOR
				}
			}))
		}))
	return await query.run(client)
}
