<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldTextarea } from '$comps/form/fieldTextarea'
	import { FieldAccess } from '$comps/form/field'
	import FormLabel from '$comps/form/FormLabel.svelte'

	export let fp: FieldProps

	$: field = fp.field as FieldTextarea
	$: fieldValue = fp.fieldValue
	$: setFieldVal = fp.setFieldVal

	$: classProps = 'rounded-lg ' + field.classProps + ' ' + field.colorBackground
	$: if (field.cols === 0) classProps += ' w-full text-sm'

	function onChange(event: Event) {
		const target = event.currentTarget as HTMLInputElement
		setFieldVal(field, target.value)
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
