<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldEmbedListSelect } from '$comps/form/fieldEmbed'
	import {
		State,
		StateLayoutStyle,
		StateLayoutComponentType,
		StateSurfaceEmbed
	} from '$comps/app/types.appState'
	import {
		TokenApiDbDataObjSource,
		TokenApiQueryType,
		TokenAppDoActionFieldType,
		TokenAppModalReturnType
	} from '$utils/types.token'
	import Layout from '$comps/layout/BaseLayout.svelte'
	import { DataObj, DataObjCardinality, type DataRecord } from '$utils/types'
	import Icon from '$comps/misc/Icon.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElEmbeddedListSelect.svelte'

	export let fp: FieldProps

	$: state = fp.state
	$: dataObj = fp.dataObj
	$: dataRecord = fp.dataRecord
	$: field = fp.field as FieldEmbedListSelect
	$: fieldValue = fp.fieldValue
	$: setFieldVal = fp.setFieldVal

	let stateEmbed: State
	let recordIdCurrent: string

	$: {
		if (dataRecord) {
			let recordId = dataRecord['id'] || ''
			if (recordId.startsWith('preset_')) recordId = ''
			if (recordIdCurrent !== recordId) {
				recordIdCurrent = recordId
				setStateEmbed(fieldValue)
			}
		}
	}

	function setStateEmbed(ids: string[]) {
		stateEmbed = new StateSurfaceEmbed({
			actionProxies: [
				{ actionType: TokenAppDoActionFieldType.embedListSelect, proxy: openDialogProxy }
			],
			cardinality: DataObjCardinality.list,
			dataObjSource: new TokenApiDbDataObjSource({ dataObjId: field.raw.dataObjListID }),
			layoutComponent: StateLayoutComponentType.layoutContent,
			layoutStyle: StateLayoutStyle.embeddedField,
			parms: { $ListSelectDisplayIds: ids },
			queryType: TokenApiQueryType.retrieve
		})
	}
	function openDialogIcon() {
		const action = stateEmbed.app
			.getCurrLevelActions()
			.find((action) => action.codeActionFieldType === TokenAppDoActionFieldType.embedListSelect)
		if (action) action.proxyExe({ dataObj, field, state: stateEmbed })
	}

	function openDialogProxy(parms: any) {
		openDialog()
	}

	function openDialog() {
		state.openModalEmbed(
			field.actionsFieldModal,
			DataObjCardinality.list,
			new TokenApiDbDataObjSource({
				dataObjId: field.raw.dataObjListID
			}),
			new TokenApiDbDataObjSource({
				dataObjId: field.raw.dataObjListID
			}),
			StateLayoutStyle.overlayModalSelect,
			{ listRecordIdList: fieldValue },
			TokenApiQueryType.retrieve,
			fUpdate
		)
		function fUpdate(returnType: TokenAppModalReturnType, value: any = undefined) {
			if (returnType === TokenAppModalReturnType.complete) {
				value = value ? value.valueGetIdList() : []
				setStateEmbed(value)
				setFieldVal(field, value)
			}
		}
	}
</script>

<div class="flex mt-6">
	<label for={field.colDO.propName}>{field.colDO.label}</label>
	<button class="ml-1" on:click={() => openDialogIcon()}>
		<Icon name={'select'} width="28" height="28" fill={'#3b79e1'} />
	</button>
</div>

<div>
	{#if stateEmbed}
		<object title="aria-embedded-column">
			<Layout state={stateEmbed} />
		</object>
	{/if}
</div>

<!-- <DataViewer header="state.parms" data={stateDisplay.metaData.data} /> -->
