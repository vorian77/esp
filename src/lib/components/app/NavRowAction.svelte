<script lang="ts">
	import type { AppRowActionType } from '$comps/app/types.app'
	import Icon from '$comps/other/Icon.svelte'

	const NAV_COLOR = '#3b79e1'

	export let action: AppRowActionType
	export let icon: string
	export let onChange = async (action: AppRowActionType) => {}
</script>

<div
	role="button"
	tabindex="0"
	on:click={async () => await onChange(action)}
	on:keyup={async () => await onChange(action)}
>
	<Icon name={icon} color={NAV_COLOR} size="28" strokeWidth="2" />
</div>
