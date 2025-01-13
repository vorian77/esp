<script lang="ts">
	import { NavMenuDataCompOrg } from '$comps/nav/navMenu/types.navMenu.svelte'
	import { User } from '$utils/types'
	import { Avatar } from '@skeletonlabs/skeleton'
	import { fade } from 'svelte/transition'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/app/navMenu/NavMenuOrg.svelte'

	let { data }: { data: NavMenuDataCompOrg } = $props()
</script>

{#if data.user}
	<div class="flex items-center">
		<button
			class="flex-none w-14 hover:-translate-y-0.5 transition-transform"
			onclick={data.navMenu.toggleOpen}
		>
			{#if data.user.org.urlLogo}
				<img src={data.user.org.urlLogo} />
			{/if}
		</button>

		{#if data.navMenu.isOpen}
			<div class="text-sm ml-1">
				<span in:fade={data.navMenu.fadeIn} out:fade={data.navMenu.fadeOut}>
					{data.user.org.appName}
				</span>
			</div>

			<div class="flex-none w-6 text-end">
				<button onclick={data.navMenu.toggleOpen}>
					<div class={data.navMenu.isOpen ? '' : 'rotate-180'}>
						<Icon
							props={new IconProps({
								clazz: 'mt-0.5 ',
								color: data.navMenu.iconColor,
								name: 'ChevronLeft',
								size: 20,
								strokeWidth: 2
							})}
						/>
					</div>
				</button>
			</div>
		{/if}
	</div>
	<hr class="my-2" />
{/if}
