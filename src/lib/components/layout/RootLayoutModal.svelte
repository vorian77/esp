<script lang="ts">
	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'
	import { StatePacketAction, StateSurfaceModal } from '$comps/app/types.appState.svelte'
	import { TokenAppModalReturn, TokenAppModalReturnType } from '$utils/types.token'
	import { getModalStore } from '@skeletonlabs/skeleton'
	import { DataObjCardinality, DataObjEmbedType, ParmsValuesType } from '$utils/types'
	import { DataObjActionField } from '$comps/dataObj/types.dataObjActionField'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/layout/RootLayoutModal.svelte'

	export let parent: any

	const storeModal = getModalStore()

	let state: StateSurfaceModal = $storeModal[0].meta.state
	let modeDelete: boolean = false

	state.setfChangeCallback((obj: any) => {
		state.packet = obj.packet
		if (
			state.embedType === DataObjEmbedType.listConfig &&
			obj.packet.action === StatePacketAction.doDetailDelete
		) {
			modeDelete = true
		}
	})

	$: {
		if (modeDelete) {
			const currTab = state.app.getCurrTab()
			const rowCnt = currTab?.data?.rowsRetrieved.dataRows.length
			if (rowCnt === 0) {
				if ($storeModal[0]?.response) {
					$storeModal[0].response(
						new TokenAppModalReturn({
							data: [],
							type: TokenAppModalReturnType.complete
						})
					)
				}
				storeModal.close()
			}
		}
	}

	async function onFooterActionClick(action: DataObjActionField) {
		switch (action.codePacketAction) {
			case StatePacketAction.modalCancel:
				if ($storeModal[0].response)
					$storeModal[0].response(
						new TokenAppModalReturn({
							data: undefined,
							type: TokenAppModalReturnType.cancel
						})
					)
				storeModal.close()
				break

			case StatePacketAction.modalDone:
				if ($storeModal[0].response)
					$storeModal[0].response(
						new TokenAppModalReturn({
							data: state.parmsState,
							type: TokenAppModalReturnType.complete
						})
					)
				storeModal.close()
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'onFooterActionClick',
					message: `No case defined for StatePacketAction: ${action.codePacketAction} `
				})
		}
	}
</script>

{#if state}
	<div class="esp-card-space-y w-modal-wide">
		<RootLayoutApp bind:state />

		<div class="flex justify-end">
			{#each state.actionsFieldDialog as action}
				<div class="pb-4 mr-2">
					<button
						disabled={action.isDisabled}
						class="w-full btn btn-action text-white"
						style:background-color={action.fieldColor.color}
						on:click={async () => await onFooterActionClick(action)}
					>
						{action.header}
					</button>
				</div>
			{/each}
		</div>
	</div>
{/if}
