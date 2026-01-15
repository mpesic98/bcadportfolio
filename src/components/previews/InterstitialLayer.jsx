import { useEffect } from "react"

export default function InterstitialLayer({
  isOpen,
  onClose,
  clickUrl,
  sideLabel = "Interstitial",
  creative,
}) {
  useEffect(() => {
    if (!isOpen) return

    const onKey = (e) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const Tag = clickUrl ? "a" : "div"
  const linkProps = clickUrl
    ? { href: clickUrl, target: "_blank", rel: "noreferrer" }
    : {}

  return (
    <div className="fixed inset-0 z-[2000] pointer-events-none">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end pointer-events-none">
            <div className="text-xs font-semibold text-white/85 tracking-wide">
              {sideLabel}
            </div>
            <div className="mt-1 text-[11px] text-white/60">
              Scroll enabled · ESC / X to close
            </div>
          </div>

          <div className="relative pointer-events-auto">
            <button
              onClick={onClose}
              className="absolute -top-3 -right-3 h-9 w-9 rounded-full bg-neutral-900 text-white text-lg leading-none flex items-center justify-center hover:bg-neutral-700 z-10"
              aria-label="Close interstitial"
            >
              ×
            </button>

            <Tag {...linkProps} className="block">
              {creative}
            </Tag>
          </div>
        </div>
      </div>
    </div>
  )
}
