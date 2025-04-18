import { InitDb } from '$server/dbGel/init/types.init'

export function initUser(init: InitDb) {
	initResources(init)
	initAppHeaders(init)
	initApps(init)
	initUserType(init)
	initUsers(init)
}

function initResources(init: InitDb) {}

function initAppHeaders(init: InitDb) {
	/* system */
	init.addTrans('sysAppHeader', {
		codeIcon: 'ShieldEllipsis',
		header: 'Administration',
		isGlobalResource: true,
		name: 'app_hdr_sys_admin',
		orderDefine: 0,
		owner: 'sys_system'
	})
	init.addTrans('sysAppHeader', {
		codeIcon: 'database',
		header: 'Reporting',
		isGlobalResource: true,
		name: 'app_hdr_sys_reporting',
		orderDefine: 10000,
		owner: 'sys_system'
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
		owner: 'sys_client_atlantic_impact'
	})

	/* client - MOED */
	init.addTrans('sysAppHeader', {
		codeIcon: 'UsersRound',
		header: 'MOED-Staff',
		isGlobalResource: false,
		name: 'app_hdr_client_moed_advocate',
		orderDefine: 2000,
		owner: 'sys_client_moed'
	})
	init.addTrans('sysAppHeader', {
		codeIcon: 'UserRoundCog',
		header: 'MOED-Student',
		isGlobalResource: false,
		name: 'app_hdr_client_moed_student',
		orderDefine: 2010,
		owner: 'sys_client_moed'
	})
}

function initApps(init: InitDb) {
	/* system */
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_sys_admin',
		isGlobalResource: false,
		name: 'app_sys_admin_global',
		owner: 'sys_system',
		nodes: [
			'node_obj_sys_admin_org_list',
			'node_obj_sys_admin_system_list_config',
			'node_obj_sys_admin_system_list_obj',
			'node_obj_sys_admin_system_list_meta'
		]
	})
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_sys_admin',
		isGlobalResource: true,
		name: 'app_sys_admin_user',
		owner: 'sys_system',
		nodes: ['node_obj_sys_admin_system_list_meta']
	})
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_sys_reporting',
		isGlobalResource: true,
		name: 'app_sys_reporting',
		owner: 'sys_system',
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
		owner: 'sys_client_atlantic_impact',
		nodes: ['node_obj_cm_course_list', 'node_obj_cm_partner_list', 'node_obj_cm_student_list']
	})

	/* MOED */
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_client_moed_advocate',
		isGlobalResource: false,
		name: 'app_client_moed_advocate',
		owner: 'sys_client_moed',
		nodes: ['node_obj_moed_part_list']
	})

	init.addTrans('sysApp', {
		appHeader: 'app_hdr_client_moed_student',
		isGlobalResource: false,
		name: 'app_client_moed_student',
		owner: 'sys_client_moed',
		nodes: ['node_obj_moed_part_list']
	})
}

