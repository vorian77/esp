<script lang="ts">
	import { StateProps } from '$comps/app/types.appState.svelte'
	import FormDetail from '$comps/form/FormDetail.svelte'
	import { getContext } from 'svelte'

	const scrollToTop: any = getContext('scrollToTop')

	let { stateProps = $bindable() }: StateProps = $props()
</script>

<FormDetail bind:stateProps on:formCancelled />
