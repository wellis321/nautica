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

	let localhostOk = false;
	let localhostError: string | null = null;
	if (env.DATABASE_URL) {
		try {
			const mysql = (await import('mysql2/promise')).default;
			const localUrl = env.DATABASE_URL.replace(/@[^/]+\//, '@localhost/');
			const conn = await mysql.createConnection(localUrl);
			await conn.query('SELECT 1');
			await conn.end();
			localhostOk = true;
		} catch (e) {
			localhostError = e instanceof Error ? e.message : String(e);
		}
	}

	return json({ hasUrl, urlPreview, connectionOk, connectionError, localhostOk, localhostError });
};
