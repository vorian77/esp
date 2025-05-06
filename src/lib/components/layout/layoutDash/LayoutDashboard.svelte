<script lang="ts">
	import { State, StateNavLayout, StateParms } from '$comps/app/types.appState.svelte'
	import FormDetail from '$comps/form/FormDetail.svelte'
	import TsoMoedSsrDoc from '$comps/layout/layoutDash/tso_moed_ssr_doc.svelte'
	import TsoSysData from '$comps/layout/layoutDash/tso_sys_data.svelte'
	import TsoSysQuote from '$comps/layout/layoutDash/tso_sys_quote.svelte'
	import { apiFetchFunction, ApiFunction } from '$routes/api/api'
	import { clientQueryExpr } from '$lib/query/queryManagerClient'
	import {
		CodeAction,
		CodeActionClass,
		CodeActionType,
		ContextKey,
		DataObjComponent,
		type DataRecord,
		MethodResult,
		UserResourceTask
	} from '$utils/types'
	import {
		TokenApiQueryData,
		TokenAppStateTriggerAction,
		TokenAppUserActionConfirmType
	} from '$utils/types.token'
	import { getContext } from 'svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/layout/layoutDash/LayoutDash.svelte'
	const StatusType = {
		tso_moed_ssr_doc: TsoMoedSsrDoc,
		tso_sys_data: TsoSysData,
		tso_sys_quote: TsoSysQuote
	}

	let sm: State = getContext(ContextKey.stateManager)
	let dm: DataManager = $derived(sm.dm)

	let tasks = $state(sm.getTasksDash(setTasks))

	$effect(() => {
		async function getTaskData() {
			await getData(tasks)
		}
		getTaskData()
	})

	let promise = $derived(getData(tasks))

	async function getData(tasks: UserResourceTask[] = []): Promise<MethodResult> {
		for (let i = 0; i < tasks.length; i++) {
			let result: MethodResult = await getDataTask(tasks[i])
			if (result.error) return result
		}
		return tasks
	}

	async function getDataTask(task: UserResourceTask): Promise<MethodResult> {
		task.data = {}

		let result: MethodResult = await getDataShow(task)
		if (result.error) return result
		task.setShow(result.data)

		if (task.isShow) {
			if (task.pageDataObjId) {
				let result = await task.loadPage(sm)
				if (result.error) return result
			}
			result = await getDataStatus(task)
			if (result.error) return result
			task.data = result.data
		}
		return new MethodResult()
	}

	async function getDataShow(task: UserResourceTask) {
		let isShow = false
		// if (task.isPinToDash) {
		// 	isShow = true
		// } else if (!task.exprShow) {
		// 	isShow = false
		// } else {
		// 	const result: MethodResult = await getDataDB(task, task.exprShow)
		// 	if (result.error) return result
		// 	isShow = result.getResultExpr()[0]
		// }
		return new MethodResult(isShow)
	}

	async function getDataStatus(task: UserResourceTask) {
		let status = undefined
		if (!task.exprStatus) {
			status = undefined
		} else {
			const result: MethodResult = await getDataDB(task, task.exprStatus)
			if (result.error) return undefined
			status = result.getResultExpr()
		}
		return new MethodResult(status)
	}

	async function getDataDB(task: UserResourceTask, dbExpr: string) {
		const evalExprContext = `${FILENAME}.getDataDB`
		return await clientQueryExpr(dbExpr, evalExprContext, {}, sm)
	}

	async function onClick(
		task: UserResourceTask,
		parms: DataRecord | undefined = undefined
	): Promise<MethodResult> {
		if (task.dataObjPage) {
			// handled by custom actions on form
			return new MethodResult()
		} else if (task.targetDataObjId || task.targetNodeObj) {
			sm.parmsState.update(parms)
			const token = await task.getTokenNode(sm)
			return await sm.triggerAction(
				new TokenAppStateTriggerAction({
					codeAction: CodeAction.init(
						CodeActionClass.ct_sys_code_action_class_nav,
						CodeActionType.openNode
					),
					codeConfirmType: TokenAppUserActionConfirmType.statusChanged,
					data: { token },
					stateParms: new StateParms({ navLayout: StateNavLayout.layoutApp })
				})
			)
		} else {
			await getDataTask(task)
			task.toggleRecreate()
		}
		return new MethodResult()
	}

	async function setTasks() {
		tasks = sm.user.getTasksDash(setTasks)
	}
</script>

<!-- <DataViewer header="task.isShow" data={task.isShow} /> -->

{#await promise}
	<p>Loading tasks...</p>
{:then tasks}
	{#if tasks.length === 0}
		<h1 class="p-4">No tasks are pinned or triggered.</h1>
	{:else}
		<div class="h-full flex flex-col overflow-y-auto gap-3 p-4 bg-neutral-100">
			{#each tasks as task}
				{#if task.isShow}
					{@const isButton = !task.dataObjPage && !task.hasAltOpen}
					<div
						class="bg-white rounded-lg p-4 flex flex-col items-center border shadow-md {isButton
							? 'cursor-pointer hover:bg-gray-100'
							: ''}"
						onclick={task.hasAltOpen ? undefined : () => onClick(task)}
					>
						{#if task.dataObjPage}
							<FormDetail
								parms={{
									component: DataObjComponent.FormDetail,
									dataObjId: task.pageDataObjId,
									isFixedHeight: true
								}}
							/>
						{:else}
							{@const Component = task.codeStatusObjName
								? StatusType[task.codeStatusObjName]
								: undefined}
							{#key task.isRecreate}
								<h5 class="mb-6 text-4xl font-bold tracking-tight text-blue-400">
									{task.header}
								</h5>
								{#if Component}
									<Component {task} {onClick} data={task.data} />
								{/if}
							{/key}
						{/if}
					</div>
				{/if}
			{/each}
		</div>
	{/if}
{:catch error}
	<p>Could not retrieve tasks - error: {error.message}</p>
{/await}
