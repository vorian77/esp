import { InitDb } from '$server/dbEdge/init/types.init'

export function initPreEmbedListSelect(init: InitDb) {
	initFieldListSelectCodes(init)
	initFieldListSelectColumns(init)
}

function initFieldListSelectCodes(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: 'none',
		header: 'Select Codes',
		name: 'dofls_sys_admin_sys_code',
		owner: 'sys_system_old',
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
		actionFieldGroupModal: 'doag_dialog_footer_list',
		btnLabelComplete: 'Select Code(s)',
		dataObjList: 'dofls_sys_admin_sys_code',
		name: 'fels_sys_code',
		owner: 'sys_system_old'
	})
}

function initFieldListSelectColumns(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: 'none',
		header: 'Select Columns',
		name: 'dofls_sys_admin_sys_column',
		owner: 'sys_system_old',
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
		actionFieldGroupModal: 'doag_dialog_footer_list',
		btnLabelComplete: 'Select Column(s)',
		dataObjList: 'dofls_sys_admin_sys_column',
		name: 'fels_sys_column',
		owner: 'sys_system_old'
	})
}
