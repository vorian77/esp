<script lang="ts">
	import { NavBarListItemData } from '$comps/navBar/types.navBar'
	import { fade } from 'svelte/transition'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'

	export let isExpanded = false
	export let data: NavBarListItemData

	let iconSize = '22'
	let iconSizeChevron = '20'
	let iconStrokeWidth = '1'

	const fadeIn = {
		delay: 300,
		duration: 200
	}
	const fadeOut = {
		delay: 0,
		duration: 200
	}
</script>

{#if data}
	<li>
		<div class="flex gap-2">
			<Icon
				props={new IconProps({
					name: data.codeIcon,
					size: iconSize,
					strokeWidth: iconStrokeWidth
				})}
			/>
			{#if isExpanded}<span in:fade={fadeIn} out:fade={fadeOut}>{data.label}</span>{/if}
		</div>
	</li>
{/if}
