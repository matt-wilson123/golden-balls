'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayerPuzzle as PP } from '@/lib/puzzles';
import { PuzzleState, checkPlayerGuess, GuessResult } from '@/lib/gameState';

interface Props {
  puzzle: PP;
  state: PuzzleState;
  onGuess: (guess: string, result: GuessResult, newState: Partial<PuzzleState>) => void;
}

const MAX_GUESSES = 6;

export default function PlayerPuzzleCard({ puzzle, state, onGuess }: Props) {
  const [input, setInput] = useState('');
  const isOver = state.solved || state.failed;

  const handleSubmit = () => {
    if (!input.trim() || isOver) return;
    const result = checkPlayerGuess(input, puzzle.answer);
    const newGuesses = [...state.guesses, input];
    const newResults = [...state.results, result];
    const solved = result === 'correct';
    const failed = !solved && newGuesses.length >= MAX_GUESSES;
    const cluesRevealed = Math.min(
      puzzle.clues.length,
      state.cluesRevealed + (result === 'wrong' ? 1 : 0)
    );
    onGuess(input, result, { guesses: newGuesses, results: newResults, solved, failed, cluesRevealed });
    setInput('');
  };

  return (
    <div className="puzzle-card">
      <div className="puzzle-header">
        <span className="puzzle-emoji">{puzzle.categoryEmoji}</span>
        <div>
          <div className="puzzle-category">{puzzle.category}</div>
          <div className="puzzle-tournament">{puzzle.tournament}</div>
        </div>
      </div>

      {/* Clues */}
      <div className="clues-list">
        {puzzle.clues.slice(0, state.cluesRevealed).map((clue, i) => (
          <motion.div
            key={i}
            className="clue-row"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <span className="clue-label">{clue.label}</span>
            <span className="clue-value">{clue.value}</span>
          </motion.div>
        ))}
        {state.cluesRevealed < puzzle.clues.length && !isOver && (
          <div className="clue-locked">
            🔒 {puzzle.clues.length - state.cluesRevealed} more clue{puzzle.clues.length - state.cluesRevealed !== 1 ? 's' : ''} locked — keep guessing
          </div>
        )}
      </div>

      {/* Guess history */}
      {state.guesses.length > 0 && (
        <div className="guess-history">
          {state.guesses.map((g, i) => (
            <div key={i} className={`guess-pill guess-${state.results[i]}`}>
              {state.results[i] === 'correct' ? '🟩' : '⬛'} {g}
            </div>
          ))}
        </div>
      )}

      {/* Input */}
      {!isOver && (
        <div className="input-row">
          <input
            className="guess-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="Name the player..."
            autoComplete="off"
          />
          <button className="guess-btn" onClick={handleSubmit}>
            Go
          </button>
        </div>
      )}

      {/* Attempts counter */}
      {!isOver && (
        <div className="attempts-left">
          {MAX_GUESSES - state.guesses.length} guess{MAX_GUESSES - state.guesses.length !== 1 ? 'es' : ''} remaining
        </div>
      )}

      {/* Reveal */}
      <AnimatePresence>
        {isOver && (
          <motion.div
            className={`reveal-box ${state.solved ? 'reveal-correct' : 'reveal-wrong'}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="reveal-answer">
              {state.solved ? '🟩 Correct!' : `🟥 The answer was ${puzzle.answer}`}
            </div>
            <div className="reveal-flavour">{puzzle.flavour}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
