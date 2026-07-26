export type Service = {
	slug: string;
	title: string;
	summary: string;
	description: string;
	icon: 'surface' | 'polish' | 'decorate' | 'film' | 'glass' | 'stone';
	image?: string;
};

export const services: Service[] = [
	{
		slug: 'hard-surface-repairs',
		title: 'Hard Surface Repairs',
		summary: 'Chips, cracks and impact damage restored invisibly, in situ.',
		description:
			'From galley worktops to cabin thresholds, we repair chips, scratches and impact damage in solid surface, quartz, laminate and composite materials without the cost or downtime of a full replacement. Placeholder copy — final wording to be supplied by Nauticare Solutions.',
		icon: 'surface',
		image: '/images/services/hard-surface.jpg'
	},
	{
		slug: 'french-polishing',
		title: 'French Polishing',
		summary: 'Traditional hand-finishing for fine wood joinery and handrails.',
		description:
			'Our French polishers restore the depth and shine of fine wood joinery, handrails and cabinetry using traditional hand techniques, matched to the vessel’s existing finish. Placeholder copy — final wording to be supplied by Nauticare Solutions.',
		icon: 'polish',
		image: '/images/services/french-polishing.jpg'
	},
	{
		slug: 'decorating',
		title: 'Decorating',
		summary: 'Refined paint and finishing work for cabins and public spaces.',
		description:
			'Full decorating services for cabins, corridors and public areas, carried out to the exacting finish standards expected on luxury and cruise vessels. Placeholder copy — final wording to be supplied by Nauticare Solutions.',
		icon: 'decorate',
		image: '/images/services/decorating.jpg'
	},
	{
		slug: 'ppf-filming',
		title: 'PPF Filming (IMO Certified)',
		summary: 'IMO-certified paint protection film for high-wear surfaces.',
		description:
			'IMO-certified paint protection film application, shielding high-wear surfaces from scuffs and abrasion while maintaining a clear, factory-finish appearance. Placeholder copy — final wording to be supplied by Nauticare Solutions.',
		icon: 'film'
	},
	{
		slug: 'glass-polishing',
		title: 'Glass Polishing',
		summary: 'Scratch and haze removal that restores true clarity.',
		description:
			'We remove scratches, haze and etching from glass balustrades, screens and windows, restoring full clarity without the need for replacement panels. Placeholder copy — final wording to be supplied by Nauticare Solutions.',
		icon: 'glass',
		image: '/images/services/glass-polishing.jpg'
	},
	{
		slug: 'marble-stone-restoration',
		title: 'Marble & Stone Restoration',
		summary: 'Crack repair, honing and polishing for natural stone.',
		description:
			'Crack repair, honing and polishing for marble and natural stone surfaces in bathrooms, lobbies and public areas, bringing tired stone back to a mirror finish. Placeholder copy — final wording to be supplied by Nauticare Solutions.',
		icon: 'stone',
		image: '/images/services/marble-stone.jpg'
	}
];
