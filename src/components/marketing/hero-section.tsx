"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type HeroSectionProps = {
  locale: string;
  copy: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    trustLabel: string;
    scroll: string;
    metrics: {
      catalogueValue: string;
      totalEstimate: string;
      royalties: string;
      health: string;
      score: string;
      status: string;
      review: string;
    };
    partners: string[];
  };
  image: {
    src: string;
    alt: string;
  };
};

const cardVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function HeroSection({ locale, copy, image }: HeroSectionProps) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#050505] pt-20 text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_40%,rgba(229,9,20,0.22),transparent_28%),linear-gradient(90deg,#050505_0%,rgba(5,5,5,0.78)_36%,rgba(5,5,5,0.96)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
            {copy.eyebrow}
          </p>
          <h1 className="text-5xl font-semibold leading-[0.95] tracking-normal text-white sm:text-6xl lg:text-7xl">
            {copy.titleLine1}
            <span className="mt-2 block text-primary">{copy.titleLine2}</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            {copy.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${locale}/catalogue-health-check`}
              className="inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-primary px-6 text-sm font-semibold text-white shadow-[0_0_36px_rgba(229,9,20,0.3)] transition-transform hover:-translate-y-0.5"
            >
              {copy.primaryCta}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={`/${locale}/services/distribution`}
              className="inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-white/12 bg-white/[0.03] px-6 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]"
            >
              {copy.secondaryCta}
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/38">
              {copy.trustLabel}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-semibold text-white/75">
              {copy.partners.map((partner) => (
                <span key={partner}>{partner}</span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12, delayChildren: 0.25 }}
          className="hidden lg:grid lg:grid-cols-[1fr_0.82fr] lg:gap-5"
        >
          <div className="space-y-5 self-center">
            <motion.div
              variants={cardVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-xl border border-white/8 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl"
            >
              <p className="text-sm font-medium text-white/72">
                {copy.metrics.catalogueValue}
              </p>
              <p className="mt-3 text-xs text-white/45">
                {copy.metrics.totalEstimate}
              </p>
              <p className="mt-1 text-3xl font-semibold">$1,248,750</p>
              <div className="mt-4 h-9 rounded-md bg-[linear-gradient(135deg,transparent_0%,transparent_20%,rgba(229,9,20,0.22)_21%,transparent_24%,transparent_48%,rgba(229,9,20,0.7)_49%,transparent_52%,transparent_70%,rgba(229,9,20,0.95)_71%,transparent_74%)]" />
            </motion.div>

            <motion.div
              variants={cardVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-xl border border-white/8 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl"
            >
              <p className="mb-4 text-sm font-medium text-white/72">
                {copy.metrics.royalties}
              </p>
              {["Streaming", "YouTube", "Publishing", "Mechanical"].map(
                (source, index) => (
                  <div
                    key={source}
                    className="flex items-center justify-between border-t border-white/6 py-3 text-sm"
                  >
                    <span className="text-white/58">{source}</span>
                    <span className="font-semibold">
                      ${[332420, 245760, 336180, 98390][index].toLocaleString()}
                    </span>
                  </div>
                ),
              )}
            </motion.div>
          </div>

          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="self-end rounded-[1.6rem] border border-white/20 bg-black/58 p-5 shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
                <span className="size-5 rounded-full bg-primary" />
                PTY Audio
              </span>
              <span className="h-0.5 w-5 bg-white/70" />
            </div>
            <p className="text-3xl font-semibold leading-tight">
              Conoce la salud real de tu catálogo.
            </p>
            <p className="mt-5 text-sm leading-6 text-white/62">
              Revisamos titularidad, registros, metadatos y fuentes de regalías
              para identificar posibles brechas, inconsistencias y oportunidades
              de mejora.
            </p>
            <p className="mt-4 text-xs font-medium leading-5 text-white/42">
              Evaluación inicial confidencial. Sin transferencia de derechos.
            </p>
            <div className="mt-8 rounded-xl border border-white/10 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-white/58">Estado del catálogo</p>
                <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/38">
                  Ejemplo ilustrativo
                </span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="grid size-16 place-items-center rounded-full border-[6px] border-primary text-sm font-semibold">
                  {copy.metrics.score}
                </div>
                <div>
                  <p className="font-semibold">Revisión recomendada</p>
                  <p className="text-xs leading-5 text-primary">
                    Completa la evaluación para recibir un diagnóstico inicial.
                  </p>
                </div>
              </div>
            </div>
            <Link
              href={`/${locale}/catalogue-health-check`}
              className="mt-5 inline-flex h-9 items-center justify-center rounded-full bg-primary px-4 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Evaluar mi catálogo →
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/35 lg:flex">
        {copy.scroll}
        <ArrowDown className="size-3 animate-bounce text-primary" />
      </div>
    </section>
  );
}
