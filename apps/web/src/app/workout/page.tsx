"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { Icon } from "@/components/icon";
import { TabBar } from "@/components/tab-bar";

const TIMER = "M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM12 9v4l2 2M10 2h4";
const CALENDAR = "M4 6h16v14H4ZM4 10h16M8 3v4M16 3v4";
const DUMBBELL = "M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12";
const PULSE = "M2 12h4l2-5 4 10 3-8 2 3h5";

// Demo content for today's workout.
const TARGETS = [
  {
    name: "Tempo Run",
    minutes: 45,
    detail: "5 mi at threshold pace",
    icon: PULSE,
  },
  {
    name: "Seated Knee Raise",
    minutes: 10,
    detail: "3 sets x 15 reps",
    icon: DUMBBELL,
  },
  {
    name: "Plank Leg Raise",
    minutes: 10,
    detail: "3 sets x 12 reps",
    icon: DUMBBELL,
  },
];

const CHECKLIST = [
  { label: "Warm-up jog", minutes: 10 },
  { label: "Tempo run", minutes: 45 },
  { label: "Core circuit", minutes: 20 },
  { label: "Cool-down stretch", minutes: 10 },
];

const STEPS = { done: 8412, goal: 10000 };

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const subscribeNever = () => () => {};

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <h2 className="text-xl font-medium leading-7 text-ink">{title}</h2>
      <Link href="#" className="text-sm font-medium text-accent-text">
        See all
      </Link>
    </div>
  );
}

function MinutesChip({ minutes }: { minutes: number }) {
  return (
    <span className="inline-flex h-9 shrink-0 items-center gap-2 rounded-md bg-accent px-3 text-sm font-semibold text-white">
      <Icon d={TIMER} className="h-4 w-4" />
      {minutes} min
    </span>
  );
}

export default function Workout() {
  // Dates come from the viewer's clock: empty on the server, filled in on the device.
  const todayMs = useSyncExternalStore(
    subscribeNever,
    () => new Date().setHours(0, 0, 0, 0),
    () => null,
  );
  const today = todayMs === null ? null : new Date(todayMs);
  const [checked, setChecked] = useState<string[]>([]);

  const days = today
    ? Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + i - 2);
        return d;
      })
    : [];

  const toggle = (label: string) =>
    setChecked((s) =>
      s.includes(label) ? s.filter((x) => x !== label) : [...s, label],
    );

  return (
    <main className="min-h-dvh bg-surface-100 px-4 pb-[140px] pt-6">
      <header className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold leading-8 text-ink">
          Today&apos;s workout
        </h1>
        <Link href="#" className="text-sm font-medium text-accent-text">
          Add workout
        </Link>
      </header>

      <div
        aria-label="This week"
        className="-mx-4 mt-6 flex min-h-[72px] gap-2 overflow-x-auto px-4"
      >
        {days.map((d, i) => (
          <div
            key={d.toDateString()}
            aria-current={i === 2 ? "date" : undefined}
            className={`flex h-[72px] w-14 shrink-0 flex-col items-center justify-center rounded-md border ${
              i === 2
                ? "border-accent bg-accent text-white"
                : "border-line bg-surface-200 text-ink"
            }`}
          >
            <span className="text-xl font-medium">{d.getDate()}</span>
            <span
              className={`text-xs font-semibold ${i === 2 ? "text-white" : "text-ink-muted"}`}
            >
              {WEEKDAYS[d.getDay()]}
            </span>
          </div>
        ))}
      </div>

      <section className="mt-6">
        <SectionHeading title="Today's targets" />
        <div className="mt-4 rounded-md border border-line bg-surface-200 p-4">
          <span className="inline-flex h-9 items-center gap-2 rounded-md border border-line px-3 text-sm text-ink">
            <Icon d={CALENDAR} className="h-4 w-4" />
            {today
              ? today.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })
              : " "}
          </span>
          <ul className="mt-4 flex flex-col gap-3">
            {TARGETS.map((t) => (
              <li
                key={t.name}
                className="flex items-center gap-4 rounded-md border border-line bg-surface-100 p-4"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  <Icon d={t.icon} className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-lg font-medium leading-6 text-ink">
                    {t.name}
                  </p>
                  <p className="mt-1 text-sm font-medium text-accent-text">
                    {t.minutes} minutes
                  </p>
                  <p className="text-sm text-ink-muted">{t.detail}</p>
                </div>
                <button
                  type="button"
                  className="shrink-0 text-sm font-medium text-accent-text"
                >
                  Start workout
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-6">
        <SectionHeading title="Steps" />
        <div className="mt-4 flex items-center gap-4 rounded-md border border-line bg-surface-200 p-4">
          <p className="shrink-0 font-mono text-base text-ink">
            {STEPS.done.toLocaleString("en-US")}{" "}
            <span className="text-sm text-ink-muted">
              /{STEPS.goal.toLocaleString("en-US")}
            </span>
          </p>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={STEPS.goal}
            aria-valuenow={STEPS.done}
            aria-label="Steps today"
            className="h-5 flex-1 rounded-md bg-surface-300"
          >
            <div
              className="h-full rounded-md bg-accent"
              style={{ width: `${(STEPS.done / STEPS.goal) * 100}%` }}
            />
          </div>
        </div>
      </section>

      <section className="mt-6">
        <SectionHeading title="Workout checklist" />
        <ul className="mt-4 flex flex-col gap-3 rounded-md border border-line bg-surface-200 p-4">
          {CHECKLIST.map((c) => {
            const on = checked.includes(c.label);
            return (
              <li key={c.label}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={on}
                  onClick={() => toggle(c.label)}
                  className="flex w-full items-center gap-4 py-1 text-left"
                >
                  <MinutesChip minutes={c.minutes} />
                  <span
                    className={`flex-1 text-lg ${on ? "text-ink-muted line-through" : "text-ink"}`}
                  >
                    {c.label}
                  </span>
                  <span
                    aria-hidden
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
                      on ? "border-accent bg-accent" : "border-ink-muted"
                    }`}
                  >
                    {on && (
                      <svg
                        viewBox="0 0 12 12"
                        className="h-3.5 w-3.5 text-white"
                      >
                        <path
                          d="M2 6.5 5 9.5 10 3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="square"
                        />
                      </svg>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <TabBar />
    </main>
  );
}
