import { redirect } from '@sveltejs/kit';
import { SESSION_COOKIE_NAME, invalidateSessionByToken } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	redirect(303, '/admin');
};

export const actions: Actions = {
	default: async ({ cookies }) => {
		const token = cookies.get(SESSION_COOKIE_NAME);
		if (token) {
			await invalidateSessionByToken(token);
		}
		cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
		redirect(303, '/');
	}
};
