<script lang="ts">
	import srcLogo from '$assets/org_logo_sys.png'
	import { getDrawerStore, getToastStore } from '@skeletonlabs/skeleton'
	import {
		CodeAction,
		CodeActionClass,
		CodeActionType,
		ContextKey,
		Node,
		userSetId
	} from '$utils/types'
	import { State } from '$comps/app/types.appState.svelte'
	import { DataManager } from '$comps/dataObj/types.dataManager.svelte'
	import {
		TokenApiQueryType,
		TokenAppDataObjName,
		TokenAppStateTriggerAction
	} from '$utils/types.token'
	import { setContext } from 'svelte'
	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'
	import { goto } from '$app/navigation'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = 'routes/+page.svelte'

	let { data }: { data: PageData } = $props()

	const storeDrawer = getDrawerStore()
	const storeToast = getToastStore()
	const IS_DEV_MODE = data.environ === 'dev'

	let sm: State = $derived.by(() => {
		return new State({
			page: '/auth',
			storeDrawer,
			storeToast
		})
		return undefined
	})

	$effect(() => {
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
				sm.triggerAction(
					new TokenAppStateTriggerAction({
						codeAction: CodeAction.init(
							CodeActionClass.ct_sys_code_action_class_do,
							CodeActionType.doOpen
						),
						token: new TokenAppDataObjName({
							dataObjName: dataObj,
							queryType: TokenApiQueryType.preset
						})
					})
				)
			}
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
