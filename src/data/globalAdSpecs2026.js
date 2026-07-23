export const GLOBAL_AD_SPECS_VERSION = "2026.1"

const YES = true
const NO = false

const displayShared = {
  acceptedFormats: [
    "Third-party served tags (SSL-compliant; HTTPS required)",
    "Direct upload: JPG, PNG or GIF (static or animated)",
    "HTML5 only as a complete ZIP package",
  ],
  fileLimits: {
    initialLoad: { desktop: "200 KB", mobile: "150 KB" },
    politeLoad: { desktop: "2 MB", mobile: "1 MB" },
    userInitiatedLoad: { desktop: "10 MB", mobile: "2 MB" },
  },
  animation: "Maximum 15 seconds and 3 loops",
  audioPolicy: "Must load muted. Audio may begin only after user interaction (click to unmute).",
  labelingRequirements:
    "Clearly distinguish the ad from editorial content and include at least a 1px grey or black border.",
  support: { pmp: YES, pg: YES, thirdParty: YES },
  operationalNotes: [
    "Individual HTML elements are not accepted.",
    "Expandable creatives require prior approval.",
  ],
}

const onSiteVideoShared = {
  dimensions: ["16:9 primary", "1:1 optional"],
  devices: ["Cross Device"],
  acceptedFormats: ["MP4 (H.264)", "VAST 2.0", "VAST 3.0"],
  fileLimits: { vast: "10 MB", hosted: "200 MB" },
  bitrate: "3–5 Mbps",
  frameRate: "23.98 or 29.97 fps",
  audioPolicy: "Autoplay muted; sound is enabled only after user interaction.",
  support: { pmp: YES, pg: YES, thirdParty: YES },
  operationalNotes: [
    "All video tags and impression tracking pixels must use HTTPS.",
    "VAST must support standard tracking events.",
    "Creatives are subject to QA approval and must be submitted at least 5 business days before launch.",
    "Video inventory is integrated through a third-party player.",
  ],
}

const youtubeVideoShared = {
  dimensions: ["16:9 primary", "1:1 optional"],
  devices: ["Cross Device"],
  acceptedFormats: ["MP4 (H.264)", "VAST 2.0", "VAST 3.0"],
  fileLimits: { vast: "10 MB", hosted: "15 MB" },
  bitrate: "3–5 Mbps",
  frameRate: "23.98 or 29.97 fps",
  audioPolicy: "Autoplay muted; sound is enabled only after user interaction.",
  support: { pmp: NO, pg: YES, thirdParty: YES },
  operationalNotes: [
    "Supported YouTube vendors: Google, Innovid, Extreme Reach, Adform and Flashtalking.",
    "All video tags and impression tracking pixels must use HTTPS.",
    "Third-party tags are subject to technical validation and approval.",
    "Creatives are subject to QA approval and must be submitted at least 5 business days before launch.",
  ],
}

