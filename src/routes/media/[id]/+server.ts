import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { media } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const id = Number(params.id);
	if (!id) error(404);

	const [row] = await db.select().from(media).where(eq(media.id, id));
	if (!row) error(404);

	return new Response(new Uint8Array(row.data), {
		headers: {
			'Content-Type': row.mimeType,
			'Cache-Control': 'public, max-age=31536000, immutable'
		}
	});
};
