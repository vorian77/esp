<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldCustomActionButton } from '$comps/form/fieldCustom'
	import { required } from '$utils/types'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/form/FormElCustomActionButton.svelte'

	export let fp: FieldProps

	$: state = fp.state
	$: dataRecord = fp.dataRecord
	$: field = fp.field as FieldCustomActionButton
	$: disabled = !(state.objStatus.changed() && state.objStatus.valid())

	async function action() {
		const enhancement = required(field.enhancement, FILENAME, 'field.enhancement')
		await enhancement(state, field, dataRecord)
	}
</script>

<button
	class="w-full btn text-white"
	style:background-color={field.colDO.fieldColor.color}
	{disabled}
	on:click={async () => await action()}
>
	{field.colDO.label}
</button>
