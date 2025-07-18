import e from '$db/gel/edgeql-js'
import {
	client,
	booleanOrDefaultJSON,
	sectionHeader,
	valueOrDefaultParm
} from '$routes/api/db/dbGel/dbGel'
import { debug } from '$utils/types'

export async function addDataObj(data: any) {
	sectionHeader(`addDataObj - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			actionGroup: e.optional(e.str),
			actionsQuery: e.optional(e.array(e.json)),
			attrsAccess: e.optional(e.array(e.json)),
			attrsSource: e.optional(e.array(e.json)),
			codeCardinality: e.str,
			codeDataObjType: e.optional(e.str),
			codeListPresetType: e.optional(e.str),
			description: e.optional(e.str),
			exprFilter: e.optional(e.str),
			exprSort: e.optional(e.str),
			exprWith: e.optional(e.str),
			exprUnions: e.optional(e.array(e.str)),
			fields: e.optional(e.array(e.json)),
			gridStyles: e.optional(e.array(e.json)),
			header: e.optional(e.str),
			isFormReadonly: e.optional(e.bool),
			isInitialValidationSilent: e.optional(e.bool),
			isListEdit: e.optional(e.bool),
			isListSuppressFilterSort: e.optional(e.bool),
			isListSuppressSelect: e.optional(e.bool),
			listPresetExpr: e.optional(e.str),
			listReorderColumn: e.optional(e.str),
			name: e.str,
			owner: e.str,
			parentColumn: e.optional(e.str),
			parentFilterExpr: e.optional(e.str),
			parentTable: e.optional(e.str),
			processType: e.optional(e.str),
			queryRiders: e.optional(e.array(e.json)),
			subHeader: e.optional(e.str),
			tables: e.optional(e.array(e.json))
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObj, {
				actionGroup: e.select(e.sys_core.getDataObjActionGroup(p.actionGroup)),
				codeCardinality: e.select(e.sys_core.getCode('ct_sys_do_cardinality', p.codeCardinality)),
				codeDataObjType: e.op(
					e.sys_core.getCode('ct_sys_do_type', p.codeDataObjType),
					'if',
					e.op('exists', p.codeDataObjType),
					'else',
					e.sys_core.getCode('ct_sys_do_type', 'doDefault')
				),
				codeListPresetType: e.select(
					e.sys_core.getCode('ct_sys_do_list_edit_preset_type', p.codeListPresetType)
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
						customColCodeComponent: e.sys_core.getCode(
							'ct_sys_do_component',
							e.cast(e.str, e.json_get(e.json_get(f, 'customElement'), 'codeComponent'))
						),
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

						fieldListItemsParmValue: e.cast(e.str, e.json_get(f, 'fieldListItemsParmValue')),

						fieldListItemsParmValueList: e.op(
							e.for(e.json_array_unpack(e.json_get(f, 'fieldListItemsParmValueList')), (v) => {
								return e.cast(e.str, v)
							}),
							'if',
							e.op('exists', e.json_get(f, 'fieldListItemsParmValueList')),
							'else',
							e.cast(e.str, e.set())
						),

						gridStyles: e.for(
							e.json_array_unpack(e.json_get(f, 'gridStyles') || e.cast(e.array(e.json), e.set())),
							(gs) => {
								return e.insert(e.sys_core.SysGridStyle, {
									exprTrigger: e.cast(e.str, e.json_get(gs, 'exprTrigger')),
									prop: e.cast(e.str, e.json_get(gs, 'prop')),
									propValue: e.cast(e.str, e.json_get(gs, 'propValue'))
								})
							}
						),

						headerAlt: e.cast(e.str, e.json_get(f, 'headerAlt')),

						height: e.cast(e.int16, e.json_get(f, 'height')),

						inputMaskAlt: e.cast(e.str, e.json_get(f, 'inputMaskAlt')),

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
				exprSort: p.exprSort,
				exprWith: p.exprWith,
				exprUnions: e.for(e.array_unpack(p.exprUnions), (eu) => {
					return eu
				}),
				header: p.header,
				isFormReadonly: valueOrDefaultParm(p.isFormReadonly, false),
				isInitialValidationSilent: valueOrDefaultParm(p.isInitialValidationSilent, false),
				isListEdit: valueOrDefaultParm(p.isListEdit, false),
				isListSuppressFilterSort: valueOrDefaultParm(p.isListSuppressFilterSort, false),
				isListSuppressSelect: valueOrDefaultParm(p.isListSuppressSelect, false),
				listPresetExpr: p.listPresetExpr,
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
							headerAlt: e.cast(e.str, e.json_get(a, 'headerAlt')),
							isListRowAction: booleanOrDefaultJSON(a, 'isListRowAction', false),
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
			exprUnions: e.optional(e.array(e.str)),
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
				exprUnions: e.for(e.array_unpack(p.exprUnions), (eu) => {
					return eu
				}),
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
			actionConfirms: e.optional(e.array(e.json)),
			codeAction: e.str,
			codeConfirmType: e.optional(e.str),
			exprAction: e.optional(e.str),
			exprEnable: e.optional(e.str),
			exprShow: e.optional(e.str),
			exprShowExpr: e.optional(e.str),
			exprWith: e.optional(e.str),
			header: e.optional(e.str),
			name: e.str,
			navDestination: e.optional(e.json),
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_user.SysUserAction, {
				actionConfirms: e.for(
					e.array_unpack(p.actionConfirms || e.cast(e.array(e.json), e.set())),
					(a) => {
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
					}
				),
				codeAction: e.sys_core.getCodeAction(p.codeAction),
				codeConfirmType: e.sys_core.getCode(
					'ct_sys_user_action_confirm_type',
					e.op(p.codeConfirmType, '??', 'none')
				),
				codeAttrType: e.sys_core.getCodeAttrType('at_user_user_action'),
				createdBy: CREATOR,
				exprAction: p.exprAction,
				exprEnable: p.exprEnable,
				exprShow: p.exprShow,
				exprShowExpr: p.exprShowExpr,
				exprWith: p.exprWith,
				header: p.header,
				modifiedBy: CREATOR,
				name: p.name,
				owner: e.sys_core.getSystemPrime(p.owner)
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
			customEmbedShellFields: e.array(e.str),
			gridStyles: e.optional(e.array(e.json))
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
										return e.sys_core.getDataObjColumn(p.dataObjName, f)
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
