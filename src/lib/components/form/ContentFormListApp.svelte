<script lang="ts">
	import { ContextKey, DataManager, type DataRecord, required } from '$utils/types'
	import FormList from '$comps/form/FormList.svelte'
	let { parms }: DataRecord = $props()
</script>

<FormList {parms} />
