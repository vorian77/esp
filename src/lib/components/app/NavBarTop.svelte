<script lang="ts">
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'

	const FILENAME = '$routes/app/NavBarTop.svelte'
	const DEFAULT_APP_NAME = 'The App Factory'

	export let appName: string
	export let goHome: Function
	export let toggleNavBarDrawer: Function
</script>

<nav class="flex bg-white border-b p-3">
	<div class="" role="button" tabindex="0">
		<Icon
			props={new IconProps({
				isNav: true,
				name: 'menu',
				onClick: toggleNavBarDrawer,
				strokeWidth: 2
			})}
		/>
	</div>

	<div role="button" tabindex="0" class="ml-6 text-black" on:click={goHome}>
		{appName ? appName : DEFAULT_APP_NAME}
	</div>
</nav>
