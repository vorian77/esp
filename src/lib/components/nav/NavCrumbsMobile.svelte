<script lang="ts">
	import { CodeAction, CodeActionClass, CodeActionType, ContextKey, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { AppLevelCrumb } from '$comps/app/types.app.svelte'
	import { State, StateTriggerToken } from '$comps/app/types.state.svelte'
	import {
		TokenAppIndex,
		TokenAppNav,
		TokenAppStateTriggerAction,
		TokenAppUserActionConfirmType
	} from '$utils/types.token'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/nav/NavCrumbsMobile.svelte'

	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let crumbsList: AppLevelCrumb[] = $derived(sm.app.navCrumbsList())

	async function onClick(crumbList: AppLevelCrumb[], index: number): Promise<MethodResult> {
		return await sm.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_nav,
					CodeActionType.navDestination
				),
				codeConfirmType: TokenAppUserActionConfirmType.statusChanged,
				data: {
					token: new TokenAppNav({
						_codeDestinationType: NavDestinationType.back,
						backCount: crumbList.length - index - 1
					})
				}
			})
		)
	}
</script>

<div class="w-full flex items-center justify-between gap-4">
	<select
		aria-label="Select a crumb"
		class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-sm text-nav outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2"
		name="select-crumbs"
		id="select-crumbs"
		onchange={(event) => onClick(crumbsList, Number(event.currentTarget.value))}
	>
		{#each crumbsList as item, idx}
			{@const label = item.label}
			{@const lastItem = crumbsList.length - 1}
			<option value={idx} selected={idx === lastItem}>
				{label}
			</option>
		{/each}
	</select>
</div>
