import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

const AUTO_CLOSE_SECONDS = 15

export default function InterstitialLayer({
  isOpen,
  onClose,
  clickUrl,
  sideLabel,
  creative,
}) {
  const ringRef = useRef(null)
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

  useEffect(() => {
    if (!isOpen) return

    const timer = window.setTimeout(() => {
      onClose?.()
    }, AUTO_CLOSE_SECONDS * 1000)

    const ring = ringRef.current
    if (ring) {
      const radius = 20.5
      const circumference = 2 * Math.PI * radius
      ring.style.strokeDasharray = String(circumference)
      ring.style.strokeDashoffset = "0"
      ring.style.transition = "none"
      ring.getBoundingClientRect()
      requestAnimationFrame(() => {
        ring.style.transition = `stroke-dashoffset ${AUTO_CLOSE_SECONDS}s linear`
        ring.style.strokeDashoffset = String(circumference)
      })
    }

    return () => {
      window.clearTimeout(timer)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.()
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const layer = (
    <div className="absolute inset-0 z-[3200]">
      <button
        type="button"
        aria-label="Close interstitial by background click"
        onClick={onClose}
        className="absolute inset-0 bg-black/35"
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative pointer-events-auto">
          <button
            type="button"
            onClick={onClose}
            className="absolute"
            style={{
              top: "-65px",
              right: "-30px",
              width: "45px",
              height: "45px",
              borderRadius: "999px",
              border: 0,
              background: "rgba(0,0,0,.78)",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "8px 0 6px",
            }}
            aria-label="Close"
          >
            <svg
              width="45"
              height="45"
              viewBox="0 0 45 45"
              style={{
                position: "absolute",
                inset: 0,
                transform: "rotate(-90deg)",
                pointerEvents: "none",
              }}
            >
              <circle
                cx="22.5"
                cy="22.5"
                r="20.5"
                stroke="rgba(255,255,255,.28)"
                strokeWidth="2"
                fill="none"
              />
              <circle
                ref={ringRef}
                cx="22.5"
                cy="22.5"
                r="20.5"
                stroke="#fff"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "25px",
                height: "25px",
                font: "300 20px/1 system-ui",
                transform: "translateY(3px)",
              }}
            >
              X
            </span>
            <span
              style={{
                position: "relative",
                zIndex: 1,
                marginTop: "17px",
                font: "400 12px/1 system-ui",
                letterSpacing: ".6px",
                textTransform: "uppercase",
                opacity: 0.9,
              }}
            >
              CERRAR
            </span>
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
