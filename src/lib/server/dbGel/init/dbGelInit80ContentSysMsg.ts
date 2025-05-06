import { InitDb } from '$server/dbGel/init/types.init'
import { ParmsValuesType } from '$utils/types'

export function initContentSysMsg(init: InitDb) {
	initCodeAction(init)
	initUserAction(init)
	initActionGroup(init)
	initDataObj(init)
	initNodeObj(init)
	initTask(init)
}

function initCodeAction(init: InitDb) {
	init.addTrans('sysCodeAction', {
		owner: 'sys_app_cm',
		codeType: 'ct_sys_code_action_class_custom',
		name: 'doCustomSysMsgRootDetailSave',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_app_cm',
		codeType: 'ct_sys_code_action_class_custom',
		name: 'doCustomSysMsgThreadDetailClose',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_app_cm',
		codeType: 'ct_sys_code_action_class_custom',
		name: 'doCustomSysMsgThreadDetailReply',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_app_cm',
		codeType: 'ct_sys_code_action_class_custom',
		name: 'doCustomSysMsgThreadDetailSend',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_app_cm',
		codeType: 'ct_sys_code_action_class_custom',
		name: 'doCustomSysMsgThreadListClose',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_app_cm',
		codeType: 'ct_sys_code_action_class_custom',
		name: 'doCustomSysMsgThreadListForward',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_app_cm',
		codeType: 'ct_sys_code_action_class_custom',
		name: 'doCustomSysMsgThreadListReply',
		order: 0
	})
}

function initUserAction(init: InitDb) {
	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionShows: [
			{ codeTriggerShow: 'statusChanged', isRequired: true },
			{ codeTriggerShow: 'saveModeInsert', isRequired: false },
			{ codeTriggerShow: 'saveModeUpdate', isRequired: false }
		],
		codeAction: 'doCustomSysMsgRootDetailSave',
		codeTriggerEnable: 'statusValid',
		header: 'Send',
		name: 'ua_sys_msg_root_detail_send',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeAction: 'doCustomSysMsgThreadDetailClose',
		codeTriggerEnable: 'always',
		header: 'Close Thread',
		name: 'ua_sys_msg_thread_detail_close',
		owner: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeAction: 'doCustomSysMsgThreadDetailReply',
		codeTriggerEnable: 'always',
		header: 'Reply',
		name: 'ua_sys_msg_thread_detail_reply',
		owner: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionShows: [
			{ codeTriggerShow: 'statusChanged', isRequired: true },
			{ codeTriggerShow: 'saveModeInsert', isRequired: false },
			{ codeTriggerShow: 'saveModeUpdate', isRequired: false }
		],
		codeAction: 'doCustomSysMsgThreadDetailSend',
		codeTriggerEnable: 'statusValid',
		header: 'Send',
		name: 'ua_sys_msg_thread_detail_send',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeAction: 'doCustomSysMsgThreadListClose',
		codeTriggerEnable: 'always',
		header: 'Close Thread',
		name: 'ua_sys_msg_thread_list_close',
		owner: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeAction: 'doCustomSysMsgThreadListForward',
		codeTriggerEnable: 'always',
		header: 'Forward',
		name: 'ua_sys_msg_thread_list_forward',
		owner: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeAction: 'doCustomSysMsgThreadListReply',
		codeTriggerEnable: 'always',
		header: 'Reply',
		name: 'ua_sys_msg_thread_list_reply',
		owner: 'sys_system'
	})
}

