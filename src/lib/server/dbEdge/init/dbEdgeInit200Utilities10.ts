import { createClient } from 'edgedb'
import e from '$lib/dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'
import { executeQuery } from '$routes/api/dbEdge/dbEdgeProcess'
import { debug, getArray } from '$utils/types'

const client = createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export function booleanOrDefaultParm(val: any, valDefault: boolean) {
	return e.op(val, 'if', e.op('exists', val), 'else', valDefault)
}

export function booleanOrDefaultJSON(jsonObj: any, val: string, valDefault: boolean) {
	return e.cast(e.bool, e.op(e.cast(e.bool, e.json_get(jsonObj, val)), '??', valDefault))
}

export async function addSystem(data: any) {
	sectionHeader(`addSystem - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			name: e.str,
			header: e.str,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysSystem, {
				createdBy: CREATOR,
				header: p.header,
				modifiedBy: CREATOR,
				name: p.name,
				owner: e.select(e.sys_core.getOrg(p.owner))
			})
		}
	)
	return await query.run(client, data)
}

export async function sysUser(owner: string, userName: string) {
	const CREATOR = e.sys_user.getRootUser()
	const query = e.insert(e.sys_user.SysUser, {
		createdBy: CREATOR,
		modifiedBy: CREATOR,
		owner: e.select(e.sys_core.getOrg(owner)),
		password: '!8394812kalsdjfa*!@#$$*&',
		person: e.insert(e.default.SysPerson, {
			firstName: 'System',
			lastName: 'User'
		}),
		userName
	})
	return await query.run(client)
}

export async function userSystems(params: any) {
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_user.SysUser, (u) => ({
				filter: e.op(u.userName, '=', e.cast(e.str, i[0])),
				set: {
					systems: e.assert_distinct(
						e.for(e.array_unpack(e.cast(e.array(e.str), i[1])), (s) => {
							return e.sys_core.getSystemPrime(s)
						})
					)
				}
			}))
		})
	})
	return await query.run(client, { data: params })
}

export async function userType(params: any) {
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_user.SysUserType, {
				owner: e.select(e.sys_core.getSystemPrime(e.cast(e.str, i[0]))),
				name: e.cast(e.str, i[1]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function userUserType(params: any) {
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_user.SysUser, (u) => ({
				filter: e.op(u.userName, '=', e.cast(e.str, i[0])),
				set: {
					userTypes: {
						'+=': e.select(e.sys_user.getUserType(e.cast(e.str, i[1])))
					}
				}
			}))
		})
	})
	return await query.run(client, { data: params })
}

export async function codeTypes(params: any) {
	sectionHeader('Code Types')
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_core.SysCodeType, {
				owner: e.select(e.sys_core.getSystemPrime(e.cast(e.str, i[0]))),
				order: e.cast(e.int16, i[1]),
				name: e.cast(e.str, i[2]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function codes(params: any) {
	sectionHeader('Codes')
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_core.SysCode, {
				codeType: e.select(e.sys_core.getCodeType(e.cast(e.str, i[0]))),
				owner: e.select(e.sys_core.getSystemPrime(e.cast(e.str, i[1]))),
				name: e.cast(e.str, i[2]),
				order: e.cast(e.int16, i[3]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function nodeObjPages(params: any) {
	sectionHeader('Node Pages')
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_core.SysNodeObj, {
				owner: e.select(e.sys_core.getSystemPrime(e.cast(e.str, i[0]))),
				parent: e.select(e.sys_core.getNodeObjByName(e.cast(e.str, i[1]))),
				codeNavType: e.select(e.sys_core.getCode('ct_sys_node_obj_nav_type', 'tree')),
				codeNodeType: e.select(e.sys_core.getCode('ct_sys_node_obj_type', 'page')),
				name: e.cast(e.str, i[2]),
				header: e.cast(e.str, i[3]),
				orderDefine: e.cast(e.int64, i[4]),
				codeIcon: e.select(e.sys_core.getCode('ct_sys_node_obj_icon', e.cast(e.str, i[5]))),
				page: e.cast(e.str, i[6]),
				createdBy: CREATOR,
				modifiedBy: CREATOR,
				isHideRowManager: e.cast(e.bool, false)
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function widgets(params: any) {
	sectionHeader('Widgets')
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_user.SysWidget, {
				owner: e.select(e.sys_core.getSystemPrime(e.cast(e.str, i[0]))),
				name: e.cast(e.str, i[1]),
				isGlobalResource: e.cast(e.bool, i[2]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function tables(data: any) {
	sectionHeader('Tables')
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_db.SysTable, {
				owner: e.select(e.sys_core.getSystemPrime(e.cast(e.str, i[0]))),
				mod: e.cast(e.str, i[1]),
				name: e.cast(e.str, i[2]),
				hasMgmt: e.cast(e.bool, i[3]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data })
}

// export async function addStaff(params: any) {
// 	sectionHeader('Staff')
// 	// const CREATOR = e.sys_user.getRootUser()
// 	const CREATOR = e.sys_user.getRootUser()
// 	const query = e.params({ data: e.json }, (params) => {
// 		return e.for(e.json_array_unpack(params.data), (i) => {
// 			return e.insert(e.sys_user.SysStaff, {
// 				owner: e.select(e.sys_core.getSystemPrime(e.cast(e.str, i[0]))),
// 				person: e.insert(e.default.SysPerson, {
// 					firstName: e.cast(e.str, i[1]),
// 					lastName: e.cast(e.str, i[2])
// 				}),
// 				createdBy: CREATOR,
// 				modifiedBy: CREATOR
// 			})
// 		})
// 	})
// 	return await query.run(client, { data: params })
// }

export async function addRoleStaff(params: any) {
	sectionHeader('Staff - Roles')
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_user.getStaffByName(e.cast(e.str, i[0]), e.cast(e.str, i[1])), (o) => ({
				set: {
					roles: { '+=': e.select(e.sys_core.getCode('ct_sys_role_staff', e.cast(e.str, i[2]))) }
				}
			}))
		})
	})
	return await query.run(client, { data: params })
}

export function sectionHeader(section: string) {
	console.log()
	console.log(`--- ${section} ---`)
}

export class ResetDb {
	query: string = ''
	constructor() {
		this.query = ''
	}
	addStatement(statement: string) {
		this.query += statement + ';\n'
	}
	delCodeType(codeTypeName: string) {
		this.addStatement(`DELETE sys_core::SysCode FILTER .codeType.name = '${codeTypeName}'`)
		this.addStatement(`DELETE sys_core::SysCodeType FILTER .name = '${codeTypeName}'`)
	}
	delColumn(name: string) {
		this.addStatement(`DELETE sys_db::SysColumn FILTER .name = '${name}'`)
	}
	delDataObj(name: string) {
		this.addStatement(`DELETE sys_core::SysDataObj FILTER .name = '${name}'`)
	}

	delDataObjColumnMultiLinks(name: string) {
		this.addStatement(`UPDATE sys_core::SysDataObjColumn
			FILTER .id IN (SELECT sys_core::SysDataObj FILTER .name = 'data_obj_${name}_detail').columns.id
				SET { fieldListConfig := {}, fieldListItems := {}, fieldListSelect := {} }`)
	}

	delFeature(name: string) {
		this.delNodeObj(`node_obj_${name}_detail`)
		this.delNodeObj(`node_obj_${name}_list`)
		this.delDataObj(`data_obj_${name}_detail`)
		this.delDataObj(`data_obj_${name}_list`)
	}
	delMigration(name: string) {
		this.addStatement(`DELETE sys_migr::SysMigration FILTER .name = ${name}`)
	}
	delNodeObj(name: string) {
		this.addStatement(`DELETE sys_core::SysNodeObj FILTER .name = '${name}'`)
	}
	delTable(name: string) {
		this.addStatement(`DELETE sys_db::SysTable FILTER .name = '${name}'`)
	}
	delTableRecords(table: string) {
		this.addStatement(`DELETE ${table}`)
	}
	async execute() {
		sectionHeader('Execute DB Transaction')
		if (this.query) await executeQuery(this.query)
		this.query = ''
	}
}

export async function resetDBItems(section: string, statements: any) {
	sectionHeader(section)
	statements = getArray(statements)
	const reset = new ResetDb()
	statements.forEach((s: string) => {
		sectionHeader(s)
		reset.addStatement(s)
	})
	await reset.execute()
}
