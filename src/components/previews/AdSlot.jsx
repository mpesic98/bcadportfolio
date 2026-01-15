export default function AdSlot({ slotId, renderAd, children }) {
  if (typeof renderAd === "function") return renderAd(slotId) ?? children
  return children
}
