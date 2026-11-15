"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/icon";

// Demo contacts (555 numbers are fictional).
const CONTACTS = [
  { name: "Michael Johnson", phone: "+1 (202) 555-0147" },
  { name: "Emily Davis", phone: "+1 (310) 555-2389" },
  { name: "Daniel Smith", phone: "+1 (415) 555-7293" },
  { name: "Jessica Miller", phone: "+1 (646) 555-4421" },
  { name: "Ashley Wilson", phone: "+1 (718) 555-9032" },
  { name: "Sarah Thompson", phone: "+1 (305) 555-6710" },
  { name: "Amanda Martinez", phone: "+1 (213) 555-8426" },
  { name: "James Taylor", phone: "+1 (602) 555-3918" },
  { name: "Matthew Anderson", phone: "+1 (617) 555-5024" },
  { name: "Christopher Brown", phone: "+1 (408) 555-7765" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

export default function Invite() {
  const [invited, setInvited] = useState<string[]>([]);

  const toggle = (name: string) =>
    setInvited((s) =>
      s.includes(name) ? s.filter((n) => n !== name) : [...s, name],
    );

  return (
    <main className="min-h-dvh bg-surface-100 px-4 pb-12 pt-4">
      <header className="flex items-center justify-between">
        <Link
          href="/plan"
          aria-label="Back"
          className="flex h-12 w-12 items-center justify-center text-ink"
        >
          <Icon d="M15 5l-7 7 7 7" className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-medium text-ink">Invite Friends</h1>
        <span className="w-12" aria-hidden />
      </header>

      <ul className="mt-4">
        {CONTACTS.map((c) => {
          const on = invited.includes(c.name);
          return (
            <li
              key={c.name}
              className="flex items-center gap-3 border-b border-line py-3 last:border-b-0"
            >
              <span
                aria-hidden
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-300 text-sm font-semibold text-ink"
              >
                {initials(c.name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-medium text-ink">
                  {c.name}
                </p>
                <p className="text-sm text-ink-muted">{c.phone}</p>
              </div>
              <button
                type="button"
                aria-pressed={on}
                aria-label={`${on ? "Cancel invite for" : "Invite"} ${c.name}`}
                onClick={() => toggle(c.name)}
                className={`h-9 w-[76px] shrink-0 rounded-md border text-sm font-semibold ${
                  on
                    ? "border-line text-ink-muted"
                    : "border-accent bg-accent text-white"
                }`}
              >
                {on ? "Invited" : "Invite"}
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
