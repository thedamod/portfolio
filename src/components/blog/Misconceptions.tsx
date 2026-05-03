"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const SOURCES = [
  {
    id: "manual",
    name: "Manual capture",
    source: "manual",
    confidence: 0.85,
    confidenceLabel: "0.85 (default)",
    description:
      "Student explicitly flags something via the quick-capture UI. High precision, low recall — students are notoriously bad at flagging their own blind spots.",
    tradeoff: "You only capture what students already know they don't know.",
    color: "blue",
  },
  {
    id: "chat_tool",
    name: "Chat tool",
    source: "chat_tool",
    confidence: 0.72,
    confidenceLabel: "model-inferred",
    description:
      "Apollo calls log_misconception when it observes a clear conceptual error mid-conversation. Requires concept, reason, subject, topic, and confidence from the model.",
    tradeoff: "Depends on the model noticing — misses subtle wrong-but-fluent explanations.",
    color: "purple",
  },
  {
    id: "fsrs",
    name: "FSRS review signal",
    source: "fsrs_signal",
    confidence: 0.6,
    confidenceLabel: "0.60 (fixed)",
    description:
      "Two consecutive Again ratings on the same card triggers an automatic signal. Confidence is intentionally low — a hard card isn't always a misconception.",
    tradeoff: "High false-positive rate on legitimately difficult material.",
    color: "amber",
  },
  {
    id: "session",
    name: "Session inference",
    source: "auto",
    confidence: 0.78,
    confidenceLabel: "≥ 0.78 threshold",
    description:
      "On session close, a cheap structured model infers misconception candidates from the full transcript. Only persisted if user transcript matches confusion patterns AND confidence ≥ 0.78.",
    tradeoff: "Retrospective — fires minutes after confusion, not during.",
    color: "green",
  },
] as const;

type Color = (typeof SOURCES)[number]["color"];

const COLOR_MAP: Record<Color, { bar: string; badge: string; text: string; border: string }> = {
  blue:   { bar: "bg-app-accent", badge: "bg-app-accent/10 text-app-accent", text: "text-app-accent", border: "border-app-accent/35" },
  purple: { bar: "bg-app-accent-soft", badge: "bg-app-accent-soft/10 text-app-accent-soft", text: "text-app-accent-soft", border: "border-app-accent-soft/35" },
  amber:  { bar: "bg-app-heading", badge: "bg-app-heading/10 text-app-heading", text: "text-app-heading", border: "border-app-heading/25" },
  green:  { bar: "bg-app-text-muted", badge: "bg-app-text-muted/10 text-app-text-muted", text: "text-app-text-muted", border: "border-app-text-muted/30" },
};

