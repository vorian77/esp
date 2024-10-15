import { sectionHeader } from '$server/dbEdge/init/dbEdgeInit200Utilities10'
import {
	addDataObj,
	addDataObjFieldEmbedListConfig,
	addDataObjFieldEmbedListSelect
} from '$server/dbEdge/init/dbEdgeInit200Utilities20DataObj'
import { addNodeProgramObj } from '$server/dbEdge/init/dbEdgeInit200Utilities50Other'

export async function initAdminObjs() {
	sectionHeader('SysAdmin - Objects')
	await initSystemObjects()
}

async function initSystemObjects() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: 'none',
		header: 'Systems (Objects)',
		isListEdit: false,
		name: 'data_obj_sys_system_object_list',
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
		header: 'System (Object)',
		name: 'data_obj_sys_system_object_detail',
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
		dataObj: 'data_obj_sys_system_object_list',
		header: 'Systems (Objects)',
		isHideRowManager: false,
		name: 'node_obj_sys_system_object_list',
		orderDefine: 30,
		owner: 'sys_system_old',
		parentNodeName: 'node_pgm_sys_admin'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_system_object_detail',
		header: 'System (Object)',
		isHideRowManager: false,
		name: 'node_obj_sys_system_object_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_system_object_list'
	})
}
