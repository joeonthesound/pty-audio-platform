"use client";

import { useActionState, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  catalogueHealthCheckSchema,
  catalogueProblems,
  platforms,
  rightsOrganizations,
  userTypes,
  type CatalogueHealthCheckInput,
} from "./schema";
import {
  submitCatalogueHealthCheck,
  type CatalogueHealthCheckActionState,
} from "./actions";

type Option = {
  value: string;
  label: string;
};

type CatalogueHealthCheckFormProps = {
  copy: {
    title: string;
    subtitle: string;
    steps: string[];
    next: string;
    back: string;
    submit: string;
    success: string;
    failure: string;
    fields: Record<string, string>;
    placeholders: Record<string, string>;
    options: {
      userTypes: Record<string, string>;
      platforms: Record<string, string>;
      rightsOrganizations: Record<string, string>;
      problems: Record<string, string>;
    };
  };
};

const initialState: CatalogueHealthCheckActionState = {
  ok: false,
  message: "",
};

const stepFields: Array<Array<keyof CatalogueHealthCheckInput>> = [
  ["fullName", "email", "phone", "userType"],
  ["songCount", "recordingCount", "releaseYears", "platforms"],
  ["rightsOrganizations"],
  ["problems", "notes"],
];

export function CatalogueHealthCheckForm({
  copy,
}: CatalogueHealthCheckFormProps) {
  const [step, setStep] = useState(0);
  const [state, formAction, pending] = useActionState(
    submitCatalogueHealthCheck,
    initialState,
  );
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<CatalogueHealthCheckInput>({
    resolver: zodResolver(catalogueHealthCheckSchema),
    defaultValues: {
      platforms: [],
      rightsOrganizations: [],
      problems: [],
    },
    mode: "onBlur",
  });

  const options = useMemo(
    () => ({
      userTypes: userTypes.map((value) => ({
        value,
        label: copy.options.userTypes[value],
      })),
      platforms: platforms.map((value) => ({
        value,
        label: copy.options.platforms[value],
      })),
      rightsOrganizations: rightsOrganizations.map((value) => ({
        value,
        label: copy.options.rightsOrganizations[value],
      })),
      problems: catalogueProblems.map((value) => ({
        value,
        label: copy.options.problems[value],
      })),
    }),
    [copy.options],
  );

  async function goNext() {
    const valid = await trigger(stepFields[step]);
    if (valid) {
      setStep((current) => Math.min(current + 1, copy.steps.length - 1));
    }
  }

  return (
    <section className="min-h-screen bg-[#050505] px-5 py-28 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            PTY Audio
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-white/62">
            {copy.subtitle}
          </p>
        </div>

        <form
          action={formAction}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-xl sm:p-8"
        >
          <StepNav currentStep={step} steps={copy.steps} />

          <div className="mt-10 min-h-[28rem]">
            {step === 0 ? (
              <div className="grid gap-5 lg:grid-cols-2">
                <Field
                  label={copy.fields.fullName}
                  error={errors.fullName?.message}
                >
                  <input
                    {...register("fullName")}
                    placeholder={copy.placeholders.fullName}
                    className={inputClassName}
                  />
                </Field>
                <Field label={copy.fields.email} error={errors.email?.message}>
                  <input
                    {...register("email")}
                    placeholder={copy.placeholders.email}
                    className={inputClassName}
                  />
                </Field>
                <Field label={copy.fields.phone} error={errors.phone?.message}>
                  <input
                    {...register("phone")}
                    placeholder={copy.placeholders.phone}
                    className={inputClassName}
                  />
                </Field>
                <Field
                  label={copy.fields.userType}
                  error={errors.userType?.message}
                >
                  <RadioGrid
                    name="userType"
                    options={options.userTypes}
                    register={register}
                  />
                </Field>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="grid gap-5 lg:grid-cols-3">
                <Field
                  label={copy.fields.songCount}
                  error={errors.songCount?.message}
                >
                  <input
                    type="number"
                    {...register("songCount", { valueAsNumber: true })}
                    placeholder={copy.placeholders.songCount}
                    className={inputClassName}
                  />
                </Field>
                <Field
                  label={copy.fields.recordingCount}
                  error={errors.recordingCount?.message}
                >
                  <input
                    type="number"
                    {...register("recordingCount", { valueAsNumber: true })}
                    placeholder={copy.placeholders.recordingCount}
                    className={inputClassName}
                  />
                </Field>
                <Field
                  label={copy.fields.releaseYears}
                  error={errors.releaseYears?.message}
                >
                  <input
                    {...register("releaseYears")}
                    placeholder={copy.placeholders.releaseYears}
                    className={inputClassName}
                  />
                </Field>
                <Field
                  label={copy.fields.platforms}
                  error={errors.platforms?.message}
                  className="lg:col-span-3"
                >
                  <CheckboxGrid
                    name="platforms"
                    options={options.platforms}
                    register={register}
                  />
                </Field>
              </div>
            ) : null}

            {step === 2 ? (
              <Field
                label={copy.fields.rightsOrganizations}
                error={errors.rightsOrganizations?.message}
              >
                <CheckboxGrid
                  name="rightsOrganizations"
                  options={options.rightsOrganizations}
                  register={register}
                />
              </Field>
            ) : null}

            {step === 3 ? (
              <div className="grid gap-5">
                <Field
                  label={copy.fields.problems}
                  error={errors.problems?.message}
                >
                  <CheckboxGrid
                    name="problems"
                    options={options.problems}
                    register={register}
                  />
                </Field>
                <Field label={copy.fields.notes} error={errors.notes?.message}>
                  <textarea
                    {...register("notes")}
                    placeholder={copy.placeholders.notes}
                    className={`${inputClassName} min-h-32 resize-none py-3`}
                  />
                </Field>
              </div>
            ) : null}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => setStep((current) => Math.max(current - 1, 0))}
              disabled={step === 0 || pending}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/10 px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowLeft className="size-4" />
              {copy.back}
            </button>

            {step < copy.steps.length - 1 ? (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-white"
              >
                {copy.next}
                <ArrowRight className="size-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={pending}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-70"
              >
                {pending ? copy.next : copy.submit}
                <ArrowRight className="size-4" />
              </button>
            )}
          </div>

          {state.message ? (
            <p
              className={`mt-5 rounded-lg border px-4 py-3 text-sm ${
                state.ok
                  ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                  : "border-primary/30 bg-primary/10 text-red-100"
              }`}
            >
              {state.ok ? copy.success : copy.failure}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function StepNav({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: string[];
}) {
  return (
    <ol className="grid gap-3 sm:grid-cols-4">
      {steps.map((label, index) => {
        const active = index === currentStep;
        const complete = index < currentStep;

        return (
          <li
            key={label}
            className={`rounded-xl border p-4 ${
              active
                ? "border-primary bg-primary/10"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`grid size-8 place-items-center rounded-full text-xs font-bold ${
                  complete || active
                    ? "bg-primary text-white"
                    : "bg-white/10 text-white/45"
                }`}
              >
                {complete ? <Check className="size-4" /> : index + 1}
              </span>
              <span className="text-sm font-semibold">{label}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-semibold text-white/82">
        {label}
      </span>
      {children}
      {error ? <span className="mt-2 block text-xs text-primary">{error}</span> : null}
    </label>
  );
}

function RadioGrid({
  name,
  options,
  register,
}: {
  name: "userType";
  options: Option[];
  register: ReturnType<typeof useForm<CatalogueHealthCheckInput>>["register"];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-black/25 p-4 text-sm text-white/72 transition-colors has-[:checked]:border-primary has-[:checked]:text-white"
        >
          <input
            type="radio"
            value={option.value}
            {...register(name)}
            className="size-4 accent-primary"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}

function CheckboxGrid({
  name,
  options,
  register,
}: {
  name: "platforms" | "rightsOrganizations" | "problems";
  options: Option[];
  register: ReturnType<typeof useForm<CatalogueHealthCheckInput>>["register"];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-black/25 p-4 text-sm text-white/72 transition-colors has-[:checked]:border-primary has-[:checked]:text-white"
        >
          <input
            type="checkbox"
            value={option.value}
            {...register(name)}
            className="size-4 rounded accent-primary"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}

const inputClassName =
  "h-12 w-full rounded-lg border border-white/10 bg-black/35 px-4 text-sm text-white outline-none transition-colors placeholder:text-white/28 focus:border-primary";
