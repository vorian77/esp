<script lang="ts">
	import { DataObj, type DataRecord } from '$utils/types'
	import {
		DetailElField,
		DetailElGroupDetails,
		DetailElGroupRow,
		DetailElGroupSection
	} from '$comps/form/types.detailElement'
	import FormDetailElField from '$comps/form/FormDetailElField.svelte'
	import FormDetailElGroupDetails from '$comps/form/FormDetailElGroupDetails.svelte'
	import FormDetailElGroupRow from '$comps/form/FormDetailElGroupRow.svelte'
	import FormDetailElGroupSection from '$comps/form/FormDetailElGroupSection.svelte'

	const FILENAME = '$comps/form/FormDetailEl.svelte'

	let { parms, dataObj, el }: { parms: DataRecord; dataObj: DataObj; el: DetailEl } = $props()
</script>

<!-- <p>field: {el.field.colDO.label}</p> -->

{#if el instanceof DetailElField}
	<FormDetailElField {parms} {dataObj} {el} />
{/if}

{#if el instanceof DetailElGroupDetails}
	<FormDetailElGroupDetails {parms} {dataObj} elDetails={el} />
{/if}

{#if el instanceof DetailElGroupRow}
	<FormDetailElGroupRow {parms} {dataObj} elRow={el} />
{/if}

{#if el instanceof DetailElGroupSection}
	<FormDetailElGroupSection {parms} {dataObj} elSection={el} />
{/if}