export const officialAdFormats2026 = [
  {
    id: "display-mpu",
    section: "display",
    name: "Mid-page Unit (MPU)",
    dimensions: ["300x250"],
    devices: ["Desktop", "Mobile"],
    ...displayShared,
  },
  {
    id: "display-half-page",
    section: "display",
    name: "Half Page",
    dimensions: ["300x600"],
    devices: ["Mobile"],
    ...displayShared,
  },
  {
    id: "display-leaderboard",
    section: "display",
    name: "Leaderboard",
    dimensions: ["728x90", "1070x27 (LATAM)"],
    devices: ["Desktop"],
    ...displayShared,
  },
  {
    id: "display-super-leaderboard",
    section: "display",
    name: "Super Leaderboard",
    dimensions: ["970x90 (EU)"],
    devices: ["Desktop"],
    ...displayShared,
  },
  {
    id: "display-billboard",
    section: "display",
    name: "Billboard",
    dimensions: ["970x250 (EU)", "930x180 (DK)"],
    devices: ["Desktop"],
    ...displayShared,
  },
  {
    id: "display-skyscraper",
    section: "display",
    name: "Skyscraper",
    dimensions: ["160x600", "120x600"],
    devices: ["Desktop"],
    ...displayShared,
  },
  {
    id: "display-anchored-mobile-leaderboard",
    section: "display",
    name: "Anchored Mobile Leaderboard",
    dimensions: ["320x50"],
    devices: ["Mobile"],
    ...displayShared,
  },
  {
    id: "native-content-ad",
    section: "native",
    name: "Native Content Ad",
    dimensions: ["Fluid (recommended)", "300x250", "336x280"],
    devices: ["Cross Device"],
    acceptedFormats: [
      "Headline: maximum 90 characters",
      "Body text: maximum 90 characters",
      "Image: minimum 1200x627 px",
      "Logo: optional, minimum 128x128 px",
      "CTA text: maximum 15 characters",
    ],
    tracking: [
      "Destination URL (click-through URL)",
      "Optional deep-link click action URL",
      "Optional third-party impression tracker",
      "Optional third-party click tracker",
    ],
    support: { pmp: YES, pg: YES, thirdParty: NO },
    labelingRequirements:
      "Built from assets in GAM native templates and rendered dynamically to match the page layout while remaining identifiable as advertising.",
    operationalNotes: [
      "Native ads are built from assets, not standard display tags.",
      "Video is not supported in standard native formats.",
    ],
  },
  {
    id: "video-instream-skippable-onsite",
    section: "video",
    name: "In-Stream Skippable (On-site)",
    maxLength: ":15 or :30",
    skippable: true,
    playerStyle: "on-site",
    ...onSiteVideoShared,
  },
  {
    id: "video-instream-nonskippable-onsite",
    section: "video",
    name: "In-Stream Non-Skippable (On-site)",
    maxLength: ":15 or :30",
    skippable: false,
    playerStyle: "on-site",
    ...onSiteVideoShared,
  },
  {
    id: "video-instream-skippable-youtube",
    section: "video",
    name: "In-Stream Skippable (YouTube)",
    maxLength: "Up to 60s (recommended under 3 minutes)",
    skippable: true,
    playerStyle: "youtube",
    ...youtubeVideoShared,
  },
  {
    id: "video-instream-nonskippable-youtube",
    section: "video",
    name: "In-Stream Non-Skippable (YouTube)",
    maxLength: "15s global / 20s LATAM",
    skippable: false,
    playerStyle: "youtube",
    ...youtubeVideoShared,
  },
  {
    id: "high-impact-latam-takeover",
    section: "high-impact",
    name: "LATAM Takeover",
    includedUnits: ["Skin", "MPU", "Leaderboard", "Mobile Leaderboard"],
    devices: ["Cross Device"],
    support: { pmp: NO, pg: YES, thirdParty: NO },
    setupNotes: "Publisher-side setup required.",
    operationalNotes: ["Includes the Skin format."],
  },
  {
    id: "high-impact-nam-takeover",
    section: "high-impact",
    name: "NAM Takeover",
    includedUnits: ["Skin", "MPU", "Leaderboard", "Mobile Leaderboard"],
    devices: ["Cross Device"],
    support: { pmp: NO, pg: YES, thirdParty: NO },
    setupNotes: "Publisher-side setup required.",
    operationalNotes: ["Includes the Skin format."],
  },
  {
    id: "high-impact-emea-takeover",
    section: "high-impact",
    name: "EMEA Takeover",
    includedUnits: ["MPU", "Leaderboard", "Mobile Leaderboard", "Billboard"],
    devices: ["Cross Device"],
    support: { pmp: NO, pg: NO, thirdParty: NO },
    operationalNotes: ["No Skin format is included."],
  },
  {
    id: "high-impact-skin",
    section: "high-impact",
    name: "Skin",
    dimensions: ["1920x1080"],
    devices: ["Desktop"],
    acceptedFormats: ["Static image only (no animation)"],
    support: { pmp: NO, pg: YES, thirdParty: NO },
    operationalNotes: [
      "Keep logos, text and CTAs inside safe zones; treat outer areas as background only.",
      "Critical safe zone: approximately 170px horizontally from the gutter edge and the first 700px vertically.",
      "Recommended safe zone: approximately 200px horizontally and the first 800px vertically.",
      "Skin is the standard execution on supported publishers; separate rail assets are limited to select sites.",
      "The EMEA Takeover package does not include Skin.",
    ],
  },
  {
    id: "high-impact-interstitial",
    section: "high-impact",
    name: "Interstitial",
    dimensions: [
      "Mobile: 320x480 primary, 300x600",
      "Desktop: 640x480 primary, 800x600",
    ],
    devices: ["Desktop", "Mobile"],
    acceptedFormats: ["Static image"],
    support: { pmp: NO, pg: YES, thirdParty: NO },
    setupNotes: "Publisher-side setup required.",
    operationalNotes: [
      "Requires a close button.",
      "Triggered on the first user interaction.",
      "Frequency capped to 1 impression per user every 24 hours.",
    ],
  },
  {
    id: "high-impact-interscroller",
    section: "high-impact",
    name: "Interscroller",
    dimensions: ["300x600"],
    devices: ["Mobile"],
    acceptedFormats: [
      "Static image",
      "MP4 with H.264 video and AAC audio",
      "HTTPS VAST 2.0+ redirect resolving to MP4",
      "Direct HTTPS .mp4 asset URL for Ad Ops ingestion",
    ],
    fileLimits: {
      videoRecommendation: "Keep the MP4 at or below 10 MB for lightweight delivery",
      gamHostedLimit:
        "Google Ad Manager account limits may be higher; confirm the active network limit before trafficking",
    },
    support: { pmp: YES, pg: YES, thirdParty: YES },
    operationalNotes: [
      "Mobile-only format.",
      "Limited to one per page.",
      "Video delivery is limited to MP4, VAST, or a direct HTTPS .mp4 asset URL.",
      "The 10 MB recommendation is a portfolio delivery guideline, not the Google Ad Manager upload maximum.",
      "Google Ad Manager supports H.264/AAC transcoding, up to 1920 px on the longest side and at least 180 px on the shortest side.",
    ],
  },
  {
    id: "betsense-countdown",
    section: "betsense",
    name: "Countdown",
    dimensions: ["Responsive countdown widget"],
    devices: ["Cross Device"],
    acceptedFormats: [
      "High-resolution transparent PNG or SVG logo",
      "Teams and jerseys",
      "Tournament name",
      "Odds feed",
      "Tracking URLs",
    ],
    support: { pmp: YES, pg: YES, thirdParty: NO },
    setupNotes:
      "2 days with an existing template and odds; approximately 1 week for a new design adaptation; multiple weeks for fully custom development.",
    operationalNotes: [
      "Template-based implementation.",
      "Publisher-hosted creative.",
      "Betsense formats do not support third-party tags.",
    ],
  },
  {
    id: "betsense-three-way-odds",
    section: "betsense",
    name: "Three-way Odds",
    dimensions: ["Template-based format"],
    devices: ["Cross Device"],
    acceptedFormats: [
      "High-resolution transparent PNG or SVG logo",
      "Teams and jerseys",
      "Odds feed",
      "Team colors",
      "Tracking URLs",
    ],
    support: { pmp: YES, pg: YES, thirdParty: NO },
    setupNotes:
      "2 days with an existing template and odds; approximately 1 week for a new design adaptation; multiple weeks for fully custom development.",
    operationalNotes: [
      "Dynamic odds and sports data.",
      "Publisher-hosted creative.",
      "Betsense formats do not support third-party tags.",
    ],
  },
]

