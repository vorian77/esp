<script lang="ts">
	import { apiFetch, ApiFunction } from '$routes/api/api'
	import { TokenApiFetchError, TokenApiFetchMethod } from '$utils/types.token'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import DataViewer from '$utils/DataViewer.svelte'
	import { error } from '@sveltejs/kit'

	const FILENAME = '$comps/nav/navDash/tso_sys_quote.svelte'

	let quote: any = $state()
	let promise = $derived(getQuote())

	async function getQuote() {
		return await apiFetch(
			'/api/quote',
			TokenApiFetchMethod.get,
			new TokenApiFetchError(FILENAME, 'getQuote', 'Error retrieving quote.')
		)
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
