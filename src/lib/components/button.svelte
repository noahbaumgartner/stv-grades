<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		onclick,
		variant = 'primary',
		children
	}: {
		onclick?: () => void;
		variant?: 'primary' | 'secondary';
		children: Snippet;
	} = $props();
</script>

<button
	{onclick}
	class="h-10 cursor-pointer rounded-lg px-4 text-sm font-medium transition active:scale-[0.98]
		{variant === 'primary'
		? 'bg-gray-900 text-white hover:bg-gray-800'
		: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}"
>
	{@render children()}
</button>
