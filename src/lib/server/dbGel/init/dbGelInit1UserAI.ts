import { InitDb } from '$server/dbGel/init/types.init'

export function initUserAI(init: InitDb) {
	initAppHeaders(init)
	initApps(init)
	initUserType(init)
	initUsers(init)
}

function initAppHeaders(init: InitDb) {
	/* client - Atlantic Impact */
	init.addTrans('sysAppHeader', {
		codeIcon: 'UsersRound',
		header: 'Atlantic Impact-Staff',
		isGlobalResource: false,
		name: 'app_hdr_client_ai_staff',
		orderDefine: 1000,
		owner: 'sys_client_atlantic_impact'
	})
}

function initApps(init: InitDb) {
	/* Atlantic Impact */
	init.addTrans('sysApp', {
		appHeader: 'app_hdr_client_ai_staff',
		isGlobalResource: false,
		name: 'app_client_ai_staff',
		owner: 'sys_client_atlantic_impact',
		nodes: ['node_obj_cm_course_list', 'node_obj_cm_partner_list', 'node_obj_cm_student_list']
	})
}

function initUserType(init: InitDb) {
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
}

function initUsers(init: InitDb) {
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
}
