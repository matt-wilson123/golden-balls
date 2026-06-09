'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StatPuzzle as SP } from '@/lib/puzzles';
import { PuzzleState, checkStatGuess, GuessResult } from '@/lib/gameState';

interface Props {
  puzzle: SP;
  state: PuzzleState;
  onGuess: (guess: string, result: GuessResult, newState: Partial<PuzzleState>) => void;
}

const MAX_GUESSES = 6;

export default function StatPuzzleCard({ puzzle, state, onGuess }: Props) {
  const [input, setInput] = useState('');
  const isOver = state.solved || state.failed;
  const showHint = state.guesses.length >= 3;

  const handleSubmit = () => {
    if (!input.trim() || isOver) return;
    const num = parseFloat(input);
    if (isNaN(num)) return;
    const result = checkStatGuess(num, puzzle.answer);
    const newGuesses = [...state.guesses, input];
    const newResults = [...state.results, result];
    const solved = result === 'correct';
    const failed = !solved && newGuesses.length >= MAX_GUESSES;
    onGuess(input, result, { guesses: newGuesses, results: newResults, solved, failed });
    setInput('');
  };

  const getDirectionHint = (guess: number) => {
    if (guess < puzzle.answer) return '📈 Higher';
    if (guess > puzzle.answer) return '📉 Lower';
    return null;
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

      <div className="stat-question">{puzzle.question}</div>
      <div className="stat-unit-badge">{puzzle.unit}</div>

      {showHint && !isOver && (
        <motion.div
          className="stat-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          💡 Hint: {puzzle.hint}
        </motion.div>
      )}

      {/* Guess history with higher/lower */}
      {state.guesses.length > 0 && (
        <div className="guess-history">
          {state.guesses.map((g, i) => {
            const num = parseFloat(g);
            const result = state.results[i];
            const dir = result !== 'correct' ? getDirectionHint(num) : null;
            return (
              <div key={i} className={`guess-pill guess-${result}`}>
                {result === 'correct' ? '🟩' : result === 'close' ? '🟨' : '⬛'}
                {' '}{g} {puzzle.unit}
                {dir && <span className="direction-hint"> — {dir}</span>}
                {result === 'close' && <span className="close-hint"> — 🔥 Very close!</span>}
              </div>
            );
          })}
        </div>
      )}

      {!isOver && (
        <div className="input-row">
          <input
            className="guess-input"
            type="number"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder={`Enter number of ${puzzle.unit}...`}
          />
          <button className="guess-btn" onClick={handleSubmit}>
            Go
          </button>
        </div>
      )}

      {!isOver && (
        <div className="attempts-left">
          {MAX_GUESSES - state.guesses.length} guess{MAX_GUESSES - state.guesses.length !== 1 ? 'es' : ''} remaining
        </div>
      )}

      <AnimatePresence>
        {isOver && (
          <motion.div
            className={`reveal-box ${state.solved ? 'reveal-correct' : 'reveal-wrong'}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="reveal-answer">
              {state.solved
                ? `🟩 Correct! ${puzzle.answer} ${puzzle.unit}`
                : `🟥 The answer was ${puzzle.answer} ${puzzle.unit}`}
            </div>
            <div className="reveal-flavour">{puzzle.flavour}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
