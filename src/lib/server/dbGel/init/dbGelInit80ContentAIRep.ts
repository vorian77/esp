import { InitDb } from '$server/dbGel/init/types.init'
import { type DataRecord, valueOrDefault } from '$utils/types'

const FILENAME = '$server/dbGel/init/dbGelInit80ContentAIRep.ts'

export function initContentAIRep(init: InitDb) {
	initFieldListSelectCohorts(init)

	initContentAIRepCohortsDetail(init)
	initContentAIRepCoursesDetail(init)
	initContentAIRepPartnersDetail(init)

	// student
	initContentAIRepStudentAttdDetail(init)
	initContentAIRepStudentCaseNotesDetail(init)
	initContentAIRepStudentDocsDetail(init)
	initContentAIRepStudentJobPlacementDetail(init)
	initContentAIRepStudentSchoolPlacementDetail(init)
	initContentAIRepStudentRoster(init)

	// summary
	initContentAIRepCohortPerformance(init)
	initContentAIRepCoursePerformance(init)
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
			orderSort: 20
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
			orderSort: 10
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
			columnName: 'codeHighestEducation',
			indexTable: 2,
			isDisplay: false,
			isDisplayable: true,
			linkColumns: ['name'],
			linkTable: 'SysCode',
			orderDefine: 47,
			orderDisplay: 47
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'codeGender',
			indexTable: 3,
			isDisplay: false,
			isDisplayable: true,
			linkColumns: ['name'],
			linkTable: 'SysCode',
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
			linkTable: 'SysCode',
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
			linkTable: 'SysCode',
			orderDefine: 60,
			orderDisplay: 60
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'hasDriversLicense',
			indexTable: 2,
			isDisplay: false,
			isDisplayable: true,
			orderDefine: 62,
			orderDisplay: 62
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
			linkTable: 'SysCode',
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
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'cmProgram',
			indexTable: 1,
			isDisplay: false,
			isDisplayable: true,
			linkColumns: ['header'],
			linkTable: 'CmProgram',
			orderDefine: 110,
			orderDisplay: 110
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'cmSite',
			indexTable: 1,
			isDisplay: false,
			isDisplayable: true,
			linkColumns: ['header'],
			linkTable: 'CmSite',
			orderDefine: 115,
			orderDisplay: 115
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'codeSfEnrollType',
			indexTable: 1,
			isDisplay: false,
			isDisplayable: true,
			linkColumns: ['name'],
			linkTable: 'SysCode',
			orderDefine: 120,
			orderDisplay: 120
		},
		{
			codeFieldElement: 'date',
			codeReportElementType: 'column',
			columnName: 'dateCreated',
			indexTable: 1,
			isDisplay: false,
			isDisplayable: true,
			orderDefine: 125,
			orderDisplay: 125
		},
		{
			codeFieldElement: 'date',
			codeReportElementType: 'column',
			columnName: 'dateEnd',
			indexTable: 1,
			isDisplay: false,
			isDisplayable: true,
			orderDefine: 130,
			orderDisplay: 130
		},
		{
			codeFieldElement: 'text',
			codeReportElementType: 'column',
			columnName: 'codeSfOutcome',
			indexTable: 1,
			isDisplay: false,
			isDisplayable: true,
			linkColumns: ['name'],
			linkTable: 'SysCode',
			orderDefine: 135,
			orderDisplay: 135
		},
		{
			codeFieldElement: 'date',
			codeReportElementType: 'column',
			columnName: 'note',
			header: 'Service Flow Note',
			indexTable: 1,
			isDisplay: false,
			isDisplayable: true,
			orderDefine: 140,
			orderDisplay: 140
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

function initFieldListSelectCohorts(init: InitDb) {
	init.addTrans('sysDataObjFieldListItems', {
		props: [
			[0, '_course', 'Course', `.course.name`, false, 0],
			[1, '_cohort', 'Cohort', `.name`, true, 1],
			[
				2,
				'_dateStart',
				'Cohort Start Date',
				`'(' ++ std::to_str(<cal::local_date>.dateStart) ++ ')'`,
				false,
				undefined
			]
		],
		exprFilter: `.ownerSys.id IN <user,uuidlist,systemIds>`,
		name: 'ilr_cm_cohort',
		ownerSys: 'sys_client_atlantic_impact',
		table: 'CmCohort'
	})
}

const getParms = (obj: any) => {
	obj = valueOrDefault(obj, {})
	const clazz = `${FILENAME}.getParms`
	const parms: [string, string | undefined][] = valueOrDefault(obj.parms, [])
	const dateDataType: string = valueOrDefault(obj.dateDataType, '')

	const parmsList = [
		{
			codeDataType: 'date',
			codeFieldElement: 'date',
			description: `Reporting range start date (${dateDataType})`,
			exprFilter: parms.find((p) => p[0] === 'pvDateStart')?.[1],
			header: 'Start Date',
			isMultiSelect: false,
			isRequired: true,
			name: 'pvDateStart',
			orderDefine: 0
		},
		{
			codeDataType: 'date',
			codeFieldElement: 'date',
			description: `Reporting range end date (${dateDataType})`,
			exprFilter: parms.find((p) => p[0] === 'pvDateEnd')?.[1],
			header: 'End Date',
			isMultiSelect: false,
			isRequired: true,
			name: 'pvDateEnd',
			orderDefine: 1
		},
		{
			codeDataType: 'uuidList',
			codeFieldElement: 'chips',
			description: 'Course cohort(s)',
			exprFilter: parms.find((p) => p[0] === 'pvCohorts')?.[1],
			fieldListItems: 'ilr_cm_cohort',
			header: 'Cohort(s)',
			isMultiSelect: true,
			isRequired: false,
			name: 'pvCohorts',
			orderDefine: 2
		}
	]
	return parmsList.filter((p) => {
		return parms.map((p) => p[0]).includes(p.name)
	})
}

function initContentAIRepCohortsDetail(init: InitDb) {
	init.addTrans('sysRep', {
		actionGroup: 'doag_report_render',
		description: '',
		exprFilter: '.ownerSys.id IN <user,uuidlist,systemIds>',
		header: 'Cohorts - Detail',
		name: 'report_ai_cohorts_detail',
		ownerSys: 'sys_client_atlantic_impact',
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
		parms: getParms({})
	})
}

function initContentAIRepCoursesDetail(init: InitDb) {
	init.addTrans('sysRep', {
		actionGroup: 'doag_report_render',
		description: '',
		exprFilter: '.ownerSys.id IN <user,uuidlist,systemIds>',
		header: 'Courses - Detail',
		name: 'report_ai_courses_detail',
		ownerSys: 'sys_client_atlantic_impact',
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
		parms: getParms({})
	})
}

function initContentAIRepPartnersDetail(init: InitDb) {
	init.addTrans('sysRep', {
		actionGroup: 'doag_report_render',
		description: '',
		exprFilter: '.ownerSys.id IN <user,uuidlist,systemIds>',
		header: 'Partners - Detail',
		name: 'report_ai_partners_detail',
		ownerSys: 'sys_client_atlantic_impact',
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
		parms: getParms({})
	})
}

function initContentAIRepStudentAttdDetail(init: InitDb) {
	init.addTrans('sysRep', {
		actionGroup: 'doag_report_render',
		description: 'Cohort attendance detail.',
		exprFilter: '.csfCohort.csf.client.ownerSys.id IN <user,uuidlist,systemIds>',
		header: 'Student - Attendance - Detail',
		name: 'report_ai_student_attd_detail',
		ownerSys: 'sys_client_atlantic_impact',
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
					exprCustom: `<function,fSysRate,.computedHours,.hours>`,
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
		parms: getParms({
			parms: [
				['pvDateStart', '.cohortAttd.date >= <parms,date,pvDateStart>'],
				['pvDateEnd', '.cohortAttd.date <= <parms,date,pvDateEnd>'],
				['pvCohorts', '.csfCohort.cohort.id IN <parms,uuidList,pvCohorts>']
			],
			dateDataType: 'Cohort Attendance: Date'
		})
	})
}

function initContentAIRepStudentCaseNotesDetail(init: InitDb) {
	init.addTrans('sysRep', {
		actionGroup: 'doag_report_render',
		description: '',
		exprFilter: '.csf.client.ownerSys.id IN <user,uuidlist,systemIds>',
		header: 'Student - Case Notes - Detail',
		name: 'report_ai_student_notes_detail',
		ownerSys: 'sys_client_atlantic_impact',
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
		parms: getParms({
			parms: [
				['pvDateStart', '.date >= <parms,date,pvDateStart> '],
				['pvDateEnd', '.date <= <parms,date,pvDateEnd>']
			],
			dateDataType: 'Case Note: Date'
		})
	})
}

function initContentAIRepStudentDocsDetail(init: InitDb) {
	init.addTrans('sysRep', {
		actionGroup: 'doag_report_render',
		description: '',
		exprFilter: '.csf.client.ownerSys.id IN <user,uuidlist,systemIds>',
		header: 'Student - Documents - Detail',
		name: 'report_ai_student_docs_detail',
		ownerSys: 'sys_client_atlantic_impact',
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
		parms: getParms({
			parms: [
				['pvDateStart', '.dateIssued >= <parms,date,pvDateStart>'],
				['pvDateEnd', '.dateIssued <= <parms,date,pvDateEnd>']
			],
			dateDataType: 'Document: Date Issued'
		})
	})
}

function initContentAIRepStudentJobPlacementDetail(init: InitDb) {
	init.addTrans('sysRep', {
		actionGroup: 'doag_report_render',
		description: '',
		exprFilter: '.csf.client.ownerSys.id IN <user,uuidlist,systemIds>',
		header: 'Student - Job Placements - Detail',
		name: 'report_ai_student_job_placement_detail',
		ownerSys: 'sys_client_atlantic_impact',
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
					columnName: `codeRetention`,
					indexTable: 0,
					isDisplay: true,
					isDisplayable: true,
					linkColumns: ['name'],
					orderDefine: 225,
					orderDisplay: 225
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
		parms: getParms({
			parms: [
				['pvDateStart', '.dateStart >= <parms,date,pvDateStart>'],
				['pvDateEnd', '.dateStart <= <parms,date,pvDateEnd>'],
				[
					'pvCohorts',
					'.csf IN (SELECT app_cm::CmCsfCohort FILTER .cohort.id IN <parms,uuidList,pvCohorts>).csf'
				]
			],
			dateDataType: 'Job Placement: Start Date'
		})
	})
}

function initContentAIRepStudentSchoolPlacementDetail(init: InitDb) {
	init.addTrans('sysRep', {
		actionGroup: 'doag_report_render',
		description: '',
		exprFilter: '.csf.client.ownerSys.id IN <user,uuidlist,systemIds>',
		header: 'Student - School Placements - Detail',
		name: 'report_ai_student_school_placement_detail',
		ownerSys: 'sys_client_atlantic_impact',
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
		parms: getParms({
			parms: [
				['pvDateStart', '.date >= <parms,date,pvDateStart>'],
				['pvDateEnd', '.date <= <parms,date,pvDateEnd>'],
				[
					'pvCohorts',
					'.csf IN (SELECT app_cm::CmCsfCohort FILTER .cohort.id IN <parms,uuidList,pvCohorts>).csf'
				]
			],
			dateDataType: 'School Placement: Date'
		})
	})
}

function initContentAIRepStudentRoster(init: InitDb) {
	init.addTrans('sysRep', {
		actionGroup: 'doag_report_render',
		exprFilter: '.client.ownerSys.id IN <user,uuidlist,systemIds> ',
		header: 'Student - Roster',
		name: 'report_ai_student_roster',
		ownerSys: 'sys_client_atlantic_impact',
		tables: [
			{ index: 0, table: 'CmClientServiceFlow' },
			{ columnParent: 'client', indexParent: 0, index: 1, table: 'CmClient' },
			{ columnParent: 'person', indexParent: 1, index: 2, table: 'SysPerson' }
		],
		elements: [...getElementsStudent({ indexTableOffset: -1 }), ...[]],
		parms: getParms({})
	})
}

/* summaries */
function initContentAIRepCohortPerformance(init: InitDb) {
	init.addTrans('sysRep', {
		actionGroup: 'doag_report_render',
		exprFilter: '.ownerSys.id IN <user,uuidlist,systemIds>',
		exprWith: `enrolled := (SELECT app_cm::CmCsfCohort),
completed := (SELECT enrolled FILTER .codeStatus.name = 'Completed'),
completedPlaced := (SELECT completed FILTER .csf IN app_cm::CmCsfJobPlacement.csf),
completedPlacedRelated := (SELECT completed FILTER .csf IN (SELECT app_cm::CmCsfJobPlacement FILTER str_lower(.codePlacementRelated.name) = 'yes').csf),
cohortWages := (SELECT completed {cohort, wages := (SELECT app_cm::CmCsfJobPlacement FILTER .csf = completed.csf).wage})`,
		header: 'Cohort Performance',
		name: 'report_ai_cohort_performance',
		ownerSys: 'sys_client_atlantic_impact',
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
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int16',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `(SELECT count((SELECT enrolled FILTER .cohort = app_cm::CmCohort)))`,
				header: 'Students Enrolled (Count)',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'enrolledCnt',
				orderDefine: 230,
				orderDisplay: 230
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int16',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `(SELECT count((SELECT completed FILTER .cohort = app_cm::CmCohort)))`,
				header: 'Students Completed (Count)',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'completedCnt',
				orderDefine: 250,
				orderDisplay: 250
			},
			{
				codeAlignment: 'right',
				codeDataType: 'float64',
				codeDbDataSourceValue: 'calculate',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `<function,fSysRate,.completedCnt,.enrolledCnt>`,
				header: 'Students Completed Rate (%)',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'completedRate',
				orderDefine: 260,
				orderDisplay: 260
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int16',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `(SELECT count((SELECT completedPlaced FILTER .cohort = app_cm::CmCohort)))`,
				header: 'Students Completed & Placed (Count)',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'completedPlacedCnt',
				orderDefine: 270,
				orderDisplay: 270
			},
			{
				codeAlignment: 'right',
				codeDataType: 'float64',
				codeDbDataSourceValue: 'calculate',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `<function,fSysRate,.completedPlacedCnt,.completedCnt>`,
				header: 'Students Completed & Placed (Rate) (%)',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'completedPlacedRate',
				orderDefine: 280,
				orderDisplay: 280
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int16',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `(SELECT count((SELECT completedPlacedRelated FILTER .cohort = app_cm::CmCohort)))`,
				header: 'Students Completed & Placed Related To Training (Count)',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'completedPlacedRelatedCnt',
				orderDefine: 290,
				orderDisplay: 290
			},
			{
				codeAlignment: 'right',
				codeDataType: 'float64',
				codeDbDataSourceValue: 'calculate',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `<function,fSysRate,.completedPlacedRelatedCnt,.completedCnt>`,
				header: 'Students Completed & Placed Related To Training (Rate)',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'completedPlacedRelatedRate',
				orderDefine: 300,
				orderDisplay: 300
			},
			{
				codeAlignment: 'right',
				codeDataType: 'float64',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `(math::mean((SELECT cohortWages FILTER .cohort = app_cm::CmCohort).wages ?? {0}))`,
				header: 'Students Completed & Placed Mean Wage ($)',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'wageMean',
				orderDefine: 310,
				orderDisplay: 310
			}
		],
		parms: getParms({
			parms: [['pvCohorts', `.id IN <parms,uuidList,pvCohorts>`]]
		})
	})
}

