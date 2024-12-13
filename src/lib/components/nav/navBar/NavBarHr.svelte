<script lang="ts">
	import { NavBarData } from '$comps/nav/navBar/types.navBar.svelte'
	import { fade } from 'svelte/transition'

	let { navBar }: { navBar: NavBarData } = $props()
</script>

<div in:fade={navBar.fadeIn} out:fade={navBar.fadeOut}>
	<hr class="my-2" />
</div>
