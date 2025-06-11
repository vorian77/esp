<script lang="ts">
	import { ContextKey, DataManager, type DataRecord, required } from '$utils/types'
	import FormDetail from '$comps/form/FormDetail.svelte'
	let { parms }: DataRecord = $props()
</script>

<FormDetail {parms} />
