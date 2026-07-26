import {
	mysqlTable,
	int,
	varchar,
	text,
	boolean,
	timestamp,
	customType
} from 'drizzle-orm/mysql-core';

const mediumblob = customType<{ data: Buffer }>({
	dataType() {
		return 'mediumblob';
	}
});

export const users = mysqlTable('users', {
	id: int('id').autoincrement().primaryKey(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	passwordHash: varchar('password_hash', { length: 255 }).notNull(),
	name: varchar('name', { length: 255 }).notNull(),
	isActive: boolean('is_active').notNull().default(true),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const sessions = mysqlTable('sessions', {
	id: varchar('id', { length: 64 }).primaryKey(),
	userId: int('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at').notNull()
});

export const media = mysqlTable('media', {
	id: int('id').autoincrement().primaryKey(),
	mimeType: varchar('mime_type', { length: 100 }).notNull(),
	data: mediumblob('data').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const services = mysqlTable('services', {
	id: int('id').autoincrement().primaryKey(),
	slug: varchar('slug', { length: 100 }).notNull().unique(),
	title: varchar('title', { length: 255 }).notNull(),
	summary: text('summary').notNull(),
	description: text('description').notNull(),
	icon: varchar('icon', { length: 50 }).notNull(),
	image: varchar('image', { length: 500 }),
	sortOrder: int('sort_order').notNull().default(0)
});

export const beforeAfterProjects = mysqlTable('before_after_projects', {
	id: int('id').autoincrement().primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	description: text('description').notNull(),
	before: varchar('before', { length: 500 }).notNull(),
	after: varchar('after', { length: 500 }).notNull(),
	featured: boolean('featured').notNull().default(false),
	sortOrder: int('sort_order').notNull().default(0)
});

export const craftsmanshipShots = mysqlTable('craftsmanship_shots', {
	id: int('id').autoincrement().primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	description: text('description').notNull(),
	image: varchar('image', { length: 500 }).notNull(),
	sortOrder: int('sort_order').notNull().default(0)
});

export const contactMessages = mysqlTable('contact_messages', {
	id: int('id').autoincrement().primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull(),
	message: text('message').notNull(),
	readAt: timestamp('read_at'),
	createdAt: timestamp('created_at').notNull().defaultNow()
});
