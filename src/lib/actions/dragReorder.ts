type DragReorderOptions = {
	id: number;
	onDrop: (draggedId: number, targetId: number) => void;
};

let draggedId: number | null = null;

export function dragReorder(node: HTMLElement, options: DragReorderOptions) {
	let current = options;
	node.draggable = true;

	function handleDragStart(e: DragEvent) {
		draggedId = current.id;
		node.classList.add('opacity-40');
		e.dataTransfer?.setData('text/plain', String(current.id));
		if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
	}

	function handleDragEnd() {
		draggedId = null;
		node.classList.remove('opacity-40');
		node.classList.remove('ring-2', 'ring-brass-500');
	}

	function handleDragOver(e: DragEvent) {
		if (draggedId === null || draggedId === current.id) return;
		e.preventDefault();
		if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
		node.classList.add('ring-2', 'ring-brass-500');
	}

	function handleDragLeave() {
		node.classList.remove('ring-2', 'ring-brass-500');
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		node.classList.remove('ring-2', 'ring-brass-500');
		if (draggedId === null || draggedId === current.id) return;
		current.onDrop(draggedId, current.id);
		draggedId = null;
	}

	node.addEventListener('dragstart', handleDragStart);
	node.addEventListener('dragend', handleDragEnd);
	node.addEventListener('dragover', handleDragOver);
	node.addEventListener('dragleave', handleDragLeave);
	node.addEventListener('drop', handleDrop);

	return {
		update(newOptions: DragReorderOptions) {
			current = newOptions;
		},
		destroy() {
			node.removeEventListener('dragstart', handleDragStart);
			node.removeEventListener('dragend', handleDragEnd);
			node.removeEventListener('dragover', handleDragOver);
			node.removeEventListener('dragleave', handleDragLeave);
			node.removeEventListener('drop', handleDrop);
		}
	};
}
