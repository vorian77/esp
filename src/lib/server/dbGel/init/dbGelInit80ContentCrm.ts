import { InitDb } from '$server/dbGel/init/types.init'

const FILENAME = '$server/dbGel/init/dbGelInit80ContentCrm.ts'

export function initContentCrm(init: InitDb) {
	initClient(init)
	initSuggestion(init)
	initSuggestionModal(init)
}

function initClient(init: InitDb) {
	init.addTrans('sysDataObj', {
		ownerSys: 'sys_app_crm',

		codeCardinality: 'list',
		name: 'data_obj_app_crm_client_list',
		header: 'Clients',
		tables: [{ index: 0, table: 'CrmClient' }],
		exprFilter: '.ownerSys.id IN <user,uuidlist,systemIds>',
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
				columnName: 'name',
				orderCrumb: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'email',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		ownerSys: 'sys_app_crm',

		codeCardinality: 'detail',
		name: 'data_obj_app_crm_client_detail',
		header: 'Client',
		tables: [{ index: 0, table: 'CrmClient' }],
		actionGroup: 'doag_detail',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeFieldElement: 'selectOwnerSys',
				columnName: 'ownerSys',
				orderDefine: 20,
				orderDisplay: 20,
				indexTable: 0,
				isDisplayable: true,
				fieldListItems: 'il_sys_system_by_user'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'email',
				columnName: 'email',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
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
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_start',
				headerAlt: 'Meta',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1060,
				orderDefine: 1060
			},
			{
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_end',
				isDisplayable: true,
				orderDisplay: 1070,
				orderDefine: 1070
			}
		]
	})
	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_app_crm_client_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeApp',
		dataObj: 'data_obj_app_crm_client_list',
		header: 'Clients',
		name: 'node_obj_app_crm_client_list',
		orderDefine: 10,
		ownerSys: 'sys_app_crm'
	})
	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_app_crm_client_detail',
		header: 'Client',
		name: 'node_obj_app_crm_client_detail',
		orderDefine: 10,
		ownerSys: 'sys_app_crm'
	})
}

