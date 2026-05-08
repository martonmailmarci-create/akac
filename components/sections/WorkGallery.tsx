"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type View = "slide" | "grid2" | "grid3";

type Project = {
  id: string;
  name: string;
  category: string;
  tags: string[];
  thumb: string;
  large: string;
  slug?: string;
};

const ALL_PROJECTS: Project[] = [
  {
    id: "01", name: "ANNA ŁABNO",
    category: "WEB DESIGN & DEVELOPMENT", tags: ["HEALTHCARE / THERAPY"],
    thumb: "/project1/project1.jpg", large: "/project1/project1.jpg",
    slug: "annalabno",
  },
  {
    id: "02", name: "PROJECT 02",
    category: "WEB APP", tags: ["SAAS"],
    thumb: "/project2/project2.jpg", large: "/project2/project2.jpg",
  },
];

const CATEGORIES = ["ALL", ...Array.from(new Set(ALL_PROJECTS.map((p) => p.category)))];

function ProjectCard({ p, children, className = "" }: { p: Project; children: React.ReactNode; className?: string }) {
  if (p.slug) {
    return (
      <Link href={`/work/${p.slug}`} className={`block group ${className}`}>
        {children}
      </Link>
    );
  }
  return <div className={className}>{children}</div>;
}

function Meta({ category, tags, name, slug }: { category: string; tags: string[]; name: string; slug?: string }) {
  return (
    <div className="flex items-center justify-between mt-3">
      <span className="text-[11px] font-medium text-akac-black/40 uppercase tracking-[0.18px]">
        [{category}] — [{tags.join(", ")}]
      </span>
      <span className="text-[13px] font-semibold text-akac-black uppercase tracking-[-0.26px] flex items-center gap-1.5">
        {name}
        {slug && <span className="text-akac-orange text-[11px]">→</span>}
      </span>
    </div>
  );
}

function SlideIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke={active ? "#ED6D40" : "#111111"} strokeWidth="1.5" />
    </svg>
  );
}

function Grid2Icon({ active }: { active: boolean }) {
  const c = active ? "#ED6D40" : "#111111";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="7" height="12" rx="1.5" stroke={c} strokeWidth="1.5" />
      <rect x="11" y="4" width="7" height="12" rx="1.5" stroke={c} strokeWidth="1.5" />
    </svg>
  );
}

function Grid3Icon({ active }: { active: boolean }) {
  const c = active ? "#ED6D40" : "#111111";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="1" y="2" width="5.5" height="7" rx="1" stroke={c} strokeWidth="1.5" />
      <rect x="7.25" y="2" width="5.5" height="7" rx="1" stroke={c} strokeWidth="1.5" />
      <rect x="13.5" y="2" width="5.5" height="7" rx="1" stroke={c} strokeWidth="1.5" />
      <rect x="1" y="11" width="5.5" height="7" rx="1" stroke={c} strokeWidth="1.5" />
      <rect x="7.25" y="11" width="5.5" height="7" rx="1" stroke={c} strokeWidth="1.5" />
      <rect x="13.5" y="11" width="5.5" height="7" rx="1" stroke={c} strokeWidth="1.5" />
    </svg>
  );
}

