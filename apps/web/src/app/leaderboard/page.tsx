"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";
import { TabBar } from "@/components/tab-bar";

const PERIODS = [
  { label: "Day", factor: 0.14 },
  { label: "Week", factor: 1 },
  { label: "Month", factor: 4.2 },
  { label: "Year", factor: 52 },
];

// Demo data: the challengers from the invite page. Scores are for the week.
const PLAYERS = [
  { name: "Emily Davis", handle: "emily_d", score: 8693 },
  { name: "Daniel Smith", handle: "dan_smith", score: 8541 },
  { name: "Michael Johnson", handle: "mike_j", score: 8502 },
  { name: "Jessica Miller", handle: "jess_m", score: 8483 },
  { name: "Ashley Wilson", handle: "ash_w", score: 8421 },
  { name: "Alex (You)", handle: "alex_run", score: 8377, you: true },
  { name: "Sarah Thompson", handle: "sarah_t", score: 8345 },
  { name: "Amanda Martinez", handle: "amanda_m", score: 8314 },
  { name: "James Taylor", handle: "james_t", score: 8203 },
  { name: "Matthew Anderson", handle: "matt_a", score: 8190 },
];

const initials = (name: string) =>
  name
    .replace(/\(.*\)/, "")
    .trim()
    .split(" ")
    .map((w) => w[0])
    .join("");

const fmt = (n: number) => n.toLocaleString("en-US");

type Player = (typeof PLAYERS)[number];

const RING = ["border-accent", "border-ink", "border-ink-muted"] as const;

function PodiumSpot({
  player,
  rank,
  score,
  size,
  offset,
}: {
  player: Player;
  rank: 1 | 2 | 3;
  score: number;
  size: string;
  offset: string;
}) {
  return (
    <div className={`flex flex-col items-center text-center ${offset}`}>
      <p className="mb-3 max-w-[110px] truncate text-sm text-ink">
        {player.name}
      </p>
      <div className="relative">
        <span
          aria-hidden
          className={`flex items-center justify-center rounded-full border-4 bg-surface-300 font-semibold text-ink ${size} ${RING[rank - 1]} ${
            rank === 1 ? "text-3xl" : "text-xl"
          }`}
        >
          {initials(player.name)}
        </span>
        <span
          className={`absolute -bottom-3 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full text-sm font-semibold ${
            rank === 1
              ? "bg-accent text-white"
              : "bg-surface-300 text-ink ring-2 ring-surface-100"
          }`}
        >
          {rank}
        </span>
      </div>
      <p className="mt-6 font-mono text-xl font-medium text-ink">
        {fmt(score)}
      </p>
      <p className="text-sm text-ink-muted">{player.handle}</p>
    </div>
  );
}

export default function Leaderboard() {
  const [period, setPeriod] = useState("Week");
  const factor = PERIODS.find((p) => p.label === period)!.factor;
  const scored = PLAYERS.map((p) => ({
    ...p,
    score: Math.round(p.score * factor),
  }));
  const [first, second, third, ...rest] = scored;

  return (
    <main className="min-h-dvh bg-surface-100 px-6 pb-[140px] pt-6">
      <header className="flex items-center justify-between">
        <h1 className="text-[28px] font-semibold leading-8 text-ink">
          Leaderboard
        </h1>
        <span className="flex h-9 items-center gap-2 rounded-md bg-surface-200 px-3 font-mono text-sm font-medium text-ink">
          <Icon
            d="M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M12 14v4M8 21h8M10 18h4"
            className="h-4 w-4 text-accent"
          />
          4,521
        </span>
      </header>

      <div
        role="tablist"
        aria-label="Time period"
        className="mt-6 grid grid-cols-4 gap-1 rounded-md bg-surface-200 p-1"
      >
        {PERIODS.map((p) => (
          <button
            key={p.label}
            type="button"
            role="tab"
            aria-selected={period === p.label}
            onClick={() => setPeriod(p.label)}
            className={`h-11 rounded-md text-base ${
              period === p.label
                ? "bg-ink font-semibold text-surface-100"
                : "text-ink-muted"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <section
        aria-label="Top three"
        className="mt-8 flex items-start justify-between gap-2"
      >
        <PodiumSpot
          player={second}
          rank={2}
          score={second.score}
          size="h-[88px] w-[88px]"
          offset="mt-10"
        />
        <PodiumSpot
          player={first}
          rank={1}
          score={first.score}
          size="h-[128px] w-[128px]"
          offset="mt-0"
        />
        <PodiumSpot
          player={third}
          rank={3}
          score={third.score}
          size="h-[88px] w-[88px]"
          offset="mt-14"
        />
      </section>

      <section className="mt-10">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-medium leading-7 text-ink">
            Players around you
          </h2>
          <button
            type="button"
            className="text-sm font-medium text-accent-text"
          >
            View all
          </button>
        </div>

        <ol className="mt-2">
          {rest.map((p, i) => (
            <li
              key={p.handle}
              className={`flex items-center gap-4 py-4 ${
                p.you
                  ? "-mx-3 rounded-md border border-accent bg-surface-200 px-3"
                  : "border-b border-line last:border-b-0"
              }`}
            >
              <span className="w-5 text-base text-ink-muted">{i + 4}</span>
              <span
                aria-hidden
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-300 text-sm font-semibold text-ink"
              >
                {initials(p.name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-medium text-ink">
                  {p.name}
                </p>
                <p className="text-sm text-ink-muted">{p.handle}</p>
              </div>
              <p className="font-mono text-lg font-medium text-ink">
                {fmt(p.score)}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <TabBar />
    </main>
  );
}
