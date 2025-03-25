import { InitDb } from '$server/dbGel/init/types.init'
import { ParmsValuesType } from '$utils/types'

export function initContentSysMsg(init: InitDb) {
	initCodeAction(init)
	initUserAction(init)
	initActionGroup(init)
	initTaskMsgsOpen(init)
	initMsgThread(init)
	initMsgDetail(init)
}

function initCodeAction(init: InitDb) {
	init.addTrans('sysCodeAction', {
		owner: 'sys_app_cm',
		codeType: 'ct_sys_code_action_class_custom',
		name: 'doDetailMsgReplyCmClient',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_app_cm',
		codeType: 'ct_sys_code_action_class_custom',
		name: 'doDetailMsgReplyCmStaff',
		order: 0
	})
}

function initUserAction(init: InitDb) {
	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [
			{ codeTriggerShow: 'notStatusChanged', isRequired: true },
			{ codeTriggerShow: 'notRecordOwner', isRequired: true }
		],
		codeAction: {
			codeType: 'ct_sys_code_action_class_custom',
			name: 'doDetailMsgReplyCmClient'
		},
		codeTriggerEnable: 'always',
		header: 'Reply',
		name: 'ua_sys_msg_reply_moed_participant',
		owner: 'sys_app_cm'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'notStatusChanged', isRequired: true }],
		codeAction: {
			codeType: 'ct_sys_code_action_class_custom',
			name: 'doDetailMsgReplyCmStaff'
		},
		codeTriggerEnable: 'always',
		header: 'Reply',
		name: 'ua_sys_msg_reply_moed_advocate',
		owner: 'sys_app_cm'
	})
}

function initActionGroup(init: InitDb) {
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_sys_new_detail', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{
				action: 'ua_sys_msg_close_thread',
				codeColor: 'secondary',
				isListRowAction: false,
				orderDefine: 1
			},
			{
				action: 'ua_sys_msg_reply_moed_advocate',
				codeColor: 'secondary',
				isListRowAction: false,
				orderDefine: 2
			}
		],
		name: 'doag_detail_cm_msg_advocate_root_edit',
		owner: 'sys_app_cm'
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
			{ action: 'ua_sys_new_detail', codeColor: 'primary', isListRowAction: false, orderDefine: 2 },
			{ action: 'ua_sys_delete_detail', codeColor: 'error', isListRowAction: false, orderDefine: 3 }
		],
		name: 'doag_detail_cm_msg_advocate_root_new',
		owner: 'sys_app_cm'
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
			{ action: 'ua_sys_new_detail', codeColor: 'primary', isListRowAction: false, orderDefine: 2 },
			{
				action: 'ua_sys_msg_reply_moed_advocate',
				codeColor: 'secondary',
				isListRowAction: false,
				orderDefine: 3
			},
			{
				action: 'ua_sys_msg_set_open',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 4
			},
			{ action: 'ua_sys_delete_detail', codeColor: 'error', isListRowAction: false, orderDefine: 5 }
		],
		name: 'doag_detail_cm_msg_advocate_root_reply',
		owner: 'sys_app_cm'
	})
}

function initTaskMsgsOpen(init: InitDb) {
	init.addTrans('sysDataObjTask', {
		actionGroup: 'doag_list',
		attrsAccess: [
			{
				codeAttrAccessSource: 'user',
				codeAttrAccessType: 'permitted',
				codeAttrType: 'at_cm_sf_site'
			}
		],
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'taskTarget',
		exprFilter: `.id IN msgsOpenUser.id AND .exprCustom_customAppDaysOpen > 0`,
		exprWith: `msgsOpenRoot := (SELECT sys_core::SysMsg FILTER NOT EXISTS .parent AND .isOpen),
msgsOpenChildren := (SELECT sys_core::SysMsg FILTER EXISTS .parent AND .isOpen),
msgsOpen := (msgsOpenRoot UNION (SELECT msgsOpenRoot FILTER .responses IN msgsOpenChildren)),
msgsOpenUser := (SELECT msgsOpen FILTER <user,uuid,personId> = .sender.id OR <user,uuid,personId> IN .recipients.id OR ${ParmsValuesType.attributeAccessFilter})`,
		header: 'My Messages',
		name: 'data_obj_task_sys_msg_root_list',
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
				headerAlt: 'Days Open',
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
				codeAlignmentAlt: 'left',
				codeFieldElement: 'string',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				exprCustom: `.attrs.header`,
				headerAlt: 'Attribute(s)',
				nameCustom: 'customAttributes'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'subject',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				isDisplay: true,
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysNodeObjTask', {
		children: ['node_obj_sys_msg_thread_list'],
		codeIcon: 'AppWindow',
		codeNavType: 'task',
		codeNodeType: 'program',
		codeQueryOwnerType: 'queryOwnerTypeSystemUser',
		data: [{ dataObj: 'data_obj_task_sys_msg_root_list' }],
		header: 'Open Messages',
		isAlwaysRetrieveData: true,
		name: 'node_obj_task_sys_msg_root_list',
		orderDefine: 10,
		owner: 'sys_system'
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
		header: 'Open Messages',
		isPinToDash: false,
		isGlobalResource: false,
		name: 'task_sys_msg_open',
		targetNodeObj: 'node_obj_task_sys_msg_root_list',
		orderDefine: 20,
		owner: 'sys_system'
	})
}

