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
		gap: 0.25rem;
	}

	.select-label {
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--color-neutral-700);
	}

	.select-input {
		border-radius: var(--radius-md);
		border: 1px solid var(--color-neutral-300);
		background-color: white;
		padding: 0.625rem 1rem;
		font-size: var(--text-sm);
		font-family: inherit;
		color: var(--color-neutral-900);
		outline: 0;
		appearance: none;
		-webkit-appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 1rem center;
		padding-right: 2.5rem;
		transition: border-color 0.15s, box-shadow 0.15s;
	}

	@media (max-width: 768px) {
		.select-input {
			font-size: 16px;
		}
	}

	.select-input:focus {
		border-color: var(--color-neutral-900);
		box-shadow: 0 0 0 1px var(--color-neutral-900);
	}
</style>
