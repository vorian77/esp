<script lang="ts">
	import {
		NavBarData,
		NavBarDataCompAppsItem,
		NavBarDataCompItem,
		NavBarContentType
	} from '$comps/nav/navBar/types.navBar'
	import { fade } from 'svelte/transition'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'

	export let item: NavBarDataCompItem

	let classIndent = ['', 'ml-[18px]', 'ml-[32px]'][item.indent]
</script>

{#if item}
	{@const showItem = item.parent instanceof NavBarDataCompItem ? item.parent.isOpen : true}
	{@const showIcon = item.isRoot && item.icon}
	{@const showToggle = item.isRoot && item.hasChildren}
	{@const classMB = showToggle ? 'mb-1' : 'mb-3'}

	{#if showItem}
		<li class="{classIndent} {classMB}  hover:-translate-y-0.5 transition-transform">
			<a
				href="#"
				class="flex {item.navBar.isOpen ? 'w-full' : 'content-center'} "
				on:click={item.click()}
			>
				<div class="flex-none border-0 border-red-400">
					{#if showIcon}
						<Icon
							props={new IconProps({
								clazz: 'mt-0',
								color: item.navBar.iconColor,
								name: item.icon,
								size: 18,
								strokeWidth: 2
							})}
						/>
					{/if}
				</div>

				{#if item.navBar.isOpen && showItem}
					<div class="grow text-left {showIcon ? 'ml-1' : ''} border-0 border-cyan-400">
						<span in:fade={item.navBar.fadeIn} out:fade={item.navBar.fadeOut}>
							{item.label.text}
						</span>
					</div>
					<div class="flex-none w-8 border-0 border-blue-400">
						{#if showToggle}
							<div class={item.isOpen ? '' : 'rotate-180'}>
								<Icon
									props={new IconProps({
										clazz: 'mt-0 ',
										color: item.navBar.iconColor,
										name: 'ChevronUp',
										size: 18,
										strokeWidth: 2
									})}
								/>
							</div>
						{/if}
					</div>
				{/if}
			</a>
		</li>
	{/if}
{/if}
