export type PuzzleType = 'player' | 'stat';

export interface Clue {
  label: string;
  value: string;
}

export interface PlayerPuzzle {
  type: 'player';
  category: string;
  categoryEmoji: string;
  tournament: string; // e.g. "2006 Germany"
  answer: string;
  clues: Clue[]; // revealed one at a time on wrong guess
  flavour: string; // fun description shown on reveal
}

export interface StatPuzzle {
  type: 'stat';
  category: string;
  categoryEmoji: string;
  tournament: string;
  question: string;
  answer: number;
  unit: string; // "goals", "passes", "km", etc.
  hint: string; // shown after 3 wrong guesses
  flavour: string;
}

export type Puzzle = PlayerPuzzle | StatPuzzle;

export interface DailySet {
  date: string; // YYYY-MM-DD
  puzzles: Puzzle[];
}

// ─── PUZZLE DATA ──────────────────────────────────────────────────────────────

const ALL_PUZZLES: Puzzle[] = [
  // ── PLAYER PUZZLES ──
  {
    type: 'player',
    category: 'Player of the Tournament',
    categoryEmoji: '🐐',
    tournament: '2002 Korea/Japan',
    answer: 'Oliver Kahn',
    clues: [
      { label: 'Nation', value: 'Germany 🇩🇪' },
      { label: 'Position', value: 'Goalkeeper' },
      { label: 'Club at time', value: 'Bayern Munich' },
      { label: 'Known for', value: 'Keeping Germany in the tournament almost single-handedly' },
      { label: 'Unusual fact', value: 'Only goalkeeper ever to win the Golden Ball' },
    ],
    flavour: 'The only keeper to ever win the Golden Ball — Oliver Kahn was a one-man wall in 2002.',
  },
  {
    type: 'player',
    category: 'Golden Boot Winner',
    categoryEmoji: '🥾',
    tournament: '2002 Korea/Japan',
    answer: 'Ronaldo',
    clues: [
      { label: 'Nation', value: 'Brazil 🇧🇷' },
      { label: 'Position', value: 'Striker' },
      { label: 'Goals scored', value: '8' },
      { label: 'Club at time', value: 'Inter Milan' },
      { label: 'Famous moment', value: 'Two goals in the final against Germany' },
    ],
    flavour: 'R9. Eight goals. The haircut. The final. Enough said.',
  },
  {
    type: 'player',
    category: 'Most Cards (Dirtiest Player)',
    categoryEmoji: '🟥',
    tournament: '2006 Germany',
    answer: 'Zinedine Zidane',
    clues: [
      { label: 'Nation', value: 'France 🇫🇷' },
      { label: 'Position', value: 'Midfielder' },
      { label: 'Tournament', value: 'His final professional match' },
      { label: 'What happened', value: 'Red card in extra time of the World Cup final' },
      { label: 'Opponent', value: 'Marco Materazzi, Italy 🇮🇹' },
    ],
    flavour: 'The greatest player of his generation. The most iconic red card in history. The headbutt heard round the world.',
  },
  {
    type: 'player',
    category: 'Golden Boot Winner',
    categoryEmoji: '🥾',
    tournament: '2006 Germany',
    answer: 'Miroslav Klose',
    clues: [
      { label: 'Nation', value: 'Germany 🇩🇪' },
      { label: 'Position', value: 'Striker' },
      { label: 'Goals scored', value: '5' },
      { label: 'Fun fact', value: 'World Cup all-time top scorer with 16 goals' },
      { label: 'Style', value: 'Famous for somersault goal celebrations' },
    ],
    flavour: 'Klose scored 5 in 2006 on his way to becoming the World Cup\'s greatest ever scorer.',
  },
  {
    type: 'player',
    category: 'Player of the Tournament',
    categoryEmoji: '🐐',
    tournament: '2010 South Africa',
    answer: 'Diego Forlán',
    clues: [
      { label: 'Nation', value: 'Uruguay 🇺🇾' },
      { label: 'Position', value: 'Striker' },
      { label: 'Club at time', value: 'Atlético Madrid' },
      { label: 'Goals scored', value: '5' },
      { label: 'Surprise', value: 'Uruguay reached the semi-finals' },
    ],
    flavour: 'Uruguay\'s elegant striker lit up South Africa and took home the Golden Ball.',
  },
  {
    type: 'player',
    category: 'Golden Boot Winner',
    categoryEmoji: '🥾',
    tournament: '2010 South Africa',
    answer: 'Thomas Müller',
    clues: [
      { label: 'Nation', value: 'Germany 🇩🇪' },
      { label: 'Position', value: 'Forward / second striker' },
      { label: 'Goals scored', value: '5' },
      { label: 'Club at time', value: 'Bayern Munich' },
      { label: 'Bonus', value: 'Also won Golden Boot in 2014' },
    ],
    flavour: 'A 20-year-old Müller burst onto the world stage in South Africa, scoring 5 and winning Golden Boot.',
  },
  {
    type: 'player',
    category: 'Player of the Tournament',
    categoryEmoji: '🐐',
    tournament: '2014 Brazil',
    answer: 'Lionel Messi',
    clues: [
      { label: 'Nation', value: 'Argentina 🇦🇷' },
      { label: 'Position', value: 'Forward' },
      { label: 'Goals scored', value: '4' },
      { label: 'Result', value: 'Argentina lost the final to Germany' },
      { label: 'Controversy', value: 'Many felt Müller or Neuer deserved it more' },
    ],
    flavour: 'Won the Golden Ball despite losing the final — one of the most debated award decisions ever.',
  },
  {
    type: 'player',
    category: 'Fastest Goal',
    categoryEmoji: '⚡',
    tournament: '2014 Brazil',
    answer: 'Clint Dempsey',
    clues: [
      { label: 'Nation', value: 'USA 🇺🇸' },
      { label: 'Time of goal', value: '29 seconds' },
      { label: 'Opponent', value: 'Ghana 🇬🇭' },
      { label: 'Position', value: 'Forward' },
      { label: 'Club at time', value: 'Seattle Sounders' },
    ],
    flavour: '29 seconds. Clint Dempsey scored the fastest goal of the 2014 World Cup against Ghana.',
  },
  {
    type: 'player',
    category: 'Golden Boot Winner',
    categoryEmoji: '🥾',
    tournament: '2018 Russia',
    answer: 'Harry Kane',
    clues: [
      { label: 'Nation', value: 'England 🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      { label: 'Goals scored', value: '6' },
      { label: 'Club at time', value: 'Tottenham Hotspur' },
      { label: 'Included', value: '2 penalties and a lucky deflection' },
      { label: 'England result', value: 'Semi-finals — knocked out by Croatia' },
    ],
    flavour: 'Six goals, two penalties, one very fortunate deflection. Kane claimed the boot England waited decades for.',
  },
  {
    type: 'player',
    category: 'Breakout Star',
    categoryEmoji: '🚀',
    tournament: '2018 Russia',
    answer: 'Kylian Mbappé',
    clues: [
      { label: 'Nation', value: 'France 🇫🇷' },
      { label: 'Age at tournament', value: '19' },
      { label: 'Goals scored', value: '4' },
      { label: 'Famous moment', value: 'First teenager to score in a WC final since Pelé' },
      { label: 'Club at time', value: 'Paris Saint-Germain' },
    ],
    flavour: 'Nineteen years old. Four goals. A World Cup winner. The heir apparent arrived in Russia.',
  },
  {
    type: 'player',
    category: 'Player of the Tournament',
    categoryEmoji: '🐐',
    tournament: '2022 Qatar',
    answer: 'Lionel Messi',
    clues: [
      { label: 'Nation', value: 'Argentina 🇦🇷' },
      { label: 'Goals scored', value: '7' },
      { label: 'Result', value: 'Won the World Cup — beat France on penalties' },
      { label: 'Final performance', value: '2 goals in normal time, 1 in extra time' },
      { label: 'Legacy', value: 'His long-awaited first World Cup title' },
    ],
    flavour: 'The greatest player of all time. The only trophy missing from his cabinet. Qatar 2022 was his masterpiece.',
  },
  {
    type: 'player',
    category: 'Golden Boot Winner',
    categoryEmoji: '🥾',
    tournament: '2022 Qatar',
    answer: 'Kylian Mbappé',
    clues: [
      { label: 'Nation', value: 'France 🇫🇷' },
      { label: 'Goals scored', value: '8' },
      { label: 'Notable', value: 'Hat-trick in the World Cup final' },
      { label: 'Result', value: 'France lost on penalties to Argentina' },
      { label: 'Age', value: '23 — still the youngest at the tournament' },
    ],
    flavour: 'Eight goals including a final hat-trick. France still lost. The most devastating individual performance in a losing cause.',
  },
  {
    type: 'player',
    category: 'Penalty Shootout Hero',
    categoryEmoji: '🧤',
    tournament: '1998 France',
    answer: 'Fabien Barthez',
    clues: [
      { label: 'Nation', value: 'France 🇫🇷' },
      { label: 'Position', value: 'Goalkeeper' },
      { label: 'Known for', value: 'Shaved head and psychological tactics' },
      { label: 'Tournament result', value: 'France won the World Cup on home soil' },
      { label: 'Club at time', value: 'Monaco' },
    ],
    flavour: 'The shaven-headed stopper was the rock behind France\'s first World Cup triumph.',
  },

  // ── STAT PUZZLES ──
  {
    type: 'stat',
    category: 'Total Goals Scored',
    categoryEmoji: '⚽',
    tournament: '2014 Brazil',
    question: 'How many total goals were scored across all matches at the 2014 World Cup in Brazil?',
    answer: 171,
    unit: 'goals',
    hint: 'It was the highest-scoring World Cup since 1998',
    flavour: '171 goals — the most goals scored at a World Cup since France 1998, averaging 2.67 per game.',
  },
  {
    type: 'stat',
    category: 'Total Passes — Player',
    categoryEmoji: '👟',
    tournament: '2014 Brazil',
    question: 'How many passes did Toni Kroos complete across all his matches at the 2014 World Cup?',
    answer: 392,
    unit: 'passes',
    hint: 'Germany\'s midfield metronome was relentless in Brazil',
    flavour: '392 completed passes — Kroos was the engine room of Germany\'s World Cup winning machine.',
  },
  {
    type: 'stat',
    category: 'Distance Covered',
    categoryEmoji: '🏃',
    tournament: '2018 Russia',
    question: 'Roughly how many kilometres did the average outfield player run per match at the 2018 World Cup?',
    answer: 10,
    unit: 'km',
    hint: 'Think about a typical professional match distance',
    flavour: 'Around 10km per match — elite athletes covering the equivalent of a 10K race every 90 minutes.',
  },
  {
    type: 'stat',
    category: 'Yellow Cards',
    categoryEmoji: '🟨',
    tournament: '2006 Germany',
    question: 'How many yellow cards were shown in total across the 2006 World Cup — the most in any tournament?',
    answer: 345,
    unit: 'yellow cards',
    hint: 'It was a notoriously feisty tournament — referees were busy',
    flavour: '345 yellows — 2006 holds the record for most bookings in a single World Cup tournament.',
  },
  {
    type: 'stat',
    category: 'Saves — Goalkeeper',
    categoryEmoji: '🧤',
    tournament: '2022 Qatar',
    question: 'How many saves did Morocco goalkeeper Yassine Bounou (Bono) make across the entire 2022 World Cup?',
    answer: 22,
    unit: 'saves',
    hint: 'Morocco made it to the semi-finals — their keeper was busy',
    flavour: '22 saves — Bounou was the cornerstone of Morocco\'s historic run to the semi-finals.',
  },
  {
    type: 'stat',
    category: 'Top Speed',
    categoryEmoji: '💨',
    tournament: '2018 Russia',
    question: 'What was the top speed (km/h) recorded by any player at the 2018 World Cup? (Whole number)',
    answer: 36,
    unit: 'km/h',
    hint: 'Faster than Usain Bolt\'s average speed over 100m',
    flavour: '36 km/h — the blistering top speed recorded at Russia 2018, showcasing elite athletic performance.',
  },
  {
    type: 'stat',
    category: 'Goals Scored — Player',
    categoryEmoji: '🎯',
    tournament: '2022 Qatar',
    question: 'How many goals did Kylian Mbappé score at the 2022 World Cup?',
    answer: 8,
    unit: 'goals',
    hint: 'He scored a hat-trick in the final alone',
    flavour: '8 goals — Mbappé\'s haul included a devastating hat-trick in the final, still not enough for France.',
  },
  {
    type: 'stat',
    category: 'Attendance',
    categoryEmoji: '🏟️',
    tournament: '1998 France',
    question: 'How many total spectators attended the 1998 World Cup in France? (in millions, round to nearest whole number)',
    answer: 2,
    unit: 'million fans',
    hint: 'France 98 was a massive cultural moment across 10 stadiums',
    flavour: 'Around 2.8 million fans attended — France 98 was one of the most celebrated tournaments ever hosted.',
  },
  {
    type: 'stat',
    category: 'Fouls Committed',
    categoryEmoji: '😤',
    tournament: '2010 South Africa',
    question: 'How many total fouls were committed across all 64 matches at the 2010 World Cup?',
    answer: 1109,
    unit: 'fouls',
    hint: 'Roughly 17 fouls per game on average',
    flavour: '1,109 fouls across 64 games — defenders were busy in South Africa.',
  },
];

// ─── DAILY SEED LOGIC ─────────────────────────────────────────────────────────

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function dateToSeed(dateStr: string): number {
  return dateStr.split('-').join('').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
}

export function getDailyPuzzles(dateStr: string): Puzzle[] {
  const seed = dateToSeed(dateStr);
  const rng = seededRandom(seed);

  // Separate by type for balance
  const playerPuzzles = ALL_PUZZLES.filter(p => p.type === 'player');
  const statPuzzles = ALL_PUZZLES.filter(p => p.type === 'stat');

  const shuffle = <T>(arr: T[], r: () => number): T[] =>
    [...arr].sort(() => r() - 0.5);

  const shuffledPlayers = shuffle(playerPuzzles, rng);
  const shuffledStats = shuffle(statPuzzles, rng);

  // 2 player + 2 stat per day
  return [
    shuffledPlayers[0],
    shuffledStats[0],
    shuffledPlayers[1],
    shuffledStats[1],
  ];
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}
