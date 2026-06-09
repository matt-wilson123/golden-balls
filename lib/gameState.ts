import { Puzzle } from './puzzles';

export type GuessResult = 'correct' | 'wrong' | 'close'; // close = within 15% for stats

export interface PuzzleState {
  puzzleIndex: number;
  guesses: string[];
  results: GuessResult[];
  solved: boolean;
  failed: boolean; // used all 6 guesses
  cluesRevealed: number; // for player puzzles
}

export interface DayState {
  date: string;
  puzzleStates: PuzzleState[];
  complete: boolean;
}

export function initPuzzleState(index: number): PuzzleState {
  return {
    puzzleIndex: index,
    guesses: [],
    results: [],
    solved: false,
    failed: false,
    cluesRevealed: 1, // always show first clue
  };
}

export function checkPlayerGuess(
  guess: string,
  answer: string
): GuessResult {
  // Strip accents/umlauts: é→e, ü→u, ñ→n etc.
  const stripAccents = (s: string) =>
    s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const normalise = (s: string) =>
    stripAccents(s).toLowerCase().trim().replace(/[^a-z0-9]/g, '');

  const normGuess = normalise(guess);
  const normAnswer = normalise(answer);

  // Accept full name match
  if (normGuess === normAnswer) return 'correct';

  // Accept surname match — last word of the answer
  const surname = normalise(answer.trim().split(/\s+/).pop() ?? '');
  if (normGuess === surname && surname.length > 1) return 'correct';

  return 'wrong';
}

export function checkStatGuess(
  guess: number,
  answer: number
): GuessResult {
  if (guess === answer) return 'correct';
  const pct = Math.abs(guess - answer) / answer;
  if (pct <= 0.15) return 'close'; // within 15%
  return 'wrong';
}

export function getShareText(
  puzzles: Puzzle[],
  states: PuzzleState[],
  date: string
): string {
  const lines = ['🏅 Golden Balls — World Cup Daily', date, ''];
  puzzles.forEach((p, i) => {
    const state = states[i];
    const emoji = p.categoryEmoji;
    const squares: string[] = state.results.map(r =>
      r === 'correct' ? '🟩' : r === 'close' ? '🟨' : '⬛'
    );
    if (state.failed) squares.push('🟥');
    lines.push(`${emoji} ${p.category}: ${squares.join('')}`);
  });
  lines.push('');
  lines.push('🌍 Play at goldenballs.gg');
  return lines.join('\n');
}

const STORAGE_KEY = 'cap_day_state';

export function loadDayState(date: string): DayState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: DayState = JSON.parse(raw);
    if (parsed.date !== date) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveDayState(state: DayState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
