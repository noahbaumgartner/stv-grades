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
		cursor: pointer;
		border-radius: 0.375rem;
		padding: 0.625rem 1rem;
		font-size: var(--text-sm);
		font-weight: 500;
		border: none;
		outline: 0;
		transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s, transform 0.15s;
	}

	.button:focus-visible {
		border-color: var(--color-neutral-900);
		box-shadow: 0 0 0 1px var(--color-neutral-900);
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
