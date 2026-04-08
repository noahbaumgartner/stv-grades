<script lang="ts">
	import { PageHeader } from '$lib/components/page-header';
</script>

<svelte:head>
	<title>STV Notenrechner | Start</title>
</svelte:head>

<PageHeader title="Start" />

<div class="page">
	<div class="hero">
		<p class="hero-text">
			Berechne die Noten für alle Disziplinen des STV Vereinswettkampfs Aktive
			basierend auf der offiziellen Wertungstabelle Leichtathletik 2020.
		</p>
		<p class="hero-hint">
			Wähle eine Disziplin in der Navigation, um loszulegen.
			Es besteht kein Anspruch auf Richtigkeit der berechneten Noten.
		</p>
	</div>
</div>

<style>
	.page {
		max-width: 36rem;
		margin-inline: auto;
		padding-inline: 1.5rem;
		padding-block: 3rem;
	}

	.hero {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.hero-text {
		font-size: var(--text-base);
		color: var(--color-neutral-700);
		line-height: 1.7;
	}

	.hero-hint {
		font-size: var(--text-sm);
		color: var(--color-neutral-400);
		line-height: 1.6;
	}
</style>
