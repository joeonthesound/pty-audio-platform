"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  CircleDollarSign,
  FileAudio,
  FileWarning,
  Gauge,
  Globe2,
  Music2,
  ShieldCheck,
} from "lucide-react";

type HomeSectionsProps = {
  locale: string;
  copy: {
    partners: string[];
    socialProof: { title: string };
    whatWeDo: {
      eyebrow: string;
      title: string;
      learnMore: string;
      services: Array<{ title: string; description: string; href: string }>;
      stats: string[];
    };
    partnersSection: {
      eyebrow: string;
      title: string;
      cta: string;
      items: Array<{
        title: string;
        description: string;
        tag: string;
      }>;
    };
    tools: {
      healthTitle: string;
      releaseTitle: string;
      conflictTitle: string;
      dashboardTitle: string;
      stepOne: string;
      stepTwo: string;
      stepThree: string;
      userQuestion: string;
      releaseInformation: string;
      conflictType: string;
      description: string;
      continue: string;
      back: string;
      releaseFields: string[];
      userTypes: string[];
      conflicts: string[];
      dashboardStats: string[];
      dashboardMetrics: Array<{
        label: string;
        value: string;
      }>;
      catalogueHealth: string;
      illustrative: string;
      recentReleases: string[];
    };
    footer: {
      description: string;
      services: string;
      company: string;
      resources: string;
      social: string;
      copyright: string;
      createdBy: string;
    };
  };
};

const serviceIcons = [
  Music2,
  FileAudio,
  ShieldCheck,
  CircleDollarSign,
  FileWarning,
  Gauge,
];

export function HomeSections({ locale, copy }: HomeSectionsProps) {
  return (
    <>
      <WhatWeDo locale={locale} copy={copy.whatWeDo} />
      <PartnersSection locale={locale} copy={copy.partnersSection} />
      <InteractiveTools copy={copy.tools} />
    </>
  );
}

