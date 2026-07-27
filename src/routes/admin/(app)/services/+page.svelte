<script lang="ts">
	import { enhance } from '$app/forms';
	import { dragReorder } from '$lib/actions/dragReorder';
	import { moveItem, persistOrder } from '$lib/reorder';
	import ImagePicker from '$lib/components/ImagePicker.svelte';

	let { data, form } = $props();

	let editingId = $state<number | 'new' | null>(null);
	let orderedServices = $state(data.services);

	$effect(() => {
		orderedServices = data.services;
	});

	function handleReorderDrop(draggedId: number, targetId: number) {
		orderedServices = moveItem(orderedServices, draggedId, targetId);
		persistOrder('?/reorder', orderedServices.map((s) => s.id));
	}

	const icons = ['surface', 'polish', 'decorate', 'film', 'glass', 'stone'];
</script>

<svelte:head>
	<title>Services — Admin</title>
</svelte:head>

<div class="flex items-center justify-between">
	<h1 class="font-display text-2xl text-navy-950">Services</h1>
	<button
		type="button"
		onclick={() => (editingId = editingId === 'new' ? null : 'new')}
		class="bg-navy-950 px-4 py-2 text-sm text-white hover:bg-navy-800"
	>
		{editingId === 'new' ? 'Cancel' : '+ Add Service'}
	</button>
</div>

