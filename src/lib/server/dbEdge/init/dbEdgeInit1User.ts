import {
	addRoleOrg,
	addRoleStaff,
	addStaff,
	nodeObjHeaders,
	nodeObjPrograms,
	ResetDb,
	sectionHeader,
	userType,
	userTypeResourcesApps,
	userTypeResourcesPrograms,
	userTypeResourcesWidgets,
	userUserType,
	widgets
} from '$server/dbEdge/init/dbEdgeInit200Utilities10'
import { addApp, addAppHeader } from '$server/dbEdge/init/dbEdgeInit200Utilities50Other'

export async function initUser() {
	await initReset()
	await initResources()
	await initAppHeaders()
	await initApps()
	await initUserType()
	// await initStaff()
}

export async function initReset() {
	sectionHeader('Reset-User')
	const reset = new ResetDb()
	reset.addStatement('delete sys_user::SysUserTypeResource')
	reset.addStatement('delete sys_user::SysUserType')
	reset.delTableRecords('sys_user::SysWidget')
	reset.delTableRecords('sys_core::SysApp')
	reset.delTableRecords('sys_core::SysAppHeader')
	await reset.execute()
}

async function initResources() {
	/* widgets */
	await widgets([['sys_system_old', 'widget_sys_report']])
}

async function initAppHeaders() {
	await addAppHeader({
		header: 'Administration',
		isGlobalResource: true,
		name: 'app_hdr_sys_admin',
		orderDefine: 0,
		owner: 'sys_system_old'
	})
	await addAppHeader({
		header: 'Reports',
		isGlobalResource: true,
		name: 'app_hdr_sys_report',
		orderDefine: 1000,
		owner: 'sys_system_old'
	})
	await addAppHeader({
		header: 'Staff',
		isGlobalResource: false,
		name: 'app_hdr_ai_staff',
		orderDefine: 100,
		owner: 'sys_ai_old'
	})
}
async function initApps() {
	await addApp({
		appHeader: 'app_hdr_ai_staff',
		isGlobalResource: false,
		name: 'app_ai_staff',
		owner: 'sys_ai_old',
		nodes: ['node_obj_cm_course_list', 'node_obj_cm_partner_list', 'node_obj_cm_student_list']
	})
	await addApp({
		appHeader: 'app_hdr_sys_admin',
		isGlobalResource: true,
		name: 'app_sys_admin',
		owner: 'sys_system_old',
		nodes: [
			'node_obj_sys_org_list',
			'node_obj_sys_system_config_list',
			'node_obj_sys_system_object_list',
			'node_obj_sys_system_meta_list'
		]
	})
	await addApp({
		appHeader: 'app_hdr_sys_report',
		isGlobalResource: true,
		name: 'app_sys_report',
		owner: 'sys_system_old',
		nodes: [
			'node_obj_sys_rep_my_report_list',
			'node_obj_cm_ai_report_course_summary',
			'node_obj_cm_ai_report_student_summary'
		]
	})
}

async function initUserType() {
	/* userType */
	await userType([
		['sys_ai_old', 'ut_cm_staff_admin'],
		['sys_ai_old', 'ut_cm_staff_provider'],
		['sys_system_old', 'ut_sys_admin']
	])

	/* apps */
	await userTypeResourcesApps([
		['ut_cm_staff_provider', 'app_ai_staff'],
		['ut_cm_staff_provider', 'app_sys_report'],
		['ut_sys_admin', 'app_ai_staff'],
		['ut_sys_admin', 'app_sys_admin'],
		['ut_sys_admin', 'app_sys_report']
	])

	/* widgets */
	await userTypeResourcesWidgets([
		['ut_cm_staff_provider', 'widget_sys_report'],
		['ut_sys_admin', 'widget_sys_report']
	])

	/* user - userType */
	await userUserType([
		['2482317505', 'ut_cm_staff_provider'],
		['3136276210', 'ut_cm_staff_provider'],
		['2487985578', 'ut_cm_staff_provider'],
		['3136272756', 'ut_cm_staff_provider'],
		['user_sys', 'ut_cm_staff_admin'],
		['user_sys', 'ut_cm_staff_provider'],
		['user_sys', 'ut_sys_admin']
	])
}

