<script lang="ts">
	import {
		State,
		StatePacket,
		StatePacketAction,
		StateTarget
	} from '$comps/app/types.appState.svelte'
	import { TokenApiQueryData, TokenAppDoActionConfirmType, TokenAppNode } from '$utils/types.token'
	import { apiFetch, ApiFunction } from '$routes/api/api'
	import {
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

	let stateApp: State = getContext(ContextKey.stateApp)
	let dm: DataManager = $derived(stateApp.dataManager)
	dm.reset()
	let keyValue: boolean = $state(false)

	// setContext(ContextKey.dashboardReset, reset)

	class TaskList {
		tasks: UserResourceTask[] = []
		reset: boolean = $state(false)
		constructor(tasks: UserResourceTask[]) {
			this.tasks = tasks
		}
		resetTasks() {
			this.reset = !this.reset
			console.log('resetTasks.current:', this.reset)
		}
	}

	let taskList = $derived(
		new TaskList(
			[
				...stateApp.user.resources_sys_task_default,
				...stateApp.user?.resources_sys_task_setting
			].filter(
				(task: UserResourceTask) =>
					task.codeStatusObjName || task.codeRenderType === UserResourceTaskRenderType.page
			)
		)
	)
	const StatusType = { tso_moed_app: TsoMoedApp, tso_moed_app_doc: TsoMoedAppDoc }

	const getData = async (task: UserResourceTask) => {
		let taskData: DataRecord = {}
		task.setShow(await getDataShow(task))
		console.log('getData.task', { task: task.name, show: task.isShow })
		if (task.isShow) {
			await task.loadPage(stateApp)
			if (task.dataObjPage) dm.nodeAdd(task.dataObjPage)
			taskData.data = await getDataStatus(task)
		}
		return taskData
	}

	const getDataShow = async (task: UserResourceTask) => {
		if (!task.exprShow) return true
		const show = await getDataDB(task, task.exprShow)
		return show.data[0]
	}

	const getDataStatus = async (task: UserResourceTask) => {
		if (!task.exprStatus) return undefined
		const status = await getDataDB(task, task.exprStatus)
		return status.data
	}

	const getDataDB = async (task: UserResourceTask, expr: string) => {
		const dataTab = new DataObjData()
		dataTab.parms.valueSet(ParmsValuesType.dbExpr, expr)

		const result: ResponseBody = await apiFetch(
			ApiFunction.dbEdgeProcessExpression,
			new TokenApiQueryData({ dataTab, user: stateApp.user })
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
		if (task.targetDataObjId || task.targetNodeObjId) {
			stateApp.parmsState.update(parms)
			const token = task.getTokenNode(stateApp.user)
			stateApp.change({
				confirmType: TokenAppDoActionConfirmType.statusChanged,
				packet: new StatePacket({
					action: StatePacketAction.openNode,
					token
				}),
				target: StateTarget.feature
			})
		}
		taskList.resetTasks()
	}
</script>

{#if taskList}
	{#key taskList.reset}
		<div class="flex flex-col items-center gap-3">
			{#each taskList.tasks as task}
				{#await getData(task)}
					<p>Loading dashboard widget: {task.header}...</p>
				{:then statusData}
					{#if task.isShow}
						<div
							class=" w-full bg-white rounded-lg p-6 border-2 bg-gray-200 min-h-40 flex flex-col items-center shadow-md"
							onclick={() => onClick(task)}
						>
							{#if task.dataObjPage}
								{@const pageParms = {
									component: DataObjComponent.FormDetail,
									dataObjId: task.pageDataObjId
								}}

								<div class="w-full p-4 border border-grey-300">
									<!-- {@html `
								<div class="flex flex-col gap-4 text-center">
			<div class="flex flex-col justify-center gap-4 text-center">
			<h1 class="text-green-400 text-3xl">Welcome</h1>

			<div class="flex justify-center items-center mt-0">
				<img class="w-60" src="src/lib/assets/org_logo_moed.png" alt="Logo" />
			</div>

			<p> <span class="font-bold">Youth Opportunity (YO) Baltimore</span> serves individuals between the ages of 18 and 24 who are out of school and/or looking for employment or connections to college. Operating out of two locations - one in West Baltimore and one in East Baltimore - YO embraces a model that offers a full range of srvices that lead to your success.</p>
		
		</div>`} -->
									<FormDetail parms={pageParms} />
								</div>
							{:else if statusData && statusData.data && StatusType[task.codeStatusObjName]}
								{@const Component = StatusType[task.codeStatusObjName]}
								<button
									class="onclick={task.hasAltOpen || task.dataObjPage
										? undefined
										: () => onClick(task)}"
								>
									<h5
										class="mb-2 text-4xl font-bold tracking-tight text-blue-400 hover:bg-gray-100"
									>
										{task.header}
									</h5>
									<p class="mt-6 mb-2 text-center text-2xl text-blue-300">Status</p>
									<Component {task} {onClick} data={statusData.data} />
								</button>
							{/if}
						</div>
					{/if}
				{:catch error}
					<p>Task Status Data Error: {error.message}</p>
				{/await}
			{/each}
		</div>
	{/key}
{/if}
