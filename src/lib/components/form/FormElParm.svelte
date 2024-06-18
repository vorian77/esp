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

	const FILENAME = '$comps/form/FormElParm.svelte'

	export let dataObj: DataObj
	export let field: Field
	export let fieldValue: any
	export let setFieldVal: Function

	let currComp: any

	const comps: Record<string, any> = {
		text: FormElInp
	}

	currComp = comps['text']
</script>

<div class="p-4">
	<svelte:component this={currComp} {dataObj} {field} {fieldValue} {setFieldVal} />
</div>
