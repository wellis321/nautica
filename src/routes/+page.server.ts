import { asc, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { services, beforeAfterProjects } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [allServices, featuredProjects] = await Promise.all([
		db.select().from(services).orderBy(asc(services.sortOrder)),
		db
			.select()
			.from(beforeAfterProjects)
			.where(eq(beforeAfterProjects.featured, true))
			.orderBy(asc(beforeAfterProjects.sortOrder))
	]);

	return { services: allServices, featuredProjects };
};