export function SignalSources() {
  const [active, setActive] = useState<string>("manual");
  const selected = SOURCES.find((s) => s.id === active)!;
  const c = COLOR_MAP[selected.color];

  return (
    <div className="my-8 rounded-xl border border-app-border bg-app-surface-2 p-6 font-mono text-sm">
      <p className="mb-4 text-xs uppercase tracking-widest text-app-text-subtle">
        Interactive — Signal Sources
      </p>

      {/* Tab row */}
      <div className="flex gap-1 mb-4">
        {SOURCES.map((s) => {
          const sc = COLOR_MAP[s.color];
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex-1 px-2 py-1.5 rounded-lg text-[11px] font-mono transition-all duration-150 cursor-pointer border ${
                isActive
                  ? `${sc.badge} ${sc.border}`
                  : "text-app-text-subtle border-transparent hover:text-app-heading hover:bg-app-surface-hover"
              }`}
            >
              {s.name}
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={`font-mono text-xs mb-1 ${c.text}`}>source: "{selected.source}"</p>
            <p className="text-sm text-app-text-muted leading-relaxed">{selected.description}</p>
          </div>
        </div>

        {/* Confidence bar */}
        <div>
          <div className="flex justify-between mb-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-app-text-subtle">Default confidence</span>
            <span className={`font-mono text-[10px] ${c.text}`}>{selected.confidenceLabel}</span>
          </div>
          <div className="h-1.5 rounded-full bg-app-border overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${c.bar}`}
              style={{ width: `${selected.confidence * 100}%` }}
            />
          </div>
        </div>

        {/* Tradeoff */}
        <div className={`rounded-lg border px-3.5 py-2.5 text-xs text-app-text-muted leading-relaxed ${c.border} bg-app-surface`}>
          <span className={`font-mono text-[9px] uppercase tracking-wider ${c.text} block mb-1`}>tradeoff</span>
          {selected.tradeoff}
        </div>
      </div>
    </div>
  );
}

interface SliderProps {
  label: string;
  sublabel: string;
  min: number;
  max: number;
  step: number;
  value: number;
  display: string;
  onChange: (v: number) => void;
  accent?: string;
}

function Slider({ label, sublabel, min, max, step, value, display, onChange, accent = "var(--color-app-heading)" }: SliderProps) {
  return (
    <div className="grid gap-2">
      <div className="flex justify-between items-baseline">
        <div>
          <span className="text-xs text-app-text-muted">{label}</span>
          <span className="text-[10px] text-app-text-subtle ml-2 font-mono">{sublabel}</span>
        </div>
        <span className="font-mono text-xs tabular-nums" style={{ color: accent }}>{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-px bg-app-border rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
        style={{
          // @ts-ignore
          "--thumb-color": accent,
          background: `linear-gradient(to right, ${accent} 0%, ${accent} ${((value - min) / (max - min)) * 100}%, var(--color-app-border) ${((value - min) / (max - min)) * 100}%, var(--color-app-border) 100%)`,
        }}
      />
    </div>
  );
}

function scoreColor(s: number) {
  if (s > 0.65) return "var(--color-widget-success)";
  if (s > 0.35) return "var(--color-widget-warning)";
  return "var(--color-widget-danger)";
}

function scoreLabel(s: number) {
  if (s > 0.75) return "Strong";
  if (s > 0.55) return "Developing";
  if (s > 0.35) return "Fragile";
  return "At risk";
}

export function MasteryCalculator() {
  const [stability, setStability] = useState(14);
  const [perf, setPerf] = useState(0.7);
  const [negRaw, setNegRaw] = useState(0.2);
  const [miscCount, setMiscCount] = useState(1);
  const [miscScore, setMiscScore] = useState(0.8);

  const stabilityComp = Math.min(stability / 20, 1);
  const perfComp = perf;
  const negPenalty = Math.min(0.3, negRaw * 0.3);
  const miscPenalty = Math.min(0.5, Math.max(miscCount * 0.06, miscScore * 0.12));
  const raw = stabilityComp * perfComp - negPenalty - miscPenalty;
  const score = Math.max(0, Math.min(1, raw));

  const color = scoreColor(score);

  const components = [
    { label: "Stability", value: stabilityComp, sign: "+", color: "var(--color-app-heading)" },
    { label: "Performance", value: perfComp, sign: "×", color: "var(--color-app-heading)" },
    { label: "Neg penalty", value: negPenalty, sign: "−", color: "var(--color-widget-warning)" },
    { label: "Misc penalty", value: miscPenalty, sign: "−", color: "var(--color-widget-danger)" },
  ];

  return (
    <div className="my-8 rounded-xl border border-app-border bg-app-surface-2 p-6 font-mono text-sm">
      <p className="mb-4 text-xs uppercase tracking-widest text-app-text-subtle">
        Interactive — Mastery Score Calculator
      </p>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_200px]">
        {/* Sliders */}
        <div className="flex flex-col gap-4">
          <Slider
            label="FSRS stability"
            sublabel="avg days to 90% recall"
            min={0} max={30} step={1}
            value={stability}
            display={`${stability}d`}
            onChange={setStability}
          />
          <Slider
            label="Positive review ratio"
            sublabel="correct / total"
            min={0} max={1} step={0.01}
            value={perf}
            display={perf.toFixed(2)}
            onChange={setPerf}
          />
          <Slider
            label="Negative review rate"
            sublabel="penalty up to 0.30"
            min={0} max={1} step={0.01}
            value={negRaw}
            display={negPenalty.toFixed(2)}
            onChange={setNegRaw}
            accent="var(--color-widget-warning)"
          />
          <Slider
            label="Active misconceptions"
            sublabel="count"
            min={0} max={8} step={1}
            value={miscCount}
            display={`${miscCount}`}
            onChange={setMiscCount}
            accent="var(--color-widget-danger)"
          />
          <Slider
            label="Misconception confidence"
            sublabel="sum of active scores σ"
            min={0} max={4} step={0.01}
            value={miscScore}
            display={miscScore.toFixed(2)}
            onChange={setMiscScore}
            accent="var(--color-widget-danger)"
          />
        </div>

        {/* Score panel */}
        <div className="flex flex-col gap-3">
          {/* Big number */}
          <div
            className="rounded-xl border bg-app-surface p-4 flex flex-col items-center justify-center gap-1 transition-colors duration-300"
            style={{ borderColor: `${color}33` }}
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-app-text-subtle">mastery score</span>
            <span
              className="font-mono text-5xl font-light tabular-nums transition-colors duration-300"
              style={{ color }}
            >
              {score.toFixed(2)}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color }}>
              {scoreLabel(score)}
            </span>
          </div>

          {/* Arc bar */}
          <div className="rounded-xl border border-app-border bg-app-surface p-4">
            <div className="h-1.5 rounded-full bg-app-border overflow-hidden mb-3">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${score * 100}%`, background: color }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              {components.map((c) => (
                <div key={c.label} className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] text-app-text-subtle">{c.sign}</span>
                    <span className="font-mono text-[10px] text-app-text-subtle">{c.label}</span>
                  </div>
                  <span className="font-mono text-[10px] tabular-nums" style={{ color: c.color }}>
                    {c.value.toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t border-app-border mt-1 pt-1.5 flex justify-between items-center">
                <span className="font-mono text-[10px] text-app-text-subtle">= score</span>
                <span className="font-mono text-[10px] tabular-nums" style={{ color }}>
                  {score.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Misconception {
  name: string;
  topic: string;
  confidence: number;
  resolved: boolean;
}

const INITIAL: Misconception[] = [
  { name: "Newton's 3rd Law", topic: "Mechanics", confidence: 0.91, resolved: false },
  { name: "Conservation of momentum", topic: "Mechanics", confidence: 0.78, resolved: false },
  { name: "Work-energy theorem", topic: "Mechanics", confidence: 0.65, resolved: false },
  { name: "Gauss's Law", topic: "Electrostatics", confidence: 0.55, resolved: false },
];

const RESOLVE_THRESHOLD = 0.2;
const DELTA = 0.08;

function confidenceColor(conf: number, resolved: boolean) {
  if (resolved) return "var(--color-app-text-subtle)";
  if (conf > 0.7) return "var(--color-widget-danger)";
  if (conf > 0.4) return "var(--color-widget-warning)";
  return "var(--color-widget-success)";
}

export function DecayVisualizer() {
  const [state, setState] = useState<Misconception[]>(INITIAL);
  const [reviewCount, setReviewCount] = useState(0);

  const applyDecay = useCallback(() => {
    setState((prev) =>
      prev.map((m) => {
        if (m.resolved) return m;
        const next = Math.max(0, m.confidence - DELTA);
        return { ...m, confidence: next, resolved: next <= RESOLVE_THRESHOLD };
      })
    );
    setReviewCount((c) => c + 1);
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL.map((m) => ({ ...m })));
    setReviewCount(0);
  }, []);

  const activeCount = state.filter((m) => !m.resolved).length;

  return (
    <div className="my-8 rounded-xl border border-app-border bg-app-surface-2 p-6 font-mono text-sm">
      <p className="mb-4 text-xs uppercase tracking-widest text-app-text-subtle">
        Interactive — Confidence Decay
      </p>

      <div className="flex justify-between items-center mb-3">
        <span className="font-mono text-[10px] text-app-text-subtle">
          {activeCount} active · {reviewCount} reviews applied
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {state.map((m) => {
          const color = confidenceColor(m.confidence, m.resolved);
          const pct = m.confidence * 100;
          const thresholdPct = RESOLVE_THRESHOLD * 100;

          return (
            <div key={m.name} className="flex flex-col gap-1.5">
              <div className="flex justify-between items-baseline">
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-xs transition-colors duration-300"
                    style={{ color: m.resolved ? "var(--color-app-text-subtle)" : "var(--color-app-heading)" }}
                  >
                    {m.name}
                  </span>
                  {m.resolved && (
                    <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-app-text-muted/10 text-app-text-muted">
                      resolved
                    </span>
                  )}
                </div>
                <span
                  className="font-mono text-[11px] tabular-nums transition-colors duration-300"
                  style={{ color }}
                >
                  {m.confidence.toFixed(2)}
                </span>
              </div>
              <div className="relative h-1.5 rounded-full bg-app-border overflow-visible">
                {/* Threshold marker */}
                <div
                  className="absolute top-0 bottom-0 w-px bg-white/20 z-10"
                  style={{ left: `${thresholdPct}%` }}
                />
                {/* Fill */}
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${pct}%`, background: color }}
                />
              </div>
              <span className="font-mono text-[9px] text-app-text-subtle">{m.topic}</span>
            </div>
          );
        })}

        {/* Threshold legend */}
        <div className="flex items-center gap-2 mt-1 pt-3 border-t border-app-border">
          <div className="w-3 h-px bg-app-border-strong" />
          <span className="font-mono text-[9px] text-app-text-subtle">
            resolution threshold τ = {RESOLVE_THRESHOLD} — misconceptions below this auto-resolve
          </span>
        </div>

        {/* Controls */}
        <div className="flex gap-2 mt-1">
          <button
            onClick={applyDecay}
            disabled={activeCount === 0}
            className="flex-1 font-mono text-xs px-3 py-2 rounded-lg border border-app-heading/30 text-app-heading bg-app-heading/5
              hover:bg-app-heading/10 transition-all duration-150 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Apply positive review (δ = {DELTA})
          </button>
          <button
            onClick={reset}
            className="font-mono text-xs px-3 py-2 rounded-lg border border-app-border text-app-text-subtle
              hover:text-app-heading hover:border-app-heading transition-all duration-150 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

