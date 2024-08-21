<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldEmbedListConfig } from '$comps/form/fieldEmbed'
	import {
		State,
		StateLayoutComponentType,
		StateLayoutStyle,
		StateSurfaceEmbedField
	} from '$comps/app/types.appState'
	import {
		TokenApiDbDataObjSource,
		TokenApiQueryType,
		TokenAppDoActionFieldType,
		TokenAppDoActionConfirmType,
		TokenAppModalReturnType
	} from '$utils/types.token'
	import Layout from '$comps/layout/BaseLayout.svelte'
	import { DataObj, DataObjCardinality, DataObjMode, type DataRecord, required } from '$utils/types'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElEmbeddedListConfig.svelte'

	export let fp: FieldProps

	let recordIdCurrent: string

	$: {
		let recordId = fp.dataRecord['id'] || ''
		if (recordId.startsWith('preset_')) recordId = ''
		if (recordIdCurrent !== recordId) recordIdCurrent = recordId

		const field = fp.field as FieldEmbedListConfig
		const rows = field.dataObj?.data.rowsRetrieved.length

		const parentObjectSaved =
			recordIdCurrent !== '' &&
			fp.state.objStatus.objValidToSave &&
			!fp.state.objStatus.objHasChanged
		if (field.dataObj) {
			if (parentObjectSaved) {
				field.dataObj.modeAdd(DataObjMode.ParentObjectSaved)
			} else {
				field.dataObj.modeDrop(DataObjMode.ParentObjectSaved)
			}
		}
	}
</script>

<FormLabel {fp} />

{#if fp}
	<div class="mt-4">
		<LayoutContent
			bind:state={fp.state}
			dataObj={fp.field.dataObj}
			dataObjData={fp.field.dataObj.data}
			on:formCancelled
		/>
	</div>
{/if}

<!-- <DataViewer header="stateDisplay" data={stateDisplay} /> -->
