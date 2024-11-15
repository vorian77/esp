import { InitDb } from '$server/dbEdge/init/types.init'
import { type DataRecord, valueOrDefault } from '$utils/types'

import { initDataReportsAIStatic as initContentAIRepStatic } from '$server/dbEdge/init/dbEdgeInit80ContentAIRepStatic'

export function initContentAIRep(init: InitDb) {
	// old
	initContentAIRepStatic(init)

	initContentAIRepCohortsDetail(init)
	initContentAIRepCoursesDetail(init)
	initContentAIRepPartnersDetail(init)

	// student
	initContentAIRepStudentAttdDetail(init)
	initContentAIRepStudentCaseNotesDetail(init)
	initContentAIRepStudentDocsDetail(init)
	initContentAIRepStudentJobPlacementDetail(init)
	initContentAIRepStudentSchoolPlacementDetail(init)

	// summary
	initContentAIRepStudentCohortAttdSummary(init)
	initContentAIRepStudentServiceFlowSummary(init)
}

const getElementsStudent = (parms: DataRecord = {}) => {
	parms = valueOrDefault(parms, {})
	const csfPrefix = parms.csfPrefix ? '.' + parms.csfPrefix : ''
	const indexTableOffset = parms.indexTableOffset ? parms.indexTableOffset : 0
	let elements: DataRecord[] = [
		{
			codeReportElementType: 'column',
			columnName: 'id',
			indexTable: 0,
			isDisplayable: false,
			orderDefine: 0
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'firstName',
			indexTable: 3,
			isDisplay: true,
			isDisplayable: true,
			orderDefine: 10,
			orderDisplay: 10,
			orderSort: 10
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'middleName',
			indexTable: 3,
			isDisplay: false,
			isDisplayable: true,
			orderDefine: 15,
			orderDisplay: 15
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'lastName',
			indexTable: 3,
			isDisplay: true,
			isDisplayable: true,
			orderDefine: 20,
			orderDisplay: 20,
			orderSort: 5
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'birthDate',
			indexTable: 3,
			isDisplay: false,
			isDisplayable: true,
			orderDefine: 30,
			orderDisplay: 30
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'agencyId',
			header: 'Group',
			indexTable: 2,
			isDisplay: false,
			isDisplayable: true,
			orderDefine: 40,
			orderDisplay: 40
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'school',
			indexTable: 2,
			isDisplay: false,
			isDisplayable: true,
			orderDefine: 45,
			orderDisplay: 45
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'codeGender',
			indexTable: 3,
			isDisplay: false,
			isDisplayable: true,
			linkColumns: ['name'],
			orderDefine: 50,
			orderDisplay: 50
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'codeRace',
			indexTable: 3,
			isDisplay: false,
			isDisplayable: true,
			linkColumns: ['name'],
			orderDefine: 55,
			orderDisplay: 55
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'codeEthnicity',
			indexTable: 3,
			isDisplay: false,
			isDisplayable: true,
			linkColumns: ['name'],
			orderDefine: 60,
			orderDisplay: 60
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'phoneMobile',
			indexTable: 3,
			isDisplay: false,
			isDisplayable: true,
			orderDefine: 65,
			orderDisplay: 65
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'phoneAlt',
			indexTable: 3,
			isDisplay: false,
			isDisplayable: true,
			orderDefine: 70,
			orderDisplay: 70
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'email',
			indexTable: 3,
			isDisplay: false,
			isDisplayable: true,
			orderDefine: 75,
			orderDisplay: 75
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'addr1',
			indexTable: 3,
			isDisplay: false,
			isDisplayable: true,
			orderDefine: 80,
			orderDisplay: 80
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'addr2',
			indexTable: 3,
			isDisplay: false,
			isDisplayable: true,
			orderDefine: 85,
			orderDisplay: 85
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'city',
			indexTable: 3,
			isDisplay: false,
			isDisplayable: true,
			orderDefine: 90,
			orderDisplay: 90
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'codeState',
			indexTable: 3,
			isDisplay: false,
			isDisplayable: true,
			linkColumns: ['name'],
			orderDefine: 95,
			orderDisplay: 95
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'zip',
			indexTable: 3,
			isDisplay: false,
			isDisplayable: true,
			orderDefine: 100,
			orderDisplay: 100
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'note',
			indexTable: 3,
			isDisplay: false,
			isDisplayable: true,
			orderDefine: 105,
			orderDisplay: 105
		}
	]
	elements = elements.map((e) => {
		if (Object.hasOwn(e, 'indexTable') && e.indexTable > 0) {
			e.indexTable += indexTableOffset
		}
		return e
	})
	return elements
}

