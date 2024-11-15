import { InitDb } from '$server/dbEdge/init/types.init'

export function initContentAITraining(init: InitDb) {
	initCourse(init)
	initCohort(init)
	initCohortStudentRoster(init)
	initCohortAttd(init)
	initCohortAttdSheet(init)
	initFieldListConfigPartnerContact(init)
	initPartner(init)
	initPartnerNote(init)
}

function initCourse(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_list',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter:
			'.owner in (SELECT sys_user::SysUser FILTER .userName = <user,str,userName>).userTypes.owner',
		header: 'Courses',
		name: 'data_obj_cm_course_list',
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
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeSector',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'right',
				codeFieldElement: 'number',
				columnName: 'custom_element_int',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				exprCustom: `(SELECT count(app_cm::CmCsfCohort FILTER .cohort.id IN app_cm::CmCourse.cohorts.id))`,
				headerAlt: 'Enrollments',
				indexTable: 0,
				nameCustom: 'customCohortsCount',
				pattern: '[-+]?[0-9]*[.,]?[0-9]+'
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Course',
		name: 'data_obj_cm_course_detail',
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
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				isExcludeUpdate: true,
				linkExprSave: '(SELECT sys_core::SysSystem Filter .id = (<parms,uuid,appSystemId>))',
				linkTable: 'SysSystem'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeSector',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_course_sector',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'description',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'schedule',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'courseRequirements',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'courseItemsIncluded',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'courseItemsNotIncluded',
				isDisplayable: true,
				orderDisplay: 170,
				orderDefine: 170,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 180,
				orderDefine: 180
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 190,
				orderDefine: 190
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'courseExams',
				isDisplayable: true,
				orderDisplay: 200,
				orderDefine: 200,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'courseCertifications',
				isDisplayable: true,
				orderDisplay: 210,
				orderDefine: 210,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 220,
				orderDefine: 220
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	init.addTrans('sysNodeObjProgram', {
		codeIcon: 'AppWindow',
		dataObj: 'data_obj_cm_course_list',
		header: 'Courses',
		name: 'node_obj_cm_course_list',
		orderDefine: 10,
		owner: 'sys_ai_old'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		dataObj: 'data_obj_cm_course_detail',
		header: 'Course',
		isSystemRoot: true,
		name: 'node_obj_cm_course_detail',
		orderDefine: 10,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_course_list'
	})
}

function initCohort(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.id in (SELECT app_cm::CmCourse FILTER .id = <tree,uuid,CmCourse.id>).cohorts.id',
		header: 'Cohorts',
		name: 'data_obj_cm_cohort_list',
		owner: 'sys_ai_old',
		tables: [{ index: 0, table: 'CmCohort' }],
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
				orderDisplay: 30,
				orderDefine: 30,

				headerAlt: 'Cohort ID',
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'cost',
				isDisplayable: true,
				orderDisplay: 35,
				orderDefine: 35,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateStart',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateEnd',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'right',
				codeFieldElement: 'number',
				columnName: 'custom_element_int',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				exprCustom: `(SELECT count(app_cm::CmCsfCohort FILTER .cohort.id = app_cm::CmCohort.id))`,
				headerAlt: 'Enrollments',
				indexTable: 0,
				nameCustom: 'customCohortsCount',
				pattern: '[-+]?[0-9]*[.,]?[0-9]+'
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Cohort',
		name: 'data_obj_cm_cohort_detail',
		owner: 'sys_ai_old',
		parentColumn: 'cohorts',
		parentTable: 'CmCourse',
		tables: [{ index: 0, table: 'CmCohort' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				isExcludeUpdate: true,
				linkExprSave: '(SELECT sys_core::SysSystem Filter .id = (<parms,uuid,appSystemId>))',
				linkTable: 'SysSystem'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				headerAlt: 'Cohort ID',
				indexTable: 0
			},
			{
				codeFieldElement: 'number',
				columnName: 'cost',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				codeFieldElement: 'date',
				columnName: 'dateStart',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'date',
				columnName: 'dateEnd',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'staffInstructor',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0,
				fieldListItems: 'il_sys_user_by_tag_type',
				fieldListItemsParmName: 'utt_role_ai_instructor',
				linkTable: 'SysUser'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 130
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		dataObj: 'data_obj_cm_cohort_list',
		header: 'Cohorts',
		name: 'node_obj_cm_cohort_list',
		orderDefine: 10,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_course_detail'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		dataObj: 'data_obj_cm_cohort_detail',
		header: 'Cohort',
		isSystemRoot: true,
		name: 'node_obj_cm_cohort_detail',
		orderDefine: 10,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_cohort_list'
	})
}

