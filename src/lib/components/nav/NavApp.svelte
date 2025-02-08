<script lang="ts">
	import { CodeAction, CodeActionClass, CodeActionType, ContextKey, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { State, StateTriggerToken } from '$comps/app/types.appState.svelte'
	import { TokenAppStateTriggerAction, TokenAppUserActionConfirmType } from '$utils/types.token'
	import { App, AppLevel, AppLevelCrumb, AppLevelRowStatus } from '$comps/app/types.app.svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import NavCrumbsMobile from '$comps/nav/NavCrumbsMobile.svelte'
	import NavCrumbsDesktop from '$comps/nav/NavCrumbsDesktop.svelte'
	import NavRow from '$comps/nav/NavRow.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/nav/NavApp.svelte'

	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')

	const back = async () => {
		await sm.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_nav,
					CodeActionType.navBack
				),
				codeConfirmType: TokenAppUserActionConfirmType.statusChanged
			})
		)
	}
</script>

{#if sm.app.treeLevelsIdxCurrent > -1}
	<div id="layout-app" class="flex justify-between items-center p-3 border-b gap-3">
		<div class="flex flex-grow items-center">
			<button class="mr-2 flex-none" onclick={back}>
				<Icon
					props={new IconProps({
						name: 'ArrowLeft',
						clazz: 'mt-1',
						isNav: true,
						size: 20,
						strokeWidth: 2
					})}
				/>
			</button>

			<div class="flex-grow md:hidden">
				<NavCrumbsMobile />
			</div>
			<div class="flex-none hidden md:inline">
				<NavCrumbsDesktop />
			</div>
		</div>
		<div class="flex-none">
			<NavRow />
		</div>
	</div>
{/if}
