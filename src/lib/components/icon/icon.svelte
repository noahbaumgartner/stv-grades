<script lang="ts">
	import type { Component } from 'svelte';
	import type { IconProps } from 'lucide-svelte';

	let {
		icon,
		size = 20,
		strokeWidth = 1.75,
		...rest
	}: IconProps & {
		icon: Component<IconProps>;
	} = $props();
</script>

<svelte:component this={icon} {size} {strokeWidth} {...rest} />
