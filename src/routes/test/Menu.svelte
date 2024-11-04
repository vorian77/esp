<script>
	import { fade } from 'svelte/transition'

	const fadeIn = {
		delay: 100,
		duration: 200
	}

	const fadeOut = {
		delay: 0,
		duration: 100
	}

	let isExpanded = false
</script>

<nav class:expanded={isExpanded}>
	<button on:click={() => (isExpanded = !isExpanded)}>
		{#if isExpanded}
			Close
		{:else}
			Open
		{/if}
	</button>
	<ul>
		<li>
			🚀 {#if isExpanded}<span in:fade={fadeIn} out:fade={fadeOut}>Inbox</span>{/if}
		</li>
		<li>
			⭐️ {#if isExpanded}<span in:fade={fadeIn} out:fade={fadeOut}>Starred</span>{/if}
		</li>
		<li>
			🗑 {#if isExpanded}<span in:fade={fadeIn} out:fade={fadeOut}>Trashed</span>{/if}
		</li>
	</ul>
	{#if isExpanded}
		<section in:fade={fadeIn} out:fade={fadeOut}>
			<hr />
			<ul>
				<h3>Folders</h3>
				<li>🧾 Receipts</li>
				<li>🤖 Autofilter</li>
			</ul>
		</section>
	{/if}
</nav>

<style>
	nav {
		grid-area: nav;
		height: 100vw;
		background-color: #324754;
		color: #a2b7c4;
		transition: ease-out 200ms;
		width: 60px;
		overflow: hidden;
	}

	.expanded {
		transition: ease-out 200ms;
		width: 200px;
	}

	ul {
		list-style: none;
		padding: 20px;
		margin: 0;
	}

	li {
		width: 200px;
	}

	h3 {
		text-transform: uppercase;
		margin: 0;
		padding: 10px 0;
	}

	hr {
		color: white;
		width: 80%;
	}
</style>
