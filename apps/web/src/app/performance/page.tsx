import Link from "next/link";
import { Icon } from "@/components/icon";
import { TabBar } from "@/components/tab-bar";

// Demo data.
const RINGS = [
  {
    label: "Workouts",
    value: 4,
    max: 5,
    center: "4",
    unit: "/5 runs",
    left: "1 run left",
  },
  {
    label: "Mileage",
    value: 34,
    max: 48,
    center: "34",
    unit: "/48 mi",
    left: "14 mi left",
  },
  {
    label: "Progress",
    value: 82,
    max: 100,
    center: "82%",
    unit: "/100%",
    left: "18% left",
  },
];

const RUNS = [3.2, 8.5, 5.1, 9.5, 9.6, 12.6]; // miles per run
const PLAN = [4, 6, 6, 8, 9, 10]; // scheduled baseline, miles per run
const RUN_DATES = ["Nov 3", "Nov 5", "Nov 7", "Nov 9", "Nov 11", "Nov 13"];

// Chart geometry (viewBox units).
const X0 = 34;
const X1 = 292;
const Y_TOP = 8;
const Y_BOTTOM = 140;
const Y_MAX = 15;
const yFor = (v: number) => Y_BOTTOM - (v / Y_MAX) * (Y_BOTTOM - Y_TOP);
const xFor = (i: number) => X0 + (i * (X1 - X0)) / (RUNS.length - 1);

const smoothPath = (values: number[]) =>
  values
    .map((v, i) => {
      const x = xFor(i);
      const y = yFor(v);
      if (i === 0) return `M${x} ${y}`;
      const px = xFor(i - 1);
      const py = yFor(values[i - 1]);
      const mid = (px + x) / 2;
      return `C${mid} ${py} ${mid} ${y} ${x} ${y}`;
    })
    .join(" ");

const linePath = smoothPath(RUNS);
const planPath = smoothPath(PLAN);
const areaPath = `${linePath} L${X1} ${Y_BOTTOM} L${X0} ${Y_BOTTOM} Z`;

const R = 40;
const C = 2 * Math.PI * R;

function Ring({ ring }: { ring: (typeof RINGS)[number] }) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-lg font-medium text-accent-text">{ring.label}</p>
      <div className="relative mt-3 h-[96px] w-[96px]">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="var(--surface-300)"
            strokeWidth="9"
          />
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="9"
            strokeDasharray={`${(ring.value / ring.max) * C} ${C}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-xl font-medium leading-6 text-ink">
            {ring.center}
          </span>
          <span className="text-xs text-ink-muted">{ring.unit}</span>
        </div>
      </div>
      <p className="mt-3 text-sm text-ink-muted">{ring.left}</p>
    </div>
  );
}

export default function Performance() {
  return (
    <main className="min-h-dvh bg-surface-100 px-4 pb-[140px] pt-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-semibold text-white"
          >
            A
          </span>
          <div>
            <p className="text-sm text-ink-muted">Good morning</p>
            <p className="text-xl font-semibold leading-6 text-ink">Alex</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Notifications, 2 new"
          className="relative flex h-12 w-12 items-center justify-center text-ink"
        >
          <Icon
            d="M6 17v-6a6 6 0 0 1 12 0v6l1.5 1.5h-15L6 17ZM10 21h4"
            className="h-6 w-6"
          />
          <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-white">
            2
          </span>
        </button>
      </header>

      <section className="mt-6">
        <h1 className="text-xl font-medium leading-7 text-ink">
          Your performance
        </h1>
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-md border border-line bg-surface-200 px-2 py-6">
          {RINGS.map((r) => (
            <Ring key={r.label} ring={r} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-medium leading-7 text-ink">
            My workouts
          </h2>
          <Link href="#" className="text-sm font-medium text-accent-text">
            Show all
          </Link>
        </div>

        <div className="mt-4 rounded-md border border-line bg-surface-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-ink">
                Morning run
              </h3>
              <p className="mt-1 text-sm text-ink-muted">Last · Nov 13</p>
            </div>
            <button
              type="button"
              aria-label="More options"
              className="flex h-8 w-8 items-center justify-center text-ink"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
                <circle cx="12" cy="5" r="1.6" fill="currentColor" />
                <circle cx="12" cy="12" r="1.6" fill="currentColor" />
                <circle cx="12" cy="19" r="1.6" fill="currentColor" />
              </svg>
            </button>
          </div>

          <div className="mt-4 flex items-center gap-6 text-sm text-ink-muted">
            <span className="flex items-center gap-2">
              <svg aria-hidden viewBox="0 0 20 4" className="h-1 w-5">
                <line
                  x1="0"
                  x2="20"
                  y1="2"
                  y2="2"
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                />
              </svg>
              Actual
            </span>
            <span className="flex items-center gap-2">
              <svg aria-hidden viewBox="0 0 20 4" className="h-1 w-5">
                <line
                  x1="0"
                  x2="20"
                  y1="2"
                  y2="2"
                  stroke="var(--ink-muted)"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                />
              </svg>
              Plan
            </span>
          </div>

          <svg
            role="img"
            aria-label="Distance per run in miles. Actual runs rise from 3.2 to 12.6; the scheduled plan rises from 4 to 10."
            viewBox="0 0 300 172"
            className="mt-4 w-full"
          >
            {[0, 3, 6, 9, 12, 15].map((t) => (
              <g key={t}>
                <line
                  x1={X0}
                  x2={X1}
                  y1={yFor(t)}
                  y2={yFor(t)}
                  stroke="var(--line)"
                  strokeDasharray="2 4"
                />
                <text
                  x="0"
                  y={yFor(t) + 4}
                  fontSize="11"
                  fill="var(--ink-muted)"
                  fontFamily="var(--font-mono)"
                >
                  {t.toFixed(1)}
                </text>
              </g>
            ))}
            <path
              d={planPath}
              fill="none"
              stroke="var(--ink-muted)"
              strokeWidth="2"
              strokeDasharray="6 5"
            />
            <path d={areaPath} fill="var(--accent)" fillOpacity="0.12" />
            <path
              d={linePath}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
            {RUNS.map((v, i) => (
              <circle
                key={i}
                cx={xFor(i)}
                cy={yFor(v)}
                r={i === RUNS.length - 1 ? 6 : 3.5}
                fill={i === RUNS.length - 1 ? "var(--ink)" : "var(--accent)"}
                stroke={i === RUNS.length - 1 ? "var(--accent)" : "none"}
                strokeWidth="2.5"
              />
            ))}
            {RUN_DATES.map((d, i) => (
              <text
                key={d}
                x={xFor(i)}
                y="166"
                fontSize="10.5"
                fill="var(--ink)"
                textAnchor="middle"
              >
                {d}
              </text>
            ))}
          </svg>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="font-mono text-[28px] font-medium leading-8 text-ink">
                28
              </p>
              <p className="text-sm text-ink-muted">Minutes today</p>
            </div>
            <Link
              href="/workout"
              className="flex h-12 items-center justify-center rounded-md bg-accent px-6 text-base font-semibold text-white"
            >
              Start now
            </Link>
          </div>
        </div>
      </section>

      <TabBar />
    </main>
  );
}
