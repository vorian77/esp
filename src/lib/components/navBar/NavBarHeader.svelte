<script lang="ts">
	import { NavBarData } from '$comps/navBar/types.navBar'
	import { fade } from 'svelte/transition'

	export let navBar: NavBarData
	export let header: string
</script>

{#if navBar.isOpen}
	<h2 class="mb-1 text-gray-500" in:fade={navBar.fadeIn} out:fade={navBar.fadeOut}>
		{header}
	</h2>
{/if}
