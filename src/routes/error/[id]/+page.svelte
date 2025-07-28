<script lang="ts">
	import { goto } from '$app/navigation'
	import { MethodResultError } from '$utils/types'
	import DataViewer from '$utils/DataViewer.svelte'

	let { data } = $props()
	let err = $derived(Object.hasOwn(data, 'id') ? new MethodResultError(data) : null)
</script>

<div class="p-4">
	<div
		class="p-8 flex flex-col items-center justify-center h-1/2 border-2 border-neutral-300 rounded-lg"
	>
		<span class="text-4xl font-bold mb-8">Oops, something went wrong!</span>

		{#if err}
			<p><span class="font-bold">Error Id:</span> {err.id}</p>
			<p><span class="font-bold">Error Code:</span> {err.code}</p>
			<p><span class="font-bold">Status Code:</span> {err.status}</p>
			<p><span class="font-bold">File:</span> {err.file}</p>
			<p><span class="font-bold">Function:</span> {err.function}</p>
			<p><span class="font-bold">Message:</span> {err.msgUser}</p>
		{:else}
			<h2>Unknown Error</h2>
		{/if}

		<p class="mt-4">
			We've logged the error and will correct it ASAP. If the problem persists, please contact your
			system administrator or email a screenshot of this page to help@AppFactory.cc.
		</p>

		{#if err && err._sessionId}
			<button
				type="button"
				class="btn btn-action variant-filled-secondary w-2/5 mt-10"
				onclick={() => goto('/home')}
			>
				Return To Dashboard
			</button>
			<button
				type="button"
				class="btn btn-action variant-filled-primary w-1/5 mt-3"
				onclick={() => goto('/')}
			>
				Logout
			</button>
		{:else}
			<button
				type="button"
				class="btn btn-action variant-filled-secondary w-2/5 mt-10"
				onclick={() => goto('/')}
			>
				Return
			</button>
		{/if}
	</div>
</div>
