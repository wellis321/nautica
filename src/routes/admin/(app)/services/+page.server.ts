import { fail } from '@sveltejs/kit';
import { asc, eq, sql } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { services } from '$lib/server/db/schema';
import { saveUploadedImage } from '$lib/server/media';
import { getImageLibrary } from '$lib/server/mediaLibrary';
import type { Actions, PageServerLoad } from './$types';

const ICONS = ['surface', 'polish', 'decorate', 'film', 'glass', 'stone'] as const;

export const load: PageServerLoad = async () => {
	const [all, library] = await Promise.all([
		db.select().from(services).orderBy(asc(services.sortOrder)),
		getImageLibrary()
	]);
	return { services: all, imageLibrary: library };
};

async function resolveImage(data: FormData, fieldName: string): Promise<string | undefined> {
	const file = data.get(fieldName) as File | null;
	if (file && file.size > 0) {
		return saveUploadedImage(file);
	}
	const existing = data.get(`${fieldName}_existing`)?.toString();
	if (existing) return existing;
	return undefined;
}

export const actions: Actions = {
	save: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();
		const slug = data.get('slug')?.toString().trim();
		const title = data.get('title')?.toString().trim();
		const summary = data.get('summary')?.toString().trim();
		const description = data.get('description')?.toString().trim();
		const icon = data.get('icon')?.toString();

		if (!slug || !title || !summary || !description || !icon || !ICONS.includes(icon as any)) {
			return fail(400, { error: 'Please fill in every field with a valid icon.' });
		}

		let image: string | undefined;
		try {
			image = await resolveImage(data, 'image');
		} catch (e) {
			return fail(400, { error: e instanceof Error ? e.message : 'Image upload failed.' });
		}

		if (id) {
			await db
				.update(services)
				.set({
					slug,
					title,
					summary,
					description,
					icon,
					...(image ? { image } : {})
				})
				.where(eq(services.id, Number(id)));
		} else {
			const [{ value: maxOrder }] = await db
				.select({ value: sql<number>`coalesce(max(${services.sortOrder}), -1)` })
				.from(services);

			await db.insert(services).values({
				slug,
				title,
				summary,
				description,
				icon,
				image: image ?? null,
				sortOrder: maxOrder + 1
			});
		}
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (!id) return fail(400, { error: 'Missing service id.' });
		await db.delete(services).where(eq(services.id, id));
	},

	reorder: async ({ request }) => {
		const data = await request.formData();
		const ids = data.getAll('id').map(Number);
		if (ids.length === 0) return fail(400, { error: 'No order provided.' });

		await db.transaction(async (tx) => {
			for (let i = 0; i < ids.length; i++) {
				await tx.update(services).set({ sortOrder: i }).where(eq(services.id, ids[i]));
			}
		});
	}
};
