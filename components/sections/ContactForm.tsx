"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealHeadline from "@/components/ui/RevealHeadline";
import BracketButton from "@/components/ui/BracketButton";
import BookCallModal from "@/components/ui/BookCallModal";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full bg-transparent border-b py-3 text-[13px] font-medium text-akac-cream placeholder:text-akac-cream/30 focus:outline-none transition-colors duration-300 tracking-[0.1px]";
const inputStyle = { borderColor: "rgba(249,249,244,0.12)" };

const Dot = () => (
  <div className="w-[7px] h-[7px] bg-akac-orange flex-shrink-0" style={{ borderRadius: "2px" }} />
);

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? "Something went wrong.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section className="bg-akac-black overflow-hidden rounded-t-[24px] md:rounded-t-[60px] px-6 pt-20 pb-24 md:px-[100px] md:pt-[200px] md:pb-[260px]">

      {/* ── Centered header ── */}
      <div className="text-center mb-16 md:mb-24">
        <SectionLabel dark className="mb-6">/ CONTACT</SectionLabel>
        <RevealHeadline className="text-[28px] md:text-[55px] font-semibold text-akac-cream tracking-[-1.1px] leading-[1.1]">
          GET IN TOUCH
        </RevealHeadline>
      </div>

      {/* ── 50/50 split ── */}
      <div className="flex flex-col md:flex-row md:gap-0">

        {/* ── LEFT: Book a call ── */}
        <div className="flex-1 flex flex-col md:pr-16 pb-12 md:pb-0 md:border-r border-akac-cream/10">

          {/* Subheading with dot */}
          <div className="flex items-center gap-3 mb-4">
            <Dot />
            <h3 className="text-[22px] md:text-[28px] font-semibold text-akac-cream tracking-[-0.6px] leading-[1.1]">
              BOOK A 15-MINUTE CALL
            </h3>
          </div>

          <p className="text-[14px] font-medium text-akac-cream/50 leading-[1.6] mb-10 pl-[19px]">
            The fastest way to get started. We&apos;ll talk through your project, answer any questions, and figure out if we&apos;re a good fit — no commitment needed.
          </p>

          <div className="mt-auto flex flex-col gap-8">
            {/* Contact emails */}
            <div className="flex flex-col gap-3 pl-[19px]">
              {[
                { label: "GENERAL", value: "info@akac.studio", href: "mailto:info@akac.studio" },
                { label: "MARCELL", value: "marcell@akac.studio", href: "mailto:marcell@akac.studio" },
                { label: "VIKTOR", value: "viktor@akac.studio", href: "mailto:viktor@akac.studio" },
              ].map(({ label, value, href }) => (
                <div key={label} className="flex items-baseline gap-4">
                  <span className="text-[10px] font-semibold text-akac-cream/30 uppercase tracking-[0.18px] w-[64px] flex-shrink-0">{label}</span>
                  <a href={href} className="text-[13px] font-medium text-akac-cream/70 hover:text-akac-orange transition-colors no-underline">
                    {value}
                  </a>
                </div>
              ))}
            </div>

            <div className="self-start pl-[19px]">
              <BracketButton label="BOOK A CALL" color="#F9F9F4" onClick={() => setModalOpen(true)} />
            </div>

            {modalOpen && (
              <BookCallModal onClose={() => setModalOpen(false)} />
            )}
          </div>
        </div>

        {/* ── RIGHT: Send a message ── */}
        <div className="flex-1 flex flex-col md:pl-16 pt-12 md:pt-0 border-t border-akac-cream/10 md:border-t-0">

          {/* Subheading with dot */}
          <div className="flex items-center gap-3 mb-4">
            <Dot />
            <h3 className="text-[22px] md:text-[28px] font-semibold text-akac-cream tracking-[-0.6px] leading-[1.1]">
              SEND A MESSAGE
            </h3>
          </div>

          <p className="text-[14px] font-medium text-akac-cream/50 leading-[1.6] mb-10 pl-[19px]">
            Prefer to write it out? Fill in the form and we&apos;ll get back to you within 24 hours.
          </p>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                className="pl-[19px]"
              >
                <Dot />
                <p className="text-[24px] font-semibold text-akac-cream tracking-[-0.6px] leading-[1.1] mt-6 mb-3">
                  MESSAGE SENT.
                </p>
                <p className="text-[14px] font-medium text-akac-cream/50 leading-[1.6]">
                  We&apos;ll be in touch within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5 pl-[19px]"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input type="text" name="name" placeholder="Your name *" required className={inputClass} style={inputStyle} />
                  <input type="text" name="company" placeholder="Company (optional)" className={inputClass} style={inputStyle} />
                </div>

                <input type="email" name="email" placeholder="Email address *" required className={inputClass} style={inputStyle} />

                <textarea
                  name="message"
                  placeholder="Tell us about your project *"
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                  style={inputStyle}
                />

                {status === "error" && (
                  <p className="text-akac-orange text-[13px] font-medium">{errorMsg}</p>
                )}

                <div style={{ opacity: status === "loading" ? 0.4 : 1, pointerEvents: status === "loading" ? "none" : "auto" }}>
                  <BracketButton
                    label={status === "loading" ? "SENDING..." : "SEND MESSAGE"}
                    color="#F9F9F4"
                  />
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