function initUserType(init: InitDb) {
	/* system */
	init.addTrans('sysUserType', {
		header: 'Admin - Global',
		name: 'ut_sys_admin_global',
		owner: 'sys_system',
		resources: [
			{ owner: 'sys_system', name: 'app_sys_admin_global' },
			{ owner: 'sys_system', name: 'task_sys_msg_all' },
			// { owner: 'sys_system', name: 'task_sys_quote' },
			{ owner: 'sys_system', name: 'app_sys_reporting' }
			// { owner: 'sys_client_atlantic_impact', name: 'task_ai_cohort_attd' },
			// { owner: 'sys_client_atlantic_impact', name: 'task_ai_new_student' }
		]
	})

	/* CRM */
	init.addTrans('sysUserType', {
		header: 'CRM Admin',
		name: 'ut_app_crm_admin',
		owner: 'sys_app_crm',
		resources: [
			{ owner: 'sys_app_crm', name: 'app_app_crm' },
			{ owner: 'sys_system', name: 'app_sys_reporting' },
			{ owner: 'sys_app_crm', name: 'report_crm_client_detail' }
		]
	})

	/* Atlantic Impact */
	init.addTrans('sysUserType', {
		header: 'AI-Admin',
		name: 'ut_client_ai_admin',
		owner: 'sys_client_atlantic_impact',
		resources: [
			// { owner: 'sys_system', name: 'app_sys_admin_user' },
			{ owner: 'sys_system', name: 'app_sys_reporting' }
			// { owner: 'sys_system', name: 'task_sys_quote' }
		]
	})
	init.addTrans('sysUserType', {
		header: 'AI-Instructor',
		name: 'ut_client_ai_instructor',
		owner: 'sys_client_atlantic_impact',
		tags: [{ codeType: 'ct_sys_user_type_tag_role', code: 'utt_role_ai_instructor' }]
	})
	init.addTrans('sysUserType', {
		header: 'AI-Staff',
		name: 'ut_client_ai_staff',
		owner: 'sys_client_atlantic_impact',
		resources: [
			{ owner: 'sys_system', name: 'app_sys_reporting' },
			{ owner: 'sys_client_atlantic_impact', name: 'app_client_ai_staff' },
			{ owner: 'sys_client_atlantic_impact', name: 'report_ai_cohort_performance' },
			{ owner: 'sys_client_atlantic_impact', name: 'report_ai_course_performance' },
			// { owner: 'sys_client_atlantic_impact', name: 'report_ai_cohorts_detail' },
			// { owner: 'sys_client_atlantic_impact', name: 'report_ai_courses_detail' },
			// {  owner: 'sys_client_atlantic_impact', name: 'report_ai_partners_detail' },
			// {  owner: 'sys_client_atlantic_impact', name: 'report_ai_student_attd_detail' },
			// {  owner: 'sys_client_atlantic_impact', name: 'report_ai_student_docs_detail' },
			// {  owner: 'sys_client_atlantic_impact', name: 'report_ai_student_notes_detail' },
			{ owner: 'sys_client_atlantic_impact', name: 'report_ai_student_cohort_attd_summary' },
			{ owner: 'sys_client_atlantic_impact', name: 'report_ai_student_job_placement_detail' },
			{
				owner: 'sys_client_atlantic_impact',
				name: 'report_ai_student_school_placement_detail'
			},
			{ owner: 'sys_client_atlantic_impact', name: 'report_ai_student_roster' }
			// { owner: 'sys_client_atlantic_impact', name: 'report_ai_student_service_flow_summary' },
			// { owner: 'sys_client_atlantic_impact', name: 'task_ai_cohort_attd' }
			// { owner: 'sys_client_atlantic_impact', name: 'task_ai_new_student' }
		]
	})

	/* MOED */
	init.addTrans('sysUserType', {
		header: 'MOED-Administrator',
		name: 'ut_client_moed_admin',
		owner: 'sys_client_moed',
		resources: [
			{ owner: 'sys_system', name: 'app_sys_admin_user' }
			// { owner: 'sys_system', name: 'task_sys_quote' }
			// { owner: 'sys_system', name: 'app_sys_reporting' },
		]
	})
	init.addTrans('sysUserType', {
		attrs: [
			{ codeAttrType: 'at_sys_msg_receive', name: 'moedStaffEastside', owner: 'sys_client_moed' },
			{ codeAttrType: 'at_sys_msg_send', name: 'moedYouthEastside', owner: 'sys_client_moed' }
		],
		header: 'MOED-Staff-Eastside',
		name: 'ut_client_moed_advocate_east',
		owner: 'sys_client_moed',
		resources: [
			{ owner: 'sys_client_moed', name: 'app_client_moed_advocate' },
			// { owner: 'sys_system', name: 'app_sys_reporting' },
			// { owner: 'sys_client_moed', name: 'report_moed_self_serv_student_status' },
			{ owner: 'sys_client_moed', name: 'task_moed_part_apps_open' },
			{ owner: 'sys_system', name: 'task_sys_msg_all' },
			{ owner: 'sys_system', name: 'task_sys_msg_open' }
		],
		tags: [{ codeType: 'ct_sys_user_type_tag_role', code: 'utt_role_moed_staff' }]
	})
	init.addTrans('sysUserType', {
		attrs: [
			{ codeAttrType: 'at_sys_msg_receive', name: 'moedStaffWestside', owner: 'sys_client_moed' },
			{ codeAttrType: 'at_sys_msg_send', name: 'moedYouthWestside', owner: 'sys_client_moed' }
		],
		header: 'MOED-Staff-Westside',
		name: 'ut_client_moed_advocate_west',
		owner: 'sys_client_moed',
		resources: [
			{ owner: 'sys_client_moed', name: 'app_client_moed_advocate' },
			// { owner: 'sys_system', name: 'app_sys_reporting' },
			// { owner: 'sys_client_moed', name: 'report_moed_self_serv_student_status' },
			{ owner: 'sys_client_moed', name: 'task_moed_part_apps_open' },
			{ owner: 'sys_system', name: 'task_sys_msg_all' },
			{ owner: 'sys_system', name: 'task_sys_msg_open' }
		],
		tags: [{ codeType: 'ct_sys_user_type_tag_role', code: 'utt_role_moed_staff' }]
	})
	init.addTrans('sysUserType', {
		header: `Baltimore - Mayor's Office of Employment Development`,
		isSelfSignup: true,
		name: 'ut_client_moed_youth',
		owner: 'sys_client_moed',
		resources: [
			{ owner: 'sys_client_moed', name: 'task_moed_ssr_app' },
			{ owner: 'sys_client_moed', name: 'task_moed_ssr_app_doc' },
			{ owner: 'sys_client_moed', name: 'task_moed_ssr_welcome' },
			// { owner: 'sys_system', name: 'task_sys_msg_all' }
			{ owner: 'sys_client_moed', name: 'task_moed_ssr_app_msg' }
		]
	})
}

