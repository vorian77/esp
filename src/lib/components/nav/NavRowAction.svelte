<script lang="ts">
	import type { AppRowActionType } from '$comps/app/types.app'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'

	export let action: AppRowActionType
	export let icon: string
	export let onChange = async (action: AppRowActionType) => {}
</script>

<div
	role="button"
	tabindex="0"
	on:click={async () => await onChange(action)}
	on:keyup={async () => await onChange(action)}
	class="border-0 border-blue-100"
>
	<Icon props={new IconProps({ isNav: true, name: icon, size: 26, strokeWidth: 2 })} />
</div>
