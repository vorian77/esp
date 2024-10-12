import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities10'
import {
	addDataObj,
	addDataObjFieldEmbedListSelect
} from '$server/dbEdge/init/dbEdgeInitUtilities20DataObj'

export async function initAdminSysEmbedListSelect() {
	sectionHeader('SysAdmin - Embed - ListSelect')

	await initFieldListSelectCodes()
	await initFieldListSelectColumns()
}

async function initFieldListSelectCodes() {
	sectionHeader('Field List Select - Codes')
	await addDataObj({
		actionFieldGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: 'none',
		header: 'Select Codes',
		name: 'dofls_sys_admin_sys_code',
		owner: 'sys_app_sys_admin',
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

	await addDataObjFieldEmbedListSelect({
		actionFieldGroupModal: 'doag_dialog_footer_list',
		btnLabelComplete: 'Select Code(s)',
		dataObjList: 'dofls_sys_admin_sys_code',
		name: 'fels_sys_code',
		owner: 'sys_app_sys_admin'
	})
}

async function initFieldListSelectColumns() {
	sectionHeader('Field List Select - Columns')
	await addDataObj({
		actionFieldGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: 'none',
		header: 'Select Columns',
		name: 'dofls_sys_admin_sys_column',
		owner: 'sys_app_sys_admin',
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

	await addDataObjFieldEmbedListSelect({
		actionFieldGroupModal: 'doag_dialog_footer_list',
		btnLabelComplete: 'Select Column(s)',
		dataObjList: 'dofls_sys_admin_sys_column',
		name: 'fels_sys_column',
		owner: 'sys_app_sys_admin'
	})
}
