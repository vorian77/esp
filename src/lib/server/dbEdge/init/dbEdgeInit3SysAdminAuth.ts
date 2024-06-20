import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { addDataObj, addNodeFooter } from '$server/dbEdge/init/dbEdgeInitUtilities2'

export async function initAdminSysAuth() {
	sectionHeader('DataObject - SysAuth')
	await initDataObjAccount()
	await initDataObjLogin()
	await initDataObjResetPasswordAccount()
	await initDataObjResetPasswordLogin()
	await initDataObjVerify()
	await initNodeObjFooter()
	// await initDataObjSignup()
}

// {
// 	codeAccess: 'optional',
// 	codeFieldElement: 'select',
// 	columnName: 'codeRace',
// 	isDisplayable: true,
//orderDisplay: 42,
//orderDefine: 42,
// 	fieldListItems: 'il_sys_code_order_index_by_codeType_name',
// 	fieldListItemsParmName:: 'ct_sys_person_race' ,
// 	linkColumns: ['name'],
// 	linkTable: 'SysCode',
// 	indexTable: 1
// },
// {
// 	codeAccess: 'optional',
// 	codeFieldElement: 'checkbox',
// 	columnName: 'favFood',
// 	isDisplayable: true,
//orderDisplay: 44,
//orderDefine: 44,
// 	items: [
// 		{
// 			data: '10',
// 			display: 'Apple'
// 		},
// 		{
// 			data: '20',
// 			display: 'Pizza'
// 		},
// 		{
// 			data: '30',
// 			display: 'Spaghetti'
// 		}
// 	],
// 	indexTable: 1
// },

async function initDataObjAccount() {
	await addDataObj({
		actionFieldGroup: 'doag_auth_my_account',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		header: 'My Account',
		name: 'data_obj_auth_account',
		owner: 'app_sys_admin',
		actionsQuery: [
			{
				name: 'qa_file_storage',
				parms: [{ key: 'imageField', value: 'avatar' }],
				triggers: [
					{ codeQueryType: 'retrieve', codeTriggerTiming: 'post' },
					{ codeQueryType: 'save', codeTriggerTiming: 'pre' },
					{ codeQueryType: 'save', codeTriggerTiming: 'post' }
				]
			},
			{
				name: 'qa_user_update',
				triggers: [{ codeQueryType: 'save', codeTriggerTiming: 'post' }]
			}
		],
		table: 'SysUser',
		tables: [
			{ index: 0, table: 'SysUser' },
			{ columnParent: 'person', indexParent: 0, index: 1, table: 'SysPerson' }
		],
		exprFilter: '.id = <user,uuid,id>',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'firstName',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 1
			},
			{
				columnName: 'lastName',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 1
			},
			{
				codeFieldElement: 'tel',
				columnName: 'userName',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,

				headerAlt: 'Mobile Phone Number',
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'file',
				columnName: 'avatar',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 1,
				width: 300
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
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 220,
				orderDefine: 220,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 230,
				orderDefine: 230,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			},
			{
				codeFieldElement: 'customActionLink',
				columnName: 'custom_element',
				customElement: {
					action: {
						method: 'auth',
						type: 'page',
						value: 'data_obj_auth_reset_password_account'
					},
					label: 'Reset Password?'
				},
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			}
		]
	})
}

async function initDataObjLogin() {
	await addDataObj({
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		exprObject: `WITH 
		userName := <parms,str,userName>,
		password := <parms,str,password>,
		SELECT sys_user::SysUser { userId := .id }
		FILTER .userName = userName and .password = password 
		`,
		header: 'Log in',
		name: 'data_obj_auth_login',
		owner: 'app_sys_admin',
		table: 'SysUser',
		tables: [
			{ index: 0, table: 'SysUser' },
			{ columnParent: 'person', indexParent: 0, index: 1, table: 'SysPerson' }
		],
		fields: [
			{
				codeFieldElement: 'tel',
				columnName: 'userName',
				isDisplayable: true,
				orderDisplay: 10,
				orderDefine: 10,
				indexTable: 0
			},
			{
				codeFieldElement: 'password',
				columnName: 'password',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeFieldElement: 'customActionButton',
				columnName: 'custom_element',
				customElement: {
					action: { method: 'auth', type: 'submit', value: 'data_obj_auth_login' },
					label: 'Log in'
				},
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeFieldElement: 'customActionLink',
				columnName: 'custom_element',
				customElement: {
					action: { method: 'auth', type: 'page', value: 'data_obj_auth_reset_password_login' },
					label: 'Forgot Password?'
				},
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			}
		]
	})
}

