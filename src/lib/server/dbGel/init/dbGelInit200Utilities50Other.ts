import e from '$db/gel/edgeql-js'
import { client, sectionHeader, valueOrDefaultParm } from '$routes/api/db/dbGel/dbGel'
import { type DataRecord, debug } from '$utils/types'

export async function addApp(data: any) {
	sectionHeader(`addApp - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			appHeader: e.str,
			isGlobalResource: e.bool,
			name: e.str,
			owner: e.str,
			nodes: e.array(e.str)
		},
		(p) => {
			return e.insert(e.sys_user.SysApp, {
				appHeader: e.select(e.sys_user.SysAppHeader, (sah) => ({
					filter_single: e.op(sah.name, '=', p.appHeader)
				})),
				createdBy: CREATOR,
				isGlobalResource: p.isGlobalResource,
				name: p.name,
				owner: e.sys_core.getSystemPrime(p.owner),
				modifiedBy: CREATOR,
				nodes: e.assert_distinct(
					e.for(e.array_unpack(p.nodes), (nodeName) => {
						return e.sys_core.getNodeObjByName(nodeName)
					})
				)
			})
		}
	)
	return await query.run(client, data)
}

export async function addAppHeader(data: any) {
	sectionHeader(`addAppHeader - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			codeIcon: e.str,
			header: e.optional(e.str),
			isGlobalResource: e.bool,
			name: e.str,
			orderDefine: e.int16,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_user.SysAppHeader, {
				codeIcon: e.select(e.sys_core.getCode('ct_sys_icon', p.codeIcon)),
				header: p.header,
				isGlobalResource: p.isGlobalResource,
				name: p.name,
				orderDefine: p.orderDefine,
				owner: e.sys_core.getSystemPrime(p.owner),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		}
	)
	return await query.run(client, data)
}

export async function addObjAttr(data: any) {
	sectionHeader(`addObjAttr - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			code: e.str,
			header: e.str,
			name: e.str,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysObjAttr, {
				codeAttrType: e.sys_core.getCode('ct_sys_obj_attr_type', p.code),
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

export async function addCode(data: any) {
	sectionHeader(`addCode - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			owner: e.str,
			codeType: e.str,
			parent: e.optional(e.json),
			header: e.optional(e.str),
			name: e.str,
			order: e.optional(e.int16),
			valueDecimal: e.optional(e.float64),
			valueInteger: e.optional(e.int64),
			valueString: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.sys_core.SysCode, {
				owner: e.sys_core.getSystemPrime(p.owner),
				codeType: e.sys_core.getCodeType(p.codeType),
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
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		}
	)
	return await query.run(client, data)
}

