<script lang="ts">
	import type { State } from '$comps/app/types.appState'
	import type { DataObj, DataObjData } from '$utils/types'
	import FormList from '$comps/form/FormList.svelte'
	import { getContext } from 'svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	export let state: State
	export let component: string
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	const scrollToTop: any = getContext('scrollToTop')

	// $: if (scrollToTop) scrollToTop()
</script>

<!-- <DataViewer header="state" data={state} /> -->

<FormList bind:state {component} {dataObj} {dataObjData} on:formCancelled on:rowClick />