async function initDataObjResetPasswordAccount() {
	await addDataObj({
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		exprObject: `WITH
		userName := <parms,str,userName>,
		password := <parms,str,password>,
		user := (
			UPDATE sys_user::SysUser 
			FILTER .userName = userName
			SET { password := password }
		)
		SELECT { userId := user.id }`,
		header: 'Reset Password',
		name: 'data_obj_auth_reset_password_account',
		owner: 'app_sys_admin',
		table: 'SysUser',
		tables: [
			{ index: 0, table: 'SysUser' },
			{ columnParent: 'person', indexParent: 0, index: 1, table: 'SysPerson' }
		],
		fields: [
			{
				codeFieldElement: 'tel',
				columnName: 'userName',
				isDisplayable: true,
				orderDisplay: 10,
				orderDefine: 10,
				indexTable: 0
			},
			{
				codeFieldElement: 'password',
				columnName: 'password',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				headerAlt: 'New Password',
				indexTable: 0
			},
			{
				codeFieldElement: 'customActionButton',
				columnName: 'custom_element',
				customElement: {
					action: { method: 'auth', type: 'submit', value: 'data_obj_auth_reset_password_account' },
					label: 'Confirm Mobile Phone Number'
				},
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeFieldElement: 'customText',
				columnName: 'custom_element',
				customElement: {
					align: 'center',
					label: `We'll text you to confirm your mobile phone number. Standard rates apply.`
				},
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			}
		]
	})
}

async function initDataObjResetPasswordLogin() {
	await addDataObj({
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		exprObject: `WITH
		userName := <parms,str,userName>,
		password := <parms,str,password>,
		user := (
			UPDATE sys_user::SysUser 
			FILTER .userName = userName
			SET { password := password }
		)
		SELECT { userId := user.id }`,
		header: 'Reset Password',
		name: 'data_obj_auth_reset_password_login',
		owner: 'app_sys_admin',
		table: 'SysUser',
		tables: [
			{ index: 0, table: 'SysUser' },
			{ columnParent: 'person', indexParent: 0, index: 1, table: 'SysPerson' }
		],
		fields: [
			{
				codeFieldElement: 'tel',
				columnName: 'userName',
				isDisplayable: true,
				orderDisplay: 10,
				orderDefine: 10,
				indexTable: 0
			},
			{
				codeFieldElement: 'password',
				columnName: 'password',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,

				headerAlt: 'New Password',
				indexTable: 0
			},
			{
				codeFieldElement: 'customActionButton',
				columnName: 'custom_element',
				customElement: {
					action: { method: 'auth', type: 'submit', value: 'data_obj_auth_reset_password_login' },
					label: 'Confirm Mobile Phone Number'
				},
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeFieldElement: 'customText',
				columnName: 'custom_element',
				customElement: {
					align: 'center',
					label: `We'll text you to confirm your mobile phone number. Standard rates apply.`
				},
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'customActionLink',
				columnName: 'custom_element',
				customElement: {
					action: { method: 'auth', type: 'page', value: 'data_obj_auth_login' },
					label: 'Log in',
					prefix: 'Already have an account?'
				},
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			}
		]
	})
}