export async function addCodeAction(data: any) {
	sectionHeader(`addCodeAction - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			owner: e.str,
			codeType: e.str,
			parent: e.optional(e.json),
			header: e.optional(e.str),
			name: e.str,
			order: e.optional(e.int16),
			valueDecimal: e.optional(e.float64),
			valueInteger: e.optional(e.int64),
			valueString: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.sys_core.SysCodeAction, {
				owner: e.sys_core.getSystemPrime(p.owner),
				codeType: e.sys_core.getCodeType(p.codeType),
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
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		}
	)
	return await query.run(client, data)
}

export async function addCodeType(data: any) {
	sectionHeader(`addCodeType - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			owner: e.str,
			parent: e.optional(e.str),
			header: e.optional(e.str),
			name: e.str,
			order: e.optional(e.int16)
		},
		(p) => {
			return e.insert(e.sys_core.SysCodeType, {
				owner: e.sys_core.getSystemPrime(p.owner),
				parent: e.select(e.sys_core.getCodeType(p.parent)),
				header: p.header,
				name: p.name,
				order: p.order,
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		}
	)
	return await query.run(client, data)
}

export async function addMigration(data: any) {
	sectionHeader(`addMigration - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
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
				owner: e.sys_core.getSystemPrime(p.owner),
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
									createdBy: CREATOR,
									modifiedBy: CREATOR
								})
							}
						),
						exprSelect: e.cast(e.str, e.json_get(t, 'exprSelect')),
						name: e.cast(e.str, e.json_get(t, 'name')),
						createdBy: CREATOR,
						modifiedBy: CREATOR
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
									createdBy: CREATOR,
									modifiedBy: CREATOR
								})
							}
						),
						isActive: e.cast(e.bool, true),
						isInitTable: e.cast(e.bool, e.json_get(t, 'isInitTable')),
						orderDefine: e.cast(e.int16, e.json_get(t, 'orderDefine')),
						table: e.select(e.sys_db.getTable(e.cast(e.str, e.json_get(t, 'name')))),
						createdBy: CREATOR,
						modifiedBy: CREATOR
					})
				}),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		}
	)
	return await query.run(client, data)
}

export async function addNode(data: any) {
	sectionHeader(`addNode - ${data.name}`)

	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			codeComponent: e.str,
			codeIcon: e.optional(e.str),
			codeNodeType: e.str,
			codeQueryOwnerType: e.optional(e.str),
			codeQueryTypeAlt: e.optional(e.str),
			codeRenderPlatform: e.optional(e.str),
			dataObj: e.optional(e.str),
			header: e.optional(e.str),
			isAlwaysRetrieveData: e.optional(e.bool),
			isHideRowManager: e.optional(e.bool),
			name: e.str,
			orderDefine: e.optional(e.int16),
			owner: e.str,
			page: e.optional(e.str),
			selectListItems: e.optional(e.str),
			selectListItemsHeader: e.optional(e.str),
			selectListItemsParmValue: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.sys_core.SysNodeObj, {
				codeComponent: e.select(e.sys_core.getCode('ct_sys_do_component', p.codeComponent)),
				codeIcon: e.sys_core.getCode('ct_sys_icon', p.codeIcon),
				codeNodeType: e.sys_core.getCode('ct_sys_node_obj_type', p.codeNodeType),
				codeQueryOwnerType: e.sys_core.getCode('ct_sys_query_owner_type', p.codeQueryOwnerType),
				codeQueryTypeAlt: e.sys_core.getCode('ct_sys_query_type_alt', p.codeQueryTypeAlt),
				codeRenderPlatform: e.sys_core.getCode('ct_sys_do_render_platform', p.codeRenderPlatform),
				dataObj: e.sys_core.getDataObj(p.dataObj),
				createdBy: CREATOR,
				header: p.header,
				isAlwaysRetrieveData: valueOrDefaultParm(p.isAlwaysRetrieveData, false),
				isHideRowManager: valueOrDefaultParm(p.isHideRowManager, false),
				modifiedBy: CREATOR,
				name: p.name,
				orderDefine: p.orderDefine,
				owner: e.sys_core.getSystemPrime(p.owner),
				page: p.page,
				selectListItems: e.select(e.sys_core.getDataObjFieldListItems(p.selectListItems)),
				selectListItemsHeader: p.selectListItemsHeader,
				selectListItemsParmValue: p.selectListItemsParmValue
			})
		}
	)
	return await query.run(client, data)
}

export async function addOrg(data: any) {
	sectionHeader(`addOrg - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			name: e.str,
			header: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.sys_core.SysOrg, {
				name: p.name,
				header: p.header,
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		}
	)
	return await query.run(client, data)
}

export async function addTask(data: any) {
	sectionHeader(`addTask - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			codeIcon: e.optional(e.str),
			codeTaskStatusObj: e.optional(e.str),
			codeTaskType: e.str,
			description: e.optional(e.str),
			exprShow: e.optional(e.str),
			exprStatus: e.optional(e.str),
			exprWith: e.optional(e.str),
			hasAltOpen: e.optional(e.bool),
			header: e.optional(e.str),
			isGlobalResource: e.optional(e.bool),
			name: e.str,
			noDataMsg: e.optional(e.str),
			nodeObj: e.optional(e.str),
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_user.SysTask, {
				codeAttrType: e.select(e.sys_core.getCodeAttrType('at_user_task')),
				codeIcon: e.sys_core.getCode('ct_sys_icon', p.codeIcon),
				codeTaskStatusObj: e.sys_core.getCode('ct_sys_task_status_obj', p.codeTaskStatusObj),
				codeTaskType: e.sys_core.getCode('ct_sys_task_type', p.codeTaskType),
				createdBy: CREATOR,
				exprShow: p.exprShow,
				exprStatus: p.exprStatus,
				exprWith: p.exprWith,
				hasAltOpen: valueOrDefaultParm(p.hasAltOpen, false),
				header: p.header,
				isGlobalResource: valueOrDefaultParm(p.isGlobalResource, false),
				modifiedBy: CREATOR,
				name: p.name,
				noDataMsg: p.noDataMsg,
				nodeObj: e.sys_core.getNodeObjByName(p.nodeObj),
				owner: e.sys_core.getSystemPrime(p.owner)
			})
		}
	)
	return await query.run(client, data)
}

export async function addUser(data: any) {
	sectionHeader(`addUser - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			defaultSystem: e.str,
			firstName: e.str,
			isActive: e.bool,
			lastName: e.str,
			name: e.str,
			owner: e.str,
			systems: e.optional(e.array(e.str)),
			userTypes: e.optional(e.array(e.str))
		},
		(p) => {
			return e
				.insert(e.sys_user.SysUser, {
					createdBy: CREATOR,
					defaultSystem: e.sys_core.getSystemPrime(p.defaultSystem),
					isActive: p.isActive,
					modifiedBy: CREATOR,
					name: p.name,
					owner: e.sys_core.getOrg(p.owner),
					person: e.insert(e.default.SysPerson, {
						firstName: p.firstName,
						lastName: p.lastName
					}),
					systems: e.assert_distinct(
						e.for(e.array_unpack(p.systems || e.cast(e.array(e.str), e.set())), (sys) => {
							return e.sys_core.getSystemPrime(sys)
						})
					),
					userTypes: e.assert_distinct(
						e.for(e.array_unpack(p.userTypes || e.cast(e.array(e.str), e.set())), (ut_parm) => {
							return e.sys_user.getUserType(ut_parm)
						})
					)
				})
				.unlessConflict((user) => ({
					on: user.name,
					else: e.update(user, () => ({
						set: {
							owner: e.sys_core.getOrg(p.owner),
							systems: e.assert_distinct(
								e.for(e.array_unpack(p.systems || e.cast(e.array(e.str), e.set())), (sys) => {
									return e.sys_core.getSystemPrime(sys)
								})
							),
							userTypes: e.assert_distinct(
								e.for(e.array_unpack(p.userTypes || e.cast(e.array(e.str), e.set())), (ut_parm) => {
									return e.sys_user.getUserType(ut_parm)
								})
							)
						}
					}))
				}))
		}
	)
	return await query.run(client, data)
}

