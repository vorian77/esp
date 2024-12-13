<script lang="ts">
	import { StateProps } from '$comps/app/types.appState.svelte'
	import FormDetail from '$comps/form/FormDetail.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	let { stateProps = $bindable() }: StateProps = $props()
</script>

<!-- <DataViewer header="dataObj" data={dataObj} /> -->

<FormDetail bind:stateProps on:formCancelled />
