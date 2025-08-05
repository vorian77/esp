import { InitDb } from '$server/dbGel/init/types.init'

export function initUserMOED(init: InitDb) {
	initConfigNodes(init)
	initAppHeaders(init)
	initApps(init)
	initUserType(init)
	initUsers(init)
}

function initConfigNodes(init: InitDb) {
	init.addTrans('updateSystemNodesConfig', {
		name: 'sys_client_baltimore_moed',
		nodesConfig: [
			{ codeAttrType: 'at_cm_program', node: 'node_obj_cm_program_list' },
			{ codeAttrType: 'at_cm_site', node: 'node_obj_cm_site_list' },
			{ codeAttrType: 'at_sys_code', node: 'node_obj_admin_code_list_customer' },
			{ codeAttrType: 'at_sys_msg_group', node: 'node_obj_admin_attr_obj_list_simple' }
		]
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
		ownerSys: 'sys_client_baltimore_moed'
	})
	init.addTrans('sysAppHeader', {
		codeIcon: 'UserRoundCog',
		header: 'MOED-Student',
		isGlobalResource: false,
		name: 'app_hdr_client_moed_student',
		orderDefine: 2010,
		ownerSys: 'sys_client_baltimore_moed'
	})
}

function initApps(init: InitDb) {
	/* MOED */
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_client_moed_advocate',
		isGlobalResource: false,
		name: 'app_client_moed_advocate',
		ownerSys: 'sys_client_baltimore_moed',
		nodes: ['node_obj_moed_part_list']
	})

	init.addTrans('sysApp', {
		appHeader: 'app_hdr_client_moed_student',
		isGlobalResource: false,
		name: 'app_client_moed_student',
		ownerSys: 'sys_client_baltimore_moed',
		nodes: ['node_obj_moed_part_list']
	})
}

