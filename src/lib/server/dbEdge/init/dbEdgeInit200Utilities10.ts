import e from '$db/esdl/edgeql-js'
import { client, sectionHeader } from '$routes/api/dbEdge/dbEdge'
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

export async function nodeObjPagesBulk(params: any) {
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
				isAlwaysRetrieveData: false,
				orderDefine: e.cast(e.int64, i[4]),
				codeIcon: e.select(e.sys_core.getCode('ct_sys_icon', e.cast(e.str, i[5]))),
				page: e.cast(e.str, i[6]),
				createdBy: CREATOR,
				modifiedBy: CREATOR,
				isHideRowManager: e.cast(e.bool, false)
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function widgetsBulk(params: any) {
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