// ── Slide View ───────────────────────────────────────────────────────────────
function SlideView({ projects, activeIndex, direction }: {
  projects: Project[]; activeIndex: number; direction: number;
}) {
  const p = projects[activeIndex];
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={p.id}
        custom={direction}
        variants={{
          enter: (d: number) => ({ x: d * 50, opacity: 0 }),
          center: { x: 0, opacity: 1 },
          exit: (d: number) => ({ x: d * -50, opacity: 0 }),
        }}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      >
        <ProjectCard p={p}>
          <div className="relative w-full rounded-[20px] overflow-hidden" style={{ aspectRatio: "16/8" }}>
            <Image
              src={p.large}
              alt={p.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, calc(100vw - 200px)"
              priority
            />
          </div>
          <Meta category={p.category} tags={p.tags} name={p.name} slug={p.slug} />
        </ProjectCard>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Grid 2 View ──────────────────────────────────────────────────────────────
function Grid2View({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {projects.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <ProjectCard p={p}>
            <div className="relative w-full rounded-[20px] overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <Image
                src={p.large}
                alt={p.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <Meta category={p.category} tags={p.tags} name={p.name} slug={p.slug} />
          </ProjectCard>
        </motion.div>
      ))}
    </div>
  );
}

// ── Grid 3 View (compact square grid) ───────────────────────────────────────
function Grid3View({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {projects.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.05, ease: [0.4, 0, 0.2, 1] }}
        >
          <ProjectCard p={p}>
            <div className="relative w-full rounded-[14px] overflow-hidden" style={{ aspectRatio: "1/1" }}>
              <Image
                src={p.large}
                alt={p.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <Meta category={p.category} tags={p.tags} name={p.name} slug={p.slug} />
          </ProjectCard>
        </motion.div>
      ))}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function WorkGallery() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [view, setView] = useState<View>("grid2");
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState("ALL");
  const [filterOpen, setFilterOpen] = useState(false);
  const [direction, setDirection] = useState(1);

  const filtered = filter === "ALL" ? ALL_PROJECTS : ALL_PROJECTS.filter((p) => p.category === filter);
  const safeActive = Math.min(activeIndex, Math.max(0, filtered.length - 1));

  const prev = () => {
    setDirection(-1);
    if (!isMobile) setView("slide");
    setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
  };

  const next = () => {
    setDirection(1);
    if (!isMobile) setView("slide");
    setActiveIndex((i) => (i + 1) % filtered.length);
  };

  return (
    <div className="bg-akac-light min-h-screen" style={{ paddingTop: "180px" }}>
      {/* ── Header ── */}
      <div className="text-center px-6 mb-14">
        <p className="text-[12px] font-medium text-akac-black/50 uppercase tracking-[0.18px] mb-3">/ OUR WORK</p>
        <h1 className="text-[28px] md:text-[55px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.1] mb-4">
          WHAT WE&apos;VE BUILT
        </h1>
        <p className="text-[12px] font-medium text-akac-black/40 uppercase tracking-[0.18px]">
          HAND-CRAFTED. PERFORMANCE-DRIVEN. EVERY TIME.
        </p>
      </div>

      {/* ── Controls bar ── */}
      <div className="flex items-center justify-between px-6 md:px-[100px] mb-8 relative">

        {/* Filter */}
        <div className="relative">
          <button
            onClick={() => setFilterOpen((o) => !o)}
            className="flex items-center gap-1.5 bg-akac-black text-akac-cream rounded-md px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18px] cursor-pointer"
            style={{ border: "none" }}
          >
            FILTER
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="#F9F9F4" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full left-0 mt-2 bg-akac-black rounded-xl overflow-hidden z-20"
                style={{ minWidth: "170px" }}
              >
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setFilter(cat); setFilterOpen(false); setActiveIndex(0); }}
                    className="block w-full text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18px] bg-transparent cursor-pointer transition-colors hover:bg-white/5"
                    style={{ border: "none", color: filter === cat ? "#ED6D40" : "#F9F9F4" }}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Thumbnail strip — desktop only */}
        <div className="hidden md:flex items-center gap-3">
          {filtered.map((p, i) => (
            <button
              key={p.id}
              onClick={() => { setActiveIndex(i); setView("slide"); }}
              className="flex flex-col items-center gap-1.5 bg-transparent p-0 cursor-pointer"
              style={{ border: "none" }}
            >
              <div
                className="relative rounded-lg overflow-hidden transition-opacity duration-300"
                style={{ width: "68px", height: "44px", opacity: safeActive === i ? 1 : 0.4 }}
              >
                <Image src={p.thumb} alt={p.name} fill className="object-cover" sizes="68px" />
              </div>
              <div
                className="bg-akac-orange rounded-[1px] transition-opacity duration-300"
                style={{ width: "5px", height: "5px", opacity: safeActive === i ? 1 : 0 }}
              />
            </button>
          ))}
        </div>

        {/* View toggles + arrows */}
        <div className="flex items-center gap-1">
          {([
            { key: "slide" as View, Icon: SlideIcon, mobileHidden: true },
            { key: "grid2" as View, Icon: Grid2Icon, mobileHidden: false },
            { key: "grid3" as View, Icon: Grid3Icon, mobileHidden: false },
          ]).map(({ key, Icon, mobileHidden }) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className={`p-2 rounded-md cursor-pointer transition-colors duration-200 ${mobileHidden ? "hidden md:block" : ""}`}
              style={{
                border: "none",
                backgroundColor: view === key ? "rgba(237,109,64,0.12)" : "transparent",
              }}
            >
              <Icon active={view === key} />
            </button>
          ))}

          <div
            className="mx-1"
            style={{ width: "1px", height: "20px", backgroundColor: "rgba(17,17,17,0.15)" }}
          />

          <button
            onClick={prev}
            className="flex items-center justify-center rounded-md cursor-pointer transition-colors hover:bg-akac-black/5"
            style={{ padding: "7px", border: "1px solid rgba(17,17,17,0.2)", background: "transparent" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            className="flex items-center justify-center rounded-md cursor-pointer transition-colors hover:bg-akac-black/5"
            style={{ padding: "7px", border: "1px solid rgba(17,17,17,0.2)", background: "transparent" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Gallery ── */}
      <div className="px-6 md:px-[100px] pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-[13px] font-medium text-akac-black/40 uppercase tracking-[0.18px]">
            NO PROJECTS MATCH THIS FILTER
          </div>
        ) : view === "slide" ? (
          <SlideView projects={filtered} activeIndex={safeActive} direction={direction} />
        ) : view === "grid2" ? (
          <Grid2View projects={filtered} />
        ) : (
          <Grid3View projects={filtered} />
        )}
      </div>
    </div>
  );
}
