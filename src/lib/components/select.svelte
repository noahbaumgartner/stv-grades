<script lang="ts">
	type Option = { value: string; label: string };

	let {
		label,
		options,
		value = $bindable('')
	}: { label: string; options: Option[]; value: string } = $props();
</script>

<div class="flex flex-col gap-1.5">
	<label for="select-{label}" class="text-sm font-medium text-gray-700">{label}</label>
	<select
		id="select-{label}"
		bind:value
		class="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
	>
		{#each options as opt}
			<option value={opt.value}>{opt.label}</option>
		{/each}
	</select>
</div>
