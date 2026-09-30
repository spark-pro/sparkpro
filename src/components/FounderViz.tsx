'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Stage = 0 | 1 | 2 | 3 | 4;

const FOUNDER_DECISIONS = [
  { label: 'Hiring', angle: -90 },
  { label: 'Attendance', angle: -38 },
  { label: 'Payroll', angle: 14 },
  { label: 'Performance', angle: 66 },
  { label: 'Employee Issues', angle: 118 },
  { label: 'Approvals', angle: 170 },
  { label: 'Escalations', angle: 222 },
];

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

const FINAL_NODES = [
  { id: 'founder', label: 'Founder', sublabel: 'Business Direction', x: 240, y: 30, color: '#2B7FFF', size: 52 },
  { id: 'managers', label: 'Managers', sublabel: 'People Ownership', x: 80, y: 155, color: '#22C55E', size: 44 },
  { id: 'hr', label: 'HR Systems', sublabel: 'Governance', x: 240, y: 155, color: '#A78BFA', size: 44 },
  { id: 'systems', label: 'Systems', sublabel: 'Processes', x: 400, y: 155, color: '#F59E0B', size: 40 },
  { id: 'employees', label: 'Employees', sublabel: 'Clarity', x: 160, y: 275, color: '#34D399', size: 40 },
  { id: 'data', label: 'Data', sublabel: 'Visibility', x: 320, y: 275, color: '#60A5FA', size: 36 },
];

const STAGE_LABELS: Record<Stage, string> = {
  0: 'Every decision flows through the founder.',
  1: 'People Infrastructure begins to take shape.',
  2: 'Managers take ownership of people decisions.',
  3: 'Structured governance and clear roles emerge.',
  4: 'A business that scales without founder dependency.',
};

interface Props {
  autoPlay?: boolean;
}

