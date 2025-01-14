<script lang="ts">
	import { CodeActionType, ContextKey, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { AppLevelCrumb } from '$comps/app/types.app.svelte'
	import { State, StatePacket, StateTarget } from '$comps/app/types.appState.svelte'
	import { TokenAppDoActionConfirmType, TokenAppIndex } from '$utils/types.token'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/nav/NavCrumbs.svelte'

	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let crumbsList: AppLevelCrumb[] = $derived(sm.app.getCrumbsList())

	function onClick(index: number) {
		sm.change({
			confirmType: TokenAppDoActionConfirmType.statusChanged,
			packet: new StatePacket({
				actionType: CodeActionType.navCrumbs,
				token: new TokenAppIndex({
					index
				})
			}),
			target: StateTarget.feature
		})
	}
</script>

<nav class="flex rounded-md border border-gray-200 bg-white" aria-label="Breadcrumb">
	<ol
		role="list"
		class=" flex w-full max-w-(--breakpoint-xl) text-sm font-medium text-nav space-x-4 px-4 sm:px-6 lg:px-8"
	>
		{#each crumbsList as item, i}
			{@const label = item.label}
			{@const lastItem = crumbsList.length - 2}
			{#if i === 0}
				<li id="li-crumb-first" class="flex hover:text-nav-hover">
					<button onclick={() => onClick(i)} onkeyup={() => onClick(i)}>
						<svg
							class="size-5 shrink-0"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
							data-slot="icon"
						>
							<path
								fill-rule="evenodd"
								d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
								clip-rule="evenodd"
							/>
						</svg>
						<span class="sr-only">{label}</span>
					</button>
				</li>
			{:else if i === crumbsList.length - 1}
				<li id="li-crumb-last" class="flex">
					<svg
						class="h-full w-6 shrink-0 text-gray-200"
						viewBox="0 0 24 44"
						preserveAspectRatio="none"
						fill="currentColor"
						aria-hidden="true"
					>
						<path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
					</svg>
					<button class="ml-4 hover:text-nav-hover">
						{label}
					</button>
				</li>
			{:else}
				<li id="li-crumb-default" class="{i >= lastItem ? '' : 'hidden'} flex lg:flex">
					<svg
						class="h-full w-6 shrink-0 text-gray-200"
						viewBox="0 0 24 44"
						preserveAspectRatio="none"
						fill="currentColor"
						aria-hidden="true"
					>
						<path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
					</svg>
					<button
						class="ml-4 hover:text-nav-hover"
						onclick={() => onClick(i)}
						onkeyup={() => onClick(i)}
					>
						{label}
					</button>
				</li>
			{/if}
		{/each}
	</ol>
</nav>
