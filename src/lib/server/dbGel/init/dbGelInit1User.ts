import { InitDb } from '$server/dbGel/init/types.init'

export function initUser(init: InitDb) {
	initResources(init)
	initAppHeaders(init)
	initApps(init)
	initUserType(init)
	initUsers(init)
}

function initResources(init: InitDb) {
	/* widgets */
	init.addTrans('widgetBulk', [
		['sys_system_old', 'widget_sys_quotes', true],
		['sys_system_old', 'widget_sys_user', true],
		['sys_ai_old', 'widget_ai_user', false]
	])
}

function initAppHeaders(init: InitDb) {
	/* system */
	init.addTrans('sysAppHeader', {
		codeIcon: 'ShieldEllipsis',
		header: 'Administration',
		isGlobalResource: true,
		name: 'app_hdr_sys_admin',
		orderDefine: 0,
		owner: 'sys_system_old'
	})
	init.addTrans('sysAppHeader', {
		codeIcon: 'database',
		header: 'Reporting',
		isGlobalResource: true,
		name: 'app_hdr_sys_reporting',
		orderDefine: 10000,
		owner: 'sys_system_old'
	})

	/* app - CRM */
	init.addTrans('sysAppHeader', {
		codeIcon: 'UsersRound',
		header: 'CRM',
		isGlobalResource: true,
		name: 'app_hdr_app_crm',
		orderDefine: 30,
		owner: 'sys_app_crm'
	})

	/* client - Atlantic Impact */
	init.addTrans('sysAppHeader', {
		codeIcon: 'UsersRound',
		header: 'Atlantic Impact-Staff',
		isGlobalResource: false,
		name: 'app_hdr_client_ai_staff',
		orderDefine: 1000,
		owner: 'sys_ai_old'
	})

	/* client - MOED */
	init.addTrans('sysAppHeader', {
		codeIcon: 'UsersRound',
		header: 'MOED-Staff',
		isGlobalResource: false,
		name: 'app_hdr_client_moed_advocate',
		orderDefine: 2000,
		owner: 'sys_moed_old'
	})
	init.addTrans('sysAppHeader', {
		codeIcon: 'UserRoundCog',
		header: 'MOED-Student',
		isGlobalResource: false,
		name: 'app_hdr_client_moed_student',
		orderDefine: 2010,
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
		nodes: ['node_obj_sys_admin_system_list_meta']
	})
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_sys_reporting',
		isGlobalResource: true,
		name: 'app_sys_reporting',
		owner: 'sys_system_old',
		nodes: ['node_obj_sys_rep_my_report_list']
	})

	/* CRM */
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_app_crm',
		isGlobalResource: false,
		name: 'app_app_crm',
		owner: 'sys_app_crm',
		nodes: ['node_obj_app_crm_client_list']
	})

	/* Atlantic Impact */
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_client_ai_staff',
		isGlobalResource: false,
		name: 'app_client_ai_staff',
		owner: 'sys_ai_old',
		nodes: ['node_obj_cm_course_list', 'node_obj_cm_partner_list', 'node_obj_cm_student_list']
	})

	/* MOED */
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_client_moed_advocate',
		isGlobalResource: false,
		name: 'app_client_moed_advocate',
		owner: 'sys_moed_old',
		nodes: ['node_obj_moed_part_list']
	})

	init.addTrans('sysApp', {
		appHeader: 'app_hdr_client_moed_student',
		isGlobalResource: false,
		name: 'app_client_moed_student',
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
			{ owner: 'sys_system_old', name: 'app_sys_admin_global' },
			{ owner: 'sys_system_old', name: 'app_sys_reporting' }
		]
	})

	/* CRM */
	init.addTrans('sysUserType', {
		header: 'CRM Admin',
		name: 'ut_app_crm_admin',
		owner: 'sys_app_crm',
		resources: [
			{ owner: 'sys_app_crm', name: 'app_app_crm' },
			{ owner: 'sys_system_old', name: 'app_sys_reporting' },
			{ owner: 'sys_app_crm', name: 'report_crm_client_detail' }
		]
	})

	/* Atlantic Impact */
	init.addTrans('sysUserType', {
		header: 'AI-Admin',
		name: 'ut_client_ai_admin',
		owner: 'sys_ai_old',
		resources: [
			{ owner: 'sys_system_old', name: 'app_sys_admin_user' },
			{ owner: 'sys_system_old', name: 'app_sys_reporting' }
		]
	})
	init.addTrans('sysUserType', {
		header: 'AI-Instructor',
		name: 'ut_client_ai_instructor',
		owner: 'sys_ai_old',
		tags: [{ codeType: 'ct_sys_user_type_tag_role', code: 'utt_role_ai_instructor' }]
	})
	init.addTrans('sysUserType', {
		header: 'AI-Staff',
		name: 'ut_client_ai_staff',
		owner: 'sys_ai_old',
		resources: [
			{ owner: 'sys_ai_old', name: 'app_client_ai_staff' },
			{ owner: 'sys_system_old', name: 'app_sys_reporting' },
			{ owner: 'sys_ai_old', name: 'report_ai_cohort_performance' },
			{ owner: 'sys_ai_old', name: 'report_ai_course_performance' },
			// { owner: 'sys_ai_old', name: 'report_ai_cohorts_detail' },
			// { owner: 'sys_ai_old', name: 'report_ai_courses_detail' },
			// {  owner: 'sys_ai_old', name: 'report_ai_partners_detail' },
			// {  owner: 'sys_ai_old', name: 'report_ai_student_attd_detail' },
			// {  owner: 'sys_ai_old', name: 'report_ai_student_docs_detail' },
			// {  owner: 'sys_ai_old', name: 'report_ai_student_notes_detail' },
			{ owner: 'sys_ai_old', name: 'report_ai_student_cohort_attd_summary' },
			{ owner: 'sys_ai_old', name: 'report_ai_student_job_placement_detail' },
			{
				owner: 'sys_ai_old',
				name: 'report_ai_student_school_placement_detail'
			},
			{ owner: 'sys_ai_old', name: 'report_ai_student_roster' }
			// { owner: 'sys_ai_old', name: 'report_ai_student_service_flow_summary' },
		]
	})

	/* MOED */
	init.addTrans('sysUserType', {
		attributes: [{ hasAccess: true, name: 'moedOfficeEastside', owner: 'sys_moed_old' }],
		header: 'MOED-Administrator',
		name: 'ut_client_moed_admin',
		owner: 'sys_moed_old',
		resources: [
			{ owner: 'sys_system_old', name: 'app_sys_admin_user' }
			// { owner: 'sys_system_old', name: 'app_sys_reporting' },
		]
	})

	init.addTrans('sysUserType', {
		attributes: [{ hasAccess: true, name: 'moedOfficeEastside', owner: 'sys_moed_old' }],
		header: 'MOED-Staff-Eastside',
		name: 'ut_client_moed_advocate_east',
		owner: 'sys_moed_old',
		resources: [
			{ owner: 'sys_moed_old', name: 'app_client_moed_advocate' },
			// { owner: 'sys_system_old', name: 'app_sys_reporting' },
			// { owner: 'sys_moed_old', name: 'report_moed_self_serv_student_status' },
			{ owner: 'sys_moed_old', name: 'task_moed_part_apps_open' },
			{ owner: 'sys_moed_old', name: 'task_moed_part_msgs_open' }
		],
		tags: [{ codeType: 'ct_sys_user_type_tag_role', code: 'utt_role_moed_staff' }]
	})
	init.addTrans('sysUserType', {
		attributes: [{ hasAccess: true, name: 'moedOfficeWestside', owner: 'sys_moed_old' }],
		header: 'MOED-Staff-Westside',
		name: 'ut_client_moed_advocate_west',
		owner: 'sys_moed_old',
		resources: [
			{ owner: 'sys_moed_old', name: 'app_client_moed_advocate' },
			// { owner: 'sys_system_old', name: 'app_sys_reporting' },
			// { owner: 'sys_moed_old', name: 'report_moed_self_serv_student_status' },
			{ owner: 'sys_moed_old', name: 'task_moed_part_apps_open' },
			{ owner: 'sys_moed_old', name: 'task_moed_part_msgs_open' }
		],
		tags: [{ codeType: 'ct_sys_user_type_tag_role', code: 'utt_role_moed_staff' }]
	})
	init.addTrans('sysUserType', {
		header: `Baltimore - Mayor's Office of Employment Development`,
		isSelfSignup: true,
		name: 'ut_client_moed_student',
		owner: 'sys_moed_old',
		resources: [
			{ owner: 'sys_moed_old', name: 'task_moed_ssr_app' },
			{ owner: 'sys_moed_old', name: 'task_moed_ssr_app_doc' },
			{ owner: 'sys_moed_old', name: 'task_moed_ssr_app_msg' },
			{ owner: 'sys_moed_old', name: 'task_moed_ssr_welcome' }
		]
	})
}

