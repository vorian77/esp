<script lang="ts">
	import { NavBarDataCompApps, NavBarDataCompItem } from '$comps/navBar/types.navBar'
	import NavBarList from '$comps/navBar/NavBarList.svelte'
	import NavBarListItem from '$comps/navBar/NavBarListItem.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/app/navBar/NavBarApps.svelte'

	export let data: NavBarDataCompApps[]
</script>

<div>
	{#if data}
		{#each data.apps as app}
			<div class={app.isOpen ? 'mb-5' : ''}>
				<NavBarListItem item={app.header} />
				{#if app.isOpen}
					<NavBarList data={app.list} />
				{/if}
			</div>
		{/each}
	{/if}
</div>
