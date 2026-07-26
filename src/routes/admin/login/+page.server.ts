import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { dev } from '$app/environment';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { SESSION_COOKIE_NAME, createSession, generateSessionToken, verifyPassword } from '$lib/server/auth';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString().trim().toLowerCase();
		const password = data.get('password')?.toString();

		if (!email || !password) {
			return fail(400, { error: 'Please enter your email and password.', email });
		}

		const [user] = await db.select().from(users).where(eq(users.email, email));

		if (!user || !user.isActive || !(await verifyPassword(password, user.passwordHash))) {
			return fail(400, { error: 'Invalid email or password.', email });
		}

		const token = generateSessionToken();
		const session = await createSession(token, user.id);

		cookies.set(SESSION_COOKIE_NAME, token, {
			path: '/',
			httpOnly: true,
			secure: !dev,
			sameSite: 'lax',
			expires: session.expiresAt
		});

		redirect(303, '/admin');
	}
};
