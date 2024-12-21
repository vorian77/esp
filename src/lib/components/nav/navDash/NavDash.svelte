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
		DataObjData,
		type DataRecord,
		Node,
		NodeNav,
		ParmsValuesType,
		ResponseBody,
		UserResourceTask,
		UserResourceTaskCategory
	} from '$utils/types'
	import { getContext } from 'svelte'
	import TsoMoedApp from '$comps/nav/navDash/tso_moed_app.svelte'
	import TsoMoedAppDoc from '$comps/nav/navDash/tso_moed_app_doc.svelte'
	import DataViewer from '$utils/DataViewer.svelte'
	import { error } from '@sveltejs/kit'

	const FILENAME = '$comps/nav/navDash/NavDash.svelte'

	let stateApp: State = getContext(ContextKey.stateApp)

	let tasks = $derived(
		[
			...stateApp.user.resources_sys_task_default,
			...stateApp.user?.resources_sys_task_setting
		].filter((task: UserResourceTask) => task.codeStatusObjName)
	)
	const StatusType = { tso_moed_app: TsoMoedApp, tso_moed_app_doc: TsoMoedAppDoc }

	const getData = async (task: UserResourceTask) => {
		let taskData: DataRecord = {}
		task.setShow(await getDataShow(task))
		if (task.isShow) taskData.data = await getDataStatus(task)
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
</script>

{#each tasks as task}
	{#await getData(task)}
		<p>...loading task data</p>
	{:then statusData}
		{#if task.isShow}
			<div
				onclick={task.hasAltOpen ? undefined : () => onClick(task)}
				class="rounded-lg p-6 border bg-gray-100 min-h-40 flex flex-col items-center"
			>
				<div class="text-center font-bold text-4xl text-blue-400">{task.header}</div>

				{#if statusData && statusData.data && StatusType[task.codeStatusObjName]}
					<p class="mt-6 mb-2 text-center text-3xl text-blue-300">Status</p>
					<svelte:component
						this={StatusType[task.codeStatusObjName]}
						{task}
						{onClick}
						data={statusData.data}
					/>
				{/if}
			</div>
		{/if}
	{:catch error}
		<p>Task Status Data Error: {error.message}</p>
	{/await}
{/each}
