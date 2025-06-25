import { InitDb } from '$server/dbGel/init/types.init'

export function initUserMOED(init: InitDb) {
	initConfigNodes(init)
	initObjAttr(init)
	initAppHeaders(init)
	initApps(init)
	initUserType(init)
	initUsers(init)
}

function initConfigNodes(init: InitDb) {
	init.addTrans('updateSystemNodesConfig', {
		name: 'sys_client_moed',
		nodesConfig: [
			{ codeAttrType: 'at_cm_site', node: 'node_obj_sys_admin_attr_obj_list' },
			{ codeAttrType: 'at_sys_code', node: 'node_obj_sys_admin_code_list_meta' },
			{ codeAttrType: 'at_sys_msg_group', node: 'node_obj_sys_admin_attr_obj_list' },
			{ codeAttrType: 'at_sys_user', node: 'node_obj_sys_admin_user_list_meta' },
			{ codeAttrType: 'at_sys_user_type', node: 'node_obj_sys_admin_user_type_list' }
		]
	})
}

function initObjAttr(init: InitDb) {
	init.addTrans('sysObjAttr', {
		code: 'at_cm_site',
		header: 'Eastside Office',
		name: 'site_moed_office_east',
		owner: 'sys_client_moed'
	})
	init.addTrans('sysObjAttr', {
		code: 'at_cm_site',
		header: 'Westside Office',
		name: 'site_moed_office_west',
		owner: 'sys_client_moed'
	})
	init.addTrans('sysObjAttr', {
		code: 'at_sys_msg_group',
		header: 'MOED Administrators',
		name: 'group_msg_moed_admin',
		owner: 'sys_client_moed'
	})
	init.addTrans('sysObjAttr', {
		code: 'at_sys_msg_group',
		header: 'Eastside Staff',
		name: 'group_msg_moed_staff_east',
		owner: 'sys_client_moed'
	})
	init.addTrans('sysObjAttr', {
		code: 'at_sys_msg_group',
		header: 'Westside Staff',
		name: 'group_msg_moed_staff_west',
		owner: 'sys_client_moed'
	})
	init.addTrans('sysObjAttr', {
		code: 'at_sys_msg_group',
		header: 'Eastside Youth Applicants',
		name: 'group_msg_moed_youth_applicants_east',
		owner: 'sys_client_moed'
	})
	init.addTrans('sysObjAttr', {
		code: 'at_sys_msg_group',
		header: 'Westside Youth Applicants',
		name: 'group_msg_moed_youth_applicants_west',
		owner: 'sys_client_moed'
	})
}

