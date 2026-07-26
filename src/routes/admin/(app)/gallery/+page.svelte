<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	let editingProjectId = $state<number | 'new' | null>(null);
	let editingShotId = $state<number | 'new' | null>(null);
</script>

<svelte:head>
	<title>Gallery — Admin</title>
</svelte:head>

<h1 class="font-display text-2xl text-navy-950">Gallery</h1>

{#if form?.error}
	<p class="mt-4 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{form.error}</p>
{/if}

<!-- Before / After pairs -->
<section class="mt-10">
	<div class="flex items-center justify-between">
		<h2 class="font-display text-xl text-navy-950">Before / After Pairs</h2>
		<button
			type="button"
			onclick={() => (editingProjectId = editingProjectId === 'new' ? null : 'new')}
			class="bg-navy-950 px-4 py-2 text-sm text-white hover:bg-navy-800"
		>
			{editingProjectId === 'new' ? 'Cancel' : '+ Add Pair'}
		</button>
	</div>

	{#if editingProjectId === 'new'}
		<form
			method="POST"
			action="?/saveProject"
			enctype="multipart/form-data"
			use:enhance={() => async ({ update }) => {
				editingProjectId = null;
				await update();
			}}
			class="mt-4 space-y-4 border border-navy-900/10 bg-white p-6"
		>
			<div>
				<label class="block text-sm font-medium text-navy-950" for="new-p-title">Title</label>
				<input id="new-p-title" name="title" required class="mt-1 block w-full border-navy-900/20" />
			</div>
			<div>
				<label class="block text-sm font-medium text-navy-950" for="new-p-description">Description</label>
				<input
					id="new-p-description"
					name="description"
					required
					class="mt-1 block w-full border-navy-900/20"
				/>
			</div>
			<div class="grid gap-4 sm:grid-cols-2">
				<div>
					<label class="block text-sm font-medium text-navy-950" for="new-p-before">Before image</label>
					<input
						id="new-p-before"
						name="before"
						type="file"
						required
						accept="image/jpeg,image/png,image/webp"
						class="mt-1 block w-full text-sm"
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-navy-950" for="new-p-after">After image</label>
					<input
						id="new-p-after"
						name="after"
						type="file"
						required
						accept="image/jpeg,image/png,image/webp"
						class="mt-1 block w-full text-sm"
					/>
				</div>
			</div>
			<label class="flex items-center gap-2 text-sm text-navy-950">
				<input type="checkbox" name="featured" class="border-navy-900/20" />
				Feature on homepage
			</label>
			<button type="submit" class="bg-brass-500 px-6 py-2 text-sm text-navy-950 hover:bg-brass-400">
				Create Pair
			</button>
		</form>
	{/if}

	<div class="mt-6 space-y-4">
		{#each data.projects as project (project.id)}
			<div class="border border-navy-900/10 bg-white p-6">
				<div class="flex items-start justify-between gap-4">
					<div class="flex items-start gap-3">
						<img src={project.before} alt="{project.title} before" class="h-16 w-16 object-cover" />
						<img src={project.after} alt="{project.title} after" class="h-16 w-16 object-cover" />
						<div>
							<p class="font-display text-lg text-navy-950">{project.title}</p>
							<p class="text-sm text-navy-800/60">{project.description}</p>
							{#if project.featured}
								<span class="mt-1 inline-block bg-brass-500/20 px-2 py-0.5 text-xs text-brass-700">
									Featured on homepage
								</span>
							{/if}
						</div>
					</div>
					<div class="flex shrink-0 gap-2">
						<button
							type="button"
							onclick={() => (editingProjectId = editingProjectId === project.id ? null : project.id)}
							class="border border-navy-900/20 px-3 py-1.5 text-xs text-navy-800 hover:border-brass-500 hover:text-brass-600"
						>
							{editingProjectId === project.id ? 'Cancel' : 'Edit'}
						</button>
						<form
							method="POST"
							action="?/deleteProject"
							use:enhance={() => {
								if (!confirm(`Delete "${project.title}"?`)) return async () => {};
							}}
						>
							<input type="hidden" name="id" value={project.id} />
							<button
								type="submit"
								class="border border-red-300 px-3 py-1.5 text-xs text-red-700 hover:bg-red-50"
							>
								Delete
							</button>
						</form>
					</div>
				</div>

				{#if editingProjectId === project.id}
					<form
						method="POST"
						action="?/saveProject"
						enctype="multipart/form-data"
						use:enhance={() => async ({ update }) => {
							editingProjectId = null;
							await update();
						}}
						class="mt-6 space-y-4 border-t border-navy-900/10 pt-6"
					>
						<input type="hidden" name="id" value={project.id} />
						<div>
							<label class="block text-sm font-medium text-navy-950" for="title-{project.id}">Title</label>
							<input
								id="title-{project.id}"
								name="title"
								required
								value={project.title}
								class="mt-1 block w-full border-navy-900/20"
							/>
						</div>
						<div>
							<label class="block text-sm font-medium text-navy-950" for="description-{project.id}">
								Description
							</label>
							<input
								id="description-{project.id}"
								name="description"
								required
								value={project.description}
								class="mt-1 block w-full border-navy-900/20"
							/>
						</div>
						<div class="grid gap-4 sm:grid-cols-2">
							<div>
								<label class="block text-sm font-medium text-navy-950" for="before-{project.id}">
									Replace before image
								</label>
								<input
									id="before-{project.id}"
									name="before"
									type="file"
									accept="image/jpeg,image/png,image/webp"
									class="mt-1 block w-full text-sm"
								/>
							</div>
							<div>
								<label class="block text-sm font-medium text-navy-950" for="after-{project.id}">
									Replace after image
								</label>
								<input
									id="after-{project.id}"
									name="after"
									type="file"
									accept="image/jpeg,image/png,image/webp"
									class="mt-1 block w-full text-sm"
								/>
							</div>
						</div>
						<label class="flex items-center gap-2 text-sm text-navy-950">
							<input type="checkbox" name="featured" checked={project.featured} class="border-navy-900/20" />
							Feature on homepage
						</label>
						<button type="submit" class="bg-brass-500 px-6 py-2 text-sm text-navy-950 hover:bg-brass-400">
							Save Changes
						</button>
					</form>
				{/if}
			</div>
		{/each}
	</div>
</section>

<!-- Craftsmanship shots -->
<section class="mt-14">
	<div class="flex items-center justify-between">
		<h2 class="font-display text-xl text-navy-950">Craftsmanship Shots</h2>
		<button
			type="button"
			onclick={() => (editingShotId = editingShotId === 'new' ? null : 'new')}
			class="bg-navy-950 px-4 py-2 text-sm text-white hover:bg-navy-800"
		>
			{editingShotId === 'new' ? 'Cancel' : '+ Add Shot'}
		</button>
	</div>

	{#if editingShotId === 'new'}
		<form
			method="POST"
			action="?/saveShot"
			enctype="multipart/form-data"
			use:enhance={() => async ({ update }) => {
				editingShotId = null;
				await update();
			}}
			class="mt-4 space-y-4 border border-navy-900/10 bg-white p-6"
		>
			<div>
				<label class="block text-sm font-medium text-navy-950" for="new-s-title">Title</label>
				<input id="new-s-title" name="title" required class="mt-1 block w-full border-navy-900/20" />
			</div>
			<div>
				<label class="block text-sm font-medium text-navy-950" for="new-s-description">Description</label>
				<input
					id="new-s-description"
					name="description"
					required
					class="mt-1 block w-full border-navy-900/20"
				/>
			</div>
			<div>
				<label class="block text-sm font-medium text-navy-950" for="new-s-image">Image</label>
				<input
					id="new-s-image"
					name="image"
					type="file"
					required
					accept="image/jpeg,image/png,image/webp"
					class="mt-1 block w-full text-sm"
				/>
			</div>
			<button type="submit" class="bg-brass-500 px-6 py-2 text-sm text-navy-950 hover:bg-brass-400">
				Create Shot
			</button>
		</form>
	{/if}

	<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.shots as shot (shot.id)}
			<div class="border border-navy-900/10 bg-white p-4">
				<img src={shot.image} alt={shot.title} class="aspect-4/3 w-full object-cover" />
				<p class="mt-3 font-display text-navy-950">{shot.title}</p>
				<p class="mt-1 text-sm text-navy-800/60">{shot.description}</p>
				<div class="mt-3 flex gap-2">
					<button
						type="button"
						onclick={() => (editingShotId = editingShotId === shot.id ? null : shot.id)}
						class="border border-navy-900/20 px-3 py-1.5 text-xs text-navy-800 hover:border-brass-500 hover:text-brass-600"
					>
						{editingShotId === shot.id ? 'Cancel' : 'Edit'}
					</button>
					<form
						method="POST"
						action="?/deleteShot"
						use:enhance={() => {
							if (!confirm(`Delete "${shot.title}"?`)) return async () => {};
						}}
					>
						<input type="hidden" name="id" value={shot.id} />
						<button
							type="submit"
							class="border border-red-300 px-3 py-1.5 text-xs text-red-700 hover:bg-red-50"
						>
							Delete
						</button>
					</form>
				</div>

				{#if editingShotId === shot.id}
					<form
						method="POST"
						action="?/saveShot"
						enctype="multipart/form-data"
						use:enhance={() => async ({ update }) => {
							editingShotId = null;
							await update();
						}}
						class="mt-4 space-y-3 border-t border-navy-900/10 pt-4"
					>
						<input type="hidden" name="id" value={shot.id} />
						<input name="title" required value={shot.title} class="block w-full border-navy-900/20 text-sm" />
						<input
							name="description"
							required
							value={shot.description}
							class="block w-full border-navy-900/20 text-sm"
						/>
						<input
							name="image"
							type="file"
							accept="image/jpeg,image/png,image/webp"
							class="block w-full text-xs"
						/>
						<button type="submit" class="bg-brass-500 px-4 py-1.5 text-xs text-navy-950 hover:bg-brass-400">
							Save
						</button>
					</form>
				{/if}
			</div>
		{/each}
	</div>
</section>
