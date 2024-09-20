<script lang="ts">
	export let isListHideFilter: boolean
	export let listFilterText: string
	export let rowCountFiltered: number
	export let rowCountSelected: number
	export let setFilter: (listFilterText: string) => void
</script>

{#if !isListHideFilter}
	<div class="w-full flex mb-6 justify-between">
		<button
			class="btn variant-filled-primary mr-4 {listFilterText === '' ? 'hidden' : ''}"
			on:click={() => {
				listFilterText = ''
				setFilter('')
			}}
		>
			Reset
		</button>
		<input
			class="w-full"
			type="text"
			id="search-text-"
			bind:value={listFilterText}
			on:keyup={() => setFilter(listFilterText)}
			placeholder="Search..."
		/>
		{#if !!rowCountFiltered}
			<span class="ml-4">Rows: {rowCountFiltered}</span>
		{/if}
		{#if rowCountSelected > -1}
			<span class="ml-0">Selected: {rowCountSelected}</span>
		{/if}
	</div>
{/if}
