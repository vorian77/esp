<script lang="ts">
	import { appStoreUser, initNavTree, NodeType, required, User, userLogout } from '$utils/types'
	import {
		State,
		StateLayoutComponent,
		StatePacket,
		StatePacketAction
	} from '$comps/app/types.appState'
	import { TokenAppDoActionConfirmType } from '$utils/types.token'
	import { getDrawerStore, getModalStore, getToastStore } from '@skeletonlabs/skeleton'
	import NavBar from '$comps/navBar/NavBar.svelte'
	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'
	import NavHome from '$comps/app/NavHome.svelte'
	import NavFooter from '$comps/app/NavFooter.svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	export let data

	const FILENAME = '/$routes/home/+layout.svelte (new)'

	const storeDrawer = getDrawerStore()
	const storeModal = getModalStore()
	const storeToast = getToastStore()
	const DEV_MODE = data.environ === 'dev'

	let launchApp = true
	let state: State

	let user: User | undefined

	$: {
		const rawUser = $appStoreUser
		user = rawUser && Object.keys(rawUser).length > 0 ? new User(rawUser) : undefined
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
		launchApp = false
	}

	onMount(() => {
		return () => {
			// userLogout()
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
</script>

<div class="flex gap-2">
	<NavBar {state} />
	<main class="grow h-screen border-2 border-slate-700">
		Main
		<!-- <DataViewer header="user" data={user} /> -->
	</main>
</div>
