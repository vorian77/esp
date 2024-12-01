<script lang="ts">
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton'
	import NavTree from '$comps/app/NavTree.svelte'
	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'
	import { State } from '$comps/app/types.appState'
	import NavBar from '$comps/navBar/NavBar.svelte'
	import { NavBarData, NavBarDataCompItem } from '$comps/navBar/types.navBar'

	const FILENAME = 'OverlayDrawer.svelte'
	const storeDrawer = getDrawerStore()

	function closeDrawer() {
		if ($storeDrawer.meta && Object.hasOwn($storeDrawer.meta, 'onCloseDrawer')) {
			$storeDrawer.meta.onCloseDrawer()
		}
		storeDrawer.close()
		$storeDrawer.id = undefined
	}

	function onformCancelled() {
		closeDrawer()
	}

	function onKeyDown(event: KeyboardEvent) {
		if (!$storeDrawer.id) return
		if (event.key === 'Escape') closeDrawer()
	}
</script>

<Drawer on:backdrop={closeDrawer}>
	{#if $storeDrawer.id === 'auth'}
		<div>
			{#if $storeDrawer.meta.state}
				<div class="esp-card-space-y">
					<RootLayoutApp state={$storeDrawer.meta.state} on:formCancelled={onformCancelled} />
				</div>
			{/if}
		</div>
	{:else if $storeDrawer.id === 'navLeft'}
		<div class="p-2">
			<NavTree state={$storeDrawer.meta.state} on:treeChanged={closeDrawer} />
		</div>
	{/if}
</Drawer>

<svelte:window on:keydown={onKeyDown} />
