import { useEffect } from "react"
import { createPortal } from "react-dom"

export default function InterstitialLayer({
  isOpen,
  onClose,
  clickUrl,
  sideLabel,
  creative,
}) {
  const overlayRoot =
    typeof document !== "undefined"
      ? document.getElementById("preview-overlay-root")
      : null

  useEffect(() => {
    if (!overlayRoot) return
    if (!isOpen) return

    const prev = overlayRoot.style.pointerEvents
    overlayRoot.style.pointerEvents = "auto"

    return () => {
      overlayRoot.style.pointerEvents = prev || "none"
    }
  }, [overlayRoot, isOpen])

  if (!isOpen) return null

  const layer = (
    <div className="absolute inset-0 z-[3200]">
      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-white text-neutral-900 border border-neutral-200 shadow flex items-center justify-center"
            aria-label="Close"
          >
            ✕
          </button>

          {clickUrl ? (
            <a href={clickUrl} target="_blank" rel="noreferrer">
              {creative}
            </a>
          ) : (
            creative
          )}
        </div>

        {sideLabel ? (
          <div className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="text-xs font-semibold text-white/90 tracking-wide">
              {sideLabel}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )

  if (overlayRoot) return createPortal(layer, overlayRoot)

  return createPortal(<div className="fixed inset-0 z-[3200]">{layer}</div>, document.body)
}
