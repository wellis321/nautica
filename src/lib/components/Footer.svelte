<script lang="ts">
	const year = new Date().getFullYear();
</script>

<footer class="bg-navy-950 text-white/70">
	<div class="mx-auto max-w-7xl px-6 py-14 lg:px-8">
		<div class="grid gap-10 md:grid-cols-3">
			<div>
				<p class="font-display text-lg text-white">
					Nauticare <span class="text-brass-400">Solutions</span>
				</p>
				<p class="mt-3 max-w-xs text-sm leading-relaxed">
					Marine surface repair and restoration specialists — hard surfaces, French polishing,
					decorating, PPF filming, glass and stone.
				</p>
			</div>

			<div>
				<p class="font-display text-sm tracking-[0.2em] text-brass-400 uppercase">Navigate</p>
				<ul class="mt-4 space-y-2 text-sm">
					<li><a href="/services" class="hover:text-brass-400">Services</a></li>
					<li><a href="/gallery" class="hover:text-brass-400">Gallery</a></li>
					<li><a href="/about" class="hover:text-brass-400">About</a></li>
					<li><a href="/contact" class="hover:text-brass-400">Contact</a></li>
				</ul>
			</div>

			<div>
				<p class="font-display text-sm tracking-[0.2em] text-brass-400 uppercase">Contact</p>
				<ul class="mt-4 space-y-2 text-sm">
					<li>
						<a href="mailto:info@nauticaresolutions.co.uk" class="hover:text-brass-400">
							info@nauticaresolutions.co.uk
						</a>
					</li>
					<li>United Kingdom</li>
				</ul>
			</div>
		</div>

		<div
			class="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between"
		>
			<p>&copy; {year} Nauticare Solutions. All rights reserved.</p>
			<a href="/admin/login" class="text-white/50 hover:text-white/75">Staff Login</a>
		</div>
	</div>
</footer>