function initActionGroup(init: InitDb) {
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_msg_root_detail_send',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 1
			}
			// { action: 'ua_sys_delete_detail', codeColor: 'error', isListRowAction: false, orderDefine: 2 }
		],
		name: 'doag_detail_sys_msg_root_send',
		owner: 'sys_system'
	})

	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 1
			},
			{
				action: 'ua_sys_msg_thread_detail_send',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 2
			}
		],
		name: 'doag_detail_sys_msg_thread_forward',
		owner: 'sys_system'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 1
			},
			{
				action: 'ua_sys_msg_thread_detail_send',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 2
			}
		],
		name: 'doag_detail_sys_msg_thread_reply',
		owner: 'sys_system'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 1
			},
			{
				action: 'ua_sys_msg_thread_detail_reply',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 2
			},
			{
				action: 'ua_sys_msg_thread_detail_close',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 3
			}
		],
		name: 'doag_detail_sys_msg_thread_view',
		owner: 'sys_system'
	})

	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_sys_edit_list', codeColor: 'primary', isListRowAction: true, orderDefine: 0 },
			{
				action: 'ua_sys_msg_thread_list_reply',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 1
			},
			{
				action: 'ua_sys_msg_thread_list_forward',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 2
			},
			{
				action: 'ua_sys_msg_thread_list_close',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 3
			}
		],
		name: 'doag_list_sys_msg_thread',
		owner: 'sys_system'
	})
}

