<script lang="ts">
	import { NavBarData, NavBarInfo } from '$comps/nav/navBar/types.navBar'
	import { fade } from 'svelte/transition'

	export let navBar: NavBarData
	export let info: NavBarInfo
</script>

{#if navBar.isOpen}
	<h4 class="" in:fade={navBar.fadeIn} out:fade={navBar.fadeOut}>
		<span class="mb-1 text-gray-500">
			{info.label}:
		</span>
		{info.value}
	</h4>
{/if}
