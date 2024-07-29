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

	export let fp: FieldProps

	$: load(fp)

	function load(fp: FieldProps) {
		field = fp.field
	}
</script>

<FormLabel {fp} />

{#if field.dataObj}
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
