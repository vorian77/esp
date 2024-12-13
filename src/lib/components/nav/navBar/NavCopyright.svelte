<script lang="ts">
	import { NavBarData } from '$comps/nav/navBar/types.navBar.svelte'
	import { fade } from 'svelte/transition'

	let { navBar }: { navBar: NavBarData } = $props()

	let currentYear = new Date().getFullYear()
</script>

<p id="nav-copyright" class="text-center text-wrap text-nav text-xs text-thin">
	© {currentYear}
	{#if navBar?.isOpen}
		<span in:fade={navBar.fadeIn} out:fade={navBar.fadeOut}>
			The App Factory. All rights reserved.
		</span>
	{/if}
</p>
