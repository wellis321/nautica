import { db } from './db';
import { media } from './db/schema';

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_SIZE = 8 * 1024 * 1024; // 8MB

export async function saveUploadedImage(file: File): Promise<string> {
	if (!ALLOWED_TYPES.has(file.type)) {
		throw new Error('Only JPEG, PNG or WebP images are allowed.');
	}
	if (file.size > MAX_SIZE) {
		throw new Error('Image must be smaller than 8MB.');
	}

	const buffer = Buffer.from(await file.arrayBuffer());
	const [result] = await db.insert(media).values({ mimeType: file.type, data: buffer });

	return `/media/${result.insertId}`;
}
