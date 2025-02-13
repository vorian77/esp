<script lang="ts">
	import { getArray, ParmsValuesType, UserResourceTask } from '$utils/types'
	import DataViewer from '$utils/DataViewer.svelte'
	import { error } from '@sveltejs/kit'

	const FILENAME = '$comps/nav/navDash/tso_moed_app_doc.svelte'

	const classButton = 'rounded-md text-base p-2 text-white text-right'
	const classData = '-ml-2 text-base '

	let { data, onClick, task }: { data: any; onClick: Function; task: UserResourceTask } = $props()

	let docTypes = data

	async function onClickLocal(doc: any) {
		await onClick(task, { [ParmsValuesType.itemsParmValue]: doc.name })
	}
</script>

{#if docTypes}
	<div class="grid grid-cols-[2fr_1fr] gap-5 items-center">
		{#each docTypes as doc (doc.id)}
			{@const btnLabel = doc._uploaded
				? `Proof of ${doc.header} uploaded`
				: `Upload proof of ${doc.header}`}
			{@const btnStyle = doc._uploaded ? 'bg-[#2E67B1]' : 'bg-[#BF2C23]'}
			{@const statusStyle = doc._uploaded ? 'text-[#2E67B1]' : 'text-[#BF2C23]'}
			{@const statusLabel = doc._uploaded ? `Uploaded` : `Not uploaded`}
			<button class={`${classButton} ${btnStyle}`} onclick={() => onClickLocal(doc)}>
				{btnLabel}:
			</button>
			<span class={`${classData} ${statusStyle}`}>{statusLabel}</span>
		{/each}
	</div>
{/if}
