<script lang="ts">
	import { services } from '$lib/data/services';
	import ServiceIcon from '$lib/components/ServiceIcon.svelte';
	import PlaceholderImage from '$lib/components/PlaceholderImage.svelte';
	import { reveal } from '$lib/actions/reveal';
</script>

<svelte:head>
	<title>Services — Nauticare Solutions</title>
	<meta
		name="description"
		content="Hard surface repairs, French polishing, decorating, IMO-certified PPF filming, glass polishing, and marble & stone restoration for marine vessels."
	/>
</svelte:head>

<section class="bg-navy-950 py-24 text-white">
	<div class="mx-auto max-w-4xl px-6 text-center lg:px-8">
		<p use:reveal data-reveal class="text-xs tracking-[0.3em] text-brass-400 uppercase">Services</p>
		<h1 use:reveal={100} data-reveal class="font-display mt-4 text-4xl sm:text-5xl">
			Six trades, one exacting standard
		</h1>
		<p use:reveal={200} data-reveal class="mx-auto mt-5 max-w-xl text-white/70">
			Every service below is carried out to the same finish standard demanded aboard the vessels
			we've worked on for years.
		</p>
	</div>
</section>

<section class="mx-auto max-w-5xl px-6 py-20 lg:px-8">
	<div class="space-y-20">
		{#each services as service, i (service.slug)}
			<div
				id={service.slug}
				use:reveal
				data-reveal
				class="grid scroll-mt-28 items-center gap-10 md:grid-cols-2 {i % 2 === 1
					? 'md:[&>*:first-child]:order-2'
					: ''}"
			>
				<PlaceholderImage label="{service.title} photography" class="aspect-4/3 w-full" />
				<div>
					<div class="flex h-12 w-12 items-center justify-center bg-navy-900 text-brass-400">
						<ServiceIcon icon={service.icon} />
					</div>
					<h2 class="font-display mt-5 text-2xl text-navy-950">{service.title}</h2>
					<p class="mt-3 leading-relaxed text-navy-800/70">{service.description}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<section class="bg-sand-100 py-20 text-center">
	<div use:reveal data-reveal class="mx-auto max-w-2xl px-6">
		<h2 class="font-display text-3xl text-navy-950">Not sure which service you need?</h2>
		<p class="mt-4 text-navy-800/70">
			Send us a few photos of the damage and we'll come back with a recommendation and a quote.
		</p>
		<a
			href="/contact"
			class="mt-8 inline-flex bg-navy-950 px-8 py-3 text-sm tracking-wide text-white transition-colors hover:bg-navy-800"
		>
			Get in Touch
		</a>
	</div>
</section>
