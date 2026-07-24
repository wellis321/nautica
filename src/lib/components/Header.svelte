<script lang="ts">
	import { page } from '$app/state';

	let menuOpen = $state(false);

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/services', label: 'Services' },
		{ href: '/gallery', label: 'Gallery' },
		{ href: '/about', label: 'About' },
		{ href: '/contact', label: 'Contact' }
	];

	function isActive(href: string) {
		return href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
	}
</script>

<header class="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy-950/90 backdrop-blur">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
		<a href="/" class="font-display text-lg tracking-wide text-white">
			Nautica <span class="text-brass-400">Resolutions</span>
		</a>

		<nav class="hidden items-center gap-8 md:flex">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="text-sm tracking-wide text-white/80 transition-colors hover:text-brass-400 {isActive(
						link.href
					)
						? 'text-brass-400'
						: ''}"
				>
					{link.label}
				</a>
			{/each}
			<a
				href="/contact"
				class="rounded-sm border border-brass-500 px-4 py-2 text-sm tracking-wide text-brass-400 transition-colors hover:bg-brass-500 hover:text-navy-950"
			>
				Request a Quote
			</a>
		</nav>

		<button
			class="text-white md:hidden"
			aria-label="Toggle menu"
			aria-expanded={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}
		>
			<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
				{#if menuOpen}
					<path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
				{:else}
					<path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
				{/if}
			</svg>
		</button>
	</div>

	{#if menuOpen}
		<nav class="flex flex-col gap-1 border-t border-white/10 bg-navy-950 px-6 py-4 md:hidden">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="rounded px-2 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-brass-400"
					onclick={() => (menuOpen = false)}
				>
					{link.label}
				</a>
			{/each}
			<a
				href="/contact"
				class="mt-2 rounded-sm border border-brass-500 px-4 py-2 text-center text-sm text-brass-400"
				onclick={() => (menuOpen = false)}
			>
				Request a Quote
			</a>
		</nav>
	{/if}
</header>
