<script lang="ts">
	import { appStoreUser, NodeType, User, userLogout } from '$utils/types'
	import {
		State,
		StateLayoutComponent,
		StatePacket,
		StatePacketAction
	} from '$comps/app/types.appState'
	import { TokenAppDo, TokenAppDoActionConfirmType } from '$utils/types.token'
	import { getDrawerStore, getModalStore, getToastStore } from '@skeletonlabs/skeleton'
	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'
	import NavDash from '$comps/navDash/NavDash.svelte'
	import NavBar from '$comps/navBar/NavBar.svelte'
	import { NavBarData } from '$comps/navBar/types.navBar'
	import NavBarTop from '$comps/app/NavBarTop.svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'
	import { tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'
	import DataViewer from '$utils/DataViewer.svelte'

	export let data
	const DEV_MODE = data.environ === 'dev'
	const FILENAME = '/$routes/home/+layout.svelte'

	const storeDrawer = getDrawerStore()
	const storeModal = getModalStore()
	const storeToast = getToastStore()

	let isNavBarDrawerOpen = false
	let launchApp = true
	let navBar: NavBarData
	let state: State
	let statePackets: Array<StatePacket> = []
	let user: User | undefined

	$: {
		const rawUser = $appStoreUser
		user = rawUser && Object.keys(rawUser).length > 0 ? new User(rawUser) : undefined
	}
	$: if (user && launchApp) {
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

	$: if (state && state.packet) {
		// navBarOpen
		let packet = state.consume(StatePacketAction.navBarOpen)
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
		if (isItemActivate && isNavBarDrawerOpen) toggleNavBarDrawer()
		navBarDrawerWidth = isNavBarDrawerOpen ? `${navBar?.width}px` : '0'
		navBar = navBar
	}

	let navBarDrawerWidth = 0
	const toggleNavBarDrawer = () => {
		isNavBarDrawerOpen = !isNavBarDrawerOpen
		navBarDrawerWidth = isNavBarDrawerOpen ? `${navBar?.width}px` : '0'
	}
</script>

<div id="layout-screen" class="h-screen flex flex-col bg-white">
	<div
		id="nav-menu-mobile"
		class="h-[calc(100vh-50px)] grow fixed top-12 left-0 md:hidden overflow-hidden z-10 transition-all duration-500"
		style="width: {navBarDrawerWidth}"
		on:click={() => toggleNavBarDrawer()}
	>
		<div class="h-full" style="width: {navBarDrawerWidth}" on:click|stopPropagation>
			<NavBar bind:navBar />
		</div>
	</div>

	<div id="nav-bar-mobile" class="header h-12 mb-0 md:hidden">
		<NavBarTop appName={user?.org?.appName} {goHome} {toggleNavBarDrawer} />
	</div>

	<div id="main" class="h-full flex z-0">
		<div id="nav-menu-desktop" class="hidden md:flex">
			<NavBar bind:navBar />
		</div>
		<div id="nav-content" class="content grow mt-2 md:mt-0 md:p-0">
			{#if $page.route.id === '/home'}
				{#if state?.nodeType === NodeType.home}
					<NavDash {state} />
				{:else}
					<RootLayoutApp bind:state />
				{/if}
			{:else}
				<slot />
			{/if}
		</div>
	</div>
</div>
