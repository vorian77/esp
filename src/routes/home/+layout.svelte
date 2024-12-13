<script lang="ts">
	import { NodeType, User } from '$utils/types'
	import {
		State,
		StateLayoutComponent,
		StatePacket,
		StatePacketAction,
		StateTarget
	} from '$comps/app/types.appState.svelte'
	import { TokenAppDo, TokenAppDoActionConfirmType } from '$utils/types.token'
	import { getDrawerStore, getModalStore, getToastStore } from '@skeletonlabs/skeleton'
	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'
	import NavDash from '$comps/nav/navDash/NavDash.svelte'
	import NavBar from '$comps/nav/navBar/NavBar.svelte'
	import { NavBarData } from '$comps/nav/navBar/types.navBar.svelte'
	import NavBarMobile from '$comps/nav/NavBarMobile.svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'
	import { tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'
	import { setContext } from 'svelte'
	import { ContextKey } from '$utils/utils.sys.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	let { data }: { data: PageData } = $props()

	const DEV_MODE = data.environ === 'dev'
	const FILENAME = '/$routes/home/+layout.svelte'

	const storeDrawer = getDrawerStore()
	const storeModal = getModalStore()
	const storeToast = getToastStore()

	let innerWidth = 0
	let isNavBarDrawerOpen = false

	let stateApp = $state(
		new State({
			fChangeCallback: stateChangeCallback,
			layoutComponent: StateLayoutComponent.layoutApp,
			storeDrawer,
			storeModal,
			storeToast,
			target: StateTarget.dashboard,
			user: new User(data.rawUser)
		})
	) as State
	setContext(ContextKey.stateApp, stateApp)

	let stateTarget = $derived(stateApp.target)
	let navBar: NavBarData = $state(new NavBarData({ stateApp }))
	let navBarWidth = $state(0)

	const goHome = () => {
		stateApp.change({
			confirmType: TokenAppDoActionConfirmType.objectChanged,
			target: StateTarget.dashboard
		})
	}

	async function stateChangeCallback(obj: any) {
		stateApp.changeProperties(obj)
		if (stateApp.page !== $page.route.id) goto(stateApp.page)
	}

	const toggleNavBarDrawer = () => {
		// isNavBarDrawerOpen = !isNavBarDrawerOpen
		// navBarWidth = isNavBarDrawerOpen ? `${innerWidth - navBar?.width}px` : '0'
	}
</script>

<svelte:window bind:innerWidth />

<div id="layout" class="h-screen flex flex-col bg-white">
	<header id="layout-nav-bar-mobile" class="md:hidden">
		<NavBarMobile state={stateApp} {goHome} {toggleNavBarDrawer} />
	</header>

	<div
		id="layout-menu-mobile"
		class="h-[calc(100vh-54px)] grow fixed top-12 left-0 md:hidden overflow-hidden z-10 transition-all duration-500"
		style="width: {navBarWidth}"
		on:click={() => toggleNavBarDrawer()}
	>
		<aside class="h-full" style="width: {navBarWidth}" on:click|stopPropagation>
			<NavBar {navBar} />
		</aside>
	</div>

	<div id="layout-main" class="h-12 grow flex flex-row">
		<div id="layout-main-menu-desktop" class="h-full hidden md:flex">
			<NavBar {navBar} />
		</div>
		<div id="layout-main-content" class="grow md:px-3 pb-3">
			{#if $page.route.id === '/home'}
				{#if stateTarget === StateTarget.dashboard}
					<NavDash state={stateApp} />
				{:else if stateTarget === StateTarget.feature}
					<RootLayoutApp />
				{/if}
			{:else}
				<slot />
			{/if}
		</div>
	</div>
</div>
