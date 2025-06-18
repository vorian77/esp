<script lang="ts">
	import NavMenuApps from '$comps/nav/navMenu/NavMenuApps.svelte'
	import NavMenuCopyright from '$comps/nav/navMenu/NavMenuCopyright.svelte'
	import NavMenuGroup from '$comps/nav/navMenu/NavMenuGroup.svelte'
	import NavMenuItem from '$comps/nav/navMenu/NavMenuItem.svelte'
	import NavMenuOrg from '$comps/nav/navMenu/NavMenuOrg.svelte'
	import NavMenuUser from '$comps/nav/navMenu/NavMenuUser.svelte'
	import { NavMenuData } from '$comps/nav/navMenu/types.navMenu.svelte'
	import { Tween } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'
	import { error } from '@sveltejs/kit'

	const FILENAME = '/$comps/nav/navMenu/NavMenu.svelte'

	let { navMenu }: { navMenu: NavMenuData } = $props()

	let widthValue = new Tween(0, {
		duration: 500,
		easing: cubicOut
	})

	$effect(() => {
		widthValue.target = navMenu?.width ? navMenu.width : 0
	})
</script>

<nav
	class="h-full flex flex-col justify-between text-sm p-3 bg-neutral-50 border-r"
	style="width: {widthValue.current}px;"
>
	<div>
		{#if navMenu}
			{#each navMenu?.items as item}
				<ul>
					<div class="mb-6 flex flex-col {navMenu?.isOpen ? '' : 'items-center '}">
						{#if navMenu.getItemClassName(item) === 'NavMenuDataCompApps'}
							<NavMenuApps data={item} />
						{:else if navMenu.getItemClassName(item) === 'NavMenuDataCompItem'}
							<NavMenuItem {item} />
						{:else if navMenu.getItemClassName(item) === 'NavMenuDataCompGroup'}
							<NavMenuGroup data={item} />
						{:else if navMenu.getItemClassName(item) === 'NavMenuDataCompOrg'}
							<NavMenuOrg data={item} />
						{:else if navMenu.getItemClassName(item) === 'NavMenuDataCompUser'}
							<NavMenuUser data={item} />
						{/if}
					</div>
				</ul>
			{/each}
		{/if}
	</div>

	<NavMenuCopyright {navMenu} />
</nav>
