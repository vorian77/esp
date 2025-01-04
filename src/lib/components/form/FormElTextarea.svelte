<script lang="ts">
	import { ContextKey, DataManager, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { FieldTextarea } from '$comps/form/fieldTextarea'
	import { FieldAccess } from '$comps/form/field'
	import FormLabel from '$comps/form/FormLabel.svelte'

	const FILENAME = '/$comps/form/FormElTextarea.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let field = $derived(parms.field) as FieldCustomActionLink
	let fieldValue = $derived(dm.getFieldValue(parms.dataObjId, parms.row, parms.field))

	let classProps = $state('rounded-lg ' + field.classProps + ' ' + field.colorBackground)
	if (field.cols === 0) classProps += ' w-full text-sm'

	function onChange(event: Event) {
		const target = event.currentTarget as HTMLInputElement
		dm.setFieldValue(parms.dataObjId, parms.row, parms.field, target.value)
	}
	function preventDefault(fn) {
		return function (event) {
			event.preventDefault()
			fn.call(this, event)
		}
	}
</script>

<FormLabel {parms} />

<textarea
	id={field.colDO.propName}
	name={field.colDO.propName}
	rows={field.rows}
	cols={field.cols}
	hidden={field.fieldAccess === FieldAccess.hidden}
	readonly={field.fieldAccess === FieldAccess.readonly}
	class={classProps}
	oninput={onChange}
	value={fieldValue}
/>
