<script lang="ts">
	import { appStoreUser, User } from '$utils/types'
	import NavBar from '$comps/navBar/NavBar.svelte'

	const rawUser = $appStoreUser
	let user: User = rawUser && Object.keys(rawUser).length > 0 ? new User(rawUser) : undefined
</script>

<main>
	<NavBar {user} />
	<section class="content">
		<h1>New NavBar!</h1>
	</section>
</main>

<style>
	main {
		display: grid;
		grid-template: 'nav content' min-content;
	}
	.content {
		grid-area: content;
	}
</style>
