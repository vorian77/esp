import { InitDb } from '$server/dbGel/init/types.init'
import { ParmsValuesType } from '$utils/types'

const exprCustomObjAttr = `[IS sys_user::SysUser].person.fullName ?? .header ?? .name`

const exprMsgsFromMe = `(SELECT DETACHED sys_core::SysMsg FILTER <user,uuid,id> = .sender.id)`
const exprMsgsToMe = `((SELECT DETACHED sys_core::SysMsg FILTER <user,uuid,id> IN .recipients.id) UNION (SELECT DETACHED sys_core::SysMsg FILTER <attrsAction,oaa_sys_msg_receive> IN .recipients.id))`
const exprMsgsToMeRead = `(SELECT DETACHED sys_core::SysMsg FILTER .id IN ${exprMsgsToMe}.id AND <user,uuid,id> IN .readers.id)`
const exprMsgsToMeUnread = `(SELECT DETACHED sys_core::SysMsg FILTER .id IN ${exprMsgsToMe}.id AND <user,uuid,id> NOT IN .readers.id)`
const exprMsgsMine = `(${exprMsgsFromMe} UNION ${exprMsgsToMe})`
const exprMsgsMineRoot = `(SELECT ${exprMsgsMine} FILTER NOT EXISTS .parent)`

const exprMsgRoot = `(SELECT DETACHED sys_core::SysMsg FILTER .id = <tree,uuid,treeAncestorValue.node.node_obj_task_sys_msg_root_list_all.id>)`
const exprMsgRootHasReply = `(SELECT <user,uuid,id> IN ${exprMsgRoot}.responses.sender.id)`
const exprMsgsThread = `(SELECT ${exprMsgRoot}.thread)`