function initCohortStudentRoster(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_report_render',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.cohort.id = <tree,uuid,CmCohort.id>',
		header: 'Student Roster',
		name: 'data_obj_cm_student_roster_list_by_cohort',
		owner: 'sys_ai_old',
		tables: [
			{ index: 0, table: 'CmCsfCohort' },
			{ columnParent: 'csf', indexParent: 0, index: 1, table: 'CmClientServiceFlow' },
			{ columnParent: 'client', indexParent: 1, index: 2, table: 'CmClient' },
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
				orderCrumb: 10,
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 3
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				orderCrumb: 20,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 3
			},
			{
				codeAccess: 'readOnly',
				columnName: 'agencyId',
				isDisplayable: true,
				orderDisplay: 55,
				orderDefine: 55,
				headerAlt: 'Group',
				indexTable: 2
			}
		]
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		dataObj: 'data_obj_cm_student_roster_list_by_cohort',
		header: 'Student Roster',
		name: 'node_obj_cm_student_roster_list_by_cohort',
		orderDefine: 10,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_cohort_detail'
	})
}

function initCohortAttd(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.cohortId = <tree,uuid,CmCohort.id>',
		header: 'Attendance Days',
		name: 'data_obj_cm_cohort_attd_list',
		owner: 'sys_ai_old',
		tables: [{ index: 0, table: 'CmCohortAttd' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'date',
				orderCrumb: 10,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'number',
				columnName: 'hours',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_int',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfCohortAttd FILTER .cohortAttd.id = app_cm::CmCohortAttd.id)))`,
				headerAlt: 'Attendance Records',
				nameCustom: 'attendanceRecords'
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'toggle',
				columnName: 'custom_element_bool',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				exprCustom: `(EXISTS .file)`,
				headerAlt: 'Sheet Uploaded',
				nameCustom: 'isSheetUploaded'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		owner: 'sys_ai_old',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_cohort_attd_detail',
		header: 'Attendance Day',
		parentColumn: 'cohortAttds',
		parentTable: 'CmCohort',
		tables: [{ index: 0, table: 'CmCohortAttd' }],
		actionFieldGroup: 'doag_detail',
		actionsQuery: [
			{
				name: 'qa_file_storage',
				parms: [{ key: 'imageField', value: 'file' }],
				triggers: [
					{ codeQueryType: 'retrieve', codeTriggerTiming: 'post' },
					{ codeQueryType: 'save', codeTriggerTiming: 'pre' },
					{ codeQueryType: 'save', codeTriggerTiming: 'post' }
				]
			}
		],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20
			},
			{
				codeFieldElement: 'date',
				columnName: 'date',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeFieldElement: 'number',
				columnName: 'hours',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'file',
				columnName: 'file',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				width: 300
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		dataObj: 'data_obj_cm_cohort_attd_list',
		header: 'Attendance Days',
		name: 'node_obj_cm_cohort_attd_list',
		orderDefine: 20,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_cohort_detail'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		dataObj: 'data_obj_cm_cohort_attd_detail',
		header: 'Attendance Day',
		name: 'node_obj_cm_cohort_attd_detail',
		orderDefine: 10,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_cohort_attd_list'
	})
}

