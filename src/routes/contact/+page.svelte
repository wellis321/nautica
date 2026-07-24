<script lang="ts">
	import { enhance } from '$app/forms';
	import { reveal } from '$lib/actions/reveal';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let submitting = $state(false);
</script>

<svelte:head>
	<title>Contact — Nautica Resolutions</title>
	<meta name="description" content="Get in touch with Nautica Resolutions for marine surface repair and restoration enquiries." />
</svelte:head>

<section class="bg-navy-950 py-24 text-white">
	<div class="mx-auto max-w-4xl px-6 text-center lg:px-8">
		<p use:reveal data-reveal class="text-xs tracking-[0.3em] text-brass-400 uppercase">Contact</p>
		<h1 use:reveal={100} data-reveal class="font-display mt-4 text-4xl sm:text-5xl">
			Let's talk about your vessel
		</h1>
		<p use:reveal={200} data-reveal class="mx-auto mt-5 max-w-xl text-white/70">
			Tell us a little about the work you need and we'll come back to you as soon as we can.
		</p>
	</div>
</section>

<section class="mx-auto max-w-4xl px-6 py-20 lg:px-8">
	<div class="grid gap-12 md:grid-cols-5">
		<div use:reveal data-reveal class="md:col-span-2">
			<h2 class="font-display text-xl text-navy-950">Get in touch</h2>
			<dl class="mt-6 space-y-4 text-sm text-navy-800/70">
				<div>
					<dt class="font-medium text-navy-950">Email</dt>
					<dd>
						<a href="mailto:info@nauticaresolutions.co.uk" class="hover:text-brass-600">
							info@nauticaresolutions.co.uk
						</a>
					</dd>
				</div>
				<div>
					<dt class="font-medium text-navy-950">Coverage</dt>
					<dd>UK-based, available for vessels in port and drydock.</dd>
				</div>
			</dl>
		</div>

		<div use:reveal={100} data-reveal class="md:col-span-3">
			{#if form?.success}
				<div class="border border-brass-500 bg-sand-100 p-6">
					<p class="font-display text-lg text-navy-950">Thank you — message received.</p>
					<p class="mt-2 text-sm text-navy-800/70">We'll be in touch as soon as possible.</p>
				</div>
			{:else}
				<form
					method="POST"
					use:enhance={() => {
						submitting = true;
						return async ({ update }) => {
							submitting = false;
							await update();
						};
					}}
					class="space-y-5"
				>
					{#if form?.error}
						<p class="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
							{form.error}
						</p>
					{/if}

					<div>
						<label for="name" class="block text-sm font-medium text-navy-950">Name</label>
						<input
							id="name"
							name="name"
							type="text"
							required
							value={form?.name ?? ''}
							class="mt-1.5 block w-full rounded-none border-navy-900/20 focus:border-brass-500 focus:ring-brass-500"
						/>
					</div>

					<div>
						<label for="email" class="block text-sm font-medium text-navy-950">Email</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							value={form?.email ?? ''}
							class="mt-1.5 block w-full rounded-none border-navy-900/20 focus:border-brass-500 focus:ring-brass-500"
						/>
					</div>

					<div>
						<label for="message" class="block text-sm font-medium text-navy-950">
							Tell us about the work
						</label>
						<textarea
							id="message"
							name="message"
							rows="5"
							required
							class="mt-1.5 block w-full rounded-none border-navy-900/20 focus:border-brass-500 focus:ring-brass-500"
							>{form?.message ?? ''}</textarea
						>
					</div>

					<button
						type="submit"
						disabled={submitting}
						class="bg-navy-950 px-8 py-3 text-sm tracking-wide text-white transition-colors hover:bg-navy-800 disabled:opacity-60"
					>
						{submitting ? 'Sending…' : 'Send Enquiry'}
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>