function initMsgThread(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '',
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
				SELECT (<int64>{} IF EXISTS .responses ELSE (SELECT std::duration_get(dur, 'day'))))`,
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
				codeAlignmentAlt: 'left',
				codeFieldElement: 'string',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				exprCustom: `.attrs.header`,
				headerAlt: 'Attribute(s)',
				nameCustom: 'customAttributes'
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
		actionGroup: 'doag_detail_msg',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Message (View)',
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
				SELECT (<int64>{} IF EXISTS .responses ELSE (SELECT std::duration_get(dur, 'day'))))`,
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
				codeAlignmentAlt: 'left',
				codeFieldElement: 'string',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				exprCustom: `.attrs.header`,
				headerAlt: 'Attribute(s)',
				nameCustom: 'customAttributes'
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

	init.addTrans('sysNodeObjProgramObj', {
		children: ['node_obj_sys_msg_thread_detail'],
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		data: [
			{
				actionClass: 'ct_sys_code_action_class',
				actionType: 'default',
				dataObj: 'data_obj_sys_msg_thread_list'
			},
			{
				actionClass: 'ct_sys_code_action_class_do',
				actionType: 'doListDetailNew',
				dataObj: 'data_obj_sys_msg_root_detail_new'
			}
		],
		header: 'Messages Thread',
		isAlwaysRetrieveData: true,
		name: 'node_obj_sys_msg_thread_list',
		orderDefine: 10,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		data: [
			{ dataObj: 'data_obj_sys_msg_thread_detail_view' }
			// {
			// 	actionClass: 'ct_sys_code_action_class_custom',
			// 	actionType: 'doDetailMsgReplyCmStaff',
			// 	dataObj: 'data_obj_moed_msg_detail_parent_reply'
			// }
		],
		header: 'Message (View)',
		name: 'node_obj_sys_msg_thread_detail',
		orderDefine: 10,
		owner: 'sys_system'
	})
}

function initMsgDetail(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Message (Detail New)',
		isRetrieveReadonly: true,
		name: 'data_obj_sys_msg_root_detail_new',
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
				exprCustom: `'No' IF EXISTS .parent ELSE 'Yes'`,
				exprPreset: `(SELECT 'Yes')`,
				headerAlt: 'Root',
				nameCustom: 'isRoot',
				isDisplayable: true,
				orderDefine: 30,
				orderDisplay: 30
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'center',
				columnName: 'custom_element_str',
				exprCustom: `'Yes' IF .isOpen ELSE 'No'`,
				exprPreset: `(SELECT 'Yes')`,
				headerAlt: 'Open',
				nameCustom: 'isOpenDisplay',
				isDisplayable: true,
				orderDefine: 40,
				orderDisplay: 40
			},
			{
				codeFieldElement: 'date',
				columnName: 'date',
				// exprPreset: `<fSysToday>`,
				headerAlt: 'Date (Demonstration Only)-Default',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
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
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'attrs',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0,
				fieldListItems: 'il_sys_attr_obj_system'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'recipients',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0,
				fieldListItems: 'il_sys_msg_recipients_system'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 0
			}
		]
	})
}

function initFieldListSelectMsgRecipients(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'embed',
		exprFilter: `.codeType.name = 'ct_sys_attribute_type' AND (.isGlobalResource UNION .owner.id = <tree,uuid,SysSystem.id> UNION .owner IN (SELECT sys_core::SysSystem FILTER .id = <tree,uuid,SysSystem.id>).systemParents)`,
		header: 'Select Attribute Type(s)',
		name: 'dofls_sys_admin_org_user_code_attribute',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysCode' }],
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
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObjFieldEmbedListSelect', {
		actionGroupModal: 'doag_dialog_footer_list',
		btnLabelComplete: 'Select Attribute Type(s)',
		dataObjList: 'dofls_sys_admin_org_user_code_attribute',
		name: 'fels_sys_admin_code_attribute',
		owner: 'sys_system'
	})
}
