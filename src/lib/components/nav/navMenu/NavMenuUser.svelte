<script lang="ts">
	import { NavMenuDataCompUser } from '$comps/nav/navMenu/types.navMenu.svelte'
	import NavMenuGroup from '$comps/nav/navMenu/NavMenuGroup.svelte'
	import NavMenuHeader from '$comps/nav/navMenu/NavMenuHeader.svelte'
	import NavMenuInfo from '$comps/nav/navMenu/NavMenuInfo.svelte'
	import NavMenuHr from '$comps/nav/navMenu/NavMenuHr.svelte'
	import { NodeObjComponent, User } from '$utils/types'
	import { Avatar } from '@skeletonlabs/skeleton'
	import { fade } from 'svelte/transition'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/app/navMenu/NavMenuOrg.svelte'

	let { data }: { data: NavMenuDataCompUser } = $props()
</script>

{#if data.user}
	<hr class="my-2" />
	<button
		class="flex items-center hover:-translate-y-0.5 transition-transform"
		onclick={() =>
			data.navMenu.triggerActionDataObjApp(
				'data_obj_task_sys_auth_my_account',
				NodeObjComponent.FormDetail
			)}
	>
		<div class="h-9 w-9 rounded-full place-content-center bg-neutral-200 text-center">
			{#if data.user.avatar}
				<img class="rounded-full" src={data.user.avatar?.url} />
			{:else}
				{data.user.initials}
			{/if}
		</div>

		{#if data.navMenu.isOpen}
			<span class="ml-1" in:fade={data.navMenu.fadeIn} out:fade={data.navMenu.fadeOut}>
				{data.user.fullName}
			</span>
		{/if}
	</button>

	<div class="mt-3 {data.navMenu.isOpen ? '' : 'justify-items-center'} ">
		<NavMenuGroup data={data.items} />
	</div>

	{#each data.info as info}
		<NavMenuInfo navMenu={data.navMenu} {info} />
	{/each}
{/if}