function initAppHeaders(init: InitDb) {
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
	/* MOED */
	init.addTrans('sysUserType', {
		attrsAccess: [
			{ access: 'allow', owner: 'sys_system', name: 'app_sys_admin_user' },
			{ access: 'allow', owner: 'sys_system', name: 'app_sys_reporting' },
			{ access: 'allow', owner: 'sys_system', name: 'task_sys_msg_all' },
			{ access: 'allow', owner: 'sys_system', name: 'task_sys_quote' }
		],
		attrsAction: [
			{
				action: 'oaa_sys_msg_receive',
				owner: 'sys_client_moed',
				name: 'group_msg_moed_admin'
			},
			{
				action: 'oaa_sys_msg_send',
				owner: 'sys_client_moed',
				name: 'group_msg_moed_admin'
			}
		],
		header: 'MOED-Administrator',
		name: 'ut_client_moed_admin',
		owner: 'sys_client_moed'
	})
	init.addTrans('sysUserType', {
		attrsAccess: [
			{ access: 'allow', owner: 'sys_client_moed', name: 'app_client_moed_advocate' },
			// { access: 'allow', owner: 'sys_client_moed', name: 'report_moed_self_serv_student_status' },
			{ access: 'allow', owner: 'sys_client_moed', name: 'task_moed_part_apps_open' },
			// { access: 'allow', owner: 'sys_system', name: 'app_sys_reporting' },
			{ access: 'allow', owner: 'sys_system', name: 'task_sys_msg_all' },
			{ access: 'allow', owner: 'sys_system', name: 'task_sys_msg_unread' }
		],
		attrsAction: [
			{
				action: 'oaa_sys_msg_receive',
				owner: 'sys_client_moed',
				name: 'group_msg_moed_staff_east'
			},
			{
				action: 'oaa_sys_msg_send',
				owner: 'sys_client_moed',
				name: 'group_msg_moed_youth_applicants_east'
			}
		],
		attrsExpr: [
			{
				action: 'oaa_sys_msg_send',
				expr: `SELECT (SELECT sys_user::SysUser FILTER .person IN (SELECT app_cm::CmClientServiceFlow FILTER .objAttrCmSite.name = 'site_moed_office_east').client.person).id`
			}
		],
		header: 'MOED-Staff-Eastside',
		name: 'ut_client_moed_advocate_east',
		owner: 'sys_client_moed'
	})
	init.addTrans('sysUserType', {
		attrsAccess: [
			{ access: 'allow', owner: 'sys_client_moed', name: 'app_client_moed_advocate' },
			// { access: 'allow', owner: 'sys_client_moed', name: 'report_moed_self_serv_student_status' },
			{ access: 'allow', owner: 'sys_client_moed', name: 'task_moed_part_apps_open' },
			// { access: 'allow', owner: 'sys_system', name: 'app_sys_reporting' },
			{ access: 'allow', owner: 'sys_system', name: 'task_sys_msg_all' },
			{ access: 'allow', owner: 'sys_system', name: 'task_sys_msg_unread' }
		],
		attrsAction: [
			{
				action: 'oaa_sys_msg_receive',
				owner: 'sys_client_moed',
				name: 'group_msg_moed_staff_west'
			},
			{
				action: 'oaa_sys_msg_send',
				owner: 'sys_client_moed',
				name: 'group_msg_moed_youth_applicants_west'
			}
		],
		attrsExpr: [
			{
				action: 'oaa_sys_msg_send',
				expr: `SELECT (SELECT sys_user::SysUser FILTER .person IN (SELECT app_cm::CmClientServiceFlow FILTER .objAttrCmSite.name = 'site_moed_office_west').client.person).id`
			}
		],
		header: 'MOED-Staff-Westside',
		name: 'ut_client_moed_advocate_west',
		owner: 'sys_client_moed'
	})
	init.addTrans('sysUserType', {
		attrsAccess: [
			{ access: 'allow', owner: 'sys_client_moed', name: 'task_moed_ssr_app' },
			{ access: 'allow', owner: 'sys_client_moed', name: 'task_moed_ssr_app_doc' },
			{ access: 'allow', owner: 'sys_client_moed', name: 'task_moed_ssr_welcome' },
			{ access: 'allow', owner: 'sys_system', name: 'task_sys_msg_all' },
			{ access: 'allow', owner: 'sys_system', name: 'task_sys_msg_unread' }
		],
		attrsVirtual: [
			{
				expr: `SELECT (SELECT app_cm::CmClientServiceFlow FILTER .client.person.id = <user,uuid,personId>).objAttrCmSite.name = 'site_moed_office_east'`,
				attrsAction: [
					{
						action: 'oaa_sys_msg_receive',
						owner: 'sys_client_moed',
						name: 'group_msg_moed_youth_applicants_east'
					},
					{
						action: 'oaa_sys_msg_send',
						owner: 'sys_client_moed',
						name: 'group_msg_moed_staff_east'
					}
				]
			},
			{
				expr: `SELECT (SELECT app_cm::CmClientServiceFlow FILTER .client.person.id = <user,uuid,personId>).objAttrCmSite.name = 'site_moed_office_west'`,
				attrsAction: [
					{
						action: 'oaa_sys_msg_receive',
						owner: 'sys_client_moed',
						name: 'group_msg_moed_youth_applicants_west'
					},
					{
						action: 'oaa_sys_msg_send',
						owner: 'sys_client_moed',
						name: 'group_msg_moed_staff_west'
					}
				]
			}
		],
		header: `Baltimore - Mayor's Office of Employment Development`,
		isSelfSignup: true,
		name: 'ut_client_moed_youth',
		owner: 'sys_client_moed'
	})
}

