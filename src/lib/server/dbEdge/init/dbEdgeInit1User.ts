import { InitDb } from '$server/dbEdge/init/types.init'

export function initUser(init: InitDb) {
	initResources(init)
	initAppHeaders(init)
	initApps(init)
	initUserType(init)
	initUserSystems(init)
	initUserUserType(init)
	// initStaff()
}

function initResources(init: InitDb) {
	/* footers */
	init.addTrans('sysNodeObjFooter', {
		codeIcon: 'AppWindow',
		codeType: 'home',
		header: 'Home',
		isGlobalResource: false,
		name: 'node_obj_sys_admin_footer_home_test',
		orderDefine: 0,
		owner: 'sys_ai_old'
	})

	/* widgets */
	init.addTrans('widgetsBulk', [
		['sys_system_old', 'widget_sys_report', true],
		['sys_system_old', 'widget_sys_quotes', true],
		['sys_system_old', 'widget_sys_user', true],
		['sys_ai_old', 'widget_ai_user', false],
		['sys_moed_old', 'wf_moed_student_ssr_app', false],
		['sys_moed_old', 'wf_moed_student_ssr_doc', false],
		['sys_moed_old', 'wf_moed_student_ssr_msg', false]
	])
}

function initAppHeaders(init: InitDb) {
	init.addTrans('sysAppHeader', {
		codeIcon: 'ShieldEllipsis',
		header: 'Administration',
		isGlobalResource: true,
		name: 'app_hdr_sys_admin',
		orderDefine: 0,
		owner: 'sys_system_old'
	})
	init.addTrans('sysAppHeader', {
		codeIcon: 'FileStack',
		header: 'Reports',
		isGlobalResource: true,
		name: 'app_hdr_sys_reporting',
		orderDefine: 1000,
		owner: 'sys_system_old'
	})

	/* Atlantic Impact */
	init.addTrans('sysAppHeader', {
		codeIcon: 'UsersRound',
		header: 'Staff',
		isGlobalResource: false,
		name: 'app_hdr_ai_staff',
		orderDefine: 100,
		owner: 'sys_ai_old'
	})

	/* MOED */
	init.addTrans('sysAppHeader', {
		codeIcon: 'UsersRound',
		header: 'Staff (MOED)',
		isGlobalResource: false,
		name: 'app_hdr_moed_advocate',
		orderDefine: 200,
		owner: 'sys_moed_old'
	})
	init.addTrans('sysAppHeader', {
		codeIcon: 'UserRoundCog',
		header: 'Student (MOED)',
		isGlobalResource: false,
		name: 'app_hdr_moed_student',
		orderDefine: 210,
		owner: 'sys_moed_old'
	})
}

function initApps(init: InitDb) {
	/* system */
	init.addTrans('sysApp', {
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
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_sys_admin',
		isGlobalResource: true,
		name: 'app_sys_admin_user',
		owner: 'sys_system_old',
		nodes: ['node_obj_sys_org_list_user', 'node_obj_sys_system_meta_list']
	})

	/* Atlantic Impact */
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_ai_staff',
		isGlobalResource: false,
		name: 'app_ai_staff',
		owner: 'sys_ai_old',
		nodes: [
			'node_obj_cm_course_list',
			'node_obj_cm_partner_list',
			'node_obj_cm_student_list',
			'node_obj_sys_rep_my_report_list'
		]
	})

	/* MOED */
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_moed_advocate',
		isGlobalResource: false,
		name: 'app_moed_advocate',
		owner: 'sys_moed_old',
		nodes: ['node_obj_moed_part_list']
	})
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_moed_student',
		isGlobalResource: false,
		name: 'app_moed_student',
		owner: 'sys_moed_old',
		nodes: ['node_obj_moed_part_list']
	})
}

