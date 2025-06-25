import { InitDb } from '$server/dbGel/init/types.init'

export function initSysAuth(init: InitDb) {
	initAuthLogin(init)
	initAuthLoginForgotPw(init)
	initAuthLoginVerify(init)

	initAuthSignup(init)
	initAuthSignupVerifyMobileInsert(init)
	initAuthSignupVerifyMobileUpdate(init)

	initMyAccount(init)
	initResetPasswordAccount(init)
	initUserPref(init)
}

function initAuthLogin(init: InitDb) {
	init.addTrans('sysDataObj', {
		codeCardinality: 'detail',
		header: 'Log in',
		name: 'data_obj_auth_login',
		owner: 'sys_system',
		table: 'SysUser',
		tables: [
			{ index: 0, table: 'SysUser' },
			{ columnParent: 'person', indexParent: 0, index: 1, table: 'SysPerson' }
		],
		fields: [
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'Log in' },
				isDisplayable: true,
				orderDisplay: 10,
				orderDefine: 10,
				indexTable: 0
			},
			{
				codeFieldElement: 'tel',
				columnName: 'name',
				headerAlt: 'Mobile Phone Number',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeFieldElement: 'textHide',
				columnName: 'password',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeColor: 'primary',
				codeFieldElement: 'customActionButton',
				columnName: 'custom_element',
				customElement: {
					action: 'ua_ca_sys_auth_submit',
					label: 'Log in',
					value: 'auth_login'
				},
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				codeColor: 'primary',
				codeFieldElement: 'customActionLink',
				columnName: 'custom_element',
				customElement: {
					action: 'ua_ca_sys_nav_open_node_free_custom',
					label: 'Forgot Password?',
					codeComponent: 'FormDetail',
					value: 'node_obj_auth_login_forgot_pw'
				},
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeColor: 'primary',
				codeFieldElement: 'customActionLink',
				columnName: 'custom_element',
				customElement: {
					action: 'ua_ca_sys_nav_open_node_free_custom',
					label: 'Sign up',
					codeComponent: 'FormDetail',
					prefix: 'Need an account?',
					value: 'node_obj_auth_signup'
				},
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			}
		]
	})
	init.addTrans('sysNodeObjFree', {
		codeComponent: 'FormDetail',
		codeNodeType: 'nodeFree',
		codeQueryType: 'preset',
		dataObj: 'data_obj_auth_login',
		name: 'node_obj_auth_login',
		owner: 'sys_system'
	})
}

function initAuthLoginForgotPw(init: InitDb) {
	init.addTrans('sysDataObj', {
		codeCardinality: 'detail',
		header: 'Reset Password',
		name: 'data_obj_auth_login_forgot_pw',
		owner: 'sys_system',
		table: 'SysUser',
		tables: [
			{ index: 0, table: 'SysUser' },
			{ columnParent: 'person', indexParent: 0, index: 1, table: 'SysPerson' }
		],
		fields: [
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'Reset Password' },
				isDisplayable: true,
				orderDisplay: 10,
				orderDefine: 10
			},
			{
				codeFieldElement: 'tel',
				columnName: 'name',
				headerAlt: 'Mobile Phone Number',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeFieldElement: 'textHide',
				columnName: 'password',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				headerAlt: 'New Password',
				indexTable: 0
			},
			{
				codeColor: 'primary',
				codeFieldElement: 'customActionButton',
				columnName: 'custom_element',
				customElement: {
					action: 'ua_ca_sys_auth_submit',
					label: 'Confirm Mobile Phone Number',
					value: 'auth_login_forgot_pw_confirm_mobile'
				},
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				codeFieldElement: 'customText',
				columnName: 'custom_element',
				customElement: {
					align: 'center',
					label: `We'll text you to confirm your mobile phone number. Standard rates apply.`
				},
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			},
			{
				codeColor: 'primary',
				codeFieldElement: 'customActionLink',
				columnName: 'custom_element',
				customElement: {
					action: 'ua_ca_sys_nav_open_node_free_custom',
					label: 'Log in',
					codeComponent: 'FormDetail',
					prefix: 'Already have an account?',
					value: 'node_obj_auth_login'
				},
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeColor: 'primary',
				codeFieldElement: 'customActionLink',
				columnName: 'custom_element',
				customElement: {
					action: 'ua_ca_sys_nav_open_node_free_custom',
					label: 'Sign up',
					codeComponent: 'FormDetail',
					prefix: 'Need an account?',
					value: 'node_obj_auth_signup'
				},
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			}
		]
	})

	init.addTrans('sysNodeObjFree', {
		codeComponent: 'FormDetail',
		codeNodeType: 'nodeFree',
		codeQueryType: 'preset',
		dataObj: 'data_obj_auth_login_forgot_pw',
		name: 'node_obj_auth_login_forgot_pw',
		owner: 'sys_system'
	})
}

