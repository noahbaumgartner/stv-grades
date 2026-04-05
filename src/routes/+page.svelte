<script lang="ts">
	import { Select } from '$lib/components/select';
	import { Input } from '$lib/components/input';
	import { Button } from '$lib/components/button';
	import { berechneNote, type GradingResult, type Untergrund } from '$lib/grading';

	let untergrund: Untergrund = $state('kunststoff');
	let frauen = $state(0);
	let maenner = $state(0);
	let zeitTotal = $state(0);
	let fehler = $state(0);

	let result: GradingResult | null = $derived.by(() => {
		const total = frauen + maenner;
		if (total < 1 || zeitTotal <= 0) return null;
		return berechneNote({ untergrund, frauen, maenner, zeitTotal, fehler });
	});

	function noteColorClass(note: number): string {
		if (note >= 8) return 'note-green';
		if (note >= 6) return 'note-yellow';
		if (note >= 4) return 'note-orange';
		return 'note-red';
	}

	function reset() {
		untergrund = 'kunststoff';
		frauen = 0;
		maenner = 0;
		zeitTotal = 0;
		fehler = 0;
	}

	const untergrundOptions = [
		{ value: 'kunststoff', label: 'Kunststoff' },
		{ value: 'rasen', label: 'Rasen' },
		{ value: 'wiese', label: 'Wiese' }
	];
</script>

<svelte:head>
	<title>STV Pendelstafetten-Rechner</title>
</svelte:head>

<div class="page">
	<header class="page-header">
		<h1 class="page-title">Pendelstafetten-Rechner</h1>
		<p class="page-subtitle">80m Pendelstafette</p>
	</header>

	<div class="page-form">
		<Select label="Untergrund" options={untergrundOptions} bind:value={untergrund} />

		<div class="page-grid">
			<Input label="Anzahl Frauen" type="number" bind:value={frauen} min={0} placeholder="0" />
			<Input label="Anzahl Männer" type="number" bind:value={maenner} min={0} placeholder="0" />
		</div>

		<Input
			label="Zeittotal"
			type="number"
			bind:value={zeitTotal}
			min={0}
			step={0.01}
			placeholder="0.00"
			suffix="Sek."
		/>

		<Input label="Anzahl Fehler" type="number" bind:value={fehler} min={0} placeholder="0" />
	</div>

	{#if result}
		<div class="result-card">
			<p class="result-label">Note</p>
			<p class="result-note {noteColorClass(result.note)}">
				{result.note.toFixed(2)}
			</p>

			<div class="result-details">
				<div class="result-row">
					<span>Anzahl Läufer</span>
					<span class="result-value">{result.anzahlLaeufer}</span>
				</div>
				<div class="result-row">
					<span>Korrigierte Zeit</span>
					<span class="result-value">{result.korrigierteZeit.toFixed(2)} Sek.</span>
				</div>
				<div class="result-row">
					<span>Durchschnittszeit</span>
					<span class="result-value">{result.durchschnittszeit.toFixed(2)} Sek.</span>
				</div>
				{#if frauen > 0 && maenner > 0}
					<div class="result-row">
						<span>Gruppe</span>
						<span class="result-value">Mixed</span>
					</div>
				{:else if frauen > 0}
					<div class="result-row">
						<span>Gruppe</span>
						<span class="result-value">Turnerinnen</span>
					</div>
				{:else}
					<div class="result-row">
						<span>Gruppe</span>
						<span class="result-value">Turner</span>
					</div>
				{/if}
			</div>
		</div>
	{/if}

	<div class="page-actions">
		<Button onclick={reset} variant="secondary">Zurücksetzen</Button>
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
		gap: 1.25rem;
	}

	.page-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.result-card {
		margin-top: 2rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-neutral-300);
		background-color: #ffffff;
		padding: 1.5rem;
	}

	.result-label {
		text-align: center;
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--color-neutral-500);
	}

	.result-note {
		margin-top: 0.25rem;
		text-align: center;
		font-size: var(--text-xl);
		font-weight: 700;
	}

	.note-green {
		color: var(--color-success-600);
	}

	.note-yellow {
		color: var(--color-warning-600);
	}

	.note-orange {
		color: var(--color-caution-500);
	}

	.note-red {
		color: var(--color-danger-500);
	}

	.result-details {
		margin-top: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: var(--text-sm);
		color: var(--color-neutral-600);
	}

	.result-row {
		display: flex;
		justify-content: space-between;
	}

	.result-value {
		font-weight: 500;
		color: var(--color-neutral-900);
	}

	.page-actions {
		margin-top: 1.5rem;
		display: flex;
		justify-content: flex-end;
	}
</style>
