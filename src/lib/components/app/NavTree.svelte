<script lang="ts">
	import { appStoreNavTree, NavTree, NodeNav } from '$utils/types'
	import type { State } from '$comps/app/types.appState'
	import { StatePacketAction, StatePacketComponent } from '$comps/app/types.appState'
	import { createEventDispatcher } from 'svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const dispatch = createEventDispatcher()

	const FILENAME = '/$comps/nav/NavTree.svelte'

	export let state: State
	let navTree: NavTree

	$: if ($appStoreNavTree) navTree = new NavTree($appStoreNavTree)

	$: if (state && state.packet) {
		let packet

		// navTreeReset
		packet = state.consume(StatePacketAction.navTreeReset)
		if (packet) {
			;(async () => {
				await changeNode(navTree.listTree[0])
			})()
		}

		// navTreeSetParent
		packet = state.consume(StatePacketAction.navTreeSetParent)
		;(async () => {
			await navTree.setCurrentParent()
		})()
	}

	async function changeNode(nodeNav: NodeNav) {
		await navTree.changeNode(nodeNav, state, dispatch)
	}
</script>

<div class="mx-2 mb-2">
	<div class="bg-slate-200 rounded-lg p-1 mb-1">Features:</div>
	<div>
		{#if navTree && navTree.listTree && navTree.listTree.length > 0}
			{#each navTree.listTree as nodeNav, i}
				{#if i > 0 && nodeNav.isOpen}
					<div
						class="p-1 mb-.5 hover:bg-blue-100 rounded-lg {nodeNav.isCurrent
							? 'bg-blue-300 text-white'
							: ''}"
						role="button"
						tabindex="0"
						on:click={async () => await changeNode(nodeNav)}
						on:keyup={async () => await changeNode(nodeNav)}
					>
						{@html '&nbsp;'.repeat(nodeNav.indent * 3)}
						{nodeNav.header}
					</div>
				{/if}
			{/each}
		{/if}
	</div>
</div>

<!-- <DataViewer header="navTree" data={navTree} /> -->
