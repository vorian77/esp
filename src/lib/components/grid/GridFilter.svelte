<script lang="ts">
	export let isHideFilter: boolean
	export let listFilterQuick: string
	export let rowCountFiltered: number
	export let rowCountSelected: number
	export let setFilterQuick: (listFilterQuick: string) => void
</script>

{#if !isHideFilter}
	<div class="w-full flex mb-6 justify-between">
		<button
			class="btn variant-filled-primary mr-4 {listFilterQuick === '' ? 'hidden' : ''}"
			on:click={() => {
				listFilterQuick = ''
				setFilterQuick('')
			}}
		>
			Reset
		</button>
		<input
			class="w-full text-sm"
			type="text"
			id="search-text-"
			bind:value={listFilterQuick}
			on:keyup={() => setFilterQuick(listFilterQuick)}
			placeholder="Search..."
		/>
		{#if !!rowCountFiltered}
			<span class="ml-4 text-sm">Rows: {rowCountFiltered}</span>
		{/if}
		{#if rowCountSelected > -1}
			<span class="ml-0 text-sm">Selected: {rowCountSelected}</span>
		{/if}
	</div>
{/if}
