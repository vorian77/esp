<!-- Tooltip.svelte -->
<script>
	export let content
	let isHovered = false
</script>

<div
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
	class="tooltip-wrapper"
>
	<slot></slot>
	{#if content && isHovered}
		<div class="text-xs tooltip-content">
			{content}
		</div>
	{/if}
</div>

<style>
	.tooltip-wrapper {
		position: relative;
		display: inline-block;
	}

	.tooltip-content {
		position: absolute;
		/* Add your positioning and styling here */
		background-color: #555;
		color: #fff;
		padding: 5px 10px;
		border-radius: 4px;
		z-index: 999;
	}
</style>
