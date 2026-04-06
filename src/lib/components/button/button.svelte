<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Icon } from '$lib/components/icon';

	let {
		onclick,
		variant = 'primary',
		size = 'md',
		icon,
		title,
		children
	}: {
		onclick?: () => void;
		variant?: 'primary' | 'outline' | 'ghost';
		size?: 'sm' | 'md';
		icon?: any;
		title?: string;
		children?: Snippet;
	} = $props();

	let isIconOnly = $derived(!children && icon);
</script>

<button
	{onclick}
	{title}
	class="button button-{variant} button-{size}"
	class:icon-only={isIconOnly}
>
	{#if icon}
		<Icon {icon} size={size === 'sm' ? 16 : 20} />
	{/if}
	{#if children}
		{@render children()}
	{/if}
</button>

<style>
	.button {
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		border-radius: var(--radius-md);
		font-weight: 500;
		border: none;
		outline: 0;
		transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s, transform 0.15s;
	}

	.button-md {
		padding: 0.625rem 1rem;
		font-size: var(--text-sm);
	}

	.button-sm {
		padding: 0.375rem 0.625rem;
		font-size: var(--text-xs);
	}

	.button.icon-only.button-md {
		padding: 0.5rem;
	}

	.button.icon-only.button-sm {
		padding: 0.375rem;
	}

	.button:focus-visible {
		border-color: var(--color-neutral-900);
		box-shadow: 0 0 0 1px var(--color-neutral-900);
	}

	.button:active {
		transform: scale(0.98);
	}

	.button-primary {
		background-color: #c66240;
		color: white;
	}

	.button-primary:hover {
		background-color: #b5573a;
	}

	.button-outline {
		border: 1px solid var(--color-neutral-300);
		background-color: white;
		color: var(--color-neutral-700);
	}

	.button-outline:hover {
		background-color: var(--color-neutral-50);
	}

	.button-ghost {
		background: none;
		color: var(--color-neutral-500);
	}

	.button-ghost:hover {
		background-color: var(--color-neutral-200);
		color: var(--color-neutral-700);
	}
</style>
