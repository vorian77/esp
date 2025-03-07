import { InitDb } from '$server/dbGel/init/types.init'

export function initContentSys(init: InitDb) {
	initTaskQuote(init)
}

function initTaskQuote(init: InitDb) {
	init.addTrans('sysTask', {
		codeIcon: 'Quote',
		codeRenderType: 'button',
		codeStatusObj: 'tso_sys_quote',
		header: 'Quote',
		isPinToDash: false,
		isGlobalResource: true,
		name: 'task_sys_quote',
		orderDefine: 0,
		owner: 'sys_system'
	})
}
