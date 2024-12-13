<script lang="ts">
	import { AppLevelCrumb } from '$comps/app/types.app'
	import {
		State,
		StatePacket,
		StatePacketAction,
		StateProps,
		StateTarget
	} from '$comps/app/types.appState.svelte'
	import { TokenAppDoActionConfirmType, TokenAppIndex } from '$utils/types.token'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/nav/NavCrumbs.svelte'

	let {
		stateProps = $bindable(),
		crumbsList
	}: { stateProps: StateProps; crumbsList: AppLevelCrumb[] } = $props()

	async function onClick(index: number) {
		stateProps.change({
			confirmType: TokenAppDoActionConfirmType.objectChanged,
			packet: new StatePacket({
				action: StatePacketAction.navCrumbs,
				token: new TokenAppIndex({
					index
				})
			}),
			target: StateTarget.feature
		})
	}
</script>

<nav class="flex border border-gray-200 bg-white" aria-label="Breadcrumb">
	<ol
		role="list"
		class="mx-auto flex w-full max-w-(--breakpoint-xl) space-x-4 px-4 sm:px-6 lg:px-8"
	>
		{#each crumbsList as item, i}
			{@const label = item.label}
			{#if i === 0}
				<li id="li-crumb-first" class="flex">
					<div class="flex items-center">
						<a
							href="#"
							class="text-nav hover:text-nav-hover"
							on:click={() => onClick(i)}
							on:keyup={() => onClick(i)}
						>
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
						</a>
					</div>
				</li>
			{:else if i === crumbsList.length - 1}
				<li id="li-crumb-last" class="flex">
					<div class="flex items-center">
						<svg
							class="h-full w-6 shrink-0 text-gray-200"
							viewBox="0 0 24 44"
							preserveAspectRatio="none"
							fill="currentColor"
							aria-hidden="true"
						>
							<path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
						</svg>
						<a
							href="#"
							class="ml-4 text-sm font-medium text-nav hover:text-nav-hover"
							aria-current="page"
							on:click={() => onClick(i)}
							on:keyup={() => onClick(i)}
						>
							{label}
						</a>
					</div>
				</li>
			{:else}
				<li id="li-crumb-default">
					<div class="flex items-center">
						<svg
							class="h-full w-6 shrink-0 text-gray-200"
							viewBox="0 0 24 44"
							preserveAspectRatio="none"
							fill="currentColor"
							aria-hidden="true"
						>
							<path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
						</svg>
						<a
							href="#"
							class="ml-4 text-sm font-medium text-nav hover:text-nav-hover"
							on:click={() => onClick(i)}
							on:keyup={() => onClick(i)}
						>
							{label}
						</a>
					</div>
				</li>
			{/if}
		{/each}
	</ol>
</nav>
