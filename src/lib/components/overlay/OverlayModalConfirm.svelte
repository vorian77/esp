<script lang="ts">
	import {
		TokenAppModalConfigConfirm,
		TokenAppModalReturn,
		TokenAppModalReturnType
	} from '$utils/types.token'
	import { required } from '$utils/types'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/overlay/OverlayModalConfirm.svelte'

	let { handleClose, sm }: { handleClose: Function; sm: State } = $props()
	let config: TokenAppModalConfigConfirm = required(sm.overlayModalConfig, FILENAME, 'config')

	async function handleCloseAction(type: TokenAppModalReturnType) {
		await handleClose(new TokenAppModalReturn({ type }))
	}
</script>

{#if config}
	<header class="flex justify-between">
		<h2 class="h2">{config.title}</h2>
	</header>
	<article>
		<p class="opacity-60 mt-3">
			{config.body}
		</p>
	</article>
	<footer class="flex justify-end gap-4 mt-6 mb-3">
		<button
			type="button"
			class="btn preset-tonal"
			onclick={async () => handleCloseAction(TokenAppModalReturnType.cancel)}
			>{config.buttonTextCancel}</button
		>
		<button
			type="button"
			class="btn preset-filled"
			onclick={async () => handleCloseAction(TokenAppModalReturnType.complete)}
			>{config.buttonTextConfirm}</button
		>
	</footer>
{/if}
