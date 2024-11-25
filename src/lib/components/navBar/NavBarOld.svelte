<script lang="ts">
	import NavBarList from '$comps/navBar/NavBarList.svelte'
	import { NavBarData, NavBarDataCompAppsItem } from '$comps/navBar/types.navBar'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import { NodeType, User } from '$utils/types'
	import { fade } from 'svelte/transition'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/app/navBar/NavBar.svelte'

	export let user: User | undefined

	let navBarData: NavBarData
	let iconSize = '22'
	let iconSizeChevron = '20'
	let iconStrokeWidth = '1'
	let isExpanded = true
	const navColor = '#3b79e1'

	$: {
		navBarData = new NavBarData()
		navBarData.addPage('home', 'Home', 'house', true)
		navBarData.addApps(user?.resources_sys_app)
		navBarData.addPage('settings', 'Settings', 'settings', false)
	}

	function onClickToggleExpand() {
		isExpanded = !isExpanded
		console.log('NavBar.onClickToggleWidth', isExpanded)
	}

	const fadeIn = {
		delay: 100,
		duration: 200
	}
	const fadeOut = {
		delay: 0,
		duration: 100
	}

	// <div class="flex justify-between items-center px-2 border-2">
</script>

<div class="sideBar" class:expanded={!isExpanded}>
	<div class="grid grid-cols-7 my-2 px-2 border-2">
		<div class="col-span-2 border-2 border-red-200">
			<div class="logo w-14">
				{#await import(`$lib/assets/org_logo_ai.png`) then { default: src }}
					<img {src} alt="Image" />
				{/await}
			</div>
		</div>
		<div class="col-span-4 content-center ml-1 border-2 border-amber-400 text-xs text-gray-700">
			<span in:fade={fadeIn} out:fade={fadeOut}> MOED Self-Service Registration App </span>
		</div>
		<div class="justify-self-end content-center border-2 border-blue-300">
			<Icon
				props={new IconProps({
					name: 'ChevronsLeft',
					color: navColor,
					onClick: onClickToggleExpand,
					size: iconSizeChevron,
					strokeWidth: iconStrokeWidth
				})}
			/>
		</div>
	</div>

	{#if navBarData}
		<nav>
			<NavBarList items={navBarData.items} {isExpanded} />
		</nav>
	{/if}
</div>

<style>
	.sideBar {
		background-color: linen;
		transition: ease-out 300ms;
		width: 250px;
		overflow: hidden;
	}

	.expanded {
		transition: ease-out 300ms;
		width: 60px;
	}

	.expanded .logo {
		transition: ease-out 300ms;
		width: 120px;
	}

	hr {
		color: white;
		width: 80%;
	}
</style>
