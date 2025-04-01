<script lang="ts">
	import {
		CodeAction,
		CodeActionClass,
		CodeActionType,
		ContextKey,
		DataManager,
		DataObj,
		DataObjCardinality,
		type DataRecord,
		ParmsValues,
		ParmsValuesType,
		required
	} from '$utils/types'
	import { PropLinkItems } from '$comps/dataObj/types.rawDataObj.svelte'
	import { getContext } from 'svelte'
	import {
		State,
		StateSurfaceEmbedShell,
		StateTriggerToken
	} from '$comps/app/types.appState.svelte'
	import {
		TokenApiUserPref,
		TokenAppDo,
		TokenAppModalSelect,
		TokenAppModalReturnType,
		TokenAppStateTriggerAction,
		TokenAppUserActionConfirmType
	} from '$utils/types.token'
	import { Field, FieldElement, FieldValueType } from '$comps/form/field.svelte'
	import { FieldSelectMulti } from '$comps/form/fieldSelect'
	import { FieldChips } from '$comps/form/fieldChips'
	import { FieldAccess } from '$comps/form/field.svelte'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElInpChips.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)
	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))

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
	let fieldValue = $derived(
		dm.getFieldValue(parms.dataObjId, parms.row, field, FieldValueType.data)
	)

	let displayValue: string = $derived(field.linkItems.getDisplayValueList(fieldValue))

	async function onClick(event: Event) {
		const gridParms = field.linkItems.getGridParms()
		await sm.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_modal,
					CodeActionType.modalOpenSelect
				),
				codeConfirmType: TokenAppUserActionConfirmType.none,
				data: {
					token: new TokenAppModalSelect({
						columnDefs: gridParms.columnDefs,
						fModalClose,
						isMultiSelect: field.colDO.colDB.isMultiSelect,
						listIdsSelected: fieldValue,
						rowData: gridParms.rowData,
						selectLabel: field.colDO.label,
						sortModel: gridParms.sortModel
					})
				}
			})
		)

		async function fModalClose(returnType: TokenAppModalReturnType, returnData?: ParmsValues) {
			if (returnType === TokenAppModalReturnType.complete) {
				if (returnData.data) {
					const parmsReturn = new ParmsValues(returnData.data)
					await dm.setFieldValue(
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
<!-- <DataViewer header="displayValue" data={displayValue} /> -->