function initDataObj(init: InitDb) {
	init.addTrans('sysDataObjTask', {
		actionGroup: 'doag_list',
		attrsAccess: [
			{
				codeAttrAccessSource: 'user',
				codeAttrAccessType: 'permitted',
				codeAttrType: 'at_sys_msg_receive'
			}
		],
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'taskTarget',
		exprFilter: `.id IN msgsUserRootThreadOpen.id`,
		exprWith: `msgsUserOpen := (SELECT sys_core::SysMsg FILTER .isOpen AND (<user,uuid,personId> IN .recipients.id OR ${ParmsValuesType.attributeAccessFilter})),
		msgsUserRootThreadOpen := (SELECT sys_core::SysMsg FILTER NOT EXISTS .parent AND .id IN msgsUserOpen.thread.id)`,
		header: 'My Open Messages',
		name: 'data_obj_task_sys_msg_root_list_open',
		owner: 'sys_system',
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
				codeAlignmentAlt: 'right',
				codeFieldElement: 'number',
				columnName: 'custom_element_int',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				exprCustom: `(WITH 
			now := cal::to_local_date(datetime_current(), 'UTC'),
			compare := min((SELECT .thread FILTER .id = msgsUserOpen.id).date),
			dur := now - compare,
			SELECT std::duration_get(dur, 'day'))`,
				headerAlt: 'Days Open',
				nameCustom: 'customAppDaysOpen',
				pattern: '[-+]?[0-9]*[.,]?[0-9]+'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_int',
				isDisplayable: true,
				orderDisplay: 32,
				orderDefine: 32,
				exprCustom: `count(.thread)`,
				headerAlt: 'Thread - Count',
				nameCustom: 'customThread'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_date',
				isDisplayable: true,
				orderDisplay: 34,
				orderDefine: 34,
				exprCustom: `min(.thread.date)`,
				headerAlt: 'Thread - Oldest',
				nameCustom: 'customThreadDateOld'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_date',
				isDisplayable: true,
				orderDisplay: 36,
				orderDefine: 36,
				exprCustom: `max(.thread.date)`,
				headerAlt: 'Thread - Newest',
				nameCustom: 'customThreadDateNew'
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
				columnName: 'attrs',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				linkColumns: ['obj', 'header'],
				linkTable: 'SysAttr'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'subject',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail_sys_msg_root_send',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'New Root Message',
		isRetrieveReadonly: true,
		name: 'data_obj_sys_msg_root_detail_new',
		owner: 'sys_system',
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
				// exprPreset: `<fSysToday>`,
				headerAlt: 'Date (Demonstration Only)-Default',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
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
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'chips',
				columnName: 'recipients',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0,
				fieldListItems: 'il_sys_msg_recipients_system'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'attrs',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				fieldListItems: 'il_sys_attr_obj_system_type_single_msg_receive',
				fieldListItemsParmValue: 'at_sys_msg_receive'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list_sys_msg_thread',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: `.id IN (SELECT DETACHED sys_core::SysMsg FILTER .id = <tree,uuid,SysMsg.id>).thread.id`,
		header: 'Message Thread',
		name: 'data_obj_sys_msg_thread_list',
		owner: 'sys_system',
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
				exprCustom: `'No' IF EXISTS .parent ELSE 'Yes'`,
				headerAlt: 'Root',
				nameCustom: 'isRoot'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_bool',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
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
				orderDisplay: 40,
				orderDefine: 40,
				exprCustom: `(WITH 
				now := cal::to_local_date(datetime_current(), 'UTC'),
				compare :=.date,
				dur := now - compare,
				SELECT std::duration_get(dur, 'day'))`,
				headerAlt: 'Days Open',
				nameCustom: 'customAppDaysOpen',
				pattern: '[-+]?[0-9]*[.,]?[0-9]+'
			},
			{
				codeAccess: 'readOnly',
				codeSortDir: 'DESC',
				columnName: 'date',
				headerAlt: 'Date (Demonstration Only)',
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 10,
				orderDefine: 50,
				orderDisplay: 50,
				orderSort: 10
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
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				linkColumns: ['fullName'],
				linkTable: 'SysPerson'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'attrs',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				linkColumns: ['obj', 'header'],
				linkTable: 'SysAttr'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'subject',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				isDisplay: true,
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail_sys_msg_thread_forward',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Message (Forward)',
		isRetrieveReadonly: true,
		name: 'data_obj_sys_msg_thread_detail_forward',
		owner: 'sys_system',
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
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'center',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDefine: 30,
				orderDisplay: 30,
				exprCustom: `'No' IF EXISTS .parent ELSE 'Yes'`,
				headerAlt: 'Root',
				nameCustom: 'isRoot'
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'center',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDefine: 40,
				orderDisplay: 40,
				exprCustom: `'Yes' IF .isOpen ELSE 'No'`,
				headerAlt: 'Open',
				nameCustom: 'isOpenDisplay'
			},
			{
				codeFieldElement: 'date',
				columnName: 'date',
				exprPreset: `<fSysToday>`,
				headerAlt: 'Date (Demonstration Only)-Default',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'center',
				codeFieldElement: 'number',
				columnName: 'custom_element_int',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				exprCustom: `(WITH 
				now := cal::to_local_date(datetime_current(), 'UTC'),
				compare :=.date,
				dur := now - compare,
				SELECT std::duration_get(dur, 'day'))`,
				headerAlt: 'Days Open',
				nameCustom: 'customAppDaysOpen',
				pattern: '[-+]?[0-9]*[.,]?[0-9]+'
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
				orderDisplay: 100,
				orderDefine: 100,
				linkColumns: ['fullName'],
				linkTable: 'SysPerson'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'recipients',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				linkColumns: ['fullName'],
				linkTable: 'SysPerson'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'attrs',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				linkColumns: ['obj', 'header'],
				linkTable: 'SysAttr'
			},
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
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail_sys_msg_thread_reply',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: '(Thread) Reply',
		name: 'data_obj_sys_msg_thread_detail_reply',
		owner: 'sys_system',
		queryRiders: [
			{
				codeQueryType: 'save',
				codeTriggerTiming: 'pre',
				codeType: 'dbExpr',
				expr: `UPDATE sys_core::SysMsg FILTER .id IN (SELECT sys_core::SysMsg FILTER .id = <tree,uuid,${ParmsValuesType.treeAncestorValue}.1.id>).thread.id SET {isOpen := false}`
			},
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
				columnName: 'parent',
				exprSave: `(SELECT DETACHED sys_core::SysMsg FILTER .id = <tree,uuid,${ParmsValuesType.treeAncestorValue}.1.id>)`,
				isDisplayable: false,
				orderDefine: 40,
				indexTable: 0,
				linkTable: 'SysMsg'
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
				// exprPreset: `<fSysToday>`,
				headerAlt: 'Date (Demonstration Only)-Default',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
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
				columnName: 'subject',
				exprPreset: `<tree,str,${ParmsValuesType.treeAncestorValue}.0.subject>`,
				exprSave: `<tree,str,${ParmsValuesType.treeAncestorValue}.1.subject>`,
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
				exprPreset: `(SELECT default::SysPerson FILTER .id = <tree,uuid,${ParmsValuesType.treeAncestorValue}.0.sender.data>)`,
				exprSave: `(SELECT default::SysPerson FILTER .id = <tree,uuid,${ParmsValuesType.treeAncestorValue}.1.sender.data>)`,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				linkColumns: ['fullName'],
				linkTable: 'SysPerson'
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
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail_sys_msg_thread_view',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Thread (View)',
		isRetrieveReadonly: true,
		name: 'data_obj_sys_msg_thread_detail_view',
		owner: 'sys_system',
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
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'center',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDefine: 30,
				orderDisplay: 30,
				exprCustom: `'No' IF EXISTS .parent ELSE 'Yes'`,
				headerAlt: 'Root',
				nameCustom: 'isRoot'
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'center',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDefine: 40,
				orderDisplay: 40,
				exprCustom: `'Yes' IF .isOpen ELSE 'No'`,
				headerAlt: 'Open',
				nameCustom: 'isOpenDisplay'
			},
			{
				codeFieldElement: 'date',
				columnName: 'date',
				// exprPreset: `<fSysToday>`,
				headerAlt: 'Date (Demonstration Only)-Default',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			// {
			// 	codeAccess: 'readOnly',
			// 	columnName: 'createdAt',
			// 	isDisplayable: true,
			// 	orderDisplay: 50,
			// 	orderDefine: 50,
			// 	indexTable: 0
			// },
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'center',
				codeFieldElement: 'number',
				columnName: 'custom_element_int',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				exprCustom: `(WITH 
				now := cal::to_local_date(datetime_current(), 'UTC'),
				compare :=.date,
				dur := now - compare,
				SELECT std::duration_get(dur, 'day'))`,
				headerAlt: 'Days Open',
				nameCustom: 'customAppDaysOpen',
				pattern: '[-+]?[0-9]*[.,]?[0-9]+'
			},
			{
				columnName: 'subject',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
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
				orderDisplay: 90,
				orderDefine: 90
			},
			{
				codeAccess: 'readOnly',
				columnName: 'recipients',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				linkColumns: ['fullName'],
				linkTable: 'SysPerson'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'attrs',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				linkColumns: ['obj', 'header'],
				linkTable: 'SysAttr'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObjTask', {
		actionGroup: 'doag_list',
		attrsAccess: [
			{
				codeAttrAccessSource: 'user',
				codeAttrAccessType: 'permitted',
				codeAttrType: 'at_sys_msg_receive'
			}
		],
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'taskTarget',
		// exprFilter: `.id IN msgsUserRoot.id`,
		// exprWith: `msgsUser := (SELECT sys_core::SysMsg FILTER .sender.id = <user,uuid,personId> UNION <user,uuid,personId> IN .recipients.id UNION ${ParmsValuesType.attributeAccessFilter}),
		// msgsUserOpen := (SELECT sys_core::SysMsg FILTER .isOpen AND (<user,uuid,personId> IN .recipients.id UNION ${ParmsValuesType.attributeAccessFilter})),
		// msgsUserRoot := (SELECT sys_core::SysMsg FILTER NOT EXISTS .parent AND .id IN msgsUser.thread.id)`,
		exprFilter: `none`,
		exprUnions: [
			`SELECT sys_core::SysMsg FILTER <user,uuid,personId> = .sender.id`,
			`SELECT sys_core::SysMsg FILTER <user,uuid,personId> IN .recipients.id`,
			`SELECT sys_core::SysMsg FILTER (SELECT sys_core::SysAttrObjAction FILTER .id IN <attrsObjAction,user,aoa_sys_msg_receive>).obj.id IN .recipients.id`
		],
		header: 'My Messages',
		name: 'data_obj_task_sys_msg_root_list_all',
		owner: 'sys_system',
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
			// 	columnName: 'custom_element_str',
			// 	isDisplayable: true,
			// 	orderDisplay: 20,
			// 	orderDefine: 20,
			// 	exprCustom: `'Yes' IF .id IN msgsUserOpen.thread.id ELSE 'No'`,
			// 	headerAlt: 'Awaiting Response',
			// 	nameCustom: 'isAwaitingResponse'
			// },
			// {
			// 	codeAccess: 'readOnly',
			// 	codeAlignmentAlt: 'right',
			// 	codeFieldElement: 'number',
			// 	columnName: 'custom_element_int',
			// 	isDisplayable: true,
			// 	orderDisplay: 30,
			// 	orderDefine: 30,
			// 	exprCustom: `(WITH
			// now := cal::to_local_date(datetime_current(), 'UTC'),
			// compare := min((SELECT .thread FILTER .id = msgsUserOpen.id).date),
			// dur := now - compare,
			// SELECT std::duration_get(dur, 'day'))`,
			// 	headerAlt: 'Days Open',
			// 	nameCustom: 'customAppDaysOpen',
			// 	pattern: '[-+]?[0-9]*[.,]?[0-9]+'
			// },
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_int',
				isDisplayable: true,
				orderDisplay: 32,
				orderDefine: 32,
				exprCustom: `count(.thread)`,
				headerAlt: 'Thread - Count',
				nameCustom: 'customThread'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_date',
				isDisplayable: true,
				orderDisplay: 34,
				orderDefine: 34,
				exprCustom: `min(.thread.date)`,
				headerAlt: 'Thread - Oldest',
				nameCustom: 'customThreadDateOld'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_date',
				isDisplayable: true,
				orderDisplay: 36,
				orderDefine: 36,
				exprCustom: `max(.thread.date)`,
				headerAlt: 'Thread - Newest',
				nameCustom: 'customThreadDateNew'
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
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDefine: 60,
				orderDisplay: 60,
				exprCustom: `.recipients[IS sys_core::ObjRootCore].header ?? .recipients [IS default::SysPerson].fullName`,
				headerAlt: 'Recipients',
				nameCustom: '_recipients'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'attrs',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				linkColumns: ['obj', 'header'],
				linkTable: 'SysAttr'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'subject',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			}
		]
	})
}

