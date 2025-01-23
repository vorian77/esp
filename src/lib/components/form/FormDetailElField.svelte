<script lang="ts">
	import { Field } from '$comps/form/field'
	import { DataObj, type DataRecord } from '$utils/types'
	import { DetailElField } from '$comps/form/types.detailElement'
	import FormElement from '$comps/form/FormElement.svelte'

	const FILENAME = '$comps/form/FormDetailElField.svelte'

	let { parms, dataObj, el }: { parms: DataRecord; dataObj: DataObj; el: DetailElField } = $props()
</script>

<div class="grow">
	<FormElement
		parms={{
			...parms,
			dataObj,
			field: el.field,
			row: 0
		}}
	/>
</div>
