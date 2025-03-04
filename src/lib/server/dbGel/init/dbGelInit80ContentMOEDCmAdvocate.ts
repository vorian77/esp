import { InitDb } from '$server/dbGel/init/types.init'
import { ParmsValuesType } from '$utils/types'

export function initContentMOEDCmAdvocate(init: InitDb) {
	initDataObjDetail(init)
	initDataObjLists(init)
	initNodeObjsTask(init)
	initTasks(init)
}

function initDataObjDetail(init: InitDb) {}

function initDataObjLists(init: InitDb) {
	init.addTrans('sysDataObjTask', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'taskTarget',
		exprFilter: `.owner.name = 'sys_moed_old' AND NOT EXISTS (SELECT app_cm::CmClientServiceFlow FILTER .client = org_moed::MoedParticipant).dateEnd`,
		header: 'Open Applicant Applications',
		name: 'data_obj_task_moed_part_list_apps_open',
		owner: 'sys_moed_old',
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
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client = org_moed::MoedParticipant).codeStatus.name`,
				headerAlt: 'Application Status',
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
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client = org_moed::MoedParticipant).dateCreated`,
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
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client = org_moed::MoedParticipant).dateStart`,
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
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client = org_moed::MoedParticipant).dateEnd`,
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
  			compare :=<cal::local_date>{} if exists (SELECT app_cm::CmClientServiceFlow FILTER .client = org_moed::MoedParticipant).dateEnd else (SELECT app_cm::CmClientServiceFlow FILTER .client = org_moed::MoedParticipant).dateStart ?? (SELECT app_cm::CmClientServiceFlow FILTER .client = org_moed::MoedParticipant).dateCreated,
				dur := now - compare,
				SELECT std::duration_get(dur, 'day'))`,
				headerAlt: 'Days Open',
				nameCustom: 'customAppDaysOpen',
				pattern: '[-+]?[0-9]*[.,]?[0-9]+'
			}
		]
	})

	init.addTrans('sysDataObjTask', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'taskTarget',
		exprFilter: `.sender IN org_moed::MoedParticipant.person AND NOT EXISTS .responses`,
		header: 'Open Applicant Messages',
		name: 'data_obj_task_moed_msg_list_open',
		owner: 'sys_moed_old',
		tables: [{ index: 0, table: 'SysMsg' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			// {
			// 	codeAccess: 'readOnly',
			// 	codeAlignmentAlt: 'center',
			// 	columnName: 'custom_element_str',
			// 	isDisplayable: true,
			// 	orderDefine: 15,
			// 	orderDisplay: 15,
			// 	exprCustom: `'' IF <user,uuid,personId> = .sender.id ELSE 'Yes' IF <user,uuid,personId> IN .readers.id ELSE 'No'`,
			// 	headerAlt: 'Read',
			// 	nameCustom: 'isReadDisplay'
			// },
			{
				codeAccess: 'readOnly',
				columnName: 'parent',
				isDisplayable: false,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'date',
				headerAlt: 'Date (Demonstration Only)',
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 30,
				orderDefine: 30,
				orderDisplay: 30
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'string',
				columnName: 'custom_element_str',
				isDisplayable: true,
				exprCustom: `.sender.firstName`,
				headerAlt: 'First Name',
				nameCustom: 'customSenderFirstName',
				orderCrumb: 10,
				orderDefine: 40,
				orderDisplay: 40,
				orderSort: 20
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'string',
				columnName: 'custom_element_str',
				isDisplayable: true,
				exprCustom: `.sender.lastName`,
				headerAlt: 'Last Name',
				nameCustom: 'customSenderLastName',
				orderCrumb: 20,
				orderDefine: 50,
				orderDisplay: 50,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'subject',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isRead',
				isDisplayable: false,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				isDisplay: false,
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
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
  			now := cal::to_local_date(datetime_current(), 'UTC'),
  			compare :=.date,
				dur := now - compare,
				SELECT std::duration_get(dur, 'day'))`,
				headerAlt: 'Days Open',
				nameCustom: 'customAppDaysOpen',
				pattern: '[-+]?[0-9]*[.,]?[0-9]+'
			}
		]
	})
}

