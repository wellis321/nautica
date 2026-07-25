<script lang="ts">
	import PlaceholderImage from '$lib/components/PlaceholderImage.svelte';
	import { clients } from '$lib/data/clients';
	import { reveal } from '$lib/actions/reveal';
</script>

<svelte:head>
	<title>About — Nauticare Solutions</title>
	<meta
		name="description"
		content="Nauticare Solutions: marine surface repair specialists with a track record aboard the world's leading cruise and luxury fleets."
	/>
</svelte:head>

<section class="bg-navy-950 py-24 text-white">
	<div class="mx-auto max-w-4xl px-6 text-center lg:px-8">
		<p use:reveal data-reveal class="text-xs tracking-[0.3em] text-brass-400 uppercase">About</p>
		<h1 use:reveal={100} data-reveal class="font-display mt-4 text-4xl sm:text-5xl">
			Trades proven on the world's finest fleets
		</h1>
	</div>
</section>

<section class="mx-auto max-w-5xl px-6 py-20 lg:px-8">
	<div class="grid items-center gap-12 md:grid-cols-2">
		<div use:reveal data-reveal>
			<p class="text-xs tracking-[0.3em] text-brass-600 uppercase">Our Story</p>
			<h2 class="font-display mt-4 text-3xl text-navy-950">Placeholder — company history</h2>
			<div class="mt-4 space-y-4 leading-relaxed text-navy-800/70">
				<p>
					Nauticare Solutions brings together specialist trades — hard surface repair, French
					polishing, decorating, PPF filming, glass polishing, and marble and stone restoration —
					honed over years working aboard some of the world's leading cruise and luxury vessels.
				</p>
				<p>
					Placeholder copy: this section should be replaced with the founder's own account of how
					the business started, the team's background, and what sets Nauticare Solutions apart.
				</p>
			</div>
		</div>
		<PlaceholderImage label="Team / workshop photography" class="aspect-4/3 w-full" />
	</div>
</section>

<section class="bg-sand-100 py-20">
	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<div use:reveal data-reveal class="max-w-2xl">
			<p class="text-xs tracking-[0.3em] text-brass-600 uppercase">Certification</p>
			<h2 class="font-display mt-4 text-3xl text-navy-950">IMO Certified PPF Filming</h2>
			<p class="mt-4 text-navy-800/70">
				Our paint protection film application is carried out to IMO (International Maritime
				Organization) certification standards, giving operators confidence the work meets marine
				industry requirements.
			</p>
		</div>
	</div>
</section>

<section class="mx-auto max-w-5xl px-6 py-20 lg:px-8">
	<div use:reveal data-reveal class="max-w-2xl">
		<p class="text-xs tracking-[0.3em] text-brass-600 uppercase">Track Record</p>
		<h2 class="font-display mt-4 text-3xl text-navy-950">Work carried out for</h2>
		<p class="mt-4 text-navy-800/70">
			Our trades have been trusted aboard vessels operated by the fleets below, either directly or
			as part of a refit and maintenance contractor team.
		</p>
	</div>

	<ul class="mt-10 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
		{#each clients as client, i (client)}
			<li use:reveal={i * 40} data-reveal class="group border-b border-navy-900/10 py-7 text-center">
				<span class="font-display relative inline-block text-lg text-navy-900 md:text-xl">
					{client}
					<span
						class="absolute -bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-brass-500 transition-all duration-300 group-hover:w-full"
					></span>
				</span>
			</li>
		{/each}
	</ul>
</section>

<section class="bg-navy-950 py-20 text-center text-white">
	<div use:reveal data-reveal class="mx-auto max-w-2xl px-6">
		<h2 class="font-display text-3xl">Now available for private and commercial enquiries</h2>
		<a
			href="/contact"
			class="mt-8 inline-flex bg-brass-500 px-8 py-3 text-sm tracking-wide text-navy-950 transition-colors hover:bg-brass-400"
		>
			Get in Touch
		</a>
	</div>
</section>
