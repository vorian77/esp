<script lang="ts">
	export let isListHideFilter: boolean
	export let isSelect: boolean
	export let listFilterText: string
	export let rowCountFiltered: number
	export let rowData: any[]
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
		{#if rowData}
			<span class="ml-4">Rows: {rowCountFiltered}</span>
		{/if}
		{#if isSelect}
			<span class="ml-0">Selected: {rowData.filter((r) => r.selected).length}</span>
		{/if}
	</div>
{/if}
