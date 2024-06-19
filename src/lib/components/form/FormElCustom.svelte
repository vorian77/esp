<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import {
		FieldCustomAction,
		FieldCustomActionButton,
		FieldCustomActionLink,
		FieldCustomHeader,
		FieldCustomText
	} from '$comps/form/fieldCustom'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/form/FormElCustom.svelte'

	export let fp: FieldProps

	console.log('FormElCustom.fp', fp)

	$: state = fp.state
	$: dataRecord = fp.dataRecord
	$: field = fp.field as
		| FieldCustomAction
		| FieldCustomActionButton
		| FieldCustomActionLink
		| FieldCustomHeader
		| FieldCustomText

	$: {
		// const className = field.constructor.name
		console.log('FormElCustom.className', field)
	}

	async function action() {
		if (field instanceof FieldCustomAction && field.enhancement) {
			await field.enhancement(state, field, dataRecord)
		}
	}
</script>

{#if field instanceof FieldCustomActionButton}
	{@const disabled = !(state.objStatus.changed() && state.objStatus.valid())}
	<button
		class="w-full btn text-white"
		style:background-color={field.colDO.fieldColor.color}
		{disabled}
		on:click={async () => await action()}
	>
		{field.colDO.label}
	</button>
{/if}

{#if field instanceof FieldCustomActionLink}
	{@const prefix = field.prefix ? field.prefix + ' ' : ''}
	<button class="btn w-full" on:click={async () => await action()}>
		<p>{prefix}<span class="text-blue-500">{field.colDO.label}</span></p>
	</button>
{/if}

{#if field instanceof FieldCustomHeader}
	{@const margin = field.isFirstVisible ? '' : 'mt-8'}
	{@const size = field.size ? 'h' + field.size : 'h3'}
	{@const dynamicText = field.source && field.sourceKey ? ': ' + field.sourceKey : ''}
	<div class="{margin} {size}">
		<p>{field.colDO.label}<span class="font-semibold">{dynamicText}</span></p>
	</div>
{/if}

{#if field instanceof FieldCustomText}
	{@const align = field.align ? 'text-' + field.align : 'text-left'}
	<div class={align}>
		{field.colDO.label}
	</div>
{/if}
