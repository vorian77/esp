<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldEmbedListEdit } from '$comps/form/fieldEmbed'
	import {
		State,
		StateLayoutStyle,
		StateLayoutComponentType,
		StateMode,
		StateSurfaceEmbed
	} from '$comps/app/types.appState'
	import {
		TokenApiDbDataObjSource,
		TokenApiQueryData,
		TokenApiQueryType,
		TokenAppDoActionFieldType
	} from '$utils/types.token'
	import {
		Validation,
		ValidationStatus,
		ValidationType,
		Validity,
		ValidityField,
		ValidityError,
		ValidityErrorLevel
	} from '$comps/form/types.validation'
	import { apiFetch, ApiFunction } from '$routes/api/api'
	import Layout from '$comps/layout/BaseLayout.svelte'
	import {
		DataObj,
		DataObjCardinality,
		type DataRecord,
		required,
		ResponseBody
	} from '$utils/types'
	import Icon from '$comps/misc/Icon.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElEmbeddedListSelect.svelte'

	export let fp: FieldProps

	$: state = fp.state
	$: dataObj = fp.dataObj
	$: dataRecord = fp.dataRecord
	$: field = fp.field as FieldEmbedListEdit
	$: fieldValue = fp.fieldValue

	$: exprFilterEmbed = `.id IN (SELECT ${dataObj.rootTable?.object} FILTER .id = <parms,uuid,listRecordIdParent>).${field.colDO.propName}.id`

	let stateEmbed: State
	let recordIdCurrent: string

	$: if (dataRecord) {
		let recordId = dataRecord['id'] || ''
		if (recordId.startsWith('preset_')) recordId = ''
		if (recordIdCurrent !== recordId) {
			recordIdCurrent = recordId
			setStateEmbed(fieldValue)
		}
	}

	$: {
		const parentObjectSaved =
			recordIdCurrent !== '' && state.objStatus.objValidToSave && !state.objStatus.objHasChanged
		if (stateEmbed) {
			if (parentObjectSaved) {
				stateEmbed.modeAdd(StateMode.ParentObjectSaved)
			} else {
				stateEmbed.modeDrop(StateMode.ParentObjectSaved)
			}
			stateEmbed = stateEmbed
		}
	}

	function setStateEmbed(ids: string[]) {
		stateEmbed = new StateSurfaceEmbed({
			cardinality: DataObjCardinality.list,
			dataObjSource: new TokenApiDbDataObjSource({ dataObjId: field.raw.dataObjModalId }),
			layoutComponent: StateLayoutComponentType.layoutContent,
			layoutStyle: StateLayoutStyle.embeddedField,
			parentSetChangedEmbedded,
			parentSetStatusValid,
			parms: { listRecordIdParent: recordIdCurrent },
			queryType: TokenApiQueryType.retrieve,
			updateCallback
		})
	}

	function parentSetChangedEmbedded(status: boolean) {
		if (status) {
			dataObj.dataFieldsChangedEmbedded.valueSet(recordIdCurrent, field.colDO.propName, true)
		} else {
			dataObj.dataFieldsChangedEmbedded.valueDrop(recordIdCurrent, field.colDO.propName)
		}
		state.objStatus.setChangedEmbedded(status)
		fp.state = state
	}

	function parentSetStatusValid(status: boolean) {
		let v: Validation
		if (status) {
			v = field.getValuationValid()
		} else {
			v = field.getValuationInvalid(
				ValidityError.required,
				ValidityErrorLevel.silent,
				`"${field.colDO.label}" is required.`
			)
		}
		v.validityFields.forEach(({ fieldName, validity }) => {
			dataObj.dataFieldValidities.valueSet(recordIdCurrent, fieldName, validity)
		})
		state.objStatus.setValid(
			dataObj.dataFieldValidities.values.every(
				(fieldValue: FieldValue) => fieldValue.value.error === ValidityError.none
			)
		)
		fp.state = state
	}

	async function updateCallback(obj: any) {
		stateEmbed = stateEmbed.updateProperties(obj)
	}
</script>

<div class="flex mt-6">
	<label for={field.colDO.propName}>{field.colDO.label}</label>
</div>
<div>
	{#if stateEmbed}
		<object title="aria-embedded-column">
			<Layout state={stateEmbed} />
		</object>
	{/if}
</div>

<!-- <DataViewer header="state.parms" data={stateDisplay.metaData.data} /> -->
