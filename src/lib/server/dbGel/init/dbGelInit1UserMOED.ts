import { InitDb } from '$server/dbGel/init/types.init'

export function initUserMOED(init: InitDb) {
	initAttrObj(init)
	initAttr(init)

	initAppHeaders(init)
	initApps(init)
	initUserType(init)
	initUsers(init)
}

function initAttrObj(init: InitDb) {
	// site
	init.addTrans('sysAttrObj', {
		header: 'Eastside YO Center',
		isGlobalResource: false,
		name: 'moedOfficeEastside',
		owner: 'sys_client_moed'
	})
	init.addTrans('sysAttrObj', {
		header: 'Westside YO Center',
		isGlobalResource: false,
		name: 'moedOfficeWestside',
		owner: 'sys_client_moed'
	})

	// staff
	init.addTrans('sysAttrObj', {
		header: 'Staff-Eastside',
		isGlobalResource: false,
		name: 'moedStaffEastside',
		owner: 'sys_client_moed'
	})
	init.addTrans('sysAttrObj', {
		header: 'Staff-Westside',
		isGlobalResource: false,
		name: 'moedStaffWestside',
		owner: 'sys_client_moed'
	})

	// youth
	init.addTrans('sysAttrObj', {
		header: 'Youth-Eastside',
		isGlobalResource: false,
		name: 'moedYouth',
		owner: 'sys_client_moed'
	})
}

function initAttr(init: InitDb) {
	// site
	init.addTrans('sysAttr', {
		owner: 'sys_client_moed',
		name: 'moedOfficeEastside',
		type: 'at_cm_sf_site'
	})
	init.addTrans('sysAttr', {
		owner: 'sys_client_moed',
		name: 'moedOfficeWestside',
		type: 'at_cm_sf_site'
	})

	// staff
	init.addTrans('sysAttr', {
		owner: 'sys_client_moed',
		name: 'moedStaffEastside',
		type: 'at_sys_msg_receive'
	})
	init.addTrans('sysAttr', {
		owner: 'sys_client_moed',
		name: 'moedStaffEastside',
		type: 'at_sys_msg_send'
	})
	init.addTrans('sysAttr', {
		owner: 'sys_client_moed',
		name: 'moedStaffWestside',
		type: 'at_sys_msg_receive'
	})
	init.addTrans('sysAttr', {
		owner: 'sys_client_moed',
		name: 'moedStaffWestside',
		type: 'at_sys_msg_send'
	})

	// youth
	init.addTrans('sysAttr', {
		owner: 'sys_client_moed',
		name: 'moedYouth',
		type: 'at_sys_msg_receive'
	})
	init.addTrans('sysAttr', {
		owner: 'sys_client_moed',
		name: 'moedYouth',
		type: 'at_sys_msg_send'
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
		attrsAction: [
			{
				codeAttrAccessType: 'aoa_sys_msg_receive',
				name: 'moedStaffEastside',
				owner: 'sys_client_moed'
			},
			{
				codeAttrAccessType: 'aoa_sys_msg_send',
				name: 'moedYouth',
				owner: 'sys_client_moed'
			}
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
		attrsAction: [
			{
				codeAttrAccessType: 'aoa_sys_msg_receive',
				name: 'moedStaffWestside',
				owner: 'sys_client_moed'
			},
			{
				codeAttrAccessType: 'aoa_sys_msg_send',
				name: 'moedYouth',
				owner: 'sys_client_moed'
			}
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
		attrsAction: [
			{
				codeAttrAccessType: 'aoa_sys_msg_receive',
				name: 'moedYouth',
				owner: 'sys_client_moed'
			},
			{
				codeAttrAccessType: 'aoa_sys_msg_send',
				name: 'moedStaffEastside',
				owner: 'sys_client_moed'
			},
			{
				codeAttrAccessType: 'aoa_sys_msg_send',
				name: 'moedStaffWestside',
				owner: 'sys_client_moed'
			}
		],
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
