<script lang="ts">
	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'
	import { StateSurfacePopup } from '$comps/app/types.state.svelte'
	import { TokenAppModalReturn, TokenAppModalReturnType } from '$utils/types.token'
	import { getModalStore } from '@skeletonlabs/skeleton'
	import {
		CodeActionType,
		ContextKey,
		DataObjAction,
		DataObjCardinality,
		type DataRecord,
		FieldEmbedListType,
		ParmsValues,
		ParmsValuesType,
		valueOrDefault
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

	$effect(() => {
		const isCloseOnEmptyList = valueOrDefault(
			sm.parmsState.valueGet(ParmsValuesType.isModalCloseOnEmptyList),
			false
		)
		if (isCloseOnEmptyList) {
			const triggerSave = sm.triggerSaveValue

			const currTab = sm.app.getCurrTab()
			const codeCardinality = currTab?.dataObj?.raw?.codeCardinality
			const rowCount = currTab?.dataObj?.data?.rowsRetrieved.dataRows.length ?? 0

			if (codeCardinality === DataObjCardinality.list && rowCount === 0) {
				if ($storeModal[0]?.response) {
					$storeModal[0].response(new TokenAppModalReturn({ type: TokenAppModalReturnType.close }))
					storeModal.close()
				}
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
							new TokenAppModalReturn({ type: TokenAppModalReturnType.cancel })
						)
					storeModal.close()
					break

				case CodeActionType.modalDone:
					if ($storeModal[0].response)
						$storeModal[0].response(
							new TokenAppModalReturn({
								parmsFormList: sm.parmsFormList(),
								parmsState: sm.parmsState,
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
