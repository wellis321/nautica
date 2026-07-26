<script lang="ts">
	let { data } = $props();

	const cards = $derived([
		{ label: 'Unread Messages', value: data.unreadCount, href: '/admin/messages' },
		{ label: 'Services', value: data.serviceCount, href: '/admin/services' },
		{ label: 'Gallery Items', value: data.galleryCount, href: '/admin/gallery' }
	]);
</script>

<svelte:head>
	<title>Dashboard — Admin</title>
</svelte:head>

<h1 class="font-display text-2xl text-navy-950">Dashboard</h1>
<p class="mt-1 text-sm text-navy-800/60">Welcome back, {data.user?.name}.</p>

<div class="mt-8 grid gap-6 sm:grid-cols-3">
	{#each cards as card (card.label)}
		<a
			href={card.href}
			class="block border border-navy-900/10 bg-white p-6 transition-shadow hover:shadow-lg"
		>
			<p class="text-xs tracking-[0.2em] text-navy-700/60 uppercase">{card.label}</p>
			<p class="mt-2 font-display text-3xl text-navy-950">{card.value}</p>
		</a>
	{/each}
</div>
