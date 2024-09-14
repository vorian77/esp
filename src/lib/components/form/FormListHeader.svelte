<script lang="ts">
	import Icon from '$comps/other/Icon.svelte'
	import { type Field } from '$comps/form/field'
	import { DataObjSort, DataObjSortItem } from '$utils/types'
	import { PropSortDir } from '$comps/dataObj/types.rawDataObj'
	import DataViewer from '$utils/DataViewer.svelte'

	export let field: Field
	export let sortObj: DataObjSort
	export let sortField: Function

	let sortType: 'sort-asc' | 'sort-desc' | ''
	let showSwitch: 'collapse' | '' = 'collapse'

	$: {
		const sortObjItem = sortObj.sortItems.length > -1 ? sortObj.sortItems[0] : undefined
		showSwitch = sortObjItem && sortObjItem.fieldName === field.colDO.propName ? '' : 'collapse'
		sortType = sortObjItem
			? sortObjItem.direction === PropSortDir.asc
				? 'sort-asc'
				: 'sort-desc'
			: ''
	}

	function toggleSort() {
		sortType = showSwitch === '' ? (sortType === 'sort-asc' ? 'sort-desc' : 'sort-asc') : 'sort-asc'
		sortField(
			new DataObjSortItem(
				field.colDO.propName,
				sortType === 'sort-asc' ? PropSortDir.asc : PropSortDir.desc
			)
		)
	}
</script>

<div
	class="font-normal py-2"
	role="columnheader"
	tabindex="0"
	on:click={() => toggleSort()}
	on:keyup={() => toggleSort()}
>
	{field.colDO.label}
	<span class={showSwitch}>
		<Icon class="mt-0.5" name={sortType} width="24" height="24" fill={'black'} />
	</span>
</div>

<!-- <DataViewer header="sortType" data={sortType} /> -->
<!-- <DataViewer header="sortObj" data={sortObj} /> -->
