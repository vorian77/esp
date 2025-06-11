<script lang="ts">
	import { State } from '$comps/app/types.appState.svelte'
	import { AppLevel } from '$comps/app/types.app.svelte'
	import {
		CodeAction,
		CodeActionClass,
		CodeActionType,
		ContextKey,
		DataManager,
		DataObj,
		DataObjData,
		type DataRecord,
		ParmsValuesType,
		required
	} from '$utils/types'
	import { getContext } from 'svelte'
	import { TokenApiQueryType, TokenAppDo, TokenAppStateTriggerAction } from '$utils/types.token'
	import ContentFormList from '$comps/form/ContentFormList.svelte'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/ContentFormListSelect.svelte'
	const classProps = `w-full text-sm rounded-lg bg-white border-neutral-300`
	const fieldId = 'select-data-items'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)
	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))
	let dataItems = $state(dataObj.data.itemsSelect)
	let selectId = $state()

	async function onChange(event: Event) {
		const newValue = event.target.value
		sm.parmsState.valueSet(ParmsValuesType.selectListId, newValue)

		dataItems.forEach((item) => {
			item.selected = item.data === newValue
		})

		const record = dataItems.find((item) => item.data === newValue)
		if (!record) return
		sm.parmsState.valueSet(ParmsValuesType.selectListRecord, record)

		let result: MethodResult = await sm.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_do,
					CodeActionType.doRetrieveData
				)
			})
		)
		if (result.error) return

		dm.init(dataObj)
		selectId = newValue
	}
</script>

<div class="h-full">
	<label class="text-sm" for={fieldId}>{dataObj.selectListItems?.source.header || ''}</label>

	<select class={classProps} name="object-type" id={fieldId} onchange={onChange}>
		<option value={null}>Select an option...</option>
		{#if dataItems}
			{#each dataItems as { data, display, selected }, index (data)}
				<option value={data} {selected}>
					{display}
				</option>
			{/each}
		{/if}
	</select>

	<div class="h-[calc(100vh_-_180px)] mt-8">
		{#key selectId}
			<ContentFormList {parms} />
		{/key}
	</div>
</div>
