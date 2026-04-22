"use client";

import RevealHeadline from "@/components/ui/RevealHeadline";
import SectionLabel from "@/components/ui/SectionLabel";

const plans = [
  {
    id: "ESSENTIAL",
    price: "€1,200 – €2,500",
    duration: "2 WEEKS",
    color: "#111111",
    phases: [
      { name: "Kickoff & Design",   span: "Days 1 – 5",  width: "36%" },
      { name: "Development",         span: "Days 4 – 12", width: "57%" },
      { name: "Review & Launch",     span: "Days 12 – 14",width: "14%" },
    ],
  },
  {
    id: "PROFESSIONAL",
    price: "€3,000 – €6,000",
    duration: "2 – 4 WEEKS",
    color: "#111111",
    phases: [
      { name: "Discovery & Design",  span: "Week 1",      width: "25%" },
      { name: "Development",          span: "Weeks 2 – 3", width: "50%" },
      { name: "Testing & Launch",     span: "Week 3 – 4",  width: "25%" },
    ],
  },
  {
    id: "ENTERPRISE",
    price: "From €8,000",
    duration: "CUSTOM",
    color: "#111111",
    phases: [
      { name: "Discovery & Scoping", span: "Weeks 1 – 2",  width: "15%" },
      { name: "Design",               span: "Weeks 2 – 4",  width: "20%" },
      { name: "Development",          span: "Weeks 4 – 12+",width: "50%" },
      { name: "QA & Handover",        span: "Final weeks",  width: "15%" },
    ],
  },
];

const PHASE_COLORS = ["#ED6D40", "rgba(17,17,17,0.2)", "rgba(17,17,17,0.12)", "rgba(17,17,17,0.08)"];

export default function HowLong() {
  return (
    <section
      className="bg-akac-light overflow-hidden rounded-t-[24px] md:rounded-t-[60px] px-6 pt-20 pb-24 md:px-[100px] md:pt-[140px] md:pb-[200px]"
      style={{ marginTop: "-60px", position: "relative", zIndex: 3 }}
    >
      {/* Header */}
      <div className="mb-12 md:mb-16">
        <SectionLabel className="mb-3">/ TIMELINE</SectionLabel>
        <RevealHeadline
          className="text-[30px] font-medium text-akac-black tracking-[-0.6px] leading-[32px]"
        >
          HOW LONG DOES IT TAKE
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
                  TOTAL DURATION
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