function initUserType(init: InitDb) {
	/* MOED */
	init.addTrans('sysUserType', {
		attrsAccess: [
			{ access: 'allow', ownerSys: 'sys_system', name: 'app_sys_admin_customer' },
			{ access: 'allow', ownerSys: 'sys_system', name: 'app_sys_reporting' },
			{ access: 'allow', ownerSys: 'sys_system', name: 'task_sys_msg_all' },
			{ access: 'allow', ownerSys: 'sys_system', name: 'task_sys_quote' }
		],
		attrsAction: [
			{
				action: 'oaa_sys_msg_receive',
				ownerSys: 'sys_client_baltimore_moed',
				name: 'group_msg_moed_admin'
			},
			{
				action: 'oaa_sys_msg_send',
				ownerSys: 'sys_client_baltimore_moed',
				name: 'group_msg_moed_admin'
			}
		],
		header: 'MOED-Administrator',
		name: 'ut_client_baltimore_moed_admin',
		ownerOrg: 'org_client_baltimore'
	})
	init.addTrans('sysUserType', {
		attrsAccess: [
			{ access: 'allow', ownerSys: 'sys_client_baltimore_moed', name: 'app_client_moed_advocate' },
			// { access: 'allow', ownerSys: 'sys_client_baltimore_moed', name: 'report_moed_self_serv_student_status' },
			{ access: 'allow', ownerSys: 'sys_client_baltimore_moed', name: 'task_moed_part_apps_open' },
			// { access: 'allow', ownerSys: 'sys_system', name: 'app_sys_reporting' },
			{ access: 'allow', ownerSys: 'sys_system', name: 'task_sys_msg_all' },
			{ access: 'allow', ownerSys: 'sys_system', name: 'task_sys_msg_unread' }
		],
		attrsAction: [
			{
				action: 'oaa_sys_msg_receive',
				ownerSys: 'sys_client_baltimore_moed',
				name: 'group_msg_moed_staff_east'
			},
			{
				action: 'oaa_sys_msg_send',
				ownerSys: 'sys_client_baltimore_moed',
				name: 'group_msg_moed_youth_applicants_east'
			}
		],
		attrsExpr: [
			{
				action: 'oaa_sys_msg_send',
				expr: `SELECT (SELECT sys_user::SysUser FILTER .person IN (SELECT app_cm::CmClientServiceFlow FILTER .cmSite.name = 'at_cm_site_moed_office_east').client.person).id`
			}
		],
		header: 'MOED-Staff-Eastside',
		name: 'ut_client_baltimore_moed_advocate_east',
		ownerOrg: 'org_client_baltimore'
	})
	init.addTrans('sysUserType', {
		attrsAccess: [
			{ access: 'allow', ownerSys: 'sys_client_baltimore_moed', name: 'app_client_moed_advocate' },
			// { access: 'allow', ownerSys: 'sys_client_baltimore_moed', name: 'report_moed_self_serv_student_status' },
			{ access: 'allow', ownerSys: 'sys_client_baltimore_moed', name: 'task_moed_part_apps_open' },
			// { access: 'allow', ownerSys: 'sys_system', name: 'app_sys_reporting' },
			{ access: 'allow', ownerSys: 'sys_system', name: 'task_sys_msg_all' },
			{ access: 'allow', ownerSys: 'sys_system', name: 'task_sys_msg_unread' }
		],
		attrsAction: [
			{
				action: 'oaa_sys_msg_receive',
				ownerSys: 'sys_client_baltimore_moed',
				name: 'group_msg_moed_staff_west'
			},
			{
				action: 'oaa_sys_msg_send',
				ownerSys: 'sys_client_baltimore_moed',
				name: 'group_msg_moed_youth_applicants_west'
			}
		],
		attrsExpr: [
			{
				action: 'oaa_sys_msg_send',
				expr: `SELECT (SELECT sys_user::SysUser FILTER .person IN (SELECT app_cm::CmClientServiceFlow FILTER .cmSite.name = 'at_cm_site_moed_office_west').client.person).id`
			}
		],
		header: 'MOED-Staff-Westside',
		name: 'ut_client_baltimore_moed_advocate_west',
		ownerOrg: 'org_client_baltimore'
	})
	init.addTrans('sysUserType', {
		attrsAccess: [
			{ access: 'allow', ownerSys: 'sys_client_baltimore_moed', name: 'task_moed_ssr_app' },
			{ access: 'allow', ownerSys: 'sys_client_baltimore_moed', name: 'task_moed_ssr_app_doc' },
			{ access: 'allow', ownerSys: 'sys_client_baltimore_moed', name: 'task_moed_ssr_welcome' },
			{ access: 'allow', ownerSys: 'sys_system', name: 'task_sys_msg_all' },
			{ access: 'allow', ownerSys: 'sys_system', name: 'task_sys_msg_unread' }
		],
		attrsVirtual: [
			{
				expr: `SELECT (SELECT app_cm::CmClientServiceFlow FILTER .client.person.id = <user,uuid,personId>).cmSite.name = 'at_cm_site_moed_office_east'`,
				attrsAction: [
					{
						action: 'oaa_sys_msg_receive',
						ownerSys: 'sys_client_baltimore_moed',
						name: 'group_msg_moed_youth_applicants_east'
					},
					{
						action: 'oaa_sys_msg_send',
						ownerSys: 'sys_client_baltimore_moed',
						name: 'group_msg_moed_staff_east'
					}
				]
			},
			{
				expr: `SELECT (SELECT app_cm::CmClientServiceFlow FILTER .client.person.id = <user,uuid,personId>).cmSite.name = 'at_cm_site_moed_office_west'`,
				attrsAction: [
					{
						action: 'oaa_sys_msg_receive',
						ownerSys: 'sys_client_baltimore_moed',
						name: 'group_msg_moed_youth_applicants_west'
					},
					{
						action: 'oaa_sys_msg_send',
						ownerSys: 'sys_client_baltimore_moed',
						name: 'group_msg_moed_staff_west'
					}
				]
			}
		],
		header: `Baltimore - Mayor's Office of Employment Development`,
		isSelfSignup: true,
		name: 'ut_client_baltimore_moed_youth',
		ownerOrg: 'org_client_baltimore',
		selfSignupSystem: 'sys_client_baltimore_moed'
	})
}