const getParms = (parms: string[], dateDataType: string = '') => {
	const parmsList = [
		{
			codeDataType: 'date',
			codeFieldElement: 'date',
			description: `Reporting range start date (${dateDataType})`,
			header: 'Start Date',
			isMultiSelect: false,
			name: 'pvDateStart',
			orderDefine: 0
		},
		{
			codeDataType: 'date',
			codeFieldElement: 'date',
			description: `Reporting range end date (${dateDataType})`,
			header: 'End Date',
			isMultiSelect: false,
			name: 'pvDateEnd',
			orderDefine: 1
		},
		{
			codeDataType: 'uuidList',
			codeFieldElement: 'chips',
			description: 'Course cohort(s)',
			fieldListItems: 'il_cm_cohort_short_by_userName',
			header: 'Cohort(s)',
			isMultiSelect: true,
			linkTable: 'CmCohort',
			name: 'pvCohorts',
			orderDefine: 3
		}
	]
	// return []
	return parmsList.filter((p) => {
		return parms.includes(p.name)
	})
}

function initContentAIRepCohortsDetail(init: InitDb) {
	init.addTrans('sysRep', {
		actionFieldGroup: 'doag_report_render',
		description: '',
		exprFilter: `.owner.id IN <user,uuidlist,systemIdList>`,
		header: 'Cohorts - Detail',
		name: 'report_ai_cohorts_detail',
		owner: 'sys_ai_old',
		tables: [
			{ index: 0, table: 'CmCohort' },
			{ columnParent: 'course', indexParent: 0, index: 1, table: 'CmCourse' }
		],
		elements: [
			{
				codeReportElementType: 'column',
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 0
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'name',
				header: 'Course',
				indexTable: 1,
				isDisplay: true,
				isDisplayable: true,
				orderDefine: 200,
				orderDisplay: 200,
				orderSort: 200
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'name',
				header: 'Cohort',
				indexTable: 0,
				isDisplay: true,
				isDisplayable: true,
				orderDefine: 210,
				orderDisplay: 210,
				orderSort: 210
			}
		],
		parms: getParms([])
	})
}

function initContentAIRepCoursesDetail(init: InitDb) {
	init.addTrans('sysRep', {
		actionFieldGroup: 'doag_report_render',
		description: '',
		exprFilter: `.owner.id IN <user,uuidlist,systemIdList>`,
		header: 'Courses - Detail',
		name: 'report_ai_courses_detail',
		owner: 'sys_ai_old',
		tables: [{ index: 0, table: 'CmCourse' }],
		elements: [
			{
				codeReportElementType: 'column',
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 0
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'name',
				header: 'Course',
				indexTable: 0,
				isDisplay: true,
				isDisplayable: true,
				orderDefine: 200,
				orderDisplay: 200,
				orderSort: 200
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int64',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `(SELECT count((SELECT app_cm::CmCohort FILTER .course.id = app_cm::CmCourse.id)))`,
				header: 'Cohorts (Count)',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'cohortsCnt',
				orderDefine: 220,
				orderDisplay: 220
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `(SELECT app_cm::CmCohort FILTER .course.id = app_cm::CmCourse.id).name`,
				header: 'Cohorts (List)',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'cohortsList',
				orderDefine: 230,
				orderDisplay: 230
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int64',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfCohort FILTER .cohort.course.id = app_cm::CmCourse.id)))`,
				header: 'Students Enrolled',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'studentsCnt',
				orderDefine: 240,
				orderDisplay: 240
			}
		],
		parms: getParms([])
	})
}

