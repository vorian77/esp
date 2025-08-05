import { InitDb } from '$server/dbGel/init/types.init'
import { ParmsValuesType } from '$utils/types'

export function initContentMOEDCmAdvocate(init: InitDb) {
	initTaskOpenApps(init)
}

function initTaskOpenApps(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list_edit',
		codeCardinality: 'list',
		exprFilter: `.ownerSys.name = 'sys_client_baltimore_moed' 
  		AND NOT EXISTS (SELECT app_cm::CmClientServiceFlow FILTER .client = org_client_baltimore::MoedParticipant).dateEnd
  		AND .id NOT IN (SELECT app_cm::CmCsfEligibility FILTER .valueBoolean = true).csf.client.id`,
		header: 'Open Applications',
		name: 'data_obj_task_moed_part_list_apps_open',
		ownerSys: 'sys_client_baltimore_moed',
		tables: [
			{ index: 0, table: 'MoedParticipant' },
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
				columnName: 'firstName',
				orderCrumb: 10,
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 1
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				orderCrumb: 20,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 1
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'left',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client = org_client_baltimore::MoedParticipant).codeSfEligibilityStatus.name`,
				headerAlt: 'Elgibility Status',
				nameCustom: 'customAppStatus'
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'center',
				codeFieldElement: 'date',
				columnName: 'custom_element_date',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client = org_client_baltimore::MoedParticipant).dateCreated`,
				headerAlt: 'Date Created',
				nameCustom: 'customDateCreated'
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'center',
				codeFieldElement: 'date',
				columnName: 'custom_element_date',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client = org_client_baltimore::MoedParticipant).dateStart`,
				headerAlt: 'Date Start',
				nameCustom: 'customDateStart'
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'center',
				codeFieldElement: 'date',
				columnName: 'custom_element_date',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client = org_client_baltimore::MoedParticipant).dateEnd`,
				headerAlt: 'Date End',
				nameCustom: 'customDateEnd'
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'right',
				codeFieldElement: 'number',
				columnName: 'custom_element_int',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				exprCustom: `(with 
  			now := cal::to_local_date(datetime_current(), 'UTC') ,
  			compare :=<cal::local_date>{} if exists (SELECT app_cm::CmClientServiceFlow FILTER .client = org_client_baltimore::MoedParticipant).dateEnd else (SELECT app_cm::CmClientServiceFlow FILTER .client = org_client_baltimore::MoedParticipant).dateStart ?? (SELECT app_cm::CmClientServiceFlow FILTER .client = org_client_baltimore::MoedParticipant).dateCreated,
				dur := now - compare,
				SELECT std::duration_get(dur, 'day'))`,
				headerAlt: 'Days Open',
				nameCustom: 'customAppDaysOpen',
				pattern: '[-+]?[0-9]*[.,]?[0-9]+'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDefine: 100,
				orderDisplay: 100,
				exprCustom: `(SELECT app_cm::CmCsfEligibility FILTER .csf.client.id = org_client_baltimore::MoedParticipant.id) {data := .id, display := .csf.cmProgram.header ++ ' (' ++ <str>.valueBoolean ++ ')'}`,
				headerAlt: 'Programs (Eligibility)',
				nameCustom: 'programsEligibility'
			}
		]
	})

	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_moed_part_detail', order: 10 }],
		codeComponent: 'FormList',
		codeNodeType: 'nodeTask',
		dataObj: 'data_obj_task_moed_part_list_apps_open',
		isAlwaysRetrieveData: true,
		name: 'node_obj_task_moed_part_list_apps_open',
		ownerSys: 'sys_client_baltimore_moed',
		systemQuerySource: 'sys_client_baltimore_moed'
	})

	init.addTrans('sysTask', {
		codeTaskStatusObj: 'tso_sys_data',
		codeTaskType: 'taskAutomated',
		exprShow: `SELECT count((SELECT app_cm::CmClientServiceFlow FILTER .client IN org_client_baltimore::MoedParticipant AND NOT EXISTS .dateEnd AND .id NOT IN (((SELECT app_cm::CmCsfEligibility FILTER .valueBoolean = true).csf.id)))) > 0`,
		exprStatus: `WITH 
  	sfs := (SELECT app_cm::CmClientServiceFlow FILTER .client IN org_client_baltimore::MoedParticipant),
  	sfsOpen := (SELECT sfs FILTER .id NOT IN (SELECT app_cm::CmCsfEligibility FILTER .valueBoolean = true).csf.id AND NOT EXISTS .dateEnd),
    sfsData := (SELECT sfsOpen { days_open := duration_get(cal::to_local_date(datetime_current(), 'UTC') - .dateStart ?? .dateCreated, 'day') } ),
    SELECT {
      openLT6 := {label := 'Open 5 or fewer days', data := count(sfsData FILTER .days_open < 6), color := 'green'},
      open6To14 := {label := 'Open between 6 and 14 days', data := count(sfsData FILTER .days_open > 5 AND .days_open < 15), color := 'yellow'},
      openGT14 := {label := 'Open 15 or more days', data := count(sfsData FILTER .days_open > 14), color := 'red'},
		}`,
		header: 'Open Applications',
		name: 'task_moed_part_apps_open',
		nodeObj: 'node_obj_task_moed_part_list_apps_open',
		ownerSys: 'sys_client_baltimore_moed'
	})
}
