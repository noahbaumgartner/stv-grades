export type DisciplineType = 'relay' | 'time' | 'distance';

export interface SurfaceOption {
	value: string;
	label: string;
}

export interface GenderParams {
	base: Record<string, number>;
	divisor: Record<string, number>;
}

export interface DisciplineConfig {
	slug: string;
	name: string;
	category: string;
	type: DisciplineType;
	unit: string;
	inputLabel: string;
	step: number;
	surfaces: SurfaceOption[];
	women: GenderParams;
	men: GenderParams;
	errorPenalty?: number; // seconds per error (relays)
}

// --- Surface presets ---

const SURFACES_TRACK: SurfaceOption[] = [
	{ value: 'synthetic', label: 'Kunststoff' },
	{ value: 'lawn', label: 'Rasen' },
	{ value: 'meadow', label: 'Wiese' }
];

const SURFACES_JUMP: SurfaceOption[] = [
	{ value: 'synthetic', label: 'Kunststoff' },
	{ value: 'asphalt', label: 'Asphalt' }
];

const SURFACES_TEMP: SurfaceOption[] = [
	{ value: 'synthetic', label: 'Kunststoff' },
	{ value: 'temporary', label: 'Temporär gebaut' }
];

const SURFACES_NONE: SurfaceOption[] = [{ value: 'default', label: 'Standard' }];

// --- All disciplines ---

