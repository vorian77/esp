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
	import { State, StateSurfaceEmbedShell } from '$comps/app/types.appState.svelte'
	import FormElCustomActionButton from './FormElCustomActionButton.svelte'
	import FormElCustomActionLink from './FormElCustomActionLink.svelte'
	import FormElCustomHeader from '$comps/form/FormElCustomHeader.svelte'
	import FormElCustomHTML from '$comps/form/FormElCustomHTML.svelte'
	import FormElCustomText from '$comps/form/FormElCustomText.svelte'
	import FormElFile from '$comps/form/FormElFile.svelte'
	import FormElInp from '$comps/form/FormElInp.svelte'
	import FormElInpChips from '$comps/form/FormElInpChips.svelte'
	import FormElInpCheckbox from '$comps/form/FormElInpCheckbox.svelte'
	import FormElInpRadio from '$comps/form/FormElInpRadio.svelte'
	import FormElEmbedListConfig from '$comps/form/FormElEmbedListConfig.svelte'
	import FormElEmbedListEdit from '$comps/form/FormElEmbedListEdit.svelte'
	import FormElEmbedListSelect from '$comps/form/FormElEmbedListSelect.svelte'
	import FormElEmbedShell from '$comps/form/FormElEmbedShell.svelte'

	import FormElSelect from '$comps/form/FormElSelect.svelte'
	import FormElTextarea from '$comps/form/FormElTextarea.svelte'
	import FormElToggle from '$comps/form/FormElToggle.svelte'
	import { Field, FieldAccess } from '$comps/form/field.svelte'
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

	const FILENAME = '$comps/form/FormElement.svelte'

	const elements: Record<string, any> = {
		FieldCustomActionButton: FormElCustomActionButton,
		FieldCustomActionLink: FormElCustomActionLink,
		FieldCustomHeader: FormElCustomHeader,
		FieldCustomHTML: FormElCustomHTML,
		FieldCustomText: FormElCustomText,
		FieldChips: FormElInpChips,
		FieldCheckbox: FormElInpCheckbox,
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

<!-- <p>field: {parms.field.colDO.label}</p> -->

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
