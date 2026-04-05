<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		label,
		value = $bindable(''),
		suffix = '',
		...rest
	}: HTMLInputAttributes & {
		label: string;
		value?: string | number;
		suffix?: string;
	} = $props();

	const inputId = `input-${Math.random().toString(36).slice(2)}`;
</script>

<div class="input">
	<label for={inputId} class="input-label">{label}</label>
	<div class="input-wrapper">
		<input
			id={inputId}
			bind:value
			class="input-field"
			{...rest}
		/>
		{#if suffix}
			<span class="input-suffix">{suffix}</span>
		{/if}
	</div>
</div>

<style>
	.input {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.input-label {
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--color-neutral-700);
	}

	.input-wrapper {
		position: relative;
	}

	.input-field {
		width: 100%;
		border-radius: 0.375rem;
		border: 1px solid var(--color-neutral-300);
		background-color: white;
		padding: 0.625rem 1rem;
		font-size: var(--text-sm);
		color: var(--color-neutral-900);
		outline: none;
		transition: border-color 0.15s, box-shadow 0.15s;
	}

	.input-field[type='number'] {
		appearance: textfield;
	}

	.input-field[type='number']::-webkit-inner-spin-button,
	.input-field[type='number']::-webkit-outer-spin-button {
		appearance: none;
	}

	.input-field:focus {
		border-color: var(--color-neutral-900);
		box-shadow: 0 0 0 1px var(--color-neutral-900);
	}

	.input-suffix {
		pointer-events: none;
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translateY(-50%);
		font-size: var(--text-sm);
		color: var(--color-neutral-400);
	}
</style>
