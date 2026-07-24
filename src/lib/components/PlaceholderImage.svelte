<script lang="ts">
	let {
		label = 'Placeholder image',
		class: className = '',
		variant = 'center'
	}: { label?: string; class?: string; variant?: 'center' | 'corner' } = $props();
</script>

<div
	class="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 {className}"
>
	<svg
		class="absolute -right-6 -bottom-8 h-40 w-40 text-white/10 md:h-56 md:w-56"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="0.75"
	>
		<path
			d="M12 2v20M8 5h8M4 12h16M4 12c0 4.4 3.6 8 8 8s8-3.6 8-8"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<circle cx="12" cy="4" r="1.6" />
	</svg>
	{#if variant === 'center'}
		<div class="relative z-10 flex h-full items-center justify-center px-6 text-center">
			<div>
				<p class="font-display text-sm tracking-[0.2em] text-brass-400 uppercase">{label}</p>
				<p class="mt-1 text-xs text-white/50">Client photography to be added</p>
			</div>
		</div>
	{:else}
		<div class="absolute right-4 bottom-4 z-10 text-right md:right-6 md:bottom-6">
			<p class="font-display text-xs tracking-[0.2em] text-brass-400/80 uppercase">{label}</p>
			<p class="mt-0.5 text-[11px] text-white/40">Client photography to be added</p>
		</div>
	{/if}
</div>
