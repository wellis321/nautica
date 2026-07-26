import { fail } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { contactMessages } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const messages = await db
		.select()
		.from(contactMessages)
		.orderBy(desc(contactMessages.createdAt));

	return { messages };
};

export const actions: Actions = {
	markRead: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (!id) return fail(400, { error: 'Missing message id.' });

		await db.update(contactMessages).set({ readAt: new Date() }).where(eq(contactMessages.id, id));
	},

	markUnread: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (!id) return fail(400, { error: 'Missing message id.' });

		await db.update(contactMessages).set({ readAt: null }).where(eq(contactMessages.id, id));
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (!id) return fail(400, { error: 'Missing message id.' });

		await db.delete(contactMessages).where(eq(contactMessages.id, id));
	}
};
