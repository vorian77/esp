<script lang="ts">
	import { State, StateTriggerToken } from '$comps/app/types.appState.svelte'
	import { CodeAction, CodeActionClass, CodeActionType, ContextKey, required } from '$utils/types'
	import {
		NavDestinationType,
		TokenAppNav,
		TokenAppStateTriggerAction,
		TokenAppUserActionConfirmType
	} from '$utils/types.token'
	import { getContext } from 'svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'

	const FILENAME = '$routes/nav/NavAppMobile.svelte'
	const DEFAULT_APP_NAME = 'AppFactory'

	let { toggleMobileMenuHide }: { toggleMobileMenuHide: Function } = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')

	let appName = sm?.user?.system?.appName || DEFAULT_APP_NAME

	const goHome = async (): Promise<MethodResult> => {
		return await sm.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_nav,
					CodeActionType.navDestination
				),
				codeConfirmType: TokenAppUserActionConfirmType.statusChanged,
				data: {
					token: new TokenAppNav({ _codeDestinationType: NavDestinationType.home })
				}
			})
		)
	}
</script>

<nav class="h-12 flex items-center bg-neutral-50 p-3 gap-4 border-b">
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