export const globalAdSpecs2026 = {
  metadata: {
    title: "Better Collective | Global Ad Specs",
    version: GLOBAL_AD_SPECS_VERSION,
  },
  networkFacts: [
    "Premium Sports & Esports Network",
    "70M+ unique users",
    "10B+ monthly impressions",
  ],
  buyingOptions: [
    "Direct Order",
    "Programmatic Guaranteed",
    "Private Marketplace",
    "Open Auction",
  ],
  preferredSsp: "Google Ad Exchange",
  clarifications: {
    html5:
      "The Display table accepts HTML5 as a complete ZIP package, while the FAQ describes third-party hosted HTML5 tags. Confirm the intended serving route with Ad Ops before delivery.",
  },
  globalPolicies: [
    "Inventory runs in brand-safe environments powered by first-party audience data.",
    "Contextual, geo, device and frequency-cap targeting are available subject to campaign setup.",
    "DV360 eligibility is subject to creative compliance and campaign setup.",
    "All tracking and third-party tags must be SSL-compliant (HTTPS) and are subject to approval.",
    "Blocking tags are accepted only for Programmatic Guaranteed campaigns.",
    "HTML5 creatives are accepted through third-party hosted tags only.",
    "Creatives must be submitted at least 5 business days before launch and are reviewed before going live.",
  ],
  faq: [
    { question: "Are 3rd party tracking pixels allowed?", answer: "Yes, subject to approval. All tracking must be SSL-compliant." },
    { question: "Are blocking tags allowed?", answer: "No, except for Programmatic Guaranteed campaigns." },
    { question: "Are HTML5 creatives supported?", answer: "Yes, via third-party hosted tags only." },
    { question: "What ad server is used?", answer: "Google Ad Manager (GAM). Google Campaign Manager (GCM) tags are preferred." },
    { question: "Where should creatives be sent?", answer: "To the relevant sales contact or Ad Ops team." },
    { question: "Are Programmatic Guaranteed and PMP deals supported?", answer: "Yes. Availability depends on format and setup." },
    { question: "What is the required lead time for campaign setup?", answer: "At least 5 business days before launch." },
    { question: "Are creatives subject to approval?", answer: "Yes. All creatives are reviewed before going live." },
    { question: "Are all 3rd party vendors supported?", answer: "No. All tags are subject to technical validation." },
  ],
  formats: officialAdFormats2026,
}

