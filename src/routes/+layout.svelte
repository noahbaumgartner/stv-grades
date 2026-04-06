<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { Navigation, NavigationItem } from '$lib/components/navigation';
	import { Repeat, Crosshair } from 'lucide-svelte';
	import { getNavState } from '$lib/nav-state.svelte';

	let { children } = $props();
	let collapsed = $state(false);
	const nav = getNavState();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="app">
	<Navigation bind:collapsed bind:mobileOpen={nav.mobileOpen}>
		<NavigationItem
			icon={Repeat}
			label="Pendelstafette"
			href="/shuttle-relay"
			active={page.url.pathname === '/shuttle-relay'}
			{collapsed}
			onclick={() => (nav.mobileOpen = false)}
		/>
		<NavigationItem
			icon={Crosshair}
			label="Speerwerfen"
			href="/javelin"
			active={page.url.pathname === '/javelin'}
			{collapsed}
			onclick={() => (nav.mobileOpen = false)}
		/>
	</Navigation>

	<main class="app-main">
		{@render children()}
	</main>
</div>

<style>
	.app {
		display: flex;
		min-height: 100dvh;
	}

	.app-main {
		flex: 1;
		min-width: 0;
		overflow-y: auto;
	}
</style>
