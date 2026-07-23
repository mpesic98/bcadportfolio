import { useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"

function positionPopover(anchor) {
  if (!anchor || typeof window === "undefined") return null

  const rect = anchor.getBoundingClientRect()
  const width = Math.min(320, window.innerWidth - 24)
  const estimatedHeight = 300
  const gap = 10
  const left = Math.min(
    Math.max(12, rect.left + rect.width / 2 - width / 2),
    window.innerWidth - width - 12
  )
  const fitsBelow = rect.bottom + gap + estimatedHeight <= window.innerHeight

  return {
    left,
    top: fitsBelow
      ? Math.max(12, rect.bottom + gap)
      : Math.max(12, rect.top - estimatedHeight - gap),
    width,
  }
}

export default function CreativeSpecsPopover({
  children,
  title,
  size,
  device,
  rows = [],
  note,
}) {
  const anchorRef = useRef(null)
  const hoverTimerRef = useRef(null)
  const popoverId = useId()
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [position, setPosition] = useState(null)
  const open = hovered || focused

  const keepHovered = () => {
    if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current)
    setHovered(true)
  }

  const releaseHovered = () => {
    if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current)
    hoverTimerRef.current = window.setTimeout(() => setHovered(false), 120)
  }

  useEffect(() => () => {
    if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current)
  }, [])

  useEffect(() => {
    if (!open) return undefined

    const updatePosition = () => {
      setPosition(positionPopover(anchorRef.current))
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition, true)

    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition, true)
    }
  }, [open])

  const panel = open && position ? (
    <section
      id={popoverId}
      role="tooltip"
      aria-label={`${title} specifications`}
      className="bc-scrollbar fixed z-[6100] max-h-[min(420px,calc(100dvh-24px))] overflow-y-auto rounded-2xl border border-white/16 bg-[rgba(8,29,25,0.97)] p-4 text-left text-white shadow-[0_22px_70px_rgba(0,0,0,0.48)] backdrop-blur-xl"
      style={position}
      onMouseEnter={keepHovered}
      onMouseLeave={releaseHovered}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <span className="shrink-0 text-sm font-semibold text-white/82">{size}</span>
      </div>

      <div className="mt-2 flex items-center gap-2 text-[11px] font-medium text-white/52">
        {device.toLowerCase().includes("mobile") ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <rect x="7.5" y="2.5" width="9" height="19" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <path d="M10.5 5h3M11 18.5h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <rect x="3" y="4" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        )}
        <span>{device}</span>
      </div>

      <dl className="mt-4 grid gap-3">
        {rows.filter((row) => row.value).map((row) => (
          <div key={row.label} className="border-t border-white/9 pt-3 first:border-0 first:pt-0">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
              {row.label}
            </dt>
            {Array.isArray(row.value) ? (
              <dd className="mt-1.5">
                <ul className="space-y-1 text-xs leading-5 text-white/72">
                  {row.value.map((value) => <li key={value}>• {value}</li>)}
                </ul>
              </dd>
            ) : (
              <dd className="mt-1 text-xs leading-5 text-white/72">{row.value}</dd>
            )}
          </div>
        ))}
      </dl>

      {note ? (
        <p className="mt-3 border-t border-white/9 pt-3 text-[10px] leading-4 text-white/46">
          {note}
        </p>
      ) : null}
    </section>
  ) : null

  return (
    <>
      <div
        ref={anchorRef}
        tabIndex={0}
        aria-describedby={open ? popoverId : undefined}
        className="relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2"
        onMouseEnter={keepHovered}
        onMouseLeave={releaseHovered}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {children}
      </div>
      {typeof document !== "undefined" && panel
        ? createPortal(panel, document.body)
        : panel}
    </>
  )
}
