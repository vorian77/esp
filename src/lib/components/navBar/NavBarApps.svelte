<script lang="ts">
	import { NavBarDataCompApps, NavBarDataCompItem } from '$comps/navBar/types.navBar'
	import NavBarList from '$comps/navBar/NavBarList.svelte'
	import NavBarListItem from '$comps/navBar/NavBarListItem.svelte'
	import { fade } from 'svelte/transition'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/app/navBar/NavBarApps.svelte'

	export let data: NavBarDataCompApps[]
</script>

<div>
	{#if data}
		{#if data.navBar.isOpen}
			<h2 class="mb-1 text-gray-500" in:fade={data.navBar.fadeIn} out:fade={data.navBar.fadeOut}>
				My Apps
			</h2>
		{/if}

		{#each data.apps as app}
			<div class={app.isOpen ? 'mb-5' : ''}>
				<NavBarListItem item={app.header} />
				{#if app.isOpen}
					<NavBarList data={app.list} />
				{/if}
			</div>
		{/each}
		<hr class="my-2" />
	{/if}
</div>
