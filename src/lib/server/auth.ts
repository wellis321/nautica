import { randomBytes, createHash } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from './db';
import { sessions, users } from './db/schema';

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

export function generateSessionToken(): string {
	return randomBytes(20).toString('hex');
}

function hashToken(token: string): string {
	return createHash('sha256').update(token).digest('hex');
}

export async function createSession(token: string, userId: number) {
	const sessionId = hashToken(token);
	const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
	await db.insert(sessions).values({ id: sessionId, userId, expiresAt });
	return { id: sessionId, userId, expiresAt };
}

export async function validateSessionToken(token: string) {
	const sessionId = hashToken(token);
	const [result] = await db
		.select({ user: users, session: sessions })
		.from(sessions)
		.innerJoin(users, eq(sessions.userId, users.id))
		.where(eq(sessions.id, sessionId));

	if (!result) return { session: null, user: null };

	if (result.session.expiresAt.getTime() < Date.now()) {
		await db.delete(sessions).where(eq(sessions.id, sessionId));
		return { session: null, user: null };
	}

	if (!result.user.isActive) {
		return { session: null, user: null };
	}

	return { session: result.session, user: result.user };
}

export async function invalidateSession(sessionId: string) {
	await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export async function invalidateSessionByToken(token: string) {
	await invalidateSession(hashToken(token));
}

export async function hashPassword(password: string): Promise<string> {
	return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
	return bcrypt.compare(password, hash);
}

export const SESSION_COOKIE_NAME = 'session';