function initAuthLoginVerify(init: InitDb) {
	init.addTrans('sysDataObj', {
		codeCardinality: 'detail',
		header: 'Verify Mobile Phone Number',
		name: 'data_obj_auth_login_verify',
		owner: 'sys_system',
		table: 'SysUser',
		tables: [
			{ index: 0, table: 'SysUser' },
			{ columnParent: 'person', indexParent: 0, index: 1, table: 'SysPerson' }
		],
		fields: [
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'Verify Mobile Phone Number' },
				isDisplayable: true,
				orderDisplay: 10,
				orderDefine: 10
			},
			{
				codeFieldElement: 'customText',
				columnName: 'custom_element',
				customElement: {
					label: `Check your message app for the security code and enter it here.`
				},
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20
			},
			{
				codeAlignmentAlt: 'left',
				codeFieldElement: 'textHide',
				columnName: 'securityCodeUser',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeColor: 'primary',
				codeFieldElement: 'customActionButton',
				columnName: 'custom_element',
				customElement: {
					action: 'ua_ca_sys_auth_submit',
					label: 'Verify',
					value: 'auth_login_forgot_pw_code_verify'
				},
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				codeColor: 'primary',
				codeFieldElement: 'customActionLink',
				columnName: 'custom_element',
				customElement: {
					action: 'ua_ca_sys_auth_resend_code',
					label: 'Resend Security Code'
				},
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			}
		]
	})
	init.addTrans('sysNodeObjFree', {
		codeComponent: 'FormDetail',
		codeNodeType: 'nodeFree',
		codeQueryType: 'preset',
		dataObj: 'data_obj_auth_login_verify',
		name: 'node_obj_auth_login_verify',
		owner: 'sys_system'
	})
}

function initAuthSignup(init: InitDb) {
	init.addTrans('sysDataObj', {
		codeCardinality: 'detail',
		header: 'Sign up',
		name: 'data_obj_auth_signup',
		owner: 'sys_system',
		table: 'SysUser',
		fields: [
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'Sign up' },
				isDisplayable: true,
				orderDisplay: 10,
				orderDefine: 10
			},
			{
				columnName: 'firstName',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20
			},
			{
				columnName: 'lastName',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'tel',
				columnName: 'name',
				headerAlt: 'Mobile Phone Number',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				codeFieldElement: 'textHide',
				columnName: 'password',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			},
			{
				codeFieldElement: 'select',
				columnName: 'userType',
				headerAlt: 'System',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				fieldListItems: 'il_sys_user_type_self_signup'
			},
			{
				codeColor: 'primary',
				codeFieldElement: 'customActionButton',
				columnName: 'custom_element',
				customElement: {
					action: 'ua_ca_sys_auth_submit',
					label: 'Sign up',
					value: 'auth_signup'
				},
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeFieldElement: 'customText',
				columnName: 'custom_element',
				customElement: {
					align: 'center',
					label: `We'll text you to confirm your mobile phone number. Standard rates apply.`
				},
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				codeColor: 'primary',
				codeFieldElement: 'customActionLink',
				columnName: 'custom_element',
				customElement: {
					action: 'ua_ca_sys_nav_open_node_free_custom',
					label: 'Log in',
					codeComponent: 'FormDetail',
					prefix: 'Already have an account?',
					value: 'node_obj_auth_login'
				},
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90
			}
		]
	})
	init.addTrans('sysNodeObjFree', {
		codeComponent: 'FormDetail',
		codeNodeType: 'nodeFree',
		codeQueryType: 'preset',
		dataObj: 'data_obj_auth_signup',
		name: 'node_obj_auth_signup',
		owner: 'sys_system'
	})
}

