import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities10'
import { addDataObj } from '$server/dbEdge/init/dbEdgeInitUtilities20DataObj'
import { addNodeProgramObj } from '$server/dbEdge/init/dbEdgeInitUtilities50Other'

export async function initFeatTraining() {
	sectionHeader('DataObject - CM-Training')
	await initCourse()
	await initCohort()
	await initCohortStudentRoster()
	await initCohortAttd()
	await initCohortAttdSheet()
}

async function initCourse() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.owner in (SELECT sys_user::SysUser FILTER .userName = <user,str,userName>).orgs',
		header: 'Courses',
		name: 'data_obj_cm_course_list',
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
				columnName: 'codeStatus',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
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

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Course',
		name: 'data_obj_cm_course_detail',
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
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				isExcludeUpdate: true,
				linkExprSave: '(SELECT sys_core::getOrg(<user,str,org.name>))',
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeStatus',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_status',
				linkTable: 'SysCode'
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
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'staffAdmin',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0,
				fieldListItems: 'il_sys_role_staff_by_codeName',
				fieldListItemsParmName: 'cm_training_role_staff_admin',
				linkTable: 'SysStaff'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'staffAgency',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0,
				fieldListItems: 'il_sys_role_staff_by_codeName',
				fieldListItemsParmName: 'cm_training_role_staff_agency',
				linkTable: 'SysStaff'
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
				codeFieldElement: 'checkbox',
				columnName: 'codeMultiRqmts',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_course_rqmt',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'checkbox',
				columnName: 'codeMultiItemsIncluded',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_course_items_included',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'checkbox',
				columnName: 'codeMultiItemsNotIncluded',
				isDisplayable: true,
				orderDisplay: 170,
				orderDefine: 170,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_course_items_not_included',
				linkTable: 'SysCode'
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
				codeFieldElement: 'checkbox',
				columnName: 'codeMultiExams',
				isDisplayable: true,
				orderDisplay: 200,
				orderDefine: 200,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_course_exam',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'checkbox',
				columnName: 'codeMultiCerts',
				isDisplayable: true,
				orderDisplay: 210,
				orderDefine: 210,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_course_cert',
				linkTable: 'SysCode'
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
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_course_list',
		header: 'Courses',
		name: 'node_obj_cm_course_list',
		orderDefine: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_pgm_cm_staff_provider'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_course_detail',
		header: 'Course',
		name: 'node_obj_cm_course_detail',
		orderDefine: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_course_list'
	})
}

async function initCohort() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.id in (SELECT app_cm::CmCourse FILTER .id = <tree,uuid,CmCourse.id>).cohorts.id',
		header: 'Cohorts',
		name: 'data_obj_cm_cohort_list',
		owner: 'app_cm_training',
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
				columnName: 'codeStatus',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysOrg'
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

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Cohort',
		name: 'data_obj_cm_cohort_detail',
		owner: 'app_cm_training',
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
				linkExprSave: '(SELECT sys_core::getOrg(<user,str,org.name>))',
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeStatus',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_status',
				linkTable: 'SysCode'
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
				codeFieldElement: 'date',
				columnName: 'dateStart',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'date',
				columnName: 'dateEnd',
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
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'staffAdmin',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0,
				fieldListItems: 'il_sys_role_staff_by_codeName',
				fieldListItemsParmName: 'cm_training_role_staff_admin',
				linkTable: 'SysStaff'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'staffAgency',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0,
				fieldListItems: 'il_sys_role_staff_by_codeName',
				fieldListItemsParmName: 'cm_training_role_staff_agency',
				linkTable: 'SysStaff'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'staffInstructor',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 0,
				fieldListItems: 'il_sys_role_staff_by_codeName',
				fieldListItemsParmName: 'cm_training_role_staff_instructor',
				linkTable: 'SysStaff'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160,
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
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_cohort_list',
		header: 'Cohorts',
		name: 'node_obj_cm_cohort_list',
		orderDefine: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_course_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_cohort_detail',
		header: 'Cohort',
		name: 'node_obj_cm_cohort_detail',
		orderDefine: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_cohort_list'
	})
}

async function initCohortStudentRoster() {
	await addDataObj({
		actionFieldGroup: 'doag_report_render',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.cohort.id = <tree,uuid,CmCohort.id>',
		header: 'Student Roster',
		name: 'data_obj_cm_student_roster_list_by_cohort',
		owner: 'app_cm_training',
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
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_student_roster_list_by_cohort',
		header: 'Student Roster',
		name: 'node_obj_cm_student_roster_list_by_cohort',
		orderDefine: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_cohort_detail'
	})
}

async function initCohortAttd() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.cohortId = <tree,uuid,CmCohort.id>',
		header: 'Attendance Days',
		name: 'data_obj_cm_cohort_attd_list',
		owner: 'app_cm_training',
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
				codeFieldElement: 'toggle',
				columnName: 'custom_element_bool',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				exprCustom: `(EXISTS .file)`,
				headerAlt: 'Sheet Uploaded',
				nameCustom: 'isSheetUploaded'
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

	await addDataObj({
		owner: 'app_cm_training',
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
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_cohort_attd_list',
		header: 'Attendance Days',
		name: 'node_obj_cm_cohort_attd_list',
		orderDefine: 20,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_cohort_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_cohort_attd_detail',
		header: 'Attendance Day',
		name: 'node_obj_cm_cohort_attd_detail',
		orderDefine: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_cohort_attd_list'
	})
}

async function initCohortAttdSheet() {
	await addDataObj({
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
		csfCohortsWithoutAttd := (SELECT csfCohortsInCohort EXCEPT csfCohortsWithAttd)
		SELECT csfCohortsWithoutAttd`,
		name: 'data_obj_cm_cohort_attd_sheet',
		owner: 'app_cm_training',
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
				exprPreset: 'csfCohortsWithoutAttd.id',
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
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_cohort_attd_sheet',
		header: 'Attendance Sheet',
		name: 'node_obj_cm_cohort_attd_sheet',
		orderDefine: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_cohort_attd_detail'
	})
}
