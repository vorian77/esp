<script lang="ts">
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton'
	import NavTree from '$comps/app/NavTree.svelte'
	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'
	import { apiFetch, ApiFunction } from '$routes/api/api'
	import { TokenApiUserId, TokenAppDoActionConfirmType, TokenAppNode } from '$utils/types.token'
	import { Node, ResponseBody } from '$utils/types'
	import { State, StatePacket, StatePacketAction } from '$comps/app/types.appState'

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
		// <todo> - 240125
		const state: State = $storeDrawer.meta.state
		const userId = state.user!.id
		const result: ResponseBody = await apiFetch(ApiFunction.dbEdgeInit, new TokenApiUserId(userId))
		if (result.success) {
			closeDrawer()
			await state.resetUser(true)
		}
	}

	async function openMyAccount() {
		closeDrawer()
		const state: State = $storeDrawer.meta.state
		const dataObjName = 'data_obj_auth_account'
		const node = new Node({
			_codeNodeType: 'object',
			dataObjName,
			header: 'My Account',
			icon: 'Settings',
			id: dataObjName,
			isHideRowManager: true,
			name: dataObjName,
			page: '/home'
		})
		const packet = new StatePacket({
			action: StatePacketAction.openNode,
			confirmType: TokenAppDoActionConfirmType.objectChanged,
			token: new TokenAppNode({ node })
		})
		state.update({ page: node.page, nodeType: node.type, packet })
	}

	async function openMyPreferences() {
		closeDrawer()
		const state: State = $storeDrawer.meta.state
		await state.openModalDataObj('data_obj_auth_user_pref_type', async () => {
			await state.resetUser(true)
		})
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
	{:else if $storeDrawer.id === 'navRight'}
		<div class="flex flex-col p-4 space-y-4">
			<btn on:click={openMyAccount} on:keydown={openMyAccount} tabindex="0" role="button"
				>My Account</btn
			>
			<btn on:click={openMyPreferences} on:keydown={openMyPreferences} tabindex="0" role="button"
				>My Preferences</btn
			>

			<a href="/" on:click={() => closeDrawer()}>Logout</a>

			<div hidden={!$storeDrawer.meta.isSysAdmin} class="">
				<btn on:click={dbInitAdmin} on:keydown={dbInitAdmin} tabindex="0" role="button"
					>Reset Admin DB</btn
				>
			</div>
		</div>
	{/if}
</Drawer>

<svelte:window on:keydown={onKeyDown} />
