<script lang="ts">
	let {
		name,
		label,
		currentImage = null,
		library
	}: {
		name: string;
		label: string;
		currentImage?: string | null;
		library: string[];
	} = $props();

	let selectedExisting = $state<string | null>(null);
	let filePreview = $state<string | null>(null);
	let showLibrary = $state(false);
	let fileInput = $state<HTMLInputElement | undefined>(undefined);

	const previewSrc = $derived(filePreview ?? selectedExisting ?? currentImage);

	function pickExisting(url: string) {
		selectedExisting = url;
		filePreview = null;
		if (fileInput) fileInput.value = '';
		showLibrary = false;
	}

	function handleFileChange(e: Event) {
		const file = (e.target as HTMLInputElement).files?.[0];
		if (!file) return;
		selectedExisting = null;
		filePreview = URL.createObjectURL(file);
	}

	function clearSelection() {
		selectedExisting = null;
		filePreview = null;
		if (fileInput) fileInput.value = '';
	}
</script>

<div>
	<span class="block text-sm font-medium text-navy-950">{label}</span>

	<div class="mt-1.5 flex items-start gap-3">
		{#if previewSrc}
			<img src={previewSrc} alt="" class="h-20 w-20 shrink-0 border border-navy-900/10 object-cover" />
		{:else}
			<div
				class="flex h-20 w-20 shrink-0 items-center justify-center border border-navy-900/10 bg-navy-900/5 text-[10px] text-navy-800/40"
			>
				No image
			</div>
		{/if}

		<div class="flex flex-1 flex-col gap-2">
			<div class="flex flex-wrap gap-2">
				<button
					type="button"
					onclick={() => (showLibrary = !showLibrary)}
					class="border border-navy-900/20 px-3 py-1.5 text-xs text-navy-800 hover:border-brass-500 hover:text-brass-600"
				>
					{showLibrary ? 'Close library' : 'Choose from library'}
				</button>
				<label
					class="cursor-pointer border border-navy-900/20 px-3 py-1.5 text-xs text-navy-800 hover:border-brass-500 hover:text-brass-600"
				>
					Upload new
					<input
						bind:this={fileInput}
						{name}
						type="file"
						accept="image/jpeg,image/png,image/webp"
						class="hidden"
						onchange={handleFileChange}
					/>
				</label>
				{#if selectedExisting || filePreview}
					<button
						type="button"
						onclick={clearSelection}
						class="px-3 py-1.5 text-xs text-navy-800/50 hover:text-red-600"
					>
						Cancel change
					</button>
				{/if}
			</div>

			{#if showLibrary}
				<div
					class="grid max-h-64 grid-cols-4 gap-2 overflow-y-auto border border-navy-900/10 bg-sand-50 p-3 sm:grid-cols-6"
				>
					{#each library as url (url)}
						<button
							type="button"
							onclick={() => pickExisting(url)}
							class="aspect-square overflow-hidden border-2 {selectedExisting === url
								? 'border-brass-500'
								: 'border-transparent'} hover:border-brass-400"
						>
							<img src={url} alt="" class="h-full w-full object-cover" />
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<input type="hidden" name="{name}_existing" value={selectedExisting ?? ''} />
</div>
