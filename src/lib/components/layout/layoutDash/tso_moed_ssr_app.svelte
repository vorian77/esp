<script lang="ts">
	import { getArray, UserResourceTask } from '$utils/types'
	import DataViewer from '$utils/DataViewer.svelte'
	import { error } from '@sveltejs/kit'

	const FILENAME = '$comps/nav/navDash/tso_moed_ssr_app.svelte'
	const classLabel = 'text-lg text-gray-500'
	const classData = 'ml-2 text-lg text-gray-700'

	export let task: UserResourceTask
	export let onclick: Function
	export let data: any

	let record = data[0]

	const status = record
		? [
				{ label: 'Current Status', data: record._codeStatus },
				{ label: 'Referral Date', data: record.dateCreated },
				{ label: 'Last Update By', data: record._modifiedBy }
			]
		: []
</script>

{#if record}
	<div class="flex flex-col">
		{#each status as { label, data }, i}
			<span>
				<span class={classLabel}>{label}:</span>
				<span class={classData}>{data}</span>
			</span>
		{/each}
	</div>
{:else}
	Click to start application
{/if}
<!-- <DataViewer header="record" {data} /> -->
