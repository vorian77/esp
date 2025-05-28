<script lang="ts">
	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'
	import { StateSurfacePopup } from '$comps/app/types.appState.svelte'
	import { TokenAppModalReturn, TokenAppModalReturnType } from '$utils/types.token'
	import { getModalStore } from '@skeletonlabs/skeleton'
	import {
		CodeActionType,
		ContextKey,
		DataObjAction,
		DataObjCardinality,
		type DataRecord,
		FieldEmbedType,
		ParmsValuesType
	} from '$utils/types'
	import { UserAction, UserActionDisplay } from '$comps/other/types.userAction.svelte'
	import { getContext } from 'svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'
	import User from '$routes/home/User.svelte'

	const FILENAME = '/$comps/layout/RootLayoutModal.svelte'
	const storeModal = getModalStore()

	let { parent } = $props()

	let sm: StateSurfacePopup = $state($storeModal[0] ? $storeModal[0].meta.sm : undefined)

	let actionsDialog: UserActionDisplay[] = $state(
		sm.actionsDialog.map((doa: DataObjAction) => new UserActionDisplay(doa, false))
	)

	let rowCount: number = $derived.by(() => {
		let rowCount = undefined
		const currLevel = sm.app.getCurrLevel()
		if (currLevel) {
			const currTab = currLevel.tabs[currLevel.tabIdxCurrent]
			if (currTab) rowCount = currTab.dataObj?.data?.rowsRetrieved.dataRows.length
		}
		return rowCount
	})

	$effect(() => {
		if (sm.embedType === FieldEmbedType.listConfig && rowCount === 0) {
			if ($storeModal[0]?.response) {
				$storeModal[0].response(
					new TokenAppModalReturn({
						data: [],
						type: TokenAppModalReturnType.close
					})
				)
				storeModal.close()
			}
		}
	})

	async function onFooterActionClick(ad: UserActionDisplay) {
		const doa = UserActionDisplay.getDataObjAction(ad, sm.actionsDialog)
		if (doa) {
			switch (doa.action.codeAction.actionType) {
				case CodeActionType.modalCancel:
					if ($storeModal[0].response)
						$storeModal[0].response(
							new TokenAppModalReturn({
								data: undefined,
								type: TokenAppModalReturnType.cancel
							})
						)
					storeModal.close()
					break

				case CodeActionType.modalDone:
					if ($storeModal[0].response)
						$storeModal[0].response(
							new TokenAppModalReturn({
								data: sm.parmsState,
								type: TokenAppModalReturnType.complete
							})
						)
					storeModal.close()
					break

				default:
					error(500, {
						file: FILENAME,
						function: 'onFooterActionClick',
						msg: `No case defined for Data Object Action type: ${doa.action.codeAction.actionType} `
					})
			}
		}
	}
</script>

{#if sm}
	<div class="h-[70vh] bg-white w-modal-wide flex flex-col p-3">
		<RootLayoutApp {sm} />

		<div class="flex justify-end gap-3 mt-3">
			{#each actionsDialog as ad (ad.name)}
				<button
					disabled={ad.isStatusDisabled}
					class="btn btn-action text-white"
					style:background-color={ad.color}
					onclick={async () => await onFooterActionClick(ad)}
				>
					{ad.header}
				</button>
			{/each}
		</div>
	</div>
{/if}
