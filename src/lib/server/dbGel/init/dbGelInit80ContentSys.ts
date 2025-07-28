import { InitDb } from '$server/dbGel/init/types.init'

export function initContentSys(init: InitDb) {
	initTaskQuote(init)
}

function initTaskQuote(init: InitDb) {
	init.addTrans('sysTask', {
		codeIcon: 'Quote',
		codeTaskStatusObj: 'tso_sys_quote',
		codeTaskType: 'taskWidget',
		header: 'Quote',
		isGlobalResource: true,
		name: 'task_sys_quote',
		ownerSys: 'sys_system'
	})
}
