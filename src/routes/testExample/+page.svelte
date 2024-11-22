<script>
	import Menu from './Menu.svelte'
</script>

<main>
	<Menu />
	<section class="content">
		<h1>Hello World!</h1>
	</section>
</main>

<style>
	main {
		display: grid;
		grid-template: 'nav content' min-content;
	}
	.content {
		/* grid-area: content; */
	}
</style>
