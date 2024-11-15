<script lang="ts">
	import { onMount } from 'svelte'
	import type { ResponseBody } from '$utils/types'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'

	let quote: any = {}

	onMount(() => {
		async function getQuote() {
			const responsePromise: Response = await fetch('/api/quote')
			const response: ResponseBody = await responsePromise.json()
			quote = response.data
		}
		getQuote()
	})
</script>

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
			<p class="text-center text-sm italic -mt-1">
				"{quote.quote}"
			</p>
		</div>
		<p id="author" class="text-lg font-semibold mt-3">
			{quote.author}
		</p>
	</div>
</div>