function initCohortAttdSheet(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_embed_list_edit',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeListEditPresetType: 'insert',
		exprFilter:
			'.csfCohort.cohort.id = <tree,uuid,CmCohort.id> AND .cohortAttd.id = <tree,uuid,CmCohortAttd.id>',
		header: 'Attendance Sheet',
		isListEdit: true,
		listEditPresetExpr: `WITH
		csfCohortsInCohort := (SELECT app_cm::CmCsfCohort FILTER .cohort.id = <tree,uuid,CmCohort.id>),
		csfCohortsWithAttd := (SELECT app_cm::CmCsfCohortAttd FILTER .cohortAttd.id = <tree,uuid,CmCohortAttd.id>).csfCohort,
		newVals := (SELECT csfCohortsInCohort EXCEPT csfCohortsWithAttd)
		SELECT newVals`,
		name: 'data_obj_cm_cohort_attd_sheet',
		owner: 'sys_ai_old',
		tables: [
			{ index: 0, table: 'CmCsfCohortAttd' },
			{ columnParent: 'csfCohort', indexParent: 0, index: 1, table: 'CmCsfCohort' },
			{ columnParent: 'csf', indexParent: 1, index: 2, table: 'CmClientServiceFlow' },
			{ columnParent: 'client', indexParent: 2, index: 3, table: 'CmClient' },
			{ columnParent: 'person', indexParent: 3, index: 4, table: 'SysPerson' }
		],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'cohortAttd',
				exprPreset: '<tree,uuid,CmCohortAttd.id>',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'CmCohortAttd'
			},
			{
				columnName: 'csfCohort',
				exprPreset: 'newVals.id',
				orderDefine: 30,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'CmCsfCohort'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'firstName',
				exprPreset: '.csf.client.person.firstName',
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 4,
				isExcludeInsert: true,
				isExcludeUpdate: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				exprPreset: '.csf.client.person.lastName',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 4,
				isExcludeInsert: true,
				isExcludeUpdate: true
			},
			{
				codeAccess: 'required',
				codeAlignmentAlt: 'center',
				codeFieldElement: 'radio',
				columnName: 'codeCmCohortAttdDuration',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_cohort_attd_duration',
				linkTable: 'SysCode'
			},
			{
				codeAlignmentAlt: 'center',
				codeAccess: 'readOnly',
				codeFieldElement: 'number',
				columnName: 'computedHours',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},

			/* management */
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDefine: 1010,
				indexTable: 0,
				isDisplayable: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDefine: 1020,
				indexTable: 0,
				isDisplayable: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDefine: 1030,
				indexTable: 0,
				isDisplayable: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDefine: 1040,
				indexTable: 0,
				isDisplayable: false
			}
		]
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		dataObj: 'data_obj_cm_cohort_attd_sheet',
		header: 'Attendance Sheet',
		name: 'node_obj_cm_cohort_attd_sheet',
		orderDefine: 10,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_cohort_attd_detail'
	})
}

function initFieldListConfigPartnerContact(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		header: 'Contacts',
		name: 'doflc_cm_partner_contact_list',
		owner: 'sys_ai_old',
		tables: [{ index: 0, table: 'SysPerson' }],
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
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 20,
				orderDefine: 20,
				orderDisplay: 220,
				orderSort: 20
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 10,
				orderDefine: 30,
				orderDisplay: 30,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'phoneMobile',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 40,
				orderDisplay: 40
			},
			{
				codeAccess: 'readOnly',
				columnName: 'email',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 50,
				orderDisplay: 50
			}
		]
	})

	init.addTrans('sysDataObjEmbed', {
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Contact',
		name: 'doflc_cm_partner_contact_detail',
		owner: 'sys_ai_old',
		tables: [{ index: 0, table: 'SysPerson' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20
			},
			{
				columnName: 'firstName',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				columnName: 'lastName',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'tel',
				columnName: 'phoneMobile',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'email',
				columnName: 'email',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90
			}
		]
	})

	init.addTrans('sysDataObjFieldEmbedListConfig', {
		actionFieldGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_cm_partner_contact_list',
		dataObjModal: 'doflc_cm_partner_contact_detail',
		name: 'flec_cm_partner_contact',
		owner: 'sys_ai_old'
	})
}

