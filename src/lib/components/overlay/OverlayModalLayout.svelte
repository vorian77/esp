<script lang="ts">
	import { State } from '$comps/app/types.state.svelte'
	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'
	import { TokenAppModalReturn, TokenAppModalReturnType } from '$utils/types.token'
	import {
		CodeActionType,
		DataObj,
		DataObjAction,
		DataObjCardinality,
		ParmsValues,
		ParmsValuesType,
		valueOrDefault
	} from '$utils/types'
	import { UserActionDisplay } from '$comps/other/types.userAction.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/overlay/OverlayModalLayout.svelte'

	let { handleClose, sm }: { handleClose: Function; sm: State } = $props()
	let dm: DataManager = $derived(sm.dm)
	let dataObjEmbedId = $derived(sm.parmsState.valueGet(ParmsValuesType.embedDataObjId))
	let dataObjEmbed: DataObj = $derived(dm.getDataObj(dataObjEmbedId))

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
				handleClose(new TokenAppModalReturn({ type: TokenAppModalReturnType.complete }))
			}
		}
	})

	async function onFooterActionClick(ad: UserActionDisplay) {
		const doa = UserActionDisplay.getDataObjAction(ad, sm.actionsDialog)
		if (doa) {
			switch (doa.action.codeAction.actionType) {
				case CodeActionType.modalCancel:
					handleClose(new TokenAppModalReturn({ type: TokenAppModalReturnType.cancel }))
					break

				case CodeActionType.modalDone:
					handleClose(
						new TokenAppModalReturn({
							parmsFormList: dataObjEmbed ? dataObjEmbed.parmsFormList() : {},
							parmsState: sm.parmsState,
							type: TokenAppModalReturnType.complete
						})
					)
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
					style:background-color={ad.fieldColor.hexColor}
					style:color={ad.fieldColor.hexText}
					onclick={async () => await onFooterActionClick(ad)}
				>
					{ad.header}
				</button>
			{/each}
		</div>
	</div>
{/if}
