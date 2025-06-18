import { InitDb } from '$server/dbGel/init/types.init'

const exprCustomObjAttr = `[IS sys_user::SysUser].person.fullName ?? .header ?? .name`

const exprMsgsFromMe = `(SELECT DETACHED sys_core::SysMsg FILTER <user,uuid,id> = .sender.id)`
const exprMsgsToMe = `((SELECT DETACHED sys_core::SysMsg FILTER <user,uuid,id> IN .recipients.id) UNION (SELECT DETACHED sys_core::SysMsg FILTER <attrsAction,oaa_sys_msg_receive,object> IN .recipients.id))`
const exprMsgsToMeRead = `(SELECT DETACHED sys_core::SysMsg FILTER .id IN ${exprMsgsToMe}.id AND <user,uuid,id> IN .readers.id)`
const exprMsgsToMeUnread = `(SELECT DETACHED sys_core::SysMsg FILTER .id IN ${exprMsgsToMe}.id AND <user,uuid,id> NOT IN .readers.id)`
const exprMsgsMine = `(${exprMsgsFromMe} UNION ${exprMsgsToMe})`
const exprMsgsMineRoot = `(SELECT ${exprMsgsMine} FILTER NOT EXISTS .parent)`

const exprMsgRoot = `(SELECT DETACHED sys_core::SysMsg FILTER .id = <tree,uuid,treeAncestorValue.node.node_obj_task_sys_msg_root_list_all.id>)`
const exprMsgRootHasReply = `(SELECT <user,uuid,id> IN ${exprMsgRoot}.replies.sender.id)`
const exprMsgsThread = `(SELECT ${exprMsgRoot}.thread)`

const exprReadersSetRead = `SET {readers := distinct(.readers UNION (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>))}`
const exprReadersSetUnread = `SET {readers := distinct(.readers EXCEPT (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>))}`

export function initContentSysMsg(init: InitDb) {
	initUserAction(init)
	initActionGroup(init)
	initDataObj(init)
	initNodeObj(init)
	initTask(init)
}

function initUserAction(init: InitDb) {
	init.addTrans('sysUserAction', {
		codeAction: 'doExpr',
		codeConfirmType: 'statusChanged',
		exprAction: `UPDATE sys_core::SysMsg FILTER .id = <tree,uuid,id> ${exprReadersSetRead}`,
		exprShow: `<expression>`,
		exprShowExpr: `SELECT <tree,uuid,id> IN ${exprMsgsToMeUnread}.id`,
		header: 'Mark as Read',
		name: 'ua_sys_msg_thread_detail_mark_read',
		navDestination: {
			codeDestinationType: 'nodeBack',
			nodeDestination: 'node_obj_task_sys_msg_root_list_all'
		},
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doExpr',
		codeConfirmType: 'statusChanged',
		exprAction: `UPDATE sys_core::SysMsg FILTER .id = <tree,uuid,id> ${exprReadersSetUnread}`,
		exprShow: `<expression>`,
		exprShowExpr: `SELECT NOT ${exprMsgRootHasReply} AND <tree,uuid,id> IN ${exprMsgsToMeRead}.id`,
		header: 'Mark as Unread',
		name: 'ua_sys_msg_thread_detail_mark_unread',
		navDestination: {
			codeDestinationType: 'nodeBack',
			nodeDestination: 'node_obj_task_sys_msg_root_list_all'
		},
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doListDetailNew',
		codeConfirmType: 'statusChanged',
		exprShow: `<expression>`,
		exprShowExpr: `SELECT <tree,uuid,id> IN ${exprMsgsToMe}.id`,
		header: 'Reply',
		name: 'ua_sys_msg_thread_detail_view_reply',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doExpr',
		codeConfirmType: 'statusChanged',
		exprAction: `UPDATE sys_core::SysMsg FILTER .id IN (${exprMsgsThread} INTERSECT ${exprMsgsToMe}).id ${exprReadersSetRead}`,
		exprShow: `<expression>`,
		exprShowExpr: `SELECT count(${exprMsgsThread} INTERSECT ${exprMsgsToMeUnread}) > 0`,
		header: 'Mark as Read',
		name: 'ua_sys_msg_thread_list_mark_read',
		navDestination: {
			codeDestinationType: 'nodeBack',
			nodeDestination: 'node_obj_task_sys_msg_root_list_all'
		},
		owner: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		codeAction: 'doExpr',
		codeConfirmType: 'statusChanged',
		exprAction: `UPDATE sys_core::SysMsg FILTER .id IN (${exprMsgsThread} INTERSECT ${exprMsgsToMe}).id ${exprReadersSetUnread}`,
		exprShow: `<expression>`,
		exprShowExpr: `SELECT NOT ${exprMsgRootHasReply} AND count((SELECT sys_core::SysMsg FILTER .id IN (${exprMsgsThread} INTERSECT ${exprMsgsToMeRead}).id)) > 0`,
		header: 'Mark as Unread',
		name: 'ua_sys_msg_thread_list_mark_unread',
		navDestination: {
			codeDestinationType: 'nodeBack',
			nodeDestination: 'node_obj_task_sys_msg_root_list_all'
		},
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doListDetailNew',
		codeConfirmType: 'statusChanged',
		exprShow: `<expression>`,
		exprShowExpr: `SELECT count(${exprMsgsThread} INTERSECT ${exprMsgsToMe}) > 0`,
		header: 'Reply',
		name: 'ua_sys_msg_thread_list_reply',
		owner: 'sys_system'
	})
}

