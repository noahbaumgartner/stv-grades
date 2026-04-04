<script lang="ts">
	import Select from '$lib/components/select.svelte';
	import NumberInput from '$lib/components/number-input.svelte';
	import Button from '$lib/components/button.svelte';
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

	function noteColor(note: number): string {
		if (note >= 8) return 'text-green-600';
		if (note >= 6) return 'text-yellow-600';
		if (note >= 4) return 'text-orange-500';
		return 'text-red-500';
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

<div class="mx-auto flex min-h-dvh max-w-lg flex-col px-4 py-8">
	<header class="mb-8 text-center">
		<h1 class="text-2xl font-bold text-gray-900">Pendelstafetten-Rechner</h1>
		<p class="mt-1 text-sm text-gray-500">80m Pendelstafette</p>
	</header>

	<div class="flex flex-col gap-5">
		<Select label="Untergrund" options={untergrundOptions} bind:value={untergrund} />

		<div class="grid grid-cols-2 gap-4">
			<NumberInput label="Anzahl Frauen" bind:value={frauen} min={0} placeholder="0" />
			<NumberInput label="Anzahl Männer" bind:value={maenner} min={0} placeholder="0" />
		</div>

		<NumberInput
			label="Zeittotal"
			bind:value={zeitTotal}
			min={0}
			step={0.01}
			placeholder="0.00"
			suffix="Sek."
		/>

		<NumberInput label="Anzahl Fehler" bind:value={fehler} min={0} placeholder="0" />
	</div>

	{#if result}
		<div class="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
			<p class="text-center text-sm font-medium text-gray-500">Note</p>
			<p class="mt-1 text-center text-5xl font-bold {noteColor(result.note)}">
				{result.note.toFixed(2)}
			</p>

			<div class="mt-5 space-y-2 text-sm text-gray-600">
				<div class="flex justify-between">
					<span>Anzahl Läufer</span>
					<span class="font-medium text-gray-900">{result.anzahlLaeufer}</span>
				</div>
				<div class="flex justify-between">
					<span>Korrigierte Zeit</span>
					<span class="font-medium text-gray-900">{result.korrigierteZeit.toFixed(2)} Sek.</span>
				</div>
				<div class="flex justify-between">
					<span>Durchschnittszeit</span>
					<span class="font-medium text-gray-900">{result.durchschnittszeit.toFixed(2)} Sek.</span>
				</div>
				{#if frauen > 0 && maenner > 0}
					<div class="flex justify-between">
						<span>Gruppe</span>
						<span class="font-medium text-gray-900">Mixed</span>
					</div>
				{:else if frauen > 0}
					<div class="flex justify-between">
						<span>Gruppe</span>
						<span class="font-medium text-gray-900">Turnerinnen</span>
					</div>
				{:else}
					<div class="flex justify-between">
						<span>Gruppe</span>
						<span class="font-medium text-gray-900">Turner</span>
					</div>
				{/if}
			</div>
		</div>
	{/if}

	<div class="mt-6">
		<Button onclick={reset} variant="secondary">Zurücksetzen</Button>
	</div>

	<footer class="mt-auto pt-8 text-center text-xs text-gray-400">
		Wertungstabelle Leichtathletik 2020 &mdash; STV/FSG
	</footer>
</div>
