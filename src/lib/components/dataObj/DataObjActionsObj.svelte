<script lang="ts">
	import {
		CodeActionType,
		ContextKey,
		DataManager,
		DataObj,
		DataObjAction,
		DataObjSaveMode,
		type DataRecord,
		MethodResult,
		required
	} from '$utils/types'
	import { getContext } from 'svelte'
	import { State } from '$comps/app/types.appState.svelte'
	import { TokenAppDo, TokenAppUserActionConfirmType } from '$utils/types.token'
	import { UserAction, UserActionDisplay } from '$comps/other/types.userAction.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/dataObj/DataObjActions.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let dataObjId = $derived(parms?.dataObjId)
	let dataObj = $derived(dataObjId ? dm.getDataObj(dataObjId) : undefined)

	let actionsDisplay: UserActionDisplay[] = $state([])
	let promise = $derived(getActionsDisplay(dataObj))
	async function getActionsDisplay(dataObj: DataObj) {
		if (!dataObj) return []
		actionsDisplay = dataObj ? await UserAction.getActionsDisplay(sm, dataObj) : []
	}

	let isShowing = $derived(actionsDisplay.length > 0)
	let isEditing = $derived(
		actionsDisplay.some(
			(action: UserActionDisplay) =>
				[CodeActionType.doDetailSave, CodeActionType.doListSelfSave].includes(action.actionType) &&
				dm.isStatusChanged() &&
				!dataObj.isFieldEmbed
		)
	)

	async function onClick(ad: UserActionDisplay): Promise<MethodResult> {
		const doa: DataObjAction = UserActionDisplay.getDataObjAction(ad, dataObj?.userActions)
		if (doa) {
			return await doa.action.trigger(sm, dataObj)
		}
	}
</script>

{#await promise}
	<p>Loading...</p>
{:then data}
	<div class=" flex flex-col {isShowing ? 'sm:pl-3' : 'hidden'}">
		<div class="my-2 sm:hidden">
			<hr />
		</div>

		{#if dataObj}
			<div class="flex flex-row justify-end gap-3 sm:flex-col">
				{#if isEditing}
					<p class="text-blue-500 self-center sm:self-start">Editing...</p>
				{/if}
				{#each actionsDisplay as ad (ad.name)}
					<button
						class="btn btn-action text-sm text-white"
						disabled={ad.isStatusDisabled}
						style:background-color={ad.color}
						onclick={async () => onClick(ad)}
					>
						{ad.header}
					</button>
				{/each}
			</div>
		{/if}
	</div>
{:catch error}
	<p>Error: {error.message}</p>
{/await}
<!-- <DataViewer header="actionsCurrent" , data={actionsCurrent} /> -->
