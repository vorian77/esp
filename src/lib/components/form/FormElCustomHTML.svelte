<script lang="ts">
	import { FieldCustomHTML } from '$comps/form/fieldCustom'
	let { parms }: DataRecord = $props()
	let field = $derived(parms.field) as FieldCustomHTML
</script>

<div class="">
	{@html `${field.rawHTML}`}
</div>
