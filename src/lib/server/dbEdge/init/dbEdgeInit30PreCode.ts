import { InitDb } from '$server/dbEdge/init/types.init'

export function initPreCode(init: InitDb) {
	initCodeTypes(init)
}

function initCodeTypes(init: InitDb) {
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
		name: 'ct_sys_code_action_class_do_embed',
		parent: 'ct_sys_code_action_class'
	})
	init.addTrans('sysCodeType', {
		owner: 'sys_system_old',
		name: 'ct_sys_code_action_class_do_field_auth',
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
