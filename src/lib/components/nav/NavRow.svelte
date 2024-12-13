<script lang="ts">
	import { type AppLevelRowStatus, AppRowActionType } from '$comps/app/types.app'
	import {
		State,
		StatePacket,
		StatePacketAction,
		StateProps,
		StateTarget
	} from '$comps/app/types.appState.svelte'
	import { TokenAppDoActionConfirmType, TokenAppRow } from '$utils/types.token'
	import NavRowAction from '$comps/nav/NavRowAction.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	let {
		stateProps = $bindable(),
		rowStatus
	}: { stateProps: StateProps; rowStatus: AppLevelRowStatus } = $props()

	let currTab = $derived(stateProps.state.app.getCurrTab())
	let isHideRowManager = $state(currTab ? currTab?.isHideRowManager : false)

	async function onChange(rowAction: AppRowActionType) {
		stateProps.change({
			confirmType: TokenAppDoActionConfirmType.objectChanged,
			packet: new StatePacket({
				action: StatePacketAction.navRow,
				token: new TokenAppRow({ rowAction })
			}),
			target: StateTarget.feature
		})
	}
</script>

{#if rowStatus && rowStatus.show && !isHideRowManager}
	<span style:cursor="pointer">
		<div
			class="flex flex-row p-2 h-[46px] items-center border-2 bg-white rounded-md md:rounded-none"
		>
			<div class="flex flex-row">
				<div class={rowStatus.rowCurrentDisplay === 1 ? 'invisible' : ''}>
					<NavRowAction action={AppRowActionType.first} icon={'ChevronFirst'} {onChange} />
				</div>
				<div class={rowStatus.rowCurrentDisplay === 1 ? 'invisible' : '-ml-2'}>
					<NavRowAction action={AppRowActionType.left} icon={'ChevronLeft'} {onChange} />
				</div>
			</div>
			<div class="-mt-1.5 text-sm font-medium text-nav">
				{rowStatus.status}
			</div>
			<div class="flex flex-row">
				<div class={rowStatus.rowCurrentDisplay === rowStatus.rowCount ? 'invisible' : ''}>
					<NavRowAction action={AppRowActionType.right} icon={'ChevronRight'} {onChange} />
				</div>
				<div class={rowStatus.rowCurrentDisplay === rowStatus.rowCount ? 'invisible' : '-ml-2'}>
					<NavRowAction action={AppRowActionType.last} icon={'ChevronLast'} {onChange} />
				</div>
			</div>
		</div>
	</span>
{/if}
