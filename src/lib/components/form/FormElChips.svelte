<script lang="ts">
	import {
		DataObj,
		DataObjCardinality,
		type DataRecord,
		ParmsValues,
		ParmsValuesType
	} from '$utils/types'
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
	import { FieldElement } from '$comps/form/field'
	import { FieldSelectMulti } from '$comps/form/fieldSelect'
	import { FieldAccess } from '$comps/form/field'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import DataViewer from '$utils/DataViewer.svelte'

	let { parms }: DataRecord = $props()

	let columnDefs: DataRecord
	let displayValue: string
	let rowData: DataRecord[]
	let sortModel: DataObjSort[]

	let dataObj = $derived(fp.stateApp.dataObj)

	let field = $derived(fp.field) as FieldCheckbox
	field.setIconProps({
		name: 'SquareMousePointer',
		clazz: 'ml-1.5 mt-0.5',
		color: '#3b79e1',
		onClick,
		size: 18,
		strokeWidth: 2
	})

	let fieldValue = $derived(fp.fieldValue)
	if (field.linkItemsSource) {
		displayValue = field.linkItemsSource.getDisplayValueList(fieldValue)
		const parms = field.linkItemsSource.getGridParms()
		columnDefs = parms.columnDefs
		rowData = parms.rowData
		sortModel = parms.sortModel
	}

	function onClick(event: Event) {
		fp.stateApp.change({
			confirmType: TokenAppDoActionConfirmType.none,
			packet: new StatePacket({
				action: StatePacketAction.modalSelectOpen,
				token: new TokenAppModalSelect({
					columnDefs,
					fModalClose,
					gridColumnId: 'data',
					isMultiSelect: field.colDO.colDB.isMultiSelect,
					listIdsSelected: fieldValue,
					rowData,
					selectLabel: field.colDO.label,
					sortModel
				})
			}),
			target: StateTarget.feature
		})

		async function fModalClose(returnType: TokenAppModalReturnType, returnData?: ParmsValues) {
			if (returnType === TokenAppModalReturnType.complete) {
				if (returnData.data) {
					const parms = new ParmsValues(returnData.data)
					fp.stateApp.fSetVal(fp.row, fp.field, parms.valueGet(ParmsValuesType.listIdsSelected))
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
