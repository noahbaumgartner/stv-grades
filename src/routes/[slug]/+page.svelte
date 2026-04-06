<script lang="ts">
	import { page } from '$app/state';
	import { Select } from '$lib/components/select';
	import { Input } from '$lib/components/input';
	import { PageHeader } from '$lib/components/page-header';
	import { getDiscipline } from '$lib/disciplines';
	import { calculateRelay, calculateIndividual } from '$lib/grading';
	import type { RelayResult, IndividualResult } from '$lib/grading';

	let discipline = $derived(getDiscipline(page.params.slug ?? ''));

	// --- Shared state ---
	let surface = $state('synthetic');
	let gender = $state<'women' | 'men'>('men');

	// --- Relay state ---
	let women = $state(0);
	let men = $state(0);
	let totalTime = $state(0);
	let errors = $state(0);

	// --- Individual state ---
	let value = $state(0);

	// Reset state when discipline changes
	let lastSlug = $state('');
	$effect(() => {
		if (discipline && discipline.slug !== lastSlug) {
			lastSlug = discipline.slug;
			surface = discipline.surfaces[0].value;
			gender = 'men';
			women = 0;
			men = 0;
			totalTime = 0;
			errors = 0;
			value = 0;
		}
	});

	// --- Surface options ---
	let surfaceOptions = $derived(
		discipline ? discipline.surfaces.map((s) => ({ value: s.value, label: s.label })) : []
	);
	let showSurface = $derived(
		discipline ? !(discipline.surfaces.length === 1 && discipline.surfaces[0].value === 'default') : false
	);

	// --- Gender options ---
	const genderOptions = [
		{ value: 'men', label: 'Turner' },
		{ value: 'women', label: 'Turnerinnen' }
	];

	// --- Results ---
	let relayResult: RelayResult | null = $derived.by(() => {
		if (!discipline || discipline.type !== 'relay') return null;
		return calculateRelay({
			discipline,
			surface,
			women,
			men,
			totalTime,
			errors
		});
	});

	let individualResult: IndividualResult | null = $derived.by(() => {
		if (!discipline || discipline.type === 'relay') return null;
		return calculateIndividual({
			discipline,
			surface: showSurface ? surface : 'default',
			gender,
			value
		});
	});

	let grade = $derived(
		discipline?.type === 'relay' ? relayResult?.grade ?? null : individualResult?.grade ?? null
	);

	function gradeColorClass(n: number): string {
		if (n >= 8) return 'grade-green';
		if (n >= 6) return 'grade-yellow';
		if (n >= 4) return 'grade-orange';
		return 'grade-red';
	}
</script>

<svelte:head>
	<title>STV {discipline?.name ?? 'Rechner'}</title>
</svelte:head>

{#if discipline}
	<PageHeader title={discipline.name} />

	<div class="page">
		<div class="page-form">
			{#if showSurface}
				<Select label="Untergrund" options={surfaceOptions} bind:value={surface} />
			{/if}

			{#if discipline.type === 'relay'}
				<div class="page-grid">
					<Input label="Anzahl Frauen" type="number" bind:value={women} min={0} placeholder="0" />
					<Input label="Anzahl Männer" type="number" bind:value={men} min={0} placeholder="0" />
				</div>

				<Input
					label={discipline.inputLabel}
					type="number"
					bind:value={totalTime}
					min={0}
					step={discipline.step}
					placeholder="0.00"
					suffix={discipline.unit}
				/>

				<Input label="Anzahl Fehler" type="number" bind:value={errors} min={0} placeholder="0" />
			{:else}
				<Select label="Geschlecht" options={genderOptions} bind:value={gender} />

				<Input
					label={discipline.inputLabel}
					type="number"
					bind:value={value}
					min={0}
					step={discipline.step}
					placeholder="0.00"
					suffix={discipline.unit}
				/>
			{/if}
		</div>

		{#if grade !== null}
			<div class="result-card">
				<p class="result-label">Note</p>
				<p class="result-grade {gradeColorClass(grade)}">
					{grade.toFixed(2)}
				</p>

				{#if discipline.type === 'relay' && relayResult}
					<div class="result-details">
						<div class="result-row">
							<span>Anzahl Läufer</span>
							<span class="result-value">{relayResult.runnerCount}</span>
						</div>
						<div class="result-row">
							<span>Korrigierte Zeit</span>
							<span class="result-value">{relayResult.correctedTime.toFixed(2)} Sek.</span>
						</div>
						<div class="result-row">
							<span>Durchschnittszeit</span>
							<span class="result-value">{relayResult.averageTime.toFixed(2)} Sek.</span>
						</div>
						<div class="result-row">
							<span>Gruppe</span>
							<span class="result-value">{relayResult.group}</span>
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>
{:else}
	<PageHeader title="Not found" />
	<div class="page">
		<p>Discipline not found.</p>
	</div>
{/if}

<style>
	.page {
		max-width: 32rem;
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		padding-inline: 1rem;
		padding-block: 2rem;
	}

	.page-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
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

	.result-grade {
		margin-top: 0.25rem;
		text-align: center;
		font-size: var(--text-xl);
		font-weight: 700;
	}

	.grade-green {
		color: var(--color-success-600);
	}

	.grade-yellow {
		color: var(--color-warning-600);
	}

	.grade-orange {
		color: var(--color-caution-500);
	}

	.grade-red {
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
</style>
