import { InitDb } from '$server/dbGel/init/types.init'

export function initContentMOEDRep(init: InitDb) {
	initAnalytic(init)
	initReport(init)
}

function initAnalytic(init: InitDb) {
	init.addTrans('sysAnalytic', {
		header: 'MOED Analytic - Self Service Registration',
		name: 'analytic_moed_self_serv_reg',
		ownerSys: 'sys_client_baltimore_moed',
		statuses: [
			{
				codeStatus: 'met',
				expr: '85'
			},
			{
				codeStatus: 'medium',
				expr: '70'
			},
			{
				codeStatus: 'high',
				expr: '0'
			}
		]
	})
}

function initReport(init: InitDb) {
	init.addTrans('sysRep', {
		actionGroup: 'doag_report_render',
		exprFilter: '.client IN org_client_baltimore::MoedParticipant',
		header: 'Self Service Registration - Student Status',
		name: 'report_moed_self_serv_student_status',
		ownerSys: 'sys_client_baltimore_moed',
		tables: [
			{ index: 0, table: 'CmClientServiceFlow' },
			{ columnParent: 'client', indexParent: 0, index: 1, table: 'MoedParticipant' },
			{ columnParent: 'person', indexParent: 1, index: 2, table: 'SysPerson' }
		],
		elements: [
			{
				codeReportElementType: 'column',
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 0
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'firstName',
				indexTable: 2,
				isDisplay: true,
				isDisplayable: true,
				orderDefine: 10,
				orderDisplay: 10,
				orderSort: 20
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'lastName',
				indexTable: 2,
				isDisplay: true,
				isDisplayable: true,
				orderDefine: 20,
				orderDisplay: 20,
				orderSort: 10
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'birthDate',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				orderDefine: 30,
				orderDisplay: 30
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'ssn',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				orderDefine: 40,
				orderDisplay: 40
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'phoneMobile',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				orderDefine: 50,
				orderDisplay: 50
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'email',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				orderDefine: 60,
				orderDisplay: 60
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'codeGender',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				linkColumns: ['name'],
				orderDefine: 70,
				orderDisplay: 70
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'genderSelfId',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				orderDefine: 75,
				orderDisplay: 75
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'codeRace',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				linkColumns: ['name'],
				orderDefine: 80,
				orderDisplay: 80
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'codeEthnicity',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				linkColumns: ['name'],
				orderDefine: 90,
				orderDisplay: 90
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'codeDisabilityStatus',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				linkColumns: ['name'],
				orderDefine: 100,
				orderDisplay: 100
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'addr1',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				orderDefine: 110,
				orderDisplay: 110
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'addr2',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				orderDefine: 120,
				orderDisplay: 120
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'city',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				orderDefine: 130,
				orderDisplay: 130
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'codeState',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				linkColumns: ['name'],
				orderDefine: 140,
				orderDisplay: 140
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'zip',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				orderDefine: 150,
				orderDisplay: 150
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'cmSite',
				header: 'Site',
				indexTable: 2,
				isDisplay: true,
				isDisplayable: true,
				linkColumns: ['header'],
				linkTable: 'CmSite',
				orderDefine: 160,
				orderDisplay: 160
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'codeSfEligibilityStatus',
				indexTable: 0,
				isDisplay: true,
				isDisplayable: true,
				linkColumns: ['name'],
				orderDefine: 170,
				orderDisplay: 170
			},
			{
				codeFieldElement: 'date',
				codeReportElementType: 'column',
				columnName: 'dateCreated',
				indexTable: 0,
				isDisplay: true,
				isDisplayable: true,
				orderDefine: 180,
				orderDisplay: 180
			},
			{
				codeFieldElement: 'date',
				codeReportElementType: 'column',
				columnName: 'dateStart',
				indexTable: 0,
				isDisplay: true,
				isDisplayable: true,
				orderDefine: 190,
				orderDisplay: 190
			},
			{
				codeFieldElement: 'date',
				codeReportElementType: 'column',
				columnName: 'dateEnd',
				indexTable: 0,
				isDisplay: true,
				isDisplayable: true,
				orderDefine: 200,
				orderDisplay: 200
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int64',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfDocument FILTER .csf = app_cm::CmClientServiceFlow)))`,
				header: 'Documents - Total',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'docCnt',
				orderDefine: 210,
				orderDisplay: 210
			}
			// {
			// 	codeAlignment: 'right',
			// 	codeDataType: 'int64',
			// 	codeFieldElement: 'number',
			// 	codeReportElementType: 'column',
			// 	exprCustom: `(SELECT count((SELECT sys_core::SysMsg FILTER .csf = app_cm::CmClientServiceFlow)))`,
			// 	header: 'Messages - Total',
			// 	isDisplay: true,
			// 	isDisplayable: true,
			// 	nameCustom: 'msgCnt',
			// 	orderDefine: 220,
			// 	orderDisplay: 220
			// },
			// {
			// 	codeAlignment: 'right',
			// 	codeDataType: 'int64',
			// 	codeFieldElement: 'number',
			// 	codeReportElementType: 'column',
			// 	exprCustom: `(SELECT count((SELECT sys_core::SysMsg FILTER .csf = app_cm::CmClientServiceFlow AND .codeSfEligibilityStatus.name = 'Sent')))`,
			// 	header: 'Messages - Sent',
			// 	isDisplay: true,
			// 	isDisplayable: true,
			// 	nameCustom: 'msgSentCnt',
			// 	orderDefine: 230,
			// 	orderDisplay: 230
			// },
			// {
			// 	codeAlignment: 'right',
			// 	codeDataType: 'int64',
			// 	codeFieldElement: 'number',
			// 	codeReportElementType: 'column',
			// 	exprCustom: `(SELECT count((SELECT sys_core::SysMsg FILTER .csf = app_cm::CmClientServiceFlow AND .codeSfEligibilityStatus.name = 'Under review')))`,
			// 	header: 'Messages - Under review',
			// 	isDisplay: true,
			// 	isDisplayable: true,
			// 	nameCustom: 'msgUrCnt',
			// 	orderDefine: 240,
			// 	orderDisplay: 240
			// },
			// {
			// 	codeAlignment: 'right',
			// 	codeDataType: 'int64',
			// 	codeFieldElement: 'number',
			// 	codeReportElementType: 'column',
			// 	exprCustom: `(SELECT count((SELECT sys_core::SysMsg FILTER .csf = app_cm::CmClientServiceFlow AND .codeSfEligibilityStatus.name = 'replied')))`,
			// 	header: 'Messages - Replied',
			// 	isDisplay: true,
			// 	isDisplayable: true,
			// 	nameCustom: 'msgRepliedCnt',
			// 	orderDefine: 250,
			// 	orderDisplay: 250
			// },
			// {
			// 	codeAlignment: 'right',
			// 	codeDataType: 'int64',
			// 	codeFieldElement: 'number',
			// 	codeReportElementType: 'column',
			// 	exprCustom: `(SELECT count((SELECT sys_core::SysMsg FILTER .csf = app_cm::CmClientServiceFlow AND .codeSfEligibilityStatus.name = 'Closed')))`,
			// 	header: 'Messages - Closed',
			// 	isDisplay: true,
			// 	isDisplayable: true,
			// 	nameCustom: 'msgClosedCnt',
			// 	orderDefine: 260,
			// 	orderDisplay: 260
			// }
		]
	})
}
