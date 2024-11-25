<script lang="ts">
	import {
		NavBarData,
		NavBarDataCompAppsItem,
		NavBarDataCompItem,
		NavBarDataCompItemType
	} from '$comps/navBar/types.navBar'
	import { fade } from 'svelte/transition'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'

	export let item: NavBarDataCompItem

	let classIndent = ['', 'ml-[21px]', 'ml-[42px]'][item.indent]

	const activateClick = async (item: NavBarDataCompItem) => {
		await item.navBar.activateLink(item)
	}

	const getHeaderParent = (item: NavBarDataCompItem) => {
		return item.navBar.getAncestor(item, NavBarDataCompAppsItem)
	}
</script>

{#if item}
	<li>
		<button
			class="flex {item.navBar.isOpen ? 'w-full' : 'content-center'} "
			on:click={activateClick(item)}
		>
			<div class="flex-none w-6 border-0 border-red-400">
				{#if item.icon}
					<Icon
						props={new IconProps({
							clazz: 'mt-0.5',
							color: item.navBar.iconColor,
							name: item.icon,
							size: 16,
							strokeWidth: 2
						})}
					/>
				{/if}
			</div>
			{#if item.navBar.isOpen}
				<div class="grow text-left border-0 border-green-400">
					<span in:fade={item.navBar.fadeIn} out:fade={item.navBar.fadeOut}>
						{item.label.text}
					</span>
				</div>
				<div class="flex-none w-8 border-0 border-blue-400">
					{#if item.icon && item.codeType === NavBarDataCompItemType.appHeader && item.navBar.isOpen}
						{@const appItem = getHeaderParent(item)}
						{#if appItem}
							<div class={appItem.isOpen ? '' : 'rotate-180'}>
								<Icon
									props={new IconProps({
										clazz: 'mt-0.5 ',
										color: item.navBar.iconColor,
										name: 'ChevronUp',
										size: 18,
										strokeWidth: 2
									})}
								/>
							</div>
						{/if}
					{/if}
				</div>
			{/if}
		</button>
	</li>
{/if}
