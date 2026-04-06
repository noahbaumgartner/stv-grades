<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { Navigation, NavigationItem, NavigationHeader } from '$lib/components/navigation';
	import {
		House, Repeat, Timer, ArrowUp, MoveRight,
		Circle, RotateCcw, Crosshair, Target
	} from 'lucide-svelte';
	import { getNavState } from '$lib/nav-state.svelte';
	import { getDisciplinesByCategory } from '$lib/disciplines';

	let { children } = $props();
	let collapsed = $state(false);
	const nav = getNavState();
	const categories = getDisciplinesByCategory();

	// Map slug to icon
	const iconMap: Record<string, any> = {
		'80m-ps': Repeat,
		'40m-ps-stab': Repeat,
		'80m': Timer,
		'400m': Timer,
		'800m': Timer,
		'1000m': Timer,
		'hochsprung': ArrowUp,
		'weitsprung': MoveRight,
		'kugelstossen': Circle,
		'schleuderball': RotateCcw,
		'speer': Crosshair,
		'weitwurf': Target
	};
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="app">
	<Navigation bind:collapsed bind:mobileOpen={nav.mobileOpen}>
		<NavigationItem
			icon={House}
			label="Start"
			href="/"
			active={page.url.pathname === '/'}
			{collapsed}
			onclick={() => (nav.mobileOpen = false)}
		/>
		{#each categories as cat}
			<NavigationHeader label={cat.label} {collapsed} />
			{#each cat.disciplines as d}
				<NavigationItem
					icon={iconMap[d.slug] ?? Circle}
					label={d.name}
					href="/{d.slug}"
					active={page.url.pathname === `/${d.slug}`}
					{collapsed}
					onclick={() => (nav.mobileOpen = false)}
				/>
			{/each}
		{/each}
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
