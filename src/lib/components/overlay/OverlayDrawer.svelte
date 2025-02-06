<script lang="ts">
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton'
	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'
	import { State } from '$comps/app/types.appState.svelte'
	import { getContext, setContext } from 'svelte'
	import { ContextKey } from '$utils/types'

	const FILENAME = 'OverlayDrawer.svelte'
	const storeDrawer = getDrawerStore()

	setContext(ContextKey.cancelForm, closeDrawer)

	async function closeDrawer() {
		if ($storeDrawer.meta && Object.hasOwn($storeDrawer.meta, 'onCloseDrawer')) {
			await $storeDrawer.meta.onCloseDrawer()
		}
		storeDrawer.close()
		$storeDrawer.id = undefined
	}

	async function onKeyDown(event: KeyboardEvent) {
		if (!$storeDrawer.id) return
		if (event.key === 'Escape') await closeDrawer()
	}
</script>

<Drawer on:backdrop={closeDrawer}>
	{#if $storeDrawer.meta.sm}
		<div class="h-full esp-card-space-y p-4">
			<RootLayoutApp sm={$storeDrawer.meta.sm} />
		</div>
	{/if}
</Drawer>

<svelte:window onkeydown={onKeyDown} />
