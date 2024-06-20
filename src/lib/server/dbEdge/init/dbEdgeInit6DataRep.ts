import { nodeObjHeaders, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import {
	addAnalytic,
	addDataObj,
	addNodeProgramObj,
	addReport,
	addReportUser
} from '$server/dbEdge/init/dbEdgeInitUtilities2'
import { error } from '@sveltejs/kit'

export async function initDataReports() {
	sectionHeader('Reports')
	await initAnalyticTrainingCredential()
	await initReportTrainingCredential()
	await initReportCourseSummary()
	await initReportOurWorldSummary()
	await initReportStudentSummary()
}

async function initAnalyticTrainingCredential() {
	await addAnalytic({
		description: 'Analytic for CM Training credential report.',
		header: 'Credential Analytic',
		name: 'analytic_cm_training_credential',
		owner: 'app_cm_training',
		parms: [
			{
				codeParmType: 'link',
				description: 'Document type.',
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_doc_type',
				header: 'Document Type',
				isMultiSelect: false,
				isRequired: true,
				linkTable: 'SysCode',
				name: 'paCodeDocType',
				orderDefine: 10
			},
			{
				codeParmType: 'number',
				description: 'Warning days.',
				header: 'Days - Warning',
				isMultiSelect: false,
				isRequired: true,
				name: 'paDaysWarning',
				orderDefine: 20
			},
			{
				codeParmType: 'number',
				description: 'Alarm days.',
				header: 'Days - Alarm',
				isMultiSelect: false,
				isRequired: true,
				name: 'paDaysAlarm',
				orderDefine: 30
			}
		],
		statuses: [
			{
				codeStatus: 'met',
				expr: `(SELECT count((SELECT app_cm_training::CmCsfCohort FILTER .codeStatus = (SELECT sys_core::getCode('ct_cm_service_flow_status', 'Completed')))))`
			},
			{
				codeStatus: 'high',
				comment: 'Credential should have been within 8 days.',
				expr: `(SELECT count((SELECT app_cm_training::CmCsfCohort FILTER .codeStatus = (SELECT sys_core::getCode('ct_cm_service_flow_status', 'Completed')))))`
			},
			{
				codeStatus: 'pending'
			}
		]
	})
}

async function initReportTrainingCredential() {
	await addReport({
		actionFieldGroup: 'doag_report_render',
		description: 'Cohort attendance report with user defined Analytic (credential) columns.',
		header: 'Credential Analytic',
		name: 'report_cm_training_credential_analytic',
		owner: 'app_cm_training',
		tables: [{ index: 0, table: 'CmCsfCohort' }],
		analytics: ['analytic_cm_training_credential'],
		elements: [
			{
				codeDbDataSourceValue: 'edgeDB',
				codeReportElementType: 'column',
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				codeSortDir: 'DESC',
				exprCustom: `.csf.client.person.firstName`,
				header: 'First Name',
				isDisplayable: true,
				nameCustom: 'firstName',
				orderDefine: 20,
				orderDisplay: 20,
				orderSort: 20
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				codeSortDir: 'DESC',
				exprCustom: `.csf.client.person.lastName`,
				header: 'Last Name',
				isDisplayable: true,
				nameCustom: 'lastName',
				orderDefine: 30,
				orderDisplay: 30,
				orderSort: 10
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.cohort.course.name`,
				header: 'Course',
				isDisplayable: true,
				nameCustom: 'courseName',
				orderDefine: 40,
				orderDisplay: 40
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.cohort.name`,
				header: 'Cohort',
				isDisplayable: true,
				nameCustom: 'cohortName',
				orderDefine: 50,
				orderDisplay: 50
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int64',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				description: 'The number of attendane days of the student in the cohort.',
				exprCustom: `(SELECT count(app_cm::CmCsfCohortAttd FILTER .csfCohort.id = app_cm::CmCsfCohort.id AND .computedHours > 0))`,
				header: 'Student Attendance Days',
				isDisplayable: true,
				nameCustom: 'attdDaysStudent',
				orderDefine: 60,
				orderDisplay: 60
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int64',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				description: 'The number of attendane days that have occurred in the cohort.',
				exprCustom: `(SELECT count(app_cm::CmCohortAttd FILTER .cohortId = app_cm::CmCsfCohort.cohort.id))`,
				header: 'Cohort Attendance Days',
				isDisplayable: true,
				nameCustom: 'attdDaysCohort',
				orderDefine: 70,
				orderDisplay: 70
			},
			{
				codeAlignment: 'right',
				codeDataType: 'float64',
				codeDbDataSourceValue: 'calculate',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				description: 'Student Attendance Days" devided by "Cohort Attendance Days.',
				exprCustom: `Math.round((.attdDaysCohort > 0 ? (.attdDaysStudent / .attdDaysCohort) : 0) * 100)`,
				header: 'Attendance Rate (%)',
				isDisplayable: true,
				nameCustom: 'attdRate',
				orderDefine: 80,
				orderDisplay: 80
			}
		],
		parms: [
			{
				codeParmType: 'date',
				description: 'Report start date.',
				header: 'Start Date',
				isMultiSelect: false,
				isRequired: false,
				name: 'prDateStart',
				orderDefine: 0
			},
			{
				codeParmType: 'date',
				description: 'Report end date.',
				header: 'End Date',
				isMultiSelect: false,
				isRequired: false,
				name: 'prDateEnd',
				orderDefine: 1
			},
			{
				codeParmType: 'link',
				description: 'Ethnicity.',
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_person_ethnicity',
				header: 'Ethnicity',
				isMultiSelect: false,
				isRequired: false,
				linkTable: 'SysCode',
				name: 'prCodeEthnicity',
				orderDefine: 2
			}
		]
	})

	await addReportUser({
		header: 'Credential Analytic',
		report: 'report_cm_training_credential_analytic',
		user: 'user_sys'
	})
	// await addReportUser({
	// 	header: 'Credential Analytic',
	// 	report: 'report_cm_training_credential_analytic',
	// 	user: '2482317505' // Anise
	// })
	// await addReportUser({
	// 	header: 'Credential Analytic',
	// 	report: 'report_cm_training_credential_analytic',
	// 	user: '3136276210' // Matt
	// })
	// // Erica
	// await addReportUser({
	// 	header: 'Credential Analytic',
	// 	report: 'report_cm_training_credential_analytic',
	// 	user: '3136272756' // Erica
	// })
}

async function initReportCourseSummary() {
	await addDataObj({
		actionFieldGroup: 'doag_report_render',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.owner in (SELECT sys_user::SysUser FILTER .userName = <user,str,userName>).orgs',
		header: 'Courses (Summary)',
		name: 'data_obj_cm_ai_report_course_summary',
		owner: 'app_cm_training',
		tables: [{ index: 0, table: 'CmCourse' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				headerAlt: 'Course',
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeStatus',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'number',
				columnName: 'custom_select_int',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				exprCustom: `(SELECT count((SELECT app_cm::CmCohort FILTER .course.id = app_cm::CmCourse.id)))`,
				headerAlt: 'Cohorts (Count)',
				indexTable: 0,
				nameCustom: 'customCohortsCount',
				pattern: '[-+]?[0-9]*[.,]?[0-9]+'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				exprCustom: `(SELECT app_cm::CmCohort FILTER .course.id = app_cm::CmCourse.id).name`,
				headerAlt: 'Cohorts',
				indexTable: 0,
				nameCustom: 'customCohorts'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_int',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfCohort FILTER .cohort.course.id = app_cm::CmCourse.id)))`,
				headerAlt: 'Students - Total',
				indexTable: 0,
				nameCustom: 'customStudentsTotal'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_int',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfCohort FILTER .cohort.course.id = app_cm::CmCourse.id AND NOT EXISTS .dateStart)))`,
				headerAlt: 'Students - Pending Enrollment',
				indexTable: 0,
				nameCustom: 'customStudentsEnrollPending'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_int',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfCohort {*} FILTER
          .cohort.course.id = app_cm::CmCourse.id AND
					NOT EXISTS .dateStart AND
          .dateStartEst < cal::to_local_date(datetime_current(), 'US/Eastern') )))`,
				headerAlt: 'Students - Missed Est. Enrollment',
				indexTable: 0,
				nameCustom: 'customStudentsEnrollMissed'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_int',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfCohort FILTER .cohort.course.id = app_cm::CmCourse.id AND EXISTS .dateStart AND NOT EXISTS .dateEnd AND .codeStatus = (SELECT sys_core::getCode('ct_cm_service_flow_status', 'Enrolled')) )))`,
				headerAlt: 'Students - Enrolled',
				indexTable: 0,
				nameCustom: 'customStudentsEnrolled'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_int',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfCohort FILTER .cohort.course.id = app_cm::CmCourse.id AND EXISTS .dateStart AND EXISTS .dateEnd AND .codeStatus = (SELECT sys_core::getCode('ct_cm_service_flow_status', 'Completed')) )))`,
				headerAlt: 'Students - Completed',
				indexTable: 0,
				nameCustom: 'customStudentsCompleted'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_int',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfCohort FILTER .cohort.course.id = app_cm::CmCourse.id AND EXISTS .dateStart AND EXISTS .dateEnd AND .codeStatus = (SELECT sys_core::getCode('ct_cm_service_flow_status', 'Dropped Out')) )))`,
				headerAlt: 'Students - Dropped Out',
				indexTable: 0,
				nameCustom: 'customStudentsDroppedOut'
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_ai_report_course_summary',
		header: 'Courses (Summary)',
		name: 'node_obj_cm_ai_report_course_summary',
		orderDefine: 40,
		owner: 'app_cm',
		parentNodeName: 'node_hdr_cm_ai_reports'
	})
}

