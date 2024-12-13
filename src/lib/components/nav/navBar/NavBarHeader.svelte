<script lang="ts">
	import { NavBarData } from '$comps/nav/navBar/types.navBar.svelte'
	import { fade } from 'svelte/transition'

	let { header, navBar }: { header: string; navBar: NavBarData } = $props()
</script>

{#if navBar.isOpen}
	<h2 class="mb-1 text-gray-500" in:fade={navBar.fadeIn} out:fade={navBar.fadeOut}>
		{header}
	</h2>
{/if}