function initActionGroup(init: InitDb) {
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				headerAlt: 'Send',
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel_detail',
				codeColor: 'primary',
				headerAlt: 'Cancel Send',
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
				headerAlt: 'Send',
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel_detail',
				codeColor: 'primary',
				headerAlt: 'Cancel Send',
				orderDefine: 1
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
				orderDefine: 0
			},
			{
				action: 'ua_sys_msg_thread_detail_mark_read',
				codeColor: 'primary',
				orderDefine: 1
			},
			{
				action: 'ua_sys_msg_thread_detail_mark_unread',
				codeColor: 'primary',
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
				orderDefine: 1
			},
			{
				action: 'ua_sys_msg_thread_list_mark_read',
				codeColor: 'primary',
				orderDefine: 2
			},
			{
				action: 'ua_sys_msg_thread_list_mark_unread',
				codeColor: 'primary',
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
		codeDataObjType: 'taskTarget',
		exprFilter: `.id IN ${exprMsgsMineRoot}.id`,
		gridStyles: [
			{
				exprTrigger: `<record,str,isUnread> === 'Yes'`,
				prop: 'font-weight',
				propValue: 'bold'
			},
			{
				exprTrigger: `<record,str,isUnread> === 'Yes'`,
				prop: 'background-color',
				propValue: 'whitesmoke'
			}
		],
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
				codeAlignmentAlt: 'center',
				columnName: 'custom_element_str',
				isDisplay: false,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				exprCustom: `'Yes' IF .id IN ${exprMsgsToMeUnread}.id ELSE 'No' IF .id IN ${exprMsgsToMeRead}.id ELSE ''`,
				headerAlt: 'Unread',
				nameCustom: 'isUnread'
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'center',
				columnName: 'custom_element_int',
				isDisplay: false,
				isDisplayable: true,
				orderDisplay: 32,
				orderDefine: 32,
				exprCustom: `count(.replies)`,
				headerAlt: 'Replies',
				nameCustom: 'customReplies'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_date',
				isDisplayable: true,
				orderDisplay: 34,
				orderDefine: 34,
				exprCustom: `min(cal::to_local_date(.thread.dateMsg, 'UTC'))`,
				headerAlt: 'Oldest',
				nameCustom: 'customDateOldest'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_date',
				isDisplayable: true,
				orderDisplay: 36,
				orderDefine: 36,
				exprCustom: `max(cal::to_local_date(.thread.dateMsg, 'UTC'))`,
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
				codeAccess: 'readOnly',
				columnName: 'sender',
				exprCustom: exprCustomObjAttr,
				exprPreset: `(SELECT sys_user::SysUser FILTER .id = <user,uuid,id>)`,
				exprSave: `(SELECT sys_user::SysUser FILTER .id = <user,uuid,id>)`,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				linkTable: 'SysObjAttr'
			},
			{
				codeFieldElement: 'chips',
				columnName: 'recipients',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				fieldListItems: 'il_sys_msg_recipients_system'
			},
			{
				columnName: 'subject',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail_sys_msg_thread_detail_reply',
		codeCardinality: 'detail',
		header: 'Reply',
		name: 'data_obj_sys_msg_thread_detail_reply',
		owner: 'sys_system',
		queryRiders: [
			{
				codeQueryAction: 'dbExpr',
				codeQueryPlatform: 'server',
				codeQueryType: 'save',
				codeTriggerTiming: 'post',
				expr: `UPDATE (SELECT DETACHED sys_core::SysMsg FILTER .id = <tree,uuid,treeAncestorValue.node.node_obj_task_sys_msg_root_list_all.id>) ${exprReadersSetRead}`
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
				exprSave: `(SELECT DETACHED sys_core::SysMsg FILTER .id = <tree,uuid,treeAncestorValue.node.node_obj_task_sys_msg_root_list_all.id>)`,
				isDisplayable: false,
				orderDefine: 20,
				orderDisplay: 20,
				indexTable: 0,
				linkTable: 'SysMsg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeAccess: 'readOnly',
				columnName: 'sender',
				exprCustom: exprCustomObjAttr,
				exprPreset: `(SELECT sys_user::SysUser FILTER .id = <user,uuid,id>)`,
				exprSave: `(SELECT sys_user::SysUser FILTER .id = <user,uuid,id>)`,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
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
		actionGroup: 'doag_detail_sys_msg_thread_detail_view',
		codeCardinality: 'detail',
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
				codeAlignmentAlt: 'center',
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
				codeAlignmentAlt: 'center',
				columnName: 'custom_element_int',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				exprCustom: `count(.replies)`,
				headerAlt: 'Replies',
				nameCustom: 'customReplies'
			},
			{
				codeAccess: 'readOnly',
				codeAlignment: 'center',
				columnName: 'dateMsg',
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
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeAccess: 'readOnly',
				columnName: 'recipients',
				exprCustom: exprCustomObjAttr,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				linkTable: 'SysObjAttr'
			},
			{
				columnName: 'subject',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
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
		exprFilter: `.id IN ${exprMsgsThread}.id`,
		gridStyles: [
			{
				exprTrigger: `<record,str,isUnread> === 'Yes'`,
				prop: 'font-weight',
				propValue: 'bold'
			},
			{
				exprTrigger: `<record,str,isUnread> === 'Yes'`,
				prop: 'background-color',
				propValue: 'whitesmoke'
			}
		],
		header: 'Message Thread',
		name: 'data_obj_sys_msg_thread_list',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysMsg' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10,
				orderDisplay: 10
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'center',
				columnName: 'custom_element_str',
				isDisplay: false,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				exprCustom: `'Yes' IF .id IN ${exprMsgsToMeUnread}.id ELSE 'No' IF .id IN ${exprMsgsToMeRead}.id ELSE ''`,
				headerAlt: 'Unread',
				nameCustom: 'isUnread'
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'center',
				columnName: 'custom_element_int',
				isDisplay: false,
				isDisplayable: true,
				orderDisplay: 32,
				orderDefine: 32,
				exprCustom: `count(.replies)`,
				headerAlt: 'Replies',
				nameCustom: 'customReplies'
			},
			{
				codeAccess: 'readOnly',
				codeSortDir: 'desc',
				columnName: 'dateMsg',
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
		codeComponent: 'FormList',
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
		codeComponent: 'FormDetail',
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
			{ action: 'doListDetailNew', node: 'node_obj_sys_msg_thread_detail_reply' },
			{ action: 'doListDetailEdit', node: 'node_obj_sys_msg_thread_detail_view' }
		],
		codeComponent: 'FormList',
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
		codeComponent: 'FormDetail',
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
		actions: [{ action: 'doListDetailNew', node: 'node_obj_sys_msg_thread_detail_reply' }],
		codeComponent: 'FormDetail',
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
			msgsUnreadOldest := {label := 'Unread-Oldest', data := min(cal::to_local_date(msgsToMeUnread.thread.dateMsg, 'UTC')), color := 'green' },
			msgsUnreadNewest := {label := 'Unread-Newest', data := max(cal::to_local_date(msgsToMeUnread.thread.dateMsg, 'UTC')), color := 'green' },
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
