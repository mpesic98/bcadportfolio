import { proposalSiteById } from "../../data/proposalFormats"
import {
  GLOBAL_AD_SPECS_VERSION,
  getOfficialSpecsForAppFormat,
} from "../../data/globalAdSpecs2026"
import { assetLooksLikeVideo } from "./creativeResolver"

export const PORTABLE_PROPOSAL_SCHEMA = "bc-ad-portfolio-proposal"
export const PORTABLE_PROPOSAL_VERSION = 3
export const DEFAULT_PUBLIC_HERO_VIDEO_URL =
  "https://bettercollective.com/wp-content/uploads/2024/05/50-8bit-420.webm"

const PREVIEW_TYPE_ALIASES = {
  "display-banners": "display_banners",
  display_banners: "display_banners",
  "interscroller-image": "interscroller_image",
  interscroller_image: "interscroller_image",
  "interscroller-video": "interscroller_video",
  interscroller_video: "interscroller_video",
  "desktop-skin": "desktop_skin",
  desktop_skin: "desktop_skin",
  mobile_skin: "mobile_skin",
  "mobile-sticky": "sticky_mobile",
  sticky_mobile: "sticky_mobile",
  "video-banner": "video_banner",
  video_banner: "video_banner",
  countdown: "countdown",
  demo: "custom_demo_url",
  custom_demo_url: "custom_demo_url",
  image: "image",
}

function firstValue(...values) {
  return values.find((value) => typeof value === "string" && value.trim()) || ""
}

export function isPublicAssetUrl(value = "") {
  try {
    const parsed = new URL(String(value).trim())
    const hostname = parsed.hostname.toLowerCase()
    return (
      (parsed.protocol === "http:" || parsed.protocol === "https:") &&
      hostname !== "localhost" &&
      hostname !== "127.0.0.1" &&
      hostname !== "::1" &&
      !hostname.endsWith(".localhost") &&
      !hostname.endsWith(".local")
    )
  } catch {
    return false
  }
}

function inferPreviewType(format, assets) {
  if (format.demoUrl) return "custom_demo_url"

  const explicit = PREVIEW_TYPE_ALIASES[format.previewType] || PREVIEW_TYPE_ALIASES[format.type]
  if (explicit && explicit !== "image") return explicit

  const id = format.catalogFormatId || format.id || ""
  if (id === "display-banners") return "display_banners"
  if (id === "interscroller") {
    return assetLooksLikeVideo(assets.interscroller_video)
      ? "interscroller_video"
      : "interscroller_image"
  }
  if (id === "skin") return "desktop_skin"
  if (id === "mobile-slider" || id === "mobile-sticky") return "sticky_mobile"
  if (id === "video-banners" || id === "video-banner") {
    return "video_banner"
  }
  if (id.startsWith("video-instream-") && id.endsWith("-onsite")) {
    return "instream_onsite"
  }
  if (id.startsWith("video-instream-") && id.endsWith("-youtube")) {
    return "instream_youtube"
  }
  if (id.startsWith("high-impact-") && id.endsWith("-takeover")) {
    return "takeover"
  }
  if (id === "countdown-widget") return "countdown"
  return assetLooksLikeVideo(firstValue(...Object.values(assets))) ? "video_banner" : "image"
}

function resolvePrimaryAsset(format, assets, creatives, type) {
  const direct = firstValue(
    format.assetUrl,
    format.videoUrl,
    format.imageUrl,
    format.previewImageUrl
  )
  if (direct) return direct

  const preferredKeys = {
    interscroller_image: ["interscroller"],
    interscroller_video: ["interscroller_video", "interscroller"],
    desktop_skin: ["skin_background", "skin_left", "skin_right"],
    mobile_skin: ["mobile_slider", "mobile_sticky", "mrec"],
    sticky_mobile: ["mobile_slider", "mobile_sticky", "mrec"],
    video_banner: ["video_banner"],
    countdown: ["video_banner_countdown", "countdown_widget", "video_banner"],
  }[type] || []

  return firstValue(
    ...preferredKeys.map((key) => assets[key]),
    ...creatives.map((creative) => creative.assetUrl),
    ...Object.values(assets)
  )
}

