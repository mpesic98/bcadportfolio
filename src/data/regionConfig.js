export const VALID_REGIONS = ["usa", "latam", "europe"]
export const VALID_SEGMENTS = ["non-endemic", "endemic"]

export const DEFAULT_REGION = "usa"
export const DEFAULT_SEGMENT = "non-endemic"

const SEGMENT_URL_MAP = {
  "non-endemic": "brands",
  endemic: "sportsbooks",
}

const SEGMENT_VALUE_MAP = Object.entries(SEGMENT_URL_MAP).reduce((acc, [segment, slug]) => {
  acc[segment] = segment
  acc[slug] = segment
  return acc
}, {})

export const REGION_LABELS = {
  usa: "USA",
  latam: "LATAM",
  europe: "EUROPE",
}

export function normalizeRegion(value) {
  if (!value) return DEFAULT_REGION
  const normalized = String(value).toLowerCase()
  return VALID_REGIONS.includes(normalized) ? normalized : DEFAULT_REGION
}

export function normalizeSegment(value) {
  if (!value) return DEFAULT_SEGMENT
  const normalized = String(value).toLowerCase()
  return SEGMENT_VALUE_MAP[normalized] || DEFAULT_SEGMENT
}

export function resolveRegionFromPath(pathname) {
  const firstSegment = pathname.split("/").filter(Boolean)[0]
  return normalizeRegion(firstSegment)
}

export function buildLandingPath(region) {
  return region === DEFAULT_REGION ? "/" : `/${region}`
}

export function getSegmentUrlValue(segment) {
  const normalized = normalizeSegment(segment)
  return SEGMENT_URL_MAP[normalized] || SEGMENT_URL_MAP[DEFAULT_SEGMENT]
}
