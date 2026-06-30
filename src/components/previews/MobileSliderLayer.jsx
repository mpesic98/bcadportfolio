import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import fallbackCreative from "../../assets/display_300x250.png"
import { resolveCreativeAsset } from "../../features/proposals/creativeResolver"
import { usePreviewCampaign } from "../../features/proposals/PreviewCampaignContext"

const PANEL_WIDTH = 300
const PANEL_HEIGHT = 250
const HANDLE_WIDTH = 40
const HANDLE_HEIGHT = 300
const CLOSED_OFFSET = PANEL_WIDTH + HANDLE_WIDTH

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

export default function MobileSliderLayer() {
  const { campaign } = usePreviewCampaign()
  const [portalRoot, setPortalRoot] = useState(null)
  const [offset, setOffset] = useState(CLOSED_OFFSET)
  const [isOpen, setIsOpen] = useState(false)
  const [dragging, setDragging] = useState(false)
  const draggingRef = useRef(false)
  const dragRef = useRef({ startX: 0, startOffset: CLOSED_OFFSET, moved: false })
  const suppressClickRef = useRef(false)

  const imageUrl = resolveCreativeAsset(campaign, "mobile_slider", fallbackCreative)
  const clickUrl = campaign?.landingPageUrl || ""

  useEffect(() => {
    setPortalRoot(document.getElementById("preview-overlay-root"))
  }, [])

  const setOpen = (nextOpen) => {
    setIsOpen(nextOpen)
    setOffset(nextOpen ? 0 : CLOSED_OFFSET)
  }

  const onPointerDown = (event) => {
    dragRef.current = {
      startX: event.clientX,
      startOffset: offset,
      moved: false,
    }
    draggingRef.current = true
    setDragging(true)
    event.currentTarget.setPointerCapture?.(event.pointerId)
    event.preventDefault()
    event.stopPropagation()
  }

  const onPointerMove = (event) => {
    if (!draggingRef.current) return
    const dx = event.clientX - dragRef.current.startX
    if (Math.abs(dx) > 5) dragRef.current.moved = true
    const nextOffset = clamp(dragRef.current.startOffset + dx, 0, CLOSED_OFFSET)
    dragRef.current.currentOffset = nextOffset
    setOffset(nextOffset)
    event.preventDefault()
    event.stopPropagation()
  }

  const onPointerUp = (event) => {
    if (!draggingRef.current) return
    draggingRef.current = false
    setDragging(false)

    if (dragRef.current.moved) {
      const nextOpen = (dragRef.current.currentOffset ?? offset) < CLOSED_OFFSET / 2
      setOpen(nextOpen)
      suppressClickRef.current = true
      window.setTimeout(() => {
        suppressClickRef.current = false
      }, 250)
    }

    event.currentTarget.releasePointerCapture?.(event.pointerId)
    event.preventDefault()
    event.stopPropagation()
  }

  const onHandleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (suppressClickRef.current || dragRef.current.moved) return
    setOpen(!isOpen)
  }

  if (!portalRoot) return null

  return createPortal(
    <div
      className="pointer-events-none absolute right-0 top-1/2 z-[5200] -translate-y-1/2 overflow-visible font-sans"
      style={{ width: PANEL_WIDTH + HANDLE_WIDTH, height: HANDLE_HEIGHT }}
    >
      <a
        href={clickUrl || undefined}
        onClick={(event) => {
          if (!clickUrl) event.preventDefault()
        }}
        target={clickUrl ? "_blank" : undefined}
        rel={clickUrl ? "noopener noreferrer" : undefined}
        aria-label="Open advertiser landing page"
        className="pointer-events-auto absolute block overflow-hidden bg-neutral-200 shadow-[0_4px_18px_rgba(0,0,0,0.28)]"
        style={{
          top: (HANDLE_HEIGHT - PANEL_HEIGHT) / 2,
          right: HANDLE_WIDTH,
          width: PANEL_WIDTH,
          height: PANEL_HEIGHT,
          pointerEvents: isOpen ? "auto" : "none",
          transform: `translateX(${offset}px)`,
          transition: dragging ? "none" : "transform 220ms ease",
        }}
      >
        <img
          src={imageUrl}
          alt="Mobile slider advertisement"
          draggable="false"
          className="h-full w-full object-cover"
        />
      </a>

      <button
        type="button"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={onHandleClick}
        aria-label={isOpen ? "Close advertisement" : "Open advertisement"}
        aria-expanded={isOpen}
        className="pointer-events-auto absolute right-0 top-0 flex touch-none select-none flex-col items-center justify-center border-0 bg-black/85 text-white shadow-[0_4px_18px_rgba(0,0,0,0.28)]"
        style={{ width: HANDLE_WIDTH, height: HANDLE_HEIGHT }}
      >
        <span className="mb-2 text-2xl leading-none" aria-hidden="true">
          {isOpen ? "›" : "‹"}
        </span>
        <span className="text-[10px] tracking-[0.16em] [writing-mode:vertical-rl]">AD</span>
      </button>
    </div>,
    portalRoot
  )
}
