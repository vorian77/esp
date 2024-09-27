<script lang="ts">
	import {
		DataObj,
		DataObjCardinality,
		DataObjData,
		FieldValue,
		ValidityErrorLevel,
		ValidityError
	} from '$utils/types'
	import { State, StateSurfaceEmbedShell } from '$comps/app/types.appState'
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
	import { FieldCustom } from '$comps/form/fieldCustom'
	import { FieldFile } from '$comps/form/fieldFile'
	import { FieldInput } from '$comps/form/fieldInput'
	import { FieldParm } from '$comps/form/fieldParm'
	import { FieldRadio } from '$comps/form/fieldRadio'
	import { FieldSelect } from '$comps/form/fieldSelect'
	import { FieldTextarea } from '$comps/form/fieldTextarea'
	import { FieldToggle } from '$comps/form/fieldToggle'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormDetailElement.svelte'

	export let state: State
	export let component: string
	export let dataObj: DataObj
	export let dataObjData: DataObjData
	export let field: Field
	export let row: number

	let classProps =
		dataObj.raw.codeCardinality === DataObjCardinality.detail && field.colDO.isDisplayable
			? 'mb-4'
			: ''

	let currentElement: any
	const elements: Record<string, any> = {
		FieldCheckbox: FormElInpCheckbox,
		FieldChips: FormElChips,
		FieldCustomActionButton: FormElCustomActionButton,
		FieldCustomActionLink: FormElCustomActionLink,
		FieldCustomHeader: FormElCustomHeader,
		FieldCustomText: FormElCustomText,
		FieldEmbedListConfig: FormElEmbedListConfig,
		FieldEmbedListEdit: FormElEmbedListEdit,
		FieldEmbedListSelect: FormElEmbedListSelect,
		FieldEmbedShell: FormElEmbedShell,
		FieldFile: FormElFile,
		FieldInput: FormElInp,
		FieldRadio: FormElInpRadio,
		FieldSelect: FormElSelect,
		FieldTextarea: FormElTextarea,
		FieldToggle: FormElToggle
	}

	let fieldValue: any

	$: dataRecord = dataObj.dataRecordsDisplay[row]
	$: field = dataObj.getField(field, row)
	$: fieldValue = dataRecord[field.colDO.propName]
	$: validity = dataObj.dataFieldsValidity.valueGet(dataRecord.id, field.colDO.propName)
	$: {
		const fieldClass = field.constructor.name
		if (typeof fieldClass === 'string' && fieldClass !== '')
			currentElement = elements[field.constructor.name]
	}
	$: fp = new FieldProps(
		component,
		dataObj,
		dataObjData,
		dataRecord,
		field,
		fieldValue,
		row,
		setFieldVal,
		state
	)

	function setFieldVal(field: Field, value: any) {
		dataObj = dataObj.setFieldVal(row, field, value)
		state = state.setStatus()

		if (state instanceof StateSurfaceEmbedShell) {
			state.stateRoot = state.stateRoot.setStatus()
		}
	}
</script>

<div class={classProps}>
	{#if field.colDO.isDisplayable}
		<svelte:component this={currentElement} bind:fp />
	{/if}
</div>

{#if validity}
	<!-- <DataViewer header="validity" data={validity} /> -->
	{#if validity.level == ValidityErrorLevel.error}
		<div class="text-error-500 mb-3 text-sm">
			<p>{validity.message}</p>
		</div>
	{:else if validity.level == ValidityErrorLevel.warning}
		<div class="text-warning-500 mb-3 text-sm">
			<p>{validity.message}</p>
		</div>
	{/if}
{/if}
