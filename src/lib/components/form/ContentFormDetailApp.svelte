<script lang="ts">
	import type { DataObj, DataObjData } from '$utils/types'
	import type { State } from '$comps/app/types.appState'
	import FormDetail from '$comps/form/FormDetail.svelte'
	import { getContext } from 'svelte'

	export let state: State

	const scrollToTop: any = getContext('scrollToTop')
	let counter = 0

	// $: if (scrollToTop) scrollToTop()
</script>

{#if state?.props?.dataObj}
	<FormDetail bind:state on:formCancelled />
{/if}
