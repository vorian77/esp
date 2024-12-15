<script lang="ts">
	import { FieldTextarea } from '$comps/form/fieldTextarea'
	import { FieldAccess } from '$comps/form/field'
	import FormLabel from '$comps/form/FormLabel.svelte'

	let { parms }: DataRecord = $props()

	let field = $derived(fp.field) as FieldTextarea
	let fieldValue = $derived(fp.fieldValue)
	let classProps = $state('rounded-lg ' + field.classProps + ' ' + field.colorBackground)
	if (field.cols === 0) classProps += ' w-full text-sm'

	function onChange(event: Event) {
		const target = event.currentTarget as HTMLInputElement
		fp.stateApp.fSetVal(fp.row, fp.field, target.value)
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
