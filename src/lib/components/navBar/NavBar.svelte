<script lang="ts">
	import { fade } from 'svelte/transition'
	import NavBarListItem from '$comps/navBar/NavBarIListItem.svelte'
	import { NavBarListItemData } from '$comps/navBar/types.navBar'
	import type { stringify } from 'querystring'

	const eRoot = document.querySelector(':root')
	const setCssVar = (cssVar: string, value: string) => {
		eRoot.style.setProperty(`--${cssVar}`, value)
	}
	setCssVar('nav-width-open', '200px')
	setCssVar('nav-width-closed', '60px')

	const fadeIn = {
		delay: 300,
		duration: 200
	}
	const fadeOut = {
		delay: 0,
		duration: 200
	}
	let isOpen = false

	let items: NavBarListItemData[] = []
	items.push(new NavBarListItemData({ codeIcon: 'Settings', label: 'My Account' }))
	items.push(new NavBarListItemData({ codeIcon: 'Mail', label: 'Messages' }))
	items.push(new NavBarListItemData({ codeIcon: 'Activity', label: 'Activities' }))
	console.log('NavBar.items', items)
</script>

<nav class:expanded={isOpen}>
	<button on:click={() => (isOpen = !isOpen)}>
		{#if isOpen}
			Open
		{:else}
			Closed
		{/if}
	</button>
	<ul>
		{#each items as item}
			<NavBarListItem isExpanded={isOpen} data={item} />
		{/each}
	</ul>
	{#if isOpen}
		<section in:fade={fadeIn} out:fade={fadeOut}>
			<hr />
			<ul>
				<h3>Folders</h3>
				<li>🧾 Receipts</li>
				<li>🤖 Autofilter</li>
			</ul>
		</section>
	{/if}
</nav>

<style>
	:root {
		--nav-width-open: 200px;
		--nav-width-closed: 60px;
	}
	nav {
		grid-area: nav;
		height: 100vw;
		background-color: whitesmoke;
		color: #a2b7c4;
		transition: ease-out 300ms;
		/* width: 60px; */
		width: var(--nav-width-closed);
		overflow: hidden;
	}

	.expanded {
		transition: ease-out 200ms;
		/* width: 200px; */
		width: var(--nav-width-open);
	}

	ul {
		list-style: none;
		padding: 20px;
		margin: 0;
	}

	li {
		width: 200px;
	}

	h3 {
		text-transform: uppercase;
		margin: 0;
		padding: 10px 0px;
	}
	hr {
		color: white;
		width: 80%;
	}
</style>
