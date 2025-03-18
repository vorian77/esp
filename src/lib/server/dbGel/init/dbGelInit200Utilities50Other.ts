import e from '$db/gel/edgeql-js'
import { client, sectionHeader, valueOrDefaultParm } from '$routes/api/dbGel/dbGel'
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
			codeIcon: e.str,
			codeNavType: e.optional(e.str) || 'tree',
			codeNodeType: e.str,
			codeQueryOwnerType: e.optional(e.str),
			data: e.optional(e.array(e.json)),
			dataObj: e.optional(e.str),
			header: e.optional(e.str),
			isAlwaysRetrieveData: e.optional(e.bool),
			isDynamicChildrenSystemParents: e.optional(e.bool),
			isHideRowManager: e.optional(e.bool),
			name: e.str,
			orderDefine: e.int16,
			owner: e.str,
			page: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.sys_core.SysNodeObj, {
				codeIcon: e.sys_core.getCode('ct_sys_icon', p.codeIcon),
				codeNavType: e.sys_core.getCode(
					'ct_sys_node_obj_nav_type',
					valueOrDefaultParm(p.codeNavType, 'tree')
				),
				codeNodeType: e.sys_core.getCode('ct_sys_node_obj_type', p.codeNodeType),
				codeQueryOwnerType: e.sys_core.getCode('ct_sys_query_owner_id_type', p.codeQueryOwnerType),
				createdBy: CREATOR,
				data: e.for(e.array_unpack(p.data || e.cast(e.array(e.json), e.set())), (d) => {
					return e.insert(e.sys_core.SysNodeObjData, {
						dataObj: e.sys_core.getDataObj(e.cast(e.str, e.json_get(d, 'dataObj'))),
						codeAction: e.sys_core.getCodeAction(
							e.op(e.cast(e.str, e.json_get(d, 'actionClass')), '??', 'ct_sys_code_action_class'),
							e.op(e.cast(e.str, e.json_get(d, 'actionType')), '??', 'default')
						)
					})
				}),
				header: p.header,
				isAlwaysRetrieveData: valueOrDefaultParm(p.isAlwaysRetrieveData, false),
				isDynamicChildrenSystemParents: valueOrDefaultParm(p.isDynamicChildrenSystemParents, false),
				isHideRowManager: valueOrDefaultParm(p.isHideRowManager, false),
				modifiedBy: CREATOR,
				name: p.name,
				orderDefine: p.orderDefine,
				owner: e.sys_core.getSystemPrime(p.owner),
				page: p.page
			})
		}
	)
	return await query.run(client, data)
}