async function initResourcesOld() {
	/* programs */
	await nodeObjPrograms([
		['sys_system_old', 'node_pgm_sys_admin', 'Administration', 10, 'application'],
		['sys_ai_old', 'node_pgm_cm_staff_provider', 'Staff', 40, 'application']
	])

	sectionHeader('NodeObjHeader - Report')
	await nodeObjHeaders([
		[
			'sys_ai_old',
			'node_pgm_cm_staff_provider',
			'node_hdr_cm_ai_reports',
			'Reports',
			40,
			'application'
		]
	])

	/* widgets */
	await widgets([
		['sys_ai_old', 'widget_cm_user'],
		['sys_ai_old', 'widget_cm_quotes'],
		['sys_system_old', 'widget_sys_user']
	])
}

async function initUserTypeOld() {
	/* userType */
	await userType([
		['sys_ai_old', 'ut_cm_staff_admin'],
		['sys_ai_old', 'ut_cm_staff_provider'],
		['sys_system_old', 'ut_sys_admin']
	])

	/* apps */
	await userTypeResourcesApps([
		['ut_cm_staff_provider', 'app_ai_staff'],
		['ut_cm_staff_provider', 'app_sys_report'],

		['ut_sys_admin', 'app_ai_staff'],
		['ut_sys_admin', 'app_sys_admin'],
		['ut_sys_admin', 'app_sys_report']
	])

	/* programs */
	// await userTypeResourcesPrograms([
	// 	['ut_cm_staff_admin', 'node_pgm_cm_staff_provider'],
	// 	['ut_cm_staff_provider', 'node_pgm_cm_staff_provider'],
	// 	['ut_sys_admin', 'node_pgm_cm_staff_provider'],
	// 	['ut_sys_admin', 'node_pgm_sys_admin']
	// ])
	// ['ut_cm_staff_admin', 'node_pgm_cm_staff_admin'],
	// ['ut_cm_staff_admin', 'node_pgm_cm_student'],
	// ['ut_sys_admin', 'node_pgm_cm_staff_admin'],
	// ['ut_sys_admin', 'node_pgm_cm_student'],

	/* widgets */
	// await userTypeResourcesWidgets([
	// 	['ut_cm_staff_admin', 'widget_cm_user'],
	// 	['ut_cm_staff_provider', 'widget_cm_user']
	// 	// ['ut_sys_admin', 'widget_sys_user']
	// ])

	/* user - userType */
	await userUserType([
		['2482317505', 'ut_cm_staff_provider'],
		['3136276210', 'ut_cm_staff_provider'],
		['2487985578', 'ut_cm_staff_provider'],
		['3136272756', 'ut_cm_staff_provider'],
		['user_sys', 'ut_cm_staff_admin'],
		['user_sys', 'ut_cm_staff_provider'],
		['user_sys', 'ut_sys_admin']
	])
}

async function initStaff() {
	// await addStaff([
	// 	['Atlantic Impact', 'Stacy', 'Administrator'],
	// 	['Atlantic Impact', 'Stan', 'Administrator'],
	// 	['Atlantic Impact', 'Anise', 'Hayes'],
	// 	['Atlantic Impact', 'Matthew', 'Clayton'],
	// 	['Atlantic Impact', 'Erica', 'Hicks'],
	// 	['Atlantic Impact', 'Jane', 'Instructor'],
	// 	['Atlantic Impact', 'Joe', 'Instructor']
	// ])
	// await addRoleStaff([
	// 	['Anise', 'Hayes', 'cm_training_role_staff_agency'],
	// 	['Matthew', 'Clayton', 'cm_training_role_staff_agency'],
	// 	['Erica', 'Hicks', 'cm_training_role_staff_agency']
	// ])
}
