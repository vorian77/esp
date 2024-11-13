import e from '$lib/dbschema/edgeql-js'
import { client, sectionHeader } from '$routes/api/dbEdge/dbEdge'
import { TokenApiId, TokenApiIds } from '$utils/types.token'
import { TokenApiDbTableColumns, TokenApiUserId, TokenApiUserPref } from '$utils/types.token'
import { debug } from '$utils/utils.debug'

const shapeDataObjActionFieldGroup = e.shape(e.sys_core.SysDataObjActionFieldGroup, (g) => ({
	_actionFieldItems: e.select(g.actionFieldItems, (i) => ({
		_action: e.select(i.action, (a) => ({
			_actionFieldConfirms: e.select(a.actionFieldConfirms, (c) => ({
				_codeConfirmType: c.codeConfirmType.name,
				_codeTriggerConfirmConditional: c.codeTriggerConfirmConditional.name,
				confirmButtonLabelCancel: true,
				confirmButtonLabelConfirm: true,
				confirmMessage: true,
				confirmTitle: true
			})),
			_actionFieldShows: e.select(a.actionFieldShows, (s) => ({
				_codeTriggerShow: s.codeTriggerShow.name,
				isRequired: true
			})),
			_codeActionFieldTriggerEnable: a.codeActionFieldTriggerEnable.name,
			_codePacketAction: a.codePacketAction.name,
			_codeColor: a.codeColor.name,
			header: a.header,
			isListRowAction: a.isListRowAction,
			name: a.name
		})),
		order_by: i.orderDefine
	}))
}))

const shapeDataObjTable = e.shape(e.sys_core.SysDataObjTable, (dot) => ({
	_columnParent: dot.columnParent.name,
	index: true,
	indexParent: true,
	_table: e.select(dot.table, (tbl) => ({
		...shapeTable(dot.table)
	})),
	order_by: dot.index
}))

const shapeDataObjFieldListItems = e.shape(e.sys_core.SysDataObjFieldListItems, (fli) => ({
	_table: e.select(fli.table, (t) => ({
		hasMgmt: true,
		mod: true,
		name: true
	})),
	exprFilter: true,
	exprPropDisplay: true,
	exprSort: true,
	exprWith: true
}))

