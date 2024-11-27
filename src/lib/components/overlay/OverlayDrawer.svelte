<script lang="ts">
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton'
	import NavTree from '$comps/app/NavTree.svelte'
	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'
	import { apiFetch, ApiFunction } from '$routes/api/api'
	import { TokenApiUserId, TokenAppDoActionConfirmType, TokenAppNode } from '$utils/types.token'
	import { Node, ResponseBody } from '$utils/types'
	import { State, StatePacket, StatePacketAction } from '$comps/app/types.appState'
	import { adminDbReset } from '$utils/utils.sys'

	const storeDrawer = getDrawerStore()

	const FILENAME = 'OverlayDrawer.svelte'

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

	async function dbInitAdmin(event: MouseEvent) {
		const result: ResponseBody = await adminDbReset($storeDrawer.meta.state)
		if (result.success) {
			closeDrawer()
			await $storeDrawer.meta.state.resetUser(true)
		}
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
