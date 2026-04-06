<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		text,
		position = 'right',
		children
	}: {
		text: string;
		position?: 'top' | 'right' | 'bottom' | 'left';
		children: Snippet;
	} = $props();

	let wrapperEl: HTMLDivElement;
	let tooltipStyle = $state('');
	let visible = $state(false);

	function show() {
		if (!wrapperEl) return;
		const rect = wrapperEl.getBoundingClientRect();
		const gap = 8;

		if (position === 'right') {
			tooltipStyle = `top: ${rect.top + rect.height / 2}px; left: ${rect.right + gap}px; transform: translateY(-50%);`;
		} else if (position === 'left') {
			tooltipStyle = `top: ${rect.top + rect.height / 2}px; right: ${window.innerWidth - rect.left + gap}px; transform: translateY(-50%);`;
		} else if (position === 'top') {
			tooltipStyle = `top: ${rect.top - gap}px; left: ${rect.left + rect.width / 2}px; transform: translate(-50%, -100%);`;
		} else {
			tooltipStyle = `top: ${rect.bottom + gap}px; left: ${rect.left + rect.width / 2}px; transform: translateX(-50%);`;
		}

		visible = true;
	}

	function hide() {
		visible = false;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="tooltip-trigger"
	bind:this={wrapperEl}
	onmouseenter={show}
	onmouseleave={hide}
>
	{@render children()}
</div>

{#if visible}
	<span class="tooltip" role="tooltip" style={tooltipStyle}>{text}</span>
{/if}

<style>
	.tooltip-trigger {
		display: flex;
		min-width: 0;
	}

	.tooltip {
		position: fixed;
		pointer-events: none;
		white-space: nowrap;
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius-sm);
		background-color: var(--color-neutral-800);
		color: white;
		font-size: var(--text-xs);
		font-weight: 500;
		z-index: 200;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}
</style>
