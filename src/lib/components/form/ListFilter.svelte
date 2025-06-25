<script lang="ts">
	import DataViewer from '$utils/DataViewer.svelte'
	let { filter, fSetFilter, isHideFilter, rowCountFiltered, rowCountSelected }: DataRecord =
		$props()
</script>

{#if !isHideFilter}
	<div class="flex justify-between">
		<button
			class="btn btn-action variant-soft-primary mr-4 {filter === '' ? 'hidden' : ''}"
			onclick={() => {
				filter = ''
				fSetFilter('')
			}}
		>
			Reset
		</button>

		<input
			class="w-full text-sm border border-neutral-300 rounded-md p-4"
			type="text"
			id="search-text-"
			bind:value={filter}
			onkeyup={() => fSetFilter(filter)}
			placeholder="Search..."
		/>

		{#if !!rowCountFiltered || rowCountFiltered === 0}
			<span class="ml-4 text-sm text-nav">
				Rows: <span class="text-black">{rowCountFiltered}</span>
			</span>
		{/if}
		{#if rowCountSelected > -1}
			<span class="ml-0 text-sm text-nav">
				Selected: <span class="text-black">{rowCountSelected}</span>
			</span>
		{/if}
	</div>
{/if}
