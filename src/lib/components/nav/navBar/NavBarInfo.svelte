<script lang="ts">
	import { NavBarData, NavBarInfo } from '$comps/nav/navBar/types.navBar.svelte'
	import { fade } from 'svelte/transition'

	let { info, navBar }: { info: NavBarInfo; navBar: NavBarData } = $props()
</script>

{#if navBar.isOpen}
	<h4 class="" in:fade={navBar.fadeIn} out:fade={navBar.fadeOut}>
		<span class="mb-1 text-gray-500">
			{info.label}:
		</span>
		{info.value}
	</h4>
{/if}
