import { asc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { services } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const all = await db.select().from(services).orderBy(asc(services.sortOrder));
	return { services: all };
};
