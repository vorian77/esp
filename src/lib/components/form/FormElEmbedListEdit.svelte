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

	$: {
		if (dataRecord) {
			let recordId = dataRecord['id'] || ''
			if (recordId.startsWith('preset_')) recordId = ''
			if (recordIdCurrent !== recordId) {
				recordIdCurrent = recordId
				setStateEmbed(fieldValue)
			}
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
			actionProxies: [
				{ actionType: TokenAppDoActionFieldType.embedListEditParmValue, proxy: parmValue }
			],
			cardinality: DataObjCardinality.list,
			dataObjSource: new TokenApiDbDataObjSource({ dataObjId: field.raw.dataObjModalId }),
			layoutComponent: StateLayoutComponentType.layoutContent,
			layoutStyle: StateLayoutStyle.embeddedField,
			parms: { listRecordIdParent: recordIdCurrent },
			queryType: TokenApiQueryType.retrieve,
			updateCallback
		})
	}

	async function parmValue(parms: any) {
		const parmValueColumnValue = field.raw.parmValueColumnValue
		const parmValueColumnType = field.raw.parmValueColumnType
		const record = required(parms.record, 'FormElEmbedListEdit.openModalEdit', 'record')
		const recordField = required(parms.field, 'FormElEmbedListEdit.openModalEdit', 'field')

		if (
			parmValueColumnValue &&
			parmValueColumnType &&
			recordField.colDO.propName === parmValueColumnValue
		) {
			const parmValue = record[parmValueColumnValue]
			const parmValueType = record[parmValueColumnType]
			const parmName = record.header

			console.log('FormElEmbedListEdit.parmValue1:', {
				record,
				parmValueColumnValue,
				parmName,
				parmValue,
				parmValueType
			})
		}
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
		<object title="aria-embedded-column" class="mb-4">
			<Layout state={stateEmbed} />
		</object>
	{/if}
</div>

<!-- <DataViewer header="state.parms" data={stateDisplay.metaData.data} /> -->
