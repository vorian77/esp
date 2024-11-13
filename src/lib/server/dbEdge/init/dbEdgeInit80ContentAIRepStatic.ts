import { InitDb } from '$server/dbEdge/init/types.init'

export function initDataReportsAIStatic(init: InitDb) {
	initAnalyticTrainingCredential(init)
}

function initAnalyticTrainingCredential(init: InitDb) {
	init.addTrans('sysAnalytic', {
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
