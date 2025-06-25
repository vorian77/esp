<script lang="ts">
	import { apiFetch } from '$routes/api/api'
	import { TokenApiFetchMethod } from '$utils/types.token'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import { MethodResult } from '$utils/types'
	import DataViewer from '$utils/DataViewer.svelte'
	import { error } from '@sveltejs/kit'

	const FILENAME = '$comps/nav/navDash/tso_sys_quote.svelte'

	let { task }: { task: UserResourceTaskItem } = $props()
	let toggleReferesh = $derived(task.refreshToggle)

	let promise = $derived(getQuote())

	$effect(() => {
		if (toggleReferesh || !toggleReferesh) {
			promise = getQuote()
		}
	})

	async function getQuote() {
		const result: MethodResult = await apiFetch('/api/quote', {
			method: TokenApiFetchMethod.get
		})
		return result.error ? { color: '#1979a9', quote: 'Unable to retrieve quote.' } : result.data
	}
</script>

{#await promise}
	<p>Loading quote...</p>
{:then quote}
	<div class="bg-neutral-100 rounded-lg p-3 mb-3">
		<div class="flex flex-col items-center">
			<div>
				<Icon
					props={new IconProps({
						name: 'quote',
						color: quote.color,
						size: 32
					})}
				/>
			</div>

			<div>
				<p class="text-center text-base italic -mt-1">
					"{quote.quote}"
				</p>
			</div>
			<p id="author" class="text-lg font-medium mt-3">
				{quote.author}
			</p>
		</div>
	</div>
{:catch error}
	<p>Could not retrieve quote: {error.message}</p>
{/await}
