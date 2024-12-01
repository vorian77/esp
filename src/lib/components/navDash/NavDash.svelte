<script lang="ts">
	import { State, StatePacket, StatePacketAction } from '$comps/app/types.appState'
	import { TokenApiQueryData, TokenAppDoActionConfirmType, TokenAppNode } from '$utils/types.token'
	import { apiFetch, ApiFunction } from '$routes/api/api'
	import {
		DataObjData,
		type DataRecord,
		Node,
		NodeNav,
		ParmsValuesType,
		ResponseBody,
		UserResourceTask,
		UserResourceTaskCategory
	} from '$utils/types'
	import TsoMoedApp from '$comps/navDash/tso_moed_app.svelte'
	import TsoMoedAppDoc from '$comps/navDash/tso_moed_app_doc.svelte'
	import DataViewer from '$utils/DataViewer.svelte'
	import { error } from '@sveltejs/kit'

	const FILENAME = '$comps/navDash/NavDash.svelte'

	export let state: State

	$: tasks = [
		...state.user.resources_sys_task_default,
		...state.user?.resources_sys_task_setting
	].filter((task: UserResourceTask) => task.codeStatusObjName || state.user?.isMobileOnly)

	const StatusType = { tso_moed_app: TsoMoedApp, tso_moed_app_doc: TsoMoedAppDoc }

	const getStatusData = async (task: UserResourceTask) => {
		if (!task.exprStatus) return undefined

		const dataTab = new DataObjData()
		dataTab.parms.valueSet(ParmsValuesType.dbExpr, task.exprStatus)

		const result: ResponseBody = await apiFetch(
			ApiFunction.dbEdgeProcessExpression,
			new TokenApiQueryData({ dataTab })
		)
		if (result.success) {
			return result.data
		} else {
			error(500, {
				file: FILENAME,
				function: 'getStatusData',
				message: `Error retrieving status data for task: ${task.name}`
			})
		}
	}

	async function onClick(task: UserResourceTask, parms: DataRecord | undefined = undefined) {
		state.parmsState.update(parms)
		const token = task.getTokenNode(state.user)
		state.update({
			page: token.node.page,
			nodeType: token.node.type,
			packet: new StatePacket({
				action: StatePacketAction.openNode,
				confirmType: TokenAppDoActionConfirmType.objectChanged,
				token
			})
		})
	}
</script>

{#each tasks as task}
	{#await getStatusData(task)}
		<p>...loading task status</p>
	{:then statusData}
		<div
			on:click={task.hasAltOpen ? undefined : onClick(task)}
			class="container rounded-lg mt-2 p-6 border-4 bg-gray-100 min-h-40 flex flex-col items-center"
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
	{:catch error}
		<p>Error: {error.message}</p>
	{/await}
{/each}