function initContentAIRepCoursePerformance(init: InitDb) {
	init.addTrans('sysRep', {
		actionGroup: 'doag_report_render',
		exprFilter: '.ownerSys.id IN <user,uuidlist,systemIds>',
		exprWith: `enrolled := (SELECT app_cm::CmCsfCohort {course := .cohort.course}),
completed := (SELECT enrolled FILTER .codeStatus.name = 'Completed'),
completedPlaced := (SELECT completed FILTER .csf IN app_cm::CmCsfJobPlacement.csf),
completedPlacedRelated := (SELECT completed FILTER .csf IN (SELECT app_cm::CmCsfJobPlacement FILTER str_lower(.codePlacementRelated.name) = 'yes').csf),
cohortWages := (SELECT completed {cohort, wages := (SELECT app_cm::CmCsfJobPlacement FILTER .csf = completed.csf).wage})`,
		header: 'Course Performance',
		name: 'report_ai_course_performance',
		ownerSys: 'sys_client_atlantic_impact',
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
				orderDefine: 210,
				orderDisplay: 210,
				orderSort: 210
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int16',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `(SELECT count((SELECT enrolled FILTER .course = app_cm::CmCourse)))`,
				header: 'Students Enrolled (Count)',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'enrolledCnt',
				orderDefine: 230,
				orderDisplay: 230
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int16',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `(SELECT count((SELECT completed FILTER .course = app_cm::CmCourse)))`,
				header: 'Students Completed (Count)',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'completedCnt',
				orderDefine: 250,
				orderDisplay: 250
			},
			{
				codeAlignment: 'right',
				codeDataType: 'float64',
				codeDbDataSourceValue: 'calculate',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `<function,fSysRate,.completedCnt,.enrolledCnt>`,
				header: 'Students Completed Rate (%)',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'completedRate',
				orderDefine: 260,
				orderDisplay: 260
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int16',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `(SELECT count((SELECT completedPlaced FILTER .course = app_cm::CmCourse)))`,
				header: 'Students Completed & Placed (Count)',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'completedPlacedCnt',
				orderDefine: 270,
				orderDisplay: 270
			},
			{
				codeAlignment: 'right',
				codeDataType: 'float64',
				codeDbDataSourceValue: 'calculate',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `<function,fSysRate,.completedPlacedCnt,.completedCnt>`,
				header: 'Students Completed & Placed (Rate) (%)',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'completedPlacedRate',
				orderDefine: 280,
				orderDisplay: 280
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int16',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `(SELECT count((SELECT completedPlacedRelated FILTER .course = app_cm::CmCourse)))`,
				header: 'Students Completed & Placed Related To Training (Count)',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'completedPlacedRelatedCnt',
				orderDefine: 290,
				orderDisplay: 290
			},
			{
				codeAlignment: 'right',
				codeDataType: 'float64',
				codeDbDataSourceValue: 'calculate',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `<function,fSysRate,.completedPlacedRelatedCnt,.completedCnt>`,
				header: 'Students Completed & Placed Related To Training (Rate)',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'completedPlacedRelatedRate',
				orderDefine: 300,
				orderDisplay: 300
			},
			{
				codeAlignment: 'right',
				codeDataType: 'float64',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `(math::mean((SELECT cohortWages FILTER .course = app_cm::CmCourse).wages ?? {0}))`,
				header: 'Students Completed & Placed Mean Wage ($)',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'wageMean',
				orderDefine: 310,
				orderDisplay: 310
			}
		],
		parms: getParms({})
	})
}

