"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  FileAudio,
  FileText,
  LayoutDashboard,
  Library,
  ListChecks,
  Plus,
  Settings,
  ShieldAlert,
  Users,
  WalletCards,
} from "lucide-react";

const red = "#E50914";

const navItems = [
  ["Dashboard", LayoutDashboard],
  ["Releases", FileAudio],
  ["Catalogue", Library],
  ["Artists", Users],
  ["Contracts", FileText],
  ["Royalties", CircleDollarSign],
  ["Analytics", BarChart3],
  ["Reports", ClipboardList],
  ["Claims & Disputes", ShieldAlert],
  ["Tasks", ListChecks],
  ["Customers & Leads", WalletCards],
  ["Team", Users],
  ["Settings", Settings],
] as const;

const kpis = [
  { label: "Total Recordings", value: "1,248", delta: "+8.4%", good: true },
  { label: "Releases", value: "94", delta: "+12.1%", good: true },
  { label: "Artists", value: "312", delta: "+4.7%", good: true },
  { label: "Royalties (Net)", value: "$24,780", delta: "+2.3%", good: true },
  { label: "Catalogue Health", value: "82%", delta: "-3 fields", good: false },
];

const releases = [
  ["Midnight Dreams", "Luna Vega", "Live", "May 28, 2025", "#E50914"],
  ["Coastline", "J Rey", "Processing", "May 24, 2025", "#F59E0B"],
  ["Pure Again", "Mara Sol", "Approved", "May 18, 2025", "#22C55E"],
  ["Velvet Room", "Nico Vale", "Live", "May 12, 2025", "#E50914"],
  ["North Signal", "The Harbor", "Processing", "May 08, 2025", "#F59E0B"],
];

const activity = [
  "New release 'Midnight Dreams' is now live",
  "Contract approved for Luna Vega",
  "Royalty payment processed",
  "Metadata conflict assigned to review",
  "New catalogue owner submitted intake",
];

const platformRows: Array<[string, number, string]> = [
  ["Spotify", 78, "#22C55E"],
  ["YouTube", 64, "#E50914"],
  ["Apple Music", 52, "#60A5FA"],
];

