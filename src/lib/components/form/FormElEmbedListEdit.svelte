<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldEmbedListEdit } from '$comps/form/fieldEmbed'
	import {
		State,
		StateLayoutStyle,
		StateLayoutComponentType,
		StateMode,
		StateSurfaceEmbedField
	} from '$comps/app/types.appState'
	import {
		TokenApiDbDataObjSource,
		TokenApiQueryData,
		TokenApiQueryType,
		TokenAppDoActionFieldType
	} from '$utils/types.token'
	import {
		Validation,
		ValidationStatus,
		ValidationType,
		Validity,
		ValidityField,
		ValidityError,
		ValidityErrorLevel
	} from '$comps/form/types.validation'
	import { apiFetch, ApiFunction } from '$routes/api/api'
	import Layout from '$comps/layout/BaseLayout.svelte'
	import FormList from '$comps/form/FormList.svelte'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import {
		DataObj,
		DataObjCardinality,
		DataObjData,
		DataObjStatus,
		type DataRecord,
		required,
		ResponseBody
	} from '$utils/types'
	import Icon from '$comps/misc/Icon.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElEmbeddedListSelect.svelte'

	let field: FieldEmbedListEdit
	let recordIdCurrent: string
	let stateEmbed: State

	export let fp: FieldProps

	$: load(fp)

	function load(fp: FieldProps) {
		field = fp.field

		// if (fp.dataRecord) {
		// 	let recordId = fp.dataRecord['id'] || ''
		// 	if (recordId.startsWith('preset_')) recordId = ''
		// 	if (recordIdCurrent !== recordId) {
		// 		recordIdCurrent = recordId
		// 		// setStateEmbed(fieldValue)
		// 	}
		// }

		// const parentObjectSaved =
		// 	recordIdCurrent !== '' &&
		// 	fp.state.objStatus.objValidToSave &&
		// 	!fp.state.objStatus.objHasChanged
		// if (stateEmbed) {
		// 	if (parentObjectSaved) {
		// 		stateEmbed.modeAdd(StateMode.ParentObjectSaved)
		// 	} else {
		// 		stateEmbed.modeDrop(StateMode.ParentObjectSaved)
		// 	}
		// 	stateEmbed = stateEmbed
		// }
	}

	// $: field = fp.field as FieldEmbedListEdit

	// $: exprFilterEmbed = `.id IN (SELECT ${fp.dataObj.rootTable?.object} FILTER .id = <parms,uuid,listRecordIdParent>).${field.colDO.propName}.id`

	// $: {
	// 	const parentObjectSaved =
	// 		recordIdCurrent !== '' &&
	// 		fp.state.objStatus.objValidToSave &&
	// 		!fp.state.objStatus.objHasChanged
	// 	if (stateEmbed) {
	// 		if (parentObjectSaved) {
	// 			stateEmbed.modeAdd(StateMode.ParentObjectSaved)
	// 		} else {
	// 			stateEmbed.modeDrop(StateMode.ParentObjectSaved)
	// 		}
	// 		stateEmbed = stateEmbed
	// 	}
	// }

	// function setStateEmbed(ids: string[]) {
	// 	stateEmbed = new StateSurfaceEmbedField({
	// 		cardinality: DataObjCardinality.list,
	// 		dataObjSource: new TokenApiDbDataObjSource({ dataObjId: field.raw.dataObjEmbedId }),
	// 		layoutComponent: StateLayoutComponentType.layoutContent,
	// 		layoutStyle: StateLayoutStyle.embeddedField,
	// 		parms: { listRecordIdParent: recordIdCurrent },
	// 		queryType: TokenApiQueryType.retrieve,
	// 		updateCallback
	// 	})
	// }

	// async function updateCallback(obj: any) {
	// 	stateEmbed = stateEmbed.updateProperties(obj)
	// }

	// function setStatusRoot() {
	// 	fp.state.objStatus = fp.state.getStatus(fp.dataObj)
	// 	fp.state = fp.state
	// }
</script>

<FormLabel field={fp.field} cardinality={fp.dataObj.raw.codeCardinality} />

{#if field.dataObj}
	<!-- <Layout state={stateEmbed} /> -->
	<div class="border-2 p-4">
		<FormList
			bind:state={fp.state}
			dataObj={field.dataObj}
			dataObjData={field.dataObj.data}
			on:formCancelled
			on:rowClick
		/>
	</div>
{/if}

<!-- <DataViewer header="stateEmbedListEdit.objStatus" data={stateEmbed.objStatus} /> -->
<!-- <DataViewer header="dataObj" data={field.dataObj} /> -->
