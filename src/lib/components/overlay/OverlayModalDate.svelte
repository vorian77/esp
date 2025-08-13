<script lang="ts">
	import { State } from '$comps/app/types.state.svelte'
	import Calendar from '$comps/calendar/Calendar.svelte'
	import {
		TokenAppModalConfigDate,
		TokenAppModalReturn,
		TokenAppModalReturnType
	} from '$utils/types.token'
	import { ParmsValuesType, required } from '$utils/types'
	import { getLocalTimeZone, parseDate, today } from '@internationalized/date'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/overlay/OverlayModalConfirm.svelte'

	let { handleClose, sm }: { handleClose: Function; sm: State } = $props()
	let config: TokenAppModalConfigDate = required(sm.overlayModalConfig, FILENAME, 'config')

	let selectedDate = $state(config.date ? parseDate(config.date) : today(getLocalTimeZone()))

	async function handleCloseCancel() {
		await handleClose(new TokenAppModalReturn({ type: TokenAppModalReturnType.cancel }))
	}

	async function handleCloseComplete() {
		sm.parmsState.valueSet(
			ParmsValuesType.modalDate,
			selectedDate ? selectedDate.toString() : config.date
		)
		handleClose(
			new TokenAppModalReturn({
				parmsState: sm.parmsState,
				type: TokenAppModalReturnType.complete
			})
		)
	}
</script>

{#if config}
	<header class="flex justify-between">
		<h2 class="h2">Select Date</h2>
	</header>
	<Calendar bind:value={selectedDate} />

	<footer class="flex justify-end gap-4 mt-6 mb-2">
		<button type="button" class="btn preset-tonal" onclick={async () => handleCloseCancel()}
			>Cancel</button
		>
		<button type="button" class="btn preset-filled" onclick={async () => handleCloseComplete()}
			>Done</button
		>
	</footer>
{/if}
