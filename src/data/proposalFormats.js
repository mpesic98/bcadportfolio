import { nonEndemicById } from "./nonEndemicCatalog"

export const proposalSiteCatalog = [
  { id: "bolavip", name: "Bolavip" },
  { id: "redgol", name: "Redgol" },
  { id: "somosfanaticos", name: "Somos Fanaticos" },
  { id: "sporting-news", name: "The Sporting News" },
  { id: "givemesport", name: "GiveMeSport" },
  { id: "world-soccer-talk", name: "World Soccer Talk" },
]

export const proposalSiteById = proposalSiteCatalog.reduce((acc, site) => {
  acc[site.id] = site
  return acc
}, {})

export const proposalCategoryCatalog = [
  { id: "display", label: "Display" },
  { id: "high-impact", label: "High-Impact" },
  { id: "video", label: "Video" },
  { id: "interactive", label: "Interactive" },
  { id: "performance", label: "Performance" },
  { id: "branded-content", label: "Branded Content" },
]

export const proposalCategoryById = proposalCategoryCatalog.reduce((acc, category) => {
  acc[category.id] = category
  return acc
}, {})

export const proposalStatusCatalog = [
  { id: "active", label: "Active" },
  { id: "draft", label: "Draft" },
  { id: "expired", label: "Expired" },
]

function createFormatDefinition({
  id,
  name,
  catalogFormatId,
  previewRoute,
  mockupId,
  category,
  supportedSites,
  creativeKeys,
  primaryCreativeKey,
  sizes,
  creativeTypes,
  description,
  creativeGuidelines,
}) {
  const sourceFormat = nonEndemicById[catalogFormatId]

  return {
    id,
    name,
    catalogFormatId,
    previewRoute,
    category,
    categoryLabel: proposalCategoryById[category]?.label || category,
    supportedSites,
    creativeKeys,
    primaryCreativeKey,
    sizes,
    creativeTypes,
    description: description || sourceFormat?.specs?.description || "Format details available.",
    creativeGuidelines: creativeGuidelines || [
      `Deliver artwork sized for ${sizes.join(" / ")}.`,
      `Accepted assets: ${creativeTypes.join(", ")}.`,
      `Keep brand marks and critical copy inside safe areas with strong contrast against the placement.`,
    ],
    sourceFormat,
    fallbackImage: sourceFormat?.cardImage || sourceFormat?.hoverImage || "",
    mockupUrl: `/mockups/formats/${mockupId || id}.svg`,
  }
}

