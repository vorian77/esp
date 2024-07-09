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
import { addUser, addUserOrg } from '$server/dbEdge/init/dbEdgeInitUtilities50Other'

export async function initUser() {
	await initUserResources()
	await initUserType()
	// await initStaff()
}

async function initUserResources() {
	/* programs */
	await nodeObjPrograms([
		['app_sys', 'node_pgm_sys_admin', 'Administration', 10, 'application'],
		['app_cm', 'node_pgm_cm_staff_admin', 'AI-Role: Admin', 30, 'application'],
		['app_cm', 'node_pgm_cm_staff_provider', 'AI-Role: Provider', 40, 'application'],
		['app_cm', 'node_pgm_cm_student', 'AI-Role: Student', 50, 'application']
	])

	sectionHeader('NodeObjHeader - Report')
	await nodeObjHeaders([
		['app_cm', 'node_pgm_cm_staff_provider', 'node_hdr_cm_ai_reports', 'Reports', 30, 'application']
	])

	/* widgets */
	await widgets([
		['app_cm', 'widget_cm_user'],
		['app_cm', 'widget_cm_quotes'],
		['app_sys', 'widget_sys_user']
	])
}

async function initUserType() {
	// await addUserOrg({ orgName: 'Atlantic Impact', userName: 'user_sys' })
	// await addUserOrg({ orgName: 'Atlantic Impact', userName: '2482317505' })
	// await addUserOrg({ orgName: 'Atlantic Impact', userName: '3136276210' })
	// await addUserOrg({ orgName: 'Atlantic Impact', userName: '2487985578' })
	// await addUserOrg({ orgName: 'Atlantic Impact', userName: '3136272756' })

	/* userType */
	await userType([
		['app_cm', 'ut_cm_staff_admin'],
		['app_cm', 'ut_cm_staff_provider'],
		['app_cm', 'ut_cm_student'],
		['app_sys', 'ut_sys_admin']
	])

	/* apps */
	await userTypeResourcesApps([
		['ut_sys_admin', 'app_cm'],
		['ut_sys_admin', 'app_db'],
		['ut_sys_admin', 'app_sys'],
		['ut_sys_admin', 'app_sys_admin'],
		['ut_sys_admin', 'app_sys_admin_org'],
		['ut_sys_admin', 'app_sys_admin_user']
	])

	/* programs */
	await userTypeResourcesPrograms([
		['ut_cm_staff_admin', 'node_pgm_cm_staff_admin'],
		['ut_cm_staff_admin', 'node_pgm_cm_staff_provider'],
		['ut_cm_staff_admin', 'node_pgm_cm_student'],
		['ut_cm_staff_provider', 'node_pgm_cm_staff_provider'],
		['ut_sys_admin', 'node_pgm_cm_staff_admin'],
		['ut_sys_admin', 'node_pgm_cm_staff_provider'],
		['ut_sys_admin', 'node_pgm_cm_student'],
		['ut_sys_admin', 'node_pgm_sys_admin']
	])

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
	// await addRoleOrg([
	// 	['Atlantic Impact', 'cm_training_role_org_agency'],
	// 	['Atlantic Impact - School Site 1', 'cm_training_role_org_venue'],
	// 	['Atlantic Impact - School Site 2', 'cm_training_role_org_venue'],
	// 	['Atlantic Impact - School Site 3', 'cm_training_role_org_venue']
	// ])
	// await addRoleStaff([
	// 	['Anise', 'Hayes', 'cm_training_role_staff_agency'],
	// 	['Matthew', 'Clayton', 'cm_training_role_staff_agency'],
	// 	['Erica', 'Hicks', 'cm_training_role_staff_agency']
	// ])
}
