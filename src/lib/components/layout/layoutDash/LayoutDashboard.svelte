<script lang="ts">
	import {
		State,
		StateNavLayout,
		StateParms,
		StateTriggerToken
	} from '$comps/app/types.appState.svelte'
	import {
		TokenApiQueryData,
		TokenAppNode,
		TokenAppStateTriggerAction,
		TokenAppUserActionConfirmType
	} from '$utils/types.token'
	import { apiFetch, ApiFunction } from '$routes/api/api'
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
		UserResourceTaskCategory,
		UserResourceTaskRenderType
	} from '$utils/types'
	import { getContext, setContext } from 'svelte'
	import TsoMoedSsrAdvocate from '$comps/layout/layoutDash/tso_moed_ssr_advocate.svelte'
	import TsoMoedSsrApp from '$comps/layout/layoutDash/tso_moed_ssr_app.svelte'
	import TsoMoedSsrDoc from '$comps/layout/layoutDash/tso_moed_ssr_doc.svelte'
	import TsoMoedSsrMsg from '$comps/layout/layoutDash/tso_moed_ssr_msg.svelte'
	import FormDetail from '$comps/form/FormDetail.svelte'
	import DataViewer from '$utils/DataViewer.svelte'
	import { goto } from '$app/navigation'
	import { error } from '@sveltejs/kit'

	const FILENAME = '$comps/layout/layoutDash/LayoutDash.svelte'

	let sm: State = getContext(ContextKey.stateManager)
	let dm: DataManager = $derived(sm.dm)

	const fCallback = () => getData()

	let tasks = $derived(
		[...sm.user.resources_sys_task_default, ...sm.user?.resources_sys_task_setting].filter(
			(task: UserResourceTask) =>
				task.codeStatusObjName || task.codeRenderType === UserResourceTaskRenderType.page
		)
	)
	const StatusType = {
		tso_moed_ssr_advocate: TsoMoedSsrAdvocate,
		tso_moed_ssr_app: TsoMoedSsrApp,
		tso_moed_ssr_doc: TsoMoedSsrDoc,
		tso_moed_ssr_msg: TsoMoedSsrMsg
	}

	let promise = $state(getData())

	async function getData() {
		sm.newApp({ isMultiTree: true })
		for (let i = 0; i < tasks.length; i++) {
			await getDataTask(tasks[i])
		}
		return tasks
	}

	async function getDataTask(task: UserResourceTask) {
		task.data = {}
		task.setShow(await getDataShow(task))
		if (task.isShow) {
			if (task.pageDataObjId) {
				await task.loadPage(sm, fCallback)
			}
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
		}
	}
</script>

{#await promise}
	<p>Loading tasks...</p>
{:then tasks}
	{#if tasks.length === 0}
		<h1 class="p-4">No tasks to complete or widgets configured.</h1>
	{:else}
		<div class="h-full flex flex-col overflow-y-auto gap-3 p-4 bg-neutral-100">
			<!-- <button class="btn btn-action variant-ghost-primary" onclick={() => (promise = getData())}
				>Refresh Dashboard</button
			> -->
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
							<h5 class="mb-6 text-4xl font-bold tracking-tight text-blue-400">
								{task.header}
							</h5>
							{#if Component}
								<Component {task} {onClick} data={task.data} />
							{/if}
						{/if}
					</div>
				{/if}
			{/each}
		</div>
	{/if}
{:catch error}
	<p>Could not retrieve tasks - error: {error.message}</p>
{/await}
