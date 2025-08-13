<script lang="ts">
	import {
		ContextKey,
		DataManager,
		DataObjCardinality,
		type DataRecord,
		required
	} from '$utils/types'
	import { getContext } from 'svelte'
	import { Field, FieldAccess } from '$comps/form/field.svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormLabel.svelte'

	let { parms, iconProps = undefined }: { parms: DataRecord; iconProps: IconProps } = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let isLabelBold = $state(parms.isLabelBold)
	let field: Field = $state(parms.field)
	let dataObj = $derived(dm.getDataObj(parms.dataObjId))
	let classProps = $derived(`label flex text-sm ${isLabelBold ? 'font-bold mt-2' : ''} `)
</script>

<!-- <DataViewer header="label.iconProps" data={iconProps?.name} /> -->

{#if field.fieldAccess !== FieldAccess.hidden}
	<label for={field.getValueKey()}>
		<div
			class={classProps}
			hidden={dataObj.raw.codeCardinality === DataObjCardinality.list ? 'hidden' : ''}
		>
			{field.colDO.label}
			{#if iconProps}
				<Icon props={iconProps} />
			{/if}
		</div>
		{#if field.colDO.colDB.description}
			<div class="text-xs text-desc">
				{field.colDO.colDB.description}
			</div>
		{/if}
		<slot />
	</label>
{/if}
