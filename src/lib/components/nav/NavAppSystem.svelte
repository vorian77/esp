<script lang="ts">
	import {
		State,
		StateNavLayout,
		StateParms,
		StateTriggerToken
	} from '$comps/app/types.state.svelte'
	import { CodeAction, CodeActionClass, CodeActionType, ContextKey, required } from '$utils/types'
	import {
		NavDestinationType,
		TokenApiId,
		TokenApiQueryType,
		TokenAppNav,
		TokenAppStateTriggerAction,
		TokenAppUserActionConfirmType
	} from '$utils/types.token'
	import { getContext } from 'svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import logoLocal from '$assets/org_logo_sys.png'
	import { error } from '@sveltejs/kit'

	const FILENAME = '$routes/nav/NavAppSystem.svelte'
	const iconSize = 26

	let { toggleMobileMenuHide }: { toggleMobileMenuHide: Function } = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')

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

	const openSuggestion = async (): Promise<MethodResult> => {
		return await sm.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_nav,
					CodeActionType.openNodeFreeModal
				),
				codeConfirmType: TokenAppUserActionConfirmType.statusChanged,
				data: {
					token: new TokenApiId(
						'node_obj_app_crm_suggestion_detail_modal',
						TokenApiQueryType.preset
					)
				},
				stateParms: new StateParms({ navLayout: StateNavLayout.layoutApp })
			})
		)
	}
</script>

<nav class="h-12 flex items-center bg-neutral-200 p-3 border-square">
	<div class="flex w-full items-center">
		<!-- Left 3/4: logo + title -->
		<div class="w-3/4 flex items-center gap-4">
			<img
				src={logoLocal}
				alt="Organization logo"
				class="h-8 cursor-pointer"
				onclick={(e) => {
					e.stopPropagation()
					goHome()
				}}
			/>
		</div>

		<!-- Right 1/4: three icons -->
		<div class="w-1/4 flex items-center justify-end gap-8">
			<Icon
				props={new IconProps({
					name: 'bot',
					color: 'black',
					onclick: () => alert('Coming Soon: Phyllis AI Assistant!'),
					size: iconSize,
					tooltip: 'Assistant'
				})}
			/>
			<Icon
				props={new IconProps({
					name: 'messagesquaretext',
					color: 'black',
					onclick: () => alert('Coming Soon: Record Chat!'),
					size: iconSize,
					tooltip: 'Record Chat'
				})}
			/>
			<Icon
				props={new IconProps({
					name: 'inbox',
					color: 'black',
					onclick: () => openSuggestion(),
					size: iconSize,
					tooltip: 'Suggestion'
				})}
			/>
			<Icon
				props={new IconProps({
					name: 'clipboardpen',
					color: 'black',
					onclick: () => alert('Coming Soon: Complete A Satisfaction Survey!'),
					size: iconSize,
					tooltip: 'Survey'
				})}
			/>
		</div>
	</div>
</nav>
