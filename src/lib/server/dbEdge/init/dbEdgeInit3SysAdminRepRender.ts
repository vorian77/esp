import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities10'
import {
	addDataObj,
	addDataObjFieldEmbedListEdit,
	updateDataObjColumnCustomEmbedShellFields
} from '$server/dbEdge/init/dbEdgeInitUtilities20DataObj'
import { addNodeProgramObj } from '$server/dbEdge/init/dbEdgeInitUtilities50Other'

export async function initAdminSysRepUser() {
	sectionHeader('Admin - Report-Render')
	await initFieldEmbedListEditRepUserElement()
	await initFieldEmbedListEditRepUserParm()
	await initRepConfig()
	await initRepRender()
}

async function initFieldEmbedListEditRepUserElement() {
	sectionHeader('Field Embed Edit - Report User Element')
	await addDataObj({
		actionFieldGroup: 'doag_embed_list_edit',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeListEditPresetType: 'save',
		exprFilter:
			'.id in (SELECT sys_rep::SysRepUser FILTER .id = <parms,uuid,listRecordIdCurrent>).elements.id AND .element.isDisplayable',
		exprOrder: '.orderDisplay',
		header: 'Elements',
		isListEdit: true,
		isListHideSearch: true,
		listEditPresetExpr: `
			WITH 
			repUser := (SELECT sys_rep::SysRepUser FILTER .id = <parms,uuid,listRecordIdCurrent>),
			repVals := repUser.report.elements,
			userVals := repUser.elements.element, 
			newVals := (SELECT repVals EXCEPT userVals)
			SELECT newVals`,
		listReorderColumn: 'orderDisplay',
		name: 'dofls_sys_rep_user_element',
		owner: 'app_sys_rep',
		parentColumn: 'elements',
		parentTable: 'SysRepUser',
		tables: [
			{ index: 0, table: 'SysRepUserEl' },
			{ columnParent: 'element', indexParent: 0, index: 1, table: 'SysRepEl' }
		],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'element',
				exprPreset: '(SELECT sys_rep::SysRepEl FILTER .id = item.id)',
				indexTable: 0,
				isDisplayable: false,
				isExcludeUpdate: true,
				linkTable: 'SysRepEl',
				orderDefine: 20
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isDisplay',
				exprPreset: 'item.isDisplay',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				indexTable: 1,
				isDisplayable: true,
				isExcludeInsert: true,
				isExcludeUpdate: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				codeAccess: 'readOnly',
				columnName: 'description',
				indexTable: 1,
				isDisplayable: true,
				isExcludeInsert: true,
				isExcludeUpdate: true,
				orderDisplay: 50,
				orderDefine: 50
			},
			{
				codeAccess: 'readOnly',
				columnName: 'orderDisplay',
				exprPreset: 'item.orderDefine',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 60,
				orderSort: 10
			},

			/* management */
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1010
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1020
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1030
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1040
			}
		]
	})
	await addDataObjFieldEmbedListEdit({
		dataObjEmbed: 'dofls_sys_rep_user_element',
		name: 'fele_sys_rep_user_element',
		owner: 'app_sys_rep'
	})
}

async function initFieldEmbedListEditRepUserParm() {
	sectionHeader('Field Embed Edit - Report User Parm')
	await addDataObj({
		actionFieldGroup: 'doag_embed_list_edit_parm_value',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeListEditPresetType: 'save',
		exprFilter:
			'.id in (SELECT sys_rep::SysRepUser FILTER .id = <parms,uuid,listRecordIdCurrent>).parms.id',
		exprOrder: '.parm.orderDefine',
		header: 'Parms',
		isListEdit: true,
		isListHideSearch: true,
		listEditPresetExpr: `
			WITH 
			repUser := (SELECT sys_rep::SysRepUser FILTER .id = <parms,uuid,listRecordIdCurrent>),
			repVals := repUser.report.parms,
			userVals := repUser.parms.parm, 
			newVals := (SELECT repVals EXCEPT userVals)
			SELECT newVals`,
		name: 'dofls_sys_rep_user_parm',
		owner: 'app_sys_rep',
		parentColumn: 'parms',
		parentTable: 'SysRepUser',
		tables: [
			{ index: 0, table: 'SysRepUserParm' },
			{ columnParent: 'parm', indexParent: 0, index: 1, table: 'SysRepParm' }
		],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'parm',
				exprPreset: '(SELECT sys_rep::SysRepParm FILTER .id = item.id)',
				indexTable: 0,
				isDisplayable: false,
				isExcludeUpdate: true,
				linkTable: 'SysRepParm',
				orderDefine: 20
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'toggle',
				columnName: 'isRequired',
				indexTable: 1,
				isDisplayable: true,
				isExcludeInsert: true,
				isExcludeUpdate: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				indexTable: 1,
				isDisplayable: true,
				isExcludeInsert: true,
				isExcludeUpdate: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				codeAccess: 'readOnly',
				columnName: 'description',
				indexTable: 1,
				isDisplayable: true,
				isExcludeInsert: true,
				isExcludeUpdate: true,
				orderDisplay: 50,
				orderDefine: 50
			},
			{
				codeFieldElement: 'parm',
				columnName: 'parmValue',
				indexTable: 0,
				isDisplayable: true,
				isExcludeInsert: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				columnName: 'codeDataType',
				indexTable: 1,
				isDisplayable: false,
				isExcludeInsert: true,
				isExcludeUpdate: true,
				orderDefine: 70,
				linkColumns: ['name']
			},
			{
				columnName: 'codeFieldElement',
				indexTable: 1,
				isDisplayable: false,
				isExcludeInsert: true,
				isExcludeUpdate: true,
				orderDefine: 80,
				linkColumns: ['name']
			},
			{
				columnName: 'custom_element_bool',
				isDisplayable: false,
				isExcludeInsert: true,
				isExcludeUpdate: true,
				orderDefine: 90,
				exprCustom: '(SELECT EXISTS .parm.fieldListItems)',
				indexTable: 0,
				nameCustom: '_hasItems'
			},
			{
				columnName: 'isMultiSelect',
				indexTable: 1,
				isDisplayable: false,
				isExcludeInsert: true,
				isExcludeUpdate: true,
				orderDefine: 100
			},
			{
				columnName: 'name',
				indexTable: 1,
				isDisplayable: false,
				isExcludeInsert: true,
				isExcludeUpdate: true,
				orderDefine: 110
			},
			{
				columnName: 'orderDefine',
				indexTable: 1,
				isDisplayable: false,
				isExcludeInsert: true,
				isExcludeUpdate: true,
				orderDefine: 120,
				orderSort: 10
			},

			/* management */
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1010
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1020
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1030
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1040
			}
		]
	})
	await addDataObjFieldEmbedListEdit({
		dataObjEmbed: 'dofls_sys_rep_user_parm',
		name: 'fele_sys_rep_user_parm',
		owner: 'app_sys_rep'
	})
}

