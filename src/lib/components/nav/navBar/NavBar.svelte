<script lang="ts">
	import NavBarApps from '$comps/nav/navBar/NavBarApps.svelte'
	import NavBarGroup from '$comps/nav/navBar/NavBarGroup.svelte'
	import NavBarItem from '$comps/nav/navBar/NavBarItem.svelte'
	import NavBarOrg from '$comps/nav/navBar/NavBarOrg.svelte'
	import NavBarUser from '$comps/nav/navBar/NavBarUser.svelte'
	import NavCopyright from '$comps/nav/navBar/NavCopyright.svelte'
	import { NavBarData } from '$comps/nav/navBar/types.navBar.svelte'
	import { Tween } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'

	const FILENAME = '/$comps/nav/navBar/NavBar.svelte'

	let { navBar }: { navBar: NavBarData } = $props()

	let widthValue = new Tween(0, {
		duration: 500,
		easing: cubicOut
	})

	$effect(() => {
		widthValue.target = navBar?.width ? navBar.width : 0
	})
</script>

<nav
	class="h-full flex flex-col justify-between text-sm p-3 bg-neutral-50 border-r"
	style="width: {widthValue.current}px;"
>
	<div>
		{#if navBar}
			{#each navBar?.items as item}
				<ul>
					<div class="mb-6 flex flex-col {navBar?.isOpen ? '' : 'items-center '}">
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
	</div>

	<NavCopyright {navBar} />
</nav>