function initNodeObj(init: InitDb) {
	init.addTrans('sysNodeObjTask', {
		actions: [
			{ action: 'doListDetailEdit', node: 'node_obj_sys_msg_thread_list' },
			{ action: 'doListDetailNew', node: 'node_obj_sys_msg_root_detail_new' }
		],
		codeIcon: 'Mail',
		codeNavType: 'task',
		codeNodeType: 'program',
		codeQueryOwnerType: 'queryOwnerTypeSystemUser',
		dataObj: 'data_obj_task_sys_msg_root_list_open',
		header: 'My Open Messages',
		isAlwaysRetrieveData: true,
		name: 'node_obj_task_sys_msg_root_list_open',
		orderDefine: 10,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObjTask', {
		actions: [
			{ action: 'doListDetailEdit', node: 'node_obj_sys_msg_thread_list' },
			{ action: 'doListDetailNew', node: 'node_obj_sys_msg_root_detail_new' }
		],
		codeIcon: 'Mail',
		codeNavType: 'task',
		codeNodeType: 'program',
		codeQueryOwnerType: 'queryOwnerTypeSystemUser',
		dataObj: 'data_obj_task_sys_msg_root_list_all',
		header: 'My Messages',
		isAlwaysRetrieveData: true,
		name: 'node_obj_task_sys_msg_root_list_all',
		orderDefine: 10,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'Mail',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_sys_msg_root_detail_new',
		header: 'New Root Message',
		isAlwaysRetrieveData: true,
		name: 'node_obj_sys_msg_root_detail_new',
		orderDefine: 10,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObjProgramObj', {
		actions: [
			{ action: 'doCustomSysMsgThreadListForward', node: 'node_obj_sys_msg_thread_detail_forward' },
			{ action: 'doCustomSysMsgThreadListReply', node: 'node_obj_sys_msg_thread_detail_reply' },
			{ action: 'doListDetailEdit', node: 'node_obj_sys_msg_thread_detail_view' }
		],
		codeIcon: 'Mail',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_sys_msg_thread_list',
		header: 'Message Thread',
		isAlwaysRetrieveData: true,
		name: 'node_obj_sys_msg_thread_list',
		orderDefine: 10,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'Mail',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_sys_msg_thread_detail_forward',
		header: 'Message Detail-Forward',
		isAlwaysRetrieveData: true,
		name: 'node_obj_sys_msg_thread_detail_forward',
		orderDefine: 10,
		owner: 'sys_system'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'Mail',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_sys_msg_thread_detail_reply',
		header: 'Message Detail-Reply',
		isAlwaysRetrieveData: true,
		name: 'node_obj_sys_msg_thread_detail_reply',
		orderDefine: 10,
		owner: 'sys_system'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'Mail',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_sys_msg_thread_detail_view',
		header: 'Message Detail-View',
		isAlwaysRetrieveData: true,
		name: 'node_obj_sys_msg_thread_detail_view',
		orderDefine: 10,
		owner: 'sys_system'
	})
}

