<script lang="ts">
	import { DataObjCardinality } from '$utils/types'
	import { FieldElement, FieldItem, FieldProps } from '$comps/form/field'
	import { FieldSelectMulti } from '$comps/form/fieldSelect'
	import { FieldEmbedShell } from '$comps/form/fieldEmbedShell'
	import { FieldAccess } from '$comps/form/field'
	import { TabGroup, Tab } from '@skeletonlabs/skeleton'
	import DataViewer from '$utils/DataViewer.svelte'

	export let fp: FieldProps

	let tabs: SideTab[] = []
	let classPropsLabel = ''

	$: loadData(fp.dataObjData)

	function loadData(data: DataObjData) {
		const embeds = fp.dataObj.fields.filter((f) =>
			fp.field.colDO.fieldEmbedShellFields.includes(f.colDO.propName)
		)
		tabs = embeds.map((f) => {
			return new SideTab(f)
		})
		console.log('FormElEmbedShell.loadData', { embeds })

		classPropsLabel = fp.dataObj.raw.codeCardinality === DataObjCardinality.detail ? '' : 'hidden'
	}

	// let engDate = ''
	// let startDate = new Date('1966-07-07')

	// $: field = fp.field as FieldSelectMulti
	// $: setFieldVal = fp.setFieldVal

	// $: items = fp.field.colDO.items.map((item) => {
	// 	return {
	// 		label: item.display,
	// 		preselected:
	// 			fp.fieldValue && fp.fieldValue.length > 0 ? fp.fieldValue.includes(item.data) : false,
	// 		value: item.data
	// 	}
	// })
	// $: selected = items.filter((i) => i.preselected)
	// $: console.log('FormElChips.items', { items, selected })

	function onChange(event: Event) {
		// if (event.detail) {
		// 	let newValues: string[] = fp.fieldValue && fp.fieldValue.length > 0 ? fp.fieldValue : []
		// 	if (event.detail?.option) {
		// 		const id = event.detail.option.value
		// 		switch (event.detail.type) {
		// 			case 'add':
		// 				console.log('FormelSelectMulti - add', event.detail.option)
		// 				newValues.push(id)
		// 				break
		// 			case 'remove':
		// 				console.log('FormelSelectMulti - remove', event.detail.option)
		// 				newValues = fp.fieldValue.filter((i) => i !== id)
		// 				break
		// 		}
		// 	} else {
		// 		newValues = []
		// 	}
		// 	fp.fieldValue = newValues.length > 0 ? newValues : null
		// 	console.log('FormelSelectMulti.onChange:', fp.fieldValue)
		// 	setFieldVal(field, fp.fieldValue)
		// }
	}
	function onClickTab(event: Event) {
		console.log('FormElEmbedShell.onClickTab', event)
	}

	class SideTab {
		label: string
		constructor(field: FieldEmbedShell) {
			this.label = field.colDO.label
		}
	}
</script>

<label class="label" for={fp.field.colDO.propName}>
	{fp.field.colDO.label}
</label>

[EmbedShell]

<!-- <MultiSelect bind:selected options={items} id={fp.field.colDO.propName} on:change={onChange} /> -->

<!-- <DataViewer header="value" data={fieldValue} /> -->
<!-- <DataViewer header="items" data={field.items} /> -->
