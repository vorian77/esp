import { createClient } from 'edgedb'
import e, { is } from '$lib/dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'
import {
	booleanOrDefaultJSON,
	booleanOrDefaultParm,
	sectionHeader
} from '$server/dbEdge/init/dbEdgeInitUtilities10'

const client = createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

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
			isListEdit: e.optional(e.bool),
			isListHideSearch: e.optional(e.bool),
			listEditPresetExpr: e.optional(e.str),
			listReorderColumn: e.optional(e.str),
			listRowDisplayColumn: e.optional(e.str),
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
				isListEdit: booleanOrDefaultParm(p.isListEdit, false),
				isListHideSearch: booleanOrDefaultParm(p.isListHideSearch, false),
				listEditPresetExpr: p.listEditPresetExpr,
				listReorderColumn: e.select(e.sys_db.getColumn(p.listReorderColumn)),
				listRowDisplayColumn: e.select(e.sys_db.getColumn(p.listRowDisplayColumn)),
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
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObjFieldEmbedListEdit, {
				createdBy: e.select(e.sys_user.getRootUser()),
				dataObjEmbed: e.select(e.sys_core.getDataObj(p.dataObjEmbed)),
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				owner: e.select(e.sys_core.getEnt(p.owner))
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
			codePacketAction: e.str,
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
				codePacketAction: e.select(e.sys_core.getCode('ct_sys_packet_action', p.codePacketAction)),
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
