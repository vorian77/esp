import { InitDb } from '$server/dbGel/init/types.init'
import { moedDataApplicant } from '$utils/utils.randomDataGenerator'
import { debug } from '$utils/types'

export function initContentMOEDSsr(init: InitDb) {
	// tasks
	initTaskSsrApp(init)
	initTaskSsrDoc(init)
	initTaskSsrWelcome(init)

	// demo data
	initDemoData(init)
}

function initTaskSsrApp(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail_mobile_save',
		codeCardinality: 'detail',
		exprFilter: '.client.person = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person',
		header: 'My Application',
		name: 'data_obj_task_moed_ssr_app',
		ownerSys: 'sys_client_baltimore_moed',
		queryRiders: [
			{
				codeQueryAction: 'userMsg',
				codeQueryPlatform: 'client',
				codeQueryType: 'save',
				codeTriggerTiming: 'post',
				userMsg:
					'Your application has been submitted! Now upload your eligibility documents and if you have any questions send us a message.',
				codeUserMsgDelivery: 'alert'
			},
			{
				codeQueryAction: 'appDestination',
				codeQueryPlatform: 'client',
				codeQueryType: 'save',
				codeTriggerTiming: 'post',
				navDestination: {
					codeDestinationType: 'home'
				}
			}
		],
		tables: [
			{ index: 0, table: 'CmClientServiceFlow' },
			{
				columnParent: 'client',
				indexParent: 0,
				index: 1,
				isTableExtension: true,
				table: 'MoedParticipant'
			},
			{
				columnParent: 'person',
				exprFilterUpdate: '.id = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person.id',
				indexParent: 1,
				index: 2,
				table: 'SysPerson'
			},
			{
				columnParent: 'objAttrCmProgram',
				indexParent: 0,
				index: 3,
				table: 'SysObjAttr'
			}
		],
		fields: [
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'Enter your program eligibility information here:' },
				isDisplayable: true,
				orderDisplay: 10,
				orderDefine: 10
			},
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: {
					label: 'The blue colored fields are required and the white colored fields are optional.',
					isSubHeader: true
				},
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20
			},
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 30
			},
			{
				codeFieldElement: 'selectOwnerSys',
				columnName: 'ownerSys',
				orderDefine: 35,
				orderDisplay: 35,
				indexTable: 1,
				isDisplayable: true,
				fieldListItems: 'il_sys_system_by_user'
			},
			{
				columnName: 'objAttrCmProgram',
				exprSave: `(SELECT assert_single((SELECT sys_core::SysObjAttr FILTER .name = 'at_cm_program_moed_yo')))`,
				orderDefine: 40,
				indexTable: 0,
				isDisplayable: false,
				linkColumns: ['name'],
				linkTable: 'SysObjAttr'
			},
			{
				columnName: 'codeSfEnrollType',
				exprPreset: `(SELECT assert_single((sys_core::getCode('ct_cm_sf_enroll_type', 'Self-Registration'))))`,
				orderDefine: 45,
				indexTable: 0,
				isDisplayable: false,
				isExcludeUpdate: true,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				columnName: 'idxDemo',
				exprPreset: `-100`,
				indexTable: 1,
				isDisplayable: false,
				orderDefine: 50
			},
			{
				columnName: 'createdBy',
				isDisplayable: false,
				orderDefine: 70,
				indexTable: 1
			},
			{
				columnName: 'modifiedBy',
				isDisplayable: false,
				orderDefine: 80,
				indexTable: 1
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeSfEligibilityStatus',
				exprPreset: `(SELECT assert_single((sys_core::getCode('ct_cm_sf_eligibility_status', 'New application'))))`,
				orderDefine: 200,
				orderDisplay: 200,
				indexTable: 0,
				isDisplayable: true,
				isExcludeUpdate: true,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'select',
				columnName: 'objAttrCmSite',
				isDisplayable: true,
				orderDisplay: 210,
				orderDefine: 210,
				indexTable: 0,
				fieldListItems: 'il_sys_obj_attr_type_single',
				fieldListItemsParmValue: 'at_cm_site'
			},
			{
				codeFieldElement: 'date',
				columnName: 'dateCreated',
				headerAlt: 'Application Date (yyyy-mm-dd)',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 215,
				orderDefine: 215
			},
			{
				columnName: 'firstName',
				exprPreset: `<user,str,firstName>`,
				isDisplayable: true,
				orderDisplay: 220,
				orderDefine: 220,
				indexTable: 2
			},
			{
				columnName: 'lastName',
				exprPreset: `<user,str,lastName>`,
				isDisplayable: true,
				orderDisplay: 230,
				orderDefine: 230,
				indexTable: 2
			},
			{
				codeFieldElement: 'date',
				columnName: 'birthDate',
				headerAlt: 'Birth Date (yyyy-mm-dd)',
				isDisplayable: true,
				orderDisplay: 240,
				orderDefine: 240,
				indexTable: 2
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textHide',
				columnName: 'ssn',
				isDisplayable: true,
				orderDisplay: 250,
				orderDefine: 250,
				indexTable: 2
			},
			{
				columnName: 'phoneMobile',
				exprPreset: `<user,str,name>`,
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 260,
				orderDisplay: 260
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'email',
				columnName: 'email',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 270,
				orderDisplay: 270
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeGender',
				isDisplayable: true,
				orderDisplay: 280,
				orderDefine: 280,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_person_gender',
				itemChanges: [
					{
						codeAccess: 'required',
						codeItemChangeAction: 'none',
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						codeItemChangeValueType: 'code',
						codeOp: 'equal',
						columns: ['genderSelfId'],
						orderDefine: 0,
						valueTriggerCodes: [
							{
								ownerSys: 'sys_client_baltimore_moed',
								codeType: 'ct_sys_person_gender',
								name: 'Prefer to self-identify'
							}
						]
					},
					{
						codeAccess: 'hidden',
						codeItemChangeAction: 'reset',
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						codeItemChangeValueType: 'code',
						codeOp: 'notEqual',
						columns: ['genderSelfId'],
						orderDefine: 1,
						valueTriggerCodes: [
							{
								ownerSys: 'sys_client_baltimore_moed',
								codeType: 'ct_sys_person_gender',
								name: 'Prefer to self-identify'
							}
						]
					}
				]
			},
			{
				codeAccess: 'optional',
				columnName: 'genderSelfId',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 285,
				orderDisplay: 285
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeRace',
				isDisplayable: true,
				orderDisplay: 300,
				orderDefine: 300,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_person_race'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeEthnicity',
				isDisplayable: true,
				orderDisplay: 310,
				orderDefine: 310,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_person_ethnicity'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeDisabilityStatus',
				isDisplayable: true,
				orderDisplay: 320,
				orderDefine: 320,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_person_disability_status'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codePersonLivingArrangements',
				isDisplayable: true,
				itemChanges: [
					{
						codeAccess: 'required',
						codeItemChangeAction: 'none',
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						codeOp: 'notEqual',
						columns: ['addr1', 'city', 'codeState', 'zip'],
						orderDefine: 0,
						valueTriggerCodes: [
							{
								ownerSys: 'sys_client_baltimore_moed',
								codeType: 'ct_sys_person_living_arrangements',
								name: 'I am currently homeless'
							}
						]
					},
					{
						codeAccess: 'optional',
						codeItemChangeAction: 'none',
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						codeOp: 'notEqual',
						columns: ['addr2'],
						orderDefine: 0,
						valueTriggerCodes: [
							{
								ownerSys: 'sys_client_baltimore_moed',
								codeType: 'ct_sys_person_living_arrangements',
								name: 'I am currently homeless'
							}
						]
					},
					{
						codeAccess: 'hidden',
						codeOp: 'equal',
						codeItemChangeAction: 'reset',
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						columns: ['addr1', 'addr2', 'city', 'codeState', 'zip'],
						orderDefine: 1,
						valueTriggerCodes: [
							{
								ownerSys: 'sys_client_baltimore_moed',
								codeType: 'ct_sys_person_living_arrangements',
								name: 'I am currently homeless'
							}
						]
					}
				],
				orderDisplay: 325,
				orderDefine: 325,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_person_living_arrangements'
			},
			{
				columnName: 'addr1',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 330,
				orderDisplay: 330
			},
			{
				codeAccess: 'optional',
				columnName: 'addr2',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 340,
				orderDisplay: 340
			},
			{
				columnName: 'city',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 350,
				orderDisplay: 350
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeState',
				isDisplayable: true,
				orderDisplay: 360,
				orderDefine: 360,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_state'
			},
			{
				columnName: 'zip',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 370,
				orderDisplay: 370
			},

			/* management */
			{
				columnName: 'createdAt',
				isDisplayable: false,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				columnName: 'createdBy',
				isDisplayable: false,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				columnName: 'modifiedAt',
				isDisplayable: false,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				columnName: 'modifiedBy',
				isDisplayable: false,
				orderDefine: 1040,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeNodeType: 'nodeTask',
		codeQueryTypeAlt: 'retrieveThenPreset',
		dataObj: 'data_obj_task_moed_ssr_app',
		name: 'node_obj_task_moed_ssr_app',
		ownerSys: 'sys_client_baltimore_moed',
		systemQuerySource: 'sys_client_baltimore_moed'
	})

	init.addTrans('sysTask', {
		codeTaskStatusObj: 'tso_sys_data',
		codeTaskType: 'taskAutomated',
		description: 'First step to my future.',
		exprShow: `SELECT count((SELECT sys_user::SysUser FILTER .id = <user,uuid,id> AND .person.isLegalAgreed = true)) > 0`,
		exprStatus: `WITH
		sf := (SELECT app_cm::CmClientServiceFlow FILTER .client.person = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person ORDER BY .modifiedAt DESC),
		SELECT {
			isShowData := (exists sf),
			applicationDate := {label := 'Application Date', data := sf.dateCreated, color := 'black'},
  		codeEligibilityStatus := {label := 'Current Eligibility Status', data := sf.codeSfEligibilityStatus.name, color := 'black'},
  		lastUpdateBy := {label := 'Last Update By', data := sf.modifiedBy.person.fullName, color := 'black'}
		}`,
		header: 'My Application',
		name: 'task_moed_ssr_app',
		noDataMsg: 'Click to start application',
		nodeObj: 'node_obj_task_moed_ssr_app',
		ownerSys: 'sys_client_baltimore_moed'
	})
}

