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
	<hr class="nav-divider" />
{/if}

<style>
	.nav-header {
		padding: 0.5rem 0.75rem 0.25rem;
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--color-neutral-400);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.nav-divider {
		border: none;
		border-top: 1px solid var(--color-neutral-200);
		margin: 0.5rem 0.75rem;
	}
</style>
