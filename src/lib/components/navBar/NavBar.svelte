<script lang="ts">
	import { User } from '$utils/types'
	import { fade } from 'svelte/transition'
	import {
		State,
		StateLayoutComponent,
		StatePacket,
		StatePacketAction
	} from '$comps/app/types.appState'
	import NavBarApps from '$comps/navBar/NavBarApps.svelte'
	import NavBarList from '$comps/navBar/NavBarList.svelte'
	import NavBarListItem from '$comps/navBar/NavBarListItem.svelte'
	import NavBarListGroup from '$comps/navBar/NavBarListGroup.svelte'
	import NavBarOrg from '$comps/navBar/NavBarOrg.svelte'
	import NavBarUser from '$comps/navBar/NavBarUser.svelte'
	import {
		NavBarData,
		NavBarDataCompList,
		NavBarDataCompListGroup,
		NavBarDataCompItem,
		NavBarDataCompOrg,
		NavBarDataCompUser
	} from '$comps/navBar/types.navBar'

	export let state: State

	const toggleOpen = () => {
		navBar.isOpen = !navBar.isOpen
		updateNav()
	}
	const updateNav = () => {
		navBar = navBar
	}

	let navBar = new NavBarData({ toggleOpen, updateNav, state })

	// const eRoot = document.querySelector(':root')
	// const setCssVar = (cssVar: string, value: string) => {
	// 	eRoot.style.setProperty(`--${cssVar}`, value)
	// }
	// setCssVar('nav-width-open', '200px')
	// setCssVar('nav-width-closed', '60px')
</script>

<nav class="text-sm p-3 border-0 flex flex-col {navBar.isOpen ? 'open ' : 'items-center '}">
	{#if navBar}
		{#each navBar.items as item}
			<ul>
				<div class="mb-7">
					{#if navBar.getItemClassName(item) === 'NavBarDataCompApps'}
						<NavBarApps data={item} />
					{:else if navBar.getItemClassName(item) === 'NavBarDataCompItem'}
						<NavBarListItem {item} />
					{:else if navBar.getItemClassName(item) === 'NavBarDataCompList'}
						<NavBarList data={item} />
					{:else if navBar.getItemClassName(item) === 'NavBarDataCompListGroup'}
						<NavBarListGroup data={item} />
					{:else if navBar.getItemClassName(item) === 'NavBarDataCompOrg'}
						<NavBarOrg data={item} />
					{:else if navBar.getItemClassName(item) === 'NavBarDataCompUser'}
						<NavBarUser data={item} />
					{/if}
				</div>
			</ul>
		{/each}
	{/if}
</nav>

<style>
	:root {
		--nav-width-open: 250px;
		--nav-width-closed: 70px;
	}
	nav {
		/* grid-area: nav; */
		height: 100vw;
		background-color: gainsboro;
		color: black;
		transition: ease-out 300ms;
		width: var(--nav-width-closed);
		overflow: hidden;
	}

	.open {
		transition: ease-out 200ms;
		width: var(--nav-width-open);
	}
</style>
