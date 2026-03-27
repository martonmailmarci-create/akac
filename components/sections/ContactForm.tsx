"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

const projectTypes = [
  "Essential",
  "Professional",
  "Enterprise",
  "Not sure yet",
];

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      projectType: (form.elements.namedItem("projectType") as HTMLSelectElement)
        .value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
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
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const inputClass =
    "w-full bg-transparent border-b border-akac-light/20 py-4 text-[16px] font-medium text-akac-cream placeholder:text-akac-light/30 focus:outline-none focus:border-akac-light/60 transition-colors duration-200 tracking-[0.24px]";

  return (
    <section
      id="contact-form"
      className="bg-akac-black px-[100px] py-[80px]"
    >
      <div className="max-w-[720px] mx-auto">
        <span className="text-[12px] font-medium text-akac-light uppercase tracking-[0.18px] block mb-6">
          / CONTACT
        </span>
        <h2 className="text-[30px] font-medium text-akac-light tracking-[-0.6px] leading-[1.3] mb-12">
          TELL US WHAT YOU NEED
        </h2>

        {status === "success" ? (
          <div className="py-12">
            <p className="text-[20px] font-semibold text-akac-cream">
              Message received.
            </p>
            <p className="text-[16px] font-medium text-akac-light/60 mt-2">
              We&apos;ll be in touch within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name *"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="company"
                  placeholder="Company (optional)"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address *"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <select
                  name="projectType"
                  className={`${inputClass} appearance-none cursor-pointer`}
                  defaultValue=""
                >
                  <option value="" disabled className="bg-akac-black text-akac-light">
                    Project type
                  </option>
                  {projectTypes.map((t) => (
                    <option
                      key={t}
                      value={t}
                      className="bg-akac-black text-akac-light"
                    >
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Tell us about your project *"
                required
                rows={5}
                className={`${inputClass} resize-none`}
              />
            </div>

            {status === "error" && (
              <p className="text-akac-orange text-[14px] font-medium">
                {errorMsg}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 font-semibold text-[13px] tracking-[0.2em] uppercase text-akac-light transition-opacity duration-200 hover:opacity-70 disabled:opacity-40 cursor-pointer"
              >
                <span className="font-light opacity-60">[</span>
                <span>
                  {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
                </span>
                <span className="font-light opacity-60">]</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
