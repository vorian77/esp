<script lang="ts">
	import { NavBarData, NavBarDataCompGroup, NavBarDataCompItem } from '$comps/navBar/types.navBar'
	import NavBarItem from '$comps/navBar/NavBarItem.svelte'
	import NavBarHeader from '$comps/navBar/NavBarHeader.svelte'
	import { fade } from 'svelte/transition'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/app/navBar/NavBarItem.svelte'

	export let data: NavBarDataCompGroup[]
</script>

<div class={data.items.length === 0 ? 'hidden' : ''}>
	{#if data}
		{#if !data.hideHr}
			<hr class="my-2" />
		{/if}
		{#if data.header}
			<NavBarHeader navBar={data.navBar} header={data.header} />
		{/if}
		<ul role="list" class="flex flex-col">
			{#each data.items as item}
				<NavBarItem {item} />
			{/each}
		</ul>
	{/if}
</div>