const shapeNodeObj = e.shape(e.sys_core.SysNodeObj, (n) => ({
	_codeIcon: n.codeIcon.name,
	_codeNodeType: n.codeNodeType.name,
	dataObjId: n.dataObj.id,
	header: true,
	id: true,
	isAlwaysRetrieveData: true,
	isHideRowManager: true,
	isSystemRoot: true,
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

export async function getDataObjActionFieldGroup(token: TokenApiId) {
	const query = e.select(e.sys_core.SysDataObjActionFieldGroup, (a) => ({
		...shapeDataObjActionFieldGroup(a),
		filter_single: e.op(a.name, '=', token.id)
	}))
	return await query.run(client)
}

export async function getDataObjById(token: TokenApiId) {
	const shapeProp = e.shape(e.sys_core.SysDataObjColumn, (doc) => ({
		...shapeColumnHasItems(doc),
		_codeSortDir: doc.codeSortDir.name,
		_link: e.select(doc, (l) => ({
			_columns: e.select(l.linkColumns, (c) => ({
				_name: c.column.name,
				order_by: c.orderDefine
			})),
			_table: e.select(l.linkTable, (t) => ({
				hasMgmt: true,
				mod: true,
				name: true
			})),
			exprPreset: l.linkExprPreset,
			exprSave: l.linkExprSave,
			exprSelect: l.linkExprSelect
		})),
		_linkItemsDefn: e.select(doc.fieldListItems, (fli) => ({
			_fieldListItemsParmName: doc.fieldListItemsParmName,
			_table: e.select(fli.table, (t) => ({
				hasMgmt: true,
				mod: true,
				name: true
			})),
			exprFilter: true,
			exprPropDisplay: true,
			exprSort: true,
			exprWith: true
		})),
		_propName: e.op(doc.nameCustom, '??', doc.column.name),
		exprCustom: true,
		exprPreset: true,
		indexTable: true
	}))

	const shapePropDB = e.shape(e.sys_core.SysDataObjColumn, (doc) => ({
		...shapeProp(doc),
		_codeDataType: doc.column.codeDataType.name,
		_codeDbDataSourceValue: doc.codeDbDataSourceValue.name,
		_columnBacklink: doc.columnBacklink.name,
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
			exprObject: true,
			exprSort: true,
			header: true,
			id: true,
			isListEdit: true,
			isListSuppressFilterSort: true,
			isListSuppressSelect: true,
			listEditPresetExpr: true,
			name: true,
			subHeader: true,
			_actionFieldGroup: e.select(do1.actionFieldGroup, (afg) => ({
				...shapeDataObjActionFieldGroup(afg)
			})),
			_actionsQuery: e.select(do1.actionsQuery, (a) => ({
				name: true,
				_parms: e.select(a.parms, (p) => ({
					key: true,
					value: true
				})),
				_triggers: e.select(a.triggers, (t) => ({
					_codeQueryType: t.codeQueryType.name,
					_codeTriggerTiming: t.codeTriggerTiming.name
				}))
			})),
			_codeCardinality: do1.codeCardinality.name,
			_codeComponent: do1.codeComponent.name,
			_codeListEditPresetType: do1.codeListEditPresetType.name,
			_listReorderColumn: do1.listReorderColumn.name,
			_parent: e.select({
				_columnName: do1.parentColumn.name,
				_columnIsMultiSelect: do1.parentColumn.isMultiSelect,
				_filterExpr: do1.parentFilterExpr,
				_table: e.select(do1.parentTable, (t) => ({
					...shapeTable(t)
				}))
			}),
			_processType: do1.processType.name,
			_tables: e.select(do1.tables, (t) => ({
				...shapeDataObjTable(t)
			})),

			/* props */
			_propsCrumb: e.select(do1.columns, (doc) => ({
				_name: doc.column.name,
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
					isMultiSelect: true,
					isNonData: true,
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
					_customColCodeColor: c.customColCodeColor.name,
					customColActionMethod: true,
					customColActionType: true,
					customColActionValue: true,
					customColAlign: true,
					customColIsSubHeader: true,
					customColLabel: true,
					customColPrefix: true,
					customColSize: true,
					customColSource: true,
					customColSourceKey: true
				})),
				_fieldEmbedListConfig: e.select(doc.fieldEmbedListConfig, (fe) => ({
					_actionFieldGroupModal: e.select(fe.actionFieldGroupModal, (afg) => ({
						...shapeDataObjActionFieldGroup(afg)
					})),
					_dataObjEmbedId: fe.dataObjEmbed.id,
					_dataObjModalId: fe.dataObjModal.id
				})),
				_fieldEmbedListEdit: e.select(doc.fieldEmbedListEdit, (fe) => ({
					_dataObjEmbedId: fe.dataObjEmbed.id
				})),
				_fieldEmbedListSelect: e.select(doc.fieldEmbedListSelect, (fe) => ({
					_actionFieldGroupModal: e.select(fe.actionFieldGroupModal, (afg) => ({
						...shapeDataObjActionFieldGroup(afg)
					})),
					_dataObjListId: fe.dataObjList.id,
					btnLabelComplete: true
				})),
				_fieldEmbedShellFields: e.select(doc.customEmbedShellFields, (ce) => ({
					_name: ce.column.name,
					order_by: ce.orderDefine
				})),

				_items: e.select(doc.items, (i) => ({
					data: true,
					display: true,
					order_by: i.orderDefine
				})),

				headerAlt: true,
				height: true,
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
						e.op('not', e.op('exists', doc.linkTable))
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
						e.op('not', e.op('exists', doc.linkTable))
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

export async function getNodeObjByName(token: TokenApiId) {
	const query = e.select(e.sys_core.SysNodeObj, (n) => ({
		...shapeNodeObj(n),
		filter_single: e.op(n.name, '=', token.id)
	}))
	return await query.run(client)
}

export async function getNodesBranch(token: TokenApiId) {
	const parentNodeId = token.id
	const query = e.select(e.sys_core.SysNodeObj, (n) => ({
		_codeIcon: n.codeIcon.name,
		_codeNodeType: n.codeNodeType.name,
		dataObjId: n.dataObj.id,
		header: true,
		id: true,
		name: true,
		orderDefine: true,
		page: true,
		filter: e.op(n.parent.id, '=', e.cast(e.uuid, parentNodeId)),
		order_by: n.orderDefine
	}))
	return await query.run(client)
}

export async function getNodesLevel(token: TokenApiId) {
	const parentNodeId = token.id
	const root = e.select(e.sys_core.SysNodeObj, (n: any) => ({
		...shapeNodeObj(n),
		filter: e.op(n.parent.id, '=', e.cast(e.uuid, parentNodeId))
	}))
	const children = e.select(e.sys_core.SysNodeObj, (n: any) => ({
		...shapeNodeObj(n),
		filter: e.op(n.parent.parent.id, '=', e.cast(e.uuid, parentNodeId))
	}))
	const query = e.select({ root, children })
	return await query.run(client)
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
				_fieldListItems: e.select(p.fieldListItems, (i) => ({
					...shapeDataObjFieldListItems(i),
					_fieldListItemsParmName: p.fieldListItemsParmName
				})),
				_linkTable: e.select(p.linkTable, (t) => ({
					...shapeTable(t)
				})),
				description: true,
				fieldListItemsParmName: true,
				header: true,
				isMultiSelect: true,
				name: true
			})),
			parmValue: true
		})),
		report: e.select(r.report, (rep) => ({
			_actionFieldGroup: e.select(rep.actionFieldGroup, (afg) => ({
				...shapeDataObjActionFieldGroup(afg)
			})),
			description: true,
			elements: e.select(rep.elements, (repE) => ({
				...shapeRepEl(repE),
				order_by: repE.orderDefine
			})),
			exprFilter: true,
			exprObject: true,
			exprSort: true,
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

export async function getReportUserParmItems(repUserId: string) {
	const query = e.select(e.sys_rep.SysRepUser, (r) => ({
		id: true,
		_header: r.headerUser,
		_name: r.report.name,
		parms: e.select(r.parms, (up) => ({
			parm: e.select(up.parm, (p) => ({
				_codeDataType: p.codeDataType.name,
				_fieldListItems: e.select(p.fieldListItems, (i) => ({
					...shapeDataObjFieldListItems(i),
					_fieldListItemsParmName: p.fieldListItemsParmName
				})),
				_isMultiSelect: p.isMultiSelect,
				_propName: p.name
			})),
			filter: e.op('exists', up.parm.fieldListItems)
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
		avatar: u.person.avatar,
		firstName: u.person.firstName,
		fullName: u.person.fullName,
		id: true,
		lastName: u.person.lastName,
		org: e.select(e.sys_core.SysOrg, (o) => ({
			appName: true,
			name: true,
			logoFileName: true,
			filter_single: e.op(o.id, '=', u.owner.id)
		})),
		preferences: e.select(e.sys_user.SysUserPrefType, (p) => ({
			_codeType: p.codeType.name,
			isActive: true,
			filter: e.op(p.user.id, '=', u.id)
		})),
		resources_core: e.select(u.userTypes.resources, (r) => ({
			_codeType: r.codeType.name,
			_resource: e.select(r.resource, (obj) => ({
				header: true,
				id: true,
				name: true
			})),
			filter: e.op(r.codeType.name, '!=', 'subject')
		})),
		resources_subject: e.select(u.userTypes.resources, (r) => ({
			_codeType: r.codeType.name,
			_resource: e.select(r.resource.is(e.sys_core.SysObjSubject), (obj) => ({
				_codeType: obj.codeType.name,
				header: true,
				id: true,
				name: true
			})),
			filter: e.op(r.codeType.name, '=', 'subject')
		})),
		systems: e.select(u.systems, (s) => ({
			header: true,
			id: true,
			name: true
		})),
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

export async function getUserResourcesApp(token: TokenApiUserId) {
	const query = e.select(e.sys_core.SysApp, (res) => ({
		appHeader: e.select(res.appHeader, (ah) => ({
			_codeIcon: ah.codeIcon.name,
			id: true,
			header: true,
			name: true,
			orderDefine: true
		})),
		id: true,
		nodes: e.select(res.nodes, (n) => ({
			_codeIcon: n.codeIcon.name,
			_codeNodeType: n.codeNodeType.name,
			dataObjId: n.dataObj.id,
			header: true,
			id: true,
			name: true,
			orderDefine: true,
			page: true,
			order_by: n.orderDefine
		})),
		filter: e.op(
			res.id,
			'in',
			e.select(e.sys_user.SysUser, (user) => ({
				filter: e.op(
					e.op(user.id, '=', e.cast(e.uuid, token.userId)),
					'and',
					e.op(user.userTypes.resources.codeType.name, '=', 'app')
				)
			})).userTypes.resources.resource.id
		),
		order_by: res.appHeader.orderDefine
	}))
	return await query.run(client)
}

export async function getUserResourcesFooter(token: TokenApiUserId) {
	const query = e.select(e.sys_core.SysNodeObj, (res) => ({
		_codeIcon: res.codeIcon.name,
		_codeNodeType: res.codeNodeType.name,
		dataObjId: res.dataObj.id,
		header: true,
		id: true,
		name: true,
		orderDefine: true,
		page: true,
		filter: e.op(
			e.op(e.op(res.codeNavType.name, '=', 'footer'), 'and', e.op(res.isGlobalResource, '=', true)),
			'or',
			e.op(
				res.id,
				'in',
				e.select(e.sys_user.SysUser, (user) => ({
					filter: e.op(
						e.op(user.id, '=', e.cast(e.uuid, token.userId)),
						'and',
						e.op(user.userTypes.resources.codeType.name, '=', 'footer')
					)
				})).userTypes.resources.resource.id
			)
		),
		order_by: res.orderDefine
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
