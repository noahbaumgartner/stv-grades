<script lang="ts">
	let {
		label,
		collapsed = false
	}: {
		label: string;
		collapsed?: boolean;
	} = $props();
</script>

{#if !collapsed}
	<p class="nav-header">{label}</p>
{:else}
	<div class="nav-spacer"></div>
{/if}

<style>
	.nav-header {
		padding: 0.75rem 0.5rem 0.25rem;
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--color-neutral-800);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex-shrink: 0;
	}

	.nav-spacer {
		height: 0.75rem;
		flex-shrink: 0;
	}
</style>
