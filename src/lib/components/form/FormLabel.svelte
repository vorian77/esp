<script lang="ts">
	import { Field, FieldAccess } from '$comps/form/field'
	import { DataObjCardinality } from '$utils/types'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'

	let { fp }: FieldProps = $props()

	let classProps = $derived(`label flex text-sm ${fp.isLabelBold ? 'font-bold mt-2' : ''} `)
</script>

<label for={fp.field.colDO.propName}>
	<div
		class={classProps}
		hidden={fp.stateProps.dataObj.raw.codeCardinality === DataObjCardinality.list ? 'hidden' : ''}
	>
		{fp.field.colDO.label}
		{#if fp?.field?.iconProps}
			<Icon props={fp.field?.iconProps} />
		{/if}
	</div>
	<slot />
</label>
