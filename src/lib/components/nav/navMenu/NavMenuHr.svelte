<script lang="ts">
	import { NavMenuData } from '$comps/nav/navMenu/types.navMenu.svelte'
	import { fade } from 'svelte/transition'

	let { navMenu }: { navMenu: NavMenuData } = $props()
</script>

<div in:fade={navMenu.fadeIn} out:fade={navMenu.fadeOut}>
	<hr class="my-2" />
</div>
