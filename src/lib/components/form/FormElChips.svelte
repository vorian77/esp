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
		StateSurfaceModalEmbed
	} from '$comps/app/types.appState'
	import {
		TokenApiUserPref,
		TokenAppDo,
		TokenAppDoActionConfirmType,
		TokenAppModalSelect,
		TokenAppModalReturnType
	} from '$utils/types.token'
	import { FieldElement, FieldProps } from '$comps/form/field'
	import { FieldSelectMulti } from '$comps/form/fieldSelect'
	import { FieldAccess } from '$comps/form/field'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import DataViewer from '$utils/DataViewer.svelte'

	export let fp: FieldProps

	let columnDefs: DataRecord
	let displayValue: string
	let field: FieldCheckbox
	let rowData: DataRecord[]
	let sortModel: DataObjSort[]

	$: dataObj = fp.state.props.dataObj

	$: {
		field = fp.field as FieldCheckbox
		field.setIconProps({
			name: 'SquareMousePointer',
			clazz: 'ml-1.5 mt-0.5',
			color: '#3b79e1',
			onClick: onChange,
			size: 18,
			strokeWidth: 2
		})
	}
	$: fieldValue = fp.fieldValue
	$: if (field.linkItemsSource) {
		displayValue = field.linkItemsSource.getDisplayValueList(fieldValue)
		const parms = field.linkItemsSource.getGridParms()
		columnDefs = parms.columnDefs
		rowData = parms.rowData
		sortModel = parms.sortModel
	}

	function onChange(event: Event) {
		fp.state.update({
			packet: new StatePacket({
				action: StatePacketAction.modalSelectOpen,
				confirmType: TokenAppDoActionConfirmType.none,
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
			})
		})

		async function fModalClose(returnType: TokenAppModalReturnType, returnData?: ParmsValues) {
			if (returnType === TokenAppModalReturnType.complete) {
				if (returnData.data) {
					const parms = new ParmsValues(returnData.data)
					fp.state.props?.fClosureSetVal(
						fp.row,
						fp.field,
						parms.valueGet(ParmsValuesType.listIdsSelected)
					)
				}
			}
		}
	}
</script>

{#if field}
	<FormLabel {fp} />
	<textarea
		class={'w-full text-sm rounded-lg'}
		cols={field.cols}
		id={field.colDO.propName}
		name={field.colDO.propName}
		on:click={onChange}
		readonly={true}
		rows={field.rows}
		value={displayValue}
	/>
{/if}
<!-- <DataViewer header="fieldValue" data={fieldValue} /> -->