function initUsers(init: InitDb) {
	/* system */
	init.addTrans('sysUser', {
		defaultOrg: 'org_system',
		defaultSystem: 'sys_system',
		firstName: 'Root',
		isActive: true,
		lastName: 'User',
		orgs: ['org_system'],
		owner: 'org_system',
		systems: ['sys_app_cm', 'sys_app_crm', 'sys_system'],
		userName: '*ROOTUSER*',
		userTypes: []
	})

	init.addTrans('sysUser', {
		defaultOrg: 'org_system',
		defaultSystem: 'sys_system',
		firstName: 'User',
		isActive: true,
		lastName: 'System',
		orgs: [
			'org_client_atlantic_impact',
			'org_apps',
			'org_client_app_factory',
			'org_client_moed',
			'org_system'
		],
		owner: 'org_system',
		systems: [
			'sys_client_atlantic_impact',
			'sys_app_crm',
			'sys_client_app_factory',
			'sys_client_moed',
			'sys_system'
		],
		userName: 'user_sys',
		userTypes: [
			'ut_app_crm_admin',
			'ut_sys_admin_global',
			// 'ut_client_ai_admin',
			// 'ut_client_ai_staff',
			'ut_client_moed_advocate_east',
			'ut_client_moed_advocate_west',
			'ut_client_moed_youth'
		]
	})

	/* App Factory */
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_app_factory',
		defaultSystem: 'sys_client_app_factory',
		firstName: 'Phyllip',
		isActive: true,
		lastName: 'Hall',
		orgs: ['org_client_moed', 'org_system'],
		owner: 'org_client_app_factory',
		systems: ['sys_client_atlantic_impact'],
		userName: '2487985578',
		userTypes: [
			'ut_client_moed_admin',
			'ut_client_moed_advocate_east',
			'ut_client_moed_advocate_west'
		]
	})

	/* Atlantic Impact */
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_atlantic_impact',
		defaultSystem: 'sys_client_atlantic_impact',
		firstName: 'Anise',
		isActive: false,
		lastName: 'Hayes',
		orgs: ['org_client_atlantic_impact'],
		owner: 'org_client_atlantic_impact',
		systems: ['sys_client_atlantic_impact'],
		userName: '2482317505',
		userTypes: ['ut_client_ai_staff']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_atlantic_impact',
		defaultSystem: 'sys_client_atlantic_impact',
		firstName: 'Erica',
		isActive: false,
		lastName: 'Hicks',
		orgs: ['org_client_atlantic_impact'],
		owner: 'org_client_atlantic_impact',
		systems: ['sys_client_atlantic_impact'],
		userName: '3136272756',
		userTypes: ['ut_client_ai_staff']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_atlantic_impact',
		defaultSystem: 'sys_client_atlantic_impact',
		firstName: 'Matthew',
		isActive: false,
		lastName: 'Clayton',
		orgs: ['org_client_atlantic_impact'],
		owner: 'org_client_atlantic_impact',
		systems: ['sys_client_atlantic_impact'],
		userName: '3136276210',
		userTypes: ['ut_client_ai_admin', 'ut_client_ai_staff']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_atlantic_impact',
		defaultSystem: 'sys_client_atlantic_impact',
		firstName: 'Nino',
		isActive: false,
		lastName: 'Tanzini',
		orgs: ['org_client_atlantic_impact'],
		owner: 'org_client_atlantic_impact',
		systems: ['sys_client_atlantic_impact'],
		userName: 'ntanzini',
		userTypes: ['ut_client_ai_instructor']
	})

	/* MOED - admin*/
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Test',
		isActive: true,
		lastName: 'user1',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '2222222222',
		userTypes: [
			'ut_client_moed_admin',
			'ut_client_moed_advocate_east',
			'ut_client_moed_advocate_west',
			'ut_client_moed_youth'
		]
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Evelyn',
		isActive: true,
		lastName: 'Nicholson',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '4432962824',
		userTypes: [
			'ut_client_moed_admin',
			'ut_client_moed_advocate_east',
			'ut_client_moed_advocate_west'
		]
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Jon',
		isActive: true,
		lastName: 'Smeton',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '4439660748',
		userTypes: [
			'ut_client_moed_admin',
			'ut_client_moed_advocate_east',
			'ut_client_moed_advocate_west'
		]
	})

	/* MOED - eastside*/
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Troy',
		isActive: true,
		lastName: 'Bryant',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '4432264888',
		userTypes: ['ut_client_moed_advocate_east']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Candyce',
		isActive: true,
		lastName: 'Davis-Hill',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '4436210149',
		userTypes: ['ut_client_moed_advocate_east']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Larry',
		isActive: true,
		lastName: 'Franklin',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '4434680244',
		userTypes: ['ut_client_moed_advocate_east']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Flory',
		isActive: true,
		lastName: 'Gessner',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '3195738122',
		userTypes: ['ut_client_moed_advocate_east']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Ariel',
		isActive: true,
		lastName: 'Liddell',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '4108442002',
		userTypes: ['ut_client_moed_advocate_east']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Maya',
		isActive: true,
		lastName: 'Maddison',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '4433269335',
		userTypes: ['ut_client_moed_advocate_east']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Robin',
		isActive: true,
		lastName: 'Thomas',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '4109844181',
		userTypes: ['ut_client_moed_advocate_east']
	})

	/* MOED - westside*/
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Cortez',
		isActive: true,
		lastName: 'Cannon',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '4433884488',
		userTypes: ['ut_client_moed_advocate_west']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Marissa',
		isActive: true,
		lastName: 'Epps',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '5164249129',
		userTypes: ['ut_client_moed_advocate_west']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'CieAndre',
		isActive: true,
		lastName: 'Frink',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '4433551246',
		userTypes: ['ut_client_moed_advocate_west']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Raquel',
		isActive: true,
		lastName: 'Jones',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '4432860129',
		userTypes: ['ut_client_moed_advocate_west']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Jeffrey',
		isActive: true,
		lastName: 'LeSane',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '4433144565',
		userTypes: ['ut_client_moed_advocate_west']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Tyshell',
		isActive: true,
		lastName: 'Oliver',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '4439867910',
		userTypes: ['ut_client_moed_advocate_west']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Lori',
		isActive: true,
		lastName: 'Rawlins',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '4437574367',
		userTypes: ['ut_client_moed_advocate_west']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Chauncey',
		isActive: true,
		lastName: 'Roman',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '4439328798',
		userTypes: ['ut_client_moed_advocate_west']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Justin',
		isActive: true,
		lastName: 'Sanders',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '4434215994',
		userTypes: ['ut_client_moed_advocate_west']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Tavon',
		isActive: true,
		lastName: 'Thomas',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '4432862871',
		userTypes: ['ut_client_moed_advocate_west']
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Candace',
		isActive: true,
		lastName: 'Washington',
		orgs: ['org_client_moed'],
		owner: 'org_client_moed',
		systems: ['sys_client_moed'],
		userName: '4438017583',
		userTypes: ['ut_client_moed_advocate_west']
	})
}
