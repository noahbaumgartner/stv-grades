<script lang="ts">
	import { Input } from '$lib/components/input';
	import { Select } from '$lib/components/select';

	let geschlecht = $state('maenner');
	let weite = $state(0);

	const geschlechtOptions = [
		{ value: 'maenner', label: 'Männer' },
		{ value: 'frauen', label: 'Frauen' }
	];
</script>

<svelte:head>
	<title>STV Speerwerfen-Rechner</title>
</svelte:head>

<div class="page">
	<header class="page-header">
		<h1 class="page-title">Speerwerfen-Rechner</h1>
		<p class="page-subtitle">Speerwerfen</p>
	</header>

	<div class="page-form">
		<Select label="Geschlecht" options={geschlechtOptions} bind:value={geschlecht} />

		<Input
			label="Weite"
			type="number"
			bind:value={weite}
			min={0}
			step={0.01}
			placeholder="0.00"
			suffix="m"
		/>
	</div>

	<div class="placeholder-card">
		<p class="placeholder-text">Bewertungslogik noch nicht implementiert</p>
	</div>
</div>

<style>
	.page {
		max-width: 32rem;
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
		padding-inline: 1rem;
		padding-block: 2rem;
	}

	.page-header {
		margin-bottom: 2rem;
		text-align: center;
	}

	.page-title {
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--color-neutral-900);
	}

	.page-subtitle {
		margin-top: 0.25rem;
		font-size: var(--text-sm);
		color: var(--color-neutral-500);
	}

	.page-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.placeholder-card {
		margin-top: 2rem;
		border-radius: var(--radius-md);
		border: 1px dashed var(--color-neutral-300);
		background-color: var(--color-neutral-50);
		padding: 2rem;
		text-align: center;
	}

	.placeholder-text {
		font-size: var(--text-sm);
		color: var(--color-neutral-400);
	}
</style>
