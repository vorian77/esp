<script lang="ts">
	import { DataObj, DataObjCardinality } from '$utils/types'
	import { FieldElement, FieldItem, FieldProps } from '$comps/form/field'
	import { FieldSelectMulti } from '$comps/form/fieldSelect'
	import { FieldAccess } from '$comps/form/field'
	import MultiSelect from 'svelte-multiselect'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import type { Option, ObjectOption } from 'svelte-multiselect'
	import DataViewer from '$utils/DataViewer.svelte'

	export let fp: FieldProps

	let classPropsLabel = ''
	let fieldValue: string[] = []
	let maxSelect: 1 | null = null
	let options: ObjectOption[] = []
	let selected: Option[] = []

	$: loadData(fp.dataObjData)

	function loadData(data: DataObjData) {
		classPropsLabel = fp.dataObj.raw.codeCardinality === DataObjCardinality.detail ? '' : 'hidden'
		maxSelect = fp.field.colDO.colDB.isMultiSelect ? null : 1
		fieldValue = fp.fieldValue && Array.isArray(fp.fieldValue) ? fp.fieldValue : []
		options = fp.field.colDO.items.map((item) => {
			return {
				label: item.display,
				preselected:
					fieldValue && Array.isArray(fieldValue) ? fieldValue.includes(item.data) : false,
				value: item.data
			}
		})
		selected = options.filter((i) => i.preselected)
	}

	function onChange(event: Event) {
		if (event.detail) {
			if (event.detail?.option) {
				const id = event.detail.option.value
				if (maxSelect === 1) {
					fieldValue = [id]
				} else {
					switch (event.detail.type) {
						case 'add':
							fieldValue = [...fieldValue, id]
							break

						case 'remove':
							fieldValue = fieldValue.filter((i) => i !== id)
							if (fieldValue.length === 0) {
								fieldValue = null
							}
							break
					}
				}
			} else {
				fieldValue = null
			}

			fp.setFieldVal(fp.field, fieldValue)
		}
	}
</script>

<FormLabel {fp} />
<MultiSelect {selected} {options} id={fp.field.colDO.propName} {maxSelect} on:change={onChange} />

<!-- <DataViewer header="value" data={fieldValue} /> -->
