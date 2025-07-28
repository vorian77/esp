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
		ownerSys: 'sys_system'
	})
	init.addTrans('sysAppHeader', {
		codeIcon: 'database',
		header: 'Reporting',
		isGlobalResource: true,
		name: 'app_hdr_sys_reporting',
		orderDefine: 10000,
		ownerSys: 'sys_system'
	})

	/* app - CRM */
	init.addTrans('sysAppHeader', {
		codeIcon: 'UsersRound',
		header: 'CRM',
		isGlobalResource: true,
		name: 'app_hdr_app_crm',
		orderDefine: 30,
		ownerSys: 'sys_app_crm'
	})
}

function initApps(init: InitDb) {
	/* system */
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_sys_admin',
		isGlobalResource: false,
		name: 'app_sys_admin_global',
		ownerSys: 'sys_system',
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
		ownerSys: 'sys_system',
		nodes: ['node_obj_admin_org_list_customer']
	})
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_sys_reporting',
		isGlobalResource: true,
		name: 'app_sys_reporting',
		ownerSys: 'sys_system',
		nodes: ['node_obj_sys_rep_my_report_list']
	})

	/* CRM */
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_app_crm',
		isGlobalResource: false,
		name: 'app_app_crm',
		ownerSys: 'sys_app_crm',
		nodes: ['node_obj_app_crm_client_list']
	})
}

function initUserType(init: InitDb) {
	/* system */
	init.addTrans('sysUserType', {
		attrsAccess: [
			{ access: 'allow', ownerSys: 'sys_system', name: 'app_sys_admin_global' },
			{ access: 'allow', ownerSys: 'sys_system', name: 'app_sys_reporting' },
			{ access: 'allow', ownerSys: 'sys_system', name: 'task_sys_msg_all' },
			{ access: 'allow', ownerSys: 'sys_system', name: 'task_sys_msg_unread' },
			{ access: 'allow', ownerSys: 'sys_system', name: 'task_sys_quote' }
		],
		header: 'Admin - Global',
		name: 'ut_sys_admin_global',
		ownerOrg: 'org_system'
	})

	/* CRM */
	init.addTrans('sysUserType', {
		attrsAccess: [
			{ access: 'allow', ownerSys: 'sys_app_crm', name: 'app_app_crm' },
			{ access: 'allow', ownerSys: 'sys_app_crm', name: 'report_crm_client_detail' },
			{ access: 'allow', ownerSys: 'sys_system', name: 'app_sys_reporting' }
		],
		header: 'CRM Admin',
		name: 'ut_app_crm_admin',
		ownerOrg: 'org_apps'
	})
}

function initUsers(init: InitDb) {
	/* system */
	init.addTrans('sysUser', {
		firstName: 'Root',
		isActive: true,
		lastName: 'User',
		name: '*ROOTUSER*',
		ownerOrg: 'org_system',
		systemDefault: 'sys_system',
		systems: ['sys_app_cm', 'sys_app_crm', 'sys_system'],
		userTypes: []
	})

	init.addTrans('sysUser', {
		firstName: 'User',
		isActive: true,
		lastName: 'System',
		name: 'user_sys',
		ownerOrg: 'org_system',
		systemDefault: 'sys_system',
		systems: [
			'sys_client_atlantic_impact',
			'sys_app_crm',
			'sys_client_app_factory',
			'sys_client_baltimore_moed',
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
		firstName: 'Phyllip',
		isActive: true,
		lastName: 'Hall',
		name: '2487985578',
		ownerOrg: 'org_client_app_factory',
		systemDefault: 'sys_client_baltimore_moed',
		systems: [
			'sys_client_atlantic_impact',
			'sys_client_app_factory',
			'sys_client_baltimore_moed',
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
