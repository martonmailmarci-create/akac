import { NextResponse } from "next/server";

type PlacesReview = {
  rating?: number;
  text?: { text?: string };
  relativePublishTimeDescription?: string;
  authorAttribution?: { displayName?: string };
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

// The profile's first reviews, transcribed verbatim from Google while the
// listing is still propagating into the Places index. Served whenever the
// live API has nothing; the live feed takes over automatically once it works.
const FALLBACK = {
  configured: true,
  rating: 5,
  count: 2,
  url: "https://share.google/2C8qHQu05uMjNKWNN",
  reviews: [
    {
      author: "Ildikó Horváth",
      rating: 5,
      text: "Az Akác Stúdió készítette a weboldalamat és a webes felületeimet, és szívből ajánlom őket. Pontosan értik, mire van szükség, nem kell hosszan magyarázni: gyorsan átlátják és megvalósítják az elképzeléseket. Fiatalos lendület, rugalmasság, precizitás és magas színvonalú munka szerintem pontosan erre van szükség a mai, gyorsan változó digitális világban. Ha minőségi munkát szeretnél gyorsan és profin, jó szívvel ajánlom az Akác Stúdiót! 🚀 www.bombano.eu",
      time: "2026. július",
    },
    {
      author: "Lélekbár",
      rating: 5,
      text: "Csak ajánlani tudom őket! Fiatal rudalmas, kreatív csapat, innovatív, korszerű megoldásokkal és gondolkodásmóddal. Könnyű velük együtt dolgozni, pillanatok alatt öntötték formába az elképzeléseimet. A weboldal fejlesztés korábban nekem egy macera, nehézkes és drága \"nemszeretem\" folyamat volt, de ők olyan modern, a működést megkönnyítő, felhasználóbarát, gyorsító megoldásokat javasoltak amiknek létezéséről nem is tudtam. Nagy mebkönnyebbülés volt számomra hogy a honlapkészítés tud egy könnyedén, gyorsan megvalósuló projekt lenni, a végeredmény pedig egy könnyen, jól használható átlátható és szép felület, ami fellendíti cégem forgalmát! Profi munka, kiváló ár-érték arányban!",
      time: "2026. július",
    },
  ],
};

// ── Cost guardrails ──────────────────────────────────────────────────────────
// The route is public, so nothing a visitor does may translate into Google
// API traffic. All requests are served from this in-memory cache for a day;
// on top of that, a hard daily budget caps upstream calls even if the cache
// is cold (new server instance, errors). Worst case is a few calls per day —
// orders of magnitude inside the Places API free tier.
type Payload = typeof FALLBACK;

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const MAX_UPSTREAM_CALLS_PER_DAY = 6;

let cached: { payload: Payload; at: number } | null = null;
let resolvedPlaceId: string | null = null;
let budget = { day: "", used: 0 };

function takeBudget(): boolean {
  const today = new Date().toISOString().slice(0, 10);
  if (budget.day !== today) {
    budget = { day: today, used: 0 };
  }
  if (budget.used >= MAX_UPSTREAM_CALLS_PER_DAY) return false;
  budget.used += 1;
  return true;
}

// Auto-discover the business's Place ID once it appears in Google's Places
// index (new profiles propagate from Search to Maps with a delay of days).
// GOOGLE_PLACE_ID in the environment overrides this lookup.
async function resolvePlaceId(key: string): Promise<string | null> {
  if (resolvedPlaceId) return resolvedPlaceId;
  if (!takeBudget()) return null;
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "places.id,places.displayName",
    },
    body: JSON.stringify({
      textQuery: "Akác Studio Pécs",
      locationBias: { circle: { center: { latitude: 46.0727, longitude: 18.2323 }, radius: 30000 } },
    }),
    next: { revalidate: 86400 },
  });
  if (!res.ok) return null;

  const data: { places?: { id?: string; displayName?: { text?: string } }[] } = await res.json();
  const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const match = (data.places ?? []).find((p) => normalize(p.displayName?.text ?? "") === "akac studio");
  resolvedPlaceId = match?.id ?? null;
  return resolvedPlaceId;
}

async function fetchPayload(key: string): Promise<Payload> {
  const placeId = process.env.GOOGLE_PLACE_ID || (await resolvePlaceId(key));
  if (!placeId || !takeBudget()) {
    return FALLBACK;
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?languageCode=hu`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
        },
        next: { revalidate: 86400 },
      }
    );
    if (!res.ok) {
      return FALLBACK;
    }

    const data: PlacesResponse = await res.json();
    const reviews = (data.reviews ?? [])
      .filter((r) => r.text?.text)
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Google user",
        rating: r.rating ?? 5,
        text: r.text?.text ?? "",
        time: r.relativePublishTimeDescription ?? "",
      }));

    if (reviews.length === 0) {
      return FALLBACK;
    }

    return {
      configured: true,
      rating: data.rating ?? null,
      count: data.userRatingCount ?? 0,
      url: data.googleMapsUri ?? null,
      reviews,
    } as Payload;
  } catch {
    return FALLBACK;
  }
}

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) {
    return NextResponse.json(FALLBACK);
  }

  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return NextResponse.json(cached.payload);
  }

  const payload = await fetchPayload(key);
  cached = { payload, at: Date.now() };
  return NextResponse.json(payload);
}