function initContentAIRepStudentCohortAttdSummary(init: InitDb) {
	init.addTrans('sysRep', {
		actionGroup: 'doag_report_render',
		description: 'Student cohort attendance summary report.',
		exprFilter: '.csf.client.ownerSys.id IN <user,uuidlist,systemIds>',
		header: 'Student - Cohort Attendance - Summary',
		name: 'report_ai_student_cohort_attd_summary',
		ownerSys: 'sys_client_atlantic_impact',
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
					exprCustom: `(SELECT count(app_cm::CmCohortAttd FILTER .cohortId = app_cm::CmCsfCohort.cohort.id))`,
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
					exprCustom: `(SELECT count(app_cm::CmCsfCohortAttd FILTER .csfCohort.id = app_cm::CmCsfCohort.id AND .computedHours > 0))`,
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
					exprCustom: `<function,fSysRate,.attdDaysStudent,.attdDaysCohort>`,
					header: 'Attendance Rate (%)',
					isDisplay: true,
					isDisplayable: true,
					nameCustom: 'attdRate',
					orderDefine: 240,
					orderDisplay: 240
				}
			]
		],
		parms: getParms({
			parms: [['pvCohorts', `.cohort.id IN <parms,uuidList,pvCohorts>`]],
			dateDataType: 'Data Value Dates'
		})
	})
}

function initContentAIRepStudentServiceFlowSummary(init: InitDb) {
	init.addTrans('sysRep', {
		actionGroup: 'doag_report_render',
		description: 'Student service flow summary.',
		exprFilter: '.client.ownerSys.id IN <user,uuidlist,systemIds> ',
		header: 'Student - Service Flow - Summary',
		name: 'report_ai_student_service_flow_summary',
		ownerSys: 'sys_client_atlantic_impact',
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
		parms: getParms({})
	})
}
