import { fail } from '@sveltejs/kit';
import { asc, eq, sql } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { beforeAfterProjects, craftsmanshipShots } from '$lib/server/db/schema';
import { saveUploadedImage } from '$lib/server/media';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [projects, shots] = await Promise.all([
		db.select().from(beforeAfterProjects).orderBy(asc(beforeAfterProjects.sortOrder)),
		db.select().from(craftsmanshipShots).orderBy(asc(craftsmanshipShots.sortOrder))
	]);
	return { projects, shots };
};

export const actions: Actions = {
	saveProject: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();
		const title = data.get('title')?.toString().trim();
		const description = data.get('description')?.toString().trim();
		const featured = data.get('featured') === 'on';
		const beforeFile = data.get('before') as File | null;
		const afterFile = data.get('after') as File | null;

		if (!title || !description) {
			return fail(400, { error: 'Please fill in every field.' });
		}

		let before: string | undefined;
		let after: string | undefined;
		try {
			if (beforeFile && beforeFile.size > 0) before = await saveUploadedImage(beforeFile);
			if (afterFile && afterFile.size > 0) after = await saveUploadedImage(afterFile);
		} catch (e) {
			return fail(400, { error: e instanceof Error ? e.message : 'Image upload failed.' });
		}

		if (id) {
			await db
				.update(beforeAfterProjects)
				.set({
					title,
					description,
					featured,
					...(before ? { before } : {}),
					...(after ? { after } : {})
				})
				.where(eq(beforeAfterProjects.id, Number(id)));
		} else {
			if (!before || !after) {
				return fail(400, { error: 'Both before and after images are required for a new pair.' });
			}
			const [{ value: maxOrder }] = await db
				.select({ value: sql<number>`coalesce(max(${beforeAfterProjects.sortOrder}), -1)` })
				.from(beforeAfterProjects);

			await db.insert(beforeAfterProjects).values({
				title,
				description,
				before,
				after,
				featured,
				sortOrder: maxOrder + 1
			});
		}
	},

	deleteProject: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (!id) return fail(400, { error: 'Missing project id.' });
		await db.delete(beforeAfterProjects).where(eq(beforeAfterProjects.id, id));
	},

	saveShot: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();
		const title = data.get('title')?.toString().trim();
		const description = data.get('description')?.toString().trim();
		const imageFile = data.get('image') as File | null;

		if (!title || !description) {
			return fail(400, { error: 'Please fill in every field.' });
		}

		let image: string | undefined;
		try {
			if (imageFile && imageFile.size > 0) image = await saveUploadedImage(imageFile);
		} catch (e) {
			return fail(400, { error: e instanceof Error ? e.message : 'Image upload failed.' });
		}

		if (id) {
			await db
				.update(craftsmanshipShots)
				.set({ title, description, ...(image ? { image } : {}) })
				.where(eq(craftsmanshipShots.id, Number(id)));
		} else {
			if (!image) {
				return fail(400, { error: 'An image is required for a new shot.' });
			}
			const [{ value: maxOrder }] = await db
				.select({ value: sql<number>`coalesce(max(${craftsmanshipShots.sortOrder}), -1)` })
				.from(craftsmanshipShots);

			await db.insert(craftsmanshipShots).values({
				title,
				description,
				image,
				sortOrder: maxOrder + 1
			});
		}
	},

	deleteShot: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (!id) return fail(400, { error: 'Missing shot id.' });
		await db.delete(craftsmanshipShots).where(eq(craftsmanshipShots.id, id));
	}
};
