import { fail } from '@sveltejs/kit';
import { asc, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { hashPassword } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const all = await db
		.select({
			id: users.id,
			email: users.email,
			name: users.name,
			isActive: users.isActive,
			createdAt: users.createdAt
		})
		.from(users)
		.orderBy(asc(users.createdAt));

	return { staff: all };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString().trim().toLowerCase();
		const name = data.get('name')?.toString().trim();
		const password = data.get('password')?.toString();

		if (!email || !name || !password) {
			return fail(400, { error: 'Please fill in every field.' });
		}
		if (password.length < 8) {
			return fail(400, { error: 'Password must be at least 8 characters.' });
		}

		const [existing] = await db.select().from(users).where(eq(users.email, email));
		if (existing) {
			return fail(400, { error: 'A staff account with that email already exists.' });
		}

		const passwordHash = await hashPassword(password);
		await db.insert(users).values({ email, name, passwordHash });
	},

	toggleActive: async ({ request, locals }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const isActive = data.get('isActive') === 'true';

		if (!id) return fail(400, { error: 'Missing staff id.' });
		if (id === locals.user?.id) {
			return fail(400, { error: 'You cannot deactivate your own account.' });
		}

		await db.update(users).set({ isActive }).where(eq(users.id, id));
	},

	resetPassword: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const password = data.get('password')?.toString();

		if (!id || !password) return fail(400, { error: 'Missing staff id or password.' });
		if (password.length < 8) {
			return fail(400, { error: 'Password must be at least 8 characters.' });
		}

		const passwordHash = await hashPassword(password);
		await db.update(users).set({ passwordHash }).where(eq(users.id, id));
	},

	delete: async ({ request, locals }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));

		if (!id) return fail(400, { error: 'Missing staff id.' });
		if (id === locals.user?.id) {
			return fail(400, { error: 'You cannot delete your own account.' });
		}

		await db.delete(users).where(eq(users.id, id));
	}
};
