<script lang="ts">
	import { NavBarDataCompAppsItem } from '$comps/navBar/types.navBar'
	import NavBarList from '$comps/navBar/NavBarList.svelte'
	import { NodeType } from '$utils/types'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import { fade } from 'svelte/transition'

	const FILENAME = '/$comps/app/NavBarItem.svelte'

	export let item: NavBarDataCompAppsItem
	export let isExpanded: boolean

	let fOnClick: Function
	let classActive = ''
	let classDropDown: string

	let iconSize = '22'
	let iconSizeChevron = '18'
	let iconStrokeWidth = '0.5'

	function onClickGoHome(el: HTMLElement) {
		alert('NavBarItem.onClick.goHome')
		// el.classList.toggle('active')
	}

	function onClickOpenNode(el: HTMLElement) {
		alert('NavBarItem.onClick.openNode')
		// el.classList.toggle('active')
	}
	function onClickToggleSubMenu(el: HTMLElement) {
		alert('NavBarItem.onClick.toggleSubMenu')
		// el.classList.toggle('active')
	}
	const fadeIn = {
		delay: 100,
		duration: 200
	}

	const fadeOut = {
		delay: 0,
		duration: 100
	}
</script>

<!-- <span in:fade={fadeIn} out:fade={fadeOut}> -->
<!-- class="flex justify-between items-center text-center text-left text-sm/6 text-gray-700 rounded-md hover:bg-gray-100 {indent} {item.isChild
		? 'font-normal'
		: 'font-medium'}" -->

<li>
	{#if isExpanded}
		{@const indent = item.isChild ? `ml-${item.isChild * 8}` : ''}
		<button type="button" class="w-full py-1" aria-controls="sub-menu-1" aria-expanded="false">
			<div class="">
				<div class="flex gap-x-2">
					{#if [NodeType.page, NodeType.program].includes(item.codeType)}
						<Icon
							props={new IconProps({
								name: item.codeIcon,
								size: iconSize,
								strokeWidth: iconStrokeWidth
							})}
						/>
					{/if}
					{item.label}
				</div>
				{#if item.items.length > 0}
					<Icon
						props={new IconProps({
							name: 'ChevronRight',
							size: iconSizeChevron,
							strokeWidth: iconStrokeWidth
						})}
					/>
				{/if}
			</div>
			{#if item.items.length > 0}
				{#each item.items as child}
					<!-- <svelte:self item={child} {isExpanded} /> -->
				{/each}
			{/if}
		</button>
	{/if}
</li>

<style>
	li {
		width: 200px;
	}
</style>
