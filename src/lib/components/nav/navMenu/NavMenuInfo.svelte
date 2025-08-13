<script lang="ts">
	import { NavMenuData, NavMenuInfo } from '$comps/nav/navMenu/types.navMenu.svelte'
	import { fade } from 'svelte/transition'

	let { info, navMenu }: { info: NavMenuInfo; navMenu: NavMenuData } = $props()
</script>

{#if navMenu.isOpen}
	<h4 class="" in:fade={navMenu.fadeIn} out:fade={navMenu.fadeOut}>
		<span class="mb-1 text-desc">
			{info.label}:
		</span>
		{info.value}
	</h4>
{/if}
