<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	let {
		image,
		eyebrow,
		title,
		description
	}: { image: string; eyebrow: string; title: string; description?: string } = $props();
</script>

<section class="relative overflow-hidden bg-navy-950 py-24 text-white">
	<img src={image} alt="" class="absolute inset-0 h-full w-full object-cover" loading="eager" />
	<div class="absolute inset-0 bg-navy-950/75"></div>

	<div class="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
		<p use:reveal data-reveal class="text-xs tracking-[0.3em] text-brass-400 uppercase">{eyebrow}</p>
		<h1 use:reveal={100} data-reveal class="font-display mt-4 text-4xl sm:text-5xl">{title}</h1>
		{#if description}
			<p use:reveal={200} data-reveal class="mx-auto mt-5 max-w-xl text-white/70">{description}</p>
		{/if}
	</div>
</section>