async function initRepConfig() {
	await addDataObj({
		actionFieldGroup: 'doag_list_report',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.user.id = <user,uuid,id>',
		header: 'My Reports',
		name: 'data_obj_sys_rep_my_report_list',
		owner: 'app_sys_rep',
		tables: [{ index: 0, table: 'SysRepUser' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'headerUser',
				orderCrumb: 10,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				exprCustom: `.report.header`,
				headerAlt: 'System Name',
				indexTable: 0,
				nameCustom: 'sysName'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'descriptionUser',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				exprCustom: `.report.description`,
				headerAlt: 'System Description',
				indexTable: 0,
				nameCustom: 'sysDescription'
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail_report',
		codeCardinality: 'detail',
		codeComponent: 'FormDetailRepConfig',
		header: 'Config',
		name: 'data_obj_sys_rep_my_report_detail',
		owner: 'app_sys_rep',
		tables: [
			{ index: 0, table: 'SysRepUser' },
			{ columnParent: 'parms', indexParent: 0, index: 1, table: 'SysRepUserParm' },
			{ columnParent: 'elements', indexParent: 0, index: 2, table: 'SysRepUserEl' }
		],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'user',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_user::SysUser FILTER .id = <user,uuid,id>)`,
				linkTable: 'SysUser'
			},
			{
				columnName: 'report',
				orderDefine: 30,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_rep::SysRepUser FILTER .id = <tree,uuid,SysRepUser.id>).report`,
				linkTable: 'SysRep'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				columnName: 'headerUser',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				exprCustom: `.report.header`,
				headerAlt: 'System Name',
				indexTable: 0,
				nameCustom: 'sysName'
			},
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
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'descriptionUser',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'textArea',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				exprCustom: `.report.description`,
				headerAlt: 'System Description',
				indexTable: 0,
				nameCustom: 'sysDescription'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110
			},
			{
				codeFieldElement: 'embedListEdit',
				columnName: 'parms',
				isDisplayable: true,
				orderDefine: 120,
				orderDisplay: 120,
				fieldEmbedListEdit: 'fele_sys_rep_user_parm',
				indexTable: 0,
				linkTable: 'SysRepUserParm'
			},
			{
				codeFieldElement: 'embedListEdit',
				columnName: 'elements',
				isDisplayable: true,
				orderDefine: 130,
				orderDisplay: 130,
				fieldEmbedListEdit: 'fele_sys_rep_user_element',
				indexTable: 0,
				linkTable: 'SysRepUserEl'
			},
			// {
			// 	codeFieldElement: 'embedShell',
			// 	columnName: 'custom_embed_shell',
			// 	isDisplayable: true,
			// 	headerAlt: 'Report Config',
			// 	nameCustom: 'repUserConfig',
			// 	orderDisplay: 140,
			// 	orderDefine: 140
			// },

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

	await updateDataObjColumnCustomEmbedShellFields({
		dataObjName: 'data_obj_sys_rep_my_report_detail',
		columnName: 'custom_embed_shell',
		customEmbedShellFields: ['parms', 'elements']
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_rep_my_report_list',
		header: 'My Reports',
		name: 'node_obj_sys_rep_my_report_list',
		orderDefine: 10,
		owner: 'app_sys_rep',
		parentNodeName: 'node_hdr_cm_ai_reports'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_rep_my_report_detail',
		header: 'Config',
		name: 'node_obj_sys_rep_my_report_detail',
		orderDefine: 10,
		owner: 'app_sys_rep',
		parentNodeName: 'node_obj_sys_rep_my_report_list'
	})
}

async function initRepRender() {
	await addDataObj({
		codeComponent: 'FormList',
		codeCardinality: 'list',
		header: 'Run',
		name: 'data_obj_dyn_sys_rep_render',
		owner: 'app_sys_rep',
		processType: 'reportRender',
		tables: [{ index: 0, table: 'SysRepUser' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 10,
				orderDisplay: 10
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_dyn_sys_rep_render',
		header: 'Run',
		name: 'node_obj_sys_rep_render',
		orderDefine: 20,
		owner: 'app_sys_rep',
		parentNodeName: 'node_obj_sys_rep_my_report_detail'
	})
}
