<script lang="ts">
	import { State, StateTriggerToken } from '$comps/app/types.appState.svelte'
	import { CodeAction, CodeActionClass, CodeActionType, ContextKey, required } from '$utils/types'
	import { TokenAppStateTriggerAction, TokenAppUserActionConfirmType } from '$utils/types.token'
	import { getContext } from 'svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'

	const FILENAME = '$routes/nav/NavAppMobile.svelte'
	const DEFAULT_APP_NAME = 'The App Factory'

	let { toggleMobileMenuHide }: { toggleMobileMenuHide: Function } = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')

	let appName = sm?.user?.org?.appName || DEFAULT_APP_NAME

	const goHome = async () => {
		await sm.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_nav,
					CodeActionType.navHome
				),
				codeConfirmType: TokenAppUserActionConfirmType.statusChanged
			})
		)
	}
</script>

<nav class="h-12 flex items-center bg-white p-3 gap-4 border-b">
	<Icon
		props={new IconProps({
			isNav: true,
			name: 'menu',
			onclick: toggleMobileMenuHide,
			size: 20,
			strokeWidth: 2
		})}
	/>

	<p class="text-black" onclick={goHome}>
		{appName}
	</p>
</nav>
