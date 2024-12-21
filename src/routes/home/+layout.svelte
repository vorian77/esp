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
	import NavMenu from '$comps/nav/navMenu/NavMenu.svelte'
	import { NavMenuData } from '$comps/nav/navMenu/types.navMenu.svelte'
	import NavAppMobile from '$comps/nav/NavAppMobile.svelte'
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
	import { DataManager } from '$comps/dataObj/types.dataManager.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	let { data }: { data: PageData } = $props()

	const DEV_MODE = data.environ === 'dev'
	const FILENAME = '/$routes/home/+layout.svelte'

	const storeDrawer = getDrawerStore()
	const storeModal = getModalStore()
	const storeToast = getToastStore()

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

	let innerWidth = $state(0)
	let isMobile = $derived(innerWidth <= 640)
	let isMobileMenuHide = $state(true)
	let navMenu: NavMenuData = $state(new NavMenuData({ stateApp }))

	async function stateChangeCallback(obj: any) {
		stateApp.changeProperties(obj)
		if (isMobile) isMobileMenuHide = stateTarget !== StateTarget.dashboard
		if (stateTarget === StateTarget.dashboard && !navMenu.isOpen) navMenu.toggleOpen()
		if (stateApp.page !== $page.route.id) goto(stateApp.page)
	}

	function toggleMobileMenuHide() {
		isMobileMenuHide = !isMobileMenuHide
	}

	function preventDefault(fn) {
		return function (event) {
			event.preventDefault()
			fn.call(this, event)
		}
	}
</script>

<svelte:window bind:innerWidth />

<div id="layout" class="h-screen flex flex-col bg-white">
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
		<div id="layout-main-content" class="grow sm:px-3 pb-3">
			{#if $page.route.id === '/home'}
				{#if stateTarget === StateTarget.dashboard}
					<NavDash />
				{:else if stateTarget === StateTarget.feature}
					<RootLayoutApp {stateApp} />
				{/if}
			{:else}
				<slot />
			{/if}
		</div>
	</div>
</div>
