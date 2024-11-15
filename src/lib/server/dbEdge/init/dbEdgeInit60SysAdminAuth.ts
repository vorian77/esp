import { InitDb } from '$server/dbEdge/init/types.init'

export function initSysAuth(init: InitDb) {
	initDataObjAccount(init)
	initDataObjLogin(init)
	initDataObjResetPasswordAccount(init)
	initDataObjResetPasswordLogin(init)
	initDataObjVerify(init)
	initNodeObjFooter(init)
	//  initDataObjSignup(init)
	initDataObjUserPrefType(init)
}

function initDataObjAccount(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_auth_my_account',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		header: 'My Account',
		name: 'data_obj_auth_account',
		owner: 'sys_system_old',
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
				codeFieldElement: 'tel',
				columnName: 'userName',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				headerAlt: 'Mobile Phone Number',
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
				codeAccess: 'optional',
				codeFieldElement: 'file',
				columnName: 'avatar',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
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
}

function initDataObjLogin(init: InitDb) {
	init.addTrans('sysDataObj', {
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		exprObject: `WITH 
		userName := <record,str,userName>,
		password := <record,str,password>,
		SELECT sys_user::SysUser { userId := .id }
		FILTER .userName = userName and .password = password 
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
	/* data_obj_auth_verify_phone_mobile */
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
	/* data_obj_auth_signup */
	init.addTrans('sysDataObj', {
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		exprObject: `WITH 
		orgName := <system,str,org_name>,
		org := (SELECT sys_core::SysOrg FILTER .name = orgName),
		userName := <record,str,userName>,
		password := <record,str,password>,
		firstName := <record,str,firstName>,
		lastName := <record,str,lastName>,
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
		owner: 'sys_system_old',
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
				codeFieldElement: 'textHide',
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

function initNodeObjFooter(init: InitDb) {
	init.addTrans('sysNodeObjFooter', {
		codeIcon: 'AppWindow',
		codeType: 'home',
		header: 'Home',
		isGlobalResource: true,
		name: 'node_obj_sys_admin_footer_home',
		orderDefine: 0,
		owner: 'sys_system_old'
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
