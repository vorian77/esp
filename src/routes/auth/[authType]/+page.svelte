<script lang="ts">
	import srcLogo from '$assets/org_logo_sys.png'
	import { getDrawerStore, getToastStore } from '@skeletonlabs/skeleton'
	import { CodeAction, CodeActionClass, CodeActionType, ContextKey, Node } from '$utils/types'
	import { State, StateComponentLayout } from '$comps/app/types.appState.svelte'
	import { DataManager } from '$comps/dataObj/types.dataManager.svelte'
	import {
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
		navPage: '/auth',
		storeDrawer: getDrawerStore(),
		storeToast: getToastStore()
	})

	let promise = $state(retrieveForm())

	async function retrieveForm() {
		if (sm) {
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
				await sm.triggerAction(
					new TokenAppStateTriggerAction({
						codeAction: CodeAction.init(
							CodeActionClass.ct_sys_code_action_class_do,
							CodeActionType.doOpen
						),
						isNewApp: true,
						navLayout: StateComponentLayout.layoutContent,
						token: new TokenAppDoQuery({
							dataObjName: dataObj,
							queryType: TokenApiQueryType.preset
						})
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
				value: userSys
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
			<img class="h-16 mb-4" src={srcLogo} alt="The App Factory" />
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