function initTaskSsrDoc(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail_mobile_save_delete',
		codeCardinality: 'detail',
		exprFilter:
			'.csf.client.person = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person AND <parms,str,itemsParmValue> IN .codeType.codeTypeFamily.name LIMIT 1',
		header: 'My Document',
		name: 'data_obj_task_moed_ssr_doc_detail',
		ownerSys: 'sys_client_baltimore_moed',
		queryRiders: [
			{
				codeQueryAction: 'customFunction',
				codeQueryFunction: 'qrfFileStorage',
				codeQueryPlatform: 'client',
				codeQueryType: 'save',
				codeTriggerTiming: 'pre',
				parmValueStr: 'file'
			},
			{
				codeQueryAction: 'appDestination',
				codeQueryPlatform: 'client',
				codeQueryType: 'save',
				codeTriggerTiming: 'post',
				navDestination: {
					codeDestinationType: 'back'
				}
			}
		],
		tables: [{ index: 0, table: 'CmCsfDocument' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'csf',
				exprSave: `(SELECT assert_single((SELECT app_cm::CmClientServiceFlow FILTER .client.person = (SELECT sys_user::SysUser FILTER .id = <uuid><user,uuid,id>).person)))`,
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkColumns: ['objAttrCmProgram', 'name'],
				linkTable: 'CmClientServiceFlow'
			},
			{
				codeFieldElement: 'date',
				columnName: 'dateIssued',
				headerAlt: 'Date',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeType',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_family_group_order_index_by_codeType_name_system'
			},
			{
				codeFieldElement: 'file',
				columnName: 'file',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				width: 300
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},

			/* management */
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: false,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: false,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: false,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: false,
				orderDefine: 1040,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeNodeType: 'nodeTask',
		codeQueryTypeAlt: 'retrieveThenPreset',
		dataObj: 'data_obj_task_moed_ssr_doc_detail',
		name: 'node_obj_task_moed_ssr_doc_detail',
		ownerSys: 'sys_client_baltimore_moed',
		systemQuerySource: 'sys_client_baltimore_moed'
	})

	init.addTrans('sysTask', {
		codeTaskStatusObj: 'tso_moed_ssr_doc',
		codeTaskType: 'taskAutomated',
		description: 'Step 2: to help speed up my application processing.',
		exprShow: `SELECT count((SELECT app_cm::CmClientServiceFlow FILTER .client.person = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person)) > 0`,
		exprStatus: `SELECT sys_core::SysCodeType { 
  id, 
  name, 
  header,
  _uploaded := (SELECT true IF (SELECT count((SELECT app_cm::CmCsfDocument FILTER .csf.client.person = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person AND sys_core::SysCodeType IN .codeType.codeTypeFamily))) > 0 ELSE false)}
FILTER .parent.name = 'ct_cm_doc_type' ORDER BY .order asc`,
		hasAltOpen: true,
		header: 'My Eligibility Documents',
		name: 'task_moed_ssr_app_doc',
		nodeObj: 'node_obj_task_moed_ssr_doc_detail',
		ownerSys: 'sys_client_baltimore_moed'
	})
}

