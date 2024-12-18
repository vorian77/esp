import { InitDb } from '$server/dbEdge/init/types.init'

export function initSysAuth(init: InitDb) {
	initTaskMyAccount(init)
	initDataObjLogin(init)
	initDataObjResetPasswordAccount(init)
	initDataObjResetPasswordLogin(init)
	initDataObjVerify(init)
	initDataObjSignup(init)
	initDataObjSignupInsert(init)
	initDataObjSignupUpdate(init)
	initDataObjUserPrefType(init)
}

function initTaskMyAccount(init: InitDb) {
	init.addTrans('sysDataObjTask', {
		actionFieldGroup: 'doag_auth_my_account',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		codeDataObjType: 'task',
		header: 'My Account',
		name: 'data_obj_task_sys_auth_my_account',
		owner: 'sys_system_old',
		actionsQuery: [
			{
				name: 'qa_file_storage',
				parms: [{ key: 'imageField', value: 'avatar' }],
				triggers: [{ codeQueryType: 'save', codeTriggerTiming: 'pre' }]
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
				columnName: 'userName',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeFieldElement: 'select',
				columnName: 'defaultOrg',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				fieldListItems: 'il_sys_org_by_user',
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'select',
				columnName: 'defaultSystem',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				fieldListItems: 'il_sys_system_by_user',
				linkTable: 'SysSystem'
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
			},

			// reset password link
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
				orderDisplay: 1060,
				orderDefine: 1060
			}
		]
	})

	init.addTrans('sysTask', {
		codeCategory: 'setting',
		codeIcon: 'Settings',
		header: 'My Account',
		isPinToDash: false,
		isGlobalResource: true,
		name: 'task_sys_auth_my_account',
		sourceDataObj: 'data_obj_task_sys_auth_my_account',
		orderDefine: 0,
		owner: 'sys_system_old'
	})
}

function initDataObjLogin(init: InitDb) {
	init.addTrans('sysDataObj', {
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		exprObject: `WITH 
		userName := <record,str,userName>,
		password := <record,str,password>,
		SELECT sys_user::SysUser { userId := .id }
		FILTER .userName = userName AND .password = password 
		`,
		header: 'Log in',
		name: 'data_obj_auth_login',
		owner: 'sys_system_old',
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
				codeFieldElement: 'textHide',
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
			},
			{
				codeFieldElement: 'customActionLink',
				columnName: 'custom_element',
				customElement: {
					action: { method: 'auth', type: 'page', value: 'data_obj_auth_signup' },
					label: 'Sign up',
					prefix: 'Need an account?'
				},
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			}
		]
	})
}

