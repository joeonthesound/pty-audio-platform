"use client";

import { useState } from "react";

type PartnerDemoProps = {
  copy: {
    whiteLabel: {
      title: string;
      description: string;
      pty: string;
      partner: string;
      portal: string;
      subtitle: string;
      metrics: string[];
      note: string;
    };
  };
};

export function PartnerDemo({ copy }: PartnerDemoProps) {
  const [brand, setBrand] = useState<"pty" | "partner">("pty");
  const isPartner = brand === "partner";
  const accent = isPartner ? "#38BDF8" : "#E50914";
  const label = isPartner ? copy.whiteLabel.partner : copy.whiteLabel.pty;

  return (
    <section className="border-y border-white/8 bg-[#050505] px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#E50914]">
            White-label
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            {copy.whiteLabel.title}
          </h2>
          <p className="mt-5 text-sm leading-6 text-white/58">
            {copy.whiteLabel.description}
          </p>
          <div className="mt-8 inline-flex rounded-full border border-white/10 bg-white/[0.035] p-1">
            {(["pty", "partner"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setBrand(option)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  brand === option
                    ? "bg-white text-black"
                    : "text-white/55 hover:text-white"
                }`}
              >
                {option === "pty" ? copy.whiteLabel.pty : copy.whiteLabel.partner}
              </button>
            ))}
          </div>
        </div>

        <div
          className="rounded-3xl border bg-white/[0.035] p-6 shadow-2xl transition-colors"
          style={{ borderColor: `${accent}66` }}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white">
                {label}
              </p>
              <p className="mt-2 text-xs text-white/42">{copy.whiteLabel.portal}</p>
            </div>
            <span
              className="size-9 rounded-full"
              style={{ backgroundColor: accent }}
            />
          </div>
          <h3 className="mt-8 max-w-xl text-3xl font-semibold leading-tight text-white">
            {copy.whiteLabel.subtitle}
          </h3>
          <p className="mt-4 inline-flex rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/42">
            {copy.whiteLabel.note}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {copy.whiteLabel.metrics.map((metric) => (
              <div
                key={metric}
                className="rounded-2xl border border-white/10 bg-black/25 p-4 text-sm font-semibold text-white/72"
              >
                {metric}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
