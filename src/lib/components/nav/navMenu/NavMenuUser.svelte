<script lang="ts">
	import {
		NavMenuDataCompUser,
		NavMenuNamedItemType
	} from '$comps/nav/navMenu/types.navMenu.svelte'
	import NavMenuGroup from '$comps/nav/navMenu/NavMenuGroup.svelte'
	import NavMenuHeader from '$comps/nav/navMenu/NavMenuHeader.svelte'
	import NavMenuInfo from '$comps/nav/navMenu/NavMenuInfo.svelte'
	import NavMenuHr from '$comps/nav/navMenu/NavMenuHr.svelte'
	import { NodeObjComponent, PropDataSourceValue, User } from '$utils/types'
	import { Avatar } from '@skeletonlabs/skeleton'
	import { fade } from 'svelte/transition'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/app/navMenu/NavMenuOrg.svelte'

	let props = $props()
	let navMenuUser: NavMenuDataCompUser = $state(props.data)
	let user: User = $derived(navMenuUser.navMenu.sm.user)
</script>

{#if navMenuUser && user}
	<hr class="my-2" />
	<button
		class="flex items-center hover:-translate-y-0.5 transition-transform"
		onclick={() => navMenuUser.navMenu.activateLinkByNamedItem(NavMenuNamedItemType.itemMyAccount)}
	>
		<div class="h-9 w-9 rounded-full place-content-center bg-neutral-200 text-center">
			{#if user.avatar}
				<img class="rounded-full" src={user.avatar?.url} />
			{:else}
				{user.initials}
			{/if}
		</div>

		{#if navMenuUser.navMenu.isOpen}
			<span
				class="ml-1"
				in:fade={navMenuUser.navMenu.fadeIn}
				out:fade={navMenuUser.navMenu.fadeOut}
			>
				{user.fullName}
			</span>
		{/if}
	</button>

	<div class="mt-3 {navMenuUser.navMenu.isOpen ? '' : 'justify-items-center'} ">
		<NavMenuGroup data={navMenuUser.items} />
	</div>

	{#each navMenuUser.info as info}
		<NavMenuInfo navMenu={navMenuUser.navMenu} {info} />
	{/each}
{/if}
