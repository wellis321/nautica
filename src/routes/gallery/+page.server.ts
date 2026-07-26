import { asc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { beforeAfterProjects, craftsmanshipShots } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [projects, shots] = await Promise.all([
		db.select().from(beforeAfterProjects).orderBy(asc(beforeAfterProjects.sortOrder)),
		db.select().from(craftsmanshipShots).orderBy(asc(craftsmanshipShots.sortOrder))
	]);

	return { projects, shots };
};
