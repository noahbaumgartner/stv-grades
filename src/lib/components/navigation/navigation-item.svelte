<script lang="ts">
	import { Icon } from '$lib/components/icon';

	let {
		icon,
		label,
		href,
		active = false,
		collapsed = false,
		onclick
	}: {
		icon: any;
		label: string;
		href: string;
		active?: boolean;
		collapsed?: boolean;
		onclick?: () => void;
	} = $props();
</script>

<a {href} class="nav-item" class:active title={collapsed ? label : undefined} {onclick}>
	<span class="nav-item-icon">
		<Icon {icon} size={16} />
	</span>
	<span class="nav-item-label">{label}</span>
</a>

<style>
	.nav-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.5rem;
		border-radius: var(--radius-sm);
		text-decoration: none;
		font-size: var(--text-sm);
		transition: background-color 0.15s, color 0.15s;
		white-space: nowrap;
	}

	.nav-item:hover {
		background-color: #F0EEE6;
	}

	.nav-item.active {
		background-color: #F0EEE6;
	}

	.nav-item-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: var(--color-neutral-800);
		transition: transform 0.2s ease;
	}

	.nav-item:hover .nav-item-icon {
		transform: scale(1.1) rotate(-5deg);
	}

	.nav-item:active .nav-item-icon {
		transform: scale(0.9) rotate(5deg);
	}

	.nav-item-label {
		overflow: hidden;
		text-overflow: ellipsis;
		color: var(--color-neutral-800);
	}
</style>
