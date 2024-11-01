import { InitDbObj } from '$server/dbEdge/init/types.init'
import { widgets } from '$server/dbEdge/init/dbEdgeInit200Utilities10'
import { addNodeFooter } from '$server/dbEdge/init/dbEdgeInit200Utilities50Other'

export function initUserResource() {
	const init = new InitDbObj('System - User Resource', initObjects)
	initReset(init)
	return init
}

async function initObjects() {
	await initResources()
	// await initStaff()
}

function initReset(init: InitDbObj) {
	init.reset.addStatement(
		`delete sys_core::SysNodeObj filter .name = 'node_obj_sys_admin_footer_home_test'`
	)
	init.reset.delTableRecords('sys_user::SysWidget')
}

async function initResources() {
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

	/* widgets */
	await widgets([
		['sys_system_old', 'widget_sys_report', true],
		['sys_system_old', 'widget_sys_quotes', true],
		['sys_system_old', 'widget_sys_user', true],
		['sys_ai_old', 'widget_ai_user', false],
		['sys_moed_old', 'wf_moed_student_ssr_app', false],
		['sys_moed_old', 'wf_moed_student_ssr_doc', false],
		['sys_moed_old', 'wf_moed_student_ssr_msg', false]
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
