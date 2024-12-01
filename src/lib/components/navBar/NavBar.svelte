<script lang="ts">
	import NavBarApps from '$comps/navBar/NavBarApps.svelte'
	import NavBarGroup from '$comps/navBar/NavBarGroup.svelte'
	import NavBarItem from '$comps/navBar/NavBarItem.svelte'
	import NavBarOrg from '$comps/navBar/NavBarOrg.svelte'
	import NavBarUser from '$comps/navBar/NavBarUser.svelte'
	import { NavBarData } from '$comps/navBar/types.navBar'
	import { tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'
	const FILENAME = '/$comps/navBar/NavBar.svelte'

	export let navBar: NavBarData

	const widthValue = tweened(navBar.width, {
		duration: 500,
		easing: cubicOut
	})
	$: $widthValue = navBar.width
</script>

<nav
	class="h-screen text-sm p-3 bg-stone-200 border-0 border-amber-400 flex flex-col {navBar.isOpen
		? ''
		: 'items-center '}"
	style="width: {$widthValue}px;"
>
	{#if navBar}
		{#each navBar.items as item}
			<ul>
				<div class="mb-6">
					{#if navBar.getItemClassName(item) === 'NavBarDataCompApps'}
						<NavBarApps data={item} />
					{:else if navBar.getItemClassName(item) === 'NavBarDataCompItem'}
						<NavBarItem {item} />
					{:else if navBar.getItemClassName(item) === 'NavBarDataCompGroup'}
						<NavBarGroup data={item} />
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