function initContentAIRepPartnersDetail(init: InitDb) {
	init.addTrans('sysRep', {
		actionFieldGroup: 'doag_report_render',
		description: '',
		exprFilter: `.owner.id IN <user,uuidlist,systemIdList>`,
		header: 'Partners - Detail',
		name: 'report_ai_partners_detail',
		owner: 'sys_ai_old',
		tables: [{ index: 0, table: 'CmPartner' }],
		elements: [
			{
				codeReportElementType: 'column',
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 0
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.name`,
				header: 'Name',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'name',
				orderDefine: 200,
				orderDisplay: 200,
				orderSort: 200
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.codeObjType.name`,
				header: 'Partner Type',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'codeObjTypeName',
				orderDefine: 210,
				orderDisplay: 210
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.website`,
				header: 'Website',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'website',
				orderDefine: 220,
				orderDisplay: 220
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.addr1`,
				header: 'Address 1',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'addr1',
				orderDefine: 220,
				orderDisplay: 220
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.addr2`,
				header: 'Address 2',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'addr2',
				orderDefine: 230,
				orderDisplay: 230
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.city`,
				header: 'City',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'city',
				orderDefine: 240,
				orderDisplay: 240
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.codeState.name`,
				header: 'State',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'codeStateName',
				orderDefine: 250,
				orderDisplay: 250
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.zip`,
				header: 'Zip',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'zip',
				orderDefine: 260,
				orderDisplay: 260
			},
			{
				codeAlignment: 'left',
				codeDataType: 'str',
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				exprCustom: `.note`,
				header: 'Note',
				isDisplay: false,
				isDisplayable: true,
				nameCustom: 'note',
				orderDefine: 270,
				orderDisplay: 270
			}
		],
		parms: getParms([])
	})
}

function initContentAIRepStudentAttdDetail(init: InitDb) {
	init.addTrans('sysRep', {
		actionFieldGroup: 'doag_report_render',
		description: 'Cohort attendance detail.',
		exprFilter: `.csfCohort.cohort.course.owner.id IN <user,uuidlist,systemIdList> AND .cohortAttd.date >= <parms,date,pvDateStart> AND .cohortAttd.date <= <parms,date,pvDateEnd>`,
		header: 'Student - Attendance - Detail',
		name: 'report_ai_student_attd_detail',
		owner: 'sys_ai_old',
		tables: [
			{ index: 0, table: 'CmCsfCohortAttd' },
			{ columnParent: 'csfCohort', indexParent: 0, index: 1, table: 'CmCsfCohort' },
			{ columnParent: 'csf', indexParent: 1, index: 2, table: 'CmClientServiceFlow' },
			{ columnParent: 'client', indexParent: 2, index: 3, table: 'CmClient' },
			{ columnParent: 'person', indexParent: 3, index: 4, table: 'SysPerson' },
			{ columnParent: 'cohortAttd', indexParent: 0, index: 5, table: 'CmCohortAttd' },
			{ columnParent: 'cohort', indexParent: 1, index: 6, table: 'CmCohort' },
			{ columnParent: 'course', indexParent: 6, index: 7, table: 'CmCourse' }
		],
		elements: [
			...getElementsStudent({
				csfPrefix: 'csfCohort',
				indexTableOffset: 1
			}),
			...[
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: 'name',
					header: 'Course',
					indexTable: 7,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 200,
					orderDisplay: 200
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: 'name',
					header: 'Cohort',
					indexTable: 6,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 210,
					orderDisplay: 210
				},
				{
					codeFieldElement: 'date',
					codeReportElementType: 'column',
					columnName: 'date',
					header: 'Attendance Date',
					indexTable: 5,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 220,
					orderDisplay: 220
				},
				{
					codeFieldElement: 'number',
					codeReportElementType: 'column',
					columnName: 'hours',
					header: 'Hours (Offered)',
					indexTable: 5,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 230,
					orderDisplay: 230
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: 'codeCmCohortAttdDuration',
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					linkColumns: ['name'],
					orderDefine: 240,
					orderDisplay: 240
				},
				{
					codeFieldElement: 'number',
					codeReportElementType: 'column',
					columnName: 'computedHours',
					header: 'Hours (Attended)',
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 250,
					orderDisplay: 250
				},
				{
					codeAlignment: 'right',
					codeDataType: 'float64',
					codeDbDataSourceValue: 'calculate',
					codeFieldElement: 'number',
					codeReportElementType: 'column',
					description: 'Student Attendance Days" devided by "Cohort Attendance Days.',
					exprCustom: `Math.round((.hours > 0 ? (.computedHours / .hours) : 0) * 100)`,
					header: 'Attendance Rate (%)',
					isDisplay: true,
					isDisplayable: true,
					nameCustom: 'attdRate',
					orderDefine: 260,
					orderDisplay: 260
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: 'note',
					header: 'Note (Attendance)',
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 270,
					orderDisplay: 270
				}
			]
		],
		parms: getParms(['pvDateStart', 'pvDateEnd'], 'Cohort Attendance: Date')
	})
}

