import { InitDb } from '$server/dbGel/init/types.init'
import { moedDataApplicant } from '$utils/utils.randomDataGenerator'

export function initContentMOEDSsr(init: InitDb) {
	initAttributes(init)

	// tasks
	initTaskSsrApp(init)
	initTaskSsrMsg(init)
	initTaskSsrDoc(init)
	initTaskSsrWelcome(init)

	// demo data
	initDemoData()
	initDemoDataApplicant(init)
	initDemoDataMsg(init)
	initDemoDataServiceFlows(init)
	initDemoDataDoc(init)
	initDemoDataDelete(init)
}

function initTaskSsrApp(init: InitDb) {
	init.addTrans('sysDataObjTask', {
		actionGroup: 'doag_detail_mobile_save',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		codeDataObjType: 'taskTarget',
		codeDoQueryType: 'retrievePreset',
		codeDoRenderPlatform: 'app',
		exprFilter: '.client.person = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person',
		header: 'My Application',
		name: 'data_obj_task_moed_ssr_app',
		owner: 'sys_client_moed',
		queryRiders: [
			{
				codeQueryType: 'save',
				codeTriggerTiming: 'post',
				codeType: 'userMessage',
				userMsg:
					'Your application has been submitted! Now upload your eligibility documents and if you have any questions send us a message.',
				codeUserMsgDelivery: 'alert'
			},
			{
				codeQueryType: 'save',
				codeTriggerTiming: 'post',
				codeType: 'appDestination',
				codeUserDestination: 'home'
			}
		],
		tables: [
			{ index: 0, table: 'CmClientServiceFlow' },
			{
				columnParent: 'client',
				indexParent: 0,
				index: 1,
				isTableExtension: true,
				table: 'MoedParticipant'
			},
			{
				columnParent: 'person',
				exprFilterUpdate: '.id = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person.id',
				indexParent: 1,
				index: 2,
				table: 'SysPerson'
			},
			{
				columnParent: 'programCm',
				indexParent: 0,
				index: 3,
				table: 'CmProgram'
			}
		],
		fields: [
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'Enter your program eligibility information here:' },
				isDisplayable: true,
				orderDisplay: 10,
				orderDefine: 10
			},
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: {
					label: 'The blue colored fields are required and the white colored fields are optional.',
					isSubHeader: true
				},
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20
			},
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 30
			},
			{
				columnName: 'programCm',
				exprSave: `(SELECT assert_single((SELECT app_cm::CmProgram FILTER .name = 'cmp_moed_yo')))`,
				orderDefine: 40,
				indexTable: 0,
				isDisplayable: false,
				linkColumns: ['name'],
				linkTable: 'CmProgram'
			},
			{
				columnName: 'codeSfEnrollType',
				exprPreset: `(SELECT assert_single((sys_core::getCode('ct_cm_sf_enroll_type', 'Self-Registration'))))`,
				orderDefine: 45,
				indexTable: 0,
				isDisplayable: false,
				isExcludeUpdate: true,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				columnName: 'idxDemo',
				exprPreset: `-100`,
				indexTable: 1,
				isDisplayable: false,
				orderDefine: 50
			},
			{
				columnName: 'owner',
				exprSave: `(SELECT sys_core::SysSystem FILTER .id = <parms,uuid,queryOwnerIdSystem>)`,
				orderDefine: 60,
				indexTable: 1,
				isDisplayable: false,
				linkTable: 'SysSystem'
			},
			{
				columnName: 'createdBy',
				isDisplayable: false,
				orderDefine: 70,
				indexTable: 1
			},
			{
				columnName: 'modifiedBy',
				isDisplayable: false,
				orderDefine: 80,
				indexTable: 1
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeSfEligibilityStatus',
				exprPreset: `(SELECT assert_single((sys_core::getCode('ct_cm_sf_eligibility_status', 'New application'))))`,
				orderDefine: 200,
				orderDisplay: 200,
				indexTable: 0,
				isDisplayable: true,
				isExcludeUpdate: true,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'select',
				columnName: 'attrs',
				headerAlt: 'Site',
				isDisplayable: true,
				orderDisplay: 210,
				orderDefine: 210,
				indexTable: 0,
				fieldListItems: 'il_sys_attr_obj_system_types',
				fieldListItemsParmValueList: ['at_cm_sf_site']
			},
			{
				codeFieldElement: 'date',
				columnName: 'dateCreated',
				headerAlt: 'Application Date (yyyy-mm-dd)',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 215,
				orderDefine: 215
			},
			{
				columnName: 'firstName',
				exprPreset: `<user,str,firstName>`,
				isDisplayable: true,
				orderDisplay: 220,
				orderDefine: 220,
				indexTable: 2
			},
			{
				columnName: 'lastName',
				exprPreset: `<user,str,lastName>`,
				isDisplayable: true,
				orderDisplay: 230,
				orderDefine: 230,
				indexTable: 2
			},
			{
				codeFieldElement: 'date',
				columnName: 'birthDate',
				headerAlt: 'Birth Date (yyyy-mm-dd)',
				isDisplayable: true,
				orderDisplay: 240,
				orderDefine: 240,
				indexTable: 2
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textHide',
				columnName: 'ssn',
				isDisplayable: true,
				orderDisplay: 250,
				orderDefine: 250,
				indexTable: 2
			},
			{
				columnName: 'phoneMobile',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 260,
				orderDisplay: 260
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'email',
				columnName: 'email',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 270,
				orderDisplay: 270
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeGender',
				isDisplayable: true,
				orderDisplay: 280,
				orderDefine: 280,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_person_gender',
				itemChanges: [
					{
						codeAccess: 'required',
						codeItemChangeAction: 'none',
						codeItemChangeValueType: 'code',
						codeOp: 'equal',
						columns: ['genderSelfId'],
						orderDefine: 0,
						valueTriggerCodes: [
							{
								owner: 'sys_client_moed',
								codeType: 'ct_sys_person_gender',
								name: 'Prefer to self-identify'
							}
						]
					},
					{
						codeAccess: 'hidden',
						codeItemChangeAction: 'reset',
						codeItemChangeValueType: 'code',
						codeOp: 'notEqual',
						columns: ['genderSelfId'],
						orderDefine: 1,
						valueTriggerCodes: [
							{
								owner: 'sys_client_moed',
								codeType: 'ct_sys_person_gender',
								name: 'Prefer to self-identify'
							}
						]
					}
				]
			},
			{
				codeAccess: 'optional',
				columnName: 'genderSelfId',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 285,
				orderDisplay: 285
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeRace',
				isDisplayable: true,
				orderDisplay: 300,
				orderDefine: 300,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_person_race'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeEthnicity',
				isDisplayable: true,
				orderDisplay: 310,
				orderDefine: 310,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_person_ethnicity'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeDisabilityStatus',
				isDisplayable: true,
				orderDisplay: 320,
				orderDefine: 320,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_person_disability_status'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codePersonLivingArrangements',
				isDisplayable: true,
				itemChanges: [
					{
						codeAccess: 'optional',
						codeItemChangeAction: 'none',
						codeOp: 'notEqual',
						columns: ['addr1', 'addr2', 'city', 'codeState', 'zip'],
						orderDefine: 0,
						valueTriggerCodes: [
							{
								owner: 'sys_client_moed',
								codeType: 'ct_sys_person_living_arrangements',
								name: 'I am currently homeless'
							}
						]
					},
					{
						codeAccess: 'hidden',
						codeOp: 'equal',
						codeItemChangeAction: 'reset',
						columns: ['addr1', 'addr2', 'city', 'codeState', 'zip'],
						orderDefine: 1,
						valueTriggerCodes: [
							{
								owner: 'sys_client_moed',
								codeType: 'ct_sys_person_living_arrangements',
								name: 'I am currently homeless'
							}
						]
					}
				],
				orderDisplay: 325,
				orderDefine: 325,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_person_living_arrangements'
			},
			{
				codeAccess: 'optional',
				columnName: 'addr1',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 330,
				orderDisplay: 330
			},
			{
				codeAccess: 'optional',
				columnName: 'addr2',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 340,
				orderDisplay: 340
			},
			{
				codeAccess: 'optional',
				columnName: 'city',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 350,
				orderDisplay: 350
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeState',
				isDisplayable: true,
				orderDisplay: 360,
				orderDefine: 360,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_state'
			},
			{
				codeAccess: 'optional',
				columnName: 'zip',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 370,
				orderDisplay: 370
			},

			/* management */
			{
				columnName: 'createdAt',
				isDisplayable: false,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				columnName: 'createdBy',
				isDisplayable: false,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				columnName: 'modifiedAt',
				isDisplayable: false,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				columnName: 'modifiedBy',
				isDisplayable: false,
				orderDefine: 1040,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysTask', {
		codeIcon: 'ClipboardPen',
		codeRenderType: 'button',
		codeStatusObj: 'tso_sys_data',
		description: 'First step to my future.',
		exprShow: `SELECT count((SELECT sys_user::SysUser FILTER .id = <user,uuid,id> AND .person.isLegalAgreed = true)) > 0`,
		exprStatus: `WITH
		sf := (SELECT app_cm::CmClientServiceFlow FILTER .client.person = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person ORDER BY .modifiedAt DESC),
		SELECT {
			isShowData := (exists sf),
			applicationDate := {label := 'Application Date', data := sf.dateCreated, color := 'black'},
  		codeEligibilityStatus := {label := 'Current Eligibility Status', data := sf.codeSfEligibilityStatus.name, color := 'black'},
  		lastUpdateBy := {label := 'Last Update By', data := sf.modifiedBy.person.fullName, color := 'black'}
		}`,
		header: 'My Application',
		isPinToDash: false,
		isGlobalResource: false,
		name: 'task_moed_ssr_app',
		noDataMsg: 'Click to start application',
		targetDataObj: 'data_obj_task_moed_ssr_app',
		orderDefine: 30,
		owner: 'sys_client_moed'
	})
}

