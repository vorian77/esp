<script lang="ts">
	import {
		DataObj,
		DataObjCardinality,
		DataObjData,
		FieldValue,
		ValidityErrorLevel,
		ValidityError,
		type DataRecord
	} from '$utils/types'
	import { State, StateSurfaceEmbedShell } from '$comps/app/types.appState.svelte'
	import FormElCustomActionButton from './FormElCustomActionButton.svelte'
	import FormElCustomActionLink from './FormElCustomActionLink.svelte'
	import FormElCustomHeader from '$comps/form/FormElCustomHeader.svelte'
	import FormElCustomText from '$comps/form/FormElCustomText.svelte'
	import FormElFile from '$comps/form/FormElFile.svelte'
	import FormElInp from '$comps/form/FormElInp.svelte'
	import FormElInpCheckbox from '$comps/form/FormElInpCheckbox.svelte'
	import FormElInpRadio from '$comps/form/FormElInpRadio.svelte'
	import FormElEmbedListConfig from '$comps/form/FormElEmbedListConfig.svelte'
	import FormElEmbedListEdit from '$comps/form/FormElEmbedListEdit.svelte'
	import FormElEmbedListSelect from '$comps/form/FormElEmbedListSelect.svelte'
	import FormElEmbedShell from '$comps/form/FormElEmbedShell.svelte'
	import FormElChips from '$comps/form/FormElChips.svelte'
	import FormElSelect from '$comps/form/FormElSelect.svelte'
	import FormElTextarea from '$comps/form/FormElTextarea.svelte'
	import FormElToggle from '$comps/form/FormElToggle.svelte'
	import { Field, FieldProps } from '$comps/form/field'
	import { FieldCheckbox } from '$comps/form/fieldCheckbox'
	import {
		FieldCustomActionButton,
		FieldCustomActionLink,
		FieldCustomHeader,
		FieldCustomText
	} from '$comps/form/fieldCustom'
	import {
		FieldEmbedListConfig,
		FieldEmbedListEdit,
		FieldEmbedListSelect
	} from '$comps/form/fieldEmbed'
	import { FieldEmbedShell } from '$comps/form/fieldEmbedShell'
	import { FieldChips } from '$comps/form/fieldChips'
	import { FieldFile } from '$comps/form/fieldFile'
	import { FieldInput } from '$comps/form/fieldInput'
	import { FieldParm } from '$comps/form/fieldParm'
	import { FieldRadio } from '$comps/form/fieldRadio'
	import { FieldSelect } from '$comps/form/fieldSelect'
	import { FieldTextarea } from '$comps/form/fieldTextarea'
	import { FieldToggle } from '$comps/form/fieldToggle'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormDetailElement.svelte'

	let {
		field,
		row,
		stateProps = $bindable()
	}: { field: Field; row: number; stateProps: StateProps } = $props()

	let classProps = $derived(
		!stateProps.state.app.isMobileMode &&
			stateProps.dataObj.raw.codeCardinality === DataObjCardinality.detail &&
			field.colDO.isDisplayable
			? 'mb-4'
			: ''
	)

	// const elements: Record<string, any> = {
	// 	FieldCheckbox: FormElInpCheckbox,
	// 	FieldChips: FormElChips,
	// 	FieldCustomActionButton: FormElCustomActionButton,
	// 	FieldCustomActionLink: FormElCustomActionLink,
	// 	FieldCustomHeader: FormElCustomHeader,
	// 	FieldCustomText: FormElCustomText,
	// 	FieldEmbedListConfig: FormElEmbedListConfig,
	// 	FieldEmbedListEdit: FormElEmbedListEdit,
	// 	FieldEmbedListSelect: FormElEmbedListSelect,
	// 	FieldEmbedShell: FormElEmbedShell,
	// 	FieldFile: FormElFile,
	// 	FieldInput: FormElInp,
	// 	FieldRadio: FormElInpRadio,
	// 	FieldSelect: FormElSelect,
	// 	FieldTextarea: FormElTextarea,
	// 	FieldToggle: FormElToggle
	// }

	const elements: Record<string, any> = {
		FieldInput: FormElInp
	}

	let dataRecord = $derived(stateProps.dataObj.dataRecordsDisplay[row]) as DataRecord
	console.log('dataRecord', dataRecord)
	let fieldRender = $derived(stateProps.dataObj.getField(field, row)) as Field
	let fieldValue = $state(dataRecord[fieldRender.colDO.propName])
	let validity = $state(
		stateProps.dataObj.dataFieldsValidity.valueGet(dataRecord.id, fieldRender.colDO.propName)
	)
	let elementName =
		typeof fieldRender.constructor.name === 'string' && fieldRender.constructor.name !== ''
			? fieldRender.constructor.name
			: ''

	// const fieldClass = field.constructor.name
	// if (typeof fieldClass === 'string' && fieldClass !== '') {
	// 	currentElement = elements[field.constructor.name]
	// }

	let fp = new FieldProps({
		dataRecord,
		field: fieldRender,
		fieldValue,
		row,
		stateProps
	})
</script>

<div class={classProps}>
	{#if elementName && fieldRender.colDO.isDisplayable}
		<svelte:component this={elements[elementName]} bind:fp />
	{/if}
</div>

{#if validity}
	<div class="mb-3 text-sm">
		{#if validity.level == ValidityErrorLevel.error}
			<div class="text-error-500">
				<p>{validity.message}</p>
			</div>
		{:else if validity.level == ValidityErrorLevel.warning}
			<div class="text-warning-500">
				<p>{validity.message}</p>
			</div>
		{/if}
	</div>
{/if}
