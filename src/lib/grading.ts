export type Untergrund = 'kunststoff' | 'rasen' | 'wiese';

// 80m Pendelstafette - Basen pro Geschlecht und Untergrund
const BASE_FRAUEN: Record<Untergrund, number> = {
	kunststoff: 18.6,
	rasen: 18.9,
	wiese: 19.2
};

const BASE_MAENNER: Record<Untergrund, number> = {
	kunststoff: 14.2,
	rasen: 14.5,
	wiese: 14.8
};

// Divisoren sind geschlechtsabhängig bei 80m PS
const DIVISOR_FRAUEN = 0.8;
const DIVISOR_MAENNER = 0.5;

const FEHLER_ZUSCHLAG = 2; // Sekunden pro Wechselfehler
const NOTE_MAX = 10;
const NOTE_MIN = 3;

export interface GradingInput {
	untergrund: Untergrund;
	frauen: number;
	maenner: number;
	zeitTotal: number;
	fehler: number;
}

export interface GradingResult {
	note: number;
	korrigierteZeit: number;
	durchschnittszeit: number;
	anzahlLaeufer: number;
}

export function berechneNote(input: GradingInput): GradingResult | null {
	const { untergrund, frauen, maenner, zeitTotal, fehler } = input;
	const anzahlLaeufer = frauen + maenner;

	if (anzahlLaeufer < 1 || zeitTotal <= 0) {
		return null;
	}

	const korrigierteZeit = zeitTotal + fehler * FEHLER_ZUSCHLAG;
	const durchschnittszeit = korrigierteZeit / anzahlLaeufer;

	let base: number;
	let divisor: number;

	if (frauen > 0 && maenner > 0) {
		// Mixed: gewichteter Durchschnitt der Basen und Divisoren
		base =
			(BASE_FRAUEN[untergrund] * frauen + BASE_MAENNER[untergrund] * maenner) / anzahlLaeufer;
		divisor = (DIVISOR_FRAUEN * frauen + DIVISOR_MAENNER * maenner) / anzahlLaeufer;
	} else if (frauen > 0) {
		base = BASE_FRAUEN[untergrund];
		divisor = DIVISOR_FRAUEN;
	} else {
		base = BASE_MAENNER[untergrund];
		divisor = DIVISOR_MAENNER;
	}

	let note = (base - durchschnittszeit) / divisor;
	note = Math.round(note * 100) / 100; // auf 2 Dezimalstellen runden

	if (note > NOTE_MAX) note = NOTE_MAX;
	if (note < NOTE_MIN) note = NOTE_MIN;

	return {
		note,
		korrigierteZeit,
		durchschnittszeit: Math.round(durchschnittszeit * 100) / 100,
		anzahlLaeufer
	};
}
