<script lang="ts">
	import {
		DataObj,
		DataObjCardinality,
		DataObjData,
		FieldValue,
		ValidityErrorLevel,
		ValidityError
	} from '$utils/types'
	import { State } from '$comps/app/types.appState'
	import FormElCustom from '$comps/form/FormElCustom.svelte'
	import FormElFile from '$comps/form/FormElFile.svelte'
	import FormElInp from '$comps/form/FormElInp.svelte'
	import FormElInpCheckbox from '$comps/form/FormElInpCheckbox.svelte'
	import FormElInpRadio from '$comps/form/FormElInpRadio.svelte'
	import FormElEmbedListConfig from '$comps/form/FormElEmbedListConfig.svelte'
	import FormElEmbedListEdit from '$comps/form/FormElEmbedListEdit.svelte'
	import FormElEmbedListSelect from '$comps/form/FormElEmbedListSelect.svelte'
	import FormElSelect from '$comps/form/FormElSelect.svelte'
	import FormElTextarea from '$comps/form/FormElTextarea.svelte'
	import FormElToggle from '$comps/form/FormElToggle.svelte'
	import { Field } from '$comps/form/field'
	import { FieldCheckbox } from '$comps/form/fieldCheckbox'
	import {
		FieldEmbedListConfig,
		FieldEmbedListEdit,
		FieldEmbedListSelect
	} from '$comps/form/fieldEmbed'
	import { FieldCustom } from '$comps/form/fieldCustom'
	import { FieldFile } from '$comps/form/fieldFile'
	import { FieldInput } from '$comps/form/fieldInput'
	import { FieldRadio } from '$comps/form/fieldRadio'
	import { FieldSelect } from '$comps/form/fieldSelect'
	import { FieldTextarea } from '$comps/form/fieldTextarea'
	import { FieldToggle } from '$comps/form/fieldToggle'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormDetailElement.svelte'

	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData
	export let field: Field
	export let row: number

	let classProps = dataObj.raw.codeCardinality === DataObjCardinality.detail ? 'mb-4' : ''

	let fieldValue: any
	let validity: any

	$: fieldValue = dataObj.userGetFieldVal(row, field.colDO.propName)
	$: validity = dataObj.dataFieldValidities.valueGet(
		dataObj.userGetFieldVal(row, 'id'),
		field.index
	)

	function setFieldVal(fieldName: string, value: any) {
		dataObj.userSetFieldVal(row, fieldName, value)
		dataObj = dataObj

		state.objStatus.setValid(
			dataObj.dataFieldValidities.values.every(
				(fieldValue: FieldValue) => fieldValue.value.error === ValidityError.none
			)
		)
		state.objStatus.setChanged(dataObj.getStatusChanged())
		state = state
	}
</script>

<div class={classProps}>
	{#if field instanceof FieldCheckbox}
		<FormElInpCheckbox {dataObj} {field} {fieldValue} {setFieldVal} />
	{:else if field instanceof FieldCustom}
		<FormElCustom bind:field {state} {dataObj} />
	{:else if field instanceof FieldEmbedListConfig}
		<FormElEmbedListConfig {state} {dataObj} {dataObjData} {field} {fieldValue} />
	{:else if field instanceof FieldEmbedListEdit}
		<FormElEmbedListEdit {state} {dataObj} {dataObjData} {field} {fieldValue} />
	{:else if field instanceof FieldEmbedListSelect}
		<FormElEmbedListSelect {state} {dataObj} {dataObjData} {field} {fieldValue} {setFieldVal} />
	{:else if field instanceof FieldFile}
		<FormElFile bind:field {fieldValue} onChange={setFieldVal} />
	{:else if field instanceof FieldInput}
		<FormElInp {dataObj} {field} {fieldValue} {setFieldVal} />
	{:else if field instanceof FieldRadio}
		<FormElInpRadio {dataObj} {field} {row} {fieldValue} {setFieldVal} />
	{:else if field instanceof FieldSelect}
		<FormElSelect {dataObj} {field} {fieldValue} {setFieldVal} />
	{:else if field instanceof FieldTextarea}
		<FormElTextarea {field} {fieldValue} {setFieldVal} />
	{:else if field instanceof FieldToggle}
		<FormElToggle {dataObj} {field} {fieldValue} {setFieldVal} />
	{/if}
	<!-- <DataViewer header="Field" data={{ row, field: field.colDO.propName, fieldValue }} /> -->
</div>

{#if validity}
	{#if validity.level == ValidityErrorLevel.error}
		<div class="text-error-500 mb-3">
			<p>{validity.message}</p>
		</div>
	{:else if validity.level == ValidityErrorLevel.warning}
		<div class="text-warning-500 mb-3">
			<p>{validity.message}</p>
		</div>
	{/if}
{/if}

<style>
	#root {
		max-height: 90vh;
		overflow-y: auto;
	}
</style>
