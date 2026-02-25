export default function AdSlot({ slotId, renderAd, children }) {
  const content = typeof renderAd === "function" ? renderAd(slotId) ?? children : children

  return (
    <div data-slotid={slotId} className="contents">
      {content}
    </div>
  )
}
