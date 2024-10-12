import {
	addRoleOrg,
	addRoleStaff,
	addStaff,
	nodeObjHeaders,
	nodeObjPrograms,
	sectionHeader,
	userType,
	userTypeResourcesApps,
	userTypeResourcesPrograms,
	userTypeResourcesWidgets,
	userUserType,
	widgets
} from '$server/dbEdge/init/dbEdgeInitUtilities10'

export async function initUser() {
	await initUserResources()
	await initUserType()
	await initStaff()
}

async function initUserResources() {
	/* programs */
	await nodeObjPrograms([
		['sys_app_sys', 'node_pgm_sys_admin', 'Administration', 10, 'application'],
		['sys_app_cm', 'node_pgm_cm_staff_provider', 'Staff', 40, 'application']
	])
	// ['sys_app_cm', 'node_pgm_cm_staff_admin', 'Administration', 30, 'application'],
	// ['sys_app_cm', 'node_pgm_cm_student', 'AI-Role: Student', 50, 'application']

	sectionHeader('NodeObjHeader - Report')
	await nodeObjHeaders([
		[
			'sys_app_cm',
			'node_pgm_cm_staff_provider',
			'node_hdr_cm_ai_reports',
			'Reports',
			40,
			'application'
		]
	])

	/* widgets */
	await widgets([
		['sys_app_cm', 'widget_cm_user'],
		['sys_app_cm', 'widget_cm_quotes'],
		['sys_app_sys', 'widget_sys_user']
	])
}

async function initUserType() {
	/* userType */
	await userType([
		['sys_app_cm', 'ut_cm_staff_admin'],
		['sys_app_cm', 'ut_cm_staff_provider'],
		['sys_app_cm', 'ut_cm_student'],
		['sys_app_sys', 'ut_sys_admin']
	])

	/* apps */
	await userTypeResourcesApps([
		['ut_sys_admin', 'sys_app_cm'],
		['ut_sys_admin', 'sys_app_db'],
		['ut_sys_admin', 'sys_app_sys'],
		['ut_sys_admin', 'sys_app_sys_admin'],
		['ut_sys_admin', 'sys_app_sys_admin_org'],
		['ut_sys_admin', 'sys_app_sys_admin_user']
	])

	/* programs */
	await userTypeResourcesPrograms([
		['ut_cm_staff_admin', 'node_pgm_cm_staff_provider'],
		['ut_cm_staff_provider', 'node_pgm_cm_staff_provider'],
		['ut_sys_admin', 'node_pgm_cm_staff_provider'],
		['ut_sys_admin', 'node_pgm_sys_admin']
	])
	// ['ut_cm_staff_admin', 'node_pgm_cm_staff_admin'],
	// ['ut_cm_staff_admin', 'node_pgm_cm_student'],
	// ['ut_sys_admin', 'node_pgm_cm_staff_admin'],
	// ['ut_sys_admin', 'node_pgm_cm_student'],

	/* widgets */
	await userTypeResourcesWidgets([
		['ut_cm_staff_admin', 'widget_cm_user'],
		['ut_cm_staff_provider', 'widget_cm_user']
		// ['ut_sys_admin', 'widget_sys_user']
	])

	/* user - userType */
	await userUserType([
		['2482317505', 'ut_cm_staff_provider'],
		['3136276210', 'ut_cm_staff_admin'],
		['2487985578', 'ut_cm_staff_admin'],
		['3136272756', 'ut_cm_staff_provider'],
		['user_sys', 'ut_cm_staff_admin'],
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
