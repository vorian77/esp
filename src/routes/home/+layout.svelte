<script lang="ts">
	import {
		CodeAction,
		CodeActionClass,
		CodeActionType,
		debug,
		isPlainObjectEmpty,
		MethodResult,
		User,
		UserParmItemSource,
		UserParmItemType
	} from '$utils/types'
	import { State, StateNavLayout, StateTriggerToken } from '$comps/app/types.state.svelte'
	import { getDrawerStore, getModalStore, getToastStore } from '@skeletonlabs/skeleton'
	import {
		TokenApiId,
		TokenApiQueryType,
		TokenAppStateTriggerAction,
		TokenAppStateTriggerActionTarget
	} from '$utils/types.token'
	import { apiFetchFunction, ApiFunction } from '$routes/api/api'
	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'
	import LayoutDash from '$comps/layout/layoutDash/LayoutDashboard.svelte'
	import NavMenu from '$comps/nav/navMenu/NavMenu.svelte'
	import { NavMenuData, NavMenuSize } from '$comps/nav/navMenu/types.navMenu.svelte'
	import NavAppMobile from '$comps/nav/NavAppMobile.svelte'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { setContext } from 'svelte'
	import { ContextKey } from '$utils/utils.sys'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$routes/home/+layout.svelte'

	let { data }: { data: PageData } = $props()

	if (!data.success) goto(`/error/${data.errorId}`)

	const IS_DEV_MODE = data.environ === 'dev'

	let innerWidth = $state(0)
	let isMobile = $derived(innerWidth <= 640)
	let isMobileMenuHide = $state(true)

	let sm: State = $state(
		new State({
			isDevMode: IS_DEV_MODE,
			storeDrawer: getDrawerStore(),
			storeModal: getModalStore(),
			storeToast: getToastStore()
		})
	)
	setContext(ContextKey.stateManager, sm)

	let promise = launch()

	let triggerTokens: StateTriggerToken[] = $derived(sm.triggerTokens)

	$effect(() => {
		if (sm.navMenuData && sm.consumeTriggerToken(StateTriggerToken.navDashboard)) {
			if (sm.navLayout === StateNavLayout.layoutDashboard) {
				if (isMobile) {
					if (!isMobileMenuHide) menuToggleMobileHide()
				} else {
					if (sm.navMenuWidthValue.current === sm.navMenuData.widthClosed) {
						sm.navMenuData.openSet(sm?.navMenuData.widthOpen)
					}
				}
			}
		}
		if (sm.consumeTriggerToken(StateTriggerToken.menuClose)) {
			if (isMobile) {
				if (!isMobileMenuHide) menuToggleMobileHide()
			} else {
				if (sm.navMenuWidthValue.current === sm.navMenuData.widthOpen) {
					sm.navMenuData?.openToggle()
				}
			}
		}
	})

	async function launch(): Promise<MethodResult> {
		return await sm.userCurrInit()
	}

	function menuToggleMobileHide() {
		isMobileMenuHide = !isMobileMenuHide
	}
</script>

<svelte:window bind:innerWidth />

{#await promise}
	Loading user...
{:then}
	<div id="layout" class="h-screen flex flex-col bg-white b">
		<header id="layout-nav-bar-mobile" class="sm:hidden">
			<NavAppMobile toggleMobileMenuHide={menuToggleMobileHide} />
		</header>

		<div id="layout-main" class="h-12 grow flex flex-row">
			<div
				id="layout-main-menu-desktop"
				class="h-full {isMobileMenuHide ? 'hidden' : ''} mr-1 sm:mr-0 sm:block"
			>
				<NavMenu navMenuData={sm.navMenuData} widthValue={sm.navMenuWidthValue} />
			</div>
			<div id="layout-main-content" class="grow">
				<RootLayoutApp {sm} />
			</div>
		</div>
	</div>
{/await}
