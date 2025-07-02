import { InitDb } from '$server/dbGel/init/types.init'

export function initUserSystem(init: InitDb) {
	initObjAttr(init)
	initAppHeaders(init)
	initApps(init)
	initUserType(init)
	initUsers(init)
}

function initObjAttr(init: InitDb) {}

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
			'node_obj_admin_org_list_global',
			'node_obj_admin_system_list_build',
			'node_obj_sys_admin_tool_error_list'
		]
	})
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_sys_admin',
		isGlobalResource: true,
		name: 'app_sys_admin_customer',
		owner: 'sys_system',
		nodes: ['node_obj_admin_org_list_customer']
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
		attrsAccess: [
			{ access: 'allow', owner: 'sys_system', name: 'app_sys_admin_global' },
			{ access: 'allow', owner: 'sys_system', name: 'app_sys_reporting' },
			{ access: 'allow', owner: 'sys_system', name: 'task_sys_msg_all' },
			{ access: 'allow', owner: 'sys_system', name: 'task_sys_msg_unread' },
			{ access: 'allow', owner: 'sys_system', name: 'task_sys_quote' }
		],
		header: 'Admin - Global',
		name: 'ut_sys_admin_global',
		owner: 'org_system'
	})

	/* CRM */
	init.addTrans('sysUserType', {
		attrsAccess: [
			{ access: 'allow', owner: 'sys_app_crm', name: 'app_app_crm' },
			{ access: 'allow', owner: 'sys_app_crm', name: 'report_crm_client_detail' },
			{ access: 'allow', owner: 'sys_system', name: 'app_sys_reporting' }
		],
		header: 'CRM Admin',
		name: 'ut_app_crm_admin',
		owner: 'org_apps'
	})
}

function initUsers(init: InitDb) {
	/* system */
	init.addTrans('sysUser', {
		defaultSystem: 'sys_system',
		firstName: 'Root',
		isActive: true,
		lastName: 'User',
		name: '*ROOTUSER*',
		owner: 'org_system',
		systems: ['sys_app_cm', 'sys_app_crm', 'sys_system'],
		userTypes: []
	})

	init.addTrans('sysUser', {
		defaultSystem: 'sys_system',
		firstName: 'User',
		isActive: true,
		lastName: 'System',
		name: 'user_sys',
		owner: 'org_system',
		systems: [
			'sys_client_atlantic_impact',
			'sys_app_crm',
			'sys_client_app_factory',
			'sys_client_moed',
			'sys_system'
		],
		userTypes: [
			'ut_app_crm_admin',
			'ut_client_ai_admin',
			'ut_client_ai_staff',
			'ut_client_baltimore_moed_admin',
			'ut_client_baltimore_moed_advocate_east',
			'ut_client_baltimore_moed_advocate_west',
			'ut_client_baltimore_moed_youth',
			'ut_sys_admin_global'
		]
	})

	/* App Factory */
	init.addTrans('sysUser', {
		defaultSystem: 'sys_client_moed',
		firstName: 'Phyllip',
		isActive: true,
		lastName: 'Hall',
		name: '2487985578',
		owner: 'org_client_app_factory',
		systems: [
			'sys_client_atlantic_impact',
			'sys_client_app_factory',
			'sys_client_moed',
			'sys_system'
		],
		userTypes: [
			// 'ut_app_crm_admin',
			// 'ut_client_ai_admin',
			'ut_client_ai_staff',
			'ut_client_baltimore_moed_admin',
			'ut_client_baltimore_moed_advocate_east',
			'ut_client_baltimore_moed_advocate_west',
			'ut_client_baltimore_moed_youth',
			'ut_sys_admin_global'
		]
	})
}
