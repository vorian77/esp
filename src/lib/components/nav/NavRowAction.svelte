<script lang="ts">
	import type { AppRowActionType } from '$comps/app/types.app.svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'

	let {
		action,
		icon,
		onChange,
		disabled
	}: { action: AppRowActionType; icon: string; onChange: (action: AppRowActionType) => {} } =
		$props()
	let color = $derived(disabled ? '#BFBFBF' : '#737373')
</script>

<div
	role="button"
	tabindex="0"
	onclick={() => onChange(action)}
	onkeyup={() => onChange(action)}
	{disabled}
>
	<Icon props={new IconProps({ isNav: true, name: icon, size: 26, strokeWidth: 2, color })} />
</div>
