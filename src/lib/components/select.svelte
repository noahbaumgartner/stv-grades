<script lang="ts">
	type Option = { value: string; label: string };

	let {
		label,
		options,
		value = $bindable('')
	}: { label: string; options: Option[]; value: string } = $props();
</script>

<div class="select">
	<label for="select-{label}" class="select-label">{label}</label>
	<select
		id="select-{label}"
		bind:value
		class="select-input"
	>
		{#each options as opt}
			<option value={opt.value}>{opt.label}</option>
		{/each}
	</select>
</div>

<style>
	.select {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.select-label {
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--color-neutral-700);
	}

	.select-input {
		height: 2.5rem;
		border-radius: 0.5rem;
		border: 1px solid var(--color-neutral-300);
		background-color: white;
		padding-inline: 0.75rem;
		font-size: var(--text-sm);
		color: var(--color-neutral-900);
		outline: none;
		transition: border-color 0.15s, box-shadow 0.15s;
	}

	.select-input:focus {
		border-color: var(--color-neutral-900);
		box-shadow: 0 0 0 1px var(--color-neutral-900);
	}
</style>