export const officialAdFormatById2026 = Object.fromEntries(
  officialAdFormats2026.map((format) => [format.id, format])
)

export const officialFormatAliases2026 = {
  "display-banners": officialAdFormats2026
    .filter((format) => format.section === "display")
    .map((format) => format.id),
  leaderboard: ["display-leaderboard", "display-super-leaderboard"],
  mrec: ["display-mpu"],
  halfpage: ["display-half-page"],
  "mobile-sticky": ["display-anchored-mobile-leaderboard"],
  skin: ["high-impact-skin"],
  interstitial: ["high-impact-interstitial"],
  interscroller: ["high-impact-interscroller"],
  native: ["native-content-ad"],
  "betsense-countdown": ["betsense-countdown"],
  "betsense-three-way-odds": ["betsense-three-way-odds"],
}

export function getOfficialAdSpec2026(formatId) {
  return officialAdFormatById2026[formatId] || null
}

export function getOfficialSpecsForAppFormat(formatId) {
  const ids = officialFormatAliases2026[formatId] || (officialAdFormatById2026[formatId] ? [formatId] : [])
  return ids.map(getOfficialAdSpec2026).filter(Boolean)
}

export function withGlobalAdSpecs2026(format, options = {}) {
  const officialIds = options.officialIds || officialFormatAliases2026[format.formatId] || []
  const officialSpecs = officialIds.map(getOfficialAdSpec2026).filter(Boolean)
  const canonicalSizes = [...new Set(
    officialSpecs.flatMap((spec) => spec.dimensions || spec.includedUnits || [])
  )]

  return {
    ...format,
    specs: officialSpecs.length
      ? { ...(format.specs || {}), sizes: canonicalSizes }
      : format.specs,
    specStatus: officialSpecs.length ? "official" : options.status || "custom",
    specVersion: officialSpecs.length ? GLOBAL_AD_SPECS_VERSION : null,
    officialSpecIds: officialSpecs.map((spec) => spec.id),
    officialSpecs,
  }
}

export function validateGlobalAdSpecs2026(specs = globalAdSpecs2026) {
  const errors = []
  const ids = new Set()

  if (!specs?.metadata?.version) errors.push("Document version is required.")
  if (!Array.isArray(specs?.formats) || !specs.formats.length) errors.push("At least one format is required.")

  ;(specs?.formats || []).forEach((format) => {
    if (!format.id) errors.push("Every official format requires a stable ID.")
    if (ids.has(format.id)) errors.push(`Duplicate official format ID: ${format.id}`)
    ids.add(format.id)
    if (!format.name || !format.section) errors.push(`${format.id || "Unknown format"} requires a name and section.`)
    if (!format.support || ["pmp", "pg", "thirdParty"].some((key) => typeof format.support[key] !== "boolean")) {
      errors.push(`${format.id || "Unknown format"} requires boolean support flags.`)
    }
  })

  Object.entries(officialFormatAliases2026).forEach(([alias, targets]) => {
    targets.forEach((target) => {
      if (!ids.has(target)) errors.push(`Alias ${alias} points to unknown official format ${target}.`)
    })
  })

  return errors
}

const validationErrors = validateGlobalAdSpecs2026()
if (validationErrors.length) {
  throw new Error(`Invalid Global Ad Specs 2026 data: ${validationErrors.join(" ")}`)
}
