<script lang="ts">
	let {
		before,
		after,
		beforeLabel = 'Before',
		afterLabel = 'After',
		alt = ''
	}: {
		before: string;
		after: string;
		beforeLabel?: string;
		afterLabel?: string;
		alt?: string;
	} = $props();

	let position = $state(50);
	let container: HTMLDivElement;
	let dragging = false;

	function setFromClientX(clientX: number) {
		const rect = container.getBoundingClientRect();
		const ratio = (clientX - rect.left) / rect.width;
		position = Math.min(100, Math.max(0, ratio * 100));
	}

	function onPointerDown(event: PointerEvent) {
		dragging = true;
		(event.target as HTMLElement).setPointerCapture(event.pointerId);
		setFromClientX(event.clientX);
	}

	function onPointerMove(event: PointerEvent) {
		if (!dragging) return;
		setFromClientX(event.clientX);
	}

	function onPointerUp() {
		dragging = false;
	}
</script>

<div
	bind:this={container}
	class="relative aspect-4/3 w-full touch-none overflow-hidden rounded-sm bg-navy-900 select-none"
	onpointerdown={onPointerDown}
	onpointermove={onPointerMove}
	onpointerup={onPointerUp}
	onpointercancel={onPointerUp}
	role="group"
	aria-label="Before and after comparison, drag to reveal"
>
	<img src={after} alt="{alt} — after" class="absolute inset-0 h-full w-full object-cover" draggable="false" />

	<div
		class="absolute inset-0 h-full w-full overflow-hidden"
		style="clip-path: inset(0 {100 - position}% 0 0)"
	>
		<img
			src={before}
			alt="{alt} — before"
			class="absolute inset-0 h-full w-full object-cover"
			draggable="false"
		/>
	</div>

	<span
		class="pointer-events-none absolute top-3 left-3 bg-navy-950/70 px-2 py-1 text-[11px] tracking-widest text-white uppercase"
		>{beforeLabel}</span
	>
	<span
		class="pointer-events-none absolute top-3 right-3 bg-brass-500/90 px-2 py-1 text-[11px] tracking-widest text-navy-950 uppercase"
		>{afterLabel}</span
	>

	<div
		class="pointer-events-none absolute top-0 bottom-0 w-0.5 bg-white/80"
		style="left: {position}%"
	>
		<div
			class="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md"
		>
			<svg class="h-4 w-4 text-navy-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M8 7l-5 5 5 5M16 7l5 5-5 5" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</div>
	</div>

	<input
		type="range"
		min="0"
		max="100"
		bind:value={position}
		class="absolute inset-x-0 bottom-2 mx-auto w-11/12 opacity-0 focus:opacity-100"
		aria-label="Comparison slider position"
	/>
</div>
