<script lang="ts">
	import { Icon } from '$lib/components/icon';
	import { Menu } from 'lucide-svelte';
	import { getNavState } from '$lib/nav-state.svelte';

	let {
		title
	}: {
		title: string;
	} = $props();

	const nav = getNavState();
</script>

<header class="page-header">
	<button class="menu-button" onclick={() => nav.toggleMobile()} title="Navigation">
		<Icon icon={Menu} size={18} />
	</button>
	<h1 class="page-header-title">{title}</h1>
</header>

<style>
	.page-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--color-neutral-200);
	}

	.page-header-title {
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--color-neutral-800);
	}

	.menu-button {
		display: none;
		align-items: center;
		justify-content: center;
		padding: 0.375rem;
		border: none;
		background: none;
		border-radius: var(--radius-sm);
		color: var(--color-neutral-600);
		cursor: pointer;
		transition: background-color 0.15s;
	}

	.menu-button:hover {
		background-color: #F0EEE6;
	}

	@media (max-width: 768px) {
		.page-header {
			padding-left: calc(1.5rem - 0.375rem);
		}

		.menu-button {
			display: flex;
		}
	}
</style>