function initTaskSsrWelcome(init: InitDb) {
	init.addTrans('sysDataObj', {
		codeCardinality: 'detail',
		exprFilter: `.id = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person.id`,
		header: 'Welcome',
		isInitialValidationSilent: true,
		name: 'data_obj_task_moed_ssr_welcome',
		ownerSys: 'sys_client_baltimore_moed',
		queryRiders: [
			{
				codeQueryAction: 'userMsg',
				codeQueryPlatform: 'client',
				codeQueryType: 'save',
				codeTriggerTiming: 'post',
				userMsg: 'Great! Next complete your application!',
				codeUserMsgDelivery: 'alert'
			},
			{
				codeQueryAction: 'appDestination',
				codeQueryPlatform: 'client',
				codeQueryType: 'save',
				codeTriggerTiming: 'post',
				navDestination: {
					codeDestinationType: 'home'
				}
			}
		],
		tables: [{ index: 0, table: 'SysPerson' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeFieldElement: 'customHTML',
				columnName: 'custom_element',
				customElement: {
					rawHTML: `
		<div class="flex flex-col justify-center gap-4 text-center">
			<h1 class="text-green-400 text-3xl">Welcome</h1>
		</div>`
				},
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20
			},
			{
				codeFieldElement: 'customImage',
				columnName: 'custom_element',
				customElement: {
					align: 'center',
					file: `{"key": "file_2807296732", "url": "https://fsd0o1nvg8ontjdr.public.blob.vercel-storage.com/file_2807296732", "fileName": "YO Baltimore-highres.png", "fileType": "image",  "downloadUrl": "https://fsd0o1nvg8ontjdr.public.blob.vercel-storage.com/file_2807296732?download=1"}`,
					label: 'logo',
					size: '60'
				},
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'customHTML',
				columnName: 'custom_element',
				customElement: {
					rawHTML: `
		<div class="flex flex-col justify-center gap-4 text-center">
			<p> <span class="font-bold">Youth Opportunity (YO) Baltimore</span> serves individuals between the ages of 18 and 24 who are out of school and/or looking for employment or connections to college. Operating out of two locations - one in West Baltimore and one in East Baltimore - YO embraces a model that offers a full range of services that lead to your success.</p>
		</div>`
				},
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			},
			{
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_start',
				headerAlt: 'Consent To Disclose Personal Information',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'customText',
				columnName: 'custom_element',
				customElement: {
					align: 'left',
					label: `By registering with Baltimore City Mayor's Office of Employment Development Youth Opportunity Program you agree that the Career Partners can see and use the information contained within your application in order to better provide assistance to you in determining eligibility for assistance in obtaining employment, training for employment, education, or other services. Personal information such as social security number, race, ethnicity, sexual orientation and disability status is being requested for federal record keeping and reporting requirements only and is kept confidential.`
				},
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_end',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isLegalAgreed',
				headerAlt:
					"I confirm that I have read, consent and agree to YO Baltimore's Consent to Disclose Personal Information.",
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeColor: 'secondary',
				codeFieldElement: 'customActionButton',
				columnName: 'custom_element',
				customElement: {
					action: 'ua_sys_save_detail',
					label: 'Get Started!'
				},
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110
			}
		]
	})

	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeNodeType: 'nodeTask',
		dataObj: 'data_obj_task_moed_ssr_welcome',
		name: 'node_obj_task_moed_ssr_welcome',
		ownerSys: 'sys_client_baltimore_moed'
	})

	init.addTrans('sysTask', {
		codeTaskType: 'taskAutomated',
		exprShow: `SELECT count((SELECT sys_user::SysUser FILTER .id = <user,uuid,id> AND ((.person.isLegalAgreed = false) ?? (.person.isLegalAgreed ?= <bool>{})))) > 0`,
		header: 'Welcome',
		name: 'task_moed_ssr_welcome',
		nodeObj: 'node_obj_task_moed_ssr_welcome',
		ownerSys: 'sys_client_baltimore_moed'
	})
}

function initDemoData(init: InitDb) {
	moedDataApplicant.setData()
	init.addTrans('MoedBulkCsf', moedDataApplicant.data['serviceFlow'])
	init.addTrans('MoedBulkDataDelete', [])
	init.addTrans('MoedBulkDataDoc', moedDataApplicant.data['dataDoc'])
	init.addTrans('MoedBulkDataMsg', moedDataApplicant.data['dataMsg'])
	init.addTrans('MoedPBulkPart', moedDataApplicant.data['applicant'])
	init.addTrans('MoedBulkDataUser', moedDataApplicant.data['user'])
}