export default function FounderViz({ autoPlay = false }: Props) {
  const [stage, setStage] = useState<Stage>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const cx = 240;
  const cy = 170;
  const r = 130;

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setStage((s) => {
        const next = (s + 1) % 5;
        return next as Stage;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const advance = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setStage((s) => Math.min(s + 1, 4) as Stage);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const reset = () => {
    setStage(0);
    setIsAnimating(false);
  };

  const progress = stage / 4;

  return (
    <div className="relative w-full select-none">
      {/* Stage indicator */}
      <div className="flex gap-1.5 mb-6 justify-center">
        {([0, 1, 2, 3, 4] as Stage[]).map((s) => (
          <button
            key={s}
            onClick={() => setStage(s)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: stage === s ? 24 : 6,
              height: 6,
              background: stage === s ? '#2B7FFF' : 'rgba(43,127,255,0.2)',
            }}
            aria-label={`Stage ${s + 1}`}
          />
        ))}
      </div>

      {/* Main visualization */}
      <div className="relative" style={{ height: 340 }}>
        <svg
          viewBox="0 0 480 340"
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="founder-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2B7FFF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2B7FFF" stopOpacity="0" />
            </radialGradient>
            <filter id="blur-glow">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection lines — founder hub */}
          {stage < 4 && FOUNDER_DECISIONS.map((d, i) => {
            const pos = polarToXY(cx, cy, r, d.angle);
            const opacity = stage >= 3 ? Math.max(0, 1 - (stage - 3) * 0.8) : 1;
            return (
              <motion.line
                key={d.label}
                x1={cx} y1={cy}
                x2={pos.x} y2={pos.y}
                stroke="#2B7FFF"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: opacity * (stage === 0 ? 0.5 : stage === 1 ? 0.35 : 0.15),
                }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              />
            );
          })}

          {/* Structure lines — final state */}
          {stage >= 2 && FINAL_NODES.slice(1).map((node, i) => (
            <motion.line
              key={node.id}
              x1={FINAL_NODES[0].x} y1={FINAL_NODES[0].y + 26}
              x2={node.x} y2={node.y}
              stroke={node.color}
              strokeWidth={1.5}
              opacity={0.3}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.25 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            />
          ))}

          {/* Glow under founder */}
          <circle cx={cx} cy={cy} r={50} fill="url(#founder-glow)" opacity={Math.max(0, 1 - progress)} />
        </svg>

        {/* Stage 0-3: Founder hub nodes (absolute positioned) */}
        {stage < 4 && (
          <div className="absolute inset-0">
            {FOUNDER_DECISIONS.map((d, i) => {
              const pos = polarToXY(cx, cy, r, d.angle);
              const pct = (stage / 4);
              const x = (pos.x / 480) * 100;
              const y = (pos.y / 340) * 100;
              return (
                <motion.div
                  key={d.label}
                  className="absolute flex items-center justify-center"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: Math.max(0.2, 1 - pct * 0.6) }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <div
                    className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-center"
                    style={{
                      background: 'rgba(11,22,40,0.9)',
                      border: '1px solid rgba(43,127,255,0.25)',
                      color: '#93B4FF',
                      fontSize: '10px',
                      whiteSpace: 'nowrap',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {d.label}
                  </div>
                </motion.div>
              );
            })}

            {/* Founder center node */}
            <motion.div
              className="absolute flex flex-col items-center justify-center"
              style={{
                left: `${(cx / 480) * 100}%`,
                top: `${(cy / 340) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
              layout
            >
              <div
                className="rounded-2xl flex flex-col items-center justify-center"
                style={{
                  width: 72,
                  height: 72,
                  background: 'rgba(43,127,255,0.15)',
                  border: '2px solid #2B7FFF',
                  boxShadow: '0 0 30px rgba(43,127,255,0.3)',
                }}
              >
                <span className="text-lg" role="img" aria-label="founder">👤</span>
                <span className="text-xs font-bold text-white mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9 }}>FOUNDER</span>
              </div>
              {stage === 0 && (
                <motion.div
                  className="absolute -inset-4 rounded-3xl"
                  style={{ border: '1px dashed rgba(43,127,255,0.3)' }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          </div>
        )}

        {/* Stage 4: Final structured state */}
        <AnimatePresence>
          {stage === 4 && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {FINAL_NODES.map((node, i) => (
                <motion.div
                  key={node.id}
                  className="absolute"
                  style={{
                    left: `${(node.x / 480) * 100}%`,
                    top: `${(node.y / 340) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.08, type: 'spring', stiffness: 200 }}
                >
                  <div
                    className="rounded-xl flex flex-col items-center justify-center px-3 py-2 text-center"
                    style={{
                      minWidth: node.size + 24,
                      background: 'rgba(11,22,40,0.95)',
                      border: `1px solid ${node.color}40`,
                      boxShadow: `0 0 20px ${node.color}20`,
                    }}
                  >
                    <span className="font-bold text-xs" style={{ color: node.color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11 }}>
                      {node.label}
                    </span>
                    <span className="text-xs mt-0.5" style={{ color: 'rgba(226,232,244,0.5)', fontSize: 9, fontFamily: "'Inter', sans-serif" }}>
                      {node.sublabel}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stage label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={stage}
          className="text-center text-sm mt-4"
          style={{ color: 'rgba(226,232,244,0.5)', fontFamily: "'Inter', sans-serif" }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
        >
          {STAGE_LABELS[stage]}
        </motion.p>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex gap-3 justify-center mt-5">
        {stage < 4 ? (
          <button
            onClick={advance}
            disabled={isAnimating}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: '#2B7FFF',
              color: '#fff',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              opacity: isAnimating ? 0.7 : 1,
            }}
          >
            {stage === 0 ? 'See the Transformation →' : 'Continue →'}
          </button>
        ) : (
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              background: 'rgba(43,127,255,0.1)',
              color: '#60A5FA',
              border: '1px solid rgba(43,127,255,0.2)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            ↺ Replay
          </button>
        )}
      </div>
    </div>
  );
}