function initTaskSsrMsg(init: InitDb) {
	init.addTrans('sysDataObjTask', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'taskTarget',
		exprFilter: '<user,uuid,personId> IN (.sender.id UNION .recipients.id)',
		header: 'My Messages',
		name: 'data_obj_task_moed_ssr_msg_list',
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
				columnName: 'parent',
				isDisplayable: false,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				codeSortDir: 'DESC',
				columnName: 'date',
				orderCrumb: 10,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 25,
				orderDefine: 25,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'sender',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				linkColumns: ['fullName'],
				linkTable: 'SysPerson'
			},
			// {
			// 	codeAccess: 'readOnly',
			// 	codeSortDir: 'DESC',
			// 	columnName: 'createdAt',
			// 	orderCrumb: 10,
			// 	orderSort: 10,
			// 	isDisplayable: true,
			// 	orderDisplay: 20,
			// 	orderDefine: 20,
			// 	indexTable: 0
			// },
			{
				codeAccess: 'readOnly',
				columnName: 'subject',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				isDisplay: false,
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObjTask', {
		actionGroup: 'doag_detail_msg',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		codeDataObjType: 'taskTarget',
		header: 'My Message',
		isRetrieveReadonly: true,
		name: 'data_obj_task_moed_ssr_msg_detail',
		owner: 'sys_client_moed',
		queryRiders: [
			{
				codeQueryType: 'retrieve',
				codeTriggerTiming: 'pre',
				codeType: 'databaseExpression',
				expr: `UPDATE sys_core::SysMsg FILTER .id = <tree,uuid,SysMsg.id> SET {isOpen := false}`
			},
			{
				codeQueryType: 'save',
				codeTriggerTiming: 'post',
				codeType: 'userMessage',
				codeUserMsgDelivery: 'toast',
				userMsg: `Your message has been sent. We'll get back with you ASAP!`
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
				columnName: 'custom_element_str',
				isDisplayable: false,
				orderDefine: 40,
				exprCustom: `.sender.id`,
				nameCustom: 'recordOwner'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			},
			{
				codeFieldElement: 'date',
				columnName: 'date',
				headerAlt: 'Date (Demonstration Only)',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'sender',
				exprPreset: `(SELECT default::SysPerson FILTER .id = <user,uuid,personId>)`,
				exprSave: `(SELECT default::SysPerson FILTER .id = <user,uuid,personId>)`,
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
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObjTask', {
		actionGroup: 'doag_detail_msg',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		codeDataObjType: 'taskTarget',
		header: 'My Message',
		isRetrieveReadonly: true,
		name: 'data_obj_task_moed_ssr_msg_detail_reply',
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
				columnName: 'custom_element_str',
				isDisplayable: false,
				orderDefine: 40,
				exprCustom: `.sender.id`,
				nameCustom: 'recordOwner'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			},
			{
				codeFieldElement: 'date',
				columnName: 'date',
				headerAlt: 'Date (Demonstration Only)',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'sender',
				exprPreset: `(SELECT default::SysPerson FILTER .id = <user,uuid,personId>)`,
				exprSave: `(SELECT default::SysPerson FILTER .id = <user,uuid,personId>)`,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				linkColumns: ['fullName'],
				linkTable: 'SysPerson'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'subject',
				exprPreset: `(SELECT default::SysPerson FILTER .id = <parms,str,subject>)`,
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysNodeObjTask', {
		children: ['node_obj_task_moed_ssr_msg_detail'],
		codeIcon: 'AppWindow',
		codeNavType: 'task',
		codeNodeType: 'program',
		data: [{ dataObj: 'data_obj_task_moed_ssr_msg_list' }],
		header: 'My Messages',
		isAlwaysRetrieveData: true,
		name: 'node_obj_task_moed_ssr_msg_list',
		orderDefine: 10,
		owner: 'sys_client_moed'
	})
	init.addTrans('sysNodeObjTask', {
		codeIcon: 'AppWindow',
		codeNavType: 'task',
		codeNodeType: 'program_object',
		data: [
			{ dataObj: 'data_obj_task_moed_ssr_msg_detail' }
			// {
			// 	actionClass: 'ct_sys_code_action_class_custom',
			// 	actionType: 'doDetailMsgReplyCmClient',
			// 	dataObj: 'data_obj_task_moed_ssr_msg_detail_reply'
			// }
		],
		header: 'Message',
		name: 'node_obj_task_moed_ssr_msg_detail',
		orderDefine: 10,
		owner: 'sys_client_moed'
	})

	init.addTrans('sysTask', {
		codeIcon: 'Mail',
		codeRenderType: 'button',
		codeStatusObj: 'tso_sys_data',
		description: 'Have questions? Send messages to program staff.',
		exprShow: `SELECT count((SELECT sys_core::SysMsg FILTER <user,uuid,personId> IN (.sender.id UNION .recipients.id))) > 0`,
		exprStatus: `WITH msgs := (SELECT sys_core::SysMsg FILTER <user,uuid,personId> IN (.sender.id UNION .recipients.id))
		SELECT {
			msgsCnt := {label := 'Total', data := count(msgs), color := 'black'},
			msgsCntOpen := {label := 'Open', data := count(msgs FILTER .isOpen), color := 'black'},
			}`,
		header: 'My Messages',
		isPinToDash: false,
		isGlobalResource: false,
		name: 'task_moed_ssr_app_msg',
		targetNodeObj: 'node_obj_task_moed_ssr_msg_list',
		orderDefine: 50,
		owner: 'sys_client_moed'
	})
}

function initTaskSsrDoc(init: InitDb) {
	init.addTrans('sysDataObjTask', {
		owner: 'sys_client_moed',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		codeDataObjType: 'taskTarget',
		name: 'data_obj_task_moed_ssr_doc_list',
		header: 'My Documents',
		tables: [{ index: 0, table: 'CmCsfDocument' }],
		exprFilter: '.csf.id = <uuid>"78527ffe-13c1-11ef-8756-4f224ba4fd90"',
		actionGroup: 'doag_list',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateIssued',
				headerAlt: 'Date',
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
				orderDefine: 70,
				isDisplay: false,
				isDisplayable: true,
				orderDisplay: 70,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObjTask', {
		actionGroup: 'doag_detail_mobile_save_delete',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		codeDataObjType: 'taskTarget',
		codeDoQueryType: 'retrievePreset',
		codeDoRenderPlatform: 'app',
		exprFilter:
			'.csf.client.person = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person AND <parms,str,itemsParmValue> IN .codeType.codeTypeFamily.name LIMIT 1',
		header: 'My Document',
		name: 'data_obj_task_moed_ssr_doc_detail',
		owner: 'sys_client_moed',
		queryRiders: [
			{
				codeFunction: 'qrfFileStorage',
				codeQueryType: 'save',
				codeTriggerTiming: 'pre',
				codeType: 'customFunction',
				functionParmValue: 'file'
			},
			{
				codeQueryType: 'save',
				codeTriggerTiming: 'post',
				codeType: 'appDestination',
				codeUserDestination: 'back'
			}
		],
		tables: [{ index: 0, table: 'CmCsfDocument' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'csf',
				exprSave: `(SELECT assert_single((SELECT app_cm::CmClientServiceFlow FILTER .client.person = (SELECT sys_user::SysUser FILTER .id = <uuid><user,uuid,id>).person)))`,
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkColumns: ['programCm', 'name'],
				linkTable: 'CmClientServiceFlow'
			},
			{
				codeFieldElement: 'date',
				columnName: 'dateIssued',
				headerAlt: 'Date',
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
				fieldListItems: 'il_sys_code_family_group_order_name_by_codeType_name_system'
			},
			{
				codeFieldElement: 'file',
				columnName: 'file',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				width: 300
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

			/* management */
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: false,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: false,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: false,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: false,
				orderDefine: 1040,
				indexTable: 0
			}
		]
	})
	init.addTrans('sysNodeObjTask', {
		children: ['node_obj_task_moed_ssr_doc_detail'],
		codeIcon: 'AppWindow',
		codeNavType: 'task',
		codeNodeType: 'program',
		data: [{ dataObj: 'data_obj_task_moed_ssr_doc_list' }],
		header: 'Documents',
		name: 'node_obj_task_moed_ssr_doc_list',
		orderDefine: 30,
		owner: 'sys_client_moed'
	})
	init.addTrans('sysNodeObjTask', {
		codeIcon: 'AppWindow',
		codeNavType: 'task',
		codeNodeType: 'program_object',
		data: [{ dataObj: 'data_obj_task_moed_ssr_doc_detail' }],
		header: 'Document',
		name: 'node_obj_task_moed_ssr_doc_detail',
		orderDefine: 10,
		owner: 'sys_client_moed'
	})

	init.addTrans('sysTask', {
		codeIcon: 'ImageUp',
		codeRenderType: 'button',
		codeStatusObj: 'tso_moed_ssr_doc',
		description: 'Step 2: to help speed up my application processing.',
		exprShow: `SELECT count((SELECT app_cm::CmClientServiceFlow FILTER .client.person = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person)) > 0`,
		exprStatus: `SELECT sys_core::SysCodeType { 
  id, 
  name, 
  header,
  _uploaded := (SELECT true IF (SELECT count((SELECT app_cm::CmCsfDocument FILTER .csf.client.person = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person AND sys_core::SysCodeType IN .codeType.codeTypeFamily))) > 0 ELSE false)}
FILTER .parent.name = 'ct_cm_doc_type' ORDER BY .order asc`,
		hasAltOpen: true,
		header: 'My Eligibility Documents',
		isPinToDash: false,
		isGlobalResource: false,
		name: 'task_moed_ssr_app_doc',
		targetDataObj: 'data_obj_task_moed_ssr_doc_detail',
		orderDefine: 40,
		owner: 'sys_client_moed'
	})
}

function initTaskSsrWelcome(init: InitDb) {
	init.addTrans('sysDataObjTask', {
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		codeDataObjType: 'taskPage',
		exprFilter: `.id = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person.id`,
		header: 'Welcome',
		isInitialValidationSilent: true,
		name: 'data_obj_task_moed_ssr_welcome',
		owner: 'sys_client_moed',
		queryRiders: [
			{
				codeQueryType: 'save',
				codeTriggerTiming: 'post',
				codeType: 'userMessage',
				userMsg: 'Great! Next complete your application!',
				codeUserMsgDelivery: 'alert'
			},
			{
				codeQueryType: 'save',
				codeTriggerTiming: 'post',
				codeType: 'appDestination',
				codeUserDestination: 'home'
			}
		],
		tables: [{ index: 0, table: 'SysPerson' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeFieldElement: 'customHTML',
				columnName: 'custom_element',
				customElement: {
					rawHTML: `
		<div class="flex flex-col justify-center gap-4 text-center">
			<h1 class="text-green-400 text-3xl">Welcome</h1>

			<div class="flex justify-center items-center mt-0">
				<img class="w-60" src="src/lib/assets/org_logo_moed.png" alt="Logo" />
			</div>

			<p> <span class="font-bold">Youth Opportunity (YO) Baltimore</span> serves individuals between the ages of 18 and 24 who are out of school and/or looking for employment or connections to college. Operating out of two locations - one in West Baltimore and one in East Baltimore - YO embraces a model that offers a full range of services that lead to your success.</p>
		</div>`
				},
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_start',
				headerAlt: 'Consent To Disclose Personal Information',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				codeFieldElement: 'customText',
				columnName: 'custom_element',
				customElement: {
					align: 'left',
					label: `By registering with Baltimore City Mayor's Office of Employment Development Youth Opportunity Program you agree that the Career Partners can see and use the information contained within your application in order to better provide assistance to you in determining eligibility for assistance in obtaining employment, training for employment, education, or other services. Personal information such as social security number, race, ethnicity, sexual orientation and disability status is being requested for federal record keeping and reporting requirements only and is kept confidential.`
				},
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			},
			{
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_end',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isLegalAgreed',
				headerAlt:
					"I confirm that I have read, consent and agree to YO Baltimore's Consent to Disclose Personal Information.",
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				codeColor: 'secondary',
				codeFieldElement: 'customActionButton',
				columnName: 'custom_element',
				customElement: {
					action: 'ua_sys_save_detail',
					label: 'Get Started!'
				},
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90
			}
		]
	})
	init.addTrans('sysTask', {
		codeIcon: 'ClipboardPen',
		codeRenderType: 'page',
		exprShow: `SELECT count((SELECT sys_user::SysUser FILTER .id = <user,uuid,id> AND (.person.isLegalAgreed = false UNION .person.isLegalAgreed ?= <bool>{}))) > 0`,
		header: 'Welcome',
		isPinToDash: false,
		isGlobalResource: false,
		name: 'task_moed_ssr_welcome',
		pageDataObj: 'data_obj_task_moed_ssr_welcome',
		orderDefine: 20,
		owner: 'sys_client_moed'
	})
}

function initAttributes(init: InitDb) {
	init.addTrans('sysAttr', {
		codeAttrType: 'at_cm_sf_site',
		header: 'Eastside YO Center',
		isGlobalResource: false,
		name: 'moedOfficeEastside',
		owner: 'sys_client_moed'
	})
	init.addTrans('sysAttr', {
		codeAttrType: 'at_cm_sf_site',
		header: 'Westside YO Center',
		isGlobalResource: false,
		name: 'moedOfficeWestside',
		owner: 'sys_client_moed'
	})
}

function initDemoData() {
	moedDataApplicant.setData()
}

function initDemoDataApplicant(init: InitDb) {
	init.addTrans('MoedPBulkPart', moedDataApplicant.data['applicant'])
}

function initDemoDataMsg(init: InitDb) {
	init.addTrans('MoedBulkDataMsg', moedDataApplicant.data['dataMsg'])
}

function initDemoDataServiceFlows(init: InitDb) {
	init.addTrans('MoedBulkCsf', moedDataApplicant.data['serviceFlow'])
}

function initDemoDataDoc(init: InitDb) {
	init.addTrans('MoedBulkDataDoc', moedDataApplicant.data['dataDoc'])
}

function initDemoDataDelete(init: InitDb) {
	init.addTrans('MoedBulkDataDelete', [])
}