function initContentAIRepStudentCaseNotesDetail(init: InitDb) {
	init.addTrans('sysRep', {
		actionFieldGroup: 'doag_report_render',
		description: '',
		exprFilter: `.csf.client.owner.id IN <user,uuidlist,systemIdList> AND .date >= <parms,date,pvDateStart> AND .date <= <parms,date,pvDateEnd>`,
		header: 'Student - Case Notes - Detail',
		name: 'report_ai_student_notes_detail',
		owner: 'sys_ai_old',
		tables: [
			{ index: 0, table: 'CmCsfNote' },
			{ columnParent: 'csf', indexParent: 0, index: 2, table: 'CmClientServiceFlow' },
			{ columnParent: 'client', indexParent: 2, index: 3, table: 'CmClient' },
			{ columnParent: 'person', indexParent: 3, index: 4, table: 'SysPerson' }
		],
		elements: [
			...getElementsStudent(),
			...[
				{
					codeFieldElement: 'date',
					codeReportElementType: 'column',
					columnName: 'date',
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 200,
					orderDisplay: 200
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: 'codeType',
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					linkColumns: ['name'],
					orderDefine: 210,
					orderDisplay: 210
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: 'note',
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 220,
					orderDisplay: 220
				}
			]
		],
		parms: getParms(['pvDateStart', 'pvDateEnd'], 'Case Note: Date')
	})
}

function initContentAIRepStudentDocsDetail(init: InitDb) {
	init.addTrans('sysRep', {
		actionFieldGroup: 'doag_report_render',
		description: '',
		exprFilter: `.csf.client.owner.id IN <user,uuidlist,systemIdList> AND .dateIssued >= <parms,date,pvDateStart> AND .dateIssued <= <parms,date,pvDateEnd>`,
		header: 'Student - Documents - Detail',
		name: 'report_ai_student_docs_detail',
		owner: 'sys_ai_old',
		tables: [
			{ index: 0, table: 'CmCsfDocument' },
			{ columnParent: 'csf', indexParent: 0, index: 1, table: 'CmClientServiceFlow' },
			{ columnParent: 'client', indexParent: 1, index: 2, table: 'CmClient' },
			{ columnParent: 'person', indexParent: 2, index: 3, table: 'SysPerson' }
		],
		elements: [
			...getElementsStudent(),
			...[
				{
					codeFieldElement: 'date',
					codeReportElementType: 'column',
					columnName: 'dateIssued',
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 200,
					orderDisplay: 200
				},
				{
					codeFieldElement: 'date',
					codeReportElementType: 'column',
					columnName: 'dateExpires',
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 210,
					orderDisplay: 210
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: 'codeType',
					header: 'Document Type',
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					linkColumns: ['name'],
					orderDefine: 220,
					orderDisplay: 220
				},
				{
					codeAlignment: 'center',
					codeFieldElement: 'toggle',
					codeReportElementType: 'column',
					columnName: 'isShareWithClient',
					exprCustom: `'Yes' IF .isShareWithClient ELSE 'No'`,
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 230,
					orderDisplay: 230
				},
				{
					codeAlignment: 'center',
					codeDataType: 'str',
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					exprCustom: `'Yes' IF EXISTS .file ELSE 'No'`,
					header: 'File Uploaded',
					isDisplay: true,
					isDisplayable: true,
					nameCustom: 'hasFile',
					orderDefine: 240,
					orderDisplay: 240
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: 'note',
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 250,
					orderDisplay: 250
				}
			]
		],
		parms: getParms(['pvDateStart', 'pvDateEnd'], 'Document: Date Issued')
	})
}

