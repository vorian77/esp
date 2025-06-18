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
		getArray,
		hashString,
		isPlainObjectEmpty,
		MethodResult,
		Node,
		ParmsValuesType,
		required,
		UserParmItemSource,
		UserParmItemType
	} from '$utils/types'
	import { PropLinkItems } from '$comps/dataObj/types.rawDataObj.svelte'
	import { getContext } from 'svelte'
	import {
		TokenApiQueryType,
		TokenAppStateTriggerAction,
		TokenAppStateTriggerActionTarget
	} from '$utils/types.token'
	import ContentFormList from '$comps/form/ContentFormList.svelte'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import { onMount } from 'svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/ContentSelectList.svelte'
	const classProps = `w-full text-sm rounded-lg bg-white border-neutral-300`
	const fieldId = 'select-data-items'

	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')

	let { parms }: DataRecord = $props()

	let stateChangeTarget: TokenAppStateTriggerActionTarget = $state(parms.target)
	let selectId = $derived(
		stateChangeTarget === TokenAppStateTriggerActionTarget.dataObj
			? sm.parmsState.valueGet(ParmsValuesType.selectListId)
			: ''
	)
	sm.parmsState.valueGet(ParmsValuesType.selectListId)

	let nodeSelect = $derived(parms?.node)
	let selectListItems = $derived(nodeSelect?.selectListItems)
	let dataItems = $derived(getArray(selectListItems?.rawItems))

	let idFeature = $derived.by(() => {
		const queryOwnerSysId = sm.parmsState.valueGet(ParmsValuesType.queryOwnerSys)
		const nodeId = nodeSelect?.id
		return hashString([queryOwnerSysId, nodeId])
	})

	let dataObjId = $state(sm.app.getCurrTab()?.dataObjId)

	$effect.pre(async () => {
		async function initParms(): Promise<MethodResult> {
			let result: MethodResult = await sm.userParmInit(idFeature, [
				new UserParmItemSource(
					UserParmItemType.selectList,
					(data: any) => {
						return data ? data.selectId : undefined
					},
					(data: any) => {
						return {
							selectId: data as string
						}
					}
				)
			])
			if (result.error) return result

			result = sm.userParmGet(UserParmItemType.selectList)
			if (result.error) return result

			if (!isPlainObjectEmpty(result.data)) {
				let selectIdReturn = result.data as string
				sm.parmsState.valueSet(ParmsValuesType.selectListId, selectIdReturn)
				await retrieveList(selectIdReturn)
			}
		}

		if (stateChangeTarget === TokenAppStateTriggerActionTarget.node) {
			await initParms()
		}
	})

	async function onChange(event: Event) {
		selectId = event.target.value
		sm.userParmSet(UserParmItemType.selectList, selectId)
		await sm.userParmSave()
		await retrieveList(selectId)
	}

	async function retrieveList(selectId: string) {
		sm.parmsState.valueSet(ParmsValuesType.selectListId, selectId)

		dataItems.forEach((item) => {
			item.selected = item.data === selectId
		})

		if (selectId) {
			const record = dataItems.find((item) => item.data === selectId)
			if (record) {
				sm.parmsState.valueSet(ParmsValuesType.selectListRecord, record)
				await sm.triggerAction(
					new TokenAppStateTriggerAction({
						codeAction: CodeAction.init(
							CodeActionClass.ct_sys_code_action_class_nav,
							CodeActionType.navSelectList
						),
						target: TokenAppStateTriggerActionTarget.dataObj
					})
				)
			}
		}
	}
</script>

<!-- <p>stateChangeTarget: {stateChangeTarget}</p> -->
<!-- <DataViewer header="selectId" data={selectId} /> -->

{#if selectListItems}
	<div class="h-full">
		<label class="text-sm" for={fieldId}>{selectListItems.source.header}</label>

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
			{#if selectId && dataObjId}
				<ContentFormList parms={{ dataObjId }} />
			{/if}
		</div>
	</div>
{/if}

<!-- bind:value={() => selectId, retrieveList} -->
