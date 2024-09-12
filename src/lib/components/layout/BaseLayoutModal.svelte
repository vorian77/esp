<script lang="ts">
	import BaseLayout from '$comps/layout/BaseLayout.svelte'
	import { StateSurfaceModal } from '$comps/app/types.appState'
	import { TokenAppAction, TokenAppModalReturn, TokenAppModalReturnType } from '$utils/types.token'
	import { getModalStore } from '@skeletonlabs/skeleton'
	import { DataObjCardinality, DataObjEmbedType, ParmsObjType } from '$utils/types'
	import { DataObjActionField } from '$comps/dataObj/types.dataObjActionField'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/layout/BaseLayoutModal.svelte'

	export let parent: any

	const storeModal = getModalStore()

	let state: StateSurfaceModal = $storeModal[0].meta.state
	let modeDelete: boolean = false

	state.setUpdateCallback((obj: any) => {
		state.packet = obj.packet
		if (
			state.embedType === DataObjEmbedType.listConfig &&
			obj.packet.token.actionType === TokenAppAction.doDetailDelete
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
							action: TokenAppAction.none,
							data: [],
							type: TokenAppModalReturnType.complete
						})
					)
				}
				dropEmbedResources()
				storeModal.close()
			}
		}
	}

	async function onFooterActionClick(action: DataObjActionField) {
		dropEmbedResources()
		switch (action.codeTokenAction) {
			case TokenAppAction.modalCancel:
				if ($storeModal[0].response)
					$storeModal[0].response(
						new TokenAppModalReturn({
							action: TokenAppAction.none,
							data: undefined,
							type: TokenAppModalReturnType.cancel
						})
					)
				storeModal.close()
				break

			case TokenAppAction.modalDone:
				if ($storeModal[0].response)
					$storeModal[0].response(
						new TokenAppModalReturn({
							action: TokenAppAction.none,
							data: state.parmsState,
							type: TokenAppModalReturnType.complete
						})
					)
				storeModal.close()
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'onClickActionDialog',
					message: `No case defined for DataObjAction: ${action.codeTokenAction} `
				})
		}
	}
	function dropEmbedResources() {
		state.app.levels = state.app.levels.filter((level) => !level.isModal)
		state.app.levels.forEach((level) => {
			level.tabs = level.tabs.filter((tab) => !tab.isModal)
		})
		const idxLevel = state.app.levels.length - 1
		if (idxLevel >= 0) state.app.levels[idxLevel].tabIdxRestore()
	}
</script>

{#if state}
	<div class="esp-card-space-y w-modal-wide">
		<BaseLayout bind:state />

		<div class="flex justify-end">
			{#each state.actionsFieldDialog as action}
				<div class="pb-4 mr-2">
					<button
						disabled={action.isDisabled}
						class="w-full btn text-white"
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
