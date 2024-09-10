<script lang="ts">
	import { DataObj } from '$utils/types'

	export let dataObj: DataObj
	export let listSearchText: string
	export let setGridData: (listFilterText: string) => void
	export let isSelect: boolean
</script>

{#if !dataObj.raw.isListHideSearch}
	<div class="w-full flex mb-6 justify-between">
		<button
			class="btn variant-filled-primary mr-4 {listSearchText === '' ? 'hidden' : ''}"
			on:click={() => {
				listSearchText = ''
				setGridData('')
			}}
		>
			Reset
		</button>
		<input
			class="w-full"
			type="text"
			id="formSearch"
			bind:value={listSearchText}
			on:keyup={() => setGridData(listSearchText)}
			placeholder="Search..."
		/>
		{#if dataObj.dataRecordsDisplay}
			<span class="ml-4">Rows: {dataObj.dataRecordsDisplay.length}</span>
		{/if}
		{#if isSelect}
			<span class="ml-0"
				>Selected: {dataObj.dataRecordsDisplay.filter((r) => r.selected).length}
			</span>
		{/if}
	</div>
{/if}
