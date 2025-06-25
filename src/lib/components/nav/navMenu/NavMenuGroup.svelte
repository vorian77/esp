<script lang="ts">
	import {
		NavMenuData,
		NavMenuDataCompGroup,
		NavMenuDataCompItem
	} from '$comps/nav/navMenu/types.navMenu.svelte'
	import NavMenuItem from '$comps/nav/navMenu/NavMenuItem.svelte'
	import NavMenuHeader from '$comps/nav/navMenu/NavMenuHeader.svelte'
	import { fade } from 'svelte/transition'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/app/navMenu/NavMenuItem.svelte'

	let { data }: { data: NavMenuDataCompGroup[] } = $props()
</script>

<div class={data.items.length === 0 ? 'hidden' : ''}>
	{#if data}
		{#if !data.hideHr}
			<hr class="my-2" />
		{/if}
		{#if data.header}
			<NavMenuHeader navMenu={data.navMenu} header={data.header} />
		{/if}
		<ul role="list" class="flex flex-col">
			{#each data.items as item}
				{#if !item.isHidden}
					{#if !(item.parent instanceof NavMenuDataCompItem) || data.navMenu.isOpen}
						<NavMenuItem {item} />
					{/if}
				{/if}
			{/each}
		</ul>
	{/if}
</div>
