<script lang="ts">
	import {
		NavBarData,
		NavBarDataCompGroup,
		NavBarDataCompItem
	} from '$comps/nav/navBar/types.navBar'
	import NavBarItem from '$comps/nav/navBar/NavBarItem.svelte'
	import NavBarHeader from '$comps/nav/navBar/NavBarHeader.svelte'
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
