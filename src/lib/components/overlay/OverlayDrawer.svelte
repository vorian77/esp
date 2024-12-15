<script lang="ts">
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton'
	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'
	import { State } from '$comps/app/types.appState.svelte'

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
	{#if storeDrawer.id === 'auth'}
		<div>
			{#if storeDrawer.meta.state}
				<div class="esp-card-space-y">
					<RootLayoutApp state={storeDrawer.meta.state} on:formCancelled={onformCancelled} />
				</div>
			{/if}
		</div>
	{/if}
</Drawer>

<svelte:window onkeydown={onKeyDown} />
