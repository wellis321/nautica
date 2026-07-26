<script lang="ts">
	import ServiceIcon from '$lib/components/ServiceIcon.svelte';
	import PlaceholderImage from '$lib/components/PlaceholderImage.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import { reveal } from '$lib/actions/reveal';

	let { data } = $props();
</script>

<svelte:head>
	<title>Services — Nauticare Solutions</title>
	<meta
		name="description"
		content="Hard surface repairs, French polishing, decorating, IMO-certified PPF filming, glass polishing, and marble & stone restoration for marine vessels."
	/>
</svelte:head>

<PageHero
	image="/images/hero/services.jpg"
	eyebrow="Services"
	title="Six trades, one exacting standard"
	description="Every service below is carried out to the same finish standard demanded aboard the vessels we've worked on for years."
/>

<section class="mx-auto max-w-5xl px-6 py-20 lg:px-8">
	<div class="space-y-20">
		{#each data.services as service, i (service.slug)}
			<div
				id={service.slug}
				use:reveal
				data-reveal
				class="grid scroll-mt-28 items-center gap-10 md:grid-cols-2 {i % 2 === 1
					? 'md:[&>*:first-child]:order-2'
					: ''}"
			>
				{#if service.image}
					<img
						src={service.image}
						alt={service.title}
						class="aspect-4/3 w-full object-cover"
						loading="lazy"
					/>
				{:else}
					<PlaceholderImage label="{service.title} photography" class="aspect-4/3 w-full" />
				{/if}
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
