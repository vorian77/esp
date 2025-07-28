import { InitDb } from '$server/dbGel/init/types.init'

const FILENAME = '$server/dbGel/init/dbGelInit80ContentCrm.ts'

export function initContentCrm(init: InitDb) {
	initClient(init)
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
