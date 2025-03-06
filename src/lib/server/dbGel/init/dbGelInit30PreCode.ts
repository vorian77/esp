import { InitDb } from '$server/dbGel/init/types.init'

export function initPreCode(init: InitDb) {
	initCodeType(init)
	initCode(init)
}

function initCodeType(init: InitDb) {
	init.addTrans('sysCodeType', {
		owner: 'sys_system_old',
		name: 'ct_sys_code_action_class'
	})
	init.addTrans('sysCodeType', {
		owner: 'sys_system_old',
		name: 'ct_sys_code_action_class_do',
		parent: 'ct_sys_code_action_class'
	})
	init.addTrans('sysCodeType', {
		owner: 'sys_system_old',
		name: 'ct_sys_code_action_class_do_auth',
		parent: 'ct_sys_code_action_class'
	})
	init.addTrans('sysCodeType', {
		owner: 'sys_system_old',
		name: 'ct_sys_code_action_class_modal',
		parent: 'ct_sys_code_action_class'
	})
	init.addTrans('sysCodeType', {
		owner: 'sys_system_old',
		name: 'ct_sys_code_action_class_nav',
		parent: 'ct_sys_code_action_class'
	})
	init.addTrans('sysCodeType', {
		owner: 'sys_system_old',
		name: 'ct_sys_code_action_class_utils',
		parent: 'ct_sys_code_action_class'
	})
}

function initCode(init: InitDb) {
	init.addTrans('sysCode', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_task_status_obj',
		name: 'tso_sys_data'
	})
	init.addTrans('sysCode', {
		owner: 'sys_system_old',
		codeType: 'ct_sys_task_status_obj',
		name: 'tso_sys_quote'
	})
	init.addTrans('sysCode', {
		owner: 'sys_moed_old',
		codeType: 'ct_sys_task_status_obj',
		name: 'tso_moed_ssr_doc'
	})
}
