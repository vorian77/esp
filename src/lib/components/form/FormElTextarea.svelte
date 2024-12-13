<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldTextarea } from '$comps/form/fieldTextarea'
	import { FieldAccess } from '$comps/form/field'
	import FormLabel from '$comps/form/FormLabel.svelte'

	let { fp = $bindable() }: FieldProps = $props()

	let field = $derived(fp.field) as FieldTextarea
	let fieldValue = $derived(fp.fieldValue)
	let classProps = $state('rounded-lg ' + field.classProps + ' ' + field.colorBackground)
	if (field.cols === 0) classProps += ' w-full text-sm'

	function onChange(event: Event) {
		const target = event.currentTarget as HTMLInputElement
		fp.stateProps.fSetVal(fp.row, fp.field, target.value)
	}
</script>

<FormLabel {fp} />

<textarea
	id={field.colDO.propName}
	name={field.colDO.propName}
	rows={field.rows}
	cols={field.cols}
	hidden={field.fieldAccess === FieldAccess.hidden}
	readonly={field.fieldAccess === FieldAccess.readonly}
	class={classProps}
	on:change={onChange}
	on:keyup|preventDefault={onChange}
	value={fieldValue}
/>
