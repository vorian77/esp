<script lang="ts">
	import { AppLevelCrumb } from '$comps/app/types.app'
	import { State, StatePacket, StatePacketAction } from '$comps/app/types.appState'
	import { TokenAppCrumbs, TokenAppDoActionConfirmType } from '$utils/types.token'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/nav/NavCrumbs.svelte'

	export let state: State
	export let crumbsList: Array<AppLevelCrumb> = []

	async function onClick(crumbIdx: number) {
		state.update({
			packet: new StatePacket({
				action: StatePacketAction.navCrumbs,
				confirmType: TokenAppDoActionConfirmType.objectChanged,
				token: new TokenAppCrumbs({
					crumbIdx
				})
			})
		})
	}
</script>

<ol class="breadcrumb">
	{#each crumbsList as item, i}
		{@const label = item.label}
		{#if i < crumbsList.length - 1}
			<li class="crumb">
				<button
					class="anchor"
					role="link"
					tabindex="0"
					on:click={() => onClick(i)}
					on:keyup={() => onClick(i)}
				>
					{label}
				</button>
			</li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
		{:else}
			<li class="crumb">{label}</li>
		{/if}
	{/each}
</ol>
