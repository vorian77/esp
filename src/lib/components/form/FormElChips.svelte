<script lang="ts">
	import {
		ContextKey,
		DataManager,
		DataObj,
		DataObjCardinality,
		type DataRecord,
		ParmsValues,
		ParmsValuesType,
		required
	} from '$utils/types'
	import { getContext } from 'svelte'
	import {
		State,
		StatePacket,
		StatePacketAction,
		StateSurfaceEmbedShell,
		StateSurfaceModalEmbed,
		StateTarget
	} from '$comps/app/types.appState.svelte'
	import {
		TokenApiUserPref,
		TokenAppDo,
		TokenAppDoActionConfirmType,
		TokenAppModalSelect,
		TokenAppModalReturnType
	} from '$utils/types.token'
	import { Field, FieldElement } from '$comps/form/field'
	import { FieldSelectMulti } from '$comps/form/fieldSelect'
	import { FieldChips } from '$comps/form/fieldChips'
	import { FieldAccess } from '$comps/form/field'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElChips.svelte'

	let { parms }: DataRecord = $props()
	let stateApp: State = required(getContext(ContextKey.stateApp), FILENAME, 'stateApp')
	let dm: DataManager = required(getContext(ContextKey.dataManager), FILENAME, 'dataManager')
	let field = $derived.by(() => {
		const f: Field = parms.field
		f.setIconProps({
			name: 'SquareMousePointer',
			clazz: 'ml-1.5 mt-0.5',
			color: '#3b79e1',
			onClick,
			size: 18,
			strokeWidth: 2
		})
		return f
	}) as FieldChips
	let linkItemsSource = $derived(field.linkItemsSource.getGridParms())
	let fieldValue = $derived(dm.getFieldValue(parms.dataObjId, parms.row, parms.field))
	let displayValue: string = $derived(field.linkItemsSource.getDisplayValueList(fieldValue))
	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))

	function onClick(event: Event) {
		stateApp.change({
			confirmType: TokenAppDoActionConfirmType.none,
			packet: new StatePacket({
				action: StatePacketAction.modalSelectOpen,
				token: new TokenAppModalSelect({
					columnDefs: linkItemsSource.columnDefs,
					fModalClose,
					gridColumnId: 'data',
					isMultiSelect: field.colDO.colDB.isMultiSelect,
					listIdsSelected: fieldValue,
					rowData: linkItemsSource.rowData,
					selectLabel: field.colDO.label,
					sortModel: linkItemsSource.sortModel
				})
			}),
			target: StateTarget.feature
		})

		async function fModalClose(returnType: TokenAppModalReturnType, returnData?: ParmsValues) {
			if (returnType === TokenAppModalReturnType.complete) {
				if (returnData.data) {
					const parmsReturn = new ParmsValues(returnData.data)
					dm.setFieldValue(
						parms.dataObjId,
						parms.row,
						parms.field,
						parmsReturn.valueGet(ParmsValuesType.listIdsSelected)
					)
				}
			}
		}
	}
</script>

{#if field}
	<FormLabel {parms} />
	<textarea
		class={'w-full text-sm rounded-lg'}
		cols={field.cols}
		id={field.colDO.propName}
		name={field.colDO.propName}
		onclick={onClick}
		readonly={true}
		rows={field.rows}
		value={displayValue}
	/>
{/if}
<!-- <DataViewer header="fieldValue" data={fieldValue} /> -->
