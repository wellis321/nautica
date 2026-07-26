import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { contactMessages } from '$lib/server/db/schema';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name')?.toString().trim();
		const email = data.get('email')?.toString().trim();
		const message = data.get('message')?.toString().trim();

		if (!name || !email || !message) {
			return fail(400, { error: 'Please fill in every field.', name, email, message });
		}

		await db.insert(contactMessages).values({ name, email, message });

		return { success: true };
	}
};
