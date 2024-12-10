<script lang="ts">
	import { NavBarDataCompApps, NavBarDataCompItem } from '$comps/nav/navBar/types.navBar'
	import NavBarGroup from '$comps/nav/navBar/NavBarGroup.svelte'
	import NavBarItem from '$comps/nav/navBar/NavBarItem.svelte'
	import NavBarHeader from '$comps/nav/navBar/NavBarHeader.svelte'
	import { fade } from 'svelte/transition'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/nav/navBar/NavBarApps.svelte'

	export let data: NavBarDataCompApps[]
</script>

<div>
	{#if data}
		<NavBarHeader navBar={data.navBar} header={'My Apps'} />

		{#each data.apps as app}
			<div class={app.isOpen ? 'mb-5' : ''}>
				<NavBarGroup data={app.group} />
			</div>
		{/each}
	{/if}
</div>
