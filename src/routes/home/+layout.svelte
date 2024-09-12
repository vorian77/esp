<script lang="ts">
	import { appStoreUser, initNavTree, NodeType, required, User } from '$utils/types'
	import { DataObjActionFieldConfirm } from '$comps/dataObj/types.dataObjActionField'
	import {
		State,
		StateLayoutComponentType,
		StateLayoutStyle,
		StatePacket,
		StatePacketComponent
	} from '$comps/app/types.appState'
	import {
		TokenAppAction,
		TokenAppDo,
		TokenAppDoActionConfirmType,
		TokenAppTreeReset
	} from '$utils/types.token'
	import {
		AppBar,
		AppShell,
		Avatar,
		getDrawerStore,
		getModalStore,
		getToastStore
	} from '@skeletonlabs/skeleton'
	import Layout from '$comps/layout/BaseLayout.svelte'
	import NavHome from '$comps/app/NavHome.svelte'
	import NavFooter from '$comps/app/NavFooter.svelte'
	import NavTree from '$comps/app/NavTree.svelte'
	import Icon from '$comps/misc/Icon.svelte'
	import { getURLDownload } from '$utils/utils.aws'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$routes/home/+layout.svelte'

	const storeDrawer = getDrawerStore()
	const storeModal = getModalStore()
	const storeToast = getToastStore()

	const DEFAULT_APP_NAME = 'The App Factory'
	const NAV_COLOR = '#3b79e1'
	const SIDEBAR_LEFT_WIDTH = '80'

	let launchApp = true
	let state: State
	let statePackets: Array<StatePacket> = []
	let user: User | undefined
	let userAvatarSrc = ''

	$: {
		const rawUser = $appStoreUser
		user = rawUser && Object.keys(rawUser).length > 0 ? new User(rawUser) : undefined
	}
	$: if (launchApp && user) {
		;(async () => {
			await initNavTree(user)
		})()
		state = new State({
			layoutComponent: StateLayoutComponentType.layoutApp,
			layoutStyle: StateLayoutStyle.dataObjTab,
			storeDrawer,
			storeModal,
			storeToast,
			updateCallback: stateUpdateCallback,
			user
		})

		launchApp = false
	}
	$: if (user?.avatar?.key) {
		;(async () => {
			userAvatarSrc = await getURLDownload(user.avatar.key)
		})()
	} else {
		userAvatarSrc = ''
	}

	async function stateUpdateCallback(obj: any) {
		state = state.updateProperties(obj)
		if (obj.packet) await statePacketAdd(obj.packet)
		if (state.page !== $page.route.id) goto(state.page)
	}

	async function statePacketAdd(packet: StatePacket) {
		statePackets = [...statePackets, packet]
		await statePacketTrigger()
	}
	async function statePacketTrigger() {
		while (statePackets.length > 0 && !state.packet) {
			const packet = statePacketPop()

			// set packet in global state
			state.packet = packet
		}
	}
	function statePacketPop() {
		const packet = statePackets[statePackets.length - 1]
		statePackets = [...statePackets.slice(0, -1)]
		return packet
	}

	function goHome() {
		state.update({
			page: '/home',
			nodeType: NodeType.home,
			packet: new StatePacket({
				component: StatePacketComponent.navHome,
				confirmType: TokenAppDoActionConfirmType.objectChanged,
				token: new TokenAppTreeReset({ action: TokenAppAction.none })
			})
		})
	}
	function navLeft(): void {
		state.openDrawer('navLeft', 'left', undefined, 'w-[50%]', { state })
	}
	function navRight(): void {
		const isSysAdmin = user ? ['user_sys', '2487985578'].includes(user.userName) : false
		state.openDrawer('navRight', 'right', undefined, 'w-[20%]', { state, isSysAdmin })
	}
</script>

{#if state}
	<DataViewer header="state.objStatus-obj" data={state.objStatus} />
{/if}
<AppShell slotSidebarLeft="w-{SIDEBAR_LEFT_WIDTH}">
	<svelte:fragment slot="header">
		<div>
			<AppBar background="bg-neutral-200" padding="p-3">
				<svelte:fragment slot="lead">
					<div
						class="md:hidden mr-2"
						role="button"
						tabindex="0"
						on:click={navLeft}
						on:keyup={navLeft}
					>
						<Icon name="hamburger-menu" width="1.5rem" height="1.5rem" fill={NAV_COLOR} />
					</div>

					<div role="button" tabindex="0" class="text-black" on:click={goHome} on:keyup={goHome}>
						{#if user?.org?.header}
							{user.org.header}
						{:else}
							{DEFAULT_APP_NAME}
						{/if}
					</div>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<div role="button" tabindex="0" class="mr-2" on:click={navRight} on:keyup={navRight}>
						<!-- <div role="button" tabindex="0" class="mr-2" use:popup={popupClick}> -->
						<!-- <button class="btn variant-filled" use:popup={popupClick}>Click</button> -->
						<!-- src={avatarSrc} -->
						<!-- src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop" -->
						<Avatar
							initials={user ? user.initials : undefined}
							background="bg-primary-400"
							rounded="rounded-full"
							src={userAvatarSrc}
							width="w-9"
						/>
					</div>
				</svelte:fragment>
			</AppBar>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<div class="hidden md:block">
			{#if user && state?.nodeType === NodeType.home}
				<div class="my-4">
					<NavTree {state} on:treeChanged />
				</div>
			{/if}
		</div>
	</svelte:fragment>

	<div>
		{#if $page.route.id === '/home'}
			{#if state?.nodeType === NodeType.home}
				<div class="m-4">
					<NavHome />
				</div>
			{:else}
				<Layout bind:state />
			{/if}
		{:else}
			<slot />
		{/if}
	</div>

	<svelte:fragment slot="footer">
		<div style="border-top: 1px solid #f5f5f5;">
			<NavFooter {state} />
		</div>
	</svelte:fragment>
</AppShell>

<div class="card p-4 variant-filled-primary z-10" data-popup="popupClick">
	<a href="/logout">Logout</a>
	<div class="arrow variant-filled-primary" />
</div>