function initContentAIRepStudentJobPlacementDetail(init: InitDb) {
	init.addTrans('sysRep', {
		actionFieldGroup: 'doag_report_render',
		description: '',
		exprFilter: `.csf.client.owner.id IN <user,uuidlist,systemIdList> AND .dateStart >= <parms,date,pvDateStart> AND .dateStart <= <parms,date,pvDateEnd>`,
		header: 'Student - Job Placements - Detail',
		name: 'report_ai_student_job_placement_detail',
		owner: 'sys_ai_old',
		tables: [
			{ index: 0, table: 'CmCsfJobPlacement' },
			{ columnParent: 'csf', indexParent: 0, index: 1, table: 'CmClientServiceFlow' },
			{ columnParent: 'client', indexParent: 1, index: 2, table: 'CmClient' },
			{ columnParent: 'person', indexParent: 2, index: 3, table: 'SysPerson' }
		],
		elements: [
			...getElementsStudent(),
			...[
				{
					codeFieldElement: 'date',
					codeReportElementType: 'column',
					columnName: 'dateStart',
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 200,
					orderDisplay: 200,
					orderSort: 200
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: `title`,
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 210,
					orderDisplay: 210
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: `employerName`,
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 220,
					orderDisplay: 220
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: `employerContactNameFirst`,
					indexTable: 0,
					isDisplay: false,
					isDisplayable: true,
					orderDefine: 230,
					orderDisplay: 230
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: `employerContactNameLast`,
					indexTable: 0,
					isDisplay: false,
					isDisplayable: true,
					orderDefine: 240,
					orderDisplay: 240
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: `employerContactEmail`,
					indexTable: 0,
					isDisplay: false,
					isDisplayable: true,
					orderDefine: 250,
					orderDisplay: 250
				},
				{
					codeFieldElement: 'tel',
					codeReportElementType: 'column',
					columnName: `employerContactPhone`,
					indexTable: 0,
					isDisplay: false,
					isDisplayable: true,
					orderDefine: 260,
					orderDisplay: 260
				},
				{
					codeFieldElement: 'number',
					codeReportElementType: 'column',
					columnName: `wage`,
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 270,
					orderDisplay: 270
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: `codeWageType`,
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					linkColumns: ['name'],
					orderDefine: 280,
					orderDisplay: 280
				},
				{
					codeFieldElement: 'number',
					codeReportElementType: 'column',
					columnName: `hoursPerWeek`,
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 290,
					orderDisplay: 290
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: `codeJobType`,
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					linkColumns: ['name'],
					orderDefine: 300,
					orderDisplay: 300
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: `codePlacementRelated`,
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					linkColumns: ['name'],
					orderDefine: 300,
					orderDisplay: 300
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: `note`,
					indexTable: 0,
					isDisplay: false,
					isDisplayable: true,
					orderDefine: 320,
					orderDisplay: 320
				}
			]
		],
		parms: getParms(['pvDateStart', 'pvDateEnd'], 'Job Placement: Start Date')
	})
}

function initContentAIRepStudentSchoolPlacementDetail(init: InitDb) {
	init.addTrans('sysRep', {
		actionFieldGroup: 'doag_report_render',
		description: '',
		exprFilter: `.csf.client.owner.id IN <user,uuidlist,systemIdList> AND .date >= <parms,date,pvDateStart> AND .date <= <parms,date,pvDateEnd>`,
		header: 'Student - School Placements - Detail',
		name: 'report_ai_student_school_placement_detail',
		owner: 'sys_ai_old',
		tables: [
			{ index: 0, table: 'CmCsfSchoolPlacement' },
			{ columnParent: 'csf', indexParent: 0, index: 1, table: 'CmClientServiceFlow' },
			{ columnParent: 'client', indexParent: 1, index: 2, table: 'CmClient' },
			{ columnParent: 'person', indexParent: 2, index: 3, table: 'SysPerson' }
		],
		elements: [
			...getElementsStudent(),
			...[
				{
					codeFieldElement: 'date',
					codeReportElementType: 'column',
					columnName: `date`,
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 200,
					orderDisplay: 200,
					orderSort: 200
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: `collegeName`,
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 210,
					orderDisplay: 210
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: `codeCollegeStatus`,
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					linkColumns: ['name'],
					orderDefine: 220,
					orderDisplay: 220
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: `collegeMajor`,
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 230,
					orderDisplay: 230
				},
				{
					codeFieldElement: 'number',
					codeReportElementType: 'column',
					columnName: `collegeGradYear`,
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 240,
					orderDisplay: 240
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: `collegeGPA`,
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 250,
					orderDisplay: 250
				},
				{
					codeFieldElement: 'note',
					codeReportElementType: 'column',
					columnName: `note`,
					indexTable: 0,
					isDisplay: false,
					isDisplayable: true,
					orderDefine: 260,
					orderDisplay: 260
				}
			]
		],
		parms: getParms(['pvDateStart', 'pvDateEnd'], 'School Placement: Date')
	})
}