const disciplines: DisciplineConfig[] = [
	// ==================== Staffeln ====================
	{
		slug: '80m-ps',
		name: '80m Pendelstafette',
		category: 'Staffeln',
		type: 'relay',
		unit: 'Sek.',
		inputLabel: 'Zeittotal',
		step: 0.01,
		surfaces: SURFACES_TRACK,
		women: {
			base: { synthetic: 18.6, lawn: 18.9, meadow: 19.2 },
			divisor: { synthetic: 0.8, lawn: 0.8, meadow: 0.8 }
		},
		men: {
			base: { synthetic: 14.2, lawn: 14.5, meadow: 14.8 },
			divisor: { synthetic: 0.5, lawn: 0.5, meadow: 0.5 }
		},
		errorPenalty: 2
	},
	{
		slug: '40m-ps-stab',
		name: '40m PS Stab',
		category: 'Staffeln',
		type: 'relay',
		unit: 'Sek.',
		inputLabel: 'Zeittotal',
		step: 0.01,
		surfaces: SURFACES_TRACK,
		women: {
			base: { synthetic: 13.9, lawn: 14.1, meadow: 14.3 },
			divisor: { synthetic: 0.8, lawn: 0.8, meadow: 0.8 }
		},
		men: {
			base: { synthetic: 13.2, lawn: 13.4, meadow: 13.6 },
			divisor: { synthetic: 0.8, lawn: 0.8, meadow: 0.8 }
		},
		errorPenalty: 2
	},

	// ==================== Lauf ====================
	{
		slug: '80m',
		name: '80m',
		category: 'Lauf',
		type: 'time',
		unit: 'Sek.',
		inputLabel: 'Zeit',
		step: 0.01,
		surfaces: SURFACES_TRACK,
		women: {
			base: { synthetic: 16.7, lawn: 17.0, meadow: 17.3 },
			divisor: { synthetic: 0.6, lawn: 0.6, meadow: 0.6 }
		},
		men: {
			base: { synthetic: 14.5, lawn: 14.8, meadow: 15.1 },
			divisor: { synthetic: 0.5, lawn: 0.5, meadow: 0.5 }
		}
	},
	{
		slug: '400m',
		name: '400m',
		category: 'Lauf',
		type: 'time',
		unit: 'Sek.',
		inputLabel: 'Zeit',
		step: 0.01,
		surfaces: SURFACES_TRACK,
		women: {
			base: { synthetic: 112.5, lawn: 115, meadow: 117.5 },
			divisor: { synthetic: 5, lawn: 5, meadow: 5 }
		},
		men: {
			base: { synthetic: 74.5, lawn: 77, meadow: 79.5 },
			divisor: { synthetic: 2, lawn: 2, meadow: 2 }
		}
	},
	{
		slug: '800m',
		name: '800m',
		category: 'Lauf',
		type: 'time',
		unit: 'Sek.',
		inputLabel: 'Zeit',
		step: 0.01,
		surfaces: SURFACES_TRACK,
		women: {
			base: { synthetic: 254, lawn: 262, meadow: 270 },
			divisor: { synthetic: 10, lawn: 10, meadow: 10 }
		},
		men: {
			base: { synthetic: 206, lawn: 212, meadow: 218 },
			divisor: { synthetic: 8, lawn: 8, meadow: 8 }
		}
	},
	{
		slug: '1000m',
		name: '1000m',
		category: 'Lauf',
		type: 'time',
		unit: 'Sek.',
		inputLabel: 'Zeit',
		step: 0.01,
		surfaces: SURFACES_TRACK,
		women: {
			base: { synthetic: 348, lawn: 360, meadow: 372 },
			divisor: { synthetic: 15, lawn: 15, meadow: 15 }
		},
		men: {
			base: { synthetic: 265, lawn: 275, meadow: 285 },
			divisor: { synthetic: 10, lawn: 10, meadow: 10 }
		}
	},

	// ==================== Sprung ====================
	{
		slug: 'hochsprung',
		name: 'Hochsprung',
		category: 'Sprung',
		type: 'distance',
		unit: 'm',
		inputLabel: 'Höhe',
		step: 0.01,
		surfaces: SURFACES_JUMP,
		women: {
			base: { synthetic: 0.45, asphalt: 0.40 },
			divisor: { synthetic: 0.1, asphalt: 0.1 }
		},
		men: {
			base: { synthetic: 0.8, asphalt: 0.75 },
			divisor: { synthetic: 0.1, asphalt: 0.1 }
		}
	},
	{
		slug: 'weitsprung',
		name: 'Weitsprung',
		category: 'Sprung',
		type: 'distance',
		unit: 'm',
		inputLabel: 'Weite',
		step: 0.01,
		surfaces: SURFACES_TEMP,
		women: {
			base: { synthetic: 0.8, temporary: 0.7 },
			divisor: { synthetic: 0.4, temporary: 0.4 }
		},
		men: {
			base: { synthetic: 1.2, temporary: 1.1 },
			divisor: { synthetic: 0.5, temporary: 0.5 }
		}
	},

	// ==================== Wurf / Stoss ====================
	{
		slug: 'kugelstossen',
		name: 'Kugelstossen',
		category: 'Wurf / Stoss',
		type: 'distance',
		unit: 'm',
		inputLabel: 'Weite',
		step: 0.01,
		surfaces: SURFACES_NONE,
		women: {
			base: { default: 0 },
			divisor: { default: 1 }
		},
		men: {
			base: { default: -0.5 },
			divisor: { default: 1.5 }
		}
	},
	{
		slug: 'schleuderball',
		name: 'Schleuderball',
		category: 'Wurf / Stoss',
		type: 'distance',
		unit: 'm',
		inputLabel: 'Weite',
		step: 0.01,
		surfaces: SURFACES_NONE,
		women: {
			base: { default: -2 },
			divisor: { default: 4 }
		},
		men: {
			base: { default: 11 },
			divisor: { default: 4 }
		}
	},
	{
		slug: 'speer',
		name: 'Speer',
		category: 'Wurf / Stoss',
		type: 'distance',
		unit: 'm',
		inputLabel: 'Weite',
		step: 0.01,
		surfaces: SURFACES_TEMP,
		women: {
			base: { synthetic: -8, temporary: -9.5 },
			divisor: { synthetic: 4, temporary: 4 }
		},
		men: {
			base: { synthetic: -5, temporary: -7 },
			divisor: { synthetic: 5, temporary: 5 }
		}
	},
	{
		slug: 'weitwurf',
		name: 'Weitwurf',
		category: 'Wurf / Stoss',
		type: 'distance',
		unit: 'm',
		inputLabel: 'Weite',
		step: 0.01,
		surfaces: SURFACES_NONE,
		women: {
			base: { default: -8 },
			divisor: { default: 5 }
		},
		men: {
			base: { default: 3 },
			divisor: { default: 6 }
		}
	}
];

// --- Lookup helpers ---

const bySlug = new Map(disciplines.map((d) => [d.slug, d]));

export function getDiscipline(slug: string): DisciplineConfig | undefined {
	return bySlug.get(slug);
}

export function getAllDisciplines(): DisciplineConfig[] {
	return disciplines;
}

export interface DisciplineCategory {
	label: string;
	disciplines: DisciplineConfig[];
}

export function getDisciplinesByCategory(): DisciplineCategory[] {
	const categories: DisciplineCategory[] = [];
	const seen = new Set<string>();

	for (const d of disciplines) {
		if (!seen.has(d.category)) {
			seen.add(d.category);
			categories.push({
				label: d.category,
				disciplines: disciplines.filter((x) => x.category === d.category)
			});
		}
	}

	return categories;
}
