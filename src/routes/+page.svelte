<script lang="ts">
	import { getDrawerStore, getToastStore } from '@skeletonlabs/skeleton'
	import { ContextKey, userSetId } from '$utils/types'
	import { State, StateTarget } from '$comps/app/types.appState.svelte'
	import { DataManager } from '$comps/dataObj/types.dataManager.svelte'
	import { TokenApiQueryType, TokenAppDataObjName } from '$utils/types.token'
	import { setContext } from 'svelte'

	const FILENAME = 'routes/+page.svelte'

	let { data }: { data: PageData } = $props()

	const storeDrawer = getDrawerStore()
	const storeToast = getToastStore()
	const DEV_MODE = data.environ === 'dev'

	// page state
	// global state
	let dm: DataManager = $state(new DataManager())
	setContext(ContextKey.dataManager, dm)

	const stateApp = new State({
		dataManager: dm,
		storeDrawer,
		storeToast,
		target: StateTarget.feature
	})
	setContext(ContextKey.stateApp, stateApp)

	let pageCurrent = $state('')

	async function expressLogin() {
		const userSys = '0b3ba76c-c0f4-11ee-9b77-8f017aab6306'
		const userPhyllipHall = '129d4a42-c0f4-11ee-9b77-bf2d11e31679'
		await userSetId(userSys)
	}
</script>

<div id="full-screen">
	<div class="content">
		<div class="flex gap-4">
			<button
				type="button"
				class="btn btn-action variant-filled-primary w-full"
				onclick={async () =>
					await stateApp.openDrawerDataObj(
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
					await stateApp.openDrawerDataObj(
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
</div>

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
