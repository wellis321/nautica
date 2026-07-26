<script lang="ts">
	let { icon, class: className = 'h-7 w-7' }: { icon: string; class?: string } = $props();
</script>

<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" class={className}>
	{#if icon === 'surface'}
		<path d="M3 16h18M3 16l3-9h12l3 9M8 16v-3h8v3" stroke-linecap="round" stroke-linejoin="round" />
	{:else if icon === 'polish'}
		<path
			d="M12 3c2 3 3 6 3 9a3 3 0 11-6 0c0-3 1-6 3-9zM7 21h10"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	{:else if icon === 'decorate'}
		<path
			d="M4 20l4-1 10-10-3-3L5 16l-1 4zM14 6l3 3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	{:else if icon === 'film'}
		<rect x="4" y="5" width="16" height="14" rx="1.5" />
		<path d="M4 9h16M9 5v4" stroke-linecap="round" />
	{:else if icon === 'glass'}
		<path d="M6 4h12l-1.5 12a4.5 4.5 0 01-9 0L6 4zM9 20h6" stroke-linecap="round" stroke-linejoin="round" />
	{:else if icon === 'stone'}
		<path
			d="M4 17l2.5-7L12 6l5.5 4L20 17a2 2 0 01-2 2H6a2 2 0 01-2-2z"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	{/if}
</svg>
