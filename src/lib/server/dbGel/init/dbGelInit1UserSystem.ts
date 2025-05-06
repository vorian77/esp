import { InitDb } from '$server/dbGel/init/types.init'

export function initUserSystem(init: InitDb) {
	initAppHeaders(init)
	initApps(init)
	initUserType(init)
	initUsers(init)
}

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
			'node_obj_sys_admin_system_list_meta',
			'node_obj_sys_admin_tool_error_list'
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
			'ut_client_ai_staff',
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
}
