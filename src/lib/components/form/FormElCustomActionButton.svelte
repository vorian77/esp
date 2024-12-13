<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldCustomActionButton } from '$comps/form/fieldCustom'
	import { required } from '$utils/types'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/form/FormElCustomActionButton.svelte'

	let { fp = $bindable() }: FieldProps = $props()

	let state = $derived(fp.stateProps.state)
	let dataRecord = $derived(fp.dataRecord)
	let field = $derived(fp.field) as FieldCustomActionButton
	let disabled = $derived(
		!(stateProps.state.objStatus.changed() && stateProps.state.objStatus.valid())
	)

	async function action() {
		const enhancement = required(field.enhancement, FILENAME, 'field.enhancement')
		await enhancement(state, field, dataRecord)
	}
</script>

<button
	class="w-full btn btn-action text-white"
	style:background-color={field.colDO.fieldColor.color}
	{disabled}
	onclick={async () => await action()}
>
	{field.colDO.label}
</button>
