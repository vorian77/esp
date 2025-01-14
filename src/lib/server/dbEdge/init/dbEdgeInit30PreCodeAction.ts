import { InitDb } from '$server/dbEdge/init/types.init'

export function initPreCodeAction(init: InitDb) {
	initCodeActionsDoEmbed(init)
	initCodeActionsDoFieldAuth(init)
	initCodeActionsDoGroupItem(init)
	initCodeActionsModal(init)
	initCodeActionsNav(init)
}

function initCodeActionsDoEmbed(init: InitDb) {
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_embed',
		name: 'embedField',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_embed',
		name: 'embedShell',
		order: 0
	})
}

function initCodeActionsDoFieldAuth(init: InitDb) {
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_field_auth',
		name: 'page',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_field_auth',
		name: 'resendCode',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_field_auth',
		name: 'submit',
		order: 0
	})
}

function initCodeActionsDoGroupItem(init: InitDb) {
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_group_item',
		name: 'doDetailDelete',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_group_item',
		name: 'doDetailMigrate',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_group_item',
		name: 'doDetailNew',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_group_item',
		name: 'doDetailProcessExecute',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_group_item',
		name: 'doDetailSave',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_group_item',
		name: 'doDetailSaveAs',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_group_item',
		name: 'doEmbedListConfigEdit',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_group_item',
		name: 'doEmbedListConfigNew',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_group_item',
		name: 'doEmbedListEditParmValue',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_group_item',
		name: 'doEmbedListSelect',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_group_item',
		name: 'doListDetailEdit',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_group_item',
		name: 'doListDetailNew',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_group_item',
		name: 'doListDownload',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_group_item',
		name: 'doListSelfRefresh',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_group_item',
		name: 'doListSelfSave',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_group_item',
		name: 'doOpen',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_do_group_item',
		name: 'doSaveCancel',
		order: 0
	})
}

function initCodeActionsModal(init: InitDb) {
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_modal',
		name: 'modalCancel',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_modal',
		name: 'modalDone',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_modal',
		name: 'modalEmbed',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_modal',
		name: 'modalSelectOpen',
		order: 0
	})

	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_modal',
		name: 'modalSelectSurface',
		order: 0
	})
}

function initCodeActionsNav(init: InitDb) {
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_nav',
		name: 'navBack',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_nav',
		name: 'navCrumbs',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_nav',
		name: 'navMenuOpen',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_nav',
		name: 'navRow',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_nav',
		name: 'navTab',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_nav',
		name: 'openNode',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_nav',
		name: 'none',
		order: 0
	})
}

function initCodeActionsUtils(init: InitDb) {
	init.addTrans('sysCodeAction', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_code_action_class_utils',
		name: 'none',
		order: 0
	})
}