{#if form?.error}
	<p class="mt-4 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{form.error}</p>
{/if}

{#if editingId === 'new'}
	<form
		method="POST"
		action="?/save"
		enctype="multipart/form-data"
		use:enhance={() => async ({ update }) => {
			editingId = null;
			await update();
		}}
		class="mt-6 space-y-4 border border-navy-900/10 bg-white p-6"
	>
		<h2 class="font-display text-lg text-navy-950">New Service</h2>
		<div class="grid gap-4 sm:grid-cols-2">
			<div>
				<label class="block text-sm font-medium text-navy-950" for="new-title">Title</label>
				<input id="new-title" name="title" required class="mt-1 block w-full border-navy-900/20" />
			</div>
			<div>
				<label class="block text-sm font-medium text-navy-950" for="new-slug">Slug</label>
				<input id="new-slug" name="slug" required class="mt-1 block w-full border-navy-900/20" />
			</div>
		</div>
		<div>
			<label class="block text-sm font-medium text-navy-950" for="new-summary">Summary</label>
			<input id="new-summary" name="summary" required class="mt-1 block w-full border-navy-900/20" />
		</div>
		<div>
			<label class="block text-sm font-medium text-navy-950" for="new-description">Description</label>
			<textarea
				id="new-description"
				name="description"
				rows="4"
				required
				class="mt-1 block w-full border-navy-900/20"
			></textarea>
		</div>
		<div>
			<label class="block text-sm font-medium text-navy-950" for="new-icon">Icon</label>
			<select id="new-icon" name="icon" required class="mt-1 block w-full border-navy-900/20">
				{#each icons as icon (icon)}
					<option value={icon}>{icon}</option>
				{/each}
			</select>
		</div>
		<ImagePicker name="image" label="Image" library={data.imageLibrary} />
		<button type="submit" class="bg-brass-500 px-6 py-2 text-sm text-navy-950 hover:bg-brass-400">
			Create Service
		</button>
	</form>
{/if}

<p class="mt-8 text-xs text-navy-800/50">Drag items by the handle to reorder.</p>
<div class="mt-2 space-y-4">
	{#each orderedServices as service (service.id)}
		<div
			use:dragReorder={{ id: service.id, onDrop: handleReorderDrop }}
			class="border border-navy-900/10 bg-white p-6 transition-shadow"
		>
			<div class="flex items-start justify-between gap-4">
				<div class="flex items-start gap-4">
					<span
						class="mt-1 shrink-0 cursor-grab text-navy-800/30 select-none active:cursor-grabbing"
						title="Drag to reorder"
						aria-hidden="true"
					>
						<svg width="12" height="20" viewBox="0 0 12 20" fill="currentColor">
							<circle cx="3" cy="3" r="1.5" /><circle cx="9" cy="3" r="1.5" />
							<circle cx="3" cy="10" r="1.5" /><circle cx="9" cy="10" r="1.5" />
							<circle cx="3" cy="17" r="1.5" /><circle cx="9" cy="17" r="1.5" />
						</svg>
					</span>
					{#if service.image}
						<img src={service.image} alt={service.title} class="h-16 w-16 object-cover" />
					{:else}
						<div class="flex h-16 w-16 items-center justify-center bg-navy-900/5 text-xs text-navy-800/40">
							No image
						</div>
					{/if}
					<div>
						<p class="font-display text-lg text-navy-950">{service.title}</p>
						<p class="text-sm text-navy-800/60">{service.summary}</p>
						<p class="mt-1 text-xs text-navy-800/40">/{service.slug} · {service.icon}</p>
					</div>
				</div>
				<div class="flex shrink-0 gap-2">
					<button
						type="button"
						onclick={() => (editingId = editingId === service.id ? null : service.id)}
						class="border border-navy-900/20 px-3 py-1.5 text-xs text-navy-800 hover:border-brass-500 hover:text-brass-600"
					>
						{editingId === service.id ? 'Cancel' : 'Edit'}
					</button>
					<form
						method="POST"
						action="?/delete"
						use:enhance={() => {
							if (!confirm(`Delete "${service.title}"?`)) return async () => {};
						}}
					>
						<input type="hidden" name="id" value={service.id} />
						<button
							type="submit"
							class="border border-red-300 px-3 py-1.5 text-xs text-red-700 hover:bg-red-50"
						>
							Delete
						</button>
					</form>
				</div>
			</div>

			{#if editingId === service.id}
				<form
					method="POST"
					action="?/save"
					enctype="multipart/form-data"
					use:enhance={() => async ({ update }) => {
						editingId = null;
						await update();
					}}
					class="mt-6 space-y-4 border-t border-navy-900/10 pt-6"
				>
					<input type="hidden" name="id" value={service.id} />
					<div class="grid gap-4 sm:grid-cols-2">
						<div>
							<label class="block text-sm font-medium text-navy-950" for="title-{service.id}">Title</label>
							<input
								id="title-{service.id}"
								name="title"
								required
								value={service.title}
								class="mt-1 block w-full border-navy-900/20"
							/>
						</div>
						<div>
							<label class="block text-sm font-medium text-navy-950" for="slug-{service.id}">Slug</label>
							<input
								id="slug-{service.id}"
								name="slug"
								required
								value={service.slug}
								class="mt-1 block w-full border-navy-900/20"
							/>
						</div>
					</div>
					<div>
						<label class="block text-sm font-medium text-navy-950" for="summary-{service.id}">Summary</label>
						<input
							id="summary-{service.id}"
							name="summary"
							required
							value={service.summary}
							class="mt-1 block w-full border-navy-900/20"
						/>
					</div>
					<div>
						<label class="block text-sm font-medium text-navy-950" for="description-{service.id}">
							Description
						</label>
						<textarea
							id="description-{service.id}"
							name="description"
							rows="4"
							required
							class="mt-1 block w-full border-navy-900/20">{service.description}</textarea
						>
					</div>
					<div>
						<label class="block text-sm font-medium text-navy-950" for="icon-{service.id}">Icon</label>
						<select
							id="icon-{service.id}"
							name="icon"
							required
							class="mt-1 block w-full border-navy-900/20 sm:max-w-xs"
						>
							{#each icons as icon (icon)}
								<option value={icon} selected={icon === service.icon}>{icon}</option>
							{/each}
						</select>
					</div>
					<ImagePicker
						name="image"
						label="Image"
						currentImage={service.image}
						library={data.imageLibrary}
					/>
					<button type="submit" class="bg-brass-500 px-6 py-2 text-sm text-navy-950 hover:bg-brass-400">
						Save Changes
					</button>
				</form>
			{/if}
		</div>
	{/each}
</div>
