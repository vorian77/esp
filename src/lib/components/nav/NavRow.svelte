<script lang="ts">
	import { ContextKey, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { type AppLevelRowStatus, AppRowActionType } from '$comps/app/types.app.svelte'
	import {
		State,
		StatePacket,
		StatePacketAction,
		StateTarget
	} from '$comps/app/types.appState.svelte'
	import { TokenAppDoActionConfirmType, TokenAppRow } from '$utils/types.token'
	import NavRowAction from '$comps/nav/NavRowAction.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/nav/NavRow.svelte'

	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')

	let currTab = $derived(sm.app.getCurrTab())
	let isHideRowManager = $state(currTab ? currTab?.isHideRowManager : false)
	let rowStatus: AppLevelRowStatus = $derived(sm.app.getRowStatus())

	function onChange(rowAction: AppRowActionType) {
		sm.change({
			confirmType: TokenAppDoActionConfirmType.statusChanged,
			packet: new StatePacket({
				action: StatePacketAction.navRow,
				token: new TokenAppRow({ rowAction })
			}),
			target: StateTarget.feature
		})
	}
</script>

{#if rowStatus && rowStatus.show && !isHideRowManager}
	<div class="flex flex-row p-2 h-[48px] items-center rounded-md border bg-white">
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
