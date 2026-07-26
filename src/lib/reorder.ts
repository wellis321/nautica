export function moveItem<T extends { id: number }>(
	items: T[],
	draggedId: number,
	targetId: number
): T[] {
	const next = [...items];
	const fromIndex = next.findIndex((item) => item.id === draggedId);
	const toIndex = next.findIndex((item) => item.id === targetId);
	if (fromIndex === -1 || toIndex === -1) return items;

	const [moved] = next.splice(fromIndex, 1);
	next.splice(toIndex, 0, moved);
	return next;
}

export async function persistOrder(actionUrl: string, ids: number[]) {
	const formData = new FormData();
	for (const id of ids) formData.append('id', String(id));
	await fetch(actionUrl, { method: 'POST', body: formData });
}
