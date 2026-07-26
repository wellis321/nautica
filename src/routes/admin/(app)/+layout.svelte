<script lang="ts">
	import '../../layout.css';
	import { page } from '$app/state';

	let { data, children } = $props();

	const links = [
		{ href: '/admin', label: 'Dashboard' },
		{ href: '/admin/services', label: 'Services' },
		{ href: '/admin/gallery', label: 'Gallery' },
		{ href: '/admin/messages', label: 'Messages' },
		{ href: '/admin/staff', label: 'Staff' }
	];

	function isActive(href: string) {
		return href === '/admin' ? page.url.pathname === '/admin' : page.url.pathname.startsWith(href);
	}
</script>

<div class="min-h-screen bg-sand-50">
	<header class="border-b border-navy-900/10 bg-navy-950">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
			<a href="/admin" class="font-display text-lg text-white">
				Nauticare <span class="text-brass-400">Admin</span>
			</a>
			<nav class="hidden items-center gap-6 md:flex">
				{#each links as link (link.href)}
					<a
						href={link.href}
						class="text-sm text-white/70 transition-colors hover:text-brass-400 {isActive(link.href)
							? 'text-brass-400'
							: ''}"
					>
						{link.label}
					</a>
				{/each}
			</nav>
			<div class="flex items-center gap-4">
				<a
					href="/"
					target="_blank"
					rel="noopener"
					class="flex items-center gap-1.5 border border-white/20 px-3 py-1.5 text-xs tracking-wide text-white/70 transition-colors hover:border-brass-400 hover:text-brass-400"
				>
					<span class="hidden sm:inline">View Site</span>
					<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M15 3h6v6M10 14L21 3" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</a>
				<span class="hidden text-sm text-white/50 sm:inline">{data.user?.name}</span>
				<form method="POST" action="/admin/logout">
					<button
						type="submit"
						class="border border-white/20 px-3 py-1.5 text-xs tracking-wide text-white/70 transition-colors hover:border-brass-400 hover:text-brass-400"
					>
						Log Out
					</button>
				</form>
			</div>
		</div>
		<nav class="flex gap-4 overflow-x-auto border-t border-white/10 px-6 py-2 md:hidden">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="text-xs whitespace-nowrap text-white/70 {isActive(link.href) ? 'text-brass-400' : ''}"
				>
					{link.label}
				</a>
			{/each}
		</nav>
	</header>

	<main class="mx-auto max-w-6xl px-6 py-10">
		{@render children()}
	</main>
</div>
