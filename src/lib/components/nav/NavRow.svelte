<script lang="ts">
	import {
		CodeAction,
		CodeActionClass,
		CodeActionType,
		ContextKey,
		ParmsUser,
		required
	} from '$utils/types'
	import { getContext } from 'svelte'
	import { type AppLevelRowStatus, AppRowActionType } from '$comps/app/types.app.svelte'
	import { State, StateTriggerToken } from '$comps/app/types.appState.svelte'
	import {
		TokenAppRow,
		TokenAppStateTriggerAction,
		TokenAppUserActionConfirmType
	} from '$utils/types.token'
	import NavRowAction from '$comps/nav/NavRowAction.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/nav/NavRow.svelte'

	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')

	let currTab = $derived(sm.app.getCurrTab())
	let isHideRowManager = $state(currTab ? currTab?.isHideRowManager : false)
	let rowStatus: AppLevelRowStatus = $derived(sm.app.navRowStatus())

	async function onChange(rowAction: AppRowActionType) {
		await sm.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_nav,
					CodeActionType.navRow
				),
				codeConfirmType: TokenAppUserActionConfirmType.statusChanged,
				data: { token: new TokenAppRow({ rowAction }) }
			})
		)
	}
</script>

{#if rowStatus && rowStatus.show && !isHideRowManager}
	<div class="flex flex-row p-2 h-[46px] items-center rounded-md border bg-white">
		<div class="flex flex-row">
			<div class={rowStatus.rowCurrentDisplay === 1 ? 'hidden' : ''}>
				<NavRowAction action={AppRowActionType.first} icon={'ChevronFirst'} {onChange} />
			</div>
			<div class={rowStatus.rowCurrentDisplay === 1 ? 'hidden' : '-ml-2'}>
				<NavRowAction action={AppRowActionType.left} icon={'ChevronLeft'} {onChange} />
			</div>
		</div>
		<div class="text-sm font-medium text-nav">
			{rowStatus.status}
		</div>
		<div class="flex flex-row">
			<div class={rowStatus.rowCurrentDisplay === rowStatus.rowCount ? 'hidden' : ''}>
				<NavRowAction action={AppRowActionType.right} icon={'ChevronRight'} {onChange} />
			</div>
			<div class={rowStatus.rowCurrentDisplay === rowStatus.rowCount ? 'hidden' : '-ml-2'}>
				<NavRowAction action={AppRowActionType.last} icon={'ChevronLast'} {onChange} />
			</div>
		</div>
	</div>
{/if}
