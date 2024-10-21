import {
	ResetDb,
	sectionHeader,
	userSystems,
	userUserType,
	widgets
} from '$server/dbEdge/init/dbEdgeInit200Utilities10'
import {
	addApp,
	addAppHeader,
	addNodeFooter,
	addUserType
} from '$server/dbEdge/init/dbEdgeInit200Utilities50Other'

export async function initUser() {
	await initReset()
	await initAppHeaders()
	await initApps()
	await initResources()
	await initUserType()
	await initUserSystems()
	await initUserUserType()
	// await initStaff()
}

export async function initReset() {
	sectionHeader('Reset-User')
	const reset = new ResetDb()
	reset.addStatement('delete sys_user::SysUserTypeResource')
	reset.addStatement('delete sys_user::SysUserType')
	reset.addStatement(
		`delete sys_core::SysNodeObj filter .name = 'node_obj_sys_admin_footer_home_test'`
	)
	reset.delTableRecords('sys_user::SysWidget')
	reset.delTableRecords('sys_core::SysApp')
	reset.delTableRecords('sys_core::SysAppHeader')
	await reset.execute()
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
		name: 'app_hdr_sys_reporting',
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
	/* system */
	await addApp({
		appHeader: 'app_hdr_sys_admin',
		isGlobalResource: false,
		name: 'app_sys_admin_global',
		owner: 'sys_system_old',
		nodes: [
			'node_obj_sys_org_list_sys',
			'node_obj_sys_org_list_user',
			'node_obj_sys_system_config_list',
			'node_obj_sys_system_object_list',
			'node_obj_sys_system_meta_list'
		]
	})
	await addApp({
		appHeader: 'app_hdr_sys_admin',
		isGlobalResource: true,
		name: 'app_sys_admin_user',
		owner: 'sys_system_old',
		nodes: ['node_obj_sys_org_list_user', 'node_obj_sys_system_meta_list']
	})
	await addApp({
		appHeader: 'app_hdr_sys_reporting',
		isGlobalResource: true,
		name: 'app_sys_reporting',
		owner: 'sys_system_old',
		nodes: ['node_obj_sys_rep_my_report_list']
	})

	/* Atlantic Impact */
	await addApp({
		appHeader: 'app_hdr_sys_reporting',
		isGlobalResource: false,
		name: 'app_ai_reporting',
		owner: 'sys_ai_old',
		nodes: [
			'node_obj_cm_ai_report_course_summary',
			'node_obj_cm_ai_report_our_world_summary',
			'node_obj_cm_ai_report_student_summary'
		]
	})
	await addApp({
		appHeader: 'app_hdr_ai_staff',
		isGlobalResource: false,
		name: 'app_ai_staff',
		owner: 'sys_ai_old',
		nodes: ['node_obj_cm_course_list', 'node_obj_cm_partner_list', 'node_obj_cm_student_list']
	})
}

async function initResources() {
	/* widgets */
	await widgets([
		['sys_system_old', 'widget_sys_report', true],
		['sys_system_old', 'widget_sys_quotes', true],
		['sys_system_old', 'widget_sys_user', true],
		['sys_ai_old', 'widget_ai_user', false]
	])

	/* footers */
	await addNodeFooter({
		codeIcon: 'application',
		codeType: 'home',
		header: 'Home',
		isGlobalResource: false,
		name: 'node_obj_sys_admin_footer_home_test',
		orderDefine: 0,
		owner: 'sys_ai_old'
	})
}

async function initUserType() {
	/* system */
	await addUserType({
		header: 'Admin - Global',
		name: 'ut_sys_admin_global',
		owner: 'sys_system_old',
		resources_sys_app: ['app_sys_admin_global', 'app_sys_reporting'],
		resources_sys_widget: ['widget_sys_report']
	})

	/* Atlantic Impact */
	await addUserType({
		header: 'AI-Admin',
		name: 'ut_ai_admin',
		owner: 'sys_ai_old',
		resources_sys_app: ['app_sys_admin_user', 'app_sys_reporting'],
		resources_sys_widget: ['widget_sys_report']
	})
	await addUserType({
		header: 'AI-Staff',
		name: 'ut_ai_staff',
		owner: 'sys_ai_old',
		resources_sys_app: ['app_ai_staff', 'app_sys_reporting', 'app_ai_reporting'],
		resources_sys_widget: ['widget_sys_report']
	})
}

async function initUserSystems() {
	await userSystems([
		['user_sys', ['sys_system_old', 'sys_ai_old']],
		['3136276210', ['sys_ai_old']],
		['2482317505', ['sys_ai_old']],
		['2487985578', ['sys_ai_old']],
		['3136272756', ['sys_ai_old']]
	])
}

async function initUserUserType() {
	// user_sys
	await userUserType([
		['user_sys', 'ut_sys_admin_global'],
		['user_sys', 'ut_ai_admin'],
		['user_sys', 'ut_ai_staff']
	])
	// AI-Admin (Matt)
	await userUserType([
		['3136276210', 'ut_ai_admin'],
		['3136276210', 'ut_ai_staff']
	])
	// AI-Staff (Anise, Phyllip, Erica)
	await userUserType([
		['2482317505', 'ut_ai_staff'],
		['2487985578', 'ut_ai_staff'],
		['3136272756', 'ut_ai_staff']
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