function initUsers(init: InitDb) {
	/* system */
	init.addTrans('sysUser', {
		defaultOrg: 'org_system',
		defaultSystem: 'sys_system_old',
		firstName: 'Root',
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
		lastName: 'System',
		orgs: ['org_ai', 'org_app_crm', 'org_client_app_factory', 'org_moed', 'org_system'],
		owner: 'org_system',
		systems: [
			'sys_ai_old',
			'sys_app_crm',
			'sys_client_app_factory',
			'sys_moed_old',
			'sys_system_old'
		],
		userName: 'user_sys',
		userTypes: [
			'ut_app_crm_admin',
			'ut_sys_admin_global',
			'ut_client_ai_admin',
			'ut_client_ai_staff',
			'ut_client_moed_advocate_east',
			'ut_client_moed_advocate_west',
			'ut_client_moed_student'
		]
	})

	/* App Factory */
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_app_factory',
		defaultSystem: 'sys_client_app_factory',
		firstName: 'Phyllip',
		lastName: 'Hall',
		orgs: ['org_ai', 'org_app_crm', 'org_client_app_factory', 'org_moed', 'org_system'],
		owner: 'org_client_app_factory',
		systems: ['sys_ai_old', 'sys_app_crm', 'sys_client_app_factory'],
		userName: '2487985578',
		userTypes: ['ut_client_moed_advocate_east']
	})

	/* Atlantic Impact */
	init.addTrans('sysUser', {
		defaultOrg: 'org_ai',
		defaultSystem: 'sys_ai_old',
		firstName: 'Anise',
		lastName: 'Hayes',
		orgs: ['org_ai'],
		owner: 'org_ai',
		systems: ['sys_ai_old'],
		userName: '2482317505',
		userTypes: ['ut_client_ai_staff']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_ai',
		defaultSystem: 'sys_ai_old',
		firstName: 'Erica',
		lastName: 'Hicks',
		orgs: ['org_ai'],
		owner: 'org_ai',
		systems: ['sys_ai_old'],
		userName: '3136272756',
		userTypes: ['ut_client_ai_staff']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_ai',
		defaultSystem: 'sys_ai_old',
		firstName: 'Matthew',
		lastName: 'Clayton',
		orgs: ['org_ai'],
		owner: 'org_ai',
		systems: ['sys_ai_old'],
		userName: '3136276210',
		userTypes: ['ut_client_ai_admin', 'ut_client_ai_staff']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_ai',
		defaultSystem: 'sys_ai_old',
		firstName: 'Nino',
		lastName: 'Tanzini',
		orgs: ['org_ai'],
		owner: 'org_ai',
		systems: ['sys_ai_old'],
		userName: 'ntanzini',
		userTypes: ['ut_client_ai_instructor']
	})

	/* MOED - admin*/
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Test',
		lastName: 'user1',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '2222222222',
		userTypes: [
			'ut_client_moed_admin',
			'ut_client_moed_advocate_east',
			'ut_client_moed_advocate_west'
		]
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Evelyn',
		lastName: 'Nicholson',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '4432962824',
		userTypes: [
			'ut_client_moed_admin',
			'ut_client_moed_advocate_east',
			'ut_client_moed_advocate_west'
		]
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Jon',
		lastName: 'Smeton',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '4439660748',
		userTypes: [
			'ut_client_moed_admin',
			'ut_client_moed_advocate_east',
			'ut_client_moed_advocate_west'
		]
	})

	/* MOED - eastside*/
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Troy',
		lastName: 'Bryant',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '4432264888',
		userTypes: ['ut_client_moed_advocate_east']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Candyce',
		lastName: 'Davis-Hill',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '4436210149',
		userTypes: ['ut_client_moed_advocate_east']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Larry',
		lastName: 'Franklin',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '4434680244',
		userTypes: ['ut_client_moed_advocate_east']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Flory',
		lastName: 'Gessner',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '3195738122',
		userTypes: ['ut_client_moed_advocate_east']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Ariel',
		lastName: 'Liddell',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '4108442002',
		userTypes: ['ut_client_moed_advocate_east']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Maya',
		lastName: 'Maddison',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '4433269335',
		userTypes: ['ut_client_moed_advocate_east']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Robin',
		lastName: 'Thomas',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '4109844181',
		userTypes: ['ut_client_moed_advocate_east']
	})

	/* MOED - westside*/
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Cortez',
		lastName: 'Cannon',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '4433884488',
		userTypes: ['ut_client_moed_advocate_west']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Marissa',
		lastName: 'Epps',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '5164249129',
		userTypes: ['ut_client_moed_advocate_west']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'CieAndre',
		lastName: 'Frink',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '4433551246',
		userTypes: ['ut_client_moed_advocate_west']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Raquel',
		lastName: 'Jones',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '4432860129',
		userTypes: ['ut_client_moed_advocate_west']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Jeffrey',
		lastName: 'LeSane',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '4433144565',
		userTypes: ['ut_client_moed_advocate_west']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Tyshell',
		lastName: 'Oliver',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '4439867910',
		userTypes: ['ut_client_moed_advocate_west']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Lori',
		lastName: 'Rawlins',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '4437574367',
		userTypes: ['ut_client_moed_advocate_west']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Chauncey',
		lastName: 'Roman',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '4439328798',
		userTypes: ['ut_client_moed_advocate_west']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Justin',
		lastName: 'Sanders',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '4434215994',
		userTypes: ['ut_client_moed_advocate_west']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Tavon',
		lastName: 'Thomas',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '4432862871',
		userTypes: ['ut_client_moed_advocate_west']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_moed',
		defaultSystem: 'sys_moed_old',
		firstName: 'Candace',
		lastName: 'Washington',
		orgs: ['org_moed'],
		owner: 'org_moed',
		systems: ['sys_moed_old'],
		userName: '4438017583',
		userTypes: ['ut_client_moed_advocate_west']
	})
}
