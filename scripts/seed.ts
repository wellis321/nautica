import 'dotenv/config';
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { count } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'node:crypto';
import * as schema from '../src/lib/server/db/schema';
import { services as staticServices } from '../src/lib/data/services';
import { beforeAfterProjects as staticProjects, craftsmanshipShots as staticShots } from '../src/lib/data/gallery';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const pool = mysql.createPool(process.env.DATABASE_URL);
const db = drizzle(pool, { schema, mode: 'default' });

async function seedContent() {
	const [{ value: existingServices }] = await db.select({ value: count() }).from(schema.services);

	if (existingServices > 0) {
		console.log('Services table already has data — skipping content seed.');
		return;
	}

	await db.insert(schema.services).values(
		staticServices.map((s, i) => ({
			slug: s.slug,
			title: s.title,
			summary: s.summary,
			description: s.description,
			icon: s.icon,
			image: s.image ?? null,
			sortOrder: i
		}))
	);
	console.log(`Seeded ${staticServices.length} services.`);

	await db.insert(schema.beforeAfterProjects).values(
		staticProjects.map((p, i) => ({
			title: p.title,
			description: p.description,
			before: p.before,
			after: p.after,
			featured: i < 2,
			sortOrder: i
		}))
	);
	console.log(`Seeded ${staticProjects.length} before/after projects.`);

	await db.insert(schema.craftsmanshipShots).values(
		staticShots.map((s, i) => ({
			title: s.title,
			description: s.description,
			image: s.image,
			sortOrder: i
		}))
	);
	console.log(`Seeded ${staticShots.length} craftsmanship shots.`);
}

async function seedAdminUser() {
	const email = process.env.SEED_ADMIN_EMAIL;
	if (!email) {
		console.log('SEED_ADMIN_EMAIL not set — skipping admin user creation.');
		return;
	}

	const [{ value: existingUsers }] = await db.select({ value: count() }).from(schema.users);
	if (existingUsers > 0) {
		console.log('Users table already has data — skipping admin user seed.');
		return;
	}

	const password = process.env.SEED_ADMIN_PASSWORD ?? randomBytes(9).toString('base64url');
	const passwordHash = await bcrypt.hash(password, 12);

	await db.insert(schema.users).values({
		email,
		passwordHash,
		name: process.env.SEED_ADMIN_NAME ?? 'Admin'
	});

	console.log('\n=== First staff account created ===');
	console.log(`Email:    ${email}`);
	console.log(`Password: ${password}`);
	console.log('Save this password now — it will not be shown again.\n');
}

await seedContent();
await seedAdminUser();
await pool.end();