export async function addObjEntAttr(data: any) {
	sectionHeader(`addObjEntAttr - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			codeObjType: e.str,
			header: e.optional(e.str),
			isGlobalResource: e.bool,
			name: e.str,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysObjEntAttr, {
				codeObjType: e.sys_core.getCode('ct_sys_attribute', p.codeObjType),
				createdBy: CREATOR,
				header: p.header,
				isGlobalResource: p.isGlobalResource,
				name: p.name,
				owner: e.sys_core.getSystemPrime(p.owner),
				modifiedBy: CREATOR
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
			codeIcon: e.str,
			codeRenderType: e.str,
			codeStatusObj: e.optional(e.str),
			description: e.optional(e.str),
			exprShow: e.optional(e.str),
			exprStatus: e.optional(e.str),
			hasAltOpen: e.optional(e.bool),
			header: e.optional(e.str),
			isPinToDash: e.optional(e.bool),
			isGlobalResource: e.bool,
			name: e.str,
			noDataMsg: e.optional(e.str),
			pageDataObj: e.optional(e.str),
			targetDataObj: e.optional(e.str),
			targetNodeObj: e.optional(e.str),
			orderDefine: e.int16,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_user.SysTask, {
				codeIcon: e.sys_core.getCode('ct_sys_icon', p.codeIcon),
				codeRenderType: e.sys_core.getCode('ct_sys_task_render_type', p.codeRenderType),
				codeStatusObj: e.sys_core.getCode('ct_sys_task_status_obj', p.codeStatusObj),
				createdBy: CREATOR,
				exprShow: p.exprShow,
				exprStatus: p.exprStatus,
				hasAltOpen: valueOrDefaultParm(p.hasAltOpen, false),
				header: p.header,
				isPinToDash: valueOrDefaultParm(p.isPinToDash, false),
				isGlobalResource: p.isGlobalResource,
				modifiedBy: CREATOR,
				name: p.name,
				noDataMsg: p.noDataMsg,
				orderDefine: p.orderDefine,
				owner: e.sys_core.getSystemPrime(p.owner),
				pageDataObj: e.sys_core.getDataObj(p.pageDataObj),
				targetDataObj: e.sys_core.getDataObj(p.targetDataObj),
				targetNodeObj: e.sys_core.getNodeObjByName(p.targetNodeObj)
			})
		}
	)
	return await query.run(client, data)
}

export async function addUser(data: any) {
	sectionHeader(`addUser - ${data.userName}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			defaultOrg: e.str,
			defaultSystem: e.str,
			firstName: e.str,
			isActive: e.bool,
			lastName: e.str,
			orgs: e.optional(e.array(e.str)),
			owner: e.str,
			systems: e.optional(e.array(e.str)),
			userName: e.str,
			userTypes: e.optional(e.array(e.str))
		},
		(p) => {
			return e
				.insert(e.sys_user.SysUser, {
					createdBy: CREATOR,
					defaultOrg: e.select(e.sys_core.getOrg(p.defaultOrg)),
					defaultSystem: e.select(e.sys_core.getSystemPrime(p.defaultSystem)),
					isActive: p.isActive,
					modifiedBy: CREATOR,
					orgs: e.assert_distinct(
						e.for(e.array_unpack(p.orgs || e.cast(e.array(e.str), e.set())), (org) => {
							return e.sys_core.getOrg(org)
						})
					),
					owner: e.select(e.sys_core.getOrg(p.owner)),
					person: e.insert(e.default.SysPerson, {
						firstName: p.firstName,
						lastName: p.lastName
					}),
					systems: e.assert_distinct(
						e.for(e.array_unpack(p.systems || e.cast(e.array(e.str), e.set())), (sys) => {
							return e.sys_core.getSystemPrime(sys)
						})
					),
					userName: p.userName,
					userTypes: e.assert_distinct(
						e.for(e.array_unpack(p.userTypes || e.cast(e.array(e.str), e.set())), (ut_parm) => {
							return e.sys_user.getUserType(ut_parm)
						})
					)
				})
				.unlessConflict((user) => ({
					on: user.userName,
					else: e.update(user, () => ({
						set: {
							orgs: e.assert_distinct(
								e.for(e.array_unpack(p.orgs || e.cast(e.array(e.str), e.set())), (org) => {
									return e.sys_core.getOrg(org)
								})
							),
							owner: e.select(e.sys_core.getOrg(p.owner)),
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
			attributes: e.optional(e.array(e.json)),
			header: e.str,
			isSelfSignup: e.optional(e.bool),
			name: e.str,
			owner: e.str,
			resources: e.optional(e.array(e.json)),
			tags: e.optional(e.array(e.json))
		},
		(p) => {
			return e.insert(e.sys_user.SysUserType, {
				attributes: e.for(
					e.array_unpack(p.attributes || e.cast(e.array(e.str), e.set())),
					(attr) => {
						const objName = e.cast(e.str, e.json_get(attr, 'name'))
						const objOwner = e.cast(e.str, e.json_get(attr, 'owner'))
						return e.insert(e.sys_core.SysAttr, {
							createdBy: CREATOR,
							hasAccess: e.cast(e.bool, e.json_get(attr, 'hasAccess')),
							modifiedBy: CREATOR,
							obj: e.sys_core.getObjEntAttr(objOwner, objName)
						})
					}
				),
				createdBy: CREATOR,
				header: p.header,
				isSelfSignup: valueOrDefaultParm(p.isSelfSignup, false),
				name: p.name,
				owner: e.sys_core.getSystemPrime(p.owner),
				modifiedBy: CREATOR,
				// resources: e.sys_user.getUserTypeResource('sys_system', 'app_sys_admin_global'),

				resources: e.assert_distinct(
					e.for(e.array_unpack(p.resources || e.cast(e.array(e.json), e.set())), (res) => {
						const resourceOwner = e.cast(e.str, e.json_get(res, 'owner'))
						const resourceName = e.cast(e.str, e.json_get(res, 'name'))
						return e.sys_user.getUserTypeResource(resourceOwner, resourceName)
					})
				),
				tags: e.assert_distinct(
					e.for(e.array_unpack(p.tags || e.cast(e.array(e.str), e.set())), (tag) => {
						const codeType = e.cast(e.str, e.json_get(tag, 'codeType'))
						const code = e.cast(e.str, e.json_get(tag, 'code'))
						return e.sys_core.getCode(codeType, code)
					})
				)
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
					return e.update(e.sys_core.SysDataObjColumn, (sdoc) => ({
						filter: e.op(
							e.op(
								sdoc.id,
								'in',
								e.select(e.sys_core.SysDataObj, (sdo) => ({
									filter: e.op(sdo.name, '=', e.cast(e.str, ic.dataObjName))
								})).columns.id
							),
							'and',
							e.op(sdoc.column.name, '=', e.cast(e.str, ic.fieldName))
						),
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
										codeItemChangeValueType: e.sys_core.getCode(
											'ct_sys_do_field_item_change_value_type',
											e.cast(e.str, e.json_get(t, 'codeItemChangeValueType'))
										),
										codeOp: e.sys_core.getCode('ct_sys_op', e.cast(e.str, e.json_get(t, 'codeOp'))),
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
										valueTargetAttribute: e.sys_core.getObjEntAttr(
											e.cast(
												e.str,
												e.json_get(e.cast(e.json, e.json_get(t, 'valueTargetAttribute')), 'owner')
											),
											e.cast(
												e.str,
												e.json_get(e.cast(e.json, e.json_get(t, 'valueTargetAttribute')), 'name')
											)
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
													return e.sys_core.getObjEntAttr(
														e.cast(e.str, e.json_get(a, 'owner')),
														e.cast(e.str, e.json_get(a, 'name'))
													)
												}
											)
										),
										valueTriggerCodes: e.assert_distinct(
											e.for(
												e.array_unpack(e.cast(e.array(e.json), e.json_get(t, 'valueTriggerCodes'))),
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
					}))
				})
			}
		)
		return await query.run(client, dataUpdate)
	}
}

export async function updateDepdNodeChildren(data: any) {
	sectionHeader(`updateDepdNodeChildren - ${data.name}`)
	const dataUpdate = { name: data.name, children: data.children }
	const query = e.params(
		{
			children: e.optional(e.array(e.str)),
			name: e.str
		},
		(p) => {
			return e.update(e.sys_core.SysNodeObj, (n) => ({
				filter: e.op(n.name, '=', p.name),
				set: {
					children: e.assert_distinct(
						e.for(e.array_unpack(p.children), (c) => {
							return e.sys_core.getNodeObjByName(c)
						})
					)
				}
			}))
		}
	)
	return await query.run(client, dataUpdate)
}
