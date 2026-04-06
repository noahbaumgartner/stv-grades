<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/shuttle-relay', { replaceState: true });
	});
</script>