function normalizeFormat(format = {}, campaign = null, index = 0) {
  const sourceAssets = format.assets && typeof format.assets === "object" ? format.assets : {}
  const campaignAssets = campaign?.creatives || {}
  const creativeKeys = Array.isArray(format.creativeKeys) ? format.creativeKeys : []
  const assets = {}

  new Set([...creativeKeys, ...Object.keys(sourceAssets)]).forEach((key) => {
    const value = firstValue(sourceAssets[key], campaignAssets[key])
    if (value) assets[key] = value
  })

  const placementCreatives = (format.placements || []).map((placement) => ({
    id: placement.id || placement.placement,
    placement: placement.placement || placement.id,
    width: placement.width,
    height: placement.height,
    assetUrl: firstValue(
      placement.assetUrl,
      sourceAssets[placement.assetKey],
      campaignAssets[placement.assetKey]
    ),
  }))
  const directCreatives = (format.creatives || []).map((creative) => ({ ...creative }))
  const creatives = placementCreatives.length ? placementCreatives : directCreatives
  const type = inferPreviewType(format, assets)
  const sourceFormatId = format.catalogFormatId || format.id || format.formatId || ""
  const officialSpecs = format.officialSpecs?.length
    ? format.officialSpecs
    : getOfficialSpecsForAppFormat(sourceFormatId)
  const canonicalSizes = [...new Set(
    officialSpecs.flatMap((spec) => spec.dimensions || spec.includedUnits || [])
  )]

  return {
    id: format.id || format.formatId || `format-${index + 1}`,
    sourceFormatId,
    type,
    previewType: type,
    title: format.title || format.name || "Advertising format",
    category: format.categoryLabel || format.category || "Premium format",
    description: format.description || format.specs?.description || "Live creative preview.",
    sizes: officialSpecs.length
      ? canonicalSizes
      : Array.isArray(format.sizes)
        ? format.sizes
        : format.specs?.sizes || [],
    assetUrl: resolvePrimaryAsset(format, assets, creatives, type),
    demoUrl: format.demoUrl || "",
    assets,
    creatives,
    specStatus: officialSpecs.length ? "official" : format.specStatus || "custom",
    specVersion: officialSpecs.length ? GLOBAL_AD_SPECS_VERSION : null,
    officialSpecIds: officialSpecs.map((spec) => spec.id),
    officialSpecs,
  }
}

export function buildPortableProposal({ proposal, campaign, formats }) {
  const selectedFormats = proposal?.formats?.length
    ? proposal.formats
    : campaign?.formats?.length
      ? campaign.formats
      : formats || []
  const siteIds = proposal?.visibleSites || proposal?.sites || []
  const sites = siteIds.map((site) => {
    if (typeof site === "object") return site
    return proposalSiteById[site] || { id: site, name: site }
  })

  return {
    schema: PORTABLE_PROPOSAL_SCHEMA,
    version: PORTABLE_PROPOSAL_VERSION,
    exportedAt: new Date().toISOString(),
    shell: {
      brandName: proposal?.shellBrandName || "Better Collective",
      brandLogoUrl: proposal?.brandLogoUrl || "",
      heroBackgroundVideoUrl:
        proposal?.heroBackgroundVideoUrl || DEFAULT_PUBLIC_HERO_VIDEO_URL,
      fallbackHeroImageUrl: proposal?.fallbackHeroImageUrl || "",
      theme: {
        green: "#015b49",
        greenStrong: "#01483a",
        dark: "#08211c",
        greenSoft: "#8fdcc7",
        greenSoftest: "#d8f4ec",
      },
    },
    proposal: {
      id: proposal?.id || "proposal",
      slug: proposal?.id || "proposal",
      title: proposal?.title || "",
      advertiser: proposal?.advertiser || campaign?.brandName || "",
      market: proposal?.market || "",
      description: proposal?.description || campaign?.description || "",
      sites,
      formats: selectedFormats.map((format, index) =>
        normalizeFormat(format, campaign, index)
      ),
    },
  }
}

function collectFormatUrls(format) {
  if (format.demoUrl) return [format.demoUrl]

  return [
    format.assetUrl,
    ...Object.values(format.assets || {}),
    ...(format.creatives || []).map((creative) => creative.assetUrl),
  ].filter(Boolean)
}

export function validatePortableProposal(payload) {
  const proposal = payload?.proposal
  const errors = []

  if (!proposal?.title?.trim()) errors.push("Proposal title is required.")
  if (!proposal?.advertiser?.trim()) errors.push("Advertiser is required.")
  if (!proposal?.sites?.length) errors.push("Select at least one site.")
  if (!proposal?.formats?.length) errors.push("Select at least one format.")

  const shellUrls = [
    ["Brand logo", payload?.shell?.brandLogoUrl],
    ["Hero video", payload?.shell?.heroBackgroundVideoUrl],
    ["Fallback hero image", payload?.shell?.fallbackHeroImageUrl],
  ]
  shellUrls.forEach(([label, url]) => {
    if (url && !isPublicAssetUrl(url)) errors.push(`${label} must use a public HTTP(S) URL.`)
  })

  proposal?.formats?.forEach((format) => {
    const urls = collectFormatUrls(format)
    if (!urls.length) {
      errors.push(`${format.title}: add a public asset URL or demo URL.`)
      return
    }
    if (urls.some((url) => !isPublicAssetUrl(url))) {
      errors.push(`${format.title}: remove local, data, blob, file or localhost URLs.`)
    }
  })

  return errors
}
export function downloadTextFile(filename, contents, type) {
  const blob = new Blob([contents], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}
