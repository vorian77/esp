<script lang="ts">
	import { State } from '$comps/app/types.state.svelte'
	import { Modal } from '@skeletonlabs/skeleton-svelte'
	import { ContextKey, DataManager, DataObj, type DataRecord, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { fade, scale } from 'svelte/transition'
	import {
		type FunctionModalReturn,
		TokenAppModalConfig,
		TokenAppModalConfigType,
		TokenAppModalReturn,
		TokenAppModalReturnType
	} from '$utils/types.token'
	import OverlayModalConfirm from '$comps/overlay/OverlayModalConfirm.svelte'
	import OverlayModalDate from '$comps/overlay/OverlayModalDate.svelte'
	import OverlayModalLayout from '$comps/overlay/OverlayModalLayout.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/overlay/OverlayModal.svelte'

	let { onClose, sm }: { onClose: FunctionModalReturn; sm: State } = $props()

	const componentsOverlay: Record<TokenAppModalConfigType, any> = {
		confirm: [OverlayModalConfirm, 'w-4/5 sm:w-[600px] '],
		date: [OverlayModalDate, ''],
		layout: [OverlayModalLayout, 'w-[90%] sm:w-[80%] lg:w-[70%] max-w-none']
	}
	let config = componentsOverlay[sm.overlayState.overlayModalConfig?.type]
	let Component = $derived(config[0])
	let componentClass = $derived(config[1])

	async function handleClose(modalReturn: TokenAppModalReturn) {
		await onClose?.(modalReturn)
	}

	async function handleKeydown(e) {
		if (e.key === 'Escape') {
			await handleClose(new TokenAppModalReturn({ type: TokenAppModalReturnType.cancel }))
		}
	}

	async function handleBackdropClick(e) {
		if (e.target === e.currentTarget) {
			await handleClose(new TokenAppModalReturn({ type: TokenAppModalReturnType.cancel }))
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if sm.overlayState.overlayModalOpen}
	<div
		transition:fade|global={{ duration: 150 }}
		class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20"
		on:click={handleBackdropClick}
	>
		{#if Component}
			<div class="bg-white rounded-lg shadow-xl {componentClass} mx-4 p-6" on:click|stopPropagation>
				<div class="flex-1 -mb-4">
					<Component {handleClose} sm={sm.overlayState} />
				</div>
			</div>
		{/if}
	</div>
{/if}
