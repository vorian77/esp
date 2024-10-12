import { addSystem, updateSystem } from '$server/dbEdge/init/dbEdgeInitUtilities10'

export async function initSystems() {
	await updateSystem({
		header: 'sys_app_cm',
		name: 'sys_app_cm',
		owner: 'app_cm'
	})
	await updateSystem({
		header: 'sys_app_cm_training',
		name: 'sys_app_cm_training',
		owner: 'app_cm_training'
	})
	await updateSystem({
		header: 'sys_app_db',
		name: 'sys_app_db',
		owner: 'app_db'
	})
	await updateSystem({
		header: 'sys_app_sys',
		name: 'sys_app_sys',
		owner: 'app_sys'
	})
	await updateSystem({
		header: 'sys_app_sys_admin',
		name: 'sys_app_sys_admin',
		owner: 'app_sys_admin'
	})
	await updateSystem({
		header: 'sys_app_sys_admin_org',
		name: 'sys_app_sys_admin_org',
		owner: 'app_sys_admin_org'
	})
	await updateSystem({
		header: 'sys_app_sys_admin_user',
		name: 'sys_app_sys_admin_user',
		owner: 'app_sys_admin_user'
	})
	await updateSystem({
		header: 'sys_app_sys_rep',
		name: 'sys_app_sys_rep',
		owner: 'app_sys_rep'
	})
}
