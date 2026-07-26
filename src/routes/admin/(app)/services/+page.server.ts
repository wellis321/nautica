import { fail } from '@sveltejs/kit';
import { asc, eq, sql } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { services } from '$lib/server/db/schema';
import { saveUploadedImage } from '$lib/server/media';
import type { Actions, PageServerLoad } from './$types';

const ICONS = ['surface', 'polish', 'decorate', 'film', 'glass', 'stone'] as const;

export const load: PageServerLoad = async () => {
	const all = await db.select().from(services).orderBy(asc(services.sortOrder));
	return { services: all };
};

export const actions: Actions = {
	save: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();
		const slug = data.get('slug')?.toString().trim();
		const title = data.get('title')?.toString().trim();
		const summary = data.get('summary')?.toString().trim();
		const description = data.get('description')?.toString().trim();
		const icon = data.get('icon')?.toString();
		const imageFile = data.get('image') as File | null;

		if (!slug || !title || !summary || !description || !icon || !ICONS.includes(icon as any)) {
			return fail(400, { error: 'Please fill in every field with a valid icon.' });
		}

		let image: string | undefined;
		if (imageFile && imageFile.size > 0) {
			try {
				image = await saveUploadedImage(imageFile);
			} catch (e) {
				return fail(400, { error: e instanceof Error ? e.message : 'Image upload failed.' });
			}
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
