import { InitDb } from '$server/dbGel/init/types.init'

export function initUserAI(init: InitDb) {
	initConfigNodes(init)
	initObjAttr(init)
	initAppHeaders(init)
	initApps(init)
	initUserType(init)
	initUsers(init)
}

function initConfigNodes(init: InitDb) {
	init.addTrans('updateSystemNodesConfig', {
		name: 'sys_client_atlantic_impact',
		nodesConfig: [
			{ codeAttrType: 'at_app_cm_program', node: 'node_obj_cm_program_list' },
			{ codeAttrType: 'at_app_cm_site', node: 'node_obj_cm_site_list' },
			{ codeAttrType: 'at_sys_code', node: 'node_obj_admin_code_list_customer' }
		]
	})
}

function initObjAttr(init: InitDb) {
	init.addTrans('sysObjAttr', {
		code: 'at_user_user_role',
		header: 'Role-Instructor',
		name: 'role_ai_instructor',
		ownerSys: 'sys_client_atlantic_impact'
	})
}

function initAppHeaders(init: InitDb) {
	/* client - Atlantic Impact */
	init.addTrans('sysAppHeader', {
		codeIcon: 'UsersRound',
		header: 'Atlantic Impact-Staff',
		isGlobalResource: false,
		name: 'app_hdr_client_ai_staff',
		orderDefine: 1000,
		ownerSys: 'sys_client_atlantic_impact'
	})
}

function initApps(init: InitDb) {
	/* Atlantic Impact */
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_client_ai_staff',
		isGlobalResource: false,
		name: 'app_client_ai_staff',
		ownerSys: 'sys_client_atlantic_impact',
		nodes: ['node_obj_cm_course_list', 'node_obj_cm_partner_list', 'node_obj_cm_student_list']
	})
}

function initUserType(init: InitDb) {
	/* Atlantic Impact */
	init.addTrans('sysUserType', {
		attrsAccess: [
			{ access: 'allow', ownerSys: 'sys_system', name: 'app_sys_admin_customer' },
			{ access: 'allow', ownerSys: 'sys_system', name: 'app_sys_reporting' }
		],
		header: 'AI-Admin',
		name: 'ut_client_ai_admin',
		ownerOrg: 'org_client_atlantic_impact'
	})
	init.addTrans('sysUserType', {
		attrsAccess: [
			{ access: 'allow', ownerSys: 'sys_client_atlantic_impact', name: 'role_ai_instructor' }
		],
		header: 'AI-Instructor',
		name: 'ut_client_ai_instructor',
		ownerOrg: 'org_client_atlantic_impact'
	})
	init.addTrans('sysUserType', {
		attrsAccess: [
			{ access: 'allow', ownerSys: 'sys_system', name: 'app_sys_reporting' },

			{ access: 'allow', ownerSys: 'sys_client_atlantic_impact', name: 'app_client_ai_staff' },
			{
				access: 'allow',
				ownerSys: 'sys_client_atlantic_impact',
				name: 'report_ai_cohort_performance'
			},
			{
				access: 'allow',
				ownerSys: 'sys_client_atlantic_impact',
				name: 'report_ai_course_performance'
			},

			// { access: 'allow', ownerSys: 'sys_client_atlantic_impact', name: 'report_ai_cohorts_detail' },
			// { access: 'allow', ownerSys: 'sys_client_atlantic_impact', name: 'report_ai_courses_detail' },
			// { access: 'allow', ownerSys: 'sys_client_atlantic_impact', name: 'report_ai_partners_detail' },
			// {
			// 	access: 'allow',
			// 	ownerSys: 'sys_client_atlantic_impact',
			// 	name: 'report_ai_student_attd_detail'
			// },
			// {
			// 	access: 'allow',
			// 	ownerSys: 'sys_client_atlantic_impact',
			// 	name: 'report_ai_student_docs_detail'
			// },
			// {
			// 	access: 'allow',
			// 	ownerSys: 'sys_client_atlantic_impact',
			// 	name: 'report_ai_student_notes_detail'
			// },
			{
				access: 'allow',
				ownerSys: 'sys_client_atlantic_impact',
				name: 'report_ai_student_cohort_attd_summary'
			},
			{
				access: 'allow',
				ownerSys: 'sys_client_atlantic_impact',
				name: 'report_ai_student_job_placement_detail'
			},
			{
				access: 'allow',
				ownerSys: 'sys_client_atlantic_impact',
				name: 'report_ai_student_school_placement_detail'
			},
			{ access: 'allow', ownerSys: 'sys_client_atlantic_impact', name: 'report_ai_student_roster' },
			// { access: 'allow', ownerSys: 'sys_client_atlantic_impact', name: 'report_ai_student_service_flow_summary' },
			// { access: 'allow', ownerSys: 'sys_client_atlantic_impact', name: 'task_ai_cohort_attd' },
			{ access: 'allow', ownerSys: 'sys_client_atlantic_impact', name: 'task_ai_new_student' }
		],
		header: 'AI-Staff',
		name: 'ut_client_ai_staff',
		ownerOrg: 'org_client_atlantic_impact'
	})
}

function initUsers(init: InitDb) {
	/* Atlantic Impact */
	init.addTrans('sysUser', {
		firstName: 'Anise',
		isActive: false,
		lastName: 'Hayes',
		name: '2482317505',
		ownerOrg: 'org_client_atlantic_impact',
		systemDefault: 'sys_client_atlantic_impact',
		systems: ['sys_client_atlantic_impact'],
		userTypes: ['ut_client_ai_staff']
	})
	init.addTrans('sysUser', {
		firstName: 'Erica',
		isActive: false,
		lastName: 'Hicks',
		name: '3136272756',
		ownerOrg: 'org_client_atlantic_impact',
		systemDefault: 'sys_client_atlantic_impact',
		systems: ['sys_client_atlantic_impact'],
		userTypes: ['ut_client_ai_staff']
	})
	init.addTrans('sysUser', {
		firstName: 'Matthew',
		isActive: false,
		lastName: 'Clayton',
		name: '3136276210',
		ownerOrg: 'org_client_atlantic_impact',
		systemDefault: 'sys_client_atlantic_impact',
		systems: ['sys_client_atlantic_impact'],
		userTypes: ['ut_client_ai_admin', 'ut_client_ai_staff']
	})
	init.addTrans('sysUser', {
		firstName: 'Nino',
		isActive: false,
		lastName: 'Tanzini',
		name: 'ntanzini',
		ownerOrg: 'org_client_atlantic_impact',
		systemDefault: 'sys_client_atlantic_impact',
		systems: ['sys_client_atlantic_impact'],
		userTypes: ['ut_client_ai_instructor']
	})
}
