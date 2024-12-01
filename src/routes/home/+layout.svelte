<script lang="ts">
	import { appStoreUser, initNavTree, NodeType, required, User, userLogout } from '$utils/types'
	import { DataObjActionFieldConfirm } from '$comps/dataObj/types.dataObjActionField'
	import {
		State,
		StateLayoutComponent,
		StatePacket,
		StatePacketAction
	} from '$comps/app/types.appState'
	import { TokenAppDo, TokenAppDoActionConfirmType } from '$utils/types.token'
	import {
		AppBar,
		AppShell,
		Avatar,
		getDrawerStore,
		getModalStore,
		getToastStore
	} from '@skeletonlabs/skeleton'
	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'
	import NavDash from '$comps/navDash/NavDash.svelte'
	import NavFooter from '$comps/app/NavFooter.svelte'
	import NavBar from '$comps/navBar/NavBar.svelte'
	import NavTree from '$comps/app/NavTree.svelte'
	import { NavBarData, NavBarDataCompItem } from '$comps/navBar/types.navBar'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'
	import { tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$routes/home/+layout.svelte'

	const DEFAULT_APP_NAME = 'The App Factory'
	const NAV_COLOR = '#3b79e1'
	const SIDEBAR_LEFT_WIDTH = '80'
	const storeDrawer = getDrawerStore()
	const storeModal = getModalStore()
	const storeToast = getToastStore()

	let appName = ''
	let isNavBarDrawerOpen = false
	let launchApp = true
	let navBar: NavBarData
	let state: State
	let statePackets: Array<StatePacket> = []
	let user: User | undefined
	let navBarWidth: any

	// 241001 - navBar experiment
	export let data
	const DEV_MODE = data.environ === 'dev'

	$: {
		const rawUser = $appStoreUser
		user = rawUser && Object.keys(rawUser).length > 0 ? new User(rawUser) : undefined
		appName = user?.org?.appName ? user.org.appName : DEFAULT_APP_NAME
	}
	$: if (launchApp && user) {
		;(async () => {
			await initNavTree(user)
		})()
		state = new State({
			fUpdateCallback: stateUpdateCallback,
			layoutComponent: StateLayoutComponent.layoutApp,
			storeDrawer,
			storeModal,
			storeToast,
			user
		})
		navBar = new NavBarData({ navBarUpdate, state })
		launchApp = false
	}
	$: userAvatarSrc = user && user.avatar ? user.avatar.url : ''
	$: if (state && state.packet) {
		let packet

		// navBarOpen
		packet = state.consume(StatePacketAction.navBarOpen)
		;(async () => {
			if (packet) if (!navBar.isOpen) navBar.toggleOpen()
		})()
	}

	onMount(() => {
		return () => {
			userLogout()
		}
	})

	async function stateUpdateCallback(obj: any) {
		state = state.updateProperties(obj)
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
				action: StatePacketAction.navBarOpen,
				confirmType: TokenAppDoActionConfirmType.objectChanged
			})
		})
	}
	const navBarUpdate = (isItemActivate: boolean) => {
		if (isItemActivate) isNavBarDrawerOpen = false
		navBar = navBar
	}
	function navLeft(): void {
		state.openDrawer('navLeft', 'left', undefined, 'w-250px', { state })
	}
</script>

<AppShell slotSidebarLeft="w-{SIDEBAR_LEFT_WIDTH}">
	<svelte:fragment slot="header">
		<div class="md:hidden">
			<AppBar background="bg-neutral-200" padding="p-3">
				<svelte:fragment slot="lead">
					<div
						class="md:hidden mr-2"
						role="button"
						tabindex="0"
						on:click={() => {
							isNavBarDrawerOpen = !isNavBarDrawerOpen
						}}
						on:keyup={navLeft}
					>
						<Icon
							props={new IconProps({
								name: 'menu',
								color: NAV_COLOR,
								strokeWidth: 2
							})}
						/>
					</div>
					<div role="button" tabindex="0" class="text-black" on:click={goHome} on:keyup={goHome}>
						{#if appName}
							{appName}
						{/if}
					</div>
				</svelte:fragment>
				<svelte:fragment slot="trail"></svelte:fragment>
			</AppBar>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		{#if navBar && isNavBarDrawerOpen}
			<div
				class="w-screen h-screen fixed top-15 left-0 border-0 border-red-500 bg-transparent/80 z-50"
				in:fly={{ x: -200, duration: 500 }}
				out:fly={{ x: -200, duration: 500 }}
			>
				<NavBar bind:navBar />
			</div>
		{/if}
		<div class="hidden md:block">
			{#if user && navBar}
				{#if DEV_MODE}
					<NavBar bind:navBar />
				{:else}
					<div class="my-4">
						<NavTree {state} on:treeChanged />
					</div>
				{/if}
			{/if}
		</div>
	</svelte:fragment>

	<div>
		{#if $page.route.id === '/home'}
			{#if state?.nodeType === NodeType.home}
				<div class="m-4">
					<NavDash {state} />
				</div>
			{:else}
				<RootLayoutApp bind:state />
			{/if}
		{:else}
			<slot />
			<NavDash {state} />
		{/if}
	</div>

	<svelte:fragment slot="footer">
		<!-- <NavFooter {state} /> -->
	</svelte:fragment>
</AppShell>
