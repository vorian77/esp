<script>
	import Menu from './Menu.svelte'

	let name = 'world'
</script>

<main>
	<Menu />
	<section class="content">
		<h1>Hello {name}!</h1>
	</section>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
	main {
		display: grid;
		grid-template: 'nav content' min-content;
	}
	.content {
		grid-area: content;
	}
</style>
