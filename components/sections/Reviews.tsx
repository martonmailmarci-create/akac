"use client";

import { useEffect, useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealHeadline from "@/components/ui/RevealHeadline";
import { useLocale } from "@/components/providers/LocaleProvider";

type Review = {
  author: string;
  rating: number;
  text: string;
  time: string;
};

type ReviewsData = {
  configured: boolean;
  rating: number | null;
  count: number;
  url: string | null;
  reviews: Review[];
};

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-[3px]" aria-label={`${rating} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2l2.94 6.26 6.56.7-4.9 4.55 1.36 6.49L12 16.77 6.04 20l1.36-6.49-4.9-4.55 6.56-.7L12 2z"
            fill={i < rating ? "#ED6D40" : "rgba(17,17,17,0.15)"}
          />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const { t } = useLocale();
  const r = t.reviews;
  const [data, setData] = useState<ReviewsData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((json: ReviewsData) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Stay invisible until the API is configured and real reviews exist
  if (!data || data.reviews.length === 0) return null;

  return (
    <section
      className="bg-akac-light overflow-hidden rounded-t-[24px] md:rounded-t-[60px] px-6 pt-20 pb-24 md:px-[100px] md:pt-[140px] md:pb-[160px]"
      // Negative bottom margin pulls the (equally light) pricing section up so its
      // rounded top corners sit on this section's background and disappear.
      style={{ marginTop: "-60px", marginBottom: "-64px", position: "relative", zIndex: 3 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
        <div>
          <SectionLabel className="mb-3">{r.label}</SectionLabel>
          <RevealHeadline className="text-[30px] md:text-[55px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.1]">
            {r.headline}
          </RevealHeadline>
        </div>

        {/* Overall rating */}
        {data.rating !== null && (
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="text-[44px] md:text-[55px] font-medium text-akac-black tracking-[-1.1px] leading-none">
              {data.rating.toFixed(1)}
            </span>
            <div className="flex flex-col gap-2">
              <RatingStars rating={Math.round(data.rating)} />
              {data.url && (
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-akac-orange uppercase tracking-[0.18px] no-underline hover:opacity-70 transition-opacity"
                >
                  {data.count} {r.onGoogle} ↗
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Review cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.reviews.map((review) => (
          <div key={`${review.author}-${review.time}`} className="bg-akac-offwhite rounded-[20px] p-7 flex flex-col">
            <div className="mb-5">
              <RatingStars rating={review.rating} />
            </div>
            <p
              className="text-[15px] font-medium text-akac-black/70 leading-[1.6] tracking-[0.1px] mb-6 flex-1"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 8,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {review.text}
            </p>
            <div className="flex items-center gap-3 pt-5 border-t border-akac-black/10">
              <div
                className="w-[32px] h-[32px] rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(237,109,64,0.15)" }}
              >
                <span className="text-[13px] font-semibold text-akac-orange">
                  {review.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <span className="block text-[13px] font-semibold text-akac-black tracking-[0.1px]">
                  {review.author}
                </span>
                <span className="block text-[11px] font-medium text-akac-black/40 tracking-[0.1px]">
                  {review.time} · Google
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
