import { InitDb } from '$server/dbGel/init/types.init'

export function initPreEmbedListSelect(init: InitDb) {
	initFieldListSelectCode(init)
	initFieldListSelectCodeTypeFamily(init)
	initFieldListSelectColumn(init)
}

function initFieldListSelectCode(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		exprFilter: 'none',
		header: 'Select Codes',
		name: 'dofls_sys_admin_sys_code',
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
				columnName: 'codeType',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCodeType'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObjFieldEmbedListSelect', {
		actionGroupModal: 'doag_dialog_footer_list',
		btnLabelComplete: 'Select Code(s)',
		dataObjList: 'dofls_sys_admin_sys_code',
		name: 'fels_sys_code',
		owner: 'sys_system'
	})
}

function initFieldListSelectCodeTypeFamily(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		exprFilter:
			'.parent = (SELECT sys_core::SysCode FILTER .id = <tree,uuid,SysCode.id,undefined>).codeType',
		header: 'Select Code Types',
		name: 'dofls_sys_admin_sys_code_type_family',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysCodeType' }],
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
			}
		]
	})

	init.addTrans('sysDataObjFieldEmbedListSelect', {
		actionGroupModal: 'doag_dialog_footer_list',
		btnLabelComplete: 'Select Code Type(s)',
		dataObjList: 'dofls_sys_admin_sys_code_type_family',
		name: 'fels_sys_code_type_family',
		owner: 'sys_system'
	})
}

function initFieldListSelectColumn(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		exprFilter: 'none',
		header: 'Select Columns',
		name: 'dofls_sys_admin_sys_column',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysColumn' }],
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
			}
		]
	})

	init.addTrans('sysDataObjFieldEmbedListSelect', {
		actionGroupModal: 'doag_dialog_footer_list',
		btnLabelComplete: 'Select Column(s)',
		dataObjList: 'dofls_sys_admin_sys_column',
		name: 'fels_sys_column',
		owner: 'sys_system'
	})
}
