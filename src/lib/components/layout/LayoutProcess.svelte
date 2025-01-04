<script lang="ts">
	import { type DataRecord } from '$utils/types'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'

	const FILENAME = '$comps/layout/LayoutProcess.svelte'

	let { parms }: DataRecord = $props()
</script>

<LayoutContent {parms} />
