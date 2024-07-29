<script lang="ts">
	import { Field, FieldAccess } from '$comps/form/field'
	import { DataObjCardinality } from '$utils/types'

	export let fp: FieldProps
</script>

<label for={fp.field.colDO.propName} class="label">
	<span hidden={fp.dataObj.raw.codeCardinality === DataObjCardinality.list ? 'hidden' : ''}>
		{fp.field.colDO.label}
	</span>
	<slot />
</label>