function initAuthSignupVerifyMobileInsert(init: InitDb) {
	init.addTrans('sysDataObj', {
		codeCardinality: 'detail',
		header: 'Verify Mobile Phone Number',
		name: 'data_obj_auth_signup_verify_mobile_insert',
		owner: 'sys_system',
		table: 'SysUser',
		tables: [
			{ index: 0, table: 'SysUser' },
			{ columnParent: 'person', indexParent: 0, index: 1, table: 'SysPerson' }
		],
		fields: [
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'Verify Mobile Phone Number' },
				isDisplayable: true,
				orderDisplay: 10,
				orderDefine: 10
			},
			{
				codeFieldElement: 'customText',
				columnName: 'custom_element',
				customElement: {
					label: `Check your message app for the security code and enter it here.`
				},
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20
			},
			{
				codeAlignmentAlt: 'left',
				codeFieldElement: 'textHide',
				columnName: 'securityCodeUser',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeColor: 'primary',
				codeFieldElement: 'customActionButton',
				columnName: 'custom_element',
				customElement: {
					action: 'ua_ca_sys_auth_submit',
					label: 'Verify',
					value: 'auth_signup_confirm_code_verify_insert'
				},
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				codeColor: 'primary',
				codeFieldElement: 'customActionLink',
				columnName: 'custom_element',
				customElement: {
					action: 'ua_ca_sys_auth_resend_code',
					label: 'Resend Security Code'
				},
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			}
		]
	})
	init.addTrans('sysNodeObjFree', {
		codeComponent: 'FormDetail',
		codeNodeType: 'nodeFree',
		codeQueryType: 'preset',
		dataObj: 'data_obj_auth_signup_verify_mobile_insert',
		name: 'node_obj_auth_signup_verify_mobile_insert',
		owner: 'sys_system'
	})
}

function initAuthSignupVerifyMobileUpdate(init: InitDb) {
	init.addTrans('sysDataObj', {
		codeCardinality: 'detail',
		header: 'Verify Mobile Phone Number',
		name: 'data_obj_auth_signup_verify_mobile_update',
		owner: 'sys_system',
		table: 'SysUser',
		tables: [
			{ index: 0, table: 'SysUser' },
			{ columnParent: 'person', indexParent: 0, index: 1, table: 'SysPerson' }
		],
		fields: [
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'Verify Mobile Phone Number' },
				isDisplayable: true,
				orderDisplay: 10,
				orderDefine: 10
			},
			{
				codeFieldElement: 'customText',
				columnName: 'custom_element',
				customElement: {
					label: `Check your message app for the security code and enter it here.`
				},
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20
			},
			{
				codeAlignmentAlt: 'left',
				codeFieldElement: 'textHide',
				columnName: 'securityCodeUser',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeColor: 'primary',
				codeFieldElement: 'customActionButton',
				columnName: 'custom_element',
				customElement: {
					action: 'ua_ca_sys_auth_submit',
					label: 'Verify',
					value: 'auth_signup_confirm_code_verify_update'
				},
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				codeColor: 'primary',
				codeFieldElement: 'customActionLink',
				columnName: 'custom_element',
				customElement: {
					action: 'ua_ca_sys_auth_resend_code',
					label: 'Resend Security Code'
				},
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			}
		]
	})
	init.addTrans('sysNodeObjFree', {
		codeComponent: 'FormDetail',
		codeNodeType: 'nodeFree',
		codeQueryType: 'preset',
		dataObj: 'data_obj_auth_signup_verify_mobile_update',
		name: 'node_obj_auth_signup_verify_mobile_update',
		owner: 'sys_system'
	})
}

function initMyAccount(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_auth_my_account',
		codeCardinality: 'detail',
		exprFilter: '.id = <user,uuid,id>',
		header: 'My Account',
		name: 'data_obj_task_sys_auth_my_account',
		owner: 'sys_system',
		queryRiders: [
			{
				codeQueryAction: 'customFunction',
				codeQueryFunction: 'qrfFileStorage',
				codeQueryPlatform: 'client',
				codeQueryType: 'save',
				codeTriggerTiming: 'pre',
				parmValueStr: 'avatar'
			},
			{
				codeQueryAction: 'customFunction',
				codeQueryFunction: 'qrfUserUpdate',
				codeQueryPlatform: 'client',
				codeQueryType: 'save',
				codeTriggerTiming: 'post'
			}
		],
		table: 'SysUser',
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
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20
			},
			{
				columnName: 'firstName',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 1
			},
			{
				columnName: 'lastName',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 1
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				columnName: 'name',
				headerAlt: 'Mobile Phone Number',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'defaultSystem',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				fieldListItems: 'il_sys_system_by_user'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'file',
				columnName: 'avatar',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 1,
				width: 200
			},

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
			},

			// reset password link
			{
				codeColor: 'primary',
				codeFieldElement: 'customActionLink',
				columnName: 'custom_element',
				customElement: {
					action: 'ua_ca_sys_nav_open_node_free_custom',
					label: 'Reset Password?',
					codeComponent: 'FormDetail',
					value: 'node_obj_auth_reset_password_account'
				},
				isDisplayable: true,
				orderDisplay: 1060,
				orderDefine: 1060
			}
		]
	})
	init.addTrans('sysNodeObjFree', {
		codeComponent: 'FormDetail',
		codeNodeType: 'nodeFree',
		codeQueryType: 'retrieve',
		dataObj: 'data_obj_task_sys_auth_my_account',
		name: 'node_obj_task_sys_auth_my_account',
		owner: 'sys_system'
	})
}

