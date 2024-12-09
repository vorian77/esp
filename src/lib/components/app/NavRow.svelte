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

<!-- <div class="flex items-center">
	<svg
		class="h-full w-6 shrink-0 text-gray-200"
		viewBox="0 0 24 44"
		preserveAspectRatio="none"
		fill="currentColor"
		aria-hidden="true"
	>
		<path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
	</svg>
	<a href="#" class="ml-4 text-sm font-medium text-nav hover:text-nav-hover"> stuff </a>
</div> -->

{#if rowStatus && rowStatus.show && !isHideRowManager}
	<span style:cursor="pointer">
		<div class="flex items-center">
			<div class={rowStatus.rowCurrentDisplay === 1 ? 'invisible' : ''}>
				<NavRowAction action={AppRowActionType.first} icon={'ChevronFirst'} {onChange} />
			</div>
			<div class={rowStatus.rowCurrentDisplay === 1 ? 'invisible' : ''}>
				<NavRowAction action={AppRowActionType.left} icon={'ChevronLeft'} {onChange} />
			</div>
			<div class="ml-2 my-0 text-base font-medium text-nav">{rowStatus.status}</div>
			<div class={rowStatus.rowCurrentDisplay === rowStatus.rowCount ? 'invisible' : ''}>
				<NavRowAction action={AppRowActionType.right} icon={'ChevronRight'} {onChange} />
			</div>
			<div class={rowStatus.rowCurrentDisplay === rowStatus.rowCount ? 'invisible' : ''}>
				<NavRowAction action={AppRowActionType.last} icon={'ChevronLast'} {onChange} />
			</div>
		</div>
	</span>
{/if}
