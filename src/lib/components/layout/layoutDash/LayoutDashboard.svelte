<script lang="ts">
	import {
		State,
		StateNavLayout,
		StateParms,
		StateTriggerToken
	} from '$comps/app/types.appState.svelte'
	import {
		TokenApiFetchError,
		TokenApiQueryData,
		TokenAppNode,
		TokenAppStateTriggerAction,
		TokenAppUserActionConfirmType
	} from '$utils/types.token'
	import { apiFetchFunction, ApiFunction } from '$routes/api/api'
	import {
		CodeAction,
		CodeActionClass,
		CodeActionType,
		ContextKey,
		DataObjComponent,
		DataObjData,
		type DataRecord,
		Node,
		NodeNav,
		ParmsValuesType,
		ResponseBody,
		UserResourceTask,
		UserResourceTaskRenderType
	} from '$utils/types'
	import { getContext, setContext } from 'svelte'
	import TsoMoedSsrDoc from '$comps/layout/layoutDash/tso_moed_ssr_doc.svelte'
	import TsoSysData from '$comps/layout/layoutDash/tso_sys_data.svelte'
	import TsoSysQuote from '$comps/layout/layoutDash/tso_sys_quote.svelte'
	import FormDetail from '$comps/form/FormDetail.svelte'
	import DataViewer from '$utils/DataViewer.svelte'
	import { goto } from '$app/navigation'
	import { error } from '@sveltejs/kit'

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

	async function getData(tasks: UserResourceTask[] = []) {
		for (let i = 0; i < tasks.length; i++) {
			await getDataTask(tasks[i])
		}
		return tasks
	}

	async function getDataTask(task: UserResourceTask) {
		task.data = {}
		task.setShow(await getDataShow(task))
		if (task.isShow) {
			if (task.pageDataObjId) await task.loadPage(sm)
			task.data = (await getDataStatus(task)) || []
		}
	}

	async function getDataShow(task: UserResourceTask) {
		if (task.isPinToDash) return true
		if (!task.exprShow) return false
		const show = await getDataDB(task, task.exprShow)
		return show.data[0]
	}

	async function getDataStatus(task: UserResourceTask) {
		if (!task.exprStatus) return undefined
		const status = await getDataDB(task, task.exprStatus)
		return status.data
	}

	async function getDataDB(task: UserResourceTask, dbExpr: string) {
		return await apiFetchFunction(
			ApiFunction.dbGelProcessExpression,
			new TokenApiFetchError(FILENAME, 'getDataDB', `Error retrieving data for task: ${task.name}`),
			new TokenApiQueryData({ dbExpr, user: sm.user })
		)
	}

	async function onClick(task: UserResourceTask, parms: DataRecord | undefined = undefined) {
		if (task.dataObjPage) {
			// handled by custom actions on form
		} else if (task.targetDataObjId || task.targetNodeObj) {
			sm.parmsState.update(parms)
			const token = task.getTokenNode(sm.user)
			await sm.triggerAction(
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
	}

	async function setTasks() {
		tasks = sm.user.getTasksDash(setTasks)
	}
</script>

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
								{:else}
									no Component: {task.codeStatusObjName}
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
