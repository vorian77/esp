<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldEmbedListConfig } from '$comps/form/fieldEmbed'
	import {
		State,
		StateLayoutComponentType,
		StateLayoutStyle,
		StateMode,
		StateSurfaceEmbedField
	} from '$comps/app/types.appState'
	import {
		TokenApiDbDataObjSource,
		TokenApiQueryType,
		TokenAppDoActionFieldType,
		TokenAppDoActionConfirmType,
		TokenAppModalReturnType
	} from '$utils/types.token'
	import Layout from '$comps/layout/BaseLayout.svelte'
	import { DataObj, DataObjCardinality, type DataRecord, required } from '$utils/types'
	import { RawDataObjParent } from '$comps/dataObj/types.rawDataObj'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElEmbeddedListConfig.svelte'

	export let fp: FieldProps

	$: state = fp.state
	$: dataObj = fp.dataObj
	$: dataRecord = fp.dataRecord
	$: field = fp.field as FieldEmbedListConfig
	$: fieldValue = fp.fieldValue

	$: exprFilterEmbed = `.id IN (SELECT ${dataObj.rootTable?.object} FILTER .id = <parms,uuid,listRecordIdParent>).${field.colDO.propName}.id`

	let stateEmbed: State
	let recordIdCurrent: string

	$: {
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

	function setStateEmbed(fieldValue: any) {
		stateEmbed = new StateSurfaceEmbedField({
			actionProxies: [
				{ actionType: TokenAppDoActionFieldType.embedListConfigEdit, proxy: openModalEdit },
				{ actionType: TokenAppDoActionFieldType.embedListConfigNew, proxy: openModalNew }
			],
			cardinality: DataObjCardinality.list,
			dataObjSource: new TokenApiDbDataObjSource({
				dataObjId: field.raw.dataObjEmbedId,
				exprFilter: exprFilterEmbed
			}),
			layoutComponent: StateLayoutComponentType.layoutContent,
			layoutStyle: StateLayoutStyle.embeddedField,
			parentDataObj: dataObj,
			parentFieldName: field.colDO.propName,
			parentRecordId: recordIdCurrent,
			parentState: state,
			parms: { listRecordIdParent: recordIdCurrent },
			queryType: TokenApiQueryType.retrieve,
			storeModal: state.storeModal,
			updateCallback
		})
	}

	function openModalEdit(parms: any) {
		const state = required(parms.state, 'FormElEmbedListConfig.openModalEdit', 'state')
		openModal(state, TokenApiQueryType.retrieve)
	}

	function openModalNew(parms: any) {
		const state = required(parms.state, 'FormElEmbedListConfig.openModalNew', 'state')
		openModal(state, TokenApiQueryType.preset)
	}

	function openModal(state: State, queryType: TokenApiQueryType) {
		state.openModalEmbed(
			field.actionsFieldModal,
			DataObjCardinality.detail,
			new TokenApiDbDataObjSource({
				dataObjId: field.raw.dataObjEmbedId,
				exprFilter: exprFilterEmbed
			}),
			new TokenApiDbDataObjSource({
				dataObjId: field.raw.dataObjModalId,
				parent: new RawDataObjParent({
					_columnName: field.colDO.propName,
					_columnIsMultiSelect: true,
					_table: dataObj.rootTable!
				})
			}),
			StateLayoutStyle.overlayModalDetail,
			state.dataQuery.valueGetAll(),
			queryType,
			fUpdate
		)
		function fUpdate(returnType: TokenAppModalReturnType, value: any = undefined) {
			value = value ? value.valueGetIdList() : undefined
			setStateEmbed(value ? value : [])
		}
	}

	async function updateCallback(obj: any) {
		if (obj.packet.token.action === TokenAppDoActionFieldType.listSelfSave) {
			fieldValue = obj.packet.token.data.dataRows.map((r: any) => r.record.id)
		}
		stateEmbed = stateEmbed.updateProperties(obj)
	}
</script>

<FormLabel field={fp.field} cardinality={fp.dataObj.raw.codeCardinality} />

{#if stateEmbed}
	<Layout state={stateEmbed} />
{/if}

<!-- <DataViewer header="modes (listConfig)" data={stateEmbedded.modes} /> -->
<!-- <DataViewer header="stateDisplay" data={stateDisplay} /> -->
<!-- <DataViewer header="stateDisplay.modes" data={stateEmbedded.modes} /> -->
