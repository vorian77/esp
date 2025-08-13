<script lang="ts">
	import { getArray, isPlainObject, UserResourceTaskItem } from '$utils/types'
	import { FieldColor, getFieldColor } from '$comps/form/field.svelte'
	import DataViewer from '$utils/DataViewer.svelte'
	import { error } from '@sveltejs/kit'

	const FILENAME = '$comps/nav/navDash/tso_sys_data.svelte'
	const classLabel = 'text-lg text-desc'
	const classData = 'ml-2 text-lg'

	export let task: UserResourceTaskItem
	export let onclick: Function
	export let data: any

	let isShowData = true
	let record = data ? data[0] : {}

	let status = []
	if (isPlainObject(record)) {
		Object.entries(record).forEach((entry) => {
			if (entry[0] === 'isShowData') {
				isShowData = entry[1]
			} else {
				status.push({ label: entry[1].label, data: entry[1].data, color: entry[1].color })
			}
		})
	}
</script>

{#if record && isShowData}
	<div class="flex flex-col">
		{#each status as { label, data, color }, i}
			{@const fieldColor = getFieldColor(color || 'black') as FieldColor}
			{@const colorHex = fieldColor.hexColor}
			<span>
				<span class={classLabel}>{label}:</span>
				<span class={classData} style="color: {colorHex}">{data}</span>
			</span>
		{/each}
	</div>
{:else if task.noDataMsg}
	{task.noDataMsg}
{/if}
<!-- <DataViewer header="isShowData" data={isShowData} /> -->
<!-- <DataViewer header="record" {data} /> -->
