<script lang="ts">
	import { NavBarData } from '$comps/nav/navBar/types.navBar'
	import { fade } from 'svelte/transition'

	export let navBar: NavBarData
</script>

<div in:fade={navBar.fadeIn} out:fade={navBar.fadeOut}>
	<hr class="my-2" />
</div>
