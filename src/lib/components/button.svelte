<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		onclick,
		variant = 'primary',
		children
	}: {
		onclick?: () => void;
		variant?: 'primary' | 'secondary';
		children: Snippet;
	} = $props();
</script>

<button
	{onclick}
	class="button {variant === 'primary' ? 'button-primary' : 'button-secondary'}"
>
	{@render children()}
</button>

<style>
	.button {
		height: 2.5rem;
		cursor: pointer;
		border-radius: 0.5rem;
		padding-inline: 1rem;
		font-size: var(--text-sm);
		font-weight: 500;
		border: none;
		transition: background-color 0.15s, transform 0.15s;
	}

	.button:active {
		transform: scale(0.98);
	}

	.button-primary {
		background-color: var(--color-neutral-900);
		color: white;
	}

	.button-primary:hover {
		background-color: var(--color-neutral-800);
	}

	.button-secondary {
		border: 1px solid var(--color-neutral-300);
		background-color: white;
		color: var(--color-neutral-700);
	}

	.button-secondary:hover {
		background-color: var(--color-neutral-50);
	}
</style>
