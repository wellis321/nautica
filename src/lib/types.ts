export type Service = {
	id: number;
	slug: string;
	title: string;
	summary: string;
	description: string;
	icon: string;
	image: string | null;
	sortOrder: number;
};

export type BeforeAfter = {
	id: number;
	title: string;
	description: string;
	before: string;
	after: string;
	featured: boolean;
	sortOrder: number;
};

export type DetailShot = {
	id: number;
	title: string;
	description: string;
	image: string;
	sortOrder: number;
};
