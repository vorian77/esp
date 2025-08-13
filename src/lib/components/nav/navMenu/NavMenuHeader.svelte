<script lang="ts">
	import { NavMenuData } from '$comps/nav/navMenu/types.navMenu.svelte'
	import { fade } from 'svelte/transition'

	let { header, navMenu }: { header: string; navMenu: NavMenuData } = $props()
</script>

{#if navMenu.isOpen}
	<h2 class="mb-1 text-desc" in:fade={navMenu.fadeIn} out:fade={navMenu.fadeOut}>
		{header}
	</h2>
{/if}
