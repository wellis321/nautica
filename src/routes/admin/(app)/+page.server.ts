import { count, isNull } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { services, beforeAfterProjects, contactMessages } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [[serviceCount], [galleryCount], [unreadCount]] = await Promise.all([
		db.select({ value: count() }).from(services),
		db.select({ value: count() }).from(beforeAfterProjects),
		db.select({ value: count() }).from(contactMessages).where(isNull(contactMessages.readAt))
	]);

	return {
		serviceCount: serviceCount.value,
		galleryCount: galleryCount.value,
		unreadCount: unreadCount.value
	};
};