const exprReadersSetRead = `SET {readers := distinct(.readers UNION (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>))}`
const exprReadersSetUnread = `SET {readers := distinct(.readers EXCEPT (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>))}`

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
		name: 'doCustomSysMsgThreadReply',
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
		actionShows: [
			{
				codeTriggerShow: 'expression',
				expr: `SELECT <tree,uuid,id> IN ${exprMsgsToMeUnread}.id`,
				isRequired: true
			}
		],
		codeAction: 'doExpr',
		codeTriggerEnable: 'always',
		expr: `UPDATE sys_core::SysMsg FILTER .id = <tree,uuid,id> ${exprReadersSetRead}`,
		header: 'Mark as Read',
		name: 'ua_sys_msg_thread_detail_mark_read',
		navDestination: {
			codeDestinationType: 'nodeBack',
			nodeDestination: 'node_obj_task_sys_msg_root_list_all'
		},
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [
			{
				codeTriggerShow: 'expression',
				expr: `SELECT NOT ${exprMsgRootHasReply} AND <tree,uuid,id> IN ${exprMsgsToMeRead}.id`,
				isRequired: true
			}
		],
		codeAction: 'doExpr',
		codeTriggerEnable: 'always',
		expr: `UPDATE sys_core::SysMsg FILTER .id = <tree,uuid,id> ${exprReadersSetUnread}`,
		header: 'Mark as Unread',
		name: 'ua_sys_msg_thread_detail_mark_unread',
		navDestination: {
			codeDestinationType: 'nodeBack',
			nodeDestination: 'node_obj_task_sys_msg_root_list_all'
		},
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
		actionShows: [
			{
				codeTriggerShow: 'expression',
				expr: `SELECT <tree,uuid,id> IN ${exprMsgsToMe}.id`,
				isRequired: true
			}
		],
		codeAction: 'doCustomSysMsgThreadReply',
		codeTriggerEnable: 'always',
		header: 'Reply',
		name: 'ua_sys_msg_thread_detail_view_reply',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [
			{
				codeTriggerShow: 'expression',
				expr: `SELECT count(${exprMsgsThread} INTERSECT ${exprMsgsToMeUnread}) > 0`,
				isRequired: true
			}
		],
		codeAction: 'doExpr',
		codeTriggerEnable: 'always',
		expr: `UPDATE sys_core::SysMsg FILTER .id IN (${exprMsgsThread} INTERSECT ${exprMsgsToMe}).id ${exprReadersSetRead}`,
		header: 'Mark as Read',
		name: 'ua_sys_msg_thread_list_mark_read',
		navDestination: {
			codeDestinationType: 'nodeBack',
			nodeDestination: 'node_obj_task_sys_msg_root_list_all'
		},
		owner: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [
			{
				codeTriggerShow: 'expression',
				expr: `SELECT NOT ${exprMsgRootHasReply} AND count((SELECT sys_core::SysMsg FILTER .id IN (${exprMsgsThread} INTERSECT ${exprMsgsToMeRead}).id)) > 0`,
				isRequired: true
			}
		],
		codeAction: 'doExpr',
		codeTriggerEnable: 'always',
		expr: `UPDATE sys_core::SysMsg FILTER .id IN (${exprMsgsThread} INTERSECT ${exprMsgsToMe}).id ${exprReadersSetUnread}`,
		header: 'Mark as Unread',
		name: 'ua_sys_msg_thread_list_mark_unread',
		navDestination: {
			codeDestinationType: 'nodeBack',
			nodeDestination: 'node_obj_task_sys_msg_root_list_all'
		},
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [
			{
				codeTriggerShow: 'expression',
				expr: `SELECT count(${exprMsgsThread} INTERSECT ${exprMsgsToMe}) > 0 `,
				isRequired: true
			}
		],
		codeAction: 'doCustomSysMsgThreadReply',
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
		name: 'doag_detail_sys_msg_thread_detail_reply',
		owner: 'sys_system'
	})

	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_msg_thread_detail_view_reply',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 0
			},
			{
				action: 'ua_sys_msg_thread_detail_mark_read',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 1
			},
			{
				action: 'ua_sys_msg_thread_detail_mark_unread',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 2
			}
		],
		name: 'doag_detail_sys_msg_thread_detail_view',
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
				action: 'ua_sys_msg_thread_list_mark_read',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 2
			},
			{
				action: 'ua_sys_msg_thread_list_mark_unread',
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
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'taskTarget',
		exprFilter: `.id IN ${exprMsgsMineRoot}.id`,
		header: 'My Messages',
		name: 'data_obj_task_sys_msg_root_list_all',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysMsg' }],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10,
				orderDisplay: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				exprCustom: `'Yes' IF .id IN ${exprMsgsToMeUnread}.id ELSE 'No' IF .id IN ${exprMsgsToMeRead}.id ELSE ''`,
				headerAlt: 'Unread',
				nameCustom: 'isUnread'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_int',
				isDisplayable: true,
				orderDisplay: 32,
				orderDefine: 32,
				exprCustom: `count(.responses)`,
				headerAlt: 'Responses',
				nameCustom: 'customResponses'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_date',
				isDisplayable: true,
				orderDisplay: 34,
				orderDefine: 34,
				exprCustom: `min(cal::to_local_date(.thread.createdAt, 'UTC'))`,
				headerAlt: 'Oldest',
				nameCustom: 'customDateOldest'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_date',
				isDisplayable: true,
				orderDisplay: 36,
				orderDefine: 36,
				exprCustom: `max(cal::to_local_date(.thread.createdAt, 'UTC'))`,
				headerAlt: 'Newest',
				nameCustom: 'customDateNewest'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'sender',
				exprCustom: exprCustomObjAttr,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				linkTable: 'SysObjAttr'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'recipients',
				exprCustom: exprCustomObjAttr,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				linkTable: 'SysObjAttr'
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
		header: 'New Message',
		isRetrieveReadonly: true,
		name: 'data_obj_sys_msg_root_detail_new',
		owner: 'sys_system',
		queryRiders: [
			{
				codeQueryAction: 'appDestination',
				codeQueryPlatform: 'client',
				codeQueryType: 'save',
				codeTriggerTiming: 'post',
				navDestination: {
					codeDestinationType: 'nodeBack',
					nodeDestination: 'node_obj_task_sys_msg_root_list_all'
				}
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
				columnName: 'subject',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'sender',
				exprCustom: exprCustomObjAttr,
				exprPreset: `(SELECT sys_user::SysUser FILTER .id = <user,uuid,id>)`,
				exprSave: `(SELECT sys_user::SysUser FILTER .id = <user,uuid,id>)`,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				linkTable: 'SysObjAttr'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
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
		actionGroup: 'doag_detail_sys_msg_thread_detail_reply',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Reply',
		name: 'data_obj_sys_msg_thread_detail_reply',
		owner: 'sys_system',
		queryRiders: [
			{
				codeQueryAction: 'dbExpr',
				codeQueryPlatform: 'server',
				codeQueryType: 'save',
				codeTriggerTiming: 'post',
				expr: `UPDATE ${exprMsgRoot} ${exprReadersSetRead}`
			},
			{
				codeQueryAction: 'appDestination',
				codeQueryPlatform: 'client',
				codeQueryType: 'save',
				codeTriggerTiming: 'post',
				navDestination: {
					codeDestinationType: 'nodeBack',
					nodeDestination: 'node_obj_task_sys_msg_root_list_all'
				}
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
				codeAccess: 'optional',
				columnName: 'parent',
				exprSave: `(SELECT DETACHED sys_core::SysMsg FILTER .id = <tree,uuid,treeAncestorValue.index.0.id>)`,
				isDisplayable: false,
				orderDefine: 30,
				orderDisplay: 30,
				indexTable: 0,
				linkTable: 'SysMsg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				codeAccess: 'readOnly',
				columnName: 'sender',
				exprCustom: exprCustomObjAttr,
				exprPreset: `(SELECT sys_user::SysUser FILTER .id = <user,uuid,id>)`,
				exprSave: `(SELECT sys_user::SysUser FILTER .id = <user,uuid,id>)`,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				linkTable: 'SysObjAttr'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'recipients',
				exprCustom: exprCustomObjAttr,
				exprPreset: `(SELECT sys_core::SysObjAttr FILTER .id = <tree,uuid,treeAncestorValue.index.0.sender.data>)`,
				exprSave: `(SELECT sys_core::SysObjAttr FILTER .id = <tree,uuid,treeAncestorValue.index.0.sender.data>)`,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				linkTable: 'SysObjAttr'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'subject',
				exprPreset: `<tree,str,treeAncestorValue.node.node_obj_task_sys_msg_root_list_all.subject>`,
				exprSave: `<tree,str,treeAncestorValue.node.node_obj_task_sys_msg_root_list_all.subject>`,
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
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail_sys_msg_thread_detail_view',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'View',
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
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				exprCustom: `'Yes' IF .id IN ${exprMsgsToMeUnread}.id ELSE 'No' IF .id IN ${exprMsgsToMeRead}.id ELSE ''`,
				headerAlt: 'Unread',
				nameCustom: 'isUnread'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_int',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				exprCustom: `count(.responses)`,
				headerAlt: 'Responses',
				nameCustom: 'customResponses'
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
				exprCustom: exprCustomObjAttr,
				exprPreset: `(SELECT default::SysPerson FILTER .id = <user,uuid,personId>)`,
				exprSave: `(SELECT default::SysPerson FILTER .id = <user,uuid,personId>)`,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				linkTable: 'SysObjAttr'
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
				codeAccess: 'readOnly',
				columnName: 'recipients',
				exprCustom: exprCustomObjAttr,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				linkTable: 'SysObjAttr'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list_sys_msg_thread',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: `.id IN ${exprMsgsThread}.id`,
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
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				exprCustom: `'Yes' IF .id IN ${exprMsgsToMeUnread}.id ELSE 'No' IF .id IN ${exprMsgsToMeRead}.id ELSE ''`,
				headerAlt: 'Unread',
				nameCustom: 'isUnread'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_int',
				isDisplayable: true,
				orderDisplay: 32,
				orderDefine: 32,
				exprCustom: `count(.responses)`,
				headerAlt: 'Responses',
				nameCustom: 'customResponses'
			},
			{
				codeAccess: 'readOnly',
				codeSortDir: 'desc',
				columnName: 'createdAt',
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
				exprCustom: exprCustomObjAttr,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				linkTable: 'SysObjAttr'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'recipients',
				exprCustom: exprCustomObjAttr,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				linkTable: 'SysObjAttr'
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
		dataObj: 'data_obj_task_sys_msg_root_list_all',
		header: 'Messages',
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
			{ action: 'doCustomSysMsgThreadReply', node: 'node_obj_sys_msg_thread_detail_reply' },
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
		dataObj: 'data_obj_sys_msg_thread_detail_reply',
		header: 'Message Detail-Reply',
		isAlwaysRetrieveData: true,
		name: 'node_obj_sys_msg_thread_detail_reply',
		orderDefine: 10,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObjProgramObj', {
		actions: [
			{ action: 'doCustomSysMsgThreadReply', node: 'node_obj_sys_msg_thread_detail_reply' }
		],
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
		exprWith: `msgsMineRoot := ${exprMsgsMineRoot}, msgsToMeUnread := ${exprMsgsToMeUnread}`,
		header: 'Messages',
		isPinToDash: false,
		isGlobalResource: true,
		name: 'task_sys_msg_all',
		orderDefine: 0,
		owner: 'sys_system',
		targetNodeObj: 'node_obj_task_sys_msg_root_list_all'
	})

	init.addTrans('sysTask', {
		codeIcon: 'Mail',
		codeRenderType: 'button',
		codeStatusObj: 'tso_sys_data',
		exprShow: `SELECT count(msgsToMeUnread) > 0`,
		exprStatus: `SELECT {
			msgsUnread := {label := 'Unread', data := count(msgsToMeUnread), color := 'green' },
			msgsUnreadOldest := {label := 'Unread-Oldest', data := min(cal::to_local_date(msgsToMeUnread.thread.createdAt, 'UTC')), color := 'green' },
			msgsUnreadNewest := {label := 'Unread-Newest', data := max(cal::to_local_date(msgsToMeUnread.thread.createdAt, 'UTC')), color := 'green' },
			msgsTotal := {label := 'Total', data := count(msgsMineRoot), color := 'green' },
		}`,
		exprWith: `msgsMineRoot := ${exprMsgsMineRoot}, msgsToMeUnread := ${exprMsgsToMeUnread}`,
		header: 'Messages',
		isPinToDash: false,
		isGlobalResource: true,
		name: 'task_sys_msg_unread',
		orderDefine: 0,
		owner: 'sys_system',
		targetNodeObj: 'node_obj_task_sys_msg_root_list_all'
	})
}
