<script lang="ts">
	import type { Service } from '$lib/data/services';
	import ServiceIcon from './ServiceIcon.svelte';
	import { reveal } from '$lib/actions/reveal';

	let { service, delay = 0 }: { service: Service; delay?: number } = $props();
</script>

<article
	use:reveal={delay}
	data-reveal
	class="group border border-navy-900/10 bg-white p-7 transition-shadow hover:shadow-xl hover:shadow-navy-900/5"
>
	<div
		class="flex h-12 w-12 items-center justify-center bg-navy-900 text-brass-400 transition-colors group-hover:bg-brass-500 group-hover:text-navy-950"
	>
		<ServiceIcon icon={service.icon} />
	</div>
	<h3 class="font-display mt-5 text-xl text-navy-950">{service.title}</h3>
	<p class="mt-2 text-sm leading-relaxed text-navy-800/70">{service.summary}</p>
	<a
		href="/services#{service.slug}"
		class="mt-4 inline-flex items-center gap-1 text-sm text-brass-600 hover:text-brass-500"
	>
		Learn more
		<span aria-hidden="true" class="transition-transform group-hover:translate-x-1">&rarr;</span>
	</a>
</article>
