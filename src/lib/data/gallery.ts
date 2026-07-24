export type BeforeAfter = {
	title: string;
	description: string;
	before: string;
	after: string;
};

export const beforeAfterProjects: BeforeAfter[] = [
	{
		title: 'Quartz worktop chip repair',
		description: 'Impact chip to a galley worktop edge, repaired invisibly in situ.',
		before: '/images/gallery/countertop-chip-before.jpg',
		after: '/images/gallery/countertop-chip-after.jpg'
	},
	{
		title: 'Marble corner crack repair',
		description: 'Hairline crack to a bathroom marble corner, restored and re-polished.',
		before: '/images/gallery/marble-crack-before.jpg',
		after: '/images/gallery/marble-crack-after.jpg'
	}
];

export type DetailShot = {
	title: string;
	description: string;
	image: string;
};

export const craftsmanshipShots: DetailShot[] = [
	{
		title: 'French polished door frame',
		description: 'Hand-finished timber door frame aboard a cruise vessel.',
		image: '/images/gallery/french-polish-detail-1.jpg'
	},
	{
		title: 'French polished cabinetry',
		description: 'Restored gloss finish on cabin joinery.',
		image: '/images/gallery/french-polish-detail-2.jpg'
	},
	{
		title: 'Polished handrail',
		description: 'French polished timber handrail, deck cabin.',
		image: '/images/gallery/handrail-detail.jpg'
	}
];
