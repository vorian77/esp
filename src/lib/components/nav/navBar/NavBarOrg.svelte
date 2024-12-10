<script lang="ts">
	import { NavBarDataCompOrg } from '$comps/nav/navBar/types.navBar'
	import { User } from '$utils/types'
	import { Avatar } from '@skeletonlabs/skeleton'
	import { fade } from 'svelte/transition'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/app/navBar/NavBarOrg.svelte'

	export let data: NavBarDataCompOrg
</script>

{#if data.user}
	<div class="flex items-center">
		<a
			href="#"
			class="flex-none w-14 border-0 border-red-700 hover:-translate-y-0.5 transition-transform"
			on:click={data.navBar.toggleOpen()}
		>
			<img src={data.user.org.urlLogo} />
		</a>

		{#if data.navBar.isOpen}
			<div class="text-sm ml-1 border-0 border-green-700">
				<span in:fade={data.navBar.fadeIn} out:fade={data.navBar.fadeOut}>
					{data.user.org.appName}
				</span>
			</div>

			<div class="flex-none w-6 text-end border-0 border-blue-700">
				<a href="#" on:click={data.navBar.toggleOpen()}>
					<div class={data.navBar.isOpen ? '' : 'rotate-180'}>
						<Icon
							props={new IconProps({
								clazz: 'mt-0.5 border-0 border-red-400',
								color: data.navBar.iconColor,
								name: 'ChevronLeft',
								size: 20,
								strokeWidth: 2
							})}
						/>
					</div>
				</a>
			</div>
		{/if}
	</div>
	<hr class="my-2" />
{/if}
