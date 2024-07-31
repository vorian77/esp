<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldEmbedListEdit } from '$comps/form/fieldEmbed'
	import {
		State,
		StateLayoutStyle,
		StateLayoutComponentType,
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
	import FormLabel from '$comps/form/FormLabel.svelte'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
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

<!-- <DataViewer header="stateEmbedListEdit.objStatus" data={stateEmbed.objStatus} /> -->
