<script lang="ts">
	import { State } from '$comps/app/types.appState'
	import { DataObj, DataObjData } from '$utils/types'

	export let state: State
</script>

<h1>Layout Select Multiple!</h1>
<slot />

<!-- <div class="w-full flex mb-6 justify-between">
	<button
		class="btn variant-filled-secondary"
		on:click={() => {
			alert('Test Component...')
		}}
	>
		Test Component
	</button>
</div> -->
