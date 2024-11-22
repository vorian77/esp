<script lang="ts">
	import NavBarListItem from '$comps/navBar/NavBarListItemOld.svelte'
	import { NavBarData, NavBarDataItem } from '$comps/navBar/types.navBar'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/app/navBar/NavBarList.svelte'

	export let items: NavBarDataItem[]
	export let isExpanded: boolean
</script>

<ul role="list" class="flex flex-col space-y-4 mx-4">
	{#each items as item}
		<NavBarListItem {item} {isExpanded} />
	{/each}
</ul>