async function initDataObjVerify() {
	/* data_obj_auth_verify_phone_mobile */
	await addDataObj({
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		header: 'Verify Mobile Phone Number',
		name: 'data_obj_auth_verify_phone_mobile',
		owner: 'app_sys_admin',
		table: 'SysUser',
		tables: [
			{ index: 0, table: 'SysUser' },
			{ columnParent: 'person', indexParent: 0, index: 1, table: 'SysPerson' }
		],
		fields: [
			{
				codeFieldElement: 'customText',
				columnName: 'custom_element',
				customElement: {
					label: `Check your message app for the security code and enter it here.`
				},
				isDisplayable: true,
				orderDisplay: 10,
				orderDefine: 10,
				indexTable: 0
			},
			{
				codeAlignmentAlt: 'left',
				columnName: 'authSecurityCode',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeFieldElement: 'customActionButton',
				columnName: 'custom_element',
				customElement: {
					action: { method: 'auth', type: 'submit', value: 'data_obj_auth_verify_phone_mobile' },
					label: 'Verify'
				},
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeFieldElement: 'customActionLink',
				columnName: 'custom_element',
				customElement: {
					action: { method: 'auth', type: 'resend_code' },
					label: 'Resend Security Code'
				},
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			}
		]
	})
}

async function initDataObjSignup() {
	/* data_obj_auth_signup */
	await addDataObj({
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		exprObject: `WITH 
		orgName := <system,str,org_name>,
		org := (SELECT sys_core::SysOrg FILTER .name = orgName),
		userName := <parms,str,userName>,
		password := <parms,str,password>,
		firstName := <parms,str,firstName>,
		lastName := <parms,str,lastName>,
		person := (SELECT sys_user::SysUser {_id := .person.id} FILTER .userName = userName),
		user := (
			INSERT sys_user::SysUser {
				owner := org,
				userName := userName,
				password := password,
				person := (
					INSERT default::SysPerson {
						firstName := firstName,
						lastName := lastName
					}
				),
				userTypes := userType
			}
			UNLESS CONFLICT ON .userName
			ELSE (
				UPDATE sys_user::SysUser
				SET {
					userName := userName,
					password := password,
					person := (
						UPDATE default::SysPerson 
						FILTER .id = <uuid>person._id
						SET { 
							firstName := firstName,
							lastName := lastName
						}
					)
				}
			)
		)
		SELECT {
			userId := user.id,
			isNew := user NOT IN sys_user::SysUser
		}`,
		header: 'Sign up',
		name: 'data_obj_auth_signup',
		owner: 'app_sys_admin',
		table: 'SysUser',
		fields: [
			{
				columnName: 'firstName',
				isDisplayable: true,
				orderDisplay: 10,
				orderDefine: 10
			},
			{
				columnName: 'lastName',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20
			},

			{
				codeFieldElement: 'tel',
				columnName: 'userName',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'password',
				columnName: 'password',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				codeFieldElement: 'customActionButton',
				columnName: 'custom_element',
				customElement: {
					action: { method: 'auth', type: 'submit', value: 'data_obj_auth_signup' },
					label: 'Sign up'
				},
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			},
			{
				codeFieldElement: 'customText',
				columnName: 'custom_element',
				customElement: {
					align: 'center',
					label: `We'll text you to confirm your mobile phone number. Standard rates apply.`
				},
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'customActionLink',
				columnName: 'custom_element',
				customElement: {
					action: { method: 'auth', type: 'page', value: 'data_obj_auth_login' },
					label: 'Log in',
					prefix: 'Already have an account?'
				},
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			}
		]
	})
}

async function initNodeObjFooter() {
	sectionHeader('NodeObj-Footer')

	await addNodeFooter({
		codeIcon: 'application',
		codeType: 'home',
		header: 'Home',
		name: 'node_obj_sys_admin_footer_home',
		orderDefine: 10,
		owner: 'app_sys_admin'
	})
	await addNodeFooter({
		codeIcon: 'application',
		codeType: 'page',
		header: 'Contact Us',
		name: 'node_obj_sys_admin_footer_contact_us',
		orderDefine: 20,
		owner: 'app_sys_admin',
		page: '/home/cm/contactUs'
	})
	await addNodeFooter({
		codeIcon: 'application',
		codeType: 'object',
		dataObj: 'data_obj_auth_account',
		header: 'My Account',
		name: 'node_obj_sys_admin_footer_auth_account',
		orderDefine: 30,
		owner: 'app_sys_admin'
	})
}
