<script lang="ts">
	import { getArray, getColor, UserResourceTask } from '$utils/types'
	import DataViewer from '$utils/DataViewer.svelte'
	import { error } from '@sveltejs/kit'

	const FILENAME = '$comps/nav/navDash/tso_moed_ssr_advocate.svelte'
	const classLabel = 'text-lg text-gray-500'
	const classData = 'ml-2 text-lg text-gray-700 text-green-500'

	export let task: UserResourceTask
	export let onclick: Function
	export let data: any

	let record = data[0]

	let status = []
	Object.entries(record).forEach((entry) => {
		status.push({ label: entry[1].label, data: entry[1].data, color: entry[1].color })
	})
</script>

{#if record}
	<div class="flex flex-col">
		{#each status as { label, data, color }, i}
			{@const colorHex = getColor(color || 'black')}
			<span>
				<span class={classLabel}>{label}:</span>
				<span class={classData} style="color: {colorHex}">{data}</span>
			</span>
		{/each}
	</div>
{/if}
<!-- <DataViewer header="record" {data} /> -->
