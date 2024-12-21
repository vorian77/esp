<script lang="ts">
	import { getArray, ParmsValuesType, UserResourceTask } from '$utils/types'
	import DataViewer from '$utils/DataViewer.svelte'
	import { error } from '@sveltejs/kit'

	const FILENAME = '$comps/nav/navDash/tso_moed_app_doc.svelte'
	const classButton = 'rounded-md text-base p-2 text-white text-right'
	const classData = '-ml-2 text-base text-gray-700'

	export let task: UserResourceTask
	export let onclick: Function
	export let data: any

	let docTypes = data

	const onClickLocal = async (doc: any) => {
		await onclick(task, { [ParmsValuesType.itemsParmName]: doc.name })
	}
</script>

{#if docTypes}
	<div class="grid grid-cols-[2fr_1fr] gap-5 items-center">
		{#each docTypes as doc (doc.id)}
			{@const btnLabel = doc._uploaded
				? `Proof of ${doc.header} uploaded`
				: `Upload proof of ${doc.header}`}
			{@const btnStyle = doc._uploaded ? 'bg-green-500' : 'bg-red-500'}
			{@const statusStyle = doc._uploaded ? 'text-green-500' : 'text-red-500'}
			{@const statusLabel = doc._uploaded ? `Uploaded` : `Not uploaded`}
			<button class={`${classButton} ${btnStyle}`} onclick={() => onClickLocal(doc)}>
				{btnLabel}:
			</button>
			<span class={`${classData} ${statusStyle}`}>{statusLabel}</span>
		{/each}
	</div>
{/if}
