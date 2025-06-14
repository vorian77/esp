<script lang="ts">
	import { debug, User } from '$utils/types'
	import { State, StateNavLayout, StateTriggerToken } from '$comps/app/types.appState.svelte'
	import { getDrawerStore, getModalStore, getToastStore } from '@skeletonlabs/skeleton'
	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'
	import LayoutDash from '$comps/layout/layoutDash/LayoutDashboard.svelte'
	import NavMenu from '$comps/nav/navMenu/NavMenu.svelte'
	import { NavMenuData } from '$comps/nav/navMenu/types.navMenu.svelte'
	import NavAppMobile from '$comps/nav/NavAppMobile.svelte'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { setContext } from 'svelte'
	import { ContextKey } from '$utils/utils.sys'
	import DataViewer from '$utils/DataViewer.svelte'

	let { data }: { data: PageData } = $props()

	if (!data.success) goto(`/error/${data.errorId}`)

	let rawUser: any = $state(data.rawUser)
	let user = new User(rawUser)

	const IS_DEV_MODE = data.environ === 'dev'
	const FILENAME = '/$routes/home/+layout.svelte'

	let innerWidth = $state(0)
	let isMobile = $derived(innerWidth <= 640)
	let isMobileMenuHide = $state(true)

	let sm: State = $state(
		new State({
			isDevMode: IS_DEV_MODE,
			navLayout: StateNavLayout.layoutDashboard,
			navPage: '/home',
			storeDrawer: getDrawerStore(),
			storeModal: getModalStore(),
			storeToast: getToastStore(),
			user: new User(rawUser)
		})
	)

	setContext(ContextKey.stateManager, sm)

	let navMenu: NavMenuData = $state(new NavMenuData({ sm }))
	let triggerTokens: StateTriggerToken[] = $derived(sm.triggerTokens)

	$effect(() => {
		if (sm.consumeTriggerToken(StateTriggerToken.navDashboard)) {
			if (sm.navLayout === StateNavLayout.layoutDashboard) {
				if (isMobile) {
					if (!isMobileMenuHide) menuToggleMobileHide()
				} else {
					if (!navMenu.isOpen) navMenu.openToggle()
				}
			}
		}
		if (sm.consumeTriggerToken(StateTriggerToken.menuClose)) {
			if (isMobile) {
				if (!isMobileMenuHide) menuToggleMobileHide()
			} else {
				if (navMenu.isOpen) navMenu.openToggle()
			}
		}
	})

	function menuToggleMobileHide() {
		isMobileMenuHide = !isMobileMenuHide
	}
</script>

<svelte:window bind:innerWidth />

<div id="layout" class="h-screen flex flex-col bg-white b">
	<header id="layout-nav-bar-mobile" class="sm:hidden">
		<NavAppMobile toggleMobileMenuHide={menuToggleMobileHide} />
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
				<RootLayoutApp {sm} />
			{:else}
				<slot />
			{/if}
		</div>
	</div>
</div>
