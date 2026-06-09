'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDailyPuzzles, getTodayString, Puzzle } from '@/lib/puzzles';
import { DayState, PuzzleState, GuessResult, initPuzzleState, loadDayState, saveDayState } from '@/lib/gameState';
import PlayerPuzzleCard from './components/PlayerPuzzle';
import StatPuzzleCard from './components/StatPuzzle';
import ScoreCard from './components/ScoreCard';

export default function Home() {
  const [date] = useState(getTodayString);
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [dayState, setDayState] = useState<DayState | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const p = getDailyPuzzles(date);
    setPuzzles(p);
    const saved = loadDayState(date);
    if (saved) {
      setDayState(saved);
      setShowScore(saved.complete);
      // find first unsolved
      const firstUnsolved = saved.puzzleStates.findIndex(s => !s.solved && !s.failed);
      setActiveIndex(firstUnsolved === -1 ? p.length - 1 : firstUnsolved);
    } else {
      const fresh: DayState = {
        date,
        puzzleStates: p.map((_, i) => initPuzzleState(i)),
        complete: false,
      };
      setDayState(fresh);
      saveDayState(fresh);
    }
  }, [date]);

  const handleGuess = (
    puzzleIndex: number,
    _guess: string,
    _result: GuessResult,
    newPartial: Partial<PuzzleState>
  ) => {
    if (!dayState) return;
    const newStates = dayState.puzzleStates.map((s, i) =>
      i === puzzleIndex ? { ...s, ...newPartial } : s
    );
    const complete = newStates.every(s => s.solved || s.failed);
    const newDay: DayState = { ...dayState, puzzleStates: newStates, complete };
    setDayState(newDay);
    saveDayState(newDay);

    if (complete) {
      setTimeout(() => setShowScore(true), 800);
    } else {
      // Auto-advance after correct/failed
      const updated = newStates[puzzleIndex];
      if (updated.solved || updated.failed) {
        const next = newStates.findIndex((s, i) => i > puzzleIndex && !s.solved && !s.failed);
        if (next !== -1) setTimeout(() => setActiveIndex(next), 600);
      }
    }
  };

  if (!dayState || puzzles.length === 0) {
    return (
      <div className="loading">
        <div className="display loading-text">Loading today's puzzles...</div>
      </div>
    );
  }

  return (
    <div className="app-wrap">
      {/* Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="logo display">🏆 GOLDEN BALLS 🏆</div>
          <div className="logo-sub">World Cup Daily</div>
        </div>
        <div className="date-badge">{formatDate(date)}</div>
      </header>

      {/* Tab nav */}
      <nav className="puzzle-nav">
        {puzzles.map((p, i) => {
          const s = dayState.puzzleStates[i];
          const status = s.solved ? 'done-correct' : s.failed ? 'done-wrong' : i === activeIndex ? 'active' : 'idle';
          return (
            <button
              key={i}
              className={`nav-tab nav-tab-${status}`}
              onClick={() => setActiveIndex(i)}
            >
              <span className="nav-emoji">{p.categoryEmoji}</span>
              <span className="nav-label">{p.category}</span>
              {s.solved && <span className="nav-check">✓</span>}
              {s.failed && <span className="nav-cross">✗</span>}
            </button>
          );
        })}
      </nav>

      {/* Active puzzle */}
      <main className="puzzle-area">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
          >
            {puzzles[activeIndex].type === 'player' ? (
              <PlayerPuzzleCard
                puzzle={puzzles[activeIndex] as any}
                state={dayState.puzzleStates[activeIndex]}
                onGuess={(g, r, s) => handleGuess(activeIndex, g, r, s)}
              />
            ) : (
              <StatPuzzleCard
                puzzle={puzzles[activeIndex] as any}
                state={dayState.puzzleStates[activeIndex]}
                onGuess={(g, r, s) => handleGuess(activeIndex, g, r, s)}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Next puzzle nudge */}
        {(dayState.puzzleStates[activeIndex].solved || dayState.puzzleStates[activeIndex].failed) && !showScore && (
          <motion.div
            className="next-nudge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {puzzles.findIndex((_, i) => i > activeIndex && !dayState.puzzleStates[i].solved && !dayState.puzzleStates[i].failed) !== -1
              ? <button className="next-btn" onClick={() => {
                  const next = puzzles.findIndex((_, i) => i > activeIndex && !dayState.puzzleStates[i].solved && !dayState.puzzleStates[i].failed);
                  setActiveIndex(next);
                }}>Next puzzle →</button>
              : <button className="next-btn" onClick={() => setShowScore(true)}>See your score →</button>
            }
          </motion.div>
        )}
      </main>

      {/* Score overlay */}
      <AnimatePresence>
        {showScore && (
          <motion.div
            className="score-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={e => { if (e.target === e.currentTarget) setShowScore(false); }}
          >
            <ScoreCard
              puzzles={puzzles}
              states={dayState.puzzleStates}
              date={date}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
