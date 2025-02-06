<script lang="ts">
	import { User } from '$utils/types'
	import {
		State,
		StateComponentContent,
		StateComponentLayout,
		StateTriggerToken
	} from '$comps/app/types.appState.svelte'
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

	const IS_DEV_MODE = data.environ === 'dev'
	const FILENAME = '/$routes/home/+layout.svelte'

	let innerWidth = $state(0)
	let isMobile = $derived(innerWidth <= 640)
	let isMobileMenuHide = $state(true)

	let sm: State = $state(
		new State({
			navLayout: StateComponentLayout.layoutDashboard,
			navPage: '/home',
			storeDrawer: getDrawerStore(),
			storeModal: getModalStore(),
			storeToast: getToastStore(),
			triggerTokens: [StateTriggerToken.navDashboard, StateTriggerToken.navLayout],
			user: new User(data.rawUser)
		})
	)
	setContext(ContextKey.stateManager, sm)
	let navMenu: NavMenuData = $state(new NavMenuData({ sm }))
	let triggerTokens: StateTriggerToken[] = $derived(sm.triggerTokens)

	$effect(() => {
		if (sm.consumeTriggerToken(StateTriggerToken.navDashboard)) {
			if (isMobile) {
				if (!isMobileMenuHide) toggleMobileMenuHide()
			} else {
				if (!navMenu.isOpen) navMenu.openToggle()
			}
		}
	})

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
				<RootLayoutApp {sm} />
			{:else}
				<slot />
			{/if}
		</div>
	</div>
</div>
