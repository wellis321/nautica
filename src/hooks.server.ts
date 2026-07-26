import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { SESSION_COOKIE_NAME, validateSessionToken } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get(SESSION_COOKIE_NAME);

	if (token) {
		const { user } = await validateSessionToken(token);
		event.locals.user = user;
	} else {
		event.locals.user = null;
	}

	const isAdminRoute = event.url.pathname.startsWith('/admin');
	const isLoginRoute = event.url.pathname === '/admin/login';

	if (isAdminRoute && !isLoginRoute && !event.locals.user) {
		redirect(303, '/admin/login');
	}

	if (isLoginRoute && event.locals.user) {
		redirect(303, '/admin');
	}

	return resolve(event);
};
