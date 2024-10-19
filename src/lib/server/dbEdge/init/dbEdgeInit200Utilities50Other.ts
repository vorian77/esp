import { createClient } from 'edgedb'
import e, { is } from '$lib/dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'
import { sectionHeader } from '$server/dbEdge/init/dbEdgeInit200Utilities10'

const client = createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

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
				createdBy: e.select(CREATOR),
				isGlobalResource: p.isGlobalResource,
				name: p.name,
				owner: e.sys_core.getSystemPrime(p.owner),
				modifiedBy: e.select(CREATOR),
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
	const query = e.params(
		{
			header: e.optional(e.str),
			isGlobalResource: e.bool,
			name: e.str,
			orderDefine: e.int16,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysAppHeader, {
				header: p.header,
				isGlobalResource: p.isGlobalResource,
				name: p.name,
				orderDefine: p.orderDefine,
				owner: e.sys_core.getSystemPrime(p.owner),
				createdBy: e.sys_user.getRootUser(),
				modifiedBy: e.sys_user.getRootUser()
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
				createdBy: e.select(CREATOR),
				modifiedBy: e.select(CREATOR)
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
				createdBy: e.select(CREATOR),
				modifiedBy: e.select(CREATOR)
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
									createdBy: e.select(CREATOR),
									modifiedBy: e.select(CREATOR)
								})
							}
						),
						exprSelect: e.cast(e.str, e.json_get(t, 'exprSelect')),
						name: e.cast(e.str, e.json_get(t, 'name')),
						createdBy: e.select(CREATOR),
						modifiedBy: e.select(CREATOR)
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
									createdBy: e.select(CREATOR),
									modifiedBy: e.select(CREATOR)
								})
							}
						),
						isActive: e.cast(e.bool, true),
						isInitTable: e.cast(e.bool, e.json_get(t, 'isInitTable')),
						orderDefine: e.cast(e.int16, e.json_get(t, 'orderDefine')),
						table: e.select(e.sys_db.getTable(e.cast(e.str, e.json_get(t, 'name')))),
						createdBy: e.select(CREATOR),
						modifiedBy: e.select(CREATOR)
					})
				}),
				createdBy: e.select(CREATOR),
				modifiedBy: e.select(CREATOR)
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
				createdBy: e.select(CREATOR),
				dataObj: e.select(e.sys_core.getDataObj(p.dataObj)),
				header: p.header,
				isHideRowManager: e.cast(e.bool, false),
				modifiedBy: e.select(CREATOR),
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
				createdBy: e.select(CREATOR),
				header: p.header,
				isHideRowManager: e.cast(e.bool, false),
				modifiedBy: e.select(CREATOR),
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
			isHideRowManager: e.bool,
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
				createdBy: e.select(CREATOR),
				dataObj: e.select(e.sys_core.getDataObj(p.dataObj)),
				header: p.header,
				isHideRowManager: p.isHideRowManager,
				modifiedBy: e.select(CREATOR),
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

export async function addUser(data: any) {
	sectionHeader(`addUser - ${data.userName}`)
	const CREATOR = e.sys_user.getRootUser()
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

export async function addUserType(data: any) {
	sectionHeader(`addUserType - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			header: e.str,
			name: e.str,
			owner: e.str,
			resources_sys_app: e.array(e.str),
			resources_sys_widget: e.array(e.str)
		},
		(p) => {
			return e.insert(e.sys_user.SysUserType, {
				createdBy: e.select(CREATOR),
				header: p.header,
				name: p.name,
				owner: e.sys_core.getSystemPrime(p.owner),
				modifiedBy: e.select(CREATOR),
				resources_sys_app: e.assert_distinct(
					e.set(
						e.for(e.array_unpack(p.resources_sys_app), (res) => {
							return e.sys_core.getApp(res)
						})
					)
				),
				resources_sys_widget: e.assert_distinct(
					e.set(
						e.for(e.array_unpack(p.resources_sys_widget), (res) => {
							return e.sys_user.getWidget(res)
						})
					)
				)
			})
		}
	)
	return await query.run(client, data)
}

// export async function userType(params: any) {
// 	const CREATOR = e.sys_user.getRootUser()
// 	const query = e.params({ data: e.json }, (params) => {
// 		return e.for(e.json_array_unpack(params.data), (i) => {
// 			return e.insert(e.sys_user.SysUserType, {
// 				owner: e.select(e.sys_core.getSystemPrime(e.cast(e.str, i[0]))),
// 				name: e.cast(e.str, i[1]),
// 				createdBy: CREATOR,
// 				modifiedBy: CREATOR
// 			})
// 		})
// 	})
// 	return await query.run(client, { data: params })
// }
