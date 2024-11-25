<script lang="ts">
	import { NavBarData, NavBarDataCompList, NavBarDataCompItem } from '$comps/navBar/types.navBar'
	import NavBarListItem from '$comps/navBar/NavBarListItem.svelte'
	import DataViewer from '$utils/DataViewer.svelte'
	import { fade } from 'svelte/transition'

	const FILENAME = '/$comps/app/navBar/NavBarList.svelte'

	export let data: NavBarDataCompList[]
</script>

<div>
	{#if data}
		<ul role="list" class="flex flex-col space-y-2">
			{#each data.items as item}
				<NavBarListItem {item} />
			{/each}
		</ul>
	{/if}
</div>
