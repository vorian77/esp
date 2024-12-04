import { InitDb } from '$server/dbEdge/init/types.init'

export function initUser(init: InitDb) {
	initResources(init)
	initAppHeaders(init)
	initApps(init)
	initUserType(init)
	initUsers(init)
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
			'node_obj_sys_admin_org_list_sys',
			'node_obj_sys_admin_org_list_user',
			'node_obj_sys_admin_system_list_config',
			'node_obj_sys_admin_system_list_obj',
			'node_obj_sys_admin_system_list_meta'
		]
	})
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_sys_admin',
		isGlobalResource: true,
		name: 'app_sys_admin_user',
		owner: 'sys_system_old',
		nodes: ['node_obj_sys_admin_org_list_user', 'node_obj_sys_admin_system_list_meta']
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
		nodes: ['node_obj_moed_part_list', 'node_obj_sys_rep_my_report_list']
	})
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_moed_student',
		isGlobalResource: false,
		name: 'app_moed_student',
		owner: 'sys_moed_old',
		nodes: []
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
			{ codeType: 'report', resource: 'report_ai_cohort_performance' },
			{ codeType: 'report', resource: 'report_ai_course_performance' },
			// { codeType: 'report', resource: 'report_ai_cohorts_detail' },
			// { codeType: 'report', resource: 'report_ai_courses_detail' },
			// { codeType: 'report', resource: 'report_ai_partners_detail' },
			// { codeType: 'report', resource: 'report_ai_student_attd_detail' },
			// { codeType: 'report', resource: 'report_ai_student_docs_detail' },
			// { codeType: 'report', resource: 'report_ai_student_notes_detail' },
			{ codeType: 'report', resource: 'report_ai_student_cohort_attd_summary' },
			{ codeType: 'report', resource: 'report_ai_student_job_placement_detail' },
			{ codeType: 'report', resource: 'report_ai_student_school_placement_detail' },
			{ codeType: 'report', resource: 'report_ai_student_roster' },
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
			{ codeType: 'report', resource: 'report_moed_self_serv_student_status' },
			{ codeType: 'subject', resource: 'moedOfficeEastside' },
			{ codeType: 'subject', resource: 'moedOfficeWestside' }
		],
		tags: [{ codeType: 'ct_sys_user_type_tag_role', code: 'utt_role_moed_staff' }]
	})
	init.addTrans('sysUserType', {
		header: `Baltimore - Mayor's Office of Employment Development`,
		isSelfSignup: true,
		name: 'ut_moed_student',
		owner: 'sys_moed_old',
		resources: [
			{ codeType: 'task', resource: 'task_moed_ssr_app' },
			{ codeType: 'task', resource: 'task_moed_ssr_app_doc' }
			// { codeType: 'task', resource: 'task_moed_ssr_app_msg' }
		]
	})
}

function initUsers(init: InitDb) {
	/* system */
	init.addTrans('sysUser', {
		defaultOrg: 'org_system',
		defaultSystem: 'sys_system_old',
		firstName: 'Root',
		isMobileOnly: false,
		lastName: 'User',
		orgs: ['org_system'],
		owner: 'org_system',
		systems: ['sys_system_old'],
		userName: '*ROOTUSER*',
		userTypes: []
	})

	init.addTrans('sysUser', {
		defaultOrg: 'org_system',
		defaultSystem: 'sys_system_old',
		firstName: 'User',
		isMobileOnly: false,
		lastName: 'System',
		orgs: ['org_ai', 'org_moed', 'org_system'],
		owner: 'org_system',
		systems: ['sys_ai_old', 'sys_moed_old', 'sys_system_old'],
		userName: 'user_sys',
		userTypes: [
			'ut_sys_admin_global',
			'ut_ai_admin',
			'ut_ai_staff',
			'ut_moed_advocate',
			'ut_moed_student'
		]
	})

	/* Atlantic Impact */
	init.addTrans('sysUser', {
		defaultOrg: 'org_ai',
		defaultSystem: 'sys_ai_old',
		firstName: 'Anise',
		isMobileOnly: false,
		lastName: 'Hayes',
		orgs: ['org_ai'],
		owner: 'org_ai',
		systems: ['sys_ai_old'],
		userName: '2482317505',
		userTypes: ['ut_ai_staff']
	})

	init.addTrans('sysUser', {
		defaultOrg: 'org_ai',
		defaultSystem: 'sys_ai_old',
		firstName: 'Phyllip',
		isMobileOnly: false,
		lastName: 'Hall',
		orgs: ['org_ai'],
		owner: 'org_ai',
		systems: ['sys_ai_old'],
		userName: '2487985578',
		userTypes: ['ut_ai_staff']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_ai',
		defaultSystem: 'sys_ai_old',
		firstName: 'Erica',
		isMobileOnly: false,
		lastName: 'Hicks',
		orgs: ['org_ai'],
		owner: 'org_ai',
		systems: ['sys_ai_old'],
		userName: '3136272756',
		userTypes: ['ut_ai_staff']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_ai',
		defaultSystem: 'sys_ai_old',
		firstName: 'Matthew',
		isMobileOnly: false,
		lastName: 'Clayton',
		orgs: ['org_ai'],
		owner: 'org_ai',
		systems: ['sys_ai_old'],
		userName: '3136276210',
		userTypes: ['ut_ai_admin', 'ut_ai_staff']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_ai',
		defaultSystem: 'sys_ai_old',
		firstName: 'Nico',
		isMobileOnly: false,
		lastName: 'Tanzini',
		orgs: ['org_ai'],
		owner: 'org_ai',
		systems: ['sys_ai_old'],
		userName: 'ntanzini',
		userTypes: ['ut_ai_instructor']
	})

	/* MOED */
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Burlinton',
		isMobileOnly: false,
		lastName: 'Stone',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: 'bstone',
		userTypes: ['ut_moed_advocate']
	})

	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Omari',
		isMobileOnly: true,
		lastName: 'Jackson',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '1111111111',
		userTypes: ['ut_moed_student']
	})

	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Tyshell',
		isMobileOnly: false,
		lastName: 'Oliver',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: 'toliver',
		userTypes: ['ut_moed_advocate']
	})

	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Travis',
		isMobileOnly: false,
		lastName: 'Williams',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: 'twilliams',
		userTypes: ['ut_moed_advocate']
	})

	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Tynesha',
		isMobileOnly: false,
		lastName: 'Wilson',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: 'twilson',
		userTypes: ['ut_moed_advocate']
	})
}
