<script lang="ts">
	import { State, StatePacket, StateTarget } from '$comps/app/types.appState.svelte'
	import {
		TokenApiQueryData,
		TokenAppNode,
		TokenAppUserActionConfirmType
	} from '$utils/types.token'
	import { apiFetch, ApiFunction } from '$routes/api/api'
	import {
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
		UserResourceTaskCategory,
		UserResourceTaskRenderType
	} from '$utils/types'
	import { getContext, setContext } from 'svelte'
	import TsoMoedApp from '$comps/nav/navDash/tso_moed_app.svelte'
	import TsoMoedAppDoc from '$comps/nav/navDash/tso_moed_app_doc.svelte'
	import FormDetail from '$comps/form/FormDetail.svelte'
	import DataViewer from '$utils/DataViewer.svelte'
	import { goto } from '$app/navigation'
	import { error } from '@sveltejs/kit'

	const FILENAME = '$comps/nav/navDash/NavDash.svelte'

	let sm: State = getContext(ContextKey.stateManager)
	let dm: DataManager = $derived(sm.dm)
	dm.reset()
	let keyValue: boolean = $state(false)

	setContext(ContextKey.dashboardRefresh, getData)

	let tasks = $derived(
		[...sm.user.resources_sys_task_default, ...sm.user?.resources_sys_task_setting].filter(
			(task: UserResourceTask) =>
				task.codeStatusObjName || task.codeRenderType === UserResourceTaskRenderType.page
		)
	)
	const StatusType = { tso_moed_app: TsoMoedApp, tso_moed_app_doc: TsoMoedAppDoc }

	let promise = $state(getData())

	async function getData() {
		for (let i = 0; i < tasks.length; i++) {
			await getDataTask(tasks[i])
		}
		return tasks
	}

	async function getDataTask(task: UserResourceTask) {
		task.data = {}
		task.setShow(await getDataShow(task))
		if (task.isShow) {
			await task.loadPage(sm)
			if (task.dataObjPage) dm.nodeAdd(task.dataObjPage)
			task.data = await getDataStatus(task)
		}
	}

	async function getDataShow(task: UserResourceTask) {
		if (!task.exprShow) return true
		const show = await getDataDB(task, task.exprShow)
		return show.data[0]
	}

	async function getDataStatus(task: UserResourceTask) {
		if (!task.exprStatus) return undefined
		const status = await getDataDB(task, task.exprStatus)
		return status.data
	}

	async function getDataDB(task: UserResourceTask, expr: string) {
		const dataTab = new DataObjData()
		dataTab.parms.valueSet(ParmsValuesType.dbExpr, expr)

		const result: ResponseBody = await apiFetch(
			ApiFunction.dbEdgeProcessExpression,
			new TokenApiQueryData({ dataTab, user: sm.user })
		)
		if (result.success) {
			return result.data
		} else {
			error(500, {
				file: FILENAME,
				function: 'getDataDB',
				message: `Error retrieving data for task: ${task.name}`
			})
		}
	}
	async function onClick(task: UserResourceTask, parms: DataRecord | undefined = undefined) {
		if ((task.targetDataObjId || task.targetNodeObjId) && !task.dataObjPage) {
			console.log('NavDash.onClick', task)

			sm.parmsState.update(parms)
			const token = task.getTokenNode(sm.user)
			sm.change({
				confirmType: TokenAppUserActionConfirmType.statusChanged,
				packet: new StatePacket({
					actionType: CodeActionType.openNode,
					token
				}),
				target: StateTarget.feature
			})
		}
	}
</script>

{#await promise}
	<p>Loading tasks...</p>
{:then tasks}
	{#if tasks.length === 0}
		<h1 class="p-4">No tasks to complete or widgets configured.</h1>
	{:else}
		<button class="btn btn-action variant-ghost-primary" onclick={() => (promise = getData())}
			>Refresh Dashboard</button
		>
		<div class="h-full flex flex-col overflow-y-auto gap-4 p-4">
			{#each tasks as task}
				<!-- {#if task.isShow} -->
				{@const isButton = !task.dataObjPage && !task.hasAltOpen}
				<div
					class="bg-white rounded-lg p-4 flex flex-col items-center border border-gray-200 shawdow-xl {isButton
						? 'cursor-pointer hover:bg-gray-100'
						: ''}"
					onclick={task.hasAltOpen ? undefined : () => onClick(task)}
				>
					{#if task.dataObjPage}
						{@const pageParms = {
							component: DataObjComponent.FormDetail,
							dataObjId: task.pageDataObjId
						}}
						<FormDetail parms={pageParms} />
					{:else}
						{@const Component = task.codeStatusObjName
							? StatusType[task.codeStatusObjName]
							: undefined}
						{@const hasStatus = task.data}
						<h5 class="mb-2 text-4xl font-bold tracking-tight text-blue-400">
							{task.header}
						</h5>
						{#if hasStatus}
							<p class="mt-6 mb-2 text-center text-2xl text-blue-300">Status</p>
						{/if}
						{#if Component}
							<Component {task} {onClick} data={task.data} />
						{/if}
					{/if}
				</div>
				<!-- {/if} -->
			{/each}
		</div>
	{/if}
{:catch error}
	<p>Could not retrieve tasks - error: {error.message}</p>
{/await}
