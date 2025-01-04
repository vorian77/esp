<script lang="ts">
	import { NavMenuDataCompApps, NavMenuDataCompItem } from '$comps/nav/navMenu/types.navMenu.svelte'
	import NavMenuGroup from '$comps/nav/navMenu/NavMenuGroup.svelte'
	import NavMenuItem from '$comps/nav/navMenu/NavMenuItem.svelte'
	import NavMenuHeader from '$comps/nav/navMenu/NavMenuHeader.svelte'
	import { fade } from 'svelte/transition'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/nav/navMenu/NavMenuApps.svelte'

	let { data }: { data: NavMenuDataCompApps[] } = $props()
</script>

<div>
	{#if data}
		<NavMenuHeader navMenu={data.navMenu} header={'My Apps'} />

		{#each data.apps as app}
			<div class={app.isOpen ? 'mb-5' : ''}>
				<NavMenuGroup data={app.group} />
			</div>
		{/each}
	{/if}
</div>
