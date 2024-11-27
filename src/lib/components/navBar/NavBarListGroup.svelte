<script lang="ts">
	import {
		NavBarData,
		NavBarDataCompListGroup,
		NavBarDataCompItem
	} from '$comps/navBar/types.navBar'
	import NavBarListItem from '$comps/navBar/NavBarListItem.svelte'
	import DataViewer from '$utils/DataViewer.svelte'
	import { fade } from 'svelte/transition'

	const FILENAME = '/$comps/app/navBar/NavBarList.svelte'

	export let data: NavBarDataCompListGroup[]
</script>

<div>
	{#if data}
		{#if data.header && data.navBar.isOpen}
			<h2 class="mb-1 text-gray-500" in:fade={data.navBar.fadeIn} out:fade={data.navBar.fadeOut}>
				{data.header}
			</h2>
		{/if}

		<ul role="list" class="flex flex-col space-y-2">
			{#each data.items as item}
				<NavBarListItem {item} />
			{/each}
		</ul>

		<hr class="my-2" />
	{/if}
</div>
