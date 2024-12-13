<script lang="ts">
	import { StateProps } from '$comps/app/types.appState.svelte'
	import FormList from '$comps/form/FormList.svelte'
	import { getContext } from 'svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	let { stateProps = $bindable() }: StateProps = $props()

	const scrollToTop: any = getContext('scrollToTop')

	// $: if (scrollToTop) scrollToTop()
</script>

<!-- <DataViewer header="state" data={state} /> -->

<FormList bind:stateProps on:formCancelled on:rowClick />
