export const VALID_REGIONS = ["usa", "latam", "europe"]
export const VALID_SEGMENTS = ["non-endemic", "endemic"]

export const DEFAULT_REGION = "usa"
export const DEFAULT_SEGMENT = "non-endemic"

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
  return VALID_SEGMENTS.includes(normalized) ? normalized : DEFAULT_SEGMENT
}

export function resolveRegionFromPath(pathname) {
  const firstSegment = pathname.split("/").filter(Boolean)[0]
  return normalizeRegion(firstSegment)
}

export function buildLandingPath(region) {
  return region === DEFAULT_REGION ? "/" : `/${region}`
}
