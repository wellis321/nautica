<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	const isAdmin = $derived(page.url.pathname.startsWith('/admin'));
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{#if isAdmin}
	{@render children()}
{:else}
	<Header />
	<main class="pt-[73px]">
		{@render children()}
	</main>
	<Footer />
{/if}
