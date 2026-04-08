<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Icon } from '$lib/components/icon';
	import { PanelLeftClose, PanelLeftOpen, X } from 'lucide-svelte';

	let {
		collapsed = $bindable(false),
		mobileOpen = $bindable(false),
		children
	}: {
		collapsed?: boolean;
		mobileOpen?: boolean;
		children: Snippet;
	} = $props();
</script>

{#if mobileOpen}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="nav-overlay" onclick={() => (mobileOpen = false)} onkeydown={() => {}}></div>
{/if}

<nav class="nav" class:collapsed class:mobile-open={mobileOpen}>
	<div class="nav-content">
		{@render children()}
	</div>
	<div class="nav-footer">
	{#if collapsed}
		<button
			class="nav-item nav-collapse"
			onclick={() => (collapsed = !collapsed)}
		>
			<span class="nav-item-icon">
				<Icon icon={PanelLeftOpen} size={16} />
			</span>
		</button>
	{:else}
		<button
			class="nav-item nav-collapse"
			onclick={() => (collapsed = !collapsed)}
		>
			<span class="nav-item-icon">
				<Icon icon={PanelLeftClose} size={16} />
			</span>
			<span class="nav-item-label">Ausblenden</span>
		</button>
	{/if}
	<button
		class="nav-item nav-close-mobile"
		onclick={() => (mobileOpen = false)}
		title="Navigation schliessen"
	>
		<span class="nav-item-icon">
			<Icon icon={X} size={16} />
		</span>
		<span class="nav-item-label">Schliessen</span>
	</button>
	</div>
</nav>

<style>
	.nav {
		display: flex;
		flex-direction: column;
		width: 14rem;
		background-color: #FAF9F6;
		border-right: 1px solid var(--color-neutral-200);
		padding: 0.75rem 0.5rem;
		max-height: 100dvh;
		position: sticky;
		top: 0;
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
		gap: 0.125rem;
		overflow-y: auto;
		scrollbar-width: none;
		min-height: 0;
	}

	.nav-footer {
		padding-top: 0.5rem;
	}

	.nav-item {
		display: flex;
		align-items: center;
		width: 100%;
		gap: 0.5rem;
		padding: 0.5rem 0.5rem;
		border: none;
		background: none;
		border-radius: var(--radius-sm);
		text-decoration: none;
		font-size: var(--text-sm);
		cursor: pointer;
		white-space: nowrap;
		transition: background-color 0.15s, color 0.15s;
	}

	.nav-item:hover {
		background-color: #F0EEE6;
		color: var(--color-neutral-700);
	}

	.nav-item-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: var(--color-neutral-600);
		transition: transform 0.2s ease;
	}

	.nav-item:hover .nav-item-icon {
		transform: scale(1.1) rotate(-5deg);
	}

	.nav-item:active .nav-item-icon {
		transform: scale(0.9) rotate(5deg);
	}

	.nav-item-label {
		overflow: hidden;
		text-overflow: ellipsis;
		color: var(--color-neutral-700);
	}

	.nav-close-mobile {
		display: none;
	}

	.nav-overlay {
		display: none;
	}

	@media (max-width: 768px) {
		.nav {
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			z-index: 50;
			width: 16rem;
			transform: translateX(-100%);
			transition: transform 0.2s ease;
		}

		.nav.collapsed {
			width: 16rem;
			transform: translateX(-100%);
		}

		@media (max-width: 400px) {
			.nav, .nav.collapsed {
				width: 100%;
			}
		}

		.nav.mobile-open {
			transform: translateX(0);
		}

		.nav-collapse {
			display: none;
		}

		.nav-close-mobile {
			display: flex;
		}

		.nav-item:hover {
			background-color: transparent;
		}

		.nav-item:hover .nav-item-icon {
			transform: none;
		}

		.nav-item:active .nav-item-icon {
			transform: none;
		}

		.nav-overlay {
			display: block;
			position: fixed;
			inset: 0;
			z-index: 40;
			background-color: rgba(0, 0, 0, 0.3);
		}
	}
</style>
