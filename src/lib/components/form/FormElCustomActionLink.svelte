<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldCustomActionLink } from '$comps/form/fieldCustom'
	import { required } from '$utils/types'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/form/FormElCustomActionLink.svelte'

	let { fp = $bindable() }: FieldProps = $props()

	let state = $derived(fp.stateProps.state)
	let dataRecord = $derived(fp.dataRecord)
	let field = $derived(fp.field) as FieldCustomActionLink
	let prefix = $derived(field.prefix ? field.prefix + ' ' : '')

	async function action() {
		const enhancement = required(field.enhancement, FILENAME, 'field.enhancement')
		await enhancement(state, field, dataRecord)
	}
</script>

<button class="btn btn-action w-full text-sm" on:click={async () => await action()}>
	<p>{prefix}<span class="text-blue-500">{field.colDO.label}</span></p>
</button>