/* summaries */
function initContentAIRepStudentCohortAttdSummary(init: InitDb) {
	init.addTrans('sysRep', {
		actionFieldGroup: 'doag_report_render',
		description: 'Student cohort attendance summary report.',
		exprFilter: `.csf.client.owner.id IN <user,uuidlist,systemIdList> `,
		header: 'Student - Cohort Attendance - Summary',
		name: 'report_ai_student_cohort_attd_summary',
		owner: 'sys_ai_old',
		tables: [
			{ index: 0, table: 'CmCsfCohort' },
			{ columnParent: 'csf', indexParent: 0, index: 1, table: 'CmClientServiceFlow' },
			{ columnParent: 'client', indexParent: 1, index: 2, table: 'CmClient' },
			{ columnParent: 'person', indexParent: 2, index: 3, table: 'SysPerson' },
			{ columnParent: 'cohort', indexParent: 0, index: 4, table: 'CmCohort' },
			{ columnParent: 'course', indexParent: 4, index: 5, table: 'CmCourse' }
		],
		elements: [
			...getElementsStudent(),
			...[
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: `name`,
					header: 'Course',
					indexTable: 5,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 200,
					orderDisplay: 200
				},
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: `name`,
					header: 'Cohort',
					indexTable: 4,
					isDisplay: true,
					isDisplayable: true,
					orderDefine: 210,
					orderDisplay: 210
				},
				{
					codeAlignment: 'right',
					codeDataType: 'int64',
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
				},
				{
					codeAlignment: 'right',
					codeDataType: 'int64',
					codeFieldElement: 'number',
					codeReportElementType: 'column',
					description: `The student's document count.`,
					exprCustom: `(SELECT count(app_cm::CmCsfDocument FILTER .csf.id = app_cm::CmCsfCohort.csf.id AND .dateIssued >= <parms,date,pvDateStart> AND .dateIssued <= <parms,date,pvDateEnd>))`,
					header: 'Student Documents',
					isDisplay: true,
					isDisplayable: true,
					nameCustom: 'docCnt',
					orderDefine: 250,
					orderDisplay: 250
				}
			]
		],
		parms: getParms(['pvDateStart', 'pvDateEnd'], 'Data Value Dates')
	})
}

function initContentAIRepStudentServiceFlowSummary(init: InitDb) {
	init.addTrans('sysRep', {
		actionFieldGroup: 'doag_report_render',
		description: 'Student service flow summary.',
		exprFilter: `.client.owner.id IN <user,uuidlist,systemIdList> `,
		header: 'Student - Service Flow - Summary',
		name: 'report_ai_student_service_flow_summary',
		owner: 'sys_ai_old',
		tables: [
			{ index: 0, table: 'CmClientServiceFlow' },
			{ columnParent: 'client', indexParent: 0, index: 1, table: 'CmClient' },
			{ columnParent: 'person', indexParent: 1, index: 2, table: 'SysPerson' }
		],
		elements: [
			...getElementsStudent({ indexTableOffset: -1 }),
			...[
				{
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					columnName: `serviceFlow`,
					header: 'Service Flow',
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					linkColumns: ['header'],
					orderDefine: 150,
					orderDisplay: 150
				},
				{
					codeAlignment: 'left',
					codeDataType: 'str',
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					exprCustom: `(SELECT app_cm::CmCsfCohort FILTER .csf.id = app_cm::CmClientServiceFlow.id).cohort.name`,
					header: 'Cohorts (List)',
					isDisplay: true,
					isDisplayable: true,
					nameCustom: 'cohortsList',
					orderDefine: 200,
					orderDisplay: 200
				},
				{
					codeAlignment: 'left',
					codeDataType: 'str',
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					exprCustom: `(SELECT app_cm::CmCsfNote FILTER .csf.id = app_cm::CmClientServiceFlow.id).date`,
					header: 'Notes (Date)',
					isDisplay: true,
					isDisplayable: true,
					nameCustom: 'notesDateList',
					orderDefine: 210,
					orderDisplay: 210
				},
				{
					codeAlignment: 'left',
					codeDataType: 'str',
					codeFieldElement: 'text',
					codeReportElementType: 'column',
					exprCustom: `(SELECT app_cm::CmCsfDocument FILTER .csf.id = app_cm::CmClientServiceFlow.id).dateIssued`,
					header: 'Documents (Date)',
					isDisplay: true,
					isDisplayable: true,
					nameCustom: 'docsDateList',
					orderDefine: 220,
					orderDisplay: 220
				}
			]
		],
		parms: getParms([], '')
	})
}
