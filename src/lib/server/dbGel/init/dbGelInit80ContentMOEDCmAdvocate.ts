import { InitDb } from '$server/dbGel/init/types.init'
import { ParmsValuesType } from '$utils/types'

export function initContentMOEDCmAdvocate(init: InitDb) {
	initTaskOpenApps(init)
	// initTaskOpenMsgs(init)

	// initMsgRootList(init)
	// initMsgRootDetailNew(init)
	// initMsgRootDetailEdit(init)

	// initMsgDetailNew(init)
	// initMsgDetailReply(init)
}

function initTaskOpenApps(init: InitDb) {
	init.addTrans('sysDataObjTask', {
		actionGroup: 'doag_list_task',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'taskTarget',
		exprFilter: `.owner.name = 'sys_client_moed' AND NOT EXISTS (SELECT app_cm::CmClientServiceFlow FILTER .client = org_client_moed::MoedParticipant).dateEnd`,
		header: 'Open Applicant Applications',
		name: 'data_obj_task_moed_part_list_apps_open',
		owner: 'sys_client_moed',
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
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client = org_client_moed::MoedParticipant).codeSfEligibilityStatus.name`,
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
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client = org_client_moed::MoedParticipant).dateCreated`,
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
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client = org_client_moed::MoedParticipant).dateStart`,
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
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client = org_client_moed::MoedParticipant).dateEnd`,
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
  			compare :=<cal::local_date>{} if exists (SELECT app_cm::CmClientServiceFlow FILTER .client = org_client_moed::MoedParticipant).dateEnd else (SELECT app_cm::CmClientServiceFlow FILTER .client = org_client_moed::MoedParticipant).dateStart ?? (SELECT app_cm::CmClientServiceFlow FILTER .client = org_client_moed::MoedParticipant).dateCreated,
				dur := now - compare,
				SELECT std::duration_get(dur, 'day'))`,
				headerAlt: 'Days Open',
				nameCustom: 'customAppDaysOpen',
				pattern: '[-+]?[0-9]*[.,]?[0-9]+'
			}
		]
	})

	init.addTrans('sysNodeObjTask', {
		children: [{ node: 'node_obj_moed_part_detail', order: 10 }],
		codeIcon: 'AppWindow',
		codeNavType: 'task',
		codeNodeType: 'program',
		dataObj: 'data_obj_task_moed_part_list_apps_open',
		header: 'Open Applications',
		isAlwaysRetrieveData: true,
		name: 'node_obj_task_moed_part_list_apps_open',
		orderDefine: 10,
		owner: 'sys_client_moed'
	})

	init.addTrans('sysTask', {
		codeIcon: 'Activity',
		codeRenderType: 'button',
		codeStatusObj: 'tso_sys_data',
		exprShow: `SELECT count((SELECT app_cm::CmClientServiceFlow FILTER .client IN org_client_moed::MoedParticipant AND NOT EXISTS .dateEnd)) > 0`,
		exprStatus: `WITH 
  	sfs := (SELECT app_cm::CmClientServiceFlow FILTER .client IN org_client_moed::MoedParticipant),
  	sfsOpen := (SELECT sfs { days_open := duration_get(cal::to_local_date(datetime_current(), 'UTC') - .dateStart ?? .dateCreated, 'day') } FILTER NOT EXISTS .dateEnd),
  	SELECT {
      openLT6 := {label := 'Open 5 or fewer days', data := count(sfsOpen FILTER .days_open < 6), color := 'green'},
      open6To14 := {label := 'Open between 6 and 14 days', data := count(sfsOpen FILTER .days_open > 5 AND .days_open < 15), color := 'yellow'},
      openGT14 := {label := 'Open 15 or more days', data := count(sfsOpen FILTER .days_open > 14), color := 'red'},
		}`,
		header: 'Open Applications',
		isPinToDash: false,
		isGlobalResource: false,
		name: 'task_moed_part_apps_open',
		targetNodeObj: 'node_obj_task_moed_part_list_apps_open',
		orderDefine: 10,
		owner: 'sys_client_moed'
	})
}

function initTaskOpenMsgs(init: InitDb) {
	init.addTrans('sysDataObjTask', {
		actionGroup: 'doag_list_task',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'taskTarget',
		exprFilter: `.id IN (SELECT org_client_moed::MoedParticipant).person.id AND (.id IN (SELECT sys_core::SysMsg FILTER .isOpen).sender.id OR .id IN (SELECT sys_core::SysMsg FILTER .isOpen).recipients.id)`,
		header: 'Applicants With Open Messages',
		name: 'data_obj_task_moed_part_list_msg_open',
		owner: 'sys_client_moed',
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
				orderCrumb: 10,
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				orderCrumb: 20,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'right',
				codeFieldElement: 'number',
				columnName: 'custom_element_int',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				exprCustom: `(SELECT count((SELECT sys_core::SysMsg FILTER .sender.id = default::SysPerson.id AND NOT EXISTS .responses)))`,
				headerAlt: 'Open Message Threads',
				nameCustom: 'customOpenMsgsCnt',
				pattern: '[-+]?[0-9]*[.,]?[0-9]+'
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'right',
				codeFieldElement: 'number',
				columnName: 'custom_element_int',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				exprCustom: `(WITH
				msgDate := (SELECT std::min((SELECT sys_core::SysMsg FILTER .sender.id = default::SysPerson.id AND NOT EXISTS .responses).date)),
				now := cal::to_local_date(datetime_current(), 'UTC'),
				dur := now - msgDate,
				SELECT std::duration_get(dur, 'day'))`,
				headerAlt: 'Days Open (Oldest Open Message)',
				nameCustom: 'customOldestMsgDaysOpenCnt',
				pattern: '[-+]?[0-9]*[.,]?[0-9]+'
			}
		]
	})

	init.addTrans('sysNodeObjTask', {
		children: [{ node: 'node_obj_task_moed_msg_root_list', order: 10 }],
		codeIcon: 'AppWindow',
		codeNavType: 'task',
		codeNodeType: 'program',
		dataObj: 'data_obj_task_moed_part_list_msg_open',
		header: 'Open Messages',
		isAlwaysRetrieveData: true,
		name: 'node_obj_task_moed_part_list_msg_open',
		orderDefine: 10,
		owner: 'sys_client_moed'
	})

	init.addTrans('sysTask', {
		codeIcon: 'Activity',
		codeRenderType: 'button',
		codeStatusObj: 'tso_sys_data',
		exprShow: `WITH
		youth := org_client_moed::MoedParticipant.person
		SELECT count((SELECT sys_core::SysMsg FILTER .isOpen AND (.sender = youth UNION youth IN .recipients))) > 0`,
		exprStatus: `WITH
		youth := org_client_moed::MoedParticipant.person,
		msgsOpen := (SELECT sys_core::SysMsg FILTER .isOpen),
		youthMsgs := (youth {max_days_open := duration_get(cal::to_local_date(datetime_current(), 'UTC') - min((SELECT msgsOpen FILTER youth = .sender or youth IN .recipients).date), 'day') ?? 0})
		SELECT {
			openLT2 := {label := 'Open 5 or fewer days', data := count(youthMsgs FILTER .max_days_open > 0 AND .max_days_open < 6), color := 'green' },
			open2To7 := {label := 'Open between 6 and 14 days', data := count(youthMsgs FILTER .max_days_open > 5 AND .max_days_open < 15), color := 'yellow' },
			openGT7 := {label := 'Open 15 or more days', data := count(youthMsgs FILTER .max_days_open > 14), color := 'red'}
		}`,
		header: 'Participants With Open Messages',
		isPinToDash: false,
		isGlobalResource: false,
		name: 'task_moed_part_msgs_open',
		targetNodeObj: 'node_obj_task_moed_part_list_msg_open',
		orderDefine: 20,
		owner: 'sys_client_moed'
	})
}

function initMsgRootList(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'taskTarget',
		exprFilter: `(<tree,uuid,SysPerson.id> = .sender.id UNION <tree,uuid,SysPerson.id> IN .responses.sender.id UNION <tree,uuid,SysPerson.id> IN .recipients.id)`,
		header: 'Open Messages',
		name: 'data_obj_task_moed_msg_root_list',
		owner: 'sys_client_moed',
		tables: [{ index: 0, table: 'SysMsg' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_bool',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				exprCustom: `'Yes' IF .isOpen ELSE 'No'`,
				headerAlt: 'Open',
				nameCustom: 'isOpenDisplay'
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'right',
				codeFieldElement: 'number',
				columnName: 'custom_element_int',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				exprCustom: `(WITH 
  			now := cal::to_local_date(datetime_current(), 'UTC'),
  			compare :=.date,
				dur := now - compare,
				SELECT (<int64>{} IF EXISTS .responses ELSE (SELECT std::duration_get(dur, 'day'))))`,
				headerAlt: 'Days Since Sent',
				nameCustom: 'customAppDaysOpen',
				pattern: '[-+]?[0-9]*[.,]?[0-9]+'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'date',
				headerAlt: 'Date (Demonstration Only)',
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 10,
				orderDefine: 40,
				orderDisplay: 40,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'sender',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				linkColumns: ['fullName'],
				linkTable: 'SysPerson'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'recipients',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				linkColumns: ['fullName'],
				linkTable: 'SysPerson'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'subject',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				isDisplay: true,
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysNodeObjProgramObj', {
		children: [{ node: 'node_obj_task_moed_msg_root_detail', order: 10 }],
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_task_moed_msg_root_list',
		header: 'Message Threads',
		name: 'node_obj_task_moed_msg_root_list',
		orderDefine: 10,
		owner: 'sys_client_moed'
	})

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		header: 'Message',
		name: 'node_obj_task_moed_msg_root_detail',
		orderDefine: 10,
		owner: 'sys_client_moed'
	})
}

function initMsgRootDetailNew(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail_msg_root_new',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Message',
		isRetrieveReadonly: true,
		name: 'data_obj_task_moed_msg_root_detail_new',
		owner: 'sys_client_moed',
		queryRiders: [
			{
				codeQueryType: 'save',
				codeTriggerTiming: 'post',
				codeType: 'appDestination',
				codeUserDestination: 'back'
			}
		],
		tables: [{ index: 0, table: 'SysMsg' }],
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
				exprPreset: `<fSysToday>`,
				headerAlt: 'Date (Demonstration Only)-Default',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'sender',
				exprPreset: `(SELECT default::SysPerson FILTER .id = <user,uuid,personId>)`,
				exprSave: `(SELECT default::SysPerson FILTER .id = <user,uuid,personId>)`,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				linkColumns: ['fullName'],
				linkTable: 'SysPerson'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'recipients',
				exprPreset: `(SELECT default::SysPerson FILTER .id = <tree,uuid,SysPerson.id>)`,
				exprSave: `(SELECT default::SysPerson FILTER .id = <tree,uuid,SysPerson.id>)`,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				linkColumns: ['fullName'],
				linkTable: 'SysPerson'
			},
			{
				columnName: 'subject',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
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
				orderDisplay: 110,
				orderDefine: 110
			}
		]
	})
}

function initMsgRootDetailEdit(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail_msg_root_edit',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Message',
		isRetrieveReadonly: true,
		name: 'data_obj_task_moed_msg_root_detail_edit',
		owner: 'sys_client_moed',
		tables: [{ index: 0, table: 'SysMsg' }],
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
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'date',
				columnName: 'date',
				exprPreset: `<fSysToday>`,
				headerAlt: 'Date (Demonstration Only)-Default',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'sender',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				linkColumns: ['fullName'],
				linkTable: 'SysPerson'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'recipients',
				exprPreset: `(SELECT default::SysPerson FILTER .id = <tree,uuid,SysPerson.id>)`,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				linkColumns: ['fullName'],
				linkTable: 'SysPerson'
			},
			{
				columnName: 'subject',
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
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120
			}
		]
	})
}

function initMsgDetailNew(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail_msg',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Message',
		// isRetrieveReadonly: true,
		name: 'data_obj_moed_msg_detail_new',
		owner: 'sys_client_moed',
		tables: [{ index: 0, table: 'SysMsg' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'recipients',
				exprSave: `(SELECT default::SysPerson FILTER .id = <tree,uuid,SysPerson.id>)`,
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 30,
				linkTable: 'SysPerson'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			// {
			// 	codeAccess: 'readOnly',
			// 	codeAlignmentAlt: 'center',
			// 	columnName: 'custom_element_str',
			// 	isDisplayable: true,
			// 	orderDefine: 50,
			// 	orderDisplay: 50,
			// 	exprCustom: `NOT EXISTS .parent`,
			// 	headerAlt: 'isRoot',
			// 	nameCustom: 'isRoot'
			// },

			{
				codeFieldElement: 'date',
				columnName: 'date',
				exprPreset: `<fSysToday>`,
				headerAlt: 'Date (Demonstration Only)-Default',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			// {
			// 	codeAccess: 'readOnly',
			// 	columnName: 'createdAt',
			// 	isDisplayable: true,
			// 	orderDisplay: 40,
			// 	orderDefine: 40,
			// 	indexTable: 0
			// },
			{
				columnName: 'subject',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'sender',
				exprPreset: `(SELECT default::SysPerson FILTER .id = <user,uuid,personId>)`,
				exprSave: `(SELECT default::SysPerson FILTER .id = <user,uuid,personId>)`,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				linkColumns: ['fullName'],
				linkTable: 'SysPerson'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140
			}
		]
	})
}

function initMsgDetailReply(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail_msg',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Message',
		isRetrieveReadonly: true,
		name: 'data_obj_moed_msg_detail_reply',
		owner: 'sys_client_moed',
		tables: [{ index: 0, table: 'SysMsg' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			// {
			// 	columnName: 'custom_element_str',
			// 	isDisplayable: false,
			// 	orderDefine: 20,
			// 	exprCustom: `.sender.id`,
			// 	nameCustom: 'recordOwner'
			// },
			// {
			// 	columnName: 'recipients',
			// 	exprSave: `(SELECT org_client_moed::MoedParticipant FILTER .id = <tree,uuid,MoedParticipant.id>).person `,
			// 	indexTable: 0,
			// 	isDisplayable: false,
			// 	orderDefine: 30,
			// 	linkTable: 'SysPerson'
			// },
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			// {
			// 	codeAccess: 'readOnly',
			// 	codeAlignmentAlt: 'center',
			// 	columnName: 'custom_element_str',
			// 	isDisplayable: true,
			// 	orderDefine: 50,
			// 	orderDisplay: 50,
			// 	exprCustom: `NOT EXISTS .parent`,
			// 	headerAlt: 'isRoot',
			// 	nameCustom: 'isRoot'
			// },

			{
				codeFieldElement: 'date',
				columnName: 'date',
				exprPreset: `<fSysToday>`,
				headerAlt: 'Date (Demonstration Only)-Default',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			// {
			// 	codeAccess: 'readOnly',
			// 	columnName: 'createdAt',
			// 	isDisplayable: true,
			// 	orderDisplay: 40,
			// 	orderDefine: 40,
			// 	indexTable: 0
			// },
			{
				codeAccess: 'readOnly',
				columnName: 'sender',
				exprPreset: `(SELECT default::SysPerson FILTER .id = <user,uuid,personId>)`,
				exprSave: `(SELECT default::SysPerson FILTER .id = <user,uuid,personId>)`,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				linkColumns: ['fullName'],
				linkTable: 'SysPerson'
			},
			{
				columnName: 'subject',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140
			}
		]
	})
}
