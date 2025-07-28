<script lang="ts">
	import {
		ContextKey,
		DataManager,
		DataObjCardinality,
		DataRecordStatus,
		getArray,
		PropDataType,
		required
	} from '$utils/types'
	import { getContext } from 'svelte'
	import { FieldElement } from '$comps/form/field.svelte'
	import { FieldSelectOwner } from '$comps/form/fieldSelect'
	import { FieldAccess } from '$comps/form/field.svelte'
	import FormElSelect from '$comps/form/FormElSelect.svelte'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/form/FormElSelect.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let dataObj = $derived(dm.getDataObj(parms.dataObjId))
	let field = $derived(parms.field) as FieldSelectOwner
	let fieldId = $derived('field-input-select-' + field.colDO.orderDefine)

	let fieldValue = $derived(dm.getFieldValue(parms.dataObjId, parms.row, field))
	let dataItems = $derived(field.linkItems ? field.linkItems.getDataItemsAll(fieldValue) : [])

	let classProps = 'hidden'
	if (dataObj?.data.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.preset)) {
		if (sm.user.systemIds.length > 1) {
			classProps = ''
		} else if (sm.user.systemIds.length === 1) {
			const valueRaw = sm.user.systemIds[0]
			const valueSave = field.linkItems.getValueRaw(valueRaw)
			dm.setFieldValueSync(parms.dataObjId, parms.row, parms.field, valueSave)
		}
	}

	let classPropsLabel = $derived(
		dataObj.raw.codeCardinality === DataObjCardinality.detail ? 'mb-1' : 'mb-1 hidden'
	)

	async function onChange(event: Event) {
		const target = event.currentTarget as HTMLSelectElement
		let value = target.value
		if (field.colDO.colDB.isMultiSelect) value = value ? [value] : []
		const valueRaw = field.linkItems.getValueRaw(value)
		await dm.setFieldValueAsync(parms.dataObjId, parms.row, parms.field, valueRaw)
	}
</script>

<div class={classProps}>
	<FormElSelect {parms} />
</div>