function PartnersSection({
  locale,
  copy,
}: {
  locale: string;
  copy: HomeSectionsProps["copy"]["partnersSection"];
}) {
  return (
    <section className="border-y border-white/8 bg-[#050505] px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#E50914]">
          {copy.eyebrow}
        </p>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {copy.title}
          </h2>
          <Link
            href={`/${locale}/partner-demo`}
            className="inline-flex h-11 items-center justify-center rounded-full border border-[#E50914]/50 px-5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#E50914]/15"
          >
            {copy.cta}
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {copy.items.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20"
            >
              <span className="rounded-full border border-[#E50914]/35 bg-[#E50914]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E50914]">
                {item.tag}
              </span>
              <h3 className="mt-6 text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-white/58">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeDo({
  locale,
  copy,
}: {
  locale: string;
  copy: HomeSectionsProps["copy"]["whatWeDo"];
}) {
  return (
    <section className="bg-[#050505] px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_18rem]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#E50914]">
            {copy.eyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {copy.title}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {copy.services.map((service, index) => {
              const Icon = serviceIcons[index] ?? Globe2;

              return (
                <article
                  key={service.title}
                  className="group rounded-xl border border-white/8 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-[#E50914]/45 hover:bg-white/[0.065]"
                >
                  <div className="grid size-10 place-items-center rounded-lg bg-[#E50914]/12 text-[#E50914]">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-6 text-base font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 min-h-24 text-sm leading-6 text-white/55">
                    {service.description}
                  </p>
                  <Link
                    href={`/${locale}/${service.href}`}
                    className="mt-5 inline-flex text-sm font-semibold text-[#E50914] transition-colors group-hover:text-white"
                  >
                    {copy.learnMore} →
                  </Link>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="grid content-start gap-6 border-white/10 lg:border-l lg:pl-8">
          {copy.stats.map((stat) => (
            <div key={stat}>
              <p className="text-lg font-semibold leading-6 text-[#E50914]">
                {stat}
              </p>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

function InteractiveTools({ copy }: { copy: HomeSectionsProps["copy"]["tools"] }) {
  const [selectedRole, setSelectedRole] = useState("");
  const [healthStep, setHealthStep] = useState(1);
  const [releaseForm, setReleaseForm] = useState<Record<string, string>>({});
  const [selectedConflict, setSelectedConflict] = useState(copy.conflicts[0] ?? "");
  const [conflictDescription, setConflictDescription] = useState("");
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);
  const numericTargets = useMemo(
    () =>
      copy.dashboardMetrics.map((metric) =>
        Number(metric.value.replace(/,/g, "").replace(/[^0-9.]/g, "")),
      ),
    [copy.dashboardMetrics],
  );

  useEffect(() => {
    const duration = 1100;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValues(numericTargets.map((value) => Math.round(value * eased)));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [numericTargets]);

  return (
    <section className="border-y border-white/8 bg-[#050505] px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 xl:grid-cols-4">
        <ToolPanel
          title={copy.healthTitle}
          meta={healthStep === 1 ? copy.stepOne : copy.stepOne.replace("1", "2")}
        >
          <p className="text-sm font-semibold text-white">{copy.userQuestion}</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {copy.userTypes.map((type) => {
              const active = selectedRole === type;

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedRole(type)}
                  className={`rounded-lg border p-3 text-xs font-medium transition-colors ${
                    active
                      ? "border-[#E50914] bg-[#E50914]/15 text-white shadow-[0_0_22px_rgba(229,9,20,0.18)]"
                      : "border-white/10 bg-black/20 text-white/62 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
          <PreviewButton
            disabled={!selectedRole}
            onClick={() => setHealthStep(2)}
          >
            {copy.continue}
          </PreviewButton>
        </ToolPanel>

        <ToolPanel title={copy.releaseTitle} meta={copy.stepTwo}>
          <p className="text-sm font-semibold text-white">
            {copy.releaseInformation}
          </p>
          <div className="mt-4 grid gap-3">
            {copy.releaseFields.map((field) => (
              <input
                key={field}
                value={releaseForm[field] ?? ""}
                onChange={(event) =>
                  setReleaseForm((current) => ({
                    ...current,
                    [field]: event.target.value,
                  }))
                }
                placeholder={field}
                className="h-10 rounded-lg border border-white/10 bg-black/25 px-3 text-xs text-white outline-none transition-colors placeholder:text-white/28 focus:border-[#E50914] focus:bg-black/40"
              />
            ))}
          </div>
          <PreviewButton>{copy.continue}</PreviewButton>
        </ToolPanel>

        <ToolPanel title={copy.conflictTitle} meta={copy.stepThree}>
          <p className="text-sm font-semibold text-white">{copy.conflictType}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {copy.conflicts.map((conflict) => {
              const active = selectedConflict === conflict;

              return (
                <button
                  key={conflict}
                  type="button"
                  onClick={() => setSelectedConflict(conflict)}
                  className={`rounded-full border px-3 py-2 text-xs font-medium transition-all ${
                    active
                      ? "border-[#E50914] bg-[#E50914]/15 text-white shadow-[0_0_18px_rgba(229,9,20,0.18)]"
                      : "border-white/10 bg-black/25 text-white/55 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {conflict}
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-white/45">{copy.description}</p>
          <textarea
            value={conflictDescription}
            onChange={(event) => setConflictDescription(event.target.value)}
            placeholder={copy.description}
            className="mt-2 h-24 w-full resize-none rounded-lg border border-white/10 bg-black/25 p-3 text-xs text-white outline-none transition-colors placeholder:text-white/28 focus:border-[#E50914] focus:bg-black/40"
          />
          <PreviewButton>{copy.continue}</PreviewButton>
        </ToolPanel>

        <ToolPanel title={copy.dashboardTitle} meta="PTY Audio">
          <p className="mb-4 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-white/42">
            {copy.illustrative}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {copy.dashboardMetrics.map((metric, index) => (
              <div
                key={metric.label}
                className="rounded-lg border border-white/8 bg-black/25 p-3 transition-all duration-300 hover:scale-[1.03] hover:border-[#E50914]/55 hover:shadow-[0_0_24px_rgba(229,9,20,0.2)]"
              >
                <p className="text-[10px] text-white/42">{metric.label}</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {animatedValues[index].toLocaleString()}
                </p>
                <div className="mt-3 h-6 rounded bg-[linear-gradient(135deg,transparent_0%,rgba(229,9,20,0.7)_52%,transparent_56%)]" />
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm font-semibold text-[#E50914]">
            {copy.catalogueHealth}
          </p>
          <div className="mt-5">
            <p className="mb-3 text-xs font-semibold text-white/58">
              Recent Releases
            </p>
            {copy.recentReleases.map((release) => (
              <div
                key={release}
                className="mb-2 flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 text-xs text-white/62"
              >
                <span>{release}</span>
                <BarChart3 className="size-3 text-[#E50914]" />
              </div>
            ))}
          </div>
        </ToolPanel>
      </div>
    </section>
  );
}

function ToolPanel({
  title,
  meta,
  children,
}: {
  title: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-white/12 bg-white/[0.035] p-6 shadow-2xl shadow-black/30">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-1 text-xs text-white/38">{meta}</p>
      <div className="mt-8">{children}</div>
    </article>
  );
}

function PreviewButton({
  children,
  disabled = false,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="mt-7 h-10 w-full rounded-lg bg-[#E50914] text-xs font-semibold text-white transition-colors hover:bg-[#ff1020] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/32"
    >
      {children}
    </button>
  );
}
