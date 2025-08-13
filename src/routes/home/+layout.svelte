<script lang="ts">
	import {
		CodeAction,
		CodeActionClass,
		CodeActionType,
		debug,
		isPlainObjectEmpty,
		MethodResult,
		ToastType,
		User,
		UserParmItemSource,
		UserParmItemType
	} from '$utils/types'
	import { State, StateNavLayout, StateTriggerToken } from '$comps/app/types.state.svelte'
	import {
		TokenApiId,
		TokenApiQueryType,
		TokenAppModalReturn,
		TokenAppModalReturnType,
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
	import { Toaster, createToaster } from '@skeletonlabs/skeleton-svelte'
	const toaster = createToaster()
	import OverlayModal from '$comps/overlay/OverlayModal.svelte'
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
			overlayToaster: createToaster()
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
		let result: MethodResult = await sm.userCurrInit()
		if (result.error) return result
		sm.navLayout = StateNavLayout.layoutDashboard
		return new MethodResult()
	}

	function menuToggleMobileHide() {
		isMobileMenuHide = !isMobileMenuHide
	}

	async function onClose(modalReturn: TokenAppModalReturn) {
		sm.overlayState.overlayModalOpen = false
		if (sm.overlayState.overlayModalFunctionReturn) {
			await sm.overlayState.overlayModalFunctionReturn(modalReturn)
		}
	}
</script>

<svelte:window bind:innerWidth />

{#if sm?.overlayToaster}
	<Toaster toaster={sm.overlayToaster} />
{/if}

{#if sm?.overlayState?.overlayModalOpen}
	<OverlayModal {sm} {onClose} />
{/if}

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
