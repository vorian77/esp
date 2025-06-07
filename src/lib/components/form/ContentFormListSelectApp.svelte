<script lang="ts">
	import { ContextKey, DataManager, type DataRecord, required } from '$utils/types'
	import FormListGridSelect from '$comps/form/FormListGridSelect.svelte'
	let { parms }: DataRecord = $props()
</script>

<FormListGridSelect {parms} />
