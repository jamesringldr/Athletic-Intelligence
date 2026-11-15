"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./icon";

const TABS = [
  {
    label: "Home",
    href: "/dashboard",
    icon: "M4 20V4M4 20h16M8 15l4-4 3 3 5-6",
  },
  {
    label: "Progress",
    href: "/performance",
    icon: "M2 12h4l2-5 4 10 3-8 2 3h5",
  },
  { label: "Add", href: "#", icon: "M12 5v14M5 12h14", filled: true },
  {
    label: "Coach",
    href: "/chat",
    icon: "M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z",
  },
  {
    label: "Workout",
    href: "/workout",
    icon: "M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12",
  },
];

const ADD_ITEMS = [
  {
    label: "Meal",
    icon: "M7 3v7M5 3v5a2 2 0 0 0 4 0V3M7 10v11M17 21V3c-2.5 1-4 4-4 8h4",
  },
  {
    label: "Workout",
    icon: "M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM12 9v4l2 2M10 2h4",
  },
  {
    label: "Weigh in",
    icon: "M5 4h14v16H5ZM8.5 10a3.5 3.5 0 0 1 7 0M12 10l1.5-2",
  },
  {
    label: "Supplement",
    icon: "M10.5 20.5a4.95 4.95 0 0 1-7-7l10-10a4.95 4.95 0 0 1 7 7l-10 10ZM8.5 8.5l7 7",
  },
];

export function TabBar() {
  const [addOpen, setAddOpen] = useState(false);
  // Highlight the tab for the current page; other pages (plan, invite) keep Home lit.
  const pathname = usePathname().replace(/(.)\/$/, "$1");
  const found = TABS.findIndex((t) => t.href !== "#" && t.href === pathname);
  const active = found === -1 ? 0 : found;

  useEffect(() => {
    if (!addOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAddOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [addOpen]);

  return (
    <>
      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 flex justify-around border-t border-line bg-surface-100 px-4 pb-[34px] pt-3"
      >
        {TABS.map((t, i) => {
          const className = `flex h-12 w-16 items-center justify-center rounded-md ${
            t.filled
              ? "bg-accent text-white"
              : i === active
                ? "text-accent"
                : "text-ink-muted"
          }`;
          return t.filled ? (
            <button
              key={t.label}
              type="button"
              aria-label="Add"
              aria-haspopup="dialog"
              aria-expanded={addOpen}
              onClick={() => setAddOpen(true)}
              className={className}
            >
              <Icon d={t.icon} className="h-6 w-6" />
            </button>
          ) : (
            <Link
              key={t.label}
              href={t.href}
              aria-label={t.label}
              aria-current={i === active ? "page" : undefined}
              className={className}
            >
              <Icon d={t.icon} className="h-6 w-6" />
            </Link>
          );
        })}
      </nav>

      {/* Add drawer: slides up from the bottom. Always mounted so it can animate. */}
      <div
        aria-hidden
        onClick={() => setAddOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 motion-reduce:transition-none ${
          addOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Add"
        aria-hidden={!addOpen}
        className={`fixed inset-x-0 bottom-0 z-50 rounded-t-lg border-t border-line bg-surface-300 px-4 pb-[50px] pt-4 transition-[transform,visibility] duration-300 ease-out motion-reduce:transition-none ${
          addOpen ? "visible translate-y-0" : "invisible translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
            Log
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setAddOpen(false)}
            className="flex h-12 w-12 items-center justify-center text-ink-muted"
          >
            <Icon d="M6 6l12 12M18 6 6 18" />
          </button>
        </div>
        <ul>
          {ADD_ITEMS.map((item) => (
            <li key={item.label} className="border-t border-line">
              <button
                type="button"
                onClick={() => setAddOpen(false)}
                className="flex h-16 w-full items-center gap-4 text-left text-base font-semibold text-ink"
              >
                <Icon d={item.icon} className="h-6 w-6 text-accent" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
