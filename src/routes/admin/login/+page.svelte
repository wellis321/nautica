<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let submitting = $state(false);
</script>

<svelte:head>
	<title>Staff Login — Nauticare Solutions</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-navy-950 px-6">
	<div class="w-full max-w-sm">
		<p class="text-center font-display text-lg text-white">
			Nauticare <span class="text-brass-400">Solutions</span>
		</p>
		<h1 class="mt-6 text-center text-sm tracking-[0.3em] text-white/60 uppercase">Staff Login</h1>

		<form
			method="POST"
			class="mt-8 space-y-5"
			onsubmit={() => (submitting = true)}
		>
			{#if form?.error}
				<p class="border border-red-400/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
					{form.error}
				</p>
			{/if}

			<div>
				<label for="email" class="block text-sm font-medium text-white/80">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					autocomplete="username"
					value={form?.email ?? ''}
					class="mt-1.5 block w-full rounded-none border-white/20 bg-white/5 text-white focus:border-brass-500 focus:ring-brass-500"
				/>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-white/80">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					autocomplete="current-password"
					class="mt-1.5 block w-full rounded-none border-white/20 bg-white/5 text-white focus:border-brass-500 focus:ring-brass-500"
				/>
			</div>

			<button
				type="submit"
				disabled={submitting}
				class="w-full bg-brass-500 px-8 py-3 text-sm tracking-wide text-navy-950 transition-colors hover:bg-brass-400 disabled:opacity-60"
			>
				{submitting ? 'Signing in…' : 'Sign In'}
			</button>
		</form>
	</div>
</div>
