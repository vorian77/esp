<script lang="ts">
	import { NavBarDataCompOrg } from '$comps/navBar/types.navBar'
	import { User } from '$utils/types'
	import { Avatar } from '@skeletonlabs/skeleton'
	import { fade } from 'svelte/transition'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/app/navBar/NavBarOrg.svelte'

	export let data: NavBarDataCompOrg

	const iconName = 'ChevronLeft'
	const iconSize = 20
	const iconStrokeWidth = 2
</script>

{#if data.user}
	{#if data.user.avatar}
		<button class="flex-none w-14 border-0 border-red-700" on:click={data.navBar.fToggleOpen()}>
			<Avatar
				initials={data.user ? data.user.initials : undefined}
				background="bg-primary-400"
				rounded="rounded-full"
				src={data.user.avatar.url}
				width="w-9"
			/>
		</button>
	{/if}
	<div>
		Default Organization: {data.user.org.name}
		Default System: {data.user.system.name}
	</div>
{/if}
