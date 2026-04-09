<script lang="ts">
	import './layout.css';
	const favicon = '/images/favicon.svg';
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
		'80m-relay': Repeat,
		'40m-relay-baton': Repeat,
		'80m': Timer,
		'400m': Timer,
		'800m': Timer,
		'1000m': Timer,
		'high-jump': ArrowUp,
		'long-jump': MoveRight,
		'shot-put': Circle,
		'hammer-throw': RotateCcw,
		'javelin': Crosshair,
		'ball-throw': Target
	};
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="app">
	<Navigation bind:collapsed bind:mobileOpen={nav.mobileOpen}>
		{#snippet header()}
			<a href="/" class="nav-title" class:collapsed>
				<span class="nav-title-emoji">🏃🏼‍♂️</span>
				{#if !collapsed}
					<span class="nav-title-text">STV Notenrechner</span>
				{/if}
			</a>
		{/snippet}
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

	.nav-title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		height: var(--header-height);
		padding: 0 1rem;
		margin-bottom: 0.5rem;
		border-bottom: 1px solid var(--color-neutral-200);
		text-decoration: none;
		white-space: nowrap;
		overflow: hidden;
		flex-shrink: 0;
		width: 100%;
		box-sizing: border-box;
	}

	.nav-title-emoji {
		font-size: 1.25rem;
		flex-shrink: 0;
	}

	.nav-title-text {
		font-family: 'Literata', serif;
		font-size: var(--text-base);
		font-weight: 700;
		color: var(--color-neutral-800);
	}

	.nav-title.collapsed {
		justify-content: center;
	}
</style>
