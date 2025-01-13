import { InitDb } from '$server/dbEdge/init/types.init'

const FILENAME = '$server/dbEdge/init/dbEdgeInit80ContentCrmRep.ts'

export function initContentCrmRep(init: InitDb) {
	initRepClientDetail(init)
}

function initRepClientDetail(init: InitDb) {
	init.addTrans('sysRep', {
		actionFieldGroup: 'doag_report_render',
		description: '',
		exprFilter: '.owner.id IN <user,uuidlist,systemIds>',
		header: 'Client - Detail',
		name: 'report_crm_client_detail',
		owner: 'sys_app_crm',
		tables: [{ index: 0, table: 'CrmClient' }],
		elements: [
			{
				codeReportElementType: 'column',
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'name',
				indexTable: 0,
				isDisplay: true,
				isDisplayable: true,
				orderDefine: 20,
				orderDisplay: 20,
				orderSort: 10
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'email',
				indexTable: 0,
				isDisplay: true,
				isDisplayable: true,
				orderDefine: 30,
				orderDisplay: 30
			},
			{
				codeFieldElement: 'date',
				codeReportElementType: 'column',
				columnName: 'createdAt',
				indexTable: 0,
				isDisplay: true,
				isDisplayable: true,
				orderDefine: 1000,
				orderDisplay: 1000
			},
			{
				codeFieldElement: 'date',
				codeReportElementType: 'column',
				columnName: 'modifiedAt',
				indexTable: 0,
				isDisplay: true,
				isDisplayable: true,
				orderDefine: 1010,
				orderDisplay: 1010
			}
		]
	})
}
