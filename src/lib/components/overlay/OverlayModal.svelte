<script lang="ts">
	import { Modal } from '@skeletonlabs/skeleton'
	import RootLayoutModal from '$comps/layout/RootLayoutModal.svelte'
</script>

<Modal
	components={{
		rootLayoutModal: { ref: RootLayoutModal }
	}}
/>
