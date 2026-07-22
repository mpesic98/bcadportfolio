export const slotCreativeKeyMap = {
  rail_left_160x600: ["display_rail_left", "skin_left"],
  rail_right_160x600: ["display_rail_right", "skin_right"],
  top_1070x27: ["display_top", "leaderboard"],
  sidebar_300x250_1: ["display_sidebar", "mrec"],
  sidebar_300x250_2: ["display_sidebar", "mrec"],
  inline_300x600: ["halfpage"],
  inline_300x250_1: ["display_sidebar", "mrec"],
  inline_300x250_3: ["display_sidebar", "mrec"],
  mobile_inline_300x600: ["halfpage"],
  mobile_inline_300x250_1: ["display_sidebar", "mrec"],
  mobile_inline_300x250_2: ["display_sidebar", "mrec"],
  mobile_inline_300x250_3: ["display_sidebar", "mrec"],
  mobile_sticky_320x50: ["mobile_sticky"],
}

export function resolveCreativeAsset(campaign, creativeKey, fallback = "") {
  if (!creativeKey) return fallback
  return campaign?.creatives?.[creativeKey] || fallback
}

export function resolveCreativeForSlot(campaign, slotId, fallback = "") {
  const creativeKeys = slotCreativeKeyMap[slotId] || []
  for (const creativeKey of creativeKeys) {
    const asset = resolveCreativeAsset(campaign, creativeKey)
    if (asset) return asset
  }
  return fallback
}

export function resolveFormatPreviewAsset(format, campaign) {
  if (!format) return ""

  const primaryAsset = resolveCreativeAsset(campaign, format.primaryCreativeKey)
  if (primaryAsset) return primaryAsset

  for (const creativeKey of format.creativeKeys || []) {
    const asset = resolveCreativeAsset(campaign, creativeKey)
    if (asset) return asset
  }

  return format.fallbackImage || ""
}

export function assetLooksLikeVideo(assetUrl = "") {
  if (!assetUrl) return false
  if (assetUrl.startsWith("data:video/")) return true
  return /\.(mp4|webm|ogg|mov)(\?|#|$)/i.test(assetUrl)
}
