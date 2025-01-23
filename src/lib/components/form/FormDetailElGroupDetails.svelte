<script lang="ts">
	import { DataObj, type DataRecord } from '$utils/types'
	import { DetailElGroupDetails } from '$comps/form/types.detailElement'
	import FormDetailEl from '$comps/form/FormDetailEl.svelte'

	const FILENAME = '$comps/form/FormDetailElGroupDetails.svelte'

	let {
		parms,
		dataObj,
		elDetails
	}: { parms: DataRecord; dataObj: DataObj; elDetails: DetailElGroupDetails } = $props()
</script>

<div class="w-ful mb-3">
	<details>
		<summary>{elDetails.label}</summary>
		{#each elDetails.elements as el}
			<FormDetailEl {parms} {dataObj} {el} />
		{/each}
	</details>
</div>
