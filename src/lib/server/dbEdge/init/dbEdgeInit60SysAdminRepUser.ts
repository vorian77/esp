import { InitDb } from '$server/dbEdge/init/types.init'

export function initSysRepUser(init: InitDb) {
	initFieldEmbedListEditRepUserParm(init)
	initRepConfig(init)
	initRepRender(init)
}

function initFieldEmbedListEditRepUserParm(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_edit_parm_value',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'embed',
		codeListEditPresetType: 'save',
		exprFilter:
			'.id in (SELECT sys_rep::SysRepUser FILTER .id = <tree,uuid,SysRepUser.id>).parms.id',
		exprOrder: '.parm.orderDefine',
		header: 'Parms',
		isListEdit: true,
		isListSuppressFilterSort: true,
		listEditPresetExpr: `
			WITH 
			repUser := (SELECT sys_rep::SysRepUser FILTER .id = <tree,uuid,SysRepUser.id>),
			repVals := repUser.report.parms,
			userVals := repUser.parms.parm, 
			newVals := (SELECT repVals EXCEPT userVals)
			SELECT newVals`,
		name: 'dofls_sys_rep_user_parm',
		owner: 'sys_system_old',
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
				columnName: 'isRequired',
				indexTable: 1,
				isDisplayable: true,
				isExcludeInsert: true,
				isExcludeUpdate: true,
				orderDefine: 20
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				indexTable: 1,
				isDisplayable: true,
				isExcludeInsert: true,
				isExcludeUpdate: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeAccess: 'readOnly',
				columnName: 'description',
				indexTable: 1,
				isDisplayable: true,
				isExcludeInsert: true,
				isExcludeUpdate: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				codeFieldElement: 'parm',
				columnName: 'parmValue',
				indexTable: 0,
				isDisplayable: true,
				isExcludeInsert: true,
				orderDisplay: 50,
				orderDefine: 50
			},

			{
				columnName: 'codeDataType',
				indexTable: 1,
				isDisplayable: false,
				isExcludeInsert: true,
				isExcludeUpdate: true,
				orderDefine: 60,
				linkColumns: ['name']
			},
			{
				columnName: 'codeFieldElement',
				indexTable: 1,
				isDisplayable: false,
				isExcludeInsert: true,
				isExcludeUpdate: true,
				orderDefine: 70,
				linkColumns: ['name']
			},
			{
				columnName: 'fieldListItems',
				indexTable: 1,
				isDisplayable: false,
				isExcludeInsert: true,
				isExcludeUpdate: true,
				orderDefine: 80,
				linkColumns: ['name']
			},
			{
				columnName: 'fieldListItemsParmName',
				indexTable: 1,
				isDisplayable: false,
				isExcludeInsert: true,
				isExcludeUpdate: true,
				orderDefine: 90
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
			{
				columnName: 'parm',
				exprPreset: `(SELECT sys_rep::SysRepParm FILTER .id = item.id)`,
				indexTable: 0,
				isDisplayable: false,
				isExcludeUpdate: true,
				linkTable: 'SysRepParm',
				orderDefine: 130
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
	init.addTrans('sysDataObjFieldEmbedListEdit', {
		dataObjEmbed: 'dofls_sys_rep_user_parm',
		name: 'fele_sys_rep_user_parm',
		owner: 'sys_system_old'
	})
}

function initRepConfig(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list_report',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeListEditPresetType: 'save',
		exprFilter: '.user.id = <user,uuid,id>',
		header: 'My Reports',
		listEditPresetExpr: `WITH
		userTypeReps := (SELECT (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).userTypes.resources.resource[IS sys_rep::SysRep]),
		userReps := (SELECT sys_rep::SysRepUser FILTER .user.id = <user,uuid,id>).report,
		newVals := (SELECT userTypeReps EXCEPT userReps)
		SELECT newVals`,
		name: 'data_obj_sys_rep_my_report_list',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysRepUser' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'user',
				exprPreset: `(SELECT sys_user::SysUser FILTER .id = <user,uuid,id>)`,
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'SysUser'
			},
			{
				columnName: 'report',
				exprPreset: `item`,
				orderDefine: 30,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'SysRep'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'headerUser',
				exprPreset: `item.header`,
				isDisplayable: true,
				orderCrumb: 10,
				orderDisplay: 40,
				orderDefine: 40,
				orderSort: 10,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDefine: 50,
				exprCustom: `.report.header`,
				headerAlt: 'System Name',
				indexTable: 0,
				nameCustom: 'sysName'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'descriptionUser',
				isDisplayable: true,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDefine: 70,
				exprCustom: `.report.description`,
				headerAlt: 'System Description',
				indexTable: 0,
				nameCustom: 'sysDescription'
			},
			{
				columnName: 'orderDefine',
				orderDefine: 80,
				exprPreset: `(SELECT max((SELECT (SELECT detached sys_rep::SysRepUser FILTER .user.id = <user,uuid,id>).orderDefine ??  0)) + 1)`,
				indexTable: 0,
				isDisplayable: false
			},

			/* management */
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDefine: 1010,
				indexTable: 0,
				isDisplayable: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDefine: 1020,
				indexTable: 0,
				isDisplayable: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDefine: 1030,
				indexTable: 0,
				isDisplayable: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDefine: 1040,
				indexTable: 0,
				isDisplayable: false
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail_report',
		codeCardinality: 'detail',
		codeComponent: 'FormDetailRepConfig',
		header: 'Config',
		name: 'data_obj_sys_rep_my_report_detail',
		owner: 'sys_system_old',
		tables: [
			{ index: 0, table: 'SysRepUser' },
			{ columnParent: 'parms', indexParent: 0, index: 1, table: 'SysRepUserParm' }
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
				exprSave: `(SELECT sys_user::SysUser FILTER .id = <user,uuid,id>)`,
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'SysUser'
			},
			{
				columnName: 'report',
				exprSave: `(SELECT sys_rep::SysRepUser FILTER .id = <tree,uuid,SysRepUser.id>).report`,
				orderDefine: 30,
				indexTable: 0,
				isDisplayable: false,
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
				codeAccess: 'optional',
				codeFieldElement: 'embedListEdit',
				columnName: 'parms',
				isDisplayable: true,
				orderDefine: 120,
				orderDisplay: 120,
				fieldEmbedListEdit: 'fele_sys_rep_user_parm',
				indexTable: 0,
				linkTable: 'SysRepUserParm'
			},
			// {
			// 	codeFieldElement: 'embedListEdit',
			// 	columnName: 'parms',
			// 	isDisplayable: false,
			// 	orderDefine: 120,
			// 	orderDisplay: 120,
			// 	fieldEmbedListEdit: 'fele_sys_rep_user_parm',
			// 	indexTable: 0,
			// 	linkTable: 'SysRepUserParm'
			// },
			// {
			// 	codeAccess: 'optional',
			// 	codeFieldElement: 'embedShell',
			// 	columnName: 'custom_embed_shell',
			// 	headerAlt: 'Report Config',
			// 	isDisplayable: true,
			// 	nameCustom: 'repUserConfig',
			// 	orderDefine: 140,
			// 	orderDisplay: 140
			// },

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

	init.addTrans('updateDataObjColumnCustomEmbedShellFields', {
		dataObjName: 'data_obj_sys_rep_my_report_detail',
		columnName: 'custom_embed_shell',
		customEmbedShellFields: ['parms']
	})
	init.addTrans('sysNodeObjProgram', {
		codeIcon: 'FileChartColumnIncreasing',
		codeNodeType: 'program',
		dataObj: 'data_obj_sys_rep_my_report_list',
		header: 'My Reports',
		name: 'node_obj_sys_rep_my_report_list',
		orderDefine: 40,
		owner: 'sys_system_old'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'FileChartColumnIncreasing',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_sys_rep_my_report_detail',
		header: 'Config',
		name: 'node_obj_sys_rep_my_report_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_rep_my_report_list'
	})
}

function initRepRender(init: InitDb) {
	init.addTrans('sysDataObj', {
		codeComponent: 'FormList',
		codeCardinality: 'list',
		header: 'Run',
		name: 'data_obj_dyn_sys_rep_render',
		owner: 'sys_system_old',
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

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_dyn_sys_rep_render',
		header: 'Run',
		isAlwaysRetrieveData: true,
		isHideRowManager: true,
		name: 'node_obj_sys_rep_render',
		orderDefine: 20,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_rep_my_report_detail'
	})
}
