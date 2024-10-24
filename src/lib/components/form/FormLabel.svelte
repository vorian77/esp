<script lang="ts">
	import { Field, FieldAccess } from '$comps/form/field'
	import { DataObjCardinality } from '$utils/types'

	export let fp: FieldProps
	export let bold = false

	$: classProps = `label text-sm ${bold ? 'font-bold mt-6' : ''} `
</script>

<label for={fp.field.colDO.propName} class={classProps}>
	<span hidden={fp.dataObj.raw.codeCardinality === DataObjCardinality.list ? 'hidden' : ''}>
		{fp.field.colDO.label}
	</span>
	<slot />
</label>
