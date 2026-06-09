'use client';
import { motion } from 'framer-motion';
import { Puzzle } from '@/lib/puzzles';
import { PuzzleState, getShareText } from '@/lib/gameState';
import { useState } from 'react';

interface Props {
  puzzles: Puzzle[];
  states: PuzzleState[];
  date: string;
}

export default function ScoreCard({ puzzles, states, date }: Props) {
  const [copied, setCopied] = useState(false);
  const solved = states.filter(s => s.solved).length;

  const share = () => {
    const text = getShareText(puzzles, states, date);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getMessage = () => {
    if (solved === 4) return { text: 'GOLDEN BALLS', sub: 'Perfect score. Becks himself would be proud.', emoji: '🏅' };
    if (solved === 3) return { text: 'THREE LIONS', sub: 'Three out of four — class act.', emoji: '🦁' };
    if (solved === 2) return { text: 'SQUAD PLAYER', sub: 'Two out of four. You\'re in the squad, just not starting.', emoji: '⚽' };
    if (solved === 1) return { text: 'MIKE BASSETT', sub: 'One out of four. Route one football knowledge.', emoji: '📋' };
    return { text: 'SENT OFF', sub: 'Nil points. Steve McClaren is available if you need coaching.', emoji: '🟥' };
  };

  const msg = getMessage();

  return (
    <motion.div
      className="scorecard"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="scorecard-emoji">{msg.emoji}</div>
      <div className="scorecard-title display">{msg.text}</div>
      <div className="scorecard-sub">{msg.sub}</div>
      <div className="scorecard-score display">{solved} / 4</div>

      <div className="scorecard-grid">
        {puzzles.map((p, i) => {
          const s = states[i];
          return (
            <div key={i} className="scorecard-row">
              <span className="scorecard-cat">{p.categoryEmoji} {p.category}</span>
              <div className="scorecard-squares">
                {s.results.map((r, j) => (
                  <span key={j} className={`sq sq-${r}`} />
                ))}
                {s.failed && <span className="sq sq-failed" />}
              </div>
            </div>
          );
        })}
      </div>

      <button className="share-btn" onClick={share}>
        {copied ? '✓ Copied!' : '📋 Share Result'}
      </button>

      <div className="next-puzzle-hint">Next puzzles in {getTimeToMidnight()}</div>
    </motion.div>
  );
}

function getTimeToMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight.getTime() - now.getTime();
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return `${h}h ${m}m`;
}
