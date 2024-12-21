<script lang="ts">
	import type { AppRowActionType } from '$comps/app/types.app.svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'

	let {
		action,
		icon,
		onChange
	}: { action: AppRowActionType; icon: string; onChange: (action: AppRowActionType) => {} } =
		$props()
</script>

<div
	role="button"
	tabindex="0"
	onclick={() => onChange(action)}
	onkeyup={() => onChange(action)}
	class="border-0 border-blue-100"
>
	<Icon props={new IconProps({ isNav: true, name: icon, size: 26, strokeWidth: 2 })} />
</div>
