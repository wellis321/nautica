<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	const isAdmin = $derived(page.url.pathname.startsWith('/admin'));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	{#if !isAdmin}
		{@html `<script type="application/ld+json">${JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'HomeAndConstructionBusiness',
			name: 'Nauticare Solutions',
			url: 'https://nauticaresolutions.co.uk',
			logo: 'https://nauticaresolutions.co.uk/apple-touch-icon.png',
			image: 'https://nauticaresolutions.co.uk/images/hero/home.jpg',
			description:
				'High-end marine surface repair and restoration: hard surface repairs, French polishing, decorating, IMO-certified PPF filming, glass polishing, and marble and stone restoration.',
			email: 'info@nauticaresolutions.co.uk',
			areaServed: 'United Kingdom'
		})}</script>`}
	{/if}
</svelte:head>

{#if isAdmin}
	{@render children()}
{:else}
	<Header />
	<main class="pt-[73px]">
		{@render children()}
	</main>
	<Footer />
{/if}
