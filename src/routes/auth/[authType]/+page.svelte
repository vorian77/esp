<script lang="ts">
	import srcLogo from '$assets/org_logo_sys.png'
	import { getDrawerStore, getToastStore } from '@skeletonlabs/skeleton'
	import { ContextKey, Node, userSetId } from '$utils/types'
	import {
		State,
		StatePacket,
		StatePacketAction,
		StateTarget
	} from '$comps/app/types.appState.svelte'
	import { DataManager } from '$comps/dataObj/types.dataManager.svelte'
	import { TokenApiQueryType, TokenAppDataObjName } from '$utils/types.token'
	import { setContext } from 'svelte'
	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = 'routes/+page.svelte'

	let { data }: { data: PageData } = $props()

	const storeDrawer = getDrawerStore()
	const storeToast = getToastStore()
	const DEV_MODE = data.environ === 'dev'

	let sm: State = $derived.by(() => {
		const authType = data.authType
		if (authType) {
			const dataObjects = {
				login: 'data_obj_auth_login',
				signup: 'data_obj_auth_signup'
			}
			const dataObj = dataObjects[authType]
			if (!dataObj) {
				error(404, {
					file: FILENAME,
					function: 'constructor',
					message: `Invalid authType: ${authType}`
				})
			}
			return new State({
				storeDrawer,
				storeToast,
				packet: new StatePacket({
					action: StatePacketAction.doOpen,
					token: new TokenAppDataObjName({
						dataObjName: dataObj,
						queryType: TokenApiQueryType.preset
					})
				}),
				target: StateTarget.feature
			})
			return undefined
		}
	})

	async function expressLogin() {
		const userSys = '0b3ba76c-c0f4-11ee-9b77-8f017aab6306'
		const userPhyllipHall = '129d4a42-c0f4-11ee-9b77-bf2d11e31679'
		await userSetId(userSys)
	}
</script>

<div class="h-screen flex flex-col items-center justify-center">
	<div
		class="w-full h-full sm:h-[70%] sm:w-[50%] md:w-[375px] bg-white border-2 rounded-lg shawdow-2xl p-4 flex flex-col items-center justify-center"
	>
		<img class="h-16 mb-4" src={srcLogo} alt="The App Factory" />

		{#if sm}
			<RootLayoutApp {sm} />
		{/if}

		{#if DEV_MODE}
			<button
				type="button"
				class="btn btn-action variant-filled-secondary w-full"
				onclick={expressLogin}
			>
				Dev Login
			</button>
		{/if}
	</div>
</div>

<!-- <div id="full-screen">
	<div class="content">
		<div class="flex gap-4">
			<button
				type="button"
				class="btn btn-action variant-filled-primary w-full"
				onclick={async () =>
					await sm.openDrawerDataObj(
						'auth',
						'bottom',
						'h-[60%]',
						undefined,
						new TokenAppDataObjName({
							dataObjName: 'data_obj_auth_login',
							queryType: TokenApiQueryType.preset
						})
					)}
			>
				Log in
			</button>

			<button
				type="button"
				class="btn btn-action variant-filled-primary w-full"
				onclick={async () =>
					await sm.openDrawerDataObj(
						'auth',
						'bottom',
						'h-[60%]',
						undefined,
						new TokenAppDataObjName({
							dataObjName: 'data_obj_auth_signup',
							queryType: TokenApiQueryType.preset
						})
					)}
			>
				Sign up
			</button>

			{#if DEV_MODE}
				<button
					type="button"
					class="btn btn-action variant-filled-secondary w-full"
					onclick={expressLogin}
				>
					Dev Login
				</button>
			{/if}
		</div>
	</div>
</div> -->

<style>
	#full-screen {
		height: 100vh;
		overflow: hidden; /* Hide scrollbars */
		background-color: whitesmoke;
		background-image: url('$assets/moed2.jpg');
		background-size: cover;
	}

	.content {
		position: fixed;
		top: 85%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
	}
</style>