function initSuggestion(init: InitDb) {
	init.addTrans('sysDataObj', {
		ownerSys: 'sys_app_crm',
		codeCardinality: 'list',
		name: 'data_obj_app_crm_suggestion_list',
		header: 'Suggestions',
		tables: [{ index: 0, table: 'CrmSuggestion' }],
		exprFilter: `.ownerOrg.id = <user,uuid,orgId> OR (SELECT EXISTS <attrsAccess,sys_core::SysObjAttr,allow,[atutaa_sys_admin_global]>)`,
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
				columnName: 'createdAt',
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 10,
				orderDefine: 20,
				orderDisplay: 20,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'ownerOrg',
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['header'],
				linkTable: 'SysOrg',
				orderDefine: 30,
				orderDisplay: 30
			},
			{
				codeAccess: 'readOnly',
				columnName: 'ownerSys',
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['appName'],
				linkTable: 'SysSystem',
				orderDefine: 40,
				orderDisplay: 40
			},
			{
				codeAccess: 'readOnly',
				columnName: 'user',
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['person', 'fullName'],
				linkTable: 'SysUser',
				orderDefine: 50,
				orderDisplay: 50
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isSuggestionFollowUp',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 60,
				orderDisplay: 60
			},
			{
				codeAccess: 'readOnly',
				columnName: 'suggestionEmail',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 70,
				orderDisplay: 70
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 20,
				orderDefine: 80,
				orderDisplay: 80,
				orderSort: 20
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeSuggestionImportance',
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['name'],
				linkTable: 'SysCode',
				orderDefine: 90,
				orderDisplay: 90
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeSuggestionStatus',
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['name'],
				linkTable: 'SysCode',
				orderDefine: 100,
				orderDisplay: 100
			}
		]
	})

	init.addTrans('sysDataObj', {
		ownerSys: 'sys_app_crm',
		codeCardinality: 'detail',
		name: 'data_obj_app_crm_suggestion_detail',
		header: 'Suggestion',
		tables: [{ index: 0, table: 'CrmSuggestion' }],
		actionGroup: 'doag_detail',
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
				orderDefine: 20,
				orderDisplay: 20
			},
			{
				codeAccess: 'readOnly',
				columnName: 'user',
				exprPreset: `(SELECT DETACHED sys_user::SysUser FILTER .id = <user,uuid,id>)`,
				exprSave: `(SELECT sys_user::SysUser FILTER .id = <user,uuid,id>)`,
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['person', 'fullName'],
				linkTable: 'SysUser',
				orderDefine: 30,
				orderDisplay: 30
			},
			{
				columnName: 'ownerOrg',
				exprSave: `(SELECT sys_core::SysOrg FILTER .id = <user,uuid,orgId>)`,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'SysOrg',
				orderDefine: 40
			},
			{
				codeFieldElement: 'selectOwnerSys',
				columnName: 'ownerSys',
				fieldListItems: 'il_sys_system_by_user',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 50,
				orderDisplay: 50
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isSuggestionFollowUp',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				columnName: 'suggestionEmail',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 70,
				orderDisplay: 70
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDefine: 80,
				orderDisplay: 80
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDefine: 90,
				orderDisplay: 90
			},
			{
				columnName: 'name',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 100,
				orderDisplay: 100
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeSuggestionImportance',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0,
				fieldListItems: 'il_sys_code_header_order_index_by_codeType_name',
				fieldListItemsParmValue: 'ct_crm_suggestion_importance'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDefine: 120,
				orderDisplay: 120
			},
			{
				codeFieldElement: 'textArea',
				columnName: 'suggestionTextProblem',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 130,
				orderDisplay: 130
			},
			{
				codeFieldElement: 'textArea',
				columnName: 'suggestionTextSolution',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 140,
				orderDisplay: 140
			},
			{
				codeFieldElement: 'textArea',
				columnName: 'suggestionTextBenefit',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 150,
				orderDisplay: 150
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeSuggestionStatus',
				exprPreset: `(SELECT sys_core::SysCode FILTER .codeType.name = 'ct_crm_suggestion_status' AND .name = 'suggestionStatusOpen' Limit 1)`,
				fieldListItems: 'il_sys_code_header_order_index_by_codeType_name',
				fieldListItemsParmValue: 'ct_crm_suggestion_status',
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['name'],
				linkTable: 'SysCode',
				orderDefine: 160,
				orderDisplay: 160
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'suggestionTextOutcome',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 170,
				orderDisplay: 170
			},

			/* management */
			{
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_start',
				headerAlt: 'Meta',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1060,
				orderDefine: 1060
			},
			{
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_end',
				isDisplayable: true,
				orderDisplay: 1070,
				orderDefine: 1070
			}
		]
	})
	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_app_crm_suggestion_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeApp',
		dataObj: 'data_obj_app_crm_suggestion_list',
		header: 'Suggestions',
		name: 'node_obj_app_crm_suggestion_list',
		orderDefine: 10,
		ownerSys: 'sys_app_crm'
	})
	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_app_crm_suggestion_detail',
		header: 'Suggestion',
		name: 'node_obj_app_crm_suggestion_detail',
		orderDefine: 10,
		ownerSys: 'sys_app_crm'
	})
}

