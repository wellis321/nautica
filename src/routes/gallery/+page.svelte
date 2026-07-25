<script lang="ts">
	import BeforeAfterSlider from '$lib/components/BeforeAfterSlider.svelte';
	import { beforeAfterProjects, craftsmanshipShots } from '$lib/data/gallery';
	import { reveal } from '$lib/actions/reveal';
</script>

<svelte:head>
	<title>Gallery — Nauticare Solutions</title>
	<meta name="description" content="Before and after marine repair work, and craftsmanship detail shots from Nauticare Solutions." />
</svelte:head>

<section class="bg-navy-950 py-24 text-white">
	<div class="mx-auto max-w-4xl px-6 text-center lg:px-8">
		<p use:reveal data-reveal class="text-xs tracking-[0.3em] text-brass-400 uppercase">Gallery</p>
		<h1 use:reveal={100} data-reveal class="font-display mt-4 text-4xl sm:text-5xl">
			Real repairs, real results
		</h1>
		<p use:reveal={200} data-reveal class="mx-auto mt-5 max-w-xl text-white/70">
			Drag each slider to compare before and after. More projects will be added here as they're
			completed.
		</p>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
	<div class="grid gap-10 md:grid-cols-2">
		{#each beforeAfterProjects as project, i (project.title)}
			<div use:reveal={i * 100} data-reveal>
				<BeforeAfterSlider before={project.before} after={project.after} alt={project.title} />
				<h3 class="font-display mt-4 text-lg text-navy-950">{project.title}</h3>
				<p class="mt-1 text-sm text-navy-800/70">{project.description}</p>
			</div>
		{/each}
	</div>
</section>

<section class="bg-sand-100 py-20">
	<div class="mx-auto max-w-6xl px-6 lg:px-8">
		<div use:reveal data-reveal class="max-w-2xl">
			<p class="text-xs tracking-[0.3em] text-brass-600 uppercase">Craftsmanship</p>
			<h2 class="font-display mt-4 text-3xl text-navy-950">Finished work, up close</h2>
		</div>

		<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each craftsmanshipShots as shot, i (shot.title)}
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
