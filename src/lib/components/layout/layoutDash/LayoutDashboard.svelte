<script lang="ts">
	import { State, StateNavLayout, StateParms } from '$comps/app/types.appState.svelte'
	import FormDetail from '$comps/form/FormDetail.svelte'
	import TsoMoedSsrDoc from '$comps/layout/layoutDash/tso_moed_ssr_doc.svelte'
	import TsoSysData from '$comps/layout/layoutDash/tso_sys_data.svelte'
	import TsoSysQuote from '$comps/layout/layoutDash/tso_sys_quote.svelte'
	import { apiFetchFunction, ApiFunction } from '$routes/api/api'
	import { clientQueryExpr } from '$lib/queryClient/types.queryClient'
	import {
		CodeAction,
		CodeActionClass,
		CodeActionType,
		ContextKey,
		type DataRecord,
		getDbExprRaw,
		MethodResult,
		NodeObjComponent,
		UserResourceTaskItem
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

	let { parms }: DataRecord = $props()

	let sm: State = getContext(ContextKey.stateManager)

	let promise = sm.user.resources_tasks.getTasksDashboard(sm)

	let refreshToggle = $state(false)

	async function onClick(
		task: UserResourceTaskItem,
		parms: DataRecord | undefined = undefined
	): Promise<MethodResult> {
		if (task.isHTMLPage) {
			// handled by custom actions on form
			return new MethodResult()
		} else if (task.nodeObj) {
			sm.parmsState.update(parms)
			const token = task.getTokenNode(sm)
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
		} else if (task.codeTaskStatusObjName) {
			task.toggleRefresh()
		}
		return new MethodResult()
	}
</script>

{#await promise}
	Loading tasks...
{:then result}
	{@const tasks = result.error ? [] : result.data}
	{#if tasks}
		{#if tasks.length === 0}
			<h1 class="p-4">None of your ({tasks.length}) tasks are pinned or triggered.</h1>
		{:else}
			<div class="h-full flex flex-col overflow-y-auto gap-3 p-4 bg-neutral-100">
				{#each tasks as task}
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
									component: NodeObjComponent.FormDetail,
									dataObjId: task.dataObjId,
									isFixedHeight: true
								}}
							/>
						{:else}
							{@const Component = task.codeTaskStatusObjName
								? StatusType[task.codeTaskStatusObjName]
								: undefined}
							<h5 class="mb-6 text-4xl font-bold tracking-tight text-blue-400">
								{task.header}
							</h5>
							{#if Component}
								<Component {task} {onClick} data={task.data} />
							{/if}
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	{:else}
		<h1 class="p-4">You have no tasks.</h1>
	{/if}
{/await}
