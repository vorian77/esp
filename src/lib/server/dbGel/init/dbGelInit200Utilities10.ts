import e from '$db/gel/edgeql-js'
import { client, sectionHeader } from '$routes/api/db/dbGel/dbGel'
import { debug, getArray } from '$utils/types'

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

export async function codeTypesBulk(params: any) {
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

export async function codesBulk(params: any) {
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

export async function tablesBulk(data: any) {
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
