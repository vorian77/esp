import { InitDb } from '$server/dbEdge/init/types.init'

export function initUser(init: InitDb) {
	initAppHeaders(init)
	initApps(init)
	initUserType(init)
	initUserSystems(init)
	initUserUserType(init)
	// initStaff()
}

async function initAppHeaders(init: InitDb) {
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

async function initApps(init: InitDb) {
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
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_sys_reporting',
		isGlobalResource: true,
		name: 'app_sys_reporting',
		owner: 'sys_system_old',
		nodes: ['node_obj_sys_rep_my_report_list']
	})

	/* Atlantic Impact */
	init.addTrans('sysApp', {
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
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_ai_staff',
		isGlobalResource: false,
		name: 'app_ai_staff',
		owner: 'sys_ai_old',
		nodes: ['node_obj_cm_course_list', 'node_obj_cm_partner_list', 'node_obj_cm_student_list']
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

async function initUserType(init: InitDb) {
	/* system */
	init.addTrans('sysUserType', {
		header: 'Admin - Global',
		name: 'ut_sys_admin_global',
		owner: 'sys_system_old',
		resources: [
			{ codeType: 'app', resource: 'app_sys_admin_global' },
			{ codeType: 'app', resource: 'app_sys_reporting' },
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
			{ codeType: 'app', resource: 'app_sys_reporting' },
			{ codeType: 'widget', resource: 'widget_sys_report' }
		]
	})
	init.addTrans('sysUserType', {
		header: 'AI-Staff',
		name: 'ut_ai_staff',
		owner: 'sys_ai_old',
		resources: [
			{ codeType: 'app', resource: 'app_ai_reporting' },
			{ codeType: 'app', resource: 'app_ai_staff' },
			{ codeType: 'app', resource: 'app_sys_reporting' },
			{ codeType: 'report', resource: 'report_cm_training_cohort_attendance' },
			{ codeType: 'report', resource: 'report_cm_training_cohort_job_placement' },
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
			{ codeType: 'app', resource: 'app_sys_reporting' },
			{ codeType: 'subject', resource: 'moedOfficeEastside' },
			{ codeType: 'subject', resource: 'moedOfficeWestside' }
		]
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

async function initUserSystems(init: InitDb) {
	init.addTrans('userSystemsBulk', [
		['user_sys', 'sys_system_old'],
		['user_sys', 'sys_ai_old'],
		['user_sys', 'sys_moed_old']
	])
	init.addTrans('userSystemsBulk', [
		['2487985578', 'sys_system_old'],
		['2487985578', 'sys_ai_old'],
		['2487985578', 'sys_moed_old']
	])
	init.addTrans('userSystemsBulk', [
		['3136276210', 'sys_ai_old'],
		['2482317505', 'sys_ai_old'],
		['2487985578', 'sys_ai_old'],
		['3136272756', 'sys_ai_old']
	])
}

async function initUserUserType(init: InitDb) {
	// user_sys
	init.addTrans('userUserTypeBulk', [
		['user_sys', 'ut_sys_admin_global'],
		['user_sys', 'ut_ai_admin'],
		['user_sys', 'ut_ai_staff'],
		['user_sys', 'ut_moed_advocate'],
		['user_sys', 'ut_moed_student']
	])
	// phyllip
	init.addTrans('userUserTypeBulk', [
		['2487985578', 'ut_sys_admin_global'],
		['2487985578', 'ut_ai_admin'],
		['2487985578', 'ut_ai_staff'],
		['2487985578', 'ut_moed_advocate']
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
}
