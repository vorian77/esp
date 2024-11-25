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

{#if data.user.org}
	<div class="flex">
		<button class="flex-none w-14 border-0 border-red-700" on:click={data.navBar.fToggleOpen()}>
			<img src={data.user.org.urlLogo} />
		</button>
		{#if data.navBar.isOpen}
			<div class="grow border-0 border-green-700">
				<div class="flex-1 ml-1 text-sm">
					<span in:fade={data.navBar.fadeIn} out:fade={data.navBar.fadeOut}>
						{data.user.org.appName}
					</span>
				</div>
			</div>

			<div class="flex-none w-6 text-end content-center border-0 border-blue-700">
				<button class="" on:click={data.navBar.fToggleOpen()}>
					<div class={data.navBar.isOpen ? '' : 'rotate-180'}>
						<Icon
							props={new IconProps({
								clazz: 'mt-0.5 border-0 border-red-400',
								color: data.navBar.iconColor,
								name: iconName,
								size: iconSize,
								strokeWidth: iconStrokeWidth
							})}
						/>
					</div>
				</button>
			</div>
		{/if}
	</div>
	<hr class="my-2" />
{:else}
	<!-- no org -->
	<button class="w-full text-right border-0 border-blue-400" on:click={data.navBar.fToggleOpen()}>
		<div class={data.navBar.isOpen ? '' : 'rotate-180'}>
			<Icon
				props={new IconProps({
					clazz: 'mt-0.5 border-0 border-red-400',
					color: data.navBar.iconColor,
					name: iconName,
					size: iconSize,
					strokeWidth: iconStrokeWidth
				})}
			/>
		</div>
	</button>
{/if}
