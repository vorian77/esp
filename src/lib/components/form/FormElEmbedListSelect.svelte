<script lang="ts">
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
		TokenAppDoActionConfirmType,
		TokenAppModalReturnType
	} from '$utils/types.token'
	import Layout from '$comps/layout/BaseLayout.svelte'
	import {
		DataObj,
		DataObjActionFieldConfirm,
		DataObjCardinality,
		type DataObjData,
		required
	} from '$utils/types'
	import Icon from '$comps/misc/Icon.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElEmbeddedListSelect.svelte'

	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData
	export let field: FieldEmbedListSelect
	export let fieldValue: any
	export let setFieldVal: Function

	let stateEmbed: State
	let recordIdCurrent: string
	const exprFilterEmbed = `.id IN (SELECT ${dataObj.rootTable?.object} FILTER .id = <parms,uuid,listRecordIdParent>).${field.colDO.propName}.id`

	$: {
		let recordId = dataObjData.getDetailRecordValue('id') || ''
		if (recordId.startsWith('preset_')) recordId = ''
		if (recordIdCurrent !== recordId) {
			recordIdCurrent = recordId
			setStateEmbed(fieldValue)
		}
	}

	function setStateEmbed(ids: string[]) {
		stateEmbed = new StateSurfaceEmbed({
			actionProxies: [
				{ actionType: TokenAppDoActionFieldType.listEmbedSelectEdit, proxy: openDialogProxy }
			],
			cardinality: DataObjCardinality.list,
			dataObjSource: new TokenApiDbDataObjSource({ dataObjId: field.raw.dataObjListID }),
			layoutComponent: StateLayoutComponentType.layoutContent,
			layoutStyle: StateLayoutStyle.embeddedField,
			parms: { $ListSelectDisplayIds: ids },
			queryType: TokenApiQueryType.retrieve
		})
	}

	function openDialogProxy(parms: any) {
		openDialog()
	}

	function openDialog() {
		state.openModalEmbed(
			field.raw.actionsFieldModal,
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
				setFieldVal(field.colDO.propName, value)
			}
		}
	}
</script>

<div class="flex mt-6">
	<label for={field.colDO.propName}>{field.colDO.label}</label>
	<button class="ml-1" on:click={() => openDialog()}>
		<Icon name={'select'} width="28" height="28" fill={'#3b79e1'} />
	</button>
</div>

<div>
	{#if stateEmbed}
		<object title="aria-embedded-column" class="mb-4">
			<Layout state={stateEmbed} />
		</object>
	{/if}
</div>

<!-- <DataViewer header="state.parms" data={stateDisplay.metaData.data} /> -->