function initPartner(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter:
			'.owner in (SELECT sys_user::SysUser FILTER .userName = <user,str,userName>).userTypes.owner',
		header: 'Partners',
		name: 'data_obj_cm_partner_list',
		owner: 'sys_ai_old',
		tables: [{ index: 0, table: 'CmPartner' }],
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
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 10,
				orderDisplay: 20,
				orderDefine: 20,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeObjType',
				headerAlt: 'Partner Type',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'addr1',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			},
			{
				codeAccess: 'readOnly',
				columnName: 'addr2',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeAccess: 'readOnly',
				columnName: 'city',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeState',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'zip',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90
			},
			{
				codeAccess: 'readOnly',
				columnName: 'website',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Partner',
		name: 'data_obj_cm_partner_detail',
		owner: 'sys_ai_old',
		tables: [{ index: 0, table: 'CmPartner' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				isExcludeUpdate: true,
				linkExprSave: '(SELECT sys_core::SysSystem Filter .id = (<parms,uuid,appSystemId>))',
				linkTable: 'SysSystem'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeObjType',
				headerAlt: 'Partner Type',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_partner_type',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				columnName: 'website',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeFieldElement: 'tagSection',
				codeColor: 'black',
				columnName: 'custom_section_start',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				headerAlt: 'Address'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90
			},
			{
				codeAccess: 'optional',
				columnName: 'addr1',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'addr2',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130
			},
			{
				codeAccess: 'optional',
				columnName: 'city',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeState',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_state',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				columnName: 'zip',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 170,
				orderDefine: 170
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 180,
				orderDefine: 180
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'embedListConfig',
				columnName: 'contacts',
				fieldEmbedListConfig: 'flec_cm_partner_contact',
				indexTable: 0,
				isDisplayable: true,
				linkTable: 'SysPerson',
				orderDefine: 190,
				orderDisplay: 190
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 300,
				orderDefine: 300,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	init.addTrans('sysNodeObjProgram', {
		codeIcon: 'AppWindow',
		dataObj: 'data_obj_cm_partner_list',
		header: 'Partners',
		name: 'node_obj_cm_partner_list',
		orderDefine: 20,
		owner: 'sys_ai_old'
	})

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		dataObj: 'data_obj_cm_partner_detail',
		header: 'Partner',
		isSystemRoot: true,
		name: 'node_obj_cm_partner_detail',
		orderDefine: 10,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_partner_list'
	})
}

function initPartnerNote(init: InitDb) {
	init.addTrans('sysDataObj', {
		owner: 'sys_ai_old',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_partner_note_list',
		header: 'Notes',
		tables: [{ index: 0, table: 'SysObjNote' }],
		exprFilter: '.owner.id = <tree,uuid,CmPartner.id>',
		actionFieldGroup: 'doag_list',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'date',
				codeSortDir: 'desc',
				columnName: 'date',
				orderCrumb: 10,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeType',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		owner: 'sys_ai_old',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_partner_note_detail',
		header: 'Note',
		tables: [{ index: 0, table: 'SysObjNote' }],
		actionFieldGroup: 'doag_detail',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				isExcludeUpdate: true,
				linkExprSave: '(SELECT sys_core::SysObj Filter .id = (<tree,uuid,CmPartner.id>))',
				linkTable: 'SysObj'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'date',
				columnName: 'date',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeType',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_obj_note_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		dataObj: 'data_obj_cm_partner_note_list',
		header: 'Notes',
		name: 'node_obj_cm_partner_note_list',
		orderDefine: 10,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_partner_detail'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		dataObj: 'data_obj_cm_partner_note_detail',
		header: 'Note',
		name: 'node_obj_cm_partner_note_detail',
		orderDefine: 10,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_partner_note_list'
	})
}
