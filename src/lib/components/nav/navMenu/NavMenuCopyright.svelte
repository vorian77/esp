<script lang="ts">
	import { NavMenuData } from '$comps/nav/navMenu/types.navMenu.svelte'
	import { fade } from 'svelte/transition'

	let { navMenu }: { navMenu: NavMenuData } = $props()

	let currentYear = new Date().getFullYear()
</script>

<p id="nav-copyright" class="text-center text-wrap text-nav text-xs text-thin">
	© {currentYear}
	{#if navMenu?.isOpen}
		<span in:fade={navMenu.fadeIn} out:fade={navMenu.fadeOut}>
			AppFactory. All rights reserved.
		</span>
	{/if}
</p>
