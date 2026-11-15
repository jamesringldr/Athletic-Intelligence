import Link from "next/link";
import { Icon } from "@/components/icon";
import { TabBar } from "@/components/tab-bar";

// Demo data. Replace with real values once the data layer exists.
const READINESS = 84;

const STATS = [
  {
    label: "Sleep",
    icon: "M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z",
    value: "7h 42m",
    unit: "",
    delta: "↗ 88",
    points: [5, 7, 4, 8, 6, 9, 10],
  },
  {
    label: "HRV",
    icon: "M2 12h4l2-5 4 10 3-8 2 3h5",
    value: "68",
    unit: "ms",
    delta: "↗ +4",
    points: [4, 5, 4, 6, 5, 7, 9],
  },
  {
    label: "Resting HR",
    icon: "M12 20s-8-4.6-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.4 12 20 12 20Z",
    value: "54",
    unit: "bpm",
    delta: "↘ −2",
    points: [9, 8, 8, 6, 6, 5, 5],
  },
  {
    label: "Steps",
    icon: "M4 18h4v-4h4v-4h4V6h4",
    value: "8,412",
    unit: "",
    delta: "84% of goal",
    points: [4, 8, 6, 3, 7, 9, 6],
  },
];

function Sparkline({ points }: { points: number[] }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const step = 100 / (points.length - 1);
  const coords = points
    .map(
      (p, i) => `${i * step},${28 - ((p - min) / (max - min || 1)) * 24 - 2}`,
    )
    .join(" ");
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 28"
      preserveAspectRatio="none"
      className="mt-4 h-7 w-full text-accent"
    >
      <polyline
        points={coords}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function ReadinessRing({ value }: { value: number }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-28 w-28 shrink-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="var(--line)"
          strokeWidth="6"
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="6"
          strokeDasharray={`${(value / 100) * c} ${c}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted">
          Readiness
        </span>
        <span className="font-mono text-[40px] font-medium leading-[44px] text-ink">
          {value}
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-dvh bg-surface-100 px-4 pb-[140px] pt-8">
      <header className="flex items-start justify-between">
        <div>
          <p className="text-sm text-ink-muted">Saturday, November 14</p>
          <h1 className="mt-1 text-4xl font-extrabold leading-10 text-ink">
            Good morning, Alex
          </h1>
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-line bg-surface-200 text-ink-muted"
        >
          <Icon d="M6 17v-6a6 6 0 0 1 12 0v6l1.5 1.5h-15L6 17ZM10 21h4" />
        </button>
      </header>

      <section className="mt-6 flex items-center gap-4 rounded-md border border-line bg-surface-200 p-4">
        <ReadinessRing value={READINESS} />
        <div>
          <h2 className="text-xl font-semibold text-ink">Recovered well</h2>
          <p className="mt-1 text-sm text-ink-muted">
            Your HRV is 4 ms above baseline, so today&apos;s run stays as
            planned.
          </p>
          <p className="mt-2 text-sm font-semibold text-accent-text">
            ↗ +6 vs 7-day avg
          </p>
        </div>
      </section>

      <Link
        href="/chat/generate"
        className="mt-4 flex h-12 w-full items-center justify-center rounded-md bg-accent text-base font-semibold text-white"
      >
        Generate your workout plan
      </Link>

      <section className="mt-6 grid grid-cols-2 gap-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-md border border-line bg-surface-200 p-4"
          >
            <div className="flex items-center justify-between text-ink-muted">
              <span className="flex items-center gap-2 text-sm">
                <Icon d={s.icon} className="h-4 w-4 text-accent" />
                {s.label}
              </span>
            </div>
            <p className="mt-2 font-mono text-[28px] font-medium leading-8 text-ink">
              {s.value}
              {s.unit && (
                <span className="ml-1 text-sm text-ink-muted">{s.unit}</span>
              )}
            </p>
            <p className="mt-1 font-mono text-xs text-accent-text">{s.delta}</p>
            <Sparkline points={s.points} />
          </div>
        ))}
      </section>

      <section className="mt-4 flex items-start gap-3 rounded-md border border-line bg-surface-200 p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent text-white">
          <Icon d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" />
        </span>
        <div>
          <h2 className="text-base font-semibold text-ink">Coach suggests</h2>
          <p className="mt-1 text-sm text-ink-muted">
            A 45-minute Zone 2 run fits today. Wind down by 22:30 to protect
            tomorrow&apos;s long run.
          </p>
          <p className="mt-2 text-xs text-ink-muted">
            Built from your last 6 weeks and last night&apos;s HRV.
          </p>
        </div>
      </section>

      <TabBar />
    </main>
  );
}