function initUsers(init: InitDb) {
	/* MOED - admin*/
	init.addTrans('sysUser', {
		firstName: 'Test',
		isActive: true,
		lastName: 'user1',
		name: '2222222222',
		ownerOrg: 'org_client_baltimore',
		systemDefault: 'sys_client_baltimore_moed',
		systems: ['sys_client_baltimore_moed'],
		userTypes: [
			// 'ut_client_baltimore_moed_admin',
			'ut_client_baltimore_moed_advocate_east',
			'ut_client_baltimore_moed_advocate_west'
			// 'ut_client_baltimore_moed_youth'
		]
	})
	init.addTrans('sysUser', {
		firstName: 'Evelyn',
		isActive: true,
		lastName: 'Nicholson',
		name: '4432962824',
		ownerOrg: 'org_client_baltimore',
		systemDefault: 'sys_client_baltimore_moed',
		systems: ['sys_client_baltimore_moed'],
		userTypes: [
			'ut_client_baltimore_moed_admin',
			'ut_client_baltimore_moed_advocate_east',
			'ut_client_baltimore_moed_advocate_west'
		]
	})
	init.addTrans('sysUser', {
		firstName: 'Jon',
		isActive: true,
		lastName: 'Smeton',
		name: '4439660748',
		ownerOrg: 'org_client_baltimore',
		systemDefault: 'sys_client_baltimore_moed',
		systems: ['sys_client_baltimore_moed'],
		userTypes: [
			'ut_client_baltimore_moed_admin',
			'ut_client_baltimore_moed_advocate_east',
			'ut_client_baltimore_moed_advocate_west'
		]
	})

	/* MOED - eastside*/
	// init.addTrans('sysUser', {
	//
	// 	firstName: 'Troy',
	// 	isActive: true,
	// 	lastName: 'Bryant',
	// 	name: '4432264888',
	// 	ownerOrg: 'org_client_baltimore',
	// systemDefault: 'sys_client_baltimore_moed',
	// 	systems: ['sys_client_baltimore_moed'],
	// 	userTypes: ['ut_client_baltimore_moed_advocate_east']
	// })
	// init.addTrans('sysUser', {
	//
	// 	firstName: 'Candyce',
	// 	isActive: true,
	// 	lastName: 'Davis-Hill',
	// 	name: '4436210149',
	// 	ownerOrg: 'org_client_baltimore',
	// 	systemDefault: 'sys_client_baltimore_moed',
	// 	systems: ['sys_client_baltimore_moed'],
	// 	userTypes: ['ut_client_baltimore_moed_advocate_east']
	// })
	// init.addTrans('sysUser', {
	//
	// 	firstName: 'Larry',
	// 	isActive: true,
	// 	lastName: 'Franklin',
	// 	name: '4434680244',
	// 	ownerOrg: 'org_client_baltimore',
	// 	systemDefault: 'sys_client_baltimore_moed',
	// 	systems: ['sys_client_baltimore_moed'],
	// 	userTypes: ['ut_client_baltimore_moed_advocate_east']
	// })
	// init.addTrans('sysUser', {
	//
	// 	firstName: 'Flory',
	// 	isActive: true,
	// 	lastName: 'Gessner',
	// 	name: '3195738122',
	// 	ownerOrg: 'org_client_baltimore',
	// 	systemDefault: 'sys_client_baltimore_moed',
	// 	systems: ['sys_client_baltimore_moed'],
	// 	userTypes: ['ut_client_baltimore_moed_advocate_east']
	// })
	// init.addTrans('sysUser', {
	//
	// 	firstName: 'Ariel',
	// 	isActive: true,
	// 	lastName: 'Liddell',
	// 	name: '4108442002',
	// 	ownerOrg: 'org_client_baltimore',
	// 	systemDefault: 'sys_client_baltimore_moed',
	// 	systems: ['sys_client_baltimore_moed'],
	// 	userTypes: ['ut_client_baltimore_moed_advocate_east']
	// })
	// init.addTrans('sysUser', {
	//
	// 	firstName: 'Maya',
	// 	isActive: true,
	// 	lastName: 'Maddison',
	// 	name: '4433269335',
	// 	ownerOrg: 'org_client_baltimore',
	// 	systemDefault: 'sys_client_baltimore_moed',
	// 	systems: ['sys_client_baltimore_moed'],
	// 	userTypes: ['ut_client_baltimore_moed_advocate_east']
	// })
	// init.addTrans('sysUser', {
	//
	// 	firstName: 'Robin',
	// 	isActive: true,
	// 	lastName: 'Thomas',
	// 	name: '4109844181',
	// 	ownerOrg: 'org_client_baltimore',
	// 	systemDefault: 'sys_client_baltimore_moed',
	// 	systems: ['sys_client_baltimore_moed'],
	// 	userTypes: ['ut_client_baltimore_moed_advocate_east']
	// })

	/* MOED - westside*/
	// init.addTrans('sysUser', {
	//
	// 	firstName: 'Cortez',
	// 	isActive: true,
	// 	lastName: 'Cannon',
	// 	name: '4433884488',
	// 	ownerOrg: 'org_client_baltimore',
	// 	systemDefault: 'sys_client_baltimore_moed',
	// 	systems: ['sys_client_baltimore_moed'],
	// 	userTypes: ['ut_client_baltimore_moed_advocate_west']
	// })
	// init.addTrans('sysUser', {
	//
	// 	firstName: 'Marissa',
	// 	isActive: true,
	// 	lastName: 'Epps',
	// 	name: '5164249129',
	// 	ownerOrg: 'org_client_baltimore',
	// 	systemDefault: 'sys_client_baltimore_moed',
	// 	systems: ['sys_client_baltimore_moed'],
	// 	userTypes: ['ut_client_baltimore_moed_advocate_west']
	// })
	// init.addTrans('sysUser', {
	//
	// 	firstName: 'CieAndre',
	// 	isActive: true,
	// 	lastName: 'Frink',
	// 	name: '4433551246',
	// 	ownerOrg: 'org_client_baltimore',
	// 	systemDefault: 'sys_client_baltimore_moed',
	// 	systems: ['sys_client_baltimore_moed'],
	// 	userTypes: ['ut_client_baltimore_moed_advocate_west']
	// })
	// init.addTrans('sysUser', {
	//
	// 	firstName: 'Raquel',
	// 	isActive: true,
	// 	lastName: 'Jones',
	// 	name: '4432860129',
	// 	ownerOrg: 'org_client_baltimore',
	// 	systemDefault: 'sys_client_baltimore_moed',
	// 	systems: ['sys_client_baltimore_moed'],
	// 	userTypes: ['ut_client_baltimore_moed_advocate_west']
	// })
	// init.addTrans('sysUser', {
	//
	// 	firstName: 'Jeffrey',
	// 	isActive: true,
	// 	lastName: 'LeSane',
	// 	name: '4433144565',
	// 	ownerOrg: 'org_client_baltimore',
	// 	systemDefault: 'sys_client_baltimore_moed',
	// 	systems: ['sys_client_baltimore_moed'],
	// 	userTypes: ['ut_client_baltimore_moed_advocate_west']
	// })
	// init.addTrans('sysUser', {
	//
	// 	firstName: 'Tyshell',
	// 	isActive: true,
	// 	lastName: 'Oliver',
	// 	name: '4439867910',
	// 	ownerOrg: 'org_client_baltimore',
	// 	systemDefault: 'sys_client_baltimore_moed',
	// 	systems: ['sys_client_baltimore_moed'],
	// 	userTypes: ['ut_client_baltimore_moed_advocate_west']
	// })
	// init.addTrans('sysUser', {
	//
	// 	firstName: 'Lori',
	// 	isActive: true,
	// 	lastName: 'Rawlins',
	// 	name: '4437574367',
	// 	ownerOrg: 'org_client_baltimore',
	// 	systemDefault: 'sys_client_baltimore_moed',
	// 	systems: ['sys_client_baltimore_moed'],
	// 	userTypes: ['ut_client_baltimore_moed_advocate_west']
	// })
	// init.addTrans('sysUser', {
	//
	// 	firstName: 'Chauncey',
	// 	isActive: true,
	// 	lastName: 'Roman',
	// 	name: '4439328798',
	// 	ownerOrg: 'org_client_baltimore',
	// 	systemDefault: 'sys_client_baltimore_moed',
	// 	systems: ['sys_client_baltimore_moed'],
	// 	userTypes: ['ut_client_baltimore_moed_advocate_west']
	// })
	// init.addTrans('sysUser', {
	//
	// 	firstName: 'Justin',
	// 	isActive: true,
	// 	lastName: 'Sanders',
	// 	name: '4434215994',
	// 	ownerOrg: 'org_client_baltimore',
	// 	systemDefault: 'sys_client_baltimore_moed',
	// 	systems: ['sys_client_baltimore_moed'],
	// 	userTypes: ['ut_client_baltimore_moed_advocate_west']
	// })
	// init.addTrans('sysUser', {
	//
	// 	firstName: 'Tavon',
	// 	isActive: true,
	// 	lastName: 'Thomas',
	// 	name: '4432862871',
	// 	ownerOrg: 'org_client_baltimore',
	// 	systemDefault: 'sys_client_baltimore_moed',
	// 	systems: ['sys_client_baltimore_moed'],
	// 	userTypes: ['ut_client_baltimore_moed_advocate_west']
	// })
	// init.addTrans('sysUser', {
	//
	// 	firstName: 'Candace',
	// 	isActive: true,
	// 	lastName: 'Washington',
	// 	name: '4438017583',
	// 	ownerOrg: 'org_client_baltimore',
	// 	systemDefault: 'sys_client_baltimore_moed',
	// 	systems: ['sys_client_baltimore_moed'],
	// 	userTypes: ['ut_client_baltimore_moed_advocate_west']
	// })
}