function initNodeObjsTask(init: InitDb) {
	init.addTrans('sysNodeObjTask', {
		children: ['node_obj_moed_part_detail'],
		codeIcon: 'AppWindow',
		codeNavType: 'task',
		codeNodeType: 'program',
		data: [{ dataObj: 'data_obj_task_moed_part_list_apps_open' }],
		header: 'Open Applications',
		isAlwaysRetrieveData: true,
		name: 'node_obj_task_moed_part_list_apps_open',
		orderDefine: 10,
		owner: 'sys_moed_old'
	})
	// init.addTrans('sysNodeObjProgramObj', {
	// 	codeIcon: 'AppWindow',
	// 	codeNodeType: 'program_object',
	// 	data: [{ dataObj: 'data_obj_moed_part_detail' }],
	// 	header: 'Applicant',
	// 	name: 'node_obj_task_moed_part_detail_apps_open',
	// 	orderDefine: 10,
	// 	owner: 'sys_moed_old',
	// 	parentNodeName: 'node_obj_task_moed_part_list_apps_open'
	// })

	init.addTrans('sysNodeObjTask', {
		children: ['node_obj_task_moed_msg_detail_open'],
		codeIcon: 'AppWindow',
		codeNavType: 'task',
		codeNodeType: 'program',
		data: [{ dataObj: 'data_obj_task_moed_msg_list_open' }],
		header: 'Open Messages',
		isAlwaysRetrieveData: true,
		name: 'node_obj_task_moed_msg_list_open',
		orderDefine: 10,
		owner: 'sys_moed_old'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		data: [
			{ dataObj: 'data_obj_moed_msg_detail' },
			{
				actionClass: 'ct_sys_code_action_class_do',
				actionType: 'doDetailNewMsgReply',
				dataObj: 'data_obj_moed_msg_detail_reply'
			}
		],
		header: 'Applicant',
		name: 'node_obj_task_moed_msg_detail_open',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_task_moed_msg_list_open'
	})
}

function initTasks(init: InitDb) {
	init.addTrans('sysTask', {
		codeCategory: 'default',
		codeIcon: 'Activity',
		codeRenderType: 'button',
		codeStatusObj: 'tso_data',
		exprStatus: `WITH 
  	sfs := (SELECT app_cm::CmClientServiceFlow FILTER .client IN org_moed::MoedParticipant),
  	sfsOpen := (SELECT sfs { days_open := duration_get(cal::to_local_date(datetime_current(), 'UTC') - .dateStart ?? .dateCreated, 'day') } FILTER NOT EXISTS .dateEnd),
  	SELECT {
      openLT6 := {label := 'Open 5 or fewer days', data := count(sfsOpen FILTER .days_open < 6), color := 'green'},
      open6To14 := {label := 'Open between 6 and 14 days', data := count(sfsOpen FILTER .days_open > 5 AND .days_open < 15), color := 'yellow'},
      openGT14 := {label := 'Open 15 or more days', data := count(sfsOpen FILTER .days_open > 14), color := 'red'},
		}`,
		header: 'Open Applications',
		isPinToDash: true,
		isGlobalResource: false,
		name: 'task_moed_part_apps_open',
		targetNodeObj: 'node_obj_task_moed_part_list_apps_open',
		orderDefine: 10,
		owner: 'sys_moed_old'
	})

	init.addTrans('sysTask', {
		codeCategory: 'default',
		codeIcon: 'Activity',
		codeRenderType: 'button',
		codeStatusObj: 'tso_data',
		exprStatus: `WITH 
        sfs := (SELECT app_cm::CmClientServiceFlow filter .client in org_moed::MoedParticipant),
        msgs := (SELECT sys_core::SysMsg FILTER .sender IN sfs.client.person),
        msgsOpen := (SELECT msgs { days_open := duration_get(cal::to_local_date(datetime_current(), 'UTC') - .date, 'day') } FILTER NOT EXISTS .responses),
        SELECT {
          openLT2 := {label := 'Open 5 or fewer days', data := count(msgsOpen FILTER .days_open < 6), color := 'green' },
          open2To7 := {label := 'Open between 6 and 14 days', data := count(msgsOpen FILTER .days_open > 5 AND .days_open < 15), color := 'yellow' },
          openGT7 := {label := 'Open 15 or more days', data := count(msgsOpen FILTER .days_open > 14), color := 'red'},
        }`,
		header: 'Open Messages',
		isPinToDash: true,
		isGlobalResource: false,
		name: 'task_moed_part_msgs_open',
		targetNodeObj: 'node_obj_task_moed_msg_list_open',
		orderDefine: 20,
		owner: 'sys_moed_old'
	})
}
