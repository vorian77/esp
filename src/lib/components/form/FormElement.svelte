<script lang="ts">
	import {
		ContextKey,
		DataManager,
		DataObj,
		DataObjCardinality,
		DataObjData,
		type DataRecord,
		required,
		Validity,
		ValidityErrorLevel,
		ValidityError
	} from '$utils/types'
	import { getContext } from 'svelte'
	import { State } from '$comps/app/types.state.svelte'

	import FormElCustomActionButton from '$comps/form/FormElCustomActionButton.svelte'
	import FormElCustomActionLink from '$comps/form/FormElCustomActionLink.svelte'
	import FormElCustomHeader from '$comps/form/FormElCustomHeader.svelte'
	import FormElCustomHTML from '$comps/form/FormElCustomHTML.svelte'
	import FormElCustomImage from '$comps/form/FormElCustomImage.svelte'
	import FormElCustomText from '$comps/form/FormElCustomText.svelte'
	import FormElFileData from '$comps/form/FormElFileData.svelte'
	import FormElFileImage from '$comps/form/FormElFileImage.svelte'
	import FormElInp from '$comps/form/FormElInp.svelte'
	import FormElInpChips from '$comps/form/FormElInpChips.svelte'
	import FormElInpCheckbox from '$comps/form/FormElInpCheckbox.svelte'
	import FormElInpDate from '$comps/form/FormElInpDate.svelte'
	import FormElInpRadio from '$comps/form/FormElInpRadio.svelte'
	import FormElEmbedDetailEligibility from '$comps/form/FormElEmbedDetailEligibility.svelte'
	import FormElEmbedListConfig from '$comps/form/FormElEmbedListConfig.svelte'
	import FormElEmbedListEdit from '$comps/form/FormElEmbedListEdit.svelte'
	import FormElEmbedListSelect from '$comps/form/FormElEmbedListSelect.svelte'
	import FormElEmbedShell from '$comps/form/FormElEmbedShell.svelte'
	import FormElSelect from '$comps/form/FormElSelect.svelte'
	import FormElSelectOwner from '$comps/form/FormElSelectOwner.svelte'
	import FormElTextarea from '$comps/form/FormElTextarea.svelte'
	import FormElToggle from '$comps/form/FormElToggle.svelte'
	import { Field, FieldAccess } from '$comps/form/field.svelte'
	import { FieldCheckbox } from '$comps/form/fieldCheckbox'
	import {
		FieldCustomActionButton,
		FieldCustomActionLink,
		FieldCustomHeader,
		FieldCustomImage,
		FieldCustomText
	} from '$comps/form/fieldCustom'
	import {
		FieldEmbedListConfig,
		FieldEmbedListEdit,
		FieldEmbedListSelect,
		FieldEmbedShell
	} from '$comps/form/fieldEmbed.svelte'
	import { FieldChips } from '$comps/form/fieldChips'
	import { FieldFileData, FieldFileImage } from '$comps/form/fieldFile'
	import { FieldInput } from '$comps/form/fieldInput'
	import { FieldParm } from '$comps/form/fieldParm'
	import { FieldRadio } from '$comps/form/fieldRadio'
	import { FieldSelect, FieldSelectOwner } from '$comps/form/fieldSelect'
	import { FieldTextarea } from '$comps/form/fieldTextarea'
	import { FieldToggle } from '$comps/form/fieldToggle'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElement.svelte'

	const elements: Record<string, any> = {
		FieldCustomActionButton: FormElCustomActionButton,
		FieldCustomActionLink: FormElCustomActionLink,
		FieldCustomHeader: FormElCustomHeader,
		FieldCustomHTML: FormElCustomHTML,
		FieldCustomImage: FormElCustomImage,
		FieldCustomText: FormElCustomText,
		FieldChips: FormElInpChips,
		FieldCheckbox: FormElInpCheckbox,
		FieldEmbedDetailEligibility: FormElEmbedDetailEligibility,
		FieldEmbedListConfig: FormElEmbedListConfig,
		FieldEmbedListEdit: FormElEmbedListEdit,
		FieldEmbedListSelect: FormElEmbedListSelect,
		FieldEmbedShell: FormElEmbedShell,
		FieldFileData: FormElFileData,
		FieldFileImage: FormElFileImage,
		FieldInput: FormElInp,
		FieldInputDate: FormElInpDate,
		FieldRadio: FormElInpRadio,
		FieldSelect: FormElSelect,
		FieldSelectOwner: FormElSelectOwner,
		FieldTextarea: FormElTextarea,
		FieldToggle: FormElToggle
	}
	let Element: any = $state()

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let fieldValidity = $derived(dm.getFieldValidity(parms.dataObjId, parms.row, parms.field))

	$effect(() => {
		let elementName =
			typeof parms.field.constructor.name === 'string' && parms.field.constructor.name !== ''
				? parms.field.constructor.name
				: ''
		if (elementName) Element = elements[elementName]
	})

	let classProps = $derived(
		parms.dataObj.raw.codeCardinality === DataObjCardinality.detail ? 'mb-4' : ''
	)
</script>

<div class={classProps}>
	<Element {parms} />
</div>

{#if fieldValidity}
	<div class="mb-3 text-sm">
		{#if fieldValidity.level == ValidityErrorLevel.error}
			<div class="text-error-500">
				<p>{fieldValidity.message}</p>
			</div>
		{:else if fieldValidity.level == ValidityErrorLevel.warning}
			<div class="text-warning-500">
				<p>{fieldValidity.message}</p>
			</div>
		{/if}
	</div>
{/if}
