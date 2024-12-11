<script lang="ts">
	import { State } from '$comps/app/types.appState'
	import FormDetail from '$comps/form/FormDetail.svelte'
	import FormElInp from '$comps/form/FormElInp.svelte'
	import FormElTextarea from '$comps/form/FormElTextarea.svelte'

	import DataViewer from '$utils/DataViewer.svelte'

	export let state: State
</script>

<!-- <DataViewer header="dataObj" data={dataObj} /> -->

{#if state?.props?.dataObj}
	<FormDetail bind:state on:formCancelled />
{/if}
