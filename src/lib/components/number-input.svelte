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

<div class="flex flex-col gap-1.5">
	<label for={inputId} class="text-xs font-medium text-gray-700">{label}</label>
	<div class="relative">
		<input
			id={inputId}
			type="number"
			bind:value
			{min}
			{max}
			{step}
			{placeholder}
			class="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
		/>
		{#if suffix}
			<span class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-base text-gray-400">
				{suffix}
			</span>
		{/if}
	</div>
</div>
