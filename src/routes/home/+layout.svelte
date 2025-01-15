<script lang="ts">
	import { User } from '$utils/types'
	import { State, StateLayoutComponent, StateTarget } from '$comps/app/types.appState.svelte'
	import { getDrawerStore, getModalStore, getToastStore } from '@skeletonlabs/skeleton'
	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'
	import NavDash from '$comps/nav/navDash/NavDash.svelte'
	import NavMenu from '$comps/nav/navMenu/NavMenu.svelte'
	import { NavMenuData } from '$comps/nav/navMenu/types.navMenu.svelte'
	import NavAppMobile from '$comps/nav/NavAppMobile.svelte'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { setContext } from 'svelte'
	import { ContextKey } from '$utils/utils.sys'
	import DataViewer from '$utils/DataViewer.svelte'

	let { children, data }: { children: any, data: PageData } = $props()

	const DEV_MODE = data.environ === 'dev'
	const FILENAME = '/$routes/home/+layout.svelte'

	// global data manager
	let sm: State = $state(
		new State({
			fExitApp: () => goto('/'),
			fChangeCallback: stateChangeCallback,
			layoutComponent: StateLayoutComponent.layoutApp,
			storeDrawer: getDrawerStore(),
			storeModal: getModalStore(),
			storeToast: getToastStore(),
			target: StateTarget.dashboard,
			user: new User(data.rawUser)
		})
	)
	setContext(ContextKey.stateManager, sm)

	let innerWidth = $state(0)
	let isMobile = $derived(innerWidth <= 640)
	let isMobileMenuHide = $state(true)
	let navMenu: NavMenuData = $state(new NavMenuData({ sm }))
	let stateTarget = $derived(sm.target)

	async function stateChangeCallback(obj: any) {
		sm.changeProperties(obj)

		if (isMobile) {
			if (!isMobileMenuHide) toggleMobileMenuHide()
		} else {
			if (stateTarget === StateTarget.dashboard && !navMenu.isOpen) navMenu.toggleOpen()
		}
		if (sm.page !== $page.route.id) goto(sm.page)
	}

	function toggleMobileMenuHide() {
		isMobileMenuHide = !isMobileMenuHide
	}
</script>

<svelte:window bind:innerWidth />

<div id="layout" class="h-screen flex flex-col bg-white b">
	<header id="layout-nav-bar-mobile" class="sm:hidden">
		<NavAppMobile {toggleMobileMenuHide} />
	</header>

	<div id="layout-main" class="h-12 grow flex flex-row">
		<div
			id="layout-main-menu-desktop"
			class="h-full {isMobileMenuHide ? 'hidden' : ''} mr-1 sm:mr-0 sm:block"
		>
			<NavMenu {navMenu} />
		</div>
		<div id="layout-main-content" class="grow">
			{#if $page.route.id === '/home'}
				{#if stateTarget === StateTarget.dashboard}
					<NavDash />
				{:else if stateTarget === StateTarget.feature}
					<RootLayoutApp {sm} />
				{/if}
			{:else}
				 {@render children()}
			{/if}
		</div>
	</div>
</div>
