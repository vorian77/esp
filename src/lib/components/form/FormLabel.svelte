<script lang="ts">
	import { Field, FieldAccess } from '$comps/form/field'
	import { DataObjCardinality } from '$utils/types'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'

	export let fp: FieldProps

	$: classProps = `label flex text-sm ${fp.isLabelBold ? 'font-bold mt-6' : ''} `
</script>

<label for={fp.field.colDO.propName}>
	<div
		class={classProps}
		hidden={fp.dataObj.raw.codeCardinality === DataObjCardinality.list ? 'hidden' : ''}
	>
		{fp.field.colDO.label}
		{#if fp?.field?.iconProps}
			<Icon props={fp.field?.iconProps} />
		{/if}
	</div>
	<slot />
</label>
