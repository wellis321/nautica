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
		title: 'Marble lobby floor restoration',
		description: 'Dulled marble floor honed and polished back to a high gloss finish.',
		before: '/images/gallery/floor-black-before.jpg',
		after: '/images/gallery/floor-black-after.jpg'
	},
	{
		title: 'Wash basin crack repair',
		description: 'Impact crack to a ceramic basin, repaired invisibly without replacement.',
		before: '/images/gallery/sink-crack-before.jpg',
		after: '/images/gallery/sink-crack-after.jpg'
	},
	{
		title: 'Marble corner crack repair',
		description: 'Hairline crack to a bathroom marble corner, restored and re-polished.',
		before: '/images/gallery/marble-crack-before.jpg',
		after: '/images/gallery/marble-crack-after.jpg'
	},
	{
		title: 'Timber door crack repair',
		description: 'Hairline crack to a veneered cabin door, repaired and refinished invisibly.',
		before: '/images/gallery/door-crack-before.jpg',
		after: '/images/gallery/door-crack-after.jpg'
	},
	{
		title: 'Marble console table restoration',
		description: 'Scuffed and marked marble console top, restored to a mirror finish.',
		before: '/images/gallery/console-marble-before.jpg',
		after: '/images/gallery/console-marble-after.jpg'
	},
	{
		title: 'Marble medallion floor restoration',
		description: 'Decorative inlaid marble floor panel, restored to full clarity and shine.',
		before: '/images/gallery/floor-medallion-before.jpg',
		after: '/images/gallery/floor-medallion-after.jpg'
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
	},
	{
		title: 'Teak deck sanding',
		description: 'Hand-sanding teak decking back to bare wood before refinishing.',
		image: '/images/gallery/craft-teak-sanding.jpg'
	},
	{
		title: 'Joinery detail',
		description: 'Refinished corner joint on cabin joinery.',
		image: '/images/gallery/craft-joint-detail.jpg'
	},
	{
		title: 'French polished tabletop',
		description: 'Deep gloss finish on restored dark timber.',
		image: '/images/gallery/craft-dark-wood-gloss.jpg'
	}
];
