<script lang="ts">
	import BeforeAfterSlider from '$lib/components/BeforeAfterSlider.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { reveal } from '$lib/actions/reveal';

	let { data } = $props();

	// Keep the grid from ending on a lone single-item row: if the count is
	// odd, break the final three into a 3-up row instead of 2-up + 1.
	const oddTail = $derived(data.projects.length % 2 === 1 && data.projects.length >= 3);
	const mainProjects = $derived(oddTail ? data.projects.slice(0, -3) : data.projects);
	const tailProjects = $derived(oddTail ? data.projects.slice(-3) : []);
</script>

<Seo
	path="/gallery"
	title="Gallery — Nauticare Solutions"
	description="Before and after marine repair work, and craftsmanship detail shots from Nauticare Solutions."
	image="/images/hero/gallery.jpg"
/>

<PageHero
	image="/images/hero/gallery.jpg"
	eyebrow="Gallery"
	title="Real repairs, real results"
	description="Drag each slider to compare before and after. More projects will be added here as they're completed."
/>

<section class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
	<div class="grid gap-10 md:grid-cols-2">
		{#each mainProjects as project, i (project.id)}
			<div use:reveal={i * 100} data-reveal>
				<BeforeAfterSlider before={project.before} after={project.after} alt={project.title} />
				<h3 class="font-display mt-4 text-lg text-navy-950">{project.title}</h3>
				<p class="mt-1 text-sm text-navy-800/70">{project.description}</p>
			</div>
		{/each}
	</div>

	{#if tailProjects.length > 0}
		<div class="mt-10 grid gap-10 md:grid-cols-3">
			{#each tailProjects as project, i (project.id)}
				<div use:reveal={i * 100} data-reveal>
					<BeforeAfterSlider before={project.before} after={project.after} alt={project.title} />
					<h3 class="font-display mt-4 text-lg text-navy-950">{project.title}</h3>
					<p class="mt-1 text-sm text-navy-800/70">{project.description}</p>
				</div>
			{/each}
		</div>
	{/if}
</section>

<section class="bg-sand-100 py-20">
	<div class="mx-auto max-w-6xl px-6 lg:px-8">
		<div use:reveal data-reveal class="max-w-2xl">
			<p class="text-xs tracking-[0.3em] text-brass-700 uppercase">Craftsmanship</p>
			<h2 class="font-display mt-4 text-3xl text-navy-950">Finished work, up close</h2>
		</div>

		<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.shots as shot, i (shot.id)}
				<figure use:reveal={i * 80} data-reveal class="group overflow-hidden bg-navy-950">
					<div class="aspect-4/3 overflow-hidden">
						<img
							src={shot.image}
							alt={shot.title}
							class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
							loading="lazy"
						/>
					</div>
					<figcaption class="p-4">
						<p class="font-display text-white">{shot.title}</p>
						<p class="mt-1 text-sm text-white/60">{shot.description}</p>
					</figcaption>
				</figure>
			{/each}
		</div>
	</div>
</section>