export const proposalFormatCatalog = [
  createFormatDefinition({
    id: "leaderboard",
    name: "Leaderboard",
    catalogFormatId: "display-banners",
    previewRoute: { region: "usa", segment: "non-endemic", formatId: "display-banners" },
    category: "display",
    supportedSites: ["bolavip", "redgol", "sporting-news", "givemesport"],
    creativeKeys: ["leaderboard"],
    primaryCreativeKey: "leaderboard",
    sizes: ["970x90", "728x90"],
    creativeTypes: ["JPG", "PNG", "GIF", "3rd-party tag"],
    description:
      "Premium horizontal display unit built for homepage headers, article takeovers and broad-reach bursts.",
  }),
  createFormatDefinition({
    id: "mrec",
    name: "Medium Rectangle",
    catalogFormatId: "display-banners",
    previewRoute: { region: "usa", segment: "non-endemic", formatId: "display-banners" },
    category: "display",
    supportedSites: ["bolavip", "redgol", "somosfanaticos", "sporting-news", "givemesport"],
    creativeKeys: ["mrec"],
    primaryCreativeKey: "mrec",
    sizes: ["300x250"],
    creativeTypes: ["JPG", "PNG", "GIF", "3rd-party tag"],
    description:
      "Workhorse display placement suited to article pages, recirculation modules and scalable flighting plans.",
  }),
  createFormatDefinition({
    id: "halfpage",
    name: "Half Page",
    catalogFormatId: "display-banners",
    previewRoute: { region: "usa", segment: "non-endemic", formatId: "display-banners" },
    category: "high-impact",
    supportedSites: ["bolavip", "redgol", "givemesport"],
    creativeKeys: ["halfpage"],
    primaryCreativeKey: "halfpage",
    sizes: ["300x600"],
    creativeTypes: ["JPG", "PNG", "GIF"],
    description:
      "Tall-format display inventory for richer storytelling and stronger visual dominance on article pages.",
  }),
  createFormatDefinition({
    id: "mobile-sticky",
    name: "Mobile Sticky",
    catalogFormatId: "display-banners",
    previewRoute: { region: "usa", segment: "non-endemic", formatId: "display-banners" },
    category: "display",
    supportedSites: ["bolavip", "redgol", "somosfanaticos", "world-soccer-talk"],
    creativeKeys: ["mobile_sticky"],
    primaryCreativeKey: "mobile_sticky",
    sizes: ["320x50"],
    creativeTypes: ["JPG", "PNG", "GIF", "3rd-party tag"],
    description:
      "Always-on mobile footer unit designed for frequency, lightweight loads and high in-view time.",
  }),
  createFormatDefinition({
    id: "skin",
    name: "Skin",
    catalogFormatId: "skin",
    previewRoute: { region: "usa", segment: "non-endemic", formatId: "skin" },
    category: "high-impact",
    supportedSites: ["bolavip", "redgol", "sporting-news", "givemesport"],
    creativeKeys: ["skin_left", "skin_right", "skin_background"],
    primaryCreativeKey: "skin_background",
    sizes: ["160x900 rails", "Full-width background"],
    creativeTypes: ["JPG", "PNG"],
    description:
      "Full-page takeover treatment pairing branded rails or backgrounds with premium editorial content.",
  }),
  createFormatDefinition({
    id: "interscroller",
    name: "Interscroller",
    catalogFormatId: "interscroller",
    previewRoute: { region: "usa", segment: "non-endemic", formatId: "interscroller" },
    category: "high-impact",
    supportedSites: ["bolavip", "redgol", "somosfanaticos"],
    creativeKeys: ["interscroller"],
    primaryCreativeKey: "interscroller",
    sizes: ["300x600", "300x250 reveal"],
    creativeTypes: ["JPG", "PNG"],
    description:
      "Scroll-reactive reveal unit built to turn in-view time into a branded storytelling sequence.",
  }),
  createFormatDefinition({
    id: "interstitial",
    name: "Interstitial",
    catalogFormatId: "interstitial",
    previewRoute: { region: "usa", segment: "non-endemic", formatId: "interstitial" },
    category: "high-impact",
    supportedSites: ["bolavip", "redgol", "world-soccer-talk"],
    creativeKeys: ["interstitial"],
    primaryCreativeKey: "interstitial",
    sizes: ["320x480", "300x600"],
    creativeTypes: ["JPG", "PNG", "HTML5"],
    description:
      "High-attention overlay triggered on user interaction for launch moments, offers and major tentpoles.",
  }),
  createFormatDefinition({
    id: "video-banner",
    name: "Video Banner",
    catalogFormatId: "video-banners",
    previewRoute: { region: "usa", segment: "non-endemic", formatId: "video-banners" },
    category: "video",
    supportedSites: ["bolavip", "sporting-news", "givemesport"],
    creativeKeys: ["video_banner"],
    primaryCreativeKey: "video_banner",
    sizes: ["300x250", "300x600"],
    creativeTypes: ["MP4", "WEBM", "JPG/PNG poster"],
    description:
      "Autoplay-capable video banner placements that preserve a compact footprint while adding motion.",
  }),
  createFormatDefinition({
    id: "pre-roll-video",
    name: "Pre-Roll Video",
    catalogFormatId: "pre-roll-video",
    previewRoute: { region: "usa", segment: "non-endemic", formatId: "pre-roll-video" },
    category: "video",
    supportedSites: ["bolavip", "sporting-news", "givemesport"],
    creativeKeys: ["pre_roll"],
    primaryCreativeKey: "pre_roll",
    sizes: ["16:9", "1:1"],
    creativeTypes: ["MP4", "WEBM", "JPG/PNG poster"],
    description:
      "Player-led video inventory with countdown, CTA support and mobile sticky continuation for sustained view time.",
  }),
  createFormatDefinition({
    id: "native",
    name: "Native",
    catalogFormatId: "native",
    previewRoute: { region: "usa", segment: "non-endemic", formatId: "native" },
    category: "branded-content",
    supportedSites: ["bolavip", "givemesport", "sporting-news"],
    creativeKeys: ["native"],
    primaryCreativeKey: "native",
    sizes: ["Responsive feed card"],
    creativeTypes: ["JPG", "PNG", "Headline + CTA"],
    description:
      "Editorial-adjacent feed unit that matches surrounding content hierarchy while keeping sponsorship visible.",
  }),
  createFormatDefinition({
    id: "cube",
    name: "Cube",
    catalogFormatId: "cube",
    previewRoute: { region: "usa", segment: "non-endemic", formatId: "cube" },
    category: "interactive",
    supportedSites: ["redgol", "givemesport", "sporting-news"],
    creativeKeys: ["cube"],
    primaryCreativeKey: "cube",
    sizes: ["Interactive module", "300x300"],
    creativeTypes: ["JPG", "PNG", "HTML5"],
    description:
      "Interactive canvas for richer product storytelling, rotation states and higher-touch branded moments.",
  }),
  createFormatDefinition({
    id: "countdown-widget",
    name: "Countdown Widget",
    catalogFormatId: "countdown-widget",
    previewRoute: { region: "usa", segment: "non-endemic", formatId: "countdown-widget" },
    category: "interactive",
    supportedSites: ["bolavip", "redgol", "sporting-news"],
    creativeKeys: ["countdown_widget"],
    primaryCreativeKey: "countdown_widget",
    sizes: ["Responsive widget"],
    creativeTypes: ["JPG", "PNG", "Dynamic copy"],
    description:
      "Urgency-led module for launches, tournament windows and countdown-driven calls to action.",
  }),
  createFormatDefinition({
    id: "livescore",
    name: "Livescore Widget",
    catalogFormatId: "livescore",
    previewRoute: { region: "usa", segment: "non-endemic", formatId: "livescore" },
    category: "interactive",
    supportedSites: ["bolavip", "redgol", "world-soccer-talk"],
    creativeKeys: ["livescore"],
    primaryCreativeKey: "livescore",
    sizes: ["Responsive widget"],
    creativeTypes: ["JPG", "PNG", "Dynamic copy"],
    description:
      "Contextual live-match module pairing editorial attention with sponsorship around key match moments.",
  }),
  createFormatDefinition({
    id: "leadgen",
    name: "Leadgen",
    catalogFormatId: "leadgen",
    previewRoute: { region: "usa", segment: "non-endemic", formatId: "leadgen" },
    category: "performance",
    supportedSites: ["bolavip", "givemesport", "sporting-news"],
    creativeKeys: ["leadgen"],
    primaryCreativeKey: "leadgen",
    sizes: ["Responsive form module"],
    creativeTypes: ["JPG", "PNG", "Headline + form copy"],
    description:
      "Conversion-oriented unit designed around sign-up, registration and qualified lead capture flows.",
  }),
  createFormatDefinition({
    id: "content-widget",
    name: "Content Widget",
    catalogFormatId: "content-widget",
    previewRoute: { region: "usa", segment: "non-endemic", formatId: "content-widget" },
    category: "branded-content",
    supportedSites: ["bolavip", "givemesport", "sporting-news"],
    creativeKeys: ["content_widget"],
    primaryCreativeKey: "content_widget",
    sizes: ["Responsive recommendation block"],
    creativeTypes: ["JPG", "PNG", "Headline + CTA"],
    description:
      "Flexible editorial module for recommendations, sponsor-owned storytelling and recirculation slots.",
  }),
]

export const proposalFormatById = proposalFormatCatalog.reduce((acc, format) => {
  acc[format.id] = format
  return acc
}, {})

export function getProposalFormatById(formatId) {
  return proposalFormatById[formatId] || null
}

export function resolveVisibleProposalFormats(proposal) {
  const visibleCategories = new Set(proposal?.visibleCategories || [])

  return (proposal?.visibleFormats || [])
    .map((formatId) => proposalFormatById[formatId])
    .filter(Boolean)
    .filter((format) => !visibleCategories.size || visibleCategories.has(format.category))
}

export function resolveSitesForFormat(format, visibleSiteIds = []) {
  const allowedSites = new Set(visibleSiteIds)

  return (format?.supportedSites || [])
    .filter((siteId) => !allowedSites.size || allowedSites.has(siteId))
    .map((siteId) => proposalSiteById[siteId])
    .filter(Boolean)
}
