<script lang="ts">
	import { FieldTextarea } from '$comps/form/fieldTextarea'
	import { ValidityErrorLevel } from '$utils/types'
	import { FieldAccess } from '$comps/form/field'

	export let field: FieldTextarea
	export let fieldValue: any
	export let setFieldVal: Function

	let classProps = 'rounded-lg ' + field.classProps + ' ' + field.colorBackground
	if (field.cols === 0) classProps += ' w-full'

	function onChange(event: Event) {
		const target = event.currentTarget as HTMLInputElement
		setFieldVal(field.colDO.propName, target.value)
	}
</script>

<label for={field.colDO.propName}>{field.colDO.label}</label>

<textarea
	id={field.colDO.propName}
	name={field.colDO.propName}
	rows={field.rows}
	cols={field.cols}
	hidden={field.colDO.fieldAccess == FieldAccess.hidden}
	readonly={field.colDO.fieldAccess == FieldAccess.readonly}
	class={classProps}
	on:change={onChange}
	on:keyup|preventDefault={onChange}
	bind:value={fieldValue}
/>
