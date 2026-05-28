"use client";

import RevealHeadline from "@/components/ui/RevealHeadline";
import SectionLabel from "@/components/ui/SectionLabel";
import { useLocale } from "@/components/providers/LocaleProvider";

const PHASE_COLORS = ["#ED6D40", "rgba(17,17,17,0.2)", "rgba(17,17,17,0.12)", "rgba(17,17,17,0.08)"];

export default function HowLong() {
  const { t } = useLocale();
  const hl = t.howLong;

  const plans = [
    {
      id: "ESSENTIAL",
      price: t.pricing.e_price,
      duration: hl.e_duration,
      phases: [
        { name: hl.e_phase1, span: hl.e_phase1span, width: "36%" },
        { name: hl.e_phase2, span: hl.e_phase2span, width: "57%" },
        { name: hl.e_phase3, span: hl.e_phase3span, width: "14%" },
      ],
    },
    {
      id: "PROFESSIONAL",
      price: t.pricing.p_price,
      duration: hl.p_duration,
      phases: [
        { name: hl.p_phase1, span: hl.p_phase1span, width: "25%" },
        { name: hl.p_phase2, span: hl.p_phase2span, width: "50%" },
        { name: hl.p_phase3, span: hl.p_phase3span, width: "25%" },
      ],
    },
    {
      id: "ENTERPRISE",
      price: t.pricing.n_price,
      duration: hl.n_duration,
      phases: [
        { name: hl.n_phase1, span: hl.n_phase1span, width: "15%" },
        { name: hl.n_phase2, span: hl.n_phase2span, width: "20%" },
        { name: hl.n_phase3, span: hl.n_phase3span, width: "50%" },
        { name: hl.n_phase4, span: hl.n_phase4span, width: "15%" },
      ],
    },
  ];

  return (
    <section
      className="bg-akac-light overflow-hidden rounded-t-[24px] md:rounded-t-[60px] px-6 pt-20 pb-24 md:px-[100px] md:pt-[140px] md:pb-[200px]"
      style={{ marginTop: "-60px", position: "relative", zIndex: 3 }}
    >
      {/* Header */}
      <div className="mb-12 md:mb-16">
        <SectionLabel className="mb-3">{hl.label}</SectionLabel>
        <RevealHeadline
          className="text-[30px] font-medium text-akac-black tracking-[-0.6px] leading-[32px]"
        >
          {hl.headline}
        </RevealHeadline>
      </div>

      {/* Plan timeline cards */}
      <div className="flex flex-col gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-[20px] p-8 bg-akac-cream"
          >
            {/* Card header */}
            <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div style={{ width: "6px", height: "6px", backgroundColor: "#ED6D40", borderRadius: "2px" }} />
                  <span className="text-[11px] font-semibold text-akac-black/50 uppercase tracking-[0.18px]">
                    {plan.id}
                  </span>
                </div>
                <span className="text-[22px] md:text-[28px] font-medium text-akac-black tracking-[-0.5px]">
                  {plan.price}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-semibold text-akac-black/40 uppercase tracking-[0.18px] block mb-1">
                  {hl.totalDuration}
                </span>
                <span className="text-[22px] md:text-[28px] font-medium text-akac-black tracking-[-0.5px]">
                  {plan.duration}
                </span>
              </div>
            </div>

            {/* Timeline bar */}
            <div className="flex gap-1 mb-4 h-[6px] rounded-full overflow-hidden">
              {plan.phases.map((phase, i) => (
                <div
                  key={phase.name}
                  style={{ width: phase.width, backgroundColor: PHASE_COLORS[i], borderRadius: "999px", flexShrink: 0 }}
                />
              ))}
            </div>

            {/* Phase labels */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-6">
              {plan.phases.map((phase, i) => (
                <div key={phase.name} className="flex items-center gap-2">
                  <div
                    style={{ width: "6px", height: "6px", backgroundColor: PHASE_COLORS[i], borderRadius: "2px", flexShrink: 0 }}
                  />
                  <div>
                    <span className="text-[12px] font-semibold text-akac-black uppercase tracking-[0.18px]">
                      {phase.name}
                    </span>
                    <span className="text-[12px] font-medium text-akac-black/40 ml-2 tracking-[0.1px]">
                      {phase.span}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
