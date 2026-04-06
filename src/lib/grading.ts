import type { DisciplineConfig } from './disciplines';

const GRADE_MAX = 10;
const GRADE_MIN = 3;

// --- Relay grading (team with women + men) ---

export interface RelayInput {
	discipline: DisciplineConfig;
	surface: string;
	women: number;
	men: number;
	totalTime: number;
	errors: number;
}

export interface RelayResult {
	grade: number;
	correctedTime: number;
	averageTime: number;
	runnerCount: number;
	group: 'Mixed' | 'Turnerinnen' | 'Turner';
}

export function calculateRelay(input: RelayInput): RelayResult | null {
	const { discipline, surface, women, men, totalTime, errors } = input;
	const runnerCount = women + men;

	if (runnerCount < 1 || totalTime <= 0) return null;

	const penalty = discipline.errorPenalty ?? 0;
	const correctedTime = totalTime + errors * penalty;
	const averageTime = correctedTime / runnerCount;

	let base: number;
	let divisor: number;

	const w = discipline.women;
	const m = discipline.men;

	if (women > 0 && men > 0) {
		base = (w.base[surface] * women + m.base[surface] * men) / runnerCount;
		divisor = (w.divisor[surface] * women + m.divisor[surface] * men) / runnerCount;
	} else if (women > 0) {
		base = w.base[surface];
		divisor = w.divisor[surface];
	} else {
		base = m.base[surface];
		divisor = m.divisor[surface];
	}

	let grade = (base - averageTime) / divisor;
	grade = clamp(grade);

	const group = women > 0 && men > 0 ? 'Mixed' : women > 0 ? 'Turnerinnen' : 'Turner';

	return {
		grade,
		correctedTime,
		averageTime: round2(averageTime),
		runnerCount,
		group
	};
}

// --- Individual grading (time or distance) ---

export interface IndividualInput {
	discipline: DisciplineConfig;
	surface: string;
	gender: 'women' | 'men';
	value: number;
}

export interface IndividualResult {
	grade: number;
}

export function calculateIndividual(input: IndividualInput): IndividualResult | null {
	const { discipline, surface, gender, value } = input;

	if (value <= 0) return null;

	const params = gender === 'women' ? discipline.women : discipline.men;
	const base = params.base[surface];
	const divisor = params.divisor[surface];

	let grade: number;

	if (discipline.type === 'time') {
		// Lower time = better: (base - d) / divisor
		grade = (base - value) / divisor;
	} else {
		// Higher distance = better: (d - base) / divisor
		grade = (value - base) / divisor;
	}

	grade = clamp(grade);

	return { grade };
}

// --- Helpers ---

function clamp(grade: number): number {
	grade = Math.round(grade * 100) / 100;
	if (grade > GRADE_MAX) return GRADE_MAX;
	if (grade < GRADE_MIN) return GRADE_MIN;
	return grade;
}

function round2(n: number): number {
	return Math.round(n * 100) / 100;
}
