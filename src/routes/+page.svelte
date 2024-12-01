<script lang="ts">
	import { getDrawerStore, getToastStore } from '@skeletonlabs/skeleton'
	import { goto } from '$app/navigation'
	import { userInit } from '$utils/types'
	import { State } from '$comps/app/types.appState'
	import { TokenApiDbDataObjSource, TokenApiQueryType } from '$utils/types.token'

	const FILENAME = 'routes/+page.svelte'

	export let data

	const storeDrawer = getDrawerStore()
	const storeToast = getToastStore()
	const DEV_MODE = data.environ === 'dev'
	const state = new State({ storeDrawer, storeToast })
	let pageCurrent = ''

	async function expressLogin() {
		const userSys = '0b3ba76c-c0f4-11ee-9b77-8f017aab6306'
		const userPhyllipHall = '129d4a42-c0f4-11ee-9b77-bf2d11e31679'
		await userInit(userSys)
		goto('/home')
	}
</script>

<div id="full-screen">
	<div class="content">
		<div class="flex-box">
			<button
				type="button"
				class="btn variant-filled-primary w-full mt-10"
				on:click={async () =>
					await state.openDrawerDataObj(
						'auth',
						'bottom',
						'h-[50%]',
						undefined,
						new TokenApiDbDataObjSource({ dataObjName: 'data_obj_auth_login' }),
						TokenApiQueryType.preset
					)}
			>
				Log in
			</button>

			{#if DEV_MODE}
				<button
					type="button"
					class="btn variant-filled-secondary w-full mt-2"
					on:click={expressLogin}
				>
					Express Login
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
