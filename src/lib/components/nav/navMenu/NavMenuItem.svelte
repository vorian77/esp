<script lang="ts">
	import {
		NavMenuData,
		NavMenuDataCompAppsItem,
		NavMenuDataCompItem,
		NavMenuContentType
	} from '$comps/nav/navMenu/types.navMenu.svelte'
	import { fade } from 'svelte/transition'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'

	let { item }: { item: NavMenuDataCompItem } = $props()

	let classIndent = ['', 'ml-[18px]', 'ml-[32px]'][item.indent]
</script>

{#if item}
	{@const menuOpen = item.navMenu.isOpen}
	{@const classIndent = ['', 'ml-[18px]', 'ml-[32px]'][item.indent]}
	{@const isApps = item instanceof NavMenuDataCompAppsItem}
	{@const isItem = item instanceof NavMenuDataCompItem}
	{@const isGroup = item.isGroup}
	{@const isOrg = item.isOrg}
	{@const isUser = item.isUser}
	{@const showItem = item.parent instanceof NavMenuDataCompItem ? item.parent.isOpen : true}
	{@const showIcon = item.isRoot && item.icon}
	{@const showToggle = item.isRoot && item.hasChildren}
	{@const classMB = showToggle ? 'mb-1' : 'mb-3'}
	{#if showItem}
		<li class="{classIndent} {classMB}  ">
			<button
				class="flex {item.navMenu.isOpen ? 'w-full' : 'content-center'} "
				onclick={item.click}
			>
				{#if showIcon}
					<div class="flex-none">
						<Icon
							props={new IconProps({
								clazz: 'mt-0',
								color: item.navMenu.iconColor,
								name: item.icon,
								size: 18,
								strokeWidth: 2
							})}
						/>
					</div>
				{/if}

				{#if menuOpen}
					<div
						class="grow text-left {showIcon ? 'ml-1' : ''} 
							{item.isHighlighted ? 'font-semibold' : ''} 
							hover:-translate-y-0.5 transition-transform"
					>
						<span in:fade={item.navMenu.fadeIn} out:fade={item.navMenu.fadeOut}>
							{item.label.text}
						</span>
					</div>
					{#if showToggle}
						<div class="flex-none {item.isOpen ? '' : 'rotate-180'} ">
							<Icon
								props={new IconProps({
									clazz: 'mt-0 ',
									color: item.navMenu.iconColor,
									name: 'ChevronUp',
									size: 18,
									strokeWidth: 2
								})}
							/>
						</div>
					{/if}
				{/if}
			</button>
		</li>
	{/if}
{/if}
