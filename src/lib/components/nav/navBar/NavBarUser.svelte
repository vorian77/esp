<script lang="ts">
	import { NavBarDataCompUser } from '$comps/nav/navBar/types.navBar.svelte'
	import NavBarGroup from '$comps/nav/navBar/NavBarGroup.svelte'
	import NavBarHeader from '$comps/nav/navBar/NavBarHeader.svelte'
	import NavBarInfo from '$comps/nav/navBar/NavBarInfo.svelte'
	import NavBarHr from '$comps/nav/navBar/NavBarHr.svelte'
	import { User } from '$utils/types'
	import { Avatar } from '@skeletonlabs/skeleton'
	import { fade } from 'svelte/transition'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/app/navBar/NavBarOrg.svelte'

	let { data }: { data: NavBarDataCompUser } = $props()
</script>

{#if data.user}
	<hr class="lg:mt-32 my-2" />
	<a
		href="#"
		class="flex items-center hover:-translate-y-0.5 transition-transform"
		on:click={() => data.items.activateLinkByLabel('My Account')}
	>
		<div class="h-9 w-9 rounded-full place-content-center bg-neutral-200 text-center">
			{#if data.user.avatar}
				<img class="rounded-full" src={data.user.avatar?.url} />
			{:else}
				{data.user.initials}
			{/if}
		</div>

		{#if data.navBar.isOpen}
			<span class="ml-1" in:fade={data.navBar.fadeIn} out:fade={data.navBar.fadeOut}>
				{data.user.fullName}
			</span>
		{/if}
	</a>

	<div class="mt-3 {data.navBar.isOpen ? '' : 'justify-items-center'} ">
		<NavBarGroup data={data.items} />
	</div>

	{#each data.info as info}
		<NavBarInfo navBar={data.navBar} {info} />
	{/each}
{/if}