function initUsers(init: InitDb) {
	/* MOED - admin*/
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Test',
		isActive: true,
		lastName: 'user1',
		name: '2222222222',
		orgs: ['org_client_moed'],
		owner: 'sys_client_moed',
		systems: ['sys_client_moed'],
		userTypes: [
			// 'ut_client_moed_admin',
			'ut_client_moed_advocate_east',
			'ut_client_moed_advocate_west'
			// 'ut_client_moed_youth'
		]
	})
	init.addTrans('sysUser', {
		defaultOrg: 'org_client_moed',
		defaultSystem: 'sys_client_moed',
		firstName: 'Evelyn',
		isActive: true,
		lastName: 'Nicholson',
		name: '4432962824',
		orgs: ['org_client_moed'],
		owner: 'sys_client_moed',
		systems: ['sys_client_moed'],
		userTypes: [
			// 'ut_client_moed_admin',
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
		name: '4439660748',
		orgs: ['org_client_moed'],
		owner: 'sys_client_moed',
		systems: ['sys_client_moed'],
		userTypes: [
			// 'ut_client_moed_admin',
			'ut_client_moed_advocate_east',
			'ut_client_moed_advocate_west'
		]
	})

	/* MOED - eastside*/
	// init.addTrans('sysUser', {
	// 	defaultOrg: 'org_client_moed',
	// 	defaultSystem: 'sys_client_moed',
	// 	firstName: 'Troy',
	// 	isActive: true,
	// 	lastName: 'Bryant',
	// 	name: '4432264888',
	// 	orgs: ['org_client_moed'],
	// 	owner: 'sys_client_moed',
	// 	systems: ['sys_client_moed'],
	// 	userTypes: ['ut_client_moed_advocate_east']
	// })
	// init.addTrans('sysUser', {
	// 	defaultOrg: 'org_client_moed',
	// 	defaultSystem: 'sys_client_moed',
	// 	firstName: 'Candyce',
	// 	isActive: true,
	// 	lastName: 'Davis-Hill',
	// 	name: '4436210149',
	// 	orgs: ['org_client_moed'],
	// 	owner: 'sys_client_moed',
	// 	systems: ['sys_client_moed'],
	// 	userTypes: ['ut_client_moed_advocate_east']
	// })
	// init.addTrans('sysUser', {
	// 	defaultOrg: 'org_client_moed',
	// 	defaultSystem: 'sys_client_moed',
	// 	firstName: 'Larry',
	// 	isActive: true,
	// 	lastName: 'Franklin',
	// 	name: '4434680244',
	// 	orgs: ['org_client_moed'],
	// 	owner: 'sys_client_moed',
	// 	systems: ['sys_client_moed'],
	// 	userTypes: ['ut_client_moed_advocate_east']
	// })
	// init.addTrans('sysUser', {
	// 	defaultOrg: 'org_client_moed',
	// 	defaultSystem: 'sys_client_moed',
	// 	firstName: 'Flory',
	// 	isActive: true,
	// 	lastName: 'Gessner',
	// 	name: '3195738122',
	// 	orgs: ['org_client_moed'],
	// 	owner: 'sys_client_moed',
	// 	systems: ['sys_client_moed'],
	// 	userTypes: ['ut_client_moed_advocate_east']
	// })
	// init.addTrans('sysUser', {
	// 	defaultOrg: 'org_client_moed',
	// 	defaultSystem: 'sys_client_moed',
	// 	firstName: 'Ariel',
	// 	isActive: true,
	// 	lastName: 'Liddell',
	// 	name: '4108442002',
	// 	orgs: ['org_client_moed'],
	// 	owner: 'sys_client_moed',
	// 	systems: ['sys_client_moed'],
	// 	userTypes: ['ut_client_moed_advocate_east']
	// })
	// init.addTrans('sysUser', {
	// 	defaultOrg: 'org_client_moed',
	// 	defaultSystem: 'sys_client_moed',
	// 	firstName: 'Maya',
	// 	isActive: true,
	// 	lastName: 'Maddison',
	// 	name: '4433269335',
	// 	orgs: ['org_client_moed'],
	// 	owner: 'sys_client_moed',
	// 	systems: ['sys_client_moed'],
	// 	userTypes: ['ut_client_moed_advocate_east']
	// })
	// init.addTrans('sysUser', {
	// 	defaultOrg: 'org_client_moed',
	// 	defaultSystem: 'sys_client_moed',
	// 	firstName: 'Robin',
	// 	isActive: true,
	// 	lastName: 'Thomas',
	// 	name: '4109844181',
	// 	orgs: ['org_client_moed'],
	// 	owner: 'sys_client_moed',
	// 	systems: ['sys_client_moed'],
	// 	userTypes: ['ut_client_moed_advocate_east']
	// })

	/* MOED - westside*/
	// init.addTrans('sysUser', {
	// 	defaultOrg: 'org_client_moed',
	// 	defaultSystem: 'sys_client_moed',
	// 	firstName: 'Cortez',
	// 	isActive: true,
	// 	lastName: 'Cannon',
	// 	name: '4433884488',
	// 	orgs: ['org_client_moed'],
	// 	owner: 'sys_client_moed',
	// 	systems: ['sys_client_moed'],
	// 	userTypes: ['ut_client_moed_advocate_west']
	// })
	// init.addTrans('sysUser', {
	// 	defaultOrg: 'org_client_moed',
	// 	defaultSystem: 'sys_client_moed',
	// 	firstName: 'Marissa',
	// 	isActive: true,
	// 	lastName: 'Epps',
	// 	name: '5164249129',
	// 	orgs: ['org_client_moed'],
	// 	owner: 'sys_client_moed',
	// 	systems: ['sys_client_moed'],
	// 	userTypes: ['ut_client_moed_advocate_west']
	// })
	// init.addTrans('sysUser', {
	// 	defaultOrg: 'org_client_moed',
	// 	defaultSystem: 'sys_client_moed',
	// 	firstName: 'CieAndre',
	// 	isActive: true,
	// 	lastName: 'Frink',
	// 	name: '4433551246',
	// 	orgs: ['org_client_moed'],
	// 	owner: 'sys_client_moed',
	// 	systems: ['sys_client_moed'],
	// 	userTypes: ['ut_client_moed_advocate_west']
	// })
	// init.addTrans('sysUser', {
	// 	defaultOrg: 'org_client_moed',
	// 	defaultSystem: 'sys_client_moed',
	// 	firstName: 'Raquel',
	// 	isActive: true,
	// 	lastName: 'Jones',
	// 	name: '4432860129',
	// 	orgs: ['org_client_moed'],
	// 	owner: 'sys_client_moed',
	// 	systems: ['sys_client_moed'],
	// 	userTypes: ['ut_client_moed_advocate_west']
	// })
	// init.addTrans('sysUser', {
	// 	defaultOrg: 'org_client_moed',
	// 	defaultSystem: 'sys_client_moed',
	// 	firstName: 'Jeffrey',
	// 	isActive: true,
	// 	lastName: 'LeSane',
	// 	name: '4433144565',
	// 	orgs: ['org_client_moed'],
	// 	owner: 'sys_client_moed',
	// 	systems: ['sys_client_moed'],
	// 	userTypes: ['ut_client_moed_advocate_west']
	// })
	// init.addTrans('sysUser', {
	// 	defaultOrg: 'org_client_moed',
	// 	defaultSystem: 'sys_client_moed',
	// 	firstName: 'Tyshell',
	// 	isActive: true,
	// 	lastName: 'Oliver',
	// 	name: '4439867910',
	// 	orgs: ['org_client_moed'],
	// 	owner: 'sys_client_moed',
	// 	systems: ['sys_client_moed'],
	// 	userTypes: ['ut_client_moed_advocate_west']
	// })
	// init.addTrans('sysUser', {
	// 	defaultOrg: 'org_client_moed',
	// 	defaultSystem: 'sys_client_moed',
	// 	firstName: 'Lori',
	// 	isActive: true,
	// 	lastName: 'Rawlins',
	// 	name: '4437574367',
	// 	orgs: ['org_client_moed'],
	// 	owner: 'sys_client_moed',
	// 	systems: ['sys_client_moed'],
	// 	userTypes: ['ut_client_moed_advocate_west']
	// })
	// init.addTrans('sysUser', {
	// 	defaultOrg: 'org_client_moed',
	// 	defaultSystem: 'sys_client_moed',
	// 	firstName: 'Chauncey',
	// 	isActive: true,
	// 	lastName: 'Roman',
	// 	name: '4439328798',
	// 	orgs: ['org_client_moed'],
	// 	owner: 'sys_client_moed',
	// 	systems: ['sys_client_moed'],
	// 	userTypes: ['ut_client_moed_advocate_west']
	// })
	// init.addTrans('sysUser', {
	// 	defaultOrg: 'org_client_moed',
	// 	defaultSystem: 'sys_client_moed',
	// 	firstName: 'Justin',
	// 	isActive: true,
	// 	lastName: 'Sanders',
	// 	name: '4434215994',
	// 	orgs: ['org_client_moed'],
	// 	owner: 'sys_client_moed',
	// 	systems: ['sys_client_moed'],
	// 	userTypes: ['ut_client_moed_advocate_west']
	// })
	// init.addTrans('sysUser', {
	// 	defaultOrg: 'org_client_moed',
	// 	defaultSystem: 'sys_client_moed',
	// 	firstName: 'Tavon',
	// 	isActive: true,
	// 	lastName: 'Thomas',
	// 	name: '4432862871',
	// 	orgs: ['org_client_moed'],
	// 	owner: 'sys_client_moed',
	// 	systems: ['sys_client_moed'],
	// 	userTypes: ['ut_client_moed_advocate_west']
	// })
	// init.addTrans('sysUser', {
	// 	defaultOrg: 'org_client_moed',
	// 	defaultSystem: 'sys_client_moed',
	// 	firstName: 'Candace',
	// 	isActive: true,
	// 	lastName: 'Washington',
	// 	name: '4438017583',
	// 	orgs: ['org_client_moed'],
	// 	owner: 'sys_client_moed',
	// 	systems: ['sys_client_moed'],
	// 	userTypes: ['ut_client_moed_advocate_west']
	// })
}
