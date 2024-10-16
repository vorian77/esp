import { sectionHeader } from '$server/dbEdge/init/dbEdgeInit200Utilities10'
import {
	addDataObj,
	addDataObjFieldEmbedListSelect
} from '$server/dbEdge/init/dbEdgeInit200Utilities20DataObj'
import { addNodeProgramObj } from '$server/dbEdge/init/dbEdgeInit200Utilities50Other'

export async function initSysAdminSystemMeta() {
	sectionHeader('User Administration')
	await initFieldListSelectUserTypes()
	await initSystemMeta()
	await initSystemMetaUser()
}

async function initFieldListSelectUserTypes() {
	sectionHeader('Field List Select - UserTypes')
	await addDataObj({
		actionFieldGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: 'none',
		header: 'Select User Types',
		name: 'dofls_sys_sys_admin_user_type',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysUserType' }],
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
		btnLabelComplete: 'Select UserType(s)',
		dataObjList: 'dofls_sys_sys_admin_user_type',
		name: 'fels_sys_sys_admin_user_type',
		owner: 'sys_system_old'
	})
}

async function initSystemMeta() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: 'none',
		header: 'Systems (Meta)',
		isListEdit: false,
		name: 'data_obj_sys_system_meta_list',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysSystem' }],
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
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 10,
				orderDisplay: 20,
				orderDefine: 20
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'System (Meta)',
		name: 'data_obj_sys_system_meta_detail',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysSystem' }],
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
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_system_meta_list',
		header: 'Systems (Meta)',
		isHideRowManager: false,
		name: 'node_obj_sys_system_meta_list',
		orderDefine: 40,
		owner: 'sys_system_old',
		parentNodeName: 'node_pgm_sys_admin'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_system_meta_detail',
		header: 'System (Meta)',
		isHideRowManager: false,
		name: 'node_obj_sys_system_meta_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_system_meta_list'
	})
}

async function initSystemMetaUser() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysOrg.id>',
		header: 'Users',
		name: 'data_obj_sys_admin_meta_user_list',
		owner: 'sys_system_old',
		tables: [
			{ index: 0, table: 'SysUser' },
			{ columnParent: 'person', indexParent: 0, index: 1, table: 'SysPerson' }
		],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'owner',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'firstName',
				orderCrumb: 20,
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 1
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				orderCrumb: 10,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 1
			},
			{
				codeAccess: 'readOnly',
				columnName: 'userName',
				orderCrumb: 30,
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'User',
		name: 'data_obj_sys_admin_meta_user_detail',
		owner: 'sys_system_old',
		tables: [
			{ index: 0, table: 'SysUser' },
			{ columnParent: 'person', indexParent: 0, index: 1, table: 'SysPerson' }
		],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_core::SysOrg FILTER .id = <tree,uuid,SysOrg.id>)`,
				linkTable: 'SysOrg'
			},
			{
				columnName: 'firstName',
				isDisplayable: true,
				orderDisplay: 22,
				orderDefine: 22,
				indexTable: 1
			},
			{
				columnName: 'lastName',
				isDisplayable: true,
				orderDisplay: 24,
				orderDefine: 24,
				indexTable: 1
			},
			{
				columnName: 'userName',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeFieldElement: 'password',
				columnName: 'password',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'embedListSelect',
				columnName: 'userTypes',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				fieldEmbedListSelect: 'fels_sys_sys_admin_user_type',
				indexTable: 0,
				linkTable: 'SysUserType'
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_meta_user_list',
		header: 'Users',
		isHideRowManager: false,
		name: 'node_obj_sys_admin_meta_user_list',
		orderDefine: 20,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_admin_meta_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_meta_user_detail',
		header: 'User',
		isHideRowManager: false,
		name: 'node_obj_sys_admin_meta_user_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_admin_meta_user_list'
	})
}
