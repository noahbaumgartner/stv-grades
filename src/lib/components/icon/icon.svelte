<script lang="ts">
	import type { IconProps } from 'lucide-svelte';

	let {
		icon,
		size = 20,
		strokeWidth = 1.5,
		...rest
	}: IconProps & {
		icon: any;
	} = $props();
</script>

<svelte:component this={icon} {size} {strokeWidth} {...rest} />
