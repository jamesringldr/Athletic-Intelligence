"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { Icon } from "@/components/icon";

const SPARKLE = "M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z";

// Proportions measured from the reference at a 390 px phone width.
const headerBtn =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-surface-200 text-ink";
const toolBtn =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-surface-300 text-ink-muted";

type Msg =
  { kind: "user"; text: string } | { kind: "loader" } | { kind: "plan-ready" };

function Loader() {
  return (
    <div role="status" aria-live="polite" className="self-start">
      <p className="text-base font-semibold text-ink">
        Building your workout plan
      </p>
      <p className="mt-1 animate-pulse text-sm text-ink-muted motion-reduce:animate-none">
        Cooking up a great plan…
      </p>
    </div>
  );
}

function PlanReady() {
  return (
    <div className="max-w-[85%] self-start">
      <p className="text-base text-ink">
        Your customized plan is cooked and ready to serve
      </p>
      <Link
        href="/plan"
        className="mt-3 inline-flex h-12 items-center justify-center rounded-md bg-accent px-4 text-base font-semibold text-white"
      >
        See your Training plan
      </Link>
    </div>
  );
}

export function Chat({ generatePlan = false }: { generatePlan?: boolean }) {
  const [messages, setMessages] = useState<Msg[]>(
    generatePlan ? [{ kind: "loader" }] : [],
  );
  const [draft, setDraft] = useState("");

  // Demo: pretend to build the plan, then swap the loader for the result.
  useEffect(() => {
    if (!generatePlan) return;
    const t = setTimeout(
      () =>
        setMessages((m) =>
          m.map((x) => (x.kind === "loader" ? { kind: "plan-ready" } : x)),
        ),
      4000,
    );
    return () => clearTimeout(t);
  }, [generatePlan]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((m) => [...m, { kind: "user", text }]);
    setDraft("");
  };

  return (
    <main className="relative flex h-dvh flex-col bg-surface-100 px-6 pt-4">
      <header className="flex items-center justify-between">
        <Link href="/" aria-label="Back" className={headerBtn}>
          <Icon d="M15 5l-7 7 7 7" className="h-5 w-5" />
        </Link>
        <h1 className="text-[17px] font-medium text-ink">New chat</h1>
        <button type="button" aria-label="Chat info" className={headerBtn}>
          <Icon d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 11v6M12 7.5v.01" />
        </button>
      </header>

      {messages.some((m) => m.kind === "loader") && (
        <div
          aria-hidden
          className="absolute inset-x-0 top-[20%] flex justify-center"
        >
          <BounceLoader color="var(--accent)" />
        </div>
      )}

      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center gap-8 pt-[72px] text-center">
          <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-accent text-white">
            <Icon d={SPARKLE} className="h-12 w-12" />
          </div>
          <h2 className="max-w-[270px] text-[22px] font-medium leading-[33px] text-ink">
            Hi Alex, how can I help you train today?
          </h2>
        </div>
      ) : (
        <ul className="flex flex-1 flex-col justify-end gap-6 overflow-y-auto py-6">
          {messages.map((m, i) => (
            <li key={i} className="flex flex-col">
              {m.kind === "user" ? (
                <p className="max-w-[85%] self-end rounded-md bg-accent px-3 py-2 text-base text-white">
                  {m.text}
                </p>
              ) : m.kind === "loader" ? (
                <Loader />
              ) : (
                <PlanReady />
              )}
            </li>
          ))}
        </ul>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="mb-[50px] rounded-md bg-surface-200 px-3.5 pb-3 pt-3.5"
      >
        <textarea
          rows={2}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask your coach anything…"
          aria-label="Message"
          className="w-full resize-none bg-transparent text-base text-ink placeholder:text-ink-muted focus:outline-none"
        />
        <div className="mt-2.5 flex items-center gap-2">
          <button type="button" aria-label="Attach" className={toolBtn}>
            <Icon
              d="M21 11.5 12.5 20a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8-8"
              className="h-[18px] w-[18px]"
            />
          </button>
          <button type="button" aria-label="Voice" className={toolBtn}>
            <Icon
              d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3ZM5 11a7 7 0 0 0 14 0M12 18v3"
              className="h-[18px] w-[18px]"
            />
          </button>
          <button
            type="submit"
            aria-label="Send"
            className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-white"
          >
            <Icon
              d="M21 3 3 10.5l7 3 3 7L21 3ZM10 13.5 21 3"
              className="h-[18px] w-[18px]"
            />
          </button>
        </div>
      </form>
    </main>
  );
}