function initDataObjResetPasswordAccount(init: InitDb) {
	init.addTrans('sysDataObj', {
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		exprObject: `WITH
		userName := <record,str,userName>,
		password := <record,str,password>,
		user := (
			UPDATE sys_user::SysUser 
			FILTER .userName = userName
			SET { password := password }
		)
		SELECT { userId := user.id }`,
		header: 'Reset Password',
		name: 'data_obj_auth_reset_password_account',
		owner: 'sys_system_old',
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
				codeFieldElement: 'textHide',
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

function initDataObjResetPasswordLogin(init: InitDb) {
	init.addTrans('sysDataObj', {
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		exprObject: `WITH
		userName := <record,str,userName>,
		password := <record,str,password>,
		user := (
			UPDATE sys_user::SysUser 
			FILTER .userName = userName
			SET { password := password }
		)
		SELECT { userId := user.id }`,
		header: 'Reset Password',
		name: 'data_obj_auth_reset_password_login',
		owner: 'sys_system_old',
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
				codeFieldElement: 'textHide',
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

function initDataObjVerify(init: InitDb) {
	init.addTrans('sysDataObj', {
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		header: 'Verify Mobile Phone Number',
		name: 'data_obj_auth_verify_phone_mobile',
		owner: 'sys_system_old',
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
				codeFieldElement: 'textHide',
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

function initDataObjSignup(init: InitDb) {
	init.addTrans('sysDataObj', {
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		exprObject: `SELECT { isNew := NOT EXISTS (SELECT sys_user::SysUser FILTER .userName = <record,str,userName>) }`,
		header: 'Sign up',
		name: 'data_obj_auth_signup',
		owner: 'sys_system_old',
		table: 'SysUser',
		fields: [
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
				columnName: 'userName',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'textHide',
				columnName: 'password',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeFieldElement: 'select',
				columnName: 'userType',
				headerAlt: 'System',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				fieldListItems: 'il_sys_user_type_self_signup',
				linkTable: 'SysUserType'
			},
			{
				codeFieldElement: 'customActionButton',
				columnName: 'custom_element',
				customElement: {
					action: { method: 'auth', type: 'submit', value: 'data_obj_auth_signup' },
					label: 'Sign up'
				},
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90
			},
			{
				codeFieldElement: 'customText',
				columnName: 'custom_element',
				customElement: {
					align: 'center',
					label: `We'll text you to confirm your mobile phone number. Standard rates apply.`
				},
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
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
				orderDisplay: 110,
				orderDefine: 110
			}
		]
	})
}

function initDataObjSignupInsert(init: InitDb) {
	init.addTrans('sysDataObj', {
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		exprObject: `
WITH
firstName := <record,str,firstName>,
lastName := <record,str,lastName>,
userName := <record,str,userName>,
userType := <record,str,link_userType>,
password := <record,str,password>,

_user := (SELECT sys_user::SysUser FILTER .userName = userName),
_userType := (SELECT sys_user::SysUserType FILTER .id = <uuid>userType),

user := (
  INSERT sys_user::SysUser {
    createdBy := 	sys_user::getRootUser(),
    defaultOrg := _userType.owner.owner,
    defaultSystem := _userType.owner,
    isMobileOnly := true,
    modifiedBy := 	sys_user::getRootUser(),
    orgs := _userType.owner.owner,
    owner := _userType.owner.owner,
    password := password,
    person := (
      INSERT default::SysPerson {
        firstName := firstName,
        lastName := lastName
      }
    ),
    systems := _userType.owner,
    userName := userName,
    userTypes := _userType,
  }
)
SELECT { userId := user.id }`,
		header: 'temp',
		name: 'data_obj_auth_signup_insert',
		owner: 'sys_system_old',
		table: 'SysUser',
		fields: []
	})
}

function initDataObjSignupUpdate(init: InitDb) {
	init.addTrans('sysDataObj', {
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		exprObject: `
WITH
firstName := <record,str,firstName>,
lastName := <record,str,lastName>,
userName := <record,str,userName>,
password := <record,str,password>,
_user := (SELECT sys_user::SysUser FILTER .userName = userName),
user := (
  UPDATE sys_user::SysUser 
  FILTER .userName = userName
  SET {
    password := password,
    person := (
      UPDATE default::SysPerson 
      FILTER .id = _user.person.id
      SET {
        firstName := firstName,
        lastName := lastName
      }
    ),
  }
)
SELECT { userId := user.id }`,
		header: 'temp',
		name: 'data_obj_auth_signup_update',
		owner: 'sys_system_old',
		table: 'SysUser',
		tables: [
			{ index: 0, table: 'SysUser' },
			{ columnParent: 'person', indexParent: 0, index: 1, table: 'SysPerson' }
		],
		fields: []
	})
}

function initDataObjUserPrefType(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_embed_list_edit',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeListEditPresetType: 'save',
		exprFilter: `.user.id = <user,uuid,id>`,
		header: 'My Preferences',
		isListEdit: true,
		isListSuppressFilterSort: true,
		listEditPresetExpr: `WITH 
			allPrefs := (SELECT sys_core::SysCode FILTER .codeType.name = 'ct_sys_user_pref_type'),
			userPrefs := (SELECT sys_user::SysUserPrefType FILTER .user.id = <user,uuid,id>).codeType,
			newVals := (SELECT allPrefs EXCEPT userPrefs)
			SELECT newVals`,
		name: 'data_obj_auth_user_pref_type',
		owner: 'sys_system_old',
		tables: [
			{ index: 0, table: 'SysUserPrefType' },
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
				linkTable: 'SysUser'
			},
			{
				columnName: 'codeType',
				exprPreset: `item`,
				orderDefine: 30,
				indexTable: 0,
				isDisplayable: false,
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
				exprPreset: '(SELECT false)',
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
}
