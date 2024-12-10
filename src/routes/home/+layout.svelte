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
	import NavDash from '$comps/nav/navDash/NavDash.svelte'
	import NavBar from '$comps/nav/navBar/NavBar.svelte'
	import { NavBarData } from '$comps/nav/navBar/types.navBar'
	import NavBarMobile from '$comps/nav/NavBarMobile.svelte'
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

	let innerWidth = 0
	let isNavBarDrawerOpen = false
	let launchApp = true
	let navBar: NavBarData
	let navBarWidth = 0
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

	// NavBar
	const getNavBarWidth = () => {
		return isNavBarDrawerOpen ? `${innerWidth - navBar?.width}px` : '0'
	}

	const navBarUpdate = (isItemActivate: boolean) => {
		if (isItemActivate && isNavBarDrawerOpen) toggleNavBarDrawer()
		navBarWidth = getNavBarWidth()
		navBar = navBar
	}

	const toggleNavBarDrawer = () => {
		isNavBarDrawerOpen = !isNavBarDrawerOpen
		navBarWidth = getNavBarWidth()
	}
</script>

<svelte:window bind:innerWidth />

<div id="layout" class="h-screen flex flex-col bg-white">
	<header id="layout-nav-bar-mobile" class="md:hidden">
		<NavBarMobile {state} {goHome} {toggleNavBarDrawer} />
	</header>

	<div
		id="layout-menu-mobile"
		class="h-[calc(100vh-54px)] grow fixed top-12 left-0 md:hidden overflow-hidden z-10 transition-all duration-500"
		style="width: {navBarWidth}"
		on:click={() => toggleNavBarDrawer()}
	>
		<aside class="h-full" style="width: {navBarWidth}" on:click|stopPropagation>
			<NavBar bind:navBar />
		</aside>
	</div>

	<div id="layout-main" class="h-12 grow flex flex-row">
		<div id="layout-main-menu-desktop" class="h-full hidden md:flex">
			<NavBar bind:navBar />
		</div>
		<div id="layout-main-content" class="grow md:px-3 pb-3">
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