export async function addUserType(data: any) {
	sectionHeader(`addUserType - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			attrsAccess: e.optional(e.array(e.json)),
			attrsAction: e.optional(e.array(e.json)),
			attrsExpr: e.optional(e.array(e.json)),
			attrsVirtual: e.optional(e.array(e.json)),
			header: e.str,
			isSelfSignup: e.optional(e.bool),
			name: e.str,
			owner: e.str,
			resources: e.optional(e.array(e.json)),
			tags: e.optional(e.array(e.json))
		},
		(p) => {
			return e.insert(e.sys_user.SysUserType, {
				attrsAccess: e.assert_distinct(
					e.for(e.array_unpack(p.attrsAccess || e.cast(e.array(e.str), e.set())), (attr) => {
						return e.insert(e.sys_core.SysObjAttrAccess, {
							codeAttrTypeAccess: e.sys_core.getCode(
								'ct_sys_obj_attr_access',
								e.cast(e.str, e.json_get(attr, 'access'))
							),
							obj: e.assert_single(
								e.select(e.sys_core.SysObjAttr, (soa) => ({
									filter: e.op(
										e.op(soa.owner.name, '=', e.cast(e.str, attr.owner)),
										'and',
										e.op(soa.name, '=', e.cast(e.str, attr.name))
									)
								}))
							),
							createdBy: CREATOR,
							modifiedBy: CREATOR
						})
					})
				),
				attrsAction: e.assert_distinct(
					e.for(e.array_unpack(p.attrsAction || e.cast(e.array(e.str), e.set())), (attr) => {
						return e.insert(e.sys_core.SysObjAttrAction, {
							codeAttrTypeAction: e.sys_core.getCode(
								'ct_sys_obj_attr_action',
								e.cast(e.str, e.json_get(attr, 'action'))
							),
							obj: e.assert_single(
								e.select(e.sys_core.SysObjAttr, (soa) => ({
									filter: e.op(
										e.op(soa.owner.name, '=', e.cast(e.str, attr.owner)),
										'and',
										e.op(soa.name, '=', e.cast(e.str, attr.name))
									)
								}))
							),
							createdBy: CREATOR,
							modifiedBy: CREATOR
						})
					})
				),
				attrsExpr: e.assert_distinct(
					e.for(e.array_unpack(p.attrsExpr || e.cast(e.array(e.str), e.set())), (attrExpr) => {
						return e.insert(e.sys_core.SysObjAttrExpr, {
							codeAttrTypeAction: e.sys_core.getCode(
								'ct_sys_obj_attr_action',
								e.cast(e.str, e.json_get(attrExpr, 'action'))
							),
							createdBy: CREATOR,
							expr: e.cast(e.str, e.json_get(attrExpr, 'expr')),
							modifiedBy: CREATOR
						})
					})
				),
				attrsVirtual: e.assert_distinct(
					e.for(
						e.array_unpack(p.attrsVirtual || e.cast(e.array(e.str), e.set())),
						(attrVirtual) => {
							return e.insert(e.sys_core.SysObjAttrVirtual, {
								attrsAccess: e.assert_distinct(
									e.for(
										e.array_unpack(
											e.cast(e.array(e.json), (e.json, e.json_get(attrVirtual, 'attrsAccess'))) ||
												e.cast(e.array(e.str), e.set())
										),
										(attr) => {
											return e.insert(e.sys_core.SysObjAttrAccess, {
												codeAttrTypeAccess: e.sys_core.getCode(
													'ct_sys_obj_attr_access',
													e.cast(e.str, e.json_get(attr, 'access'))
												),
												obj: e.assert_single(
													e.select(e.sys_core.SysObjAttr, (soa) => ({
														filter: e.op(
															e.op(soa.owner.name, '=', e.cast(e.str, attr.owner)),
															'and',
															e.op(soa.name, '=', e.cast(e.str, attr.name))
														)
													}))
												),
												createdBy: CREATOR,
												modifiedBy: CREATOR
											})
										}
									)
								),
								attrsAction: e.assert_distinct(
									e.for(
										e.array_unpack(
											e.cast(e.array(e.json), (e.json, e.json_get(attrVirtual, 'attrsAction'))) ||
												e.cast(e.array(e.str), e.set())
										),
										(attr) => {
											return e.insert(e.sys_core.SysObjAttrAction, {
												codeAttrTypeAction: e.sys_core.getCode(
													'ct_sys_obj_attr_action',
													e.cast(e.str, e.json_get(attr, 'action'))
												),
												obj: e.assert_single(
													e.select(e.sys_core.SysObjAttr, (soa) => ({
														filter: e.op(
															e.op(soa.owner.name, '=', e.cast(e.str, attr.owner)),
															'and',
															e.op(soa.name, '=', e.cast(e.str, attr.name))
														)
													}))
												),
												createdBy: CREATOR,
												modifiedBy: CREATOR
											})
										}
									)
								),
								expr: e.cast(e.str, e.json_get(attrVirtual, 'expr')),
								createdBy: CREATOR,
								modifiedBy: CREATOR
							})
						}
					)
				),
				createdBy: CREATOR,
				header: p.header,
				isSelfSignup: valueOrDefaultParm(p.isSelfSignup, false),
				name: p.name,
				owner: e.sys_core.getOrg(p.owner),
				modifiedBy: CREATOR
			})
		}
	)
	return await query.run(client, data)
}

export async function updateDepdDataObjColumnItemChange(data: any) {
	sectionHeader(`updateDepdDataObjColumnItemChange - ${data.name}`)
	let itemChanges: DataRecord[] = []
	data.fields.forEach((field: any) => {
		if (field.itemChanges && field.itemChanges.length > 0) {
			itemChanges.push({
				dataObjName: data.name,
				fieldName: field.columnName,
				triggers: field.itemChanges
			})
		}
	})

	if (itemChanges.length > 0) {
		const dataUpdate = { itemChanges }
		const CREATOR = e.sys_user.getRootUser()
		const query = e.params(
			{
				itemChanges: e.array(e.json)
			},
			(p) => {
				return e.for(e.array_unpack(p.itemChanges), (ic) => {
					return e.update(
						e.sys_core.getDataObjColumn(e.cast(e.str, ic.dataObjName), e.cast(e.str, ic.fieldName)),
						(sdoc) => ({
							set: {
								itemChanges: {
									'+=': e.for(e.array_unpack(e.cast(e.array(e.json), ic.triggers)), (t) => {
										return e.insert(e.sys_core.SysDataObjColumnItemChange, {
											codeAccess: e.sys_core.getCode(
												'ct_sys_do_field_access',
												e.cast(e.str, e.json_get(t, 'codeAccess'))
											),
											codeItemChangeAction: e.sys_core.getCode(
												'ct_sys_do_field_item_change_action',
												e.cast(e.str, e.json_get(t, 'codeItemChangeAction'))
											),
											codeItemChangeRecordStatus: e.sys_core.getCode(
												'ct_sys_record_status',
												e.cast(e.str, e.json_get(t, 'codeItemChangeRecordStatus'))
											),
											codeItemChangeTriggerType: e.sys_core.getCode(
												'ct_sys_do_field_item_change_trigger_type',
												e.cast(e.str, e.json_get(t, 'codeItemChangeTriggerType'))
											),
											codeItemChangeValueType: e.sys_core.getCode(
												'ct_sys_do_field_item_change_value_type',
												e.cast(e.str, e.json_get(t, 'codeItemChangeValueType'))
											),
											codeOp: e.sys_core.getCode(
												'ct_sys_op',
												e.cast(e.str, e.json_get(t, 'codeOp'))
											),
											columns: e.assert_distinct(
												e.for(
													e.array_unpack(e.cast(e.array(e.str), e.json_get(t, 'columns'))),
													(c) => {
														return e.sys_core.getDataObjColumn(e.cast(e.str, ic.dataObjName), c)
													}
												)
											),
											createdBy: CREATOR,
											modifiedBy: CREATOR,
											orderDefine: e.cast(e.int16, e.json_get(t, 'orderDefine')),
											retrieveParmKey: e.cast(e.str, e.json_get(t, 'retrieveParmKey')),

											valueTargetAttribute: e.assert_single(
												e.select(e.sys_core.SysObjAttr, (soa) => ({
													filter: e.op(
														e.op(
															soa.owner.name,
															'=',
															e.cast(
																e.str,
																e.json_get(
																	e.cast(e.json, e.json_get(t, 'valueTargetAttribute')),
																	'owner'
																)
															)
														),
														'and',
														e.op(
															soa.name,
															'=',
															e.cast(
																e.str,
																e.json_get(
																	e.cast(e.json, e.json_get(t, 'valueTargetAttribute')),
																	'name'
																)
															)
														)
													)
												}))
											),
											valueTargetCode: e.sys_core.getCodeSystem(
												e.cast(
													e.str,
													e.json_get(e.cast(e.json, e.json_get(t, 'valueTargetCode')), 'owner')
												),
												e.cast(
													e.str,
													e.json_get(e.cast(e.json, e.json_get(t, 'valueTargetCode')), 'codeType')
												),
												e.cast(
													e.str,
													e.json_get(e.cast(e.json, e.json_get(t, 'valueTargetCode')), 'name')
												)
											),
											valueTargetScalar: e.cast(e.str, e.json_get(t, 'valueTargetScalar')),
											valueTriggerAttributes: e.assert_distinct(
												e.for(
													e.array_unpack(
														e.cast(e.array(e.json), e.json_get(t, 'valueTriggerAttributes'))
													),
													(a) => {
														return e.select(e.sys_core.SysObjAttr, (soa) => ({
															filter: e.op(
																e.op(soa.owner.name, '=', e.cast(e.str, a.owner)),
																'and',
																e.op(soa.name, '=', e.cast(e.str, a.name))
															)
														}))
													}
												)
											),
											valueTriggerCodes: e.assert_distinct(
												e.for(
													e.array_unpack(
														e.cast(e.array(e.json), e.json_get(t, 'valueTriggerCodes'))
													),
													(c) => {
														return e.sys_core.getCodeSystem(
															e.cast(e.str, e.json_get(c, 'owner')),
															e.cast(e.str, e.json_get(c, 'codeType')),
															e.cast(e.str, e.json_get(c, 'name'))
														)
													}
												)
											),
											valueTriggerScalar: e.cast(e.str, e.json_get(t, 'valueTriggerScalar'))
										})
									})
								}
							}
						})
					)
				})
			}
		)
		return await query.run(client, dataUpdate)
	}
}

export async function updateDepdDataObjQueryRider(data: any) {
	sectionHeader(`updateDepdQueryRiders - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const dataUpdate = { name: data.name, qr: data.queryRiders }
	const query = e.params(
		{
			qr: e.optional(e.array(e.json)),
			name: e.str
		},
		(p) => {
			return e.update(e.sys_core.SysDataObj, (n) => ({
				filter: e.op(n.name, '=', p.name),
				set: {
					queryRiders: e.assert_distinct(
						e.for(e.array_unpack(p.qr), (qr) => {
							return e.insert(e.sys_core.SysDataObjQueryRider, {
								codeQueryAction: e.sys_core.getCode(
									'ct_sys_do_query_rider_action',
									e.cast(e.str, e.json_get(qr, 'codeQueryAction'))
								),
								codeQueryFunction: e.sys_core.getCode(
									'ct_sys_do_query_rider_function',
									e.cast(e.str, e.json_get(qr, 'codeQueryFunction'))
								),
								codeQueryPlatform: e.sys_core.getCode(
									'ct_sys_do_query_rider_platform',
									e.cast(e.str, e.json_get(qr, 'codeQueryPlatform'))
								),
								codeQueryType: e.sys_core.getCode(
									'ct_sys_do_query_rider_query_type',
									e.cast(e.str, e.json_get(qr, 'codeQueryType'))
								),
								codeTriggerTiming: e.sys_core.getCode(
									'ct_sys_do_query_rider_trigger_timing',
									e.cast(e.str, e.json_get(qr, 'codeTriggerTiming'))
								),
								codeUserMsgDelivery: e.sys_core.getCode(
									'ct_sys_do_query_rider_msg_delivery',
									e.cast(e.str, e.json_get(qr, 'codeUserMsgDelivery'))
								),
								createdBy: CREATOR,
								expr: e.cast(e.str, e.json_get(qr, 'expr')),
								modifiedBy: CREATOR,
								navDestination: e.op(
									e.insert(e.sys_core.SysNavDestination, {
										codeDestinationType: e.sys_core.getCode(
											'ct_sys_nav_destination_type',
											e.cast(
												e.str,
												e.json_get(
													e.cast(e.json, e.json_get(qr, 'navDestination')),
													'codeDestinationType'
												)
											)
										),
										nodeDestination: e.sys_core.getNodeObjByName(
											e.cast(
												e.str,
												e.json_get(
													e.cast(e.json, e.json_get(qr, 'navDestination')),
													'nodeDestination'
												)
											)
										)
									}),
									'if',
									e.op('exists', e.cast(e.json, e.json_get(qr, 'navDestination'))),
									'else',
									e.cast(e.sys_core.SysNavDestination, e.set())
								),
								parmValueStr: e.cast(e.str, e.json_get(qr, 'parmValueStr')),
								userMsg: e.cast(e.str, e.json_get(qr, 'userMsg'))
							})
						})
					)
				}
			}))
		}
	)
	return await query.run(client, dataUpdate)
}

export async function updateDepdGridStylesDataObj(data: any) {
	sectionHeader(`updateDepdGridStylesDataObj - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const dataUpdate = { name: data.name, gridStyles: data.gridStyles }
	const query = e.params(
		{
			gridStyles: e.optional(e.array(e.json)),
			name: e.str
		},
		(p) => {
			return e.update(e.sys_core.SysDataObj, (n) => ({
				filter: e.op(n.name, '=', p.name),
				set: {
					gridStyles: e.for(
						e.array_unpack(p.gridStyles || e.cast(e.array(e.json), e.set())),
						(gs) => {
							return e.insert(e.sys_core.SysGridStyle, {
								exprTrigger: e.cast(e.str, e.json_get(gs, 'exprTrigger')),
								prop: e.cast(e.str, e.json_get(gs, 'prop')),
								propValue: e.cast(e.str, e.json_get(gs, 'propValue'))
							})
						}
					)
				}
			}))
		}
	)
	return await query.run(client, dataUpdate)
}

export async function updateDepdNodeAction(data: any) {
	sectionHeader(`updateDepdNodeAction - ${data.name}`)
	const dataUpdate = { name: data.name, actions: data.actions }
	const query = e.params(
		{
			actions: e.optional(e.array(e.json)),
			name: e.str
		},
		(p) => {
			return e.update(e.sys_core.SysNodeObj, (n) => ({
				filter: e.op(n.name, '=', p.name),
				set: {
					actions: e.assert_distinct(
						e.for(e.array_unpack(p.actions), (a) => {
							return e.insert(e.sys_core.SysNodeObjAction, {
								codeAction: e.sys_core.getCodeAction(e.cast(e.str, e.json_get(a, 'action'))),
								nodeObj: e.sys_core.getNodeObjByName(e.cast(e.str, e.json_get(a, 'node')))
							})
						})
					)
				}
			}))
		}
	)
	return await query.run(client, dataUpdate)
}

export async function updateDepdNodeChild(data: any) {
	sectionHeader(`updateDepdNodeChildren - ${data.name}`)
	const dataUpdate = { name: data.name, children: data.children }
	const query = e.params(
		{
			children: e.optional(e.array(e.json)),
			name: e.str
		},
		(p) => {
			return e.update(e.sys_core.SysNodeObj, (n) => ({
				filter: e.op(n.name, '=', p.name),
				set: {
					children: e.assert_distinct(
						e.for(e.array_unpack(p.children), (c) => {
							return e.insert(e.sys_core.SysNodeObjChild, {
								nodeObj: e.sys_core.getNodeObjByName(e.cast(e.str, e.json_get(c, 'node'))),
								orderDefine: e.cast(e.int16, e.json_get(c, 'order'))
							})
						})
					)
				}
			}))
		}
	)
	return await query.run(client, dataUpdate)
}

export async function updateDepdNavDestinationUserAction(data: any) {
	sectionHeader(`updateDepdNavDestinationUserAction - ${data.name}`)
	const dataUpdate = {
		navDestination: data.navDestination,
		name: data.name
	}
	const query = e.params(
		{
			navDestination: e.optional(e.json),
			name: e.str
		},
		(p) => {
			return e.update(e.sys_user.SysUserAction, (a) => ({
				filter: e.op(a.name, '=', p.name),
				set: {
					navDestination: e.op(
						e.insert(e.sys_core.SysNavDestination, {
							codeDestinationType: e.sys_core.getCode(
								'ct_sys_nav_destination_type',
								e.cast(e.str, e.json_get(p.navDestination, 'codeDestinationType'))
							),
							nodeDestination: e.sys_core.getNodeObjByName(
								e.cast(e.str, e.json_get(p.navDestination, 'nodeDestination'))
							)
						}),
						'if',
						e.op('exists', p.navDestination),
						'else',
						e.cast(e.sys_core.SysNavDestination, e.set())
					)
				}
			}))
		}
	)
	return await query.run(client, dataUpdate)
}

export async function updateSystemNodesConfig(data: any) {
	sectionHeader(`updateSystemNodesConfig - ${data.name}`)
	const dataUpdate = {
		name: data.name,
		nodesConfig: data.nodesConfig
	}
	const query = e.params(
		{
			name: e.str,
			nodesConfig: e.optional(e.array(e.json))
		},
		(p) => {
			return e.update(e.sys_core.SysSystem, (n) => ({
				filter: e.op(n.name, '=', p.name),
				set: {
					nodesConfig: e.assert_distinct(
						e.for(e.array_unpack(p.nodesConfig), (nc) => {
							return e.insert(e.sys_core.SysNodeObjConfig, {
								codeAttrType: e.sys_core.getCode(
									'ct_sys_obj_attr_type',
									e.cast(e.str, e.json_get(nc, 'codeAttrType'))
								),
								nodeObj: e.sys_core.getNodeObjByName(e.cast(e.str, e.json_get(nc, 'node')))
							})
						})
					)
				}
			}))
		}
	)
	return await query.run(client, dataUpdate)
}
