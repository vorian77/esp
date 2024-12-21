<script lang="ts">
	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'
	import { StatePacketAction, StateSurfaceModal } from '$comps/app/types.appState.svelte'
	import { TokenAppModalReturn, TokenAppModalReturnType } from '$utils/types.token'
	import { getModalStore } from '@skeletonlabs/skeleton'
	import { ContextKey, DataObjCardinality, ParmsValuesType } from '$utils/types'
	import { getContext } from 'svelte'
	import { FieldEmbedType } from '$comps/form/field'
	import { DataObjActionField } from '$comps/dataObj/types.dataObjActionField.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/layout/RootLayoutModal.svelte'
	const storeModal = getModalStore()

	let { parent } = $props()
	let modeDelete: boolean = $state(false)
	let stateApp: StateSurfaceModal = $state()
	if ($storeModal[0]) stateApp = $storeModal[0].meta.stateApp

	stateApp.setfChangeCallback((obj: any) => {
		stateApp.packet = obj.packet
		if (
			stateApp.embedType === FieldEmbedType.listConfig &&
			obj.packet.action === StatePacketAction.doDetailDelete
		) {
			modeDelete = true
		}
	})

	$effect(() => {
		if (modeDelete) {
			const currTab = stateApp.app.getCurrTab()
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
	})

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
							data: stateApp.parmsState,
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

{#if stateApp}
	<div class="esp-card-space-y w-modal-wide p-4">
		<RootLayoutApp {stateApp} />

		<div class="flex justify-end">
			{#each stateApp.actionsFieldDialog as action}
				<div class="pb-4 mr-2">
					<button
						disabled={action.isStatusDisabled}
						class="w-full btn btn-action text-white"
						style:background-color={action.fieldColor.color}
						onclick={async () => await onFooterActionClick(action)}
					>
						{action.header}
					</button>
				</div>
			{/each}
		</div>
	</div>
{/if}