function initResetPasswordAccount(init: InitDb) {
	init.addTrans('sysDataObj', {
		codeCardinality: 'detail',
		header: 'Reset Password',
		name: 'data_obj_auth_reset_password_account',
		owner: 'sys_system',
		table: 'SysUser',
		tables: [
			{ index: 0, table: 'SysUser' },
			{ columnParent: 'person', indexParent: 0, index: 1, table: 'SysPerson' }
		],
		fields: [
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'Reset Password' },
				isDisplayable: true,
				orderDisplay: 10,
				orderDefine: 10
			},
			{
				codeFieldElement: 'tel',
				columnName: 'name',
				headerAlt: 'Mobile Phone Number',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeFieldElement: 'textHide',
				columnName: 'password',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				headerAlt: 'New Password',
				indexTable: 0
			},
			{
				codeColor: 'primary',
				codeFieldElement: 'customActionButton',
				columnName: 'custom_element',
				customElement: {
					action: 'ua_ca_sys_auth_submit',
					label: 'Confirm Mobile Phone Number',
					codeComponent: 'FormDetail',
					value: 'data_obj_auth_reset_password_account'
				},
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				codeFieldElement: 'customText',
				columnName: 'custom_element',
				customElement: {
					align: 'center',
					label: `We'll text you to confirm your mobile phone number. Standard rates apply.`
				},
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			}
		]
	})
	init.addTrans('sysNodeObjFree', {
		codeComponent: 'FormDetail',
		codeNodeType: 'nodeFree',
		codeQueryType: 'preset',
		dataObj: 'data_obj_auth_reset_password_account',
		name: 'node_obj_auth_reset_password_account',
		owner: 'sys_system'
	})
}

function initUserPref(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_embed_list_edit',
		codeCardinality: 'list',
		codeListPresetType: 'insertSave',
		exprFilter: `.user.id = <user,uuid,id>`,
		header: 'My Preferences',
		isListEdit: true,
		isListSuppressFilterSort: true,
		listPresetExpr: `WITH 
			allTypes := (SELECT sys_core::SysCode FILTER .codeType.name = 'ct_sys_user_pref_type'),
			userTypes := (SELECT sys_user::SysUserPref FILTER .user.id = <user,uuid,id>).codeType,
			newVals := (SELECT allTypes EXCEPT userTypes)
			SELECT newVals`,
		name: 'data_obj_auth_user_pref_list',
		owner: 'sys_system',
		queryRiders: [
			{
				codeQueryAction: 'customFunction',
				codeQueryFunction: 'qrfUserUpdate',
				codeQueryPlatform: 'client',
				codeQueryType: 'save',
				codeTriggerTiming: 'post'
			}
		],
		tables: [
			{ index: 0, table: 'SysUserPref' },
			{ columnParent: 'codeType', indexParent: 0, index: 1, table: 'SysCode' }
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
				exprPreset: `(SELECT sys_user::SysUser FILTER .id = <user,uuid,id>)`,
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkColumns: ['person', 'fullName'],
				linkTable: 'SysUser'
			},
			{
				columnName: 'codeType',
				exprPreset: `item`,
				orderDefine: 30,
				indexTable: 0,
				isDisplayable: false,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				indexTable: 1,
				isDisplayable: true,
				isExcludeInsert: true,
				isExcludeUpdate: true,
				orderDisplay: 40,
				orderDefine: 40,
				orderSort: 10
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isActive',
				exprPreset: `(SELECT false)`,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 50
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
	init.addTrans('sysNodeObjFree', {
		codeComponent: 'FormList',
		codeNodeType: 'nodeFree',
		codeQueryType: 'retrieve',
		dataObj: 'data_obj_auth_user_pref_list',
		name: 'node_obj_auth_user_pref_list',
		owner: 'sys_system'
	})
}
