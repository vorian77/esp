<script lang="ts">
	import srcLogo from '$assets/org_logo_sys.png'
	import { getDrawerStore, getToastStore } from '@skeletonlabs/skeleton'
	import {
		CodeAction,
		CodeActionClass,
		CodeActionType,
		ContextKey,
		Node,
		NodeObjComponent
	} from '$utils/types'
	import { State, StateNavLayout, StateParms } from '$comps/app/types.state.svelte'
	import { DataManager } from '$comps/dataObj/types.dataManager.svelte'
	import {
		TokenApiId,
		TokenApiQueryType,
		TokenAppDoQuery,
		TokenAppStateTriggerAction
	} from '$utils/types.token'
	import { setContext } from 'svelte'
	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'
	import { goto } from '$app/navigation'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = 'routes/+page.svelte'

	let { data }: { data: PageData } = $props()

	const IS_DEV_MODE = data.environ === 'dev'

	let sm: State = new State({
		isDevMode: IS_DEV_MODE,
		navPage: '/auth',
		storeDrawer: getDrawerStore(),
		storeToast: getToastStore()
	})

	let promise = $state(loadForm())

	async function loadForm() {
		const clazz = `loadForm`
		if (sm) {
			const authType = data.authType
			if (authType) {
				const nodeObjects = {
					login: 'node_obj_auth_login',
					signup: 'node_obj_auth_signup'
				}
				const nodeObjName = nodeObjects[authType]
				if (!nodeObjName) {
					error(404, {
						file: FILENAME,
						function: clazz,
						msg: `Invalid authType: ${authType}`
					})
				}

				return await sm.triggerAction(
					new TokenAppStateTriggerAction({
						codeAction: CodeAction.init(
							CodeActionClass.ct_sys_code_action_class_nav,
							CodeActionType.openNodeFreeApp
						),
						data: { token: new TokenApiId(nodeObjName) },
						stateParms: new StateParms({ navLayout: StateNavLayout.layoutContent })
					})
				)
			}
		}
	}

	async function expressLogin() {
		const userSys = '0b3ba76c-c0f4-11ee-9b77-8f017aab6306'
		const userPhyllipHall = '129d4a42-c0f4-11ee-9b77-bf2d11e31679'
		await sm.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_do_auth,
					CodeActionType.setUserId
				),
				data: { value: userSys }
			})
		)
	}
</script>

{#await promise catch error}
	<p>Could not retrieve auth form - error: {error.message}</p>
{/await}

<div class="h-screen flex flex-col items-center justify-center">
	<div
		class="w-full h-full sm:h-[70%] sm:w-[50%] md:w-[375px] bg-white border-2 rounded-lg shawdow-2xl p-4 flex flex-col items-center justify-center"
	>
		<button onclick={() => goto('/')}>
			<img class="h-16 mb-4" src={srcLogo} alt="AppFactory" />
		</button>

		{#if sm}
			<RootLayoutApp {sm} />
		{/if}

		{#if IS_DEV_MODE}
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
