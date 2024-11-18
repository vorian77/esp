<script lang="ts">
	import { User, UserOrg, UserOrgLogoFileType } from '$utils/types'
	import DataViewer from '$utils/DataViewer.svelte'

	export let user: User | undefined

	const FILENAME = '$comps/app/NavLogo.svelte1'

	$: userOrg = user?.org as UserOrg
	$: classImg = userOrg ? ` mr-${userOrg.logoMarginRight}` : ''
</script>

{#if userOrg}
	<div class={classImg}>
		{#await import(`$lib/assets/${userOrg.logoFileName}.${userOrg.codeLogoFileType}`) then { default: src }}
			<img {src} width={userOrg.logoWidth} alt="Image" />
		{/await}
	</div>
{/if}
