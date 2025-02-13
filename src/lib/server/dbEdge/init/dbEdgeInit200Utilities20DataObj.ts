import e from '$db/esdl/edgeql-js'
import {
	client,
	booleanOrDefaultJSON,
	sectionHeader,
	valueOrDefaultParm
} from '$routes/api/dbEdge/dbEdge'
import { debug } from '$utils/types'

export async function addDataObj(data: any) {
	sectionHeader(`addDataObj - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const actionsQuery = data.actionsQuery && data.actionsQuery.length > 0 ? data.actionsQuery : []
	const query = e.params(
		{
			actionGroup: e.optional(e.str),
			actionsQuery: e.optional(e.array(e.json)),
			codeCardinality: e.str,
			codeComponent: e.str,
			codeDataObjType: e.optional(e.str),
			codeListEditPresetType: e.optional(e.str),
			description: e.optional(e.str),
			exprFilter: e.optional(e.str),
			exprObject: e.optional(e.str),
			exprSort: e.optional(e.str),
			exprWith: e.optional(e.str),
			fields: e.optional(e.array(e.json)),
			header: e.optional(e.str),
			isDetailRetrievePreset: e.optional(e.bool),
			isInitialValidationSilent: e.optional(e.bool),
			isListEdit: e.optional(e.bool),
			isListSuppressFilterSort: e.optional(e.bool),
			isListSuppressSelect: e.optional(e.bool),
			listEditPresetExpr: e.optional(e.str),
			listReorderColumn: e.optional(e.str),
			name: e.str,
			owner: e.str,
			parentColumn: e.optional(e.str),
			parentFilterExpr: e.optional(e.str),
			parentTable: e.optional(e.str),
			processType: e.optional(e.str),
			subHeader: e.optional(e.str),
			tables: e.optional(e.array(e.json))
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObj, {
				actionGroup: e.select(e.sys_core.getDataObjActionGroup(p.actionGroup)),
				actionsQuery: e.for(e.array_unpack(p.actionsQuery), (a) => {
					return e.insert(e.sys_core.SysDataObjActionQuery, {
						name: e.cast(e.str, e.json_get(a, 'name')),
						createdBy: CREATOR,
						modifiedBy: CREATOR,
						parms: e.for(e.array_unpack(e.cast(e.array(e.json), e.json_get(a, 'parms'))), (p) => {
							return e.insert(e.sys_core.SysDataObjActionQueryParm, {
								createdBy: CREATOR,
								key: e.cast(e.str, e.json_get(p, 'key')),
								modifiedBy: CREATOR,
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
									createdBy: CREATOR,
									modifiedBy: CREATOR
								})
							}
						)
					})
				}),
				codeCardinality: e.select(e.sys_core.getCode('ct_sys_do_cardinality', p.codeCardinality)),
				codeComponent: e.select(e.sys_core.getCode('ct_sys_do_component', p.codeComponent)),
				codeDataObjType: e.op(
					e.sys_core.getCode('ct_sys_do_type', p.codeDataObjType),
					'if',
					e.op('exists', p.codeDataObjType),
					'else',
					e.sys_core.getCode('ct_sys_do_type', 'default')
				),
				codeListEditPresetType: e.select(
					e.sys_core.getCode('ct_sys_do_list_edit_preset_type', p.codeListEditPresetType)
				),
				columns: e.for(e.array_unpack(p.fields), (f) => {
					return e.insert(e.sys_core.SysDataObjColumn, {
						column: e.sys_db.getColumn(e.cast(e.str, e.json_get(f, 'columnName'))),

						/* DB */
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

						columnBacklink: e.op(
							e.sys_db.getColumn(e.cast(e.str, e.json_get(f, 'columnBacklink'))),
							'if',
							e.op('exists', e.cast(e.str, e.json_get(f, 'columnBacklink'))),
							'else',
							e.cast(e.sys_db.SysColumn, e.set())
						),

						exprCustom: e.cast(e.str, e.json_get(f, 'exprCustom')),

						exprPreset: e.cast(e.str, e.json_get(f, 'exprPreset')),

						exprSave: e.cast(e.str, e.json_get(f, 'exprSave')),

						indexTable: e.cast(e.int16, e.json_get(f, 'indexTable')),

						isDisplay: booleanOrDefaultJSON(f, 'isDisplay', true),

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
									createdBy: CREATOR,
									modifiedBy: CREATOR
								})
							}
						),
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
								e.cast(e.str, e.json_get(f, 'codeAccess'))
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
						action: e.sys_user.getUserAction(
							e.cast(e.str, e.json_get(e.json_get(f, 'customElement'), 'action'))
						),
						actionAlertMsg: e.cast(
							e.str,
							e.json_get(e.json_get(f, 'customElement'), 'actionAlertMsg')
						),
						customColActionValue: e.cast(
							e.str,
							e.json_get(e.json_get(f, 'customElement'), 'value')
						),
						customColAlign: e.cast(e.str, e.json_get(e.json_get(f, 'customElement'), 'align')),
						customColIsSubHeader: booleanOrDefaultJSON(
							e.json_get(f, 'customElement'),
							'isSubHeader',
							false
						),
						customColLabel: e.cast(e.str, e.json_get(e.json_get(f, 'customElement'), 'label')),
						customColPrefix: e.cast(e.str, e.json_get(e.json_get(f, 'customElement'), 'prefix')),
						customColRawHTML: e.cast(e.str, e.json_get(e.json_get(f, 'customElement'), 'rawHTML')),
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

						createdBy: CREATOR,

						modifiedBy: CREATOR
					})
				}),

				createdBy: CREATOR,
				description: p.description,
				exprFilter: p.exprFilter,
				exprObject: p.exprObject,
				exprSort: p.exprSort,
				exprWith: p.exprWith,
				header: p.header,
				isDetailRetrievePreset: valueOrDefaultParm(p.isDetailRetrievePreset, false),
				isInitialValidationSilent: valueOrDefaultParm(p.isInitialValidationSilent, false),
				isListEdit: valueOrDefaultParm(p.isListEdit, false),
				isListSuppressFilterSort: valueOrDefaultParm(p.isListSuppressFilterSort, false),
				isListSuppressSelect: valueOrDefaultParm(p.isListSuppressSelect, false),
				listEditPresetExpr: p.listEditPresetExpr,
				listReorderColumn: e.select(e.sys_db.getColumn(p.listReorderColumn)),
				modifiedBy: CREATOR,
				name: p.name,
				owner: e.sys_core.getSystemPrime(p.owner),
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
						columnsId: e.assert_distinct(
							e.for(e.array_unpack(e.cast(e.array(e.str), e.json_get(t, 'columnsId'))), (c) => {
								return e.select(e.sys_db.getColumn(c))
							})
						),
						createdBy: CREATOR,
						exprFilterUpdate: e.cast(e.str, e.json_get(t, 'exprFilterUpdate')),
						index: e.cast(e.int16, e.json_get(t, 'index')),
						indexParent: e.cast(e.int16, e.json_get(t, 'indexParent')),
						isTableExtension: valueOrDefaultParm(
							e.cast(e.bool, e.json_get(t, 'isTableExtension')),
							false
						),
						modifiedBy: CREATOR,
						table: e.select(e.sys_db.getTable(e.cast(e.str, e.json_get(t, 'table'))))
					})
				})
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObjActionGroup(data: any) {
	sectionHeader(`addDataObjActionGroup - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			actions: e.json,
			name: e.str,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObjActionGroup, {
				dataObjActions: e.assert_distinct(
					e.for(e.json_array_unpack(p.actions), (a) => {
						return e.insert(e.sys_core.SysDataObjAction, {
							createdBy: CREATOR,
							action: e.sys_user.getUserAction(e.cast(e.str, e.json_get(a, 'action'))),
							codeColor: e.sys_core.getCode(
								'ct_sys_tailwind_color',
								e.cast(e.str, e.json_get(a, 'codeColor'))
							),
							isListRowAction: e.cast(e.bool, e.json_get(a, 'isListRowAction')),
							modifiedBy: CREATOR,
							orderDefine: e.cast(e.int16, e.json_get(a, 'orderDefine'))
						})
					})
				),
				createdBy: CREATOR,
				modifiedBy: CREATOR,
				name: p.name,
				owner: e.sys_core.getSystemPrime(p.owner)
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObjFieldEmbedListConfig(data: any) {
	sectionHeader(`addDataObjFieldEmbedListConfig - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()

	const query = e.params(
		{
			actionGroupModal: e.str,
			dataObjEmbed: e.str,
			dataObjModal: e.str,
			name: e.str,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObjFieldEmbedListConfig, {
				actionGroupModal: e.select(e.sys_core.getDataObjActionGroup(p.actionGroupModal)),
				createdBy: CREATOR,
				dataObjEmbed: e.select(e.sys_core.getDataObj(p.dataObjEmbed)),
				dataObjModal: e.select(e.sys_core.getDataObj(p.dataObjModal)),
				modifiedBy: CREATOR,
				name: p.name,
				owner: e.sys_core.getSystemPrime(p.owner)
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObjFieldEmbedListEdit(data: any) {
	sectionHeader(`addDataObjFieldEmbedListEdit - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()

	const query = e.params(
		{
			dataObjEmbed: e.str,
			name: e.str,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObjFieldEmbedListEdit, {
				createdBy: CREATOR,
				dataObjEmbed: e.select(e.sys_core.getDataObj(p.dataObjEmbed)),
				modifiedBy: CREATOR,
				name: p.name,
				owner: e.sys_core.getSystemPrime(p.owner)
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObjFieldEmbedListSelect(data: any) {
	sectionHeader(`addDataObjFieldEmbedListSelect - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()

	const query = e.params(
		{
			actionGroupModal: e.optional(e.str),
			btnLabelComplete: e.optional(e.str),
			dataObjList: e.str,
			name: e.str,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObjFieldEmbedListSelect, {
				actionGroupModal: e.select(e.sys_core.getDataObjActionGroup(p.actionGroupModal)),
				btnLabelComplete: p.btnLabelComplete,
				createdBy: CREATOR,
				dataObjList: e.select(e.sys_core.getDataObj(p.dataObjList)),
				modifiedBy: CREATOR,
				name: p.name,
				owner: e.sys_core.getSystemPrime(p.owner)
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObjFieldItems(data: any) {
	sectionHeader(`addDataObjFieldItems - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			codeDataTypeDisplay: e.optional(e.str),
			codeMask: e.optional(e.str),
			displayIdSeparator: e.optional(e.str),
			exprFilter: e.optional(e.str),
			exprSort: e.optional(e.str),
			exprWith: e.optional(e.str),
			name: e.str,
			props: e.array(e.json),
			owner: e.str,
			table: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObjFieldListItems, {
				codeDataTypeDisplay: e.sys_core.getCode('ct_db_col_data_type', p.codeDataTypeDisplay),
				codeMask: e.sys_core.getCode('ct_db_col_mask', p.codeMask),
				createdBy: CREATOR,
				displayIdSeparator: p.displayIdSeparator,
				exprFilter: p.exprFilter,
				exprSort: p.exprSort,
				exprWith: p.exprWith,
				modifiedBy: CREATOR,
				name: p.name,
				owner: e.sys_core.getSystemPrime(p.owner),
				props: e.for(e.array_unpack(p.props), (p) => {
					return e.insert(e.sys_core.SysDataObjFieldListItemsProp, {
						orderDefine: e.cast(e.int16, p[0]),
						key: e.cast(e.str, p[1]),
						header: e.cast(e.str, p[2]),
						expr: e.cast(e.str, p[3]),
						isDisplayId: e.cast(e.bool, p[4]),
						orderSort: e.cast(e.int16, p[5])
					})
				}),
				table: e.select(e.sys_db.getTable(p.table))
			})
		}
	)
	return await query.run(client, data)
}

export async function addUserAction(data: any) {
	sectionHeader(`addUserAction - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			actionAlertMsg: e.optional(e.str),
			actionConfirms: e.array(e.json),
			actionShows: e.array(e.json),
			codeAction: e.json,
			codeTriggerEnable: e.str,
			header: e.optional(e.str),
			name: e.str,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_user.SysUserAction, {
				actionAlertMsg: p.actionAlertMsg,
				actionConfirms: e.for(e.array_unpack(p.actionConfirms), (a) => {
					return e.insert(e.sys_user.SysUserActionConfirm, {
						codeConfirmType: e.select(
							e.sys_core.getCode(
								'ct_sys_user_action_confirm_type',
								e.cast(e.str, e.json_get(a, 'codeConfirmType'))
							)
						),
						codeTriggerConfirmConditional: e.select(
							e.sys_core.getCode(
								'ct_sys_user_action_trigger',
								e.cast(e.str, e.json_get(a, 'codeTriggerConfirmConditional'))
							)
						),
						confirmButtonLabelCancel: e.cast(e.str, e.json_get(a, 'confirmButtonLabelCancel')),
						confirmButtonLabelConfirm: e.cast(e.str, e.json_get(a, 'confirmButtonLabelConfirm')),
						confirmMessage: e.cast(e.str, e.json_get(a, 'confirmMessage')),
						confirmTitle: e.cast(e.str, e.json_get(a, 'confirmTitle')),
						createdBy: CREATOR,
						modifiedBy: CREATOR
					})
				}),
				actionShows: e.for(e.array_unpack(p.actionShows), (a) => {
					return e.insert(e.sys_user.SysUserActionShow, {
						codeTriggerShow: e.select(
							e.sys_core.getCode(
								'ct_sys_user_action_trigger',
								e.cast(e.str, e.json_get(a, 'codeTriggerShow'))
							)
						),
						createdBy: CREATOR,
						isRequired: e.cast(e.bool, e.json_get(a, 'isRequired')),
						modifiedBy: CREATOR
					})
				}),
				codeAction: e.select(
					e.sys_core.getCodeAction(
						e.cast(e.str, e.json_get(p.codeAction, 'codeType')),
						e.cast(e.str, e.json_get(p.codeAction, 'name'))
					)
				),
				codeTriggerEnable: e.select(
					e.sys_core.getCode('ct_sys_user_action_trigger', p.codeTriggerEnable)
				),
				createdBy: CREATOR,
				header: p.header,
				modifiedBy: CREATOR,
				name: p.name,
				owner: e.sys_core.getSystemPrime(p.owner)
			})
		}
	)
	return await query.run(client, data)
}

export async function dataObjColumnItemChangeBulk(data: any) {
	sectionHeader('SysDataObjColumnItemChange - Bulk')
	const CREATOR = e.sys_user.getRootUser()

	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.for(e.array_unpack(e.cast(e.array(e.json), i[1])), (trigger) => {
				return e.update(e.sys_core.SysDataObjColumn, (sdoc) => ({
					filter: e.op(
						e.op(
							sdoc.id,
							'in',
							e.select(e.sys_core.SysDataObj, (sdo) => ({
								filter: e.op(sdo.name, '=', e.cast(e.str, i[0]))
							})).columns.id
						),
						'and',
						e.op(sdoc.column.name, '=', e.cast(e.str, e.json_get(trigger, 'fieldTrigger')))
					),
					set: {
						itemChanges: {
							'+=': e.for(
								e.array_unpack(e.cast(e.array(e.json), trigger.fieldTriggerTargets)),
								(target) => {
									return e.insert(e.sys_core.SysDataObjColumnItemChange, {
										codeAccess: e.sys_core.getCode(
											'ct_sys_do_field_access',
											e.cast(e.str, e.json_get(target, 'fieldAccess'))
										),
										codeOp: e.sys_core.getCode(
											'ct_sys_do_field_item_change_op',
											e.cast(e.str, e.json_get(target, 'op'))
										),
										codeValueTarget: e.sys_core.getCodeSystem(
											e.cast(
												e.str,
												e.json_get(e.cast(e.json, e.json_get(target, 'codeValueTarget')), 'owner')
											),
											e.cast(
												e.str,
												e.json_get(
													e.cast(e.json, e.json_get(target, 'codeValueTarget')),
													'codeType'
												)
											),
											e.cast(
												e.str,
												e.json_get(e.cast(e.json, e.json_get(target, 'codeValueTarget')), 'name')
											)
										),
										codeValueTrigger: e.sys_core.getCodeSystem(
											e.cast(
												e.str,
												e.json_get(e.cast(e.json, e.json_get(target, 'codeValueTrigger')), 'owner')
											),
											e.cast(
												e.str,
												e.json_get(
													e.cast(e.json, e.json_get(target, 'codeValueTrigger')),
													'codeType'
												)
											),
											e.cast(
												e.str,
												e.json_get(e.cast(e.json, e.json_get(target, 'codeValueTrigger')), 'name')
											)
										),
										codeValueTypeTarget: e.sys_core.getCode(
											'ct_sys_do_field_item_change_type_target',
											e.cast(e.str, e.json_get(target, 'codeValueTypeTarget'))
										),
										codeValueTypeTrigger: e.sys_core.getCode(
											'ct_sys_do_field_item_change_type_trigger',
											e.cast(e.str, e.json_get(target, 'codeValueTypeTrigger'))
										),
										column: e.sys_core.getDataObjColumn(
											e.cast(e.str, e.cast(e.str, i[0])),
											e.cast(e.str, e.json_get(target, 'column'))
										),
										createdBy: CREATOR,
										modifiedBy: CREATOR,
										orderDefine: e.cast(e.int16, e.json_get(target, 'orderDefine')),
										selectParmName: e.cast(e.str, e.json_get(target, 'selectParmName')),
										valueScalarTarget: e.cast(e.str, e.json_get(target, 'valueScalarTarget')),
										valueScalarTrigger: e.cast(e.str, e.json_get(target, 'valueScalarTrigger'))
									})
								}
							)
						}
					}
				}))
			})
		})
	})
	return await query.run(client, { data })
}

export async function updateDataObjColumnCustomEmbedShellFields(data: any) {
	sectionHeader(`updateDataObjColumnCustomEmbedShellFields - ${data.dataObjName}`)
	const query = e.params(
		{
			dataObjName: e.str,
			columnName: e.str,
			customEmbedShellFields: e.array(e.str)
		},
		(p) => {
			return e.update(e.sys_core.SysDataObj, (d0) => ({
				filter: e.op(d0.name, '=', p.dataObjName),
				set: {
					columns: {
						'+=': e.update(d0.columns, (c0) => ({
							filter: e.op(c0.column.name, '=', p.columnName),
							set: {
								customEmbedShellFields: e.assert_distinct(
									e.for(e.array_unpack(p.customEmbedShellFields), (f) => {
										return e.select(e.sys_core.SysDataObjColumn, (c1) => ({
											filter: e.op(
												e.op(
													c1,
													'in',
													e.select(e.sys_core.SysDataObj, (d1) => ({
														filter: e.op(d1.name, '=', p.dataObjName)
													})).columns
												),
												'and',
												e.op(c1.column.name, '=', f)
											)
										}))
									})
								)
							}
						}))
					}
				}
			}))
		}
	)
	return await query.run(client, data)
}
