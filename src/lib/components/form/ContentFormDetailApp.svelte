<script lang="ts">
	import type { DataObj, DataObjData } from '$utils/types'
	import type { State } from '$comps/app/types.appState'
	import FormDetail from '$comps/form/FormDetail.svelte'
	import { getContext } from 'svelte'

	export let state: State
	export let component: string
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	const scrollToTop: any = getContext('scrollToTop')
	let counter = 0

	// $: if (scrollToTop) scrollToTop()
</script>

{#if dataObj}
	<FormDetail bind:state {component} {dataObj} {dataObjData} on:formCancelled />
{/if}
