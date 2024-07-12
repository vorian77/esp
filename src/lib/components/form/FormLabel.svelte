<script lang="ts">
	import { Field, FieldAccess } from '$comps/form/field'
	import { DataObjCardinality } from '$utils/types'

	export let field: Field
	export let cardinality: DataObjCardinality
</script>

<label for={field.colDO.propName} class="label">
	<span hidden={cardinality === DataObjCardinality.list ? 'hidden' : ''}>
		{field.colDO.label}
	</span>
	<slot />
</label>