function initUserType(init: InitDb) {
	/* system */
	init.addTrans('sysUserType', {
		header: 'Admin - Global',
		name: 'ut_sys_admin_global',
		owner: 'sys_system_old',
		resources: [
			{ codeType: 'app', resource: 'app_sys_admin_global' },
			{ codeType: 'widget', resource: 'widget_sys_report' }
		]
	})

	/* Atlantic Impact */
	init.addTrans('sysUserType', {
		header: 'AI-Admin',
		name: 'ut_ai_admin',
		owner: 'sys_ai_old',
		resources: [
			{ codeType: 'app', resource: 'app_sys_admin_user' },
			{ codeType: 'widget', resource: 'widget_sys_report' }
		]
	})
	init.addTrans('sysUserType', {
		header: 'AI-Staff',
		name: 'ut_ai_instructor',
		owner: 'sys_ai_old',
		tags: [{ codeType: 'ct_sys_user_type_tag_role', code: 'utt_role_ai_instructor' }]
	})
	init.addTrans('sysUserType', {
		header: 'AI-Staff',
		name: 'ut_ai_staff',
		owner: 'sys_ai_old',
		resources: [
			{ codeType: 'app', resource: 'app_ai_staff' },
			// { codeType: 'report', resource: 'report_ai_cohorts_detail' },
			// { codeType: 'report', resource: 'report_ai_courses_detail' },
			// { codeType: 'report', resource: 'report_ai_partners_detail' },
			{ codeType: 'report', resource: 'report_ai_student_attd_detail' },
			// { codeType: 'report', resource: 'report_ai_student_docs_detail' },
			// { codeType: 'report', resource: 'report_ai_student_notes_detail' },
			// { codeType: 'report', resource: 'report_ai_student_cohort_attd_summary' },
			// { codeType: 'report', resource: 'report_ai_student_job_placement_detail' },
			// { codeType: 'report', resource: 'report_ai_student_school_placement_detail' },
			// { codeType: 'report', resource: 'report_ai_student_service_flow_summary' },
			{ codeType: 'widget', resource: 'widget_sys_report' }
		]
	})

	/* MOED */
	init.addTrans('sysUserType', {
		header: 'MOED-Staff',
		name: 'ut_moed_advocate',
		owner: 'sys_moed_old',
		resources: [
			{ codeType: 'app', resource: 'app_moed_advocate' },
			{ codeType: 'subject', resource: 'moedOfficeEastside' },
			{ codeType: 'subject', resource: 'moedOfficeWestside' }
		],
		tags: [{ codeType: 'ct_sys_user_type_tag_role', code: 'utt_role_moed_staff' }]
	})
	init.addTrans('sysUserType', {
		header: 'MOED-Student',
		name: 'ut_moed_student',
		owner: 'sys_moed_old',
		resources: [
			{ codeType: 'widget', resource: 'wf_moed_student_ssr_app' },
			{ codeType: 'widget', resource: 'wf_moed_student_ssr_doc' },
			{ codeType: 'widget', resource: 'wf_moed_student_ssr_msg' }
		]
	})
}

function initUserSystems(init: InitDb) {
	init.addTrans('userSystemsBulk', [
		['user_sys', 'sys_system_old'],
		['user_sys', 'sys_ai_old'],
		['user_sys', 'sys_moed_old']
	])
	init.addTrans('userSystemsBulk', [
		['2487985578', 'sys_ai_old'],
		['3136276210', 'sys_ai_old'],
		['2482317505', 'sys_ai_old'],
		['3136272756', 'sys_ai_old']
	])
}

function initUserUserType(init: InitDb) {
	// user_sys
	init.addTrans('userUserTypeBulk', [
		['user_sys', 'ut_sys_admin_global'],
		['user_sys', 'ut_ai_admin'],
		['user_sys', 'ut_ai_staff']
		// ['user_sys', 'ut_moed_advocate'],
		// ['user_sys', 'ut_moed_student']
	])
	// phyllip
	init.addTrans('userUserTypeBulk', [
		['2487985578', 'ut_ai_staff'],
		['2487985578', 'ut_ai_instructor']
	])

	// AI-Admin (Matt)
	init.addTrans('userUserTypeBulk', [
		['3136276210', 'ut_ai_admin'],
		['3136276210', 'ut_ai_staff']
	])
	// AI-Staff (Anise, Phyllip, Erica)
	init.addTrans('userUserTypeBulk', [
		['2482317505', 'ut_ai_staff'],
		['3136272756', 'ut_ai_staff']
	])

	// AI-Instructor (Nino)
	init.addTrans('userUserTypeBulk', [['ntanzini', 'ut_ai_instructor']])

	// MOED
	init.addTrans('userUserTypeBulk', [
		['bstone', 'ut_moed_advocate'],
		['toliver', 'ut_moed_advocate'],
		['twilliams', 'ut_moed_advocate'],
		['twilson', 'ut_moed_advocate']
	])
}