async function initReportOurWorldSummary() {
	await addDataObj({
		actionFieldGroup: 'doag_report_render',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: `.serviceFlow.name = 'sf_cm_ai_our_world'`,
		header: 'Our World (Summary)',
		name: 'data_obj_cm_ai_report_our_world_summary',
		owner: 'app_cm',
		tables: [
			{ index: 0, table: 'CmClientServiceFlow' },
			{ columnParent: 'serviceFlow', indexParent: 0, index: 1, table: 'CmServiceFlow' },
			{ columnParent: 'client', indexParent: 0, index: 2, table: 'CmClient' },
			{ columnParent: 'person', indexParent: 2, index: 3, table: 'SysPerson' }
		],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'firstName',
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 3
			},
			{
				codeAccess: 'readOnly',
				columnName: 'middleName',
				isDisplayable: true,
				orderDisplay: 25,
				orderDefine: 25,
				indexTable: 3
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 3
			},
			{
				codeAccess: 'readOnly',
				columnName: 'birthDate',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 3
			},
			{
				codeAccess: 'readOnly',
				columnName: 'phoneMobile',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 3
			},
			{
				codeAccess: 'readOnly',
				columnName: 'email',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 3
			},
			{
				codeAccess: 'readOnly',
				columnName: 'school',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 2
			},

			{
				codeAccess: 'readOnly',
				columnName: 'agencyId',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,

				headerAlt: 'Group',
				indexTable: 2
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				isDisplayable: true,
				orderDisplay: 200,
				orderDefine: 200,

				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client.id = app_cm::CmClient.id).serviceFlow.header`,
				headerAlt: 'Service Flows',
				indexTable: 0,
				nameCustom: 'customSF'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				isDisplayable: true,
				orderDisplay: 210,
				orderDefine: 210,

				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client.id = app_cm::CmClient.id).codeReferralType.name`,
				headerAlt: 'Referral Types',
				indexTable: 0,
				nameCustom: 'customReferralTypes'
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_ai_report_our_world_summary',
		header: 'Our World (Summary)',
		name: 'node_obj_cm_ai_report_our_world_summary',
		orderDefine: 30,
		owner: 'app_cm',
		parentNodeName: 'node_hdr_cm_ai_reports'
	})
}

