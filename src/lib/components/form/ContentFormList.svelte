<script lang="ts">
	import { ContextKey, DataManager, type DataRecord, required } from '$utils/types'
	import FormListCard from '$comps/form/FormListCard.svelte'
	import FormListGrid from '$comps/form/FormListGrid.svelte'

	let { parms }: DataRecord = $props()
</script>

<div class="h-full sm:hidden">
	<FormListCard {parms} />
</div>

<div class="h-full hidden sm:block">
	<FormListGrid {parms} />
</div>
