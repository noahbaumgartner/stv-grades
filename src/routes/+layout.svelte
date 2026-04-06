<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { Navigation, NavigationItem } from '$lib/components/navigation';
	import { Button } from '$lib/components/button';
	import { Repeat, Crosshair, PanelLeftClose, PanelLeftOpen } from 'lucide-svelte';

	let { children } = $props();
	let collapsed = $state(false);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="app">
	<header class="app-header">
		<div class="app-header-side">
			<Button
				variant="ghost"
				size="sm"
				icon={collapsed ? PanelLeftOpen : PanelLeftClose}
				onclick={() => (collapsed = !collapsed)}
				title={collapsed ? 'Navigation einblenden' : 'Navigation ausblenden'}
			/>
		</div>
		<span class="app-title">STV Werkzeuge</span>
		<div class="app-header-side"></div>
	</header>

	<div class="app-body">
		<Navigation {collapsed}>
			<NavigationItem
				icon={Repeat}
				label="Pendelstafette"
				href="/shuttle-relay"
				active={page.url.pathname === '/shuttle-relay'}
				{collapsed}
			/>
			<NavigationItem
				icon={Crosshair}
				label="Speerwerfen"
				href="/javelin"
				active={page.url.pathname === '/javelin'}
				{collapsed}
			/>
		</Navigation>

		<main class="app-main">
			{@render children()}
		</main>
	</div>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
	}

	.app-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 3rem;
		padding-inline: 0.75rem;
		border-bottom: 1px solid var(--color-neutral-200);
		background-color: #fafafa;
		flex-shrink: 0;
	}

	.app-header-side {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.app-header-side:last-child {
		justify-content: flex-end;
	}

	.app-title {
		font-size: var(--text-md);
		font-weight: 600;
		color: var(--color-neutral-800);
	}

	.app-body {
		display: flex;
		flex: 1;
		min-height: 0;
	}

	.app-main {
		flex: 1;
		min-width: 0;
		overflow-y: auto;
	}
</style>
