import e from '$db/dbschema/edgeql-js'
import { booleanOrDefaultParm, client, sectionHeader } from '$routes/api/dbEdge/dbEdge'
import { debug } from '$utils/types'

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
			return e.insert(e.sys_core.SysApp, {
				appHeader: e.select(e.sys_core.SysAppHeader, (sah) => ({
					filter_single: e.op(sah.name, '=', p.appHeader)
				})),
				createdBy: CREATOR,
				isGlobalResource: p.isGlobalResource,
				name: p.name,
				owner: e.sys_core.getSystemPrime(p.owner),
				modifiedBy: CREATOR,
				nodes: e.assert_distinct(
					e.set(
						e.for(e.array_unpack(p.nodes), (nodeName) => {
							return e.sys_core.getNodeObjByName(nodeName)
						})
					)
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
			return e.insert(e.sys_core.SysAppHeader, {
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
	const CREATOR = e.sys_user.getRootUser()
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
	const CREATOR = e.sys_user.getRootUser()
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

export async function addNodeFooter(data: any) {
	sectionHeader(`addNodeFooter - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			codeIcon: e.str,
			codeType: e.str,
			dataObj: e.optional(e.str),
			header: e.optional(e.str),
			isAlwaysRetrieveData: e.optional(e.bool),
			isGlobalResource: e.bool,
			name: e.str,
			orderDefine: e.int16,
			owner: e.str,
			page: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.sys_core.SysNodeObj, {
				codeIcon: e.select(e.sys_core.getCode('ct_sys_icon', p.codeIcon)),
				codeNavType: e.select(e.sys_core.getCode('ct_sys_node_obj_nav_type', 'footer')),
				codeNodeType: e.select(e.sys_core.getCode('ct_sys_node_obj_type', p.codeType)),
				createdBy: CREATOR,
				dataObj: e.select(e.sys_core.getDataObj(p.dataObj)),
				header: p.header,
				isAlwaysRetrieveData: booleanOrDefaultParm(p.isAlwaysRetrieveData, false),
				isGlobalResource: p.isGlobalResource,
				isHideRowManager: e.cast(e.bool, false),
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

export async function addNodeProgram(data: any) {
	sectionHeader(`addNodeProgram - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			codeIcon: e.str,
			dataObj: e.optional(e.str),
			header: e.optional(e.str),
			isAlwaysRetrieveData: e.optional(e.bool),
			isHideRowManager: e.optional(e.bool),
			name: e.str,
			orderDefine: e.int16,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysNodeObj, {
				codeIcon: e.select(e.sys_core.getCode('ct_sys_icon', p.codeIcon)),
				codeNavType: e.select(e.sys_core.getCode('ct_sys_node_obj_nav_type', 'tree')),
				codeNodeType: e.select(e.sys_core.getCode('ct_sys_node_obj_type', 'program')),
				createdBy: CREATOR,
				dataObj: e.select(e.sys_core.getDataObj(p.dataObj)),
				header: p.header,
				isAlwaysRetrieveData: booleanOrDefaultParm(p.isAlwaysRetrieveData, false),
				isHideRowManager: booleanOrDefaultParm(p.isHideRowManager, false),
				modifiedBy: CREATOR,
				name: p.name,
				orderDefine: p.orderDefine,
				owner: e.sys_core.getSystemPrime(p.owner)
			})
		}
	)
	return await query.run(client, data)
}

export async function addNodeProgramObj(data: any) {
	sectionHeader(`addNodeProgramObj - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			codeIcon: e.str,
			dataObj: e.optional(e.str),
			header: e.optional(e.str),
			isAlwaysRetrieveData: e.optional(e.bool),
			isHideRowManager: e.optional(e.bool),
			isSystemRoot: e.optional(e.bool),
			name: e.str,
			orderDefine: e.int16,
			owner: e.str,
			parentNodeName: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.sys_core.SysNodeObj, {
				codeIcon: e.select(e.sys_core.getCode('ct_sys_icon', p.codeIcon)),
				codeNavType: e.select(e.sys_core.getCode('ct_sys_node_obj_nav_type', 'tree')),
				codeNodeType: e.select(e.sys_core.getCode('ct_sys_node_obj_type', 'program_object')),
				createdBy: CREATOR,
				dataObj: e.select(e.sys_core.getDataObj(p.dataObj)),
				header: p.header,
				isAlwaysRetrieveData: booleanOrDefaultParm(p.isAlwaysRetrieveData, false),
				isHideRowManager: booleanOrDefaultParm(p.isHideRowManager, false),
				isSystemRoot: booleanOrDefaultParm(p.isSystemRoot, false),
				modifiedBy: CREATOR,
				name: p.name,
				orderDefine: p.orderDefine,
				owner: e.sys_core.getSystemPrime(p.owner),
				parent: e.select(e.sys_core.getNodeObjByName(p.parentNodeName))
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

export async function addSubjectObj(data: any) {
	sectionHeader(`addSubjectObj - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			codeType: e.str,
			header: e.optional(e.str),
			isGlobalResource: e.bool,
			name: e.str,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysObjSubject, {
				codeType: e.sys_core.getCode('ct_sys_config_subject_type', p.codeType),
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

export async function addUser(data: any) {
	sectionHeader(`addUser - ${data.userName}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			firstName: e.str,
			lastName: e.str,
			owner: e.str,
			password: e.str,
			userName: e.str,
			userTypes: e.optional(e.array(e.str))
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
				userName: p.userName,
				userTypes: e.assert_distinct(
					e.set(
						e.for(e.array_unpack(p.userTypes || e.cast(e.array(e.str), e.set())), (ut_parm) => {
							return e.sys_user.getUserType(ut_parm)
						})
					)
				)
			})
		}
	)
	return await query.run(client, data)
}

export async function addUserType(data: any) {
	sectionHeader(`addUserType - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			header: e.str,
			name: e.str,
			owner: e.str,
			resources: e.optional(e.array(e.json)),
			tags: e.optional(e.array(e.json))
		},
		(p) => {
			return e.insert(e.sys_user.SysUserType, {
				createdBy: CREATOR,
				header: p.header,
				name: p.name,
				owner: e.sys_core.getSystemPrime(p.owner),
				modifiedBy: CREATOR,
				resources: e.for(e.array_unpack(p.resources || e.cast(e.array(e.str), e.set())), (res) => {
					const codeType = e.cast(e.str, e.json_get(res, 'codeType'))
					const resource = e.cast(e.str, e.json_get(res, 'resource'))
					return e.insert(e.sys_user.SysUserTypeResource, {
						codeType: e.sys_core.getCode('ct_sys_user_type_resource_type', codeType),
						resource: e.sys_core.getObj(resource)
					})
				}),
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
