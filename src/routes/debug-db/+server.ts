import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const GET = async () => {
	const hasUrl = !!env.DATABASE_URL;
	const urlPreview = env.DATABASE_URL
		? env.DATABASE_URL.replace(/:[^:@]+@/, ':***@')
		: null;

	let connectionOk = false;
	let connectionError: string | null = null;

	try {
		const { db } = await import('$lib/server/db');
		const { sql } = await import('drizzle-orm');
		await db.execute(sql`SELECT 1`);
		connectionOk = true;
	} catch (e) {
		connectionError = e instanceof Error ? e.message : String(e);
	}

	return json({ hasUrl, urlPreview, connectionOk, connectionError });
};