function initSuggestionModal(init: InitDb) {
	init.addTrans('sysDataObj', {
		ownerSys: 'sys_app_crm',
		codeCardinality: 'detail',
		name: 'data_obj_app_crm_suggestion_detail_modal',
		header: 'AppFactory - Suggestion Box',
		tables: [{ index: 0, table: 'CrmSuggestion' }],
		actionGroup: 'doag_detail',
		queryRiders: [
			{
				codeQueryAction: 'userMsg',
				codeQueryPlatform: 'client',
				codeQueryType: 'save',
				codeTriggerTiming: 'post',
				userMsg: 'Thanks for your suggestion! ',
				codeUserMsgDelivery: 'alert'
			}
			// {
			// 	codeQueryAction: 'appDestination',
			// 	codeQueryPlatform: 'client',
			// 	codeQueryType: 'save',
			// 	codeTriggerTiming: 'post',
			// 	navDestination: {
			// 		codeDestinationType: 'home'
			// 	}
			// }
		],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'codeSuggestionStatus',
				exprPreset: `(SELECT sys_core::SysCode FILTER .codeType.name = 'ct_crm_suggestion_status' AND .name = 'suggestionStatusOpen' Limit 1)`,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'SysCode',
				orderDefine: 20
			},
			// {
			// 	codeFieldElement: 'customText',
			// 	columnName: 'custom_element',
			// 	customElement: {
			// 		label:
			// 			'We believe the best ideas come from the people closest to the work. This form gives you a voice in shaping how AppFactory grows and serves.'
			// 	},
			// 	isDisplayable: true,
			// 	orderDisplay: 30,
			// 	orderDefine: 30
			// },
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				headerAlt: 'Contact Information',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDefine: 50,
				orderDisplay: 50
			},
			{
				codeAccess: 'readOnly',
				columnName: 'user',
				exprPreset: `(SELECT DETACHED sys_user::SysUser FILTER .id = <user,uuid,id>)`,
				exprSave: `(SELECT sys_user::SysUser FILTER .id = <user,uuid,id>)`,
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['person', 'fullName'],
				linkTable: 'SysUser',
				orderDefine: 60,
				orderDisplay: 60
			},
			{
				columnName: 'ownerOrg',
				exprSave: `(SELECT sys_core::SysOrg FILTER .id = <user,uuid,orgId>)`,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'SysOrg',
				orderDefine: 70
			},
			{
				codeFieldElement: 'selectOwnerSys',
				columnName: 'ownerSys',
				fieldListItems: 'il_sys_system_by_user',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 80,
				orderDisplay: 80
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isSuggestionFollowUp',
				headerAlt: `I'd Like Follow Up`,
				isDisplayable: true,
				itemChanges: [
					{
						codeAccess: 'required',
						codeItemChangeAction: 'setTargetValue',
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						codeOp: 'true',
						columns: ['suggestionEmail'],
						orderDefine: 0
					},
					{
						codeAccess: 'hidden',
						codeItemChangeAction: 'reset',
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						codeOp: 'false',
						columns: ['suggestionEmail'],
						orderDefine: 1
					}
				],
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				columnName: 'suggestionEmail',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 100,
				orderDisplay: 100
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDefine: 110,
				orderDisplay: 110
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				headerAlt: 'Your Suggestion',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDefine: 140,
				orderDisplay: 140
			},
			{
				columnName: 'name',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 150,
				orderDisplay: 150
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeSuggestionImportance',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160,
				indexTable: 0,
				fieldListItems: 'il_sys_code_header_order_index_by_codeType_name',
				fieldListItemsParmValue: 'ct_crm_suggestion_importance'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDefine: 170,
				orderDisplay: 170
			},
			{
				codeFieldElement: 'customText',
				columnName: 'custom_element',
				customElement: {
					isBold: true,
					label: '1. What challenge or opportunity have you noticed?'
				},
				isDisplayable: true,
				orderDisplay: 200,
				orderDefine: 200
			},
			{
				codeFieldElement: 'textArea',
				columnName: 'suggestionTextProblem',
				headerAlt: '(Describe the problem, need, or idea in your own words.)',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 210,
				orderDisplay: 210
			},
			{
				codeFieldElement: 'customText',
				columnName: 'custom_element',
				customElement: {
					isBold: true,
					label: '2. What is your proposed solution or feature?'
				},
				isDisplayable: true,
				orderDisplay: 220,
				orderDefine: 220
			},
			{
				codeFieldElement: 'textArea',
				columnName: 'suggestionTextSolution',
				headerAlt: '(Explain what you think AppFactory could do differently or better.)',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 230,
				orderDisplay: 230
			},
			{
				codeFieldElement: 'customText',
				columnName: 'custom_element',
				customElement: {
					isBold: true,
					label: '3. Who would benefit most from this suggestion?'
				},
				isDisplayable: true,
				orderDisplay: 240,
				orderDefine: 240
			},
			{
				codeFieldElement: 'textArea',
				columnName: 'suggestionTextBenefit',
				headerAlt: '(Frontline Staff, Administrators/Executives, Customers/Residents, Other)',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 250,
				orderDisplay: 250
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 260,
				orderDefine: 260
			},

			/* management */
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: false,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: false,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: false,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: false,
				orderDisplay: 1050,
				orderDefine: 1050,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_app_crm_suggestion_detail_modal',
		header: 'Suggestion',
		name: 'node_obj_app_crm_suggestion_detail_modal',
		orderDefine: 10,
		ownerSys: 'sys_app_crm'
	})
}
