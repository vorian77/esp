<script lang="ts">
	import type { DataObj, DataObjData } from '$utils/types'
	import type { State } from '$comps/app/types.appState'
	import FormDetail from '$comps/form/FormDetail.svelte'
	import FormElInp from '$comps/form/FormElInp.svelte'
	import FormElTextarea from '$comps/form/FormElTextarea.svelte'

	import DataViewer from '$utils/DataViewer.svelte'

	export let state: State
	export let component: string
	export let dataObj: DataObj
	export let dataObjData: DataObjData
</script>

<!-- <DataViewer header="dataObj" data={dataObj} /> -->

{#if dataObj}
	<FormDetail bind:state {component} {dataObj} {dataObjData} on:formCancelled />
{/if}