export default function PartnerLiveDemoPage() {
  const [month, setMonth] = useState("May 2025");
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);
  const royaltyLines = useMemo(
    () => [
      { label: "Streaming", color: "#22C55E", path: "M0 88 C55 76 72 44 130 52 S205 98 270 42 S350 32 420 18" },
      { label: "YouTube", color: red, path: "M0 102 C58 80 84 84 128 68 S210 34 270 58 S340 76 420 36" },
      { label: "Mechanical", color: "#60A5FA", path: "M0 112 C62 106 86 92 132 94 S216 74 268 78 S338 58 420 64" },
      { label: "Publishing", color: "#A78BFA", path: "M0 118 C58 116 92 104 134 108 S214 88 272 92 S340 82 420 74" },
    ],
    [],
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white antialiased">
      <div className="grid min-h-screen lg:grid-cols-[18rem_1fr]">
        <aside className="hidden border-r border-[#1a1a1a] bg-[#080808] p-5 lg:flex lg:flex-col">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-[#E50914] text-sm font-black">
              YB
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em]">
                Your Brand
              </p>
              <p className="text-xs text-white/38">Distribution OS</p>
            </div>
          </div>

          <nav className="mt-8 grid gap-1">
            {navItems.map(([label, Icon], index) => (
              <button
                key={label}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                  index === 0
                    ? "bg-[#E50914] text-white"
                    : "text-white/55 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-4">
            <div className="rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
                System Status
              </div>
              <p className="mt-2 text-xs text-white/42">All systems operational</p>
            </div>
            <div className="rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
                Quick Actions
              </p>
              <div className="mt-3 grid gap-2">
                {["New Release", "Import Catalogue", "Create Claim"].map((item) => (
                  <button
                    key={item}
                    className="rounded-lg border border-white/8 px-3 py-2 text-left text-xs text-white/62 hover:border-[#E50914]/50 hover:text-white"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <p className="rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] p-4 text-xs leading-5 text-white/36">
              Powered by <span className="text-white">PTY Audio</span>
              <br />
              Platform Technology
            </p>
          </div>
        </aside>

        <section className="h-screen overflow-y-auto">
          <div className="mx-auto max-w-[1500px] px-5 py-5 lg:px-8">
            <header className="flex flex-col gap-4 border-b border-[#1a1a1a] pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/38">
                  Partner live demo
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                  Dashboard Overview
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button className="inline-flex h-10 items-center gap-2 rounded-full border border-[#1a1a1a] bg-[#0d0d0d] px-4 text-sm text-white/72">
                  May 1 - May 31, 2025
                  <ChevronDown className="size-4" />
                </button>
                <button className="inline-flex h-10 items-center gap-2 rounded-full bg-[#E50914] px-5 text-sm font-semibold shadow-[0_0_30px_rgba(229,9,20,.25)]">
                  <Plus className="size-4" />
                  New Release
                </button>
              </div>
            </header>

            <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {kpis.map((kpi) => (
                <article
                  key={kpi.label}
                  className="rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-white/42">{kpi.label}</p>
                    <Activity className="size-4 text-white/28" />
                  </div>
                  <p className="mt-5 text-3xl font-semibold">{kpi.value}</p>
                  <p className={kpi.good ? "mt-3 text-sm text-emerald-400" : "mt-3 text-sm text-red-300"}>
                    {kpi.delta}
                  </p>
                  <SparkLine good={kpi.good} />
                </article>
              ))}
            </section>

            <section className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
              <article className="rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Royalties Overview</h2>
                  <select
                    value={month}
                    onChange={(event) => setMonth(event.target.value)}
                    className="rounded-full border border-[#1a1a1a] bg-[#050505] px-3 py-2 text-sm text-white/70 outline-none"
                  >
                    {["May 2025", "April 2025", "March 2025"].map((value) => (
                      <option key={value}>{value}</option>
                    ))}
                  </select>
                </div>
                <svg viewBox="0 0 420 140" className="mt-8 h-64 w-full overflow-visible">
                  <defs>
                    <linearGradient id="chartFade" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#E50914" stopOpacity=".18" />
                      <stop offset="100%" stopColor="#E50914" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[28, 56, 84, 112].map((y) => (
                    <line key={y} x1="0" x2="420" y1={y} y2={y} stroke="#1a1a1a" />
                  ))}
                  {royaltyLines.map((line) => (
                    <path
                      key={line.label}
                      d={line.path}
                      fill="none"
                      stroke={line.color}
                      strokeLinecap="round"
                      strokeWidth="4"
                      className="cursor-pointer opacity-80 transition-opacity hover:opacity-100"
                    />
                  ))}
                </svg>
                <div className="mt-4 flex flex-wrap gap-3">
                  {royaltyLines.map((line) => (
                    <span key={line.label} className="inline-flex items-center gap-2 text-xs text-white/48">
                      <span className="size-2 rounded-full" style={{ background: line.color }} />
                      {line.label}
                    </span>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] p-5">
                <h2 className="text-lg font-semibold">Recent Releases</h2>
                <div className="mt-5 grid gap-3">
                  {releases.map(([title, artist, status, date, color], index) => (
                    <div key={title} className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
                      <div
                        className="grid size-12 place-items-center rounded-xl text-xs font-bold"
                        style={{ background: `linear-gradient(135deg, ${color}, #141414)` }}
                      >
                        {index + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{title}</p>
                        <p className="text-xs text-white/38">{artist} · {date}</p>
                      </div>
                      <span className="rounded-full border border-white/10 px-2 py-1 text-[11px] text-white/62">
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <section className="mt-5 grid gap-5 xl:grid-cols-3">
              <Panel title="Catalogue Health">
                <Donut
                  slices={[
                    ["Complete", 82, "#22C55E"],
                    ["In Progress", 15, "#F59E0B"],
                    ["Incomplete", 3, "#E50914"],
                  ]}
                  hovered={hoveredSlice}
                  setHovered={setHoveredSlice}
                />
              </Panel>
              <Panel title="Pending Items">
                {[
                  ["Fields Pending", 37],
                  ["Contracts to Review", 8],
                  ["Releases Pending Approval", 6],
                ].map(([label, count]) => (
                  <div key={label} className="mb-3 flex items-center justify-between rounded-xl border border-[#1a1a1a] bg-[#050505] px-4 py-3">
                    <span className="text-sm text-white/62">{label}</span>
                    <span className="rounded-full bg-[#E50914] px-2.5 py-1 text-xs font-bold">{count}</span>
                  </div>
                ))}
              </Panel>
              <Panel title="Open Conflicts">
                <Donut
                  slices={[
                    ["Content ID", 42, "#E50914"],
                    ["Metadata", 28, "#F59E0B"],
                    ["Ownership", 20, "#60A5FA"],
                    ["Other", 10, "#A78BFA"],
                  ]}
                  hovered={hoveredSlice}
                  setHovered={setHoveredSlice}
                />
              </Panel>
            </section>

            <section className="mt-5 grid gap-5 pb-8 xl:grid-cols-2">
              <Panel title="Recent Activity">
                <div className="grid gap-3">
                  {activity.map((item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
                      <CheckCircle2 className="size-4 text-emerald-400" />
                      <p className="flex-1 text-sm text-white/62">{item}</p>
                      <span className="text-xs text-white/30">{index + 2}m</span>
                    </div>
                  ))}
                </div>
              </Panel>
              <Panel title="Top Platforms">
                {platformRows.map(([platform, value, color]) => (
                  <div key={platform} className="mb-5">
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-white/72">{platform}</span>
                      <span className="text-white/42">{value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full transition-[width] duration-1000 ease-out"
                        style={{ width: `${value}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>
                ))}
              </Panel>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] p-5">
      <h2 className="mb-5 text-lg font-semibold">{title}</h2>
      {children}
    </article>
  );
}

function SparkLine({ good }: { good: boolean }) {
  return (
    <svg viewBox="0 0 120 34" className="mt-4 h-8 w-full">
      <path
        d={good ? "M2 28 C20 18 30 25 44 14 S78 8 118 4" : "M2 8 C22 18 32 12 48 22 S82 28 118 26"}
        fill="none"
        stroke={good ? "#22C55E" : "#E50914"}
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}

function Donut({
  slices,
  hovered,
  setHovered,
}: {
  slices: Array<[string, number, string]>;
  hovered: string | null;
  setHovered: (value: string | null) => void;
}) {
  const circumference = 100;
  const renderedSlices = slices.map(([label, value, color], index) => {
    const previous = slices
      .slice(0, index)
      .reduce((total, [, sliceValue]) => total + sliceValue, 0);

    return {
      label,
      value,
      color,
      offset: 25 - previous,
    };
  });

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 42 42" className="size-36 -rotate-90">
        <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#1a1a1a" strokeWidth="5" />
        {renderedSlices.map((slice) => (
          <circle
            key={slice.label}
            cx="21"
            cy="21"
            r="15.9"
            fill="transparent"
            stroke={slice.color}
            strokeWidth={hovered === slice.label ? "6" : "5"}
            strokeDasharray={`${slice.value} ${circumference - slice.value}`}
            strokeDashoffset={slice.offset}
            className="cursor-pointer transition-all"
            onMouseEnter={() => setHovered(slice.label)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </svg>
      <div className="grid gap-2">
        {slices.map(([label, value, color]) => (
          <button
            key={label}
            type="button"
            onMouseEnter={() => setHovered(label)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center gap-2 text-left text-sm text-white/62"
          >
            <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
            {label}: {value}%
          </button>
        ))}
      </div>
    </div>
  );
}