async function initReportStudentSummary() {
	await addDataObj({
		actionFieldGroup: 'doag_report_render',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.owner in (SELECT sys_user::SysUser FILTER .userName = <user,str,userName>).orgs',
		header: 'Students (Summary)',
		name: 'data_obj_cm_ai_report_student_summary',
		owner: 'app_cm',
		tables: [
			{ index: 0, table: 'CmClient' },
			{ columnParent: 'person', indexParent: 0, index: 1, table: 'SysPerson' }
		],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'agencyId',
				orderCrumb: 10,
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,

				headerAlt: 'Group',
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'firstName',
				orderCrumb: 20,
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 1
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				orderCrumb: 30,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 1
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,

				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client.id = app_cm::CmClient.id).serviceFlow.header`,
				headerAlt: 'Service Flows',
				indexTable: 0,
				nameCustom: 'customSF'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				isDisplayable: true,
				orderDisplay: 55,
				orderDefine: 55,

				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client.id = app_cm::CmClient.id).codeReferralType.name`,
				headerAlt: 'Referral Types',
				indexTable: 0,
				nameCustom: 'customReferralTypes'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,

				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER 
					.client.id = app_cm::CmClient.id AND 
					NOT EXISTS .dateStart AND
					NOT EXISTS .dateEnd).dateReferral`,
				headerAlt: 'Service Flows - Pending Enrollments (Referral Date)',
				indexTable: 0,
				nameCustom: 'customSFPendingEnrollment'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,

				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER 
					.client.id = app_cm::CmClient.id AND 
					.dateStartEst < cal::to_local_date(datetime_current(), 'US/Eastern') AND
					NOT EXISTS .dateStart AND
					NOT EXISTS .dateEnd
					).dateStartEst`,
				headerAlt: 'Service Flows - Missed Enrollments (Est. Start Date)',
				indexTable: 0,
				nameCustom: 'customSFMissedEnrollments'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,

				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER 
					.client.id = app_cm::CmClient.id AND 
					EXISTS .dateStart AND
					NOT EXISTS .dateEnd
					).dateStart`,
				headerAlt: 'Service Flows - Enrollments (Start Date)',
				indexTable: 0,
				nameCustom: 'customSFEnrollments'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				isDisplayable: true,
				orderDisplay: 85,
				orderDefine: 85,

				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER 
					.client.id = app_cm::CmClient.id AND 
					EXISTS .dateStart AND
					EXISTS .dateEnd 
					).dateEnd`,
				headerAlt: 'Service Flows - Completions (End Data)',
				indexTable: 0,
				nameCustom: 'customSFCompletions'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				isDisplayable: true,
				orderDisplay: 87,
				orderDefine: 87,

				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client.id = app_cm::CmClient.id).codeReferralEndType.name`,
				headerAlt: 'Referral End Types',
				indexTable: 0,
				nameCustom: 'customReferralEndTypes'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,

				exprCustom: `(SELECT app_cm::CmCsfNote FILTER 
					.csf.client.id = app_cm::CmClient.id
					).date`,
				headerAlt: 'Notes (Date)',
				indexTable: 0,
				nameCustom: 'customNotes'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,

				exprCustom: `(SELECT app_cm::CmCsfCohort FILTER .csf.client.id = app_cm::CmClient.id).cohort.course.name`,
				headerAlt: 'Courses',
				indexTable: 0,
				nameCustom: 'customSFCourses'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,

				exprCustom: `(SELECT app_cm::CmCsfCohort FILTER 
					.csf.client.id = app_cm::CmClient.id AND 
					NOT EXISTS .dateStart AND
					NOT EXISTS .dateEnd 
					).dateReferral`,
				headerAlt: 'Cohorts - Pending (Referral Data)',
				indexTable: 0,
				nameCustom: 'customCohortsPending'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,

				exprCustom: `(SELECT app_cm::CmCsfCohort FILTER 
					.csf.client.id = app_cm::CmClient.id AND 
					.dateStartEst < cal::to_local_date(datetime_current(), 'US/Eastern') AND
					NOT EXISTS .dateStart AND
					NOT EXISTS .dateEnd 
					).dateReferral`,
				headerAlt: 'Cohorts - Missed Enrollments (Est. Start Date)',
				indexTable: 0,
				nameCustom: 'customCohortsMissedEnrollment'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,

				exprCustom: `(SELECT app_cm::CmCsfCohort FILTER 
					.csf.client.id = app_cm::CmClient.id AND 
					EXISTS .dateStart AND
					NOT EXISTS .dateEnd 
					).dateStart`,
				headerAlt: 'Cohorts - Enrollments (Start Date)',
				indexTable: 0,
				nameCustom: 'customCohortsEnrollments'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,

				exprCustom: `(SELECT app_cm::CmCsfCohort FILTER 
					.csf.client.id = app_cm::CmClient.id AND 
					EXISTS .dateStart AND
					EXISTS .dateEnd AND
					.codeStatus = (SELECT sys_core::getCode('ct_cm_service_flow_status', 'Completed')) 
					).dateEnd`,
				headerAlt: 'Cohorts - Completions (End Date)',
				indexTable: 0,
				nameCustom: 'customCohortsCompletions'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160,

				exprCustom: `(SELECT app_cm::CmCsfCohort FILTER 
					.csf.client.id = app_cm::CmClient.id AND 
					EXISTS .dateStart AND
					EXISTS .dateEnd AND
					.codeStatus = (SELECT sys_core::getCode('ct_cm_service_flow_status', 'Dropped Out')) 
					).dateEnd`,
				headerAlt: 'Cohorts - Drop Outs (End Date)',
				indexTable: 0,
				nameCustom: 'customCohortsDropOuts'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				isDisplayable: true,
				orderDisplay: 170,
				orderDefine: 170,

				exprCustom: `(SELECT app_cm::CmCsfDocument FILTER 
					.csf.client.id = app_cm::CmClient.id
					).dateIssued`,
				headerAlt: 'Documents (Date Issued)',
				indexTable: 0,
				nameCustom: 'customDocuments'
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_ai_report_student_summary',
		header: 'Students (Summary)',
		name: 'node_obj_cm_ai_report_student_summary',
		orderDefine: 20,
		owner: 'app_cm',
		parentNodeName: 'node_hdr_cm_ai_reports'
	})
}
