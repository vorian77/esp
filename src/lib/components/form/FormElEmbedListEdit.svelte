<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldEmbedListEdit } from '$comps/form/fieldEmbed'
	import {
		State,
		StateLayoutStyle,
		StateLayoutComponentType,
		StateMode,
		StateSurfaceEmbedField
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
	import FormLabel from '$comps/form/FormLabel.svelte'
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
		stateEmbed = new StateSurfaceEmbedField({
			cardinality: DataObjCardinality.list,
			dataObjSource: new TokenApiDbDataObjSource({ dataObjId: field.raw.dataObjEmbedId }),
			layoutComponent: StateLayoutComponentType.layoutContent,
			layoutStyle: StateLayoutStyle.embeddedField,
			parms: { listRecordIdParent: recordIdCurrent },
			queryType: TokenApiQueryType.retrieve,
			updateCallback
		})
	}

	async function updateCallback(obj: any) {
		stateEmbed = stateEmbed.updateProperties(obj)
	}
</script>

<FormLabel field={fp.field} cardinality={fp.dataObj.raw.codeCardinality} />
{#if stateEmbed}
	<Layout state={stateEmbed} />
{/if}

<!-- <DataViewer header="state.parms" data={stateDisplay.metaData.data} /> -->
