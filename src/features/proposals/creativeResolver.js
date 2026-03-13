export const slotCreativeKeyMap = {
  rail_left_160x600: "skin_left",
  rail_right_160x600: "skin_right",
  top_1070x27: "leaderboard",
  sidebar_300x250_1: "mrec",
  sidebar_300x250_2: "mrec",
  inline_300x600: "halfpage",
  inline_300x250_1: "mrec",
  inline_300x250_3: "mrec",
  mobile_inline_300x600: "halfpage",
  mobile_inline_300x250_1: "mrec",
  mobile_inline_300x250_2: "mrec",
  mobile_inline_300x250_3: "mrec",
  mobile_sticky_320x50: "mobile_sticky",
}

export function resolveCreativeAsset(campaign, creativeKey, fallback = "") {
  if (!creativeKey) return fallback
  return campaign?.creatives?.[creativeKey] || fallback
}

export function resolveCreativeForSlot(campaign, slotId, fallback = "") {
  const creativeKey = slotCreativeKeyMap[slotId]
  return resolveCreativeAsset(campaign, creativeKey, fallback)
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
