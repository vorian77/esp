<script lang="ts">
	import NavMenuApps from '$comps/nav/navMenu/NavMenuApps.svelte'
	import NavMenuCopyright from '$comps/nav/navMenu/NavMenuCopyright.svelte'
	import NavMenuGroup from '$comps/nav/navMenu/NavMenuGroup.svelte'
	import NavMenuItem from '$comps/nav/navMenu/NavMenuItem.svelte'
	import NavMenuOrg from '$comps/nav/navMenu/NavMenuOrg.svelte'
	import NavMenuUser from '$comps/nav/navMenu/NavMenuUser.svelte'
	import { NavMenuData } from '$comps/nav/navMenu/types.navMenu.svelte'
	import DataViewer from '$utils/DataViewer.svelte'
	import { error } from '@sveltejs/kit'

	const FILENAME = '/$comps/nav/navMenu/NavMenu.svelte'

	let { navMenuData, widthValue } = $props()
</script>

{#if widthValue}
	<div class="h-full overflow-y-auto overflow-x-hidden">
		<nav
			class="h-full flex flex-col justify-between text-sm p-3 bg-neutral-50 border-r"
			style="width: {widthValue.current}px;"
		>
			<div>
				{#if navMenuData}
					{#each navMenuData?.items as item}
						<ul>
							<div class="mb-6 flex flex-col {navMenuData?.isOpen ? '' : 'items-center '}">
								{#if navMenuData.getItemClassName(item) === 'NavMenuDataCompApps'}
									<NavMenuApps data={item} />
								{:else if navMenuData.getItemClassName(item) === 'NavMenuDataCompItem'}
									<NavMenuItem {item} />
								{:else if navMenuData.getItemClassName(item) === 'NavMenuDataCompGroup'}
									<NavMenuGroup data={item} />
								{:else if navMenuData.getItemClassName(item) === 'NavMenuDataCompOrg'}
									<NavMenuOrg data={item} />
								{:else if navMenuData.getItemClassName(item) === 'NavMenuDataCompUser'}
									<NavMenuUser data={item} />
								{/if}
							</div>
						</ul>
					{/each}
				{:else}
					No menu data available.
				{/if}
			</div>
			<NavMenuCopyright navMenu={navMenuData} />
		</nav>
	</div>
{/if}
