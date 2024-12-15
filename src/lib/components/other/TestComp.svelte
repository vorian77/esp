<script lang="ts">
	import { getContext } from 'svelte'
	import { ContextKey } from '$utils/utils.sys.svelte'
	import { State } from '$comps/app/types.appState.svelte'
	import { User } from '$utils/types.user'
	import DataViewer from '$utils/DataViewer.svelte'

	const stateApp: State = getContext(ContextKey.stateApp)
	const testState = getContext(ContextKey.test)

	testState.increment()
</script>

<h1>My Test Component</h1>
{#if stateApp}
	<p>Hello, {stateApp?.user?.fullName}!!!</p>
{/if}

<DataViewer header="testState" data={testState.value} />
<DataViewer header="testState" data={testState.data.value} />

<button onclick={testState.data.increment}>Test</button>
