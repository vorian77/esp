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

export async function addCode(data: any) {
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
				owner: e.select(e.sys_core.getEnt(p.owner)),
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
				createdBy: e.select(e.sys_user.getRootUser()),
				modifiedBy: e.select(e.sys_user.getRootUser())
			})
		}
	)
	return await query.run(client, data)
}

export async function addCodeType(data: any) {
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
				owner: e.select(e.sys_core.getEnt(p.owner)),
				parent: e.select(e.sys_core.getCodeType(p.parent)),
				header: p.header,
				name: p.name,
				order: p.order,
				createdBy: e.select(e.sys_user.getRootUser()),
				modifiedBy: e.select(e.sys_user.getRootUser())
			})
		}
	)
	return await query.run(client, data)
}

export async function addMigration(data: any) {
	sectionHeader(`addMigration - ${data.name}`)
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
				owner: e.select(e.sys_core.getEnt(p.owner)),
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
									createdBy: e.select(e.sys_user.getRootUser()),
									modifiedBy: e.select(e.sys_user.getRootUser())
								})
							}
						),
						exprSelect: e.cast(e.str, e.json_get(t, 'exprSelect')),
						name: e.cast(e.str, e.json_get(t, 'name')),
						createdBy: e.select(e.sys_user.getRootUser()),
						modifiedBy: e.select(e.sys_user.getRootUser())
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
									createdBy: e.select(e.sys_user.getRootUser()),
									modifiedBy: e.select(e.sys_user.getRootUser())
								})
							}
						),
						isActive: e.cast(e.bool, true),
						isInitTable: e.cast(e.bool, e.json_get(t, 'isInitTable')),
						orderDefine: e.cast(e.int16, e.json_get(t, 'orderDefine')),
						table: e.select(e.sys_db.getTable(e.cast(e.str, e.json_get(t, 'name')))),
						createdBy: e.select(e.sys_user.getRootUser()),
						modifiedBy: e.select(e.sys_user.getRootUser())
					})
				}),
				createdBy: e.select(e.sys_user.getRootUser()),
				modifiedBy: e.select(e.sys_user.getRootUser())
			})
		}
	)
	return await query.run(client, data)
}

export async function addNodeFooter(data: any) {
	sectionHeader(`addNodeFooter - ${data.name}`)
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
				createdBy: e.select(e.sys_user.getRootUser()),
				dataObj: e.select(e.sys_core.getDataObj(p.dataObj)),
				header: p.header,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				orderDefine: p.orderDefine,
				owner: e.select(e.sys_core.getEnt(p.owner)),
				page: p.page
			})
		}
	)
	return await query.run(client, data)
}

export async function addNodeProgram(data: any) {
	sectionHeader(`addNodeProgram - ${data.name}`)
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
				createdBy: e.select(e.sys_user.getRootUser()),
				header: p.header,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				orderDefine: p.orderDefine,
				owner: e.select(e.sys_core.getEnt(p.owner))
			})
		}
	)
	return await query.run(client, data)
}

export async function addNodeProgramObj(data: any) {
	sectionHeader(`addNodeProgramObj - ${data.name}`)
	const query = e.params(
		{
			codeIcon: e.str,
			dataObj: e.optional(e.str),
			header: e.optional(e.str),
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
				createdBy: e.select(e.sys_user.getRootUser()),
				dataObj: e.select(e.sys_core.getDataObj(p.dataObj)),
				header: p.header,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				orderDefine: p.orderDefine,
				owner: e.select(e.sys_core.getEnt(p.owner)),
				parent: e.select(e.sys_core.getNodeObjByName(p.parentNodeName))
			})
		}
	)
	return await query.run(client, data)
}

export async function addOrg(data: any) {
	const query = e.params(
		{
			name: e.str,
			header: e.optional(e.str),
			creator: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysOrg, {
				owner: e.select(e.sys_core.getRootObj()),
				name: p.name,
				header: p.header,
				createdBy: e.select(e.sys_user.getRootUser()),
				modifiedBy: e.select(e.sys_user.getRootUser())
			})
		}
	)
	return await query.run(client, data)
}

export async function addUser(data: any) {
	sectionHeader(`addUser - ${data.userName}`)
	const CREATOR = e.select(e.sys_user.getRootUser())
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

export async function addUserOrg(data: any) {
	sectionHeader(`addUser - ${data.userName} - org: ${data.orgName}`)
	const query = e.params(
		{
			orgName: e.str,
			userName: e.str
		},
		(p) => {
			return e.update(e.sys_user.SysUser, (u) => ({
				filter: e.op(u.userName, '=', p.userName),
				set: {
					orgs: {
						'+=': e.select(e.sys_core.getOrg(p.orgName))
					}
				}
			}))
		}
	)
	return await query.run(client, data)
}
