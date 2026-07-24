import { fail } from '@sveltejs/kit';
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

		// No email/SMTP provider configured yet — enquiries are logged only until one is wired up.
		console.log('Contact enquiry received:', { name, email, message });

		return { success: true };
	}
};
