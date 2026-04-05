<script lang="ts">
	let {
		label,
		value = $bindable(0),
		min = 0,
		max,
		step = 1,
		placeholder = '',
		suffix = ''
	}: {
		label: string;
		value: number;
		min?: number;
		max?: number;
		step?: number;
		placeholder?: string;
		suffix?: string;
	} = $props();

	const inputId = `number-input-${Math.random().toString(36).slice(2)}`;
</script>

<div class="number-input">
	<label for={inputId} class="number-input-label">{label}</label>
	<div class="number-input-wrapper">
		<input
			id={inputId}
			type="number"
			bind:value
			{min}
			{max}
			{step}
			{placeholder}
			class="number-input-field"
		/>
		{#if suffix}
			<span class="number-input-suffix">
				{suffix}
			</span>
		{/if}
	</div>
</div>

<style>
	.number-input {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.number-input-label {
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--color-neutral-700);
	}

	.number-input-wrapper {
		position: relative;
	}

	.number-input-field {
		height: 2.5rem;
		width: 100%;
		border-radius: 0.5rem;
		border: 1px solid var(--color-neutral-300);
		background-color: white;
		padding-inline: 0.75rem;
		font-size: var(--text-sm);
		color: var(--color-neutral-900);
		outline: none;
		transition: border-color 0.15s, box-shadow 0.15s;
		appearance: textfield;
	}

	.number-input-field::-webkit-inner-spin-button,
	.number-input-field::-webkit-outer-spin-button {
		appearance: none;
	}

	.number-input-field:focus {
		border-color: var(--color-neutral-900);
		box-shadow: 0 0 0 1px var(--color-neutral-900);
	}

	.number-input-suffix {
		pointer-events: none;
		position: absolute;
		top: 50%;
		right: 0.75rem;
		transform: translateY(-50%);
		font-size: var(--text-base);
		color: var(--color-neutral-400);
	}
</style>
