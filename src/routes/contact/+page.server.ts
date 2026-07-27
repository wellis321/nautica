import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { contactMessages } from '$lib/server/db/schema';
import { sendContactNotification } from '$lib/server/mail';
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

		try {
			await sendContactNotification({ name, email, message });
		} catch (e) {
			// The enquiry is already saved and visible in the admin inbox even if the
			// notification email fails to send, so we don't fail the form for this.
			console.error('Failed to send contact notification email:', e);
		}

		return { success: true };
	}
};
