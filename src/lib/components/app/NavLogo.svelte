<script lang="ts">
	import { User } from '$utils/types'

	export let user: User | undefined

	const FILENAME = '$comps/app/NavLogo.svelte'

	let fileName = ''
	let fileExt = ''

	$: {
		fileName = user?.org?.logoFileName ? user.org.logoFileName : ''
		fileExt = user?.org?.logoFileExt ? user.org.logoFileExt : ''
	}
</script>

<!-- <DataViewer header="showSysReport" data={showSysReport} /> -->

{#if fileName && fileExt === 'jpg'}
	{#await import(`$lib/assets/${fileName}.jpg`) then { default: src }}
		<img {src} alt="Image" />
	{/await}
{/if}

{#if fileName && fileExt === 'png'}
	{#await import(`$lib/assets/${fileName}.png`) then { default: src }}
		<img {src} alt="Image" />
	{/await}
{/if}

<style>
	img {
		width: 60px;
		margin-right: 10px;
	}
</style>
