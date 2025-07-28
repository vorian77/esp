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
		MethodResult,
		ParmsValues,
		ParmsValuesFormList,
		ParmsValuesType,
		required
	} from '$utils/types'
	import { getContext } from 'svelte'
	import { State, StateTriggerToken } from '$comps/app/types.state.svelte'
	import {
		TokenAppModalSelect,
		TokenAppModalReturn,
		TokenAppModalReturnType,
		TokenAppStateTriggerAction,
		TokenAppUserActionConfirmType
	} from '$utils/types.token'
	import { Field, FieldElement } from '$comps/form/field.svelte'
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

	let propsField = $derived(
		'w-full text-sm rounded-lg ' + field.getBackgroundColor(field.fieldAccess)
	)

	let fieldValue = $derived(dm.getFieldValue(parms.dataObjId, parms.row, field))
	let displayValue: string = $derived(field.linkItems.getValueDisplay(fieldValue))

	async function onClick(event: Event): Promise<MethodResult> {
		const gridParms = field.linkItems.getGridParms()
		return await sm.triggerAction(
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
						listIdsSelected: field.linkItems.getValueIds(fieldValue),
						rowData: gridParms.rowData,
						selectLabel: field.colDO.label,
						sortModel: gridParms.sortModel
					})
				}
			})
		)

		async function fModalClose(token: TokenAppModalReturn) {
			if (token.type === TokenAppModalReturnType.complete) {
				const parmsReturn: ParmsValues = token.parmsState || undefined
				if (parmsReturn) {
					const valueDisplay = parmsReturn.valueGet(ParmsValuesType.listIdsSelected)
					const valueRaw = field.linkItems.getValueRaw(valueDisplay)
					await dm.setFieldValueAsync(parms.dataObjId, parms.row, parms.field, valueRaw)
				}
			}
		}
	}
</script>

{#if field}
	<FormLabel {parms} />
	<textarea
		class={propsField}
		cols={field.cols}
		id={field.getValueKey()}
		name={field.getValueKey()}
		onclick={onClick}
		readonly={true}
		rows={field.rows}
		value={displayValue}
	/>
{/if}
<!-- <DataViewer header="propsBackground" data={propsBackground} /> -->
<!-- <DataViewer header="displayValue" data={displayValue} /> -->
