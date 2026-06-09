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
    category: 'Goals in the Tournament',
    categoryEmoji: '⚽',
    tournament: '2002 Korea/Japan',
    question: 'How many goals did Ronaldo score at the 2002 World Cup?',
    answer: 8,
    unit: 'goals',
    hint: 'He won the Golden Boot — it was a lot',
    flavour: '8 goals — including 2 in the final against Germany. R9 at his absolute peak.',
  },
  {
    type: 'stat',
    category: 'Age at Tournament',
    categoryEmoji: '🎂',
    tournament: '1998 France',
    question: 'How old was Michael Owen when he scored THAT goal against Argentina at the 1998 World Cup?',
    answer: 18,
    unit: 'years old',
    hint: 'He was still a teenager — famously young',
    flavour: '18 years old. One of the greatest individual goals in World Cup history, from a kid.',
  },
  {
    type: 'stat',
    category: 'Minutes Played',
    categoryEmoji: '⏱️',
    tournament: '2006 Germany',
    question: 'In what minute did Zidane headbutt Materazzi in the 2006 World Cup final?',
    answer: 110,
    unit: 'minutes',
    hint: 'It was in extra time — the second half of extra time',
    flavour: '110th minute. Extra time. His last ever professional act. Still one of the most shocking moments in football history.',
  },
  {
    type: 'stat',
    category: 'Goals in the Tournament',
    categoryEmoji: '⚽',
    tournament: '2006 Germany',
    question: 'How many goals did Miroslav Klose score at the 2006 World Cup?',
    answer: 5,
    unit: 'goals',
    hint: 'He won the Golden Boot that year',
    flavour: '5 goals — and he\'d go on to score 16 in total across four World Cups. The greatest World Cup scorer ever.',
  },
  {
    type: 'stat',
    category: 'World Cups Played',
    categoryEmoji: '🌍',
    tournament: 'Career',
    question: 'How many World Cups did Miroslav Klose play in across his career?',
    answer: 4,
    unit: 'World Cups',
    hint: 'He started in 2002 and finished in 2014',
    flavour: '4 World Cups — 2002, 2006, 2010, 2014. 16 goals. A record that may never be broken.',
  },
  {
    type: 'stat',
    category: 'Age at Tournament',
    categoryEmoji: '🎂',
    tournament: '2022 Qatar',
    question: 'How old was Lionel Messi when he finally won the World Cup in 2022?',
    answer: 35,
    unit: 'years old',
    hint: 'He\'d been waiting his whole career — it wasn\'t early',
    flavour: '35 years old. The greatest player of all time finally got the one trophy that had eluded him.',
  },
  {
    type: 'stat',
    category: 'Goals in the Final',
    categoryEmoji: '🥅',
    tournament: '2022 Qatar',
    question: 'How many goals did Kylian Mbappé score in the 2022 World Cup final alone?',
    answer: 3,
    unit: 'goals',
    hint: 'He nearly won it single-handedly for France',
    flavour: '3 goals in the final — a hat-trick. France still lost on penalties. The most devastating performance in a losing cause.',
  },
  {
    type: 'stat',
    category: 'Penalties in Shootout',
    categoryEmoji: '🎯',
    tournament: '2022 Qatar',
    question: 'How many penalties were scored in total (both teams) in the 2022 World Cup final shootout?',
    answer: 7,
    unit: 'penalties scored',
    hint: 'It went to sudden death — both teams were very good from the spot',
    flavour: '7 penalties scored in the shootout — Argentina won 4-2 after both sides missed one each.',
  },
  {
    type: 'stat',
    category: 'Age at Tournament',
    categoryEmoji: '🎂',
    tournament: '2018 Russia',
    question: 'How old was Kylian Mbappé when France won the 2018 World Cup?',
    answer: 19,
    unit: 'years old',
    hint: 'He was very young — the next generation had arrived',
    flavour: '19 years old — the second teenager after Pelé to score in a World Cup final. A star was born.',
  },
  {
    type: 'stat',
    category: 'Goals Conceded',
    categoryEmoji: '😬',
    tournament: '2014 Brazil',
    question: 'How many goals did Brazil concede against Germany in the famous 2014 semi-final?',
    answer: 7,
    unit: 'goals',
    hint: 'It was the most humiliating night in Brazilian football history',
    flavour: '7-1. The Mineirazo. Brazil, at home, in the semi-final. Utterly demolished.',
  },
  {
    type: 'stat',
    category: 'World Cups Played',
    categoryEmoji: '🌍',
    tournament: 'Career',
    question: 'How many World Cup finals did Argentina reach before Messi finally won in 2022?',
    answer: 2,
    unit: 'finals',
    hint: 'He lost one before he won one',
    flavour: '2 finals before the win — 2014 (lost to Germany) then 2022 (beat France). Third time wasn\'t needed.',
  },
  {
    type: 'stat',
    category: 'Minutes to Goal',
    categoryEmoji: '⚡',
    tournament: '2014 Brazil',
    question: 'In what minute did Mario Götze score the winning goal in the 2014 World Cup final?',
    answer: 113,
    unit: 'minutes',
    hint: 'It was in extra time — the second period',
    flavour: '113th minute. Götze controlled Schürrle\'s cross on his chest and volleyed past Romero. One of the great World Cup final goals.',
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
