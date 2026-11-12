"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { HiArrowRight, HiCheck, HiExclamationCircle, HiLocationMarker, HiMail } from "react-icons/hi";
import { ContactErrors, ContactPayload, LIMITS, SERVICES, validateContact } from "@/lib/contact";
import Link from "next/link";
import { SELECT_SERVICE_EVENT } from "./quote-link";

type FieldName = keyof ContactErrors;
type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: ContactPayload = { name: "", company: "", email: "", service: "", message: "", website: "" };
const FIELD_ORDER: FieldName[] = ["name", "email", "company", "service", "message"];

const ContactUs: React.FC = () => {
  const [values, setValues] = useState<ContactPayload>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [serverErrors, setServerErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [sentTo, setSentTo] = useState({ name: "", email: "" });
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Client-side rules take precedence; server errors fill in anything else.
  const errors: ContactErrors = { ...serverErrors, ...validateContact(values) };
  const showError = (f: FieldName) => (touched[f] ? errors[f] : undefined);

  // "Request a quote" buttons on service cards pre-select the matching service.
  useEffect(() => {
    const onSelect = (e: Event) => {
      const service = (e as CustomEvent<string>).detail;
      if ((SERVICES as readonly string[]).includes(service)) {
        setValues((v) => ({ ...v, service }));
        setStatus((s) => (s === "success" ? "idle" : s));
      }
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setValues((v) => ({ ...v, [name]: value }));
      setServerErrors((s) => ({ ...s, [name]: undefined }));
      if (status === "error") setStatus("idle");
    },
    [status]
  );

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name as FieldName;
    setTouched((t) => ({ ...t, [name]: true }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const clientErrors = validateContact(values);
    if (Object.keys(clientErrors).length > 0) {
      setTouched({ name: true, email: true, company: true, service: true, message: true });
      const first = FIELD_ORDER.find((f) => clientErrors[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setSentTo({ name: values.name.trim(), email: values.email.trim() });
        setValues(EMPTY);
        setTouched({});
        setStatus("success");
      } else {
        if (data.errors) {
          setServerErrors(data.errors);
          setTouched({ name: true, email: true, company: true, service: true, message: true });
        }
        setServerMessage(data.error || "Something went wrong. Please try again later.");
        setStatus("error");
      }
    } catch {
      setServerMessage("Network error — please check your connection and try again.");
      setStatus("error");
    }
  };

  const fieldProps = (name: FieldName) => ({
    id: `contact-${name}`,
    name,
    value: values[name] ?? "",
    onChange: handleChange,
    onBlur: handleBlur,
    "aria-invalid": showError(name) ? true : undefined,
    "aria-describedby": showError(name) ? `contact-${name}-error` : undefined,
  });

  const fieldError = (name: FieldName) =>
    showError(name) ? (
      <p id={`contact-${name}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-red-300">
        <HiExclamationCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
        {showError(name)}
      </p>
    ) : null;

  const labelCls = "mb-2 block text-sm font-medium text-white/80";

  return (
    <section id="contact" className="relative bg-black py-24 text-white md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-10 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
        {/* Intro */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="eyebrow text-white/70">Contact</span>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tighter md:text-6xl">
            Let&apos;s build something out of this world.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
            Tell us about your project, your goals and your timeline. We&apos;ll get back to you with the next steps.
          </p>

          <ul className="mt-12 space-y-6">
            <li>
              <a href="mailto:hello@darkmatter.com" className="group flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center border border-white/20 transition-colors group-hover:border-white group-hover:bg-white group-hover:text-black">
                  <HiMail className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.2em] text-white/50">Email</span>
                  <span className="mt-1 block text-lg">hello@darkmatter.com</span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center border border-white/20">
                <HiLocationMarker className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.2em] text-white/50">Studio</span>
                <span className="mt-1 block text-lg">Nabeul, Korba — Tunisia</span>
              </span>
            </li>
          </ul>
        </div>

        {/* Form / success card */}
        <div className="border-2 border-white/90 bg-black p-6 shadow-[-10px_10px_0_rgba(255,255,255,0.15)] sm:p-10">
          {status === "success" ? (
            <div ref={successRef} tabIndex={-1} role="status" className="flex min-h-[28rem] flex-col items-start justify-center focus:outline-none">
              <span className="flex h-14 w-14 items-center justify-center bg-white text-black">
                <HiCheck className="h-8 w-8" aria-hidden="true" />
              </span>
              <h3 className="mt-8 text-3xl font-semibold tracking-tighter">Message sent{sentTo.name ? `, ${sentTo.name}` : ""}!</h3>
              <p className="mt-4 max-w-sm text-lg leading-relaxed text-white/60">
                Thanks for reaching out. We&apos;ll reply to <span className="text-white">{sentTo.email}</span> as soon as possible.
              </p>
              <button type="button" className="btn-ghost-light mt-10" onClick={() => setStatus("idle")}>
                Send another message
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className={labelCls}>
                    Your name <span className="text-white/40">*</span>
                  </label>
                  <input {...fieldProps("name")} type="text" autoComplete="name" maxLength={LIMITS.name} placeholder="Jane Doe" className="field" required />
                  {fieldError("name")}
                </div>
                <div>
                  <label htmlFor="contact-email" className={labelCls}>
                    Email <span className="text-white/40">*</span>
                  </label>
                  <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" maxLength={LIMITS.email} placeholder="jane@company.com" className="field" required />
                  {fieldError("email")}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-company" className={labelCls}>
                    Company <span className="text-white/40">(optional)</span>
                  </label>
                  <input {...fieldProps("company")} type="text" autoComplete="organization" maxLength={LIMITS.company} placeholder="Company name" className="field" />
                  {fieldError("company")}
                </div>
                <div>
                  <label htmlFor="contact-service" className={labelCls}>
                    Service <span className="text-white/40">*</span>
                  </label>
                  <div className="relative">
                    <select {...fieldProps("service")} className="field appearance-none pr-10 [&>option]:bg-black" required>
                      <option value="" disabled>
                        Choose a service
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <svg className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {fieldError("service")}
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor="contact-message" className={labelCls}>
                    Project details <span className="text-white/40">*</span>
                  </label>
                  <span className={`text-xs ${values.message.length > LIMITS.message ? "text-red-300" : "text-white/40"}`} aria-live="polite">
                    {values.message.length}/{LIMITS.message}
                  </span>
                </div>
                <textarea
                  {...fieldProps("message")}
                  rows={6}
                  maxLength={LIMITS.message}
                  placeholder="What are you building? Goals, timeline, budget range…"
                  className="field min-h-[10rem] resize-y leading-relaxed"
                  required
                />
                {fieldError("message")}
              </div>

              {/* Honeypot — hidden from people, irresistible to bots. */}
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={handleChange} />
              </div>

              {status === "error" && serverMessage && (
                <div role="alert" className="flex items-start gap-3 border-2 border-red-400/60 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  <HiExclamationCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>
                    {serverMessage}{" "}
                    <a href="mailto:hello@darkmatter.com" className="underline underline-offset-2">
                      hello@darkmatter.com
                    </a>
                  </span>
                </div>
              )}

              <div className="flex flex-col-reverse items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-relaxed text-white/40">
                  By sending this form you agree to our{" "}
                  <Link href="/privacy" className="underline underline-offset-2 hover:text-white">
                    privacy policy
                  </Link>
                  .
                </p>
                <button type="submit" className="btn-light group w-full shrink-0 sm:w-auto" disabled={status === "submitting"}>
                  {status === "submitting" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send request
                      <HiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
