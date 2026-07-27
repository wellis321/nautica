<script lang="ts">
	import ClientStrip from '$lib/components/ClientStrip.svelte';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import BeforeAfterSlider from '$lib/components/BeforeAfterSlider.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { reveal } from '$lib/actions/reveal';

	let { data } = $props();
</script>

<Seo
	path="/"
	title="Nauticare Solutions — Marine Surface Repair &amp; Restoration"
	description="High-end marine surface repair and restoration: hard surface repairs, French polishing, decorating, PPF filming, glass polishing, marble and stone restoration."
	image="/images/hero/home.jpg"
/>

<!-- Hero -->
<section class="relative flex min-h-[92vh] items-center overflow-hidden bg-navy-950">
	<div class="absolute inset-0">
		<img
			src="/images/hero/home.jpg"
			alt=""
			class="h-full w-full object-cover"
			loading="eager"
			fetchpriority="high"
		/>
		<div
			class="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/60"
		></div>
		<div class="absolute inset-0 bg-navy-950/25"></div>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
		<p
			use:reveal
			data-reveal
			class="text-xs tracking-[0.35em] text-brass-400 uppercase"
		>
			Marine Surface Repair &amp; Restoration
		</p>
		<h1
			use:reveal={100}
			data-reveal
			class="font-display mt-5 max-w-3xl text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
		>
			Precision restoration for the finest vessels afloat
		</h1>
		<p use:reveal={200} data-reveal class="mt-6 max-w-xl text-base leading-relaxed text-white/70">
			Hard surface repairs, French polishing, decorating, IMO-certified PPF filming, glass and
			marble restoration — the trades behind the world's leading cruise and luxury fleets, now
			available direct.
		</p>
		<div use:reveal={300} data-reveal class="mt-9 flex flex-wrap gap-4">
			<a
				href="/contact"
				class="bg-brass-500 px-7 py-3 text-sm tracking-wide text-navy-950 transition-colors hover:bg-brass-400"
			>
				Request a Quote
			</a>
			<a
				href="/gallery"
				class="border border-white/30 px-7 py-3 text-sm tracking-wide text-white transition-colors hover:border-brass-400 hover:text-brass-400"
			>
				View Our Work
			</a>
		</div>
	</div>
</section>

<ClientStrip />

<!-- Services overview -->
<section class="mx-auto max-w-7xl px-6 py-24 lg:px-8">
	<div use:reveal data-reveal class="max-w-2xl">
		<p class="text-xs tracking-[0.3em] text-brass-700 uppercase">What We Do</p>
		<h2 class="font-display mt-4 text-3xl text-navy-950 sm:text-4xl">
			Six trades, one exacting standard
		</h2>
		<p class="mt-4 text-navy-800/70">
			Every repair is carried out to the finish standard our clients' vessels are held to — because
			for years, that's exactly who we've worked for.
		</p>
	</div>

	<div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.services as service, i (service.slug)}
			<ServiceCard {service} delay={i * 60} />
		{/each}
	</div>
</section>

<!-- Before / after preview -->
<section class="bg-navy-950 py-24 text-white">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div use:reveal data-reveal class="max-w-2xl">
			<p class="text-xs tracking-[0.3em] text-brass-400 uppercase">Real Repairs</p>
			<h2 class="font-display mt-4 text-3xl sm:text-4xl">See the difference, drag to compare</h2>
			<p class="mt-4 text-white/60">
				A sample of genuine repair work — drag the slider to reveal the finished result.
			</p>
		</div>

		<div class="mt-14 grid gap-10 md:grid-cols-2">
			{#each data.featuredProjects as project, i (project.id)}
				<div use:reveal={i * 100} data-reveal>
					<BeforeAfterSlider before={project.before} after={project.after} alt={project.title} />
					<h3 class="font-display mt-4 text-lg">{project.title}</h3>
					<p class="mt-1 text-sm text-white/60">{project.description}</p>
				</div>
			{/each}
		</div>

		<div use:reveal data-reveal class="mt-12 text-center">
			<a
				href="/gallery"
				class="inline-flex items-center gap-2 border border-brass-500 px-7 py-3 text-sm tracking-wide text-brass-400 transition-colors hover:bg-brass-500 hover:text-navy-950"
			>
				View Full Gallery
			</a>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
	<div use:reveal data-reveal>
		<h2 class="font-display text-3xl text-navy-950 sm:text-4xl">
			Now taking enquiries direct from owners and operators
		</h2>
		<p class="mx-auto mt-4 max-w-xl text-navy-800/70">
			After years working the world's leading fleets, Nauticare Solutions is opening its books to
			private and commercial vessel owners.
		</p>
		<a
			href="/contact"
			class="mt-8 inline-flex bg-navy-950 px-8 py-3 text-sm tracking-wide text-white transition-colors hover:bg-navy-800"
		>
			Get in Touch
		</a>
	</div>
</section>
