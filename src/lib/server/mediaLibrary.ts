import { db } from './db';
import { services, beforeAfterProjects, craftsmanshipShots, media } from './db/schema';

export async function getImageLibrary(): Promise<string[]> {
	const [svc, projects, shots, mediaRows] = await Promise.all([
		db.select({ image: services.image }).from(services),
		db.select({ before: beforeAfterProjects.before, after: beforeAfterProjects.after }).from(beforeAfterProjects),
		db.select({ image: craftsmanshipShots.image }).from(craftsmanshipShots),
		db.select({ id: media.id }).from(media)
	]);

	const urls = new Set<string>();
	for (const row of svc) if (row.image) urls.add(row.image);
	for (const row of projects) {
		urls.add(row.before);
		urls.add(row.after);
	}
	for (const row of shots) urls.add(row.image);
	for (const row of mediaRows) urls.add(`/media/${row.id}`);

	return [...urls];
}
