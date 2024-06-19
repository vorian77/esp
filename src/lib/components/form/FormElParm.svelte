<script lang="ts">
	import { Field, FieldProps } from '$comps/form/field'

	import FormElInp from '$comps/form/FormElInp.svelte'
	import FormElInpCheckbox from '$comps/form/FormElInpCheckbox.svelte'
	import FormElInpRadio from '$comps/form/FormElInpRadio.svelte'
	import FormElEmbedListConfig from '$comps/form/FormElEmbedListConfig.svelte'
	import FormElEmbedListEdit from '$comps/form/FormElEmbedListEdit.svelte'
	import FormElEmbedListSelect from '$comps/form/FormElEmbedListSelect.svelte'
	import FormElSelect from '$comps/form/FormElSelect.svelte'
	import FormElTextarea from '$comps/form/FormElTextarea.svelte'
	import FormElToggle from '$comps/form/FormElToggle.svelte'
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

	const comps: Record<string, any> = {
		text: FormElInp
	}

	export let fp: FieldProps

	$: dataRecord = fp.dataRecord

	$: field = fp.field as Field
	// $: fieldListItems: dataRecord.fieldListItems
	$: fieldListItemsParmName = dataRecord.fieldListItemsParmName
	$: isMultiSelect = dataRecord.isMultiSelect
	$: isRequired = dataRecord.isRequired
	$: linkTable = dataRecord.linkTable
	$: parmType = dataRecord.codeParmType

	$: {
		const className = field.constructor.name
		if (typeof className === 'string' && className !== '') {
		}
		console.log('FormElParm.className', className)
	}

	$: currComp = comps['text']
</script>

<div class="text-right content-end border-4">
	{parmType}
	<svelte:component this={currComp} {fp} />
</div>
