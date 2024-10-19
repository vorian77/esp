import {
	resetDBItems,
	nodeObjHeaders,
	sectionHeader
} from '$server/dbEdge/init/dbEdgeInit200Utilities10'
import { addDataObj } from '$server/dbEdge/init/dbEdgeInit200Utilities20DataObj'
import {
	addAnalytic,
	addReport,
	addReportUser
} from '$server/dbEdge/init/dbEdgeInit200Utilities40Rep'
import { addNodeProgramObj } from '$server/dbEdge/init/dbEdgeInit200Utilities50Other'
import { error } from '@sveltejs/kit'

export async function initDataReports() {
	sectionHeader('Reports')
	await initAnalyticTrainingCredential()

	await initReportCMTrainingCohortAttendance()
	await initReportCMTrainingCohortWages()

	await initReportCourseSummary()
	await initReportOurWorldSummary()
	await initReportStudentSummary()
	await initReportWizardStudentSummary()
}

async function initReportCMTrainingCohortAttendance() {
	await addReport({
		actionFieldGroup: 'doag_report_render',
		description: 'Cohort attendance report.',
		exprFilter: '.cohort.id IN <parms,uuidList,pvCohorts>',
		header: 'Cohort Attendance - Summary',
		name: 'report_cm_training_cohort_attendance',
		owner: 'sys_ai_old',
		tables: [{ index: 0, table: 'CmCsfCohort' }],
		analytics: ['analytic_cm_training_cohort_attendance'],
		elements: [
			{
				codeDbDataSourceValue: 'edgeDB',
				codeReportElementType: 'column',
				columnName: 'id',
				indexTable: 0,
				isDisplay: false,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.firstName`,
				header: 'First Name',
				isDisplay: true,
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
				exprCustom: `.csf.client.person.middleName`,
				header: 'Middle Name',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'middleName',
				orderDefine: 25,
				orderDisplay: 25
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.lastName`,
				header: 'Last Name',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'lastName',
				orderDefine: 30,
				orderDisplay: 30,
				orderSort: 10
			},
			{
				codeAlignment: 'center',
				codeDataType: 'date',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'date',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.birthDate`,
				header: 'Birth Date',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'birthdate',
				orderDefine: 35,
				orderDisplay: 35
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.agencyId`,
				header: 'Group',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'groupName',
				orderDefine: 40,
				orderDisplay: 40
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.school`,
				header: 'School',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'school',
				orderDefine: 45,
				orderDisplay: 45
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.codeGender.name`,
				header: 'Gender',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'gender',
				orderDefine: 50,
				orderDisplay: 50
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.codeRace.name`,
				header: 'Race',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'race',
				orderDefine: 55,
				orderDisplay: 55
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.codeEthnicity.name`,
				header: 'Ethnicity',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'ethnicity',
				orderDefine: 60,
				orderDisplay: 60
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'tel',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.phoneMobile`,
				header: 'Mobile Phone',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'phoneMobile',
				orderDefine: 65,
				orderDisplay: 65
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'tel',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.phoneAlt`,
				header: 'Alt Phone',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'phoneAlt',
				orderDefine: 70,
				orderDisplay: 70
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'email',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.email`,
				header: 'Email',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'email',
				orderDefine: 75,
				orderDisplay: 75
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.addr1`,
				header: 'Address 1',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'addr1',
				orderDefine: 80,
				orderDisplay: 80
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.addr2`,
				header: 'Address 2',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'addr2',
				orderDefine: 85,
				orderDisplay: 85
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.city`,
				header: 'City',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'city',
				orderDefine: 90,
				orderDisplay: 90
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.codeState.name`,
				header: 'State',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'state',
				orderDefine: 95,
				orderDisplay: 95
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.zip`,
				header: 'Zip',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'zip',
				orderDefine: 100,
				orderDisplay: 100
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.note`,
				header: 'Note',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'note',
				orderDefine: 105,
				orderDisplay: 105
			},

			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.cohort.course.name`,
				header: 'Course',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'courseName',
				orderDefine: 200,
				orderDisplay: 200
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.cohort.name`,
				header: 'Cohort',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'cohortName',
				orderDefine: 210,
				orderDisplay: 210
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int64',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				description: 'The number of attendance days that have occurred in the cohort.',
				exprCustom: `(SELECT count(app_cm::CmCohortAttd FILTER .cohortId = app_cm::CmCsfCohort.cohort.id AND .date >= <parms,date,pvDateStart> AND .date <= <parms,date,pvDateEnd>))`,
				header: 'Cohort Attendance Days',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'attdDaysCohort',
				orderDefine: 220,
				orderDisplay: 220
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int64',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				description: 'The number of attendance days of the student in the cohort.',
				exprCustom: `(SELECT count(app_cm::CmCsfCohortAttd FILTER .csfCohort.id = app_cm::CmCsfCohort.id AND .cohortAttd.date >= <parms,date,pvDateStart> AND .cohortAttd.date <= <parms,date,pvDateEnd> AND .computedHours > 0))`,
				header: 'Student Attendance Days',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'attdDaysStudent',
				orderDefine: 230,
				orderDisplay: 230
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
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'attdRate',
				orderDefine: 240,
				orderDisplay: 240
			}
		],
		parms: [
			{
				codeDataType: 'date',
				codeFieldElement: 'date',
				description: 'Attendance start date.',
				header: 'Start Date',
				isMultiSelect: false,
				name: 'pvDateStart',
				orderDefine: 0
			},
			{
				codeDataType: 'date',
				codeFieldElement: 'date',
				description: 'Attendance end date.',
				header: 'End Date',
				isMultiSelect: false,
				name: 'pvDateEnd',
				orderDefine: 1
			},
			{
				codeDataType: 'uuidList',
				codeFieldElement: 'chips',
				description: 'Student cohort(s).',
				fieldListItems: 'il_cm_cohort_short_by_userName',
				header: 'Cohort(s)',
				isMultiSelect: true,
				linkTable: 'CmCohort',
				name: 'pvCohorts',
				orderDefine: 3
			}
		]
	})

	await addReportUser({
		header: 'Cohort Attendance',
		report: 'report_cm_training_cohort_attendance',
		user: 'user_sys'
	})
	await addReportUser({
		header: 'Cohort Attendance',
		report: 'report_cm_training_cohort_attendance',
		user: '2487985578' // Phyllip
	})
	await addReportUser({
		header: 'Cohort Attendance',
		report: 'report_cm_training_cohort_attendance',
		user: '2482317505' // Anise
	})
	await addReportUser({
		header: 'Cohort Attendance',
		report: 'report_cm_training_cohort_attendance',
		user: '3136276210' // Matt
	})
	// Erica
	await addReportUser({
		header: 'Cohort Attendance',
		report: 'report_cm_training_cohort_attendance',
		user: '3136272756' // Erica
	})
}

async function initReportCMTrainingCohortWages() {
	await addReport({
		actionFieldGroup: 'doag_report_render',
		description: 'Cohort wages report.',
		exprFilter:
			'.csf.client IN (SELECT app_cm::CmCsfCohort FILTER .cohort.id IN <parms,uuidList,pvCohorts>).csf.client',
		header: 'Job Placements - Detail',
		name: 'report_cm_training_cohort_job_placement',
		owner: 'sys_ai_old',
		tables: [{ index: 0, table: 'CmCsfJobPlacement' }],
		elements: [
			{
				codeDbDataSourceValue: 'edgeDB',
				codeReportElementType: 'column',
				columnName: 'id',
				indexTable: 0,
				isDisplay: false,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.firstName`,
				header: 'First Name',
				isDisplay: true,
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
				exprCustom: `.csf.client.person.middleName`,
				header: 'Middle Name',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'middleName',
				orderDefine: 25,
				orderDisplay: 25
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.lastName`,
				header: 'Last Name',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'lastName',
				orderDefine: 30,
				orderDisplay: 30,
				orderSort: 10
			},
			{
				codeAlignment: 'center',
				codeDataType: 'date',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'date',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.birthDate`,
				header: 'Birth Date',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'birthdate',
				orderDefine: 35,
				orderDisplay: 35
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.agencyId`,
				header: 'Group',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'groupName',
				orderDefine: 40,
				orderDisplay: 40
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.school`,
				header: 'School',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'school',
				orderDefine: 45,
				orderDisplay: 45
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.codeGender.name`,
				header: 'Gender',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'gender',
				orderDefine: 50,
				orderDisplay: 50
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.codeRace.name`,
				header: 'Race',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'race',
				orderDefine: 55,
				orderDisplay: 55
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.codeEthnicity.name`,
				header: 'Ethnicity',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'ethnicity',
				orderDefine: 60,
				orderDisplay: 60
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'tel',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.phoneMobile`,
				header: 'Mobile Phone',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'phoneMobile',
				orderDefine: 65,
				orderDisplay: 65
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'tel',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.phoneAlt`,
				header: 'Alt Phone',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'phoneAlt',
				orderDefine: 70,
				orderDisplay: 70
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'email',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.email`,
				header: 'Email',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'email',
				orderDefine: 75,
				orderDisplay: 75
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.addr1`,
				header: 'Address 1',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'addr1',
				orderDefine: 80,
				orderDisplay: 80
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.addr2`,
				header: 'Address 2',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'addr2',
				orderDefine: 85,
				orderDisplay: 85
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.city`,
				header: 'City',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'city',
				orderDefine: 90,
				orderDisplay: 90
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.codeState.name`,
				header: 'State',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'state',
				orderDefine: 95,
				orderDisplay: 95
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.zip`,
				header: 'Zip',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'zip',
				orderDefine: 100,
				orderDisplay: 100
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.csf.client.person.note`,
				header: 'Note',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'personNote',
				orderDefine: 105,
				orderDisplay: 105
			},

			{
				codeAlignment: 'center',
				codeDataType: 'date',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'date',
				codeReportElementType: 'column',
				exprCustom: `.dateStart`,
				header: 'Start Date',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'dateStart',
				orderDefine: 200,
				orderDisplay: 200
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.employerName`,
				header: 'Employer',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'employer',
				orderDefine: 205,
				orderDisplay: 205
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.title`,
				header: 'Title',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'jobTitle',
				orderDefine: 210,
				orderDisplay: 210
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.codeJobType.name`,
				header: 'Job Type',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'jobType',
				orderDefine: 215,
				orderDisplay: 215
			},
			{
				codeAlignment: 'left',
				codeDataType: 'float64',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `.wage`,
				header: 'Wage',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'wage',
				orderDefine: 220,
				orderDisplay: 220
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.codeWageType.name`,
				header: 'Wage Type',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'wageType',
				orderDefine: 225,
				orderDisplay: 225
			},
			{
				codeAlignment: 'left',
				codeDataType: 'float64',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `.hoursPerWeek`,
				header: 'Hours Per Week',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'hoursPerWeek',
				orderDefine: 230,
				orderDisplay: 230
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeDbDataSourceValue: 'edgeDB',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.note`,
				header: 'Note',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'jobNote',
				orderDefine: 240,
				orderDisplay: 240
			}
		],
		parms: [
			{
				codeDataType: 'uuidList',
				codeFieldElement: 'chips',
				description: 'Student cohort(s).',
				fieldListItems: 'il_cm_cohort_short_by_userName',
				header: 'Cohort(s)',
				isMultiSelect: true,
				linkTable: 'CmCohort',
				name: 'pvCohorts',
				orderDefine: 3
			}
		]
	})

	await addReportUser({
		header: 'Job Placement',
		report: 'report_cm_training_cohort_job_placement',
		user: 'user_sys'
	})
	await addReportUser({
		header: 'Job Placement',
		report: 'report_cm_training_cohort_job_placement',
		user: '2487985578' // Phyllip
	})
	await addReportUser({
		header: 'Job Placement',
		report: 'report_cm_training_cohort_job_placement',
		user: '2482317505' // Anise
	})
	await addReportUser({
		header: 'Job Placement',
		report: 'report_cm_training_cohort_job_placement',
		user: '3136276210' // Matt
	})
	// Erica
	await addReportUser({
		header: 'Job Placement',
		report: 'report_cm_training_cohort_job_placement',
		user: '3136272756' // Erica
	})
}

// old/static list reports
async function initAnalyticTrainingCredential() {
	await addAnalytic({
		description: 'Cohort attendance report.',
		header: 'Cohort Attendance',
		name: 'analytic_cm_training_cohort_attendance',
		owner: 'sys_ai_old',
		parms: [
			{
				codeDataType: 'uuid',
				codeFieldElement: 'select',
				description: 'Document type.',
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_doc_type',
				header: 'Document Type',
				isMultiSelect: false,
				linkTable: 'SysCode',
				name: 'paCodeDocType',
				orderDefine: 10
			},
			{
				codeDataType: 'int64',
				codeFieldElement: 'number',
				description: 'Warning days.',
				header: 'Days - Warning',
				isMultiSelect: false,
				name: 'paDaysWarning',
				orderDefine: 20
			},
			{
				codeDataType: 'int64',
				codeFieldElement: 'number',
				description: 'Alarm days.',
				header: 'Days - Alarm',
				isMultiSelect: false,
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

async function initReportCourseSummary() {
	await addDataObj({
		actionFieldGroup: 'doag_report_render',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter:
			'.owner in (SELECT sys_user::SysUser FILTER .userName = <user,str,userName>).userTypes.owner',
		header: 'Courses (Summary)',
		name: 'data_obj_cm_ai_report_course_summary',
		owner: 'sys_ai_old',
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
				columnName: 'custom_element_int',
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
				columnName: 'custom_element_str',
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
				columnName: 'custom_element_int',
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
				columnName: 'custom_element_int',
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
				columnName: 'custom_element_int',
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
				columnName: 'custom_element_int',
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
				columnName: 'custom_element_int',
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
				columnName: 'custom_element_int',
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
		isHideRowManager: false,
		name: 'node_obj_cm_ai_report_course_summary',
		orderDefine: 100,
		owner: 'sys_ai_old',
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
		owner: 'sys_ai_old',
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
				columnName: 'custom_element_str',
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
				columnName: 'custom_element_str',
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
		isHideRowManager: false,
		name: 'node_obj_cm_ai_report_our_world_summary',
		orderDefine: 110,
		owner: 'sys_ai_old',
		parentNodeName: 'node_hdr_cm_ai_reports'
	})
}

async function initReportStudentSummary() {
	await addDataObj({
		actionFieldGroup: 'doag_report_render',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter:
			'.owner in (SELECT sys_user::SysUser FILTER .userName = <user,str,userName>).userTypes.owner',
		header: 'Students (Summary)',
		name: 'data_obj_cm_ai_report_student_summary',
		owner: 'sys_ai_old',
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
				columnName: 'custom_element_str',
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
				columnName: 'custom_element_str',
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
				columnName: 'custom_element_str',
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
				columnName: 'custom_element_str',
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
				columnName: 'custom_element_str',
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
				columnName: 'custom_element_str',
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
				columnName: 'custom_element_str',
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
				columnName: 'custom_element_str',
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
				columnName: 'custom_element_str',
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
				columnName: 'custom_element_str',
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
				columnName: 'custom_element_str',
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
				columnName: 'custom_element_str',
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
				columnName: 'custom_element_str',
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
				columnName: 'custom_element_str',
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
				columnName: 'custom_element_str',
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
		isHideRowManager: false,
		name: 'node_obj_cm_ai_report_student_summary',
		orderDefine: 120,
		owner: 'sys_ai_old',
		parentNodeName: 'node_hdr_cm_ai_reports'
	})
}

async function initReportWizardStudentSummary() {
	// await resetDBItems(
	// 	'Reset Reports',
	// 	`DELETE sys_core::SysDataObj FILTER .name = 'data_obj_ai_report_wizard_student_summary'`
	// )

	const exprStudents = `(SELECT app_cm::CmClient FILTER .owner.id in <user,uuidlist,systemIds>)`
	const exprRate = (expr1: string, expr2: string) =>
		`(SELECT math::floor(${expr1} / ${expr2} * 100))`

	await addDataObj({
		actionFieldGroup: 'doag_report_render',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: 'none',
		header: 'Students (Summary)',
		name: 'data_obj_ai_report_wizard_student_summary',
		owner: 'sys_ai_old',
		tables: [],
		fields: [
			{
				columnName: 'custom_element_int',
				orderDefine: 10,
				exprCustom: `(SELECT count(${exprStudents}))`,
				headerAlt: 'Students (Count)',
				nameCustom: 'customStudentsCount'
			},
			{
				columnName: 'custom_element_int',
				orderDefine: 20,
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfCohort.csf.client.id IN ${exprStudents}.id)))`,
				headerAlt: 'Students In Cohort (Count)',
				nameCustom: 'customStudentsWithCohortCount'
			},
			{
				columnName: 'custom_element_float',
				orderDefine: 30,
				exprCustom: exprRate(
					`(SELECT count((SELECT app_cm::CmCsfCohort.csf.client.id IN ${exprStudents}.id)))`,
					`(SELECT count(${exprStudents}))`
				),
				headerAlt: 'Students In Cohort Rate (%)',
				nameCustom: 'customStudentsWithCohortRate'
			},
			{
				columnName: 'custom_element_int',
				orderDefine: 40,
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfCohortAttd)))`,
				headerAlt: 'Attendance Days Offered (Count)',
				nameCustom: 'customAttendanceDaysOfferedCount'
			},
			{
				columnName: 'custom_element_float',
				orderDefine: 50,
				exprCustom: exprRate(
					`(SELECT count((SELECT app_cm::CmCsfCohortAttd FILTER .computedHours > 0)))`,
					`(SELECT count((SELECT app_cm::CmCsfCohortAttd)))`
				),
				headerAlt: 'Attendance Days Attended Rate (%)',
				nameCustom: 'customAttendanceDaysAttendedRate'
			},
			{
				columnName: 'custom_element_int',
				orderDefine: 60,
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfJobPlacement.csf.client.id IN ${exprStudents}.id)))`,
				headerAlt: 'Students Placed In Job (Count)',
				nameCustom: 'customJobPlacementCount'
			},
			{
				columnName: 'custom_element_float',
				orderDefine: 70,
				exprCustom: exprRate(
					`(SELECT count((SELECT app_cm::CmCsfJobPlacement.csf.client.id IN ${exprStudents}.id)))`,
					`(SELECT count((SELECT app_cm::CmCsfCohort.csf.client.id IN ${exprStudents}.id)))`
				),
				headerAlt: 'Students Placed In Job Rate (%)',
				nameCustom: 'customJobPlacementRate'
			}
		]
	})
}