interface Event {
  id: number;
  stage: "embed" | "filter" | "classify" | "result";
  text: string;
  signal?: "hot" | "warm" | "cold";
  delay: number;
}

interface Scenario {
  label: string;
  sublabel: string;
  message: string;
  events: Omit<Event, "id">[];
}

const SCENARIOS: Scenario[] = [
  {
    label: "Confused",
    sublabel: "misconception re-encounter",
    message: "Wait I thought Newton's 3rd law means the forces cancel out? So why does anything actually move then?",
    events: [
      { stage: "embed", delay: 350, text: "Embedding message — 384 dims" },
      { stage: "filter", delay: 800, text: 'Cosine similarity vs "Newton\'s 3rd Law": 0.87 → above θ_fast (0.65)' },
      { stage: "classify", delay: 1350, text: "Llama 8B → isConfusion: true · relatedMisconceptionId: newton-3rd · confidence: 0.91" },
      { stage: "result", delay: 1800, text: 'Injecting: "Student re-encountering prior misconception about Newton\'s 3rd Law. Address proactively."', signal: "hot" },
    ],
  },
  {
    label: "Fluent",
    sublabel: "no intervention",
    message: "Can you give me a practice problem on conservation of momentum? Something with two objects colliding.",
    events: [
      { stage: "embed", delay: 350, text: "Embedding message — 384 dims" },
      { stage: "filter", delay: 800, text: 'Cosine similarity vs "Conservation of momentum": 0.79 → above θ_fast (0.65)' },
      { stage: "classify", delay: 1350, text: "Llama 8B → isConfusion: false · confidence: 0.07" },
      { stage: "result", delay: 1800, text: "Score below threshold. No intervention — stream continues normally.", signal: "cold" },
    ],
  },
  {
    label: "Ambiguous",
    sublabel: "new concept signal",
    message: "I keep getting the direction wrong when two objects collide. I don't understand what I'm missing here.",
    events: [
      { stage: "embed", delay: 350, text: "Embedding message — 384 dims" },
      { stage: "filter", delay: 800, text: 'Cosine similarity vs "Conservation of momentum": 0.71 → above θ_fast (0.65)' },
      { stage: "classify", delay: 1350, text: 'Llama 8B → isConfusion: true · newConceptSignal: "vector direction in collisions" · confidence: 0.74' },
      { stage: "result", delay: 1800, text: 'Watching for: "Possible confusion about vector direction in collisions."', signal: "warm" },
    ],
  },
  {
    label: "Off-topic",
    sublabel: "filtered at cosine",
    message: "Hey quick question — what's the best way to memorize the periodic table?",
    events: [
      { stage: "embed", delay: 350, text: "Embedding message — 384 dims" },
      { stage: "filter", delay: 800, text: "Max cosine similarity vs all active misconceptions: 0.21 → below θ_fast (0.65)" },
      { stage: "result", delay: 1100, text: "Pre-filter blocked classifier call. No compute used — stream continues.", signal: "cold" },
    ],
  },
];

