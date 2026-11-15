import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { ReminderToggle } from "@/components/reminder-toggle";
import { TabBar } from "@/components/tab-bar";

// Demo content for the generated plan.
const STATS = [
  {
    label: "Training days",
    icon: "M4 6h16v14H4ZM4 10h16M8 3v4M16 3v4",
    value: "5",
    unit: "per week",
  },
  {
    label: "Workout time",
    icon: "M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM12 9v4l2 2M10 2h4",
    value: "6h 20m",
    unit: "this week",
  },
];

const SCHEDULED = [
  { title: "Tempo Run", when: "Today, 7:00 pm" },
  { title: "Core Workout", when: "Tomorrow, 6:30 am" },
  { title: "Long Run", when: "Sunday, 8:00 am" },
];

const ARC_LENGTH = Math.PI * 40;
const WEEKLY_PROGRESS = 0.8; // 48 of 60 mi peak

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

export default function Plan() {
  return (
    <main className="min-h-dvh bg-surface-100 px-4 pb-[140px] pt-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-base text-ink-muted">Week 9 of 18</p>
          <h1 className="text-2xl font-semibold leading-8 text-ink">
            Your training plan
          </h1>
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-surface-200 text-ink-muted"
        >
          <Icon d="M6 17v-6a6 6 0 0 1 12 0v6l1.5 1.5h-15L6 17ZM10 21h4" />
        </button>
      </header>

      {/* Weekly mileage: black text on orange for contrast */}
      <section className="mt-6 flex items-stretch justify-between rounded-md bg-accent p-4 text-surface-100">
        <div className="flex flex-col justify-between">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-surface-100 text-accent">
              <Icon d="M4 20V4M4 20h16M8 15l4-4 3 3 5-6" className="h-5 w-5" />
            </span>
            Weekly volume
          </p>
          <p className="mt-6 text-xl font-semibold leading-6">
            Your Weekly
            <br />
            Mileage
          </p>
        </div>
        <div className="relative w-[150px] self-end">
          <svg viewBox="0 0 100 52" className="w-full">
            <path
              d="M10 50A40 40 0 0 1 90 50"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="12"
            />
            <path
              d="M10 50A40 40 0 0 1 90 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              strokeDasharray={`${ARC_LENGTH * WEEKLY_PROGRESS} ${ARC_LENGTH}`}
            />
          </svg>
          <p className="absolute inset-x-0 bottom-0 text-center font-mono text-[28px] font-medium leading-8">
            48 <span className="text-sm">mi</span>
          </p>
        </div>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-md border border-line bg-surface-200 p-4"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm text-ink">{s.label}</p>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent text-white">
                <Icon d={s.icon} className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-4 font-mono text-[28px] font-medium leading-8 text-ink">
              {s.value}
            </p>
            <p className="text-sm text-ink-muted">{s.unit}</p>
          </div>
        ))}
      </section>

      <section className="mt-6">
        <SectionHeading title="Create a Challenge Group" />
        <Link
          href="/invite"
          className="mt-4 flex items-center gap-3 rounded-md border border-line bg-surface-200 p-4"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-white">
            <Icon
              d="M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M12 14v4M8 21h8M10 18h4"
              className="h-7 w-7"
            />
          </span>
          <div className="flex-1">
            <p className="text-lg font-medium leading-6 text-ink">
              Create a Challenge Group
            </p>
            <p className="text-sm text-accent-text">Invite your challengers</p>
          </div>
          <span
            aria-hidden
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent text-white"
          >
            <Icon d="M4 5h16v11H9l-5 4Z" className="h-5 w-5" />
          </span>
        </Link>
      </section>

      <section className="mt-6">
        <SectionHeading title="Today's workout" />
        <div className="relative mt-4 min-h-[200px] overflow-hidden rounded-md border border-line bg-surface-200">
          <div className="relative z-10 flex h-full min-h-[200px] w-[58%] flex-col justify-between p-4">
            <span className="inline-flex h-8 w-fit items-center gap-2 rounded-md border border-line px-3 text-xs font-semibold text-ink">
              <Icon d="M13 2 4 14h7l-1 8 9-12h-7Z" className="h-3.5 w-3.5" />
              Intermediate
            </span>
            <div>
              <h3 className="text-xl font-medium leading-6 text-ink">
                Tempo Run
              </h3>
              <p className="mt-1 text-sm text-ink-muted">
                5 mi at threshold pace, built from last night&apos;s HRV.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 items-center gap-2 rounded-md bg-accent px-3 text-sm font-semibold text-white">
                <Icon
                  d="M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM12 9v4l2 2M10 2h4"
                  className="h-4 w-4"
                />
                45 minutes
              </span>
              <button
                type="button"
                aria-label="Start workout"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-accent text-accent"
              >
                <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4">
                  <path d="M8 5v14l11-7Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 w-[42%]">
            <Image
              src="/images/plan/hero.jpg"
              alt=""
              fill
              sizes="170px"
              className="object-cover object-[30%_60%]"
            />
          </div>
        </div>
      </section>

      <section className="mt-6">
        <SectionHeading title="Scheduled" />
        <ul className="mt-4 flex flex-col gap-4">
          {SCHEDULED.map((s) => (
            <li
              key={s.title}
              className="flex items-center justify-between rounded-md border border-line bg-surface-200 p-4"
            >
              <div>
                <p className="text-lg font-medium leading-6 text-ink">
                  {s.title}
                </p>
                <p className="text-sm text-ink-muted">{s.when}</p>
              </div>
              <ReminderToggle label={s.title} />
            </li>
          ))}
        </ul>
      </section>

      <TabBar />
    </main>
  );
}
