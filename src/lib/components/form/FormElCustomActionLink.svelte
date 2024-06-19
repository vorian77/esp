<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldCustomActionLink } from '$comps/form/fieldCustom'
	import { required } from '$utils/types'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/form/FormElCustomActionLink.svelte'

	export let fp: FieldProps

	$: state = fp.state
	$: dataRecord = fp.dataRecord
	$: field = fp.field as FieldCustomActionLink
	$: prefix = field.prefix ? field.prefix + ' ' : ''

	async function action() {
		const enhancement = required(field.enhancement, FILENAME, 'field.enhancement')
		await enhancement(state, field, dataRecord)
	}
</script>

<button class="btn w-full" on:click={async () => await action()}>
	<p>{prefix}<span class="text-blue-500">{field.colDO.label}</span></p>
</button>
