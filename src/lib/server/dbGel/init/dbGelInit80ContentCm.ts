import { InitDb } from '$server/dbGel/init/types.init'

const FILENAME = '$server/dbGel/init/dbGelInit80ContentCm.ts'

export function initContentCm(init: InitDb) {
	initPrograms(init)
	initSites(init)
}

function initPrograms(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		exprFilter: '.ownerSys.id = <tree,uuid,SysSystem.id>',
		header: 'Programs',
		name: 'data_obj_cm_program_list',
		ownerSys: 'sys_system',
		tables: [{ index: 0, table: 'CmProgram' }],
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
			},
			{
				codeAccess: 'readOnly',
				columnName: 'sysEligibility',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['header'],
				linkTable: 'SysEligibility'
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		header: 'Program',
		name: 'data_obj_cm_program_detail',
		ownerSys: 'sys_system',
		tables: [{ index: 0, table: 'CmProgram' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'ownerSys',
				exprSave: `(SELECT sys_core::SysSystem FILTER .id = <tree,uuid,SysSystem.id>)`,
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'SysSystem'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 25,
				orderDefine: 25
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'sysEligibility',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_elig_sys'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
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
		children: [{ node: 'node_obj_cm_program_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_cm_program_list',
		header: 'Programs',
		name: 'node_obj_cm_program_list',
		orderDefine: 50,
		ownerSys: 'sys_system'
	})

	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_cm_program_detail',
		header: 'Program',
		name: 'node_obj_cm_program_detail',
		orderDefine: 10,
		ownerSys: 'sys_system'
	})
}

function initSites(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		exprFilter: '.ownerSys.id = <tree,uuid,SysSystem.id>',
		header: 'Sites',
		name: 'data_obj_cm_site_list',
		ownerSys: 'sys_system',
		tables: [{ index: 0, table: 'CmSite' }],
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

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		header: 'Site',
		name: 'data_obj_cm_site_detail',
		ownerSys: 'sys_system',
		tables: [{ index: 0, table: 'CmSite' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'ownerSys',
				exprSave: `(SELECT sys_core::SysSystem FILTER .id = <tree,uuid,SysSystem.id>)`,
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'SysSystem'
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
				columnName: 'header',
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
		children: [{ node: 'node_obj_cm_site_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_cm_site_list',
		header: 'Sites',
		name: 'node_obj_cm_site_list',
		orderDefine: 50,
		ownerSys: 'sys_system'
	})

	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_cm_site_detail',
		header: 'Site',
		name: 'node_obj_cm_site_detail',
		orderDefine: 10,
		ownerSys: 'sys_system'
	})
}
