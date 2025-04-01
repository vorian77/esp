import { InitDb } from '$server/dbGel/init/types.init'

export function initPreCodeAction(init: InitDb) {
	initCodeActionsDefault(init)
	initCodeActionsDoFieldAuth(init)
	initCodeActionsDoGroupItem(init)
	initCodeActionsModal(init)
	initCodeActionsNav(init)
	initCodeActionsUtils(init)
}

function initCodeActionsDefault(init: InitDb) {
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class',
		name: 'default',
		order: 0
	})
}

function initCodeActionsDoFieldAuth(init: InitDb) {
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do_auth',
		name: 'resendCode',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do_auth',
		name: 'setUserId',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do_auth',
		name: 'submit',
		order: 0
	})
}

function initCodeActionsDoGroupItem(init: InitDb) {
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do',
		name: 'doDetailDelete',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do',
		name: 'doDetailMigrate',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do',
		name: 'doDetailNew',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do',
		name: 'doDetailMsgSetClosed',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do',
		name: 'doDetailMsgSetOpen',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do',
		name: 'doDetailProcessExecute',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do',
		name: 'doDetailSave',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do',
		name: 'doDetailSaveAs',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do',
		name: 'doEmbedListConfigEdit',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do',
		name: 'doEmbedListConfigNew',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do',
		name: 'doEmbedListEditParmValue',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do',
		name: 'doEmbedListSelect',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do',
		name: 'doListDetailEdit',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do',
		name: 'doListDetailNew',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do',
		name: 'doListDownload',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do',
		name: 'doListSelfRefresh',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do',
		name: 'doListSelfSave',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do',
		name: 'doOpen',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do',
		name: 'doOpenLink',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_do',
		name: 'doSaveCancel',
		order: 0
	})
}

function initCodeActionsModal(init: InitDb) {
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_modal',
		name: 'embedField',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_modal',
		name: 'embedShell',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_modal',
		name: 'modalCancel',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_modal',
		name: 'modalDone',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_modal',
		name: 'modalEmbed',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_modal',
		name: 'modalSelectOpen',
		order: 0
	})
}

function initCodeActionsNav(init: InitDb) {
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_nav',
		name: 'navBack',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_nav',
		name: 'navCrumbs',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_nav',
		name: 'navHome',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_nav',
		name: 'navMenuOpen',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_nav',
		name: 'navPage',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_nav',
		name: 'navRow',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_nav',
		name: 'navTab',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_nav',
		name: 'openDrawerDataObj',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_nav',
		name: 'openModalDataObj',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_nav',
		name: 'openNode',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_nav',
		name: 'none',
		order: 0
	})
}

function initCodeActionsUtils(init: InitDb) {
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_utils',
		name: 'dbExpression',
		order: 0
	})
	init.addTrans('sysCodeAction', {
		owner: 'sys_system',
		codeType: 'ct_sys_code_action_class_utils',
		name: 'none',
		order: 0
	})
}
