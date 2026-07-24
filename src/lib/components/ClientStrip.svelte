<script lang="ts">
	import { onMount } from 'svelte';
	import { clients } from '$lib/data/clients';

	let reducedMotion = $state(false);

	onMount(() => {
		const query = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = query.matches;
	});
</script>

<div class="border-y border-navy-800/10 bg-sand-100 py-10">
	<p class="text-center text-xs tracking-[0.3em] text-navy-700/60 uppercase">
		Trusted by crews and refit teams working for
	</p>

	{#if reducedMotion}
		<ul class="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6">
			{#each clients as client (client)}
				<li class="font-display text-lg tracking-wide whitespace-nowrap text-navy-800/70 md:text-xl">
					{client}
				</li>
			{/each}
		</ul>
	{:else}
		<div class="group relative mt-6 overflow-hidden">
			<div
				class="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-sand-100 to-transparent md:w-32"
			></div>
			<div
				class="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-sand-100 to-transparent md:w-32"
			></div>

			<div class="marquee flex w-max items-center group-hover:[animation-play-state:paused]">
				{#each [0, 1] as copy (copy)}
					<ul class="flex items-center" aria-hidden={copy === 1}>
						{#each clients as client (client)}
							<li class="flex items-center">
								<span
									class="font-display px-8 text-lg tracking-wide whitespace-nowrap text-navy-800/70 transition-colors hover:text-navy-950 md:text-xl"
								>
									{client}
								</span>
								<span class="h-1 w-1 rotate-45 bg-brass-500/60" aria-hidden="true"></span>
							</li>
						{/each}
					</ul>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.marquee {
		animation: marquee 36s linear infinite;
	}

	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}
</style>
