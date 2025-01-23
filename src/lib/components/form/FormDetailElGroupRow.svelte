<script lang="ts">
	import { Field } from '$comps/form/field'
	import { DataObj, type DataRecord } from '$utils/types'
	import { DetailElGroupRow } from '$comps/form/types.detailElement'
	import FormDetailElField from '$comps/form/FormDetailElField.svelte'

	const FILENAME = '$comps/form/FormDetailElGroupRow.svelte'

	let { parms, dataObj, elRow }: { parms: DataRecord; dataObj: DataObj; elRow: DetailElGroupRow } =
		$props()
</script>

<div class="w-full flex flex-col sm:flex-row gap-x-4">
	{#each elRow.elements as el}
		<FormDetailElField {parms} {dataObj} {el} />
	{/each}
</div>
