<script lang="ts">
	import { type AppLevelRowStatus, AppRowActionType } from '$comps/app/types.app'
	import { State, StatePacket, StatePacketAction } from '$comps/app/types.appState'
	import { TokenAppDoActionConfirmType, TokenAppRow } from '$utils/types.token'
	import NavRowAction from '$comps/app/NavRowAction.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	export let state: State
	export let rowStatus: AppLevelRowStatus | undefined

	let isHideRowManager

	$: {
		const currTab = state.app.getCurrTab()
		isHideRowManager = currTab ? currTab?.isHideRowManager : false
	}

	async function onChange(rowAction: AppRowActionType) {
		state.update({
			packet: new StatePacket({
				action: StatePacketAction.navRow,
				confirmType: TokenAppDoActionConfirmType.objectChanged,
				token: new TokenAppRow({ rowAction })
			})
		})
	}
</script>

{#if rowStatus && rowStatus.show && !isHideRowManager}
	<span style:cursor="pointer">
		<div class="flex">
			<div class={rowStatus.rowCurrentDisplay === 1 ? 'invisible' : ''}>
				<NavRowAction action={AppRowActionType.first} icon={'ChevronFirst'} {onChange} />
			</div>
			<div class={rowStatus.rowCurrentDisplay === 1 ? 'invisible' : ''}>
				<NavRowAction action={AppRowActionType.left} icon={'ChevronLeft'} {onChange} />
			</div>
			<div class="ml-1">{rowStatus.status}</div>
			<div class={rowStatus.rowCurrentDisplay === rowStatus.rowCount ? 'invisible' : ''}>
				<NavRowAction action={AppRowActionType.right} icon={'ChevronRight'} {onChange} />
			</div>
			<div class={rowStatus.rowCurrentDisplay === rowStatus.rowCount ? 'invisible' : ''}>
				<NavRowAction action={AppRowActionType.last} icon={'ChevronLast'} {onChange} />
			</div>
		</div>
	</span>
{/if}
