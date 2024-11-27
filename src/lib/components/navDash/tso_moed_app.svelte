<script lang="ts">
	import { getArray, UserResourceTask } from '$utils/types'
	import DataViewer from '$utils/DataViewer.svelte'
	import { error } from '@sveltejs/kit'

	const FILENAME = '$comps/navDash/tso_moed_app.svelte'
	const classLabel = 'text-lg text-gray-500'
	const classData = 'ml-2 text-lg text-gray-700'

	export let task: UserResourceTask
	export let onClick: Function
	export let data: any

	let record = getArray(data)[0]

	const status = [
		{ label: 'Current Status', data: record._codeStatus },
		{ label: 'Referral Date', data: record.dateReferral },
		{ label: 'Last Update By', data: record._modifiedBy }
	]
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
	<!-- <DataViewer header="record" data={record} /> -->
{/if}