const STAGE_LABELS: Record<Event["stage"], string> = {
  embed: "embed",
  filter: "cosine pre-filter",
  classify: "cerebras classifier",
  result: "decision",
};

const SIGNAL_STYLES = {
  hot:  { bg: "bg-app-heading/10", text: "text-app-heading", dot: "bg-app-heading", label: "intervention injected" },
  warm: { bg: "bg-app-accent/10", text: "text-app-accent", dot: "bg-app-accent", label: "soft watch injected" },
  cold: { bg: "bg-app-text-muted/10", text: "text-app-text-muted", dot: "bg-app-text-muted", label: "no intervention" },
};

let _id = 0;
const uid = () => ++_id;

export function RealTimeDemo() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [running, setRunning] = useState(false);
  const [userMessage, setUserMessage] = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const run = useCallback((scenarioIdx: number) => {
    clearTimers();
    const s = SCENARIOS[scenarioIdx];
    setEvents([]);
    setUserMessage(null);
    setRunning(true);
    setActiveScenario(scenarioIdx);

    const t0 = setTimeout(() => setUserMessage(s.message), 100);
    timers.current.push(t0);

    s.events.forEach((ev) => {
      const t = setTimeout(() => {
        setEvents((prev) => [...prev, { ...ev, id: uid() }]);
        if (ev.stage === "result") setRunning(false);
      }, ev.delay);
      timers.current.push(t);
    });
  }, []);

  useEffect(() => { run(0); return clearTimers; }, []);

  return (
    <div className="my-8 rounded-xl border border-app-border bg-app-surface-2 p-6 font-mono text-sm">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs uppercase tracking-widest text-app-text-subtle">
          Interactive — Real-Time Signal Detection
        </p>
        {running && (
          <span className="flex items-center gap-1.5 font-mono text-[9px] text-app-text-subtle">
            <span className="w-1 h-1 rounded-full bg-app-heading animate-pulse" />
            processing
          </span>
        )}
      </div>

      {/* Context strip */}
      <div className="mb-3 flex gap-2 items-center flex-wrap">
        <span className="font-mono text-[9px] uppercase tracking-wider text-app-text-subtle">active misconceptions</span>
        {["Newton's 3rd Law", "Conservation of momentum"].map((m) => (
          <span key={m} className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-app-heading/8 text-app-heading/60 border border-app-heading/10">
            {m}
          </span>
        ))}
      </div>

      {/* Scenario tabs */}
      <div className="flex gap-1 mb-4">
        {SCENARIOS.map((s, i) => (
          <button
            key={i}
            onClick={() => run(i)}
            className={`flex-1 flex flex-col items-center px-2 py-1.5 rounded-lg transition-all duration-150 cursor-pointer border text-left ${
              activeScenario === i
                ? "bg-app-heading/8 border-app-heading/25 text-app-heading"
                : "border-transparent text-app-text-subtle hover:text-app-heading hover:bg-app-surface-hover"
            }`}
          >
            <span className="font-mono text-[10px] font-medium">{s.label}</span>
            <span className="font-mono text-[8px] text-app-text-subtle hidden sm:block">{s.sublabel}</span>
          </button>
        ))}
      </div>

      {/* Chat area */}
      <div className="flex flex-col gap-2 min-h-48">
        {/* User message */}
        {userMessage && (
          <div className="self-end max-w-[80%] px-3 py-2 rounded-xl rounded-br-sm bg-app-heading/8 border border-app-heading/15 text-sm text-app-text-muted leading-relaxed">
            {userMessage}
          </div>
        )}

        {/* System events */}
        {events.map((ev) => {
          const sig = ev.signal ? SIGNAL_STYLES[ev.signal] : null;
          return (
            <div
              key={ev.id}
              className="self-start max-w-[90%] px-3 py-2 rounded-xl rounded-bl-sm bg-app-surface border border-app-border"
            >
              <span className="font-mono text-[9px] uppercase tracking-wider text-app-text-subtle block mb-1">
                {STAGE_LABELS[ev.stage]}
              </span>
              <span className="font-mono text-[11px] text-app-text-muted leading-relaxed">{ev.text}</span>
              {sig && (
                <span className={`mt-1.5 flex items-center gap-1.5 w-fit px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider ${sig.bg} ${sig.text}`}>
                  <span className={`w-1 h-1 rounded-full ${sig.dot}`} />
                  {sig.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface Step {
  title: string;
  badge?: { label: string; kind: "new" | "llm" | "det" };
  detail: string;
  code?: string;
}

const STEPS: Step[] = [
  {
    title: "User message persisted",
    badge: { label: "deterministic", kind: "det" },
    detail: "Every message is written to chat_message with position tracking before any processing happens. This is the source of truth — the session summary later references startPosition and endPosition into this sequence.",
    code: `// chat_message row
{ chatId, position, payload: UIMessage, createdAt }`,
  },
  {
    title: "Real-time signal detection",
    badge: { label: "new", kind: "new" },
    detail: "Message is embedded, cosine pre-filtered against active misconceptions (θ_fast = 0.65), then passed to the Cerebras/Groq classifier if above threshold. Runs in <100ms. Hard timeout at 800ms — never blocks the main stream.",
    code: `const signals = await Promise.race([
  detectSignals({ embedding, activeMisconceptions }),
  sleep(800).then(() => null)
])`,
  },
  {
    title: "Session context loaded",
    badge: { label: "deterministic", kind: "det" },
    detail: "Workspace subject summary, the most recent session summary for the resolved subject, active misconceptions, and the student profile are fetched and assembled into context objects.",
  },
  {
    title: "System prompt assembled",
    badge: { label: "deterministic", kind: "det" },
    detail: "Misconception context, student profile, session summary, and the optional real-time intervention flag are injected. The prompt treats misconceptions as private tutoring notes — not surfaced to the student directly.",
  },
  {
    title: "Main model streams response",
    badge: { label: "model", kind: "llm" },
    detail: "User-selected model (default apollo-apex / Kimi K2.5) streams with tool use. Tool results are logged in the UI message payload but not persisted separately yet.",
  },
  {
    title: "Session close inference",
    badge: { label: "model", kind: "llm" },
    detail: "On inactivity ≥30min or force-close, apollo-sprint (Mistral Small) runs structured inference over the session window. Returns conceptsCovered, misconceptionCandidates, subject, subjectConfidence, summaryText.",
    code: `// Only persist candidates if:
// 1. user transcript matches confusion regex
// 2. candidate.confidence >= 0.78`,
  },
  {
    title: "Misconception upsert",
    badge: { label: "deterministic", kind: "det" },
    detail: "Qualified candidates are upserted keyed on (workspaceId, userId, subject, topic, concept). Confidence takes max(existing, new), evidenceCount increments, resolvedAt clears on re-observation.",
  },
  {
    title: "Mastery recomputation",
    badge: { label: "deterministic", kind: "det" },
    detail: "concept_mastery is recomputed from flashcard history, FSRS stability, positive/negative review ratios, and active misconception count + confidence sum. Entirely deterministic — no LLM.",
  },
];

const BADGE_STYLES = {
  new: "bg-app-heading/10 text-app-heading border-app-heading/20",
  llm: "bg-app-text-muted/10 text-app-text-muted border-app-text-muted/20",
  det: "bg-app-accent/10 text-app-accent border-app-accent/20",
};

export function PipelineStepper() {
  const [active, setActive] = useState(0);

  return (
    <div className="my-8 rounded-xl border border-app-border bg-app-surface-2 p-6 font-mono text-sm">
      <p className="mb-4 text-xs uppercase tracking-widest text-app-text-subtle">
        Interactive — End-to-End Pipeline
      </p>

      <div className="flex divide-x divide-app-border">
        {/* Step list */}
        <div className="flex flex-col w-full md:w-64 shrink-0">
          {STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex items-center gap-3 px-4 py-3 text-left border-b border-app-border last:border-b-0 transition-all duration-150 cursor-pointer ${
                active === i ? "bg-app-surface" : "hover:bg-app-surface-hover"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] shrink-0 border transition-colors duration-150 ${
                  active === i
                    ? "border-app-heading/50 bg-app-heading/10 text-app-heading"
                    : "border-app-border text-app-text-subtle"
                }`}
              >
                {i + 1}
              </span>
              <span className={`text-xs leading-tight transition-colors duration-150 ${active === i ? "text-app-heading" : "text-app-text-subtle"}`}>
                {s.title}
              </span>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="hidden md:flex flex-col flex-1 p-5 gap-4 min-h-64">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-app-heading">{STEPS[active].title}</span>
            {STEPS[active].badge && (
              <span className={`font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${BADGE_STYLES[STEPS[active].badge!.kind]}`}>
                {STEPS[active].badge!.label}
              </span>
            )}
          </div>
          <p className="text-xs text-app-text-muted leading-relaxed">{STEPS[active].detail}</p>
          {STEPS[active].code && (
            <pre className="bg-app-surface border border-app-border rounded-lg p-3 text-[11px] font-mono text-app-text-muted leading-relaxed overflow-x-auto mt-auto">
              {STEPS[active].code}
            </pre>
          )}
        </div>
      </div>

      {/* Mobile detail */}
      <div className="md:hidden p-4 border-t border-app-border flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-app-heading">{STEPS[active].title}</span>
          {STEPS[active].badge && (
            <span className={`font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${BADGE_STYLES[STEPS[active].badge!.kind]}`}>
              {STEPS[active].badge!.label}
            </span>
          )}
        </div>
        <p className="text-xs text-app-text-muted leading-relaxed">{STEPS[active].detail}</p>
        {STEPS[active].code && (
          <pre className="bg-app-surface border border-app-border rounded-lg p-3 text-[11px] font-mono text-app-text-muted leading-relaxed overflow-x-auto">
            {STEPS[active].code}
          </pre>
        )}
      </div>
    </div>
  );
}