function initTask(init: InitDb) {
	init.addTrans('sysTask', {
		codeIcon: 'Mail',
		codeRenderType: 'button',
		codeStatusObj: 'tso_sys_data',
		exprShow: `WITH
		youth := org_client_moed::MoedParticipant.person,
		SELECT count((SELECT sys_core::SysMsg FILTER .isOpen AND .sender.id in youth.id)) > 0`,
		exprStatus: `WITH
		youth := org_client_moed::MoedParticipant.person,
		msgsOpen := (SELECT sys_core::SysMsg FILTER .isOpen AND .sender.id in youth.id),
		msgsOpenRoot := (SELECT sys_core::SysMsg FILTER NOT EXISTS .parent AND .thread.id IN msgsOpen.thread.id),
		msgsOpenRootData := (msgsOpenRoot {max_days_open := duration_get(cal::to_local_date(datetime_current(), 'UTC') - min((SELECT msgsOpenRoot.thread FILTER .id IN msgsOpen.id).date), 'day') ?? 0})
		SELECT {
			openLT2 := {label := 'Open 5 or fewer days', data := count(msgsOpenRootData FILTER .max_days_open > -1 AND .max_days_open < 6), color := 'green' },
			open2To7 := {label := 'Open between 6 and 14 days', data := count(msgsOpenRootData FILTER .max_days_open > 5 AND .max_days_open < 15), color := 'yellow' },
			openGT7 := {label := 'Open 15 or more days', data := count(msgsOpenRootData FILTER .max_days_open > 14), color := 'red'}
		}`,
		header: 'Open Messages (Advocate)',
		isPinToDash: false,
		isGlobalResource: false,
		name: 'task_sys_msg_open',
		orderDefine: 20,
		owner: 'sys_system',
		targetNodeObj: 'node_obj_task_sys_msg_root_list_open'
	})

	init.addTrans('sysTask', {
		codeIcon: 'Mail',
		codeRenderType: 'button',
		codeStatusObj: 'tso_sys_data',
		exprStatus: `WITH
		youth := org_client_moed::MoedParticipant.person,
		msgsOpen := (SELECT sys_core::SysMsg FILTER .isOpen),
		youthMsgs := (youth {max_days_open := duration_get(cal::to_local_date(datetime_current(), 'UTC') - min((SELECT msgsOpen FILTER youth = .sender or youth IN .recipients).date), 'day') ?? 0})
		SELECT {
			openLT2 := {label := 'Open 5 or fewer days', data := count(youthMsgs FILTER .max_days_open > 0 AND .max_days_open < 6), color := 'green' },
			open2To7 := {label := 'Open between 6 and 14 days', data := count(youthMsgs FILTER .max_days_open > 5 AND .max_days_open < 15), color := 'yellow' },
			openGT7 := {label := 'Open 15 or more days', data := count(youthMsgs FILTER .max_days_open > 14), color := 'red'}
		}`,
		header: 'My Messages',
		isPinToDash: false,
		isGlobalResource: true,
		name: 'task_sys_msg_all',
		orderDefine: 0,
		owner: 'sys_system',
		targetNodeObj: 'node_obj_task_sys_msg_root_list_all'
	})
}
