<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		collapsed = false,
		children
	}: {
		collapsed?: boolean;
		children: Snippet;
	} = $props();
</script>

<nav class="nav" class:collapsed>
	<div class="nav-content">
		{@render children()}
	</div>
</nav>

<style>
	.nav {
		display: flex;
		flex-direction: column;
		width: 14rem;
		background-color: #fafafa;
		border-right: 1px solid var(--color-neutral-200);
		padding: 0.75rem 0.5rem;
		transition: width 0.2s ease;
		flex-shrink: 0;
		overflow: hidden;
	}

	.nav.collapsed {
		width: 3.125rem;
	}

	.nav-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
</style>
