<script lang="ts">
	export let isHideFilter: boolean
	export let listFilterQuick: string
	export let rowCountFiltered: number
	export let rowCountSelected: number
	export let setFilterQuick: (listFilterQuick: string) => void
</script>

{#if !isHideFilter}
	<div class="w-full flex mb-4 justify-between">
		<button
			class="btn btn-action variant-soft-primary mr-4 {listFilterQuick === '' ? 'hidden' : ''}"
			onclick={() => {
				listFilterQuick = ''
				setFilterQuick('')
			}}
		>
			Reset
		</button>

		<input
			class="w-full text-sm border-neutral-300 rounded-md p-4"
			type="text"
			id="search-text-"
			bind:value={listFilterQuick}
			onkeyup={() => setFilterQuick(listFilterQuick)}
			placeholder="Search..."
		/>

		{#if !!rowCountFiltered}
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
