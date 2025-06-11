<script lang="ts">
	import {
		ContextKey,
		type DataObj,
		type DataObjData,
		ParmsValuesType,
		required,
		valueOrDefault
	} from '$utils/types'
	import { getContext } from 'svelte'
	import { AppLevelRowStatus } from '$comps/app/types.app.svelte'
	import {
		State,
		StateNavContent,
		StateNavHeader,
		StateSurfacePopup,
		StateTriggerToken
	} from '$comps/app/types.appState.svelte'
	import ContentFormDetail from '$comps/form/ContentFormDetail.svelte'
	import ContentFormDetailRepConfig from '$comps/form/ContentFormDetailRepConfig.svelte'
	import ContentFormList from '$comps/form/ContentFormList.svelte'
	import ContentFormListSelect from '$comps/form/ContentFormListSelect.svelte'
	import GridSelect from '$comps/grid/GridSelect.svelte'
	import DataObjActionsObj from '$comps/dataObj/DataObjActionsObj.svelte'
	import NavRow from '$comps/nav/NavRow.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/layout/LayoutContent.svelte'

	const componentsContent: Record<StateNavContent, any> = {
		FormDetail: ContentFormDetail,
		FormDetailRepConfig: ContentFormDetailRepConfig,
		FormList: ContentFormList,
		FormListSelect: ContentFormListSelect,
		ModalSelect: GridSelect
	}

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)
	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))

	let Component = $derived(componentsContent[parms?.navContent || sm.navContent])
	let cancelForm: Function = getContext(ContextKey.cancelForm) || undefined

	// navHeader
	let headerObj = $derived(
		sm.navHeader.headerText
			? sm.navHeader.headerText
			: sm.navHeader.isDataObj
				? dataObj?.raw?.header
				: ''
	)
	let headerObjSub = $derived(
		sm.navHeader.isDataObj ? (dataObj?.raw?.subHeader ? dataObj?.raw?.subHeader : '') : ''
	)
	let rowStatus = $derived(sm.navHeader.isRowStatus ? sm.app.navRowStatus() : undefined)

	// header styling
	let classHeader = $derived(
		(dataObj && dataObj.userActions.length > 0) || headerObj || headerObjSub || rowStatus
			? 'border p-4 '
			: ''
	)

	function cancel(event: MouseEvent) {
		if (cancelForm) cancelForm()
	}
</script>

<div class="h-full max-h-full flex flex-col p-3 {headerObj ? 'border p-3 rounded-md' : ''} ">
	{#if Component}
		{#if headerObj}
			<div class="mb-4">
				<div class="flex justify-between items-start">
					<h2 class="h2">{headerObj}</h2>
					<div>
						{#if rowStatus}
							<NavRow />
						{/if}
						{#if sm.navHeader.isDrawerClose}
							<button
								type="button"
								class="btn-icon btn-icon-sm variant-filled-error"
								onclick={cancel}
							>
								X
							</button>
						{/if}
					</div>
				</div>
				{#if headerObjSub}
					<h4 class="mt-1 h4 text-gray-500">{headerObjSub}</h4>
				{/if}
			</div>
		{/if}

		<div class="h-full">
			<Component {parms} />
		</div>
	{/if}
</div>
