import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import interscrollerCreative from "../../assets/interscroller.png"
import interscrollerVideo from "../../assets/video/V2_Web-Front-Page-Video_LOW-Quality.mp4"
import { resolveCreativeAsset } from "../../features/proposals/creativeResolver"
import { usePreviewCampaign } from "../../features/proposals/PreviewCampaignContext"
import { usePreviewViewport } from "./previewViewport.jsx"

const MOBILE_HEIGHT_RATIO = 0.8
const MOBILE_MIN_HEIGHT = 240

export default function InterscrollerLayer({
  slotId,
  size = "300x600",
  autoScrollIntoView = false,
  mediaType = "image",
}) {
  const { campaign } = usePreviewCampaign()
  const {
    vp,
    width: viewportWidth,
    height: viewportHeight,
    scrollElement,
  } = usePreviewViewport()
  const isMobile = vp === "mobile"
  const [w, h] = size.split("x").map(Number)
  const wrapRef = useRef(null)
  const videoRef = useRef(null)
  const [clip, setClip] = useState("inset(0px 0px 0px 0px)")
  const [show, setShow] = useState(false)
  const [leftPx, setLeftPx] = useState(0)
  const [overlayWidth, setOverlayWidth] = useState(w)
  const [mobileSlotHeight, setMobileSlotHeight] = useState(h)
  const [controlsTop, setControlsTop] = useState(12)
  const [paused, setPaused] = useState(false)
  const [muted, setMuted] = useState(true)
  const [ended, setEnded] = useState(false)

  const overlayRoot =
    typeof document !== "undefined"
      ? document.getElementById("preview-overlay-root")
      : null

  const img = useMemo(() => {
    const dynamicCreative = resolveCreativeAsset(campaign, "interscroller")
    if (dynamicCreative) return dynamicCreative
    return interscrollerCreative
  }, [campaign])

  const videoUrl = useMemo(
    () => resolveCreativeAsset(campaign, "interscroller_video", interscrollerVideo),
    [campaign]
  )

  useEffect(() => {
    if (!autoScrollIntoView) return undefined

    const el = wrapRef.current
    if (!el) return undefined

    const raf = window.requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
    })

    return () => window.cancelAnimationFrame(raf)
  }, [autoScrollIntoView, isMobile, slotId])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return undefined

    const resolvedScrollTarget =
      isMobile ? scrollElement || el.closest(".preview-scroll") || window : window

    let raf = 0

    const calc = () => {
      raf = 0

      const rect = el.getBoundingClientRect()
      const fallbackWidth = viewportWidth || (typeof window !== "undefined" ? window.innerWidth || 1 : 1)
      const fallbackHeight = viewportHeight || (typeof window !== "undefined" ? window.innerHeight || 1 : 1)

      const containerRect =
        isMobile &&
        resolvedScrollTarget &&
        resolvedScrollTarget !== window &&
        typeof resolvedScrollTarget.getBoundingClientRect === "function"
          ? resolvedScrollTarget.getBoundingClientRect()
          : null

      const desktopViewportWidth =
        typeof window !== "undefined" ? window.innerWidth || fallbackWidth : fallbackWidth
      const desktopViewportHeight =
        typeof window !== "undefined" ? window.innerHeight || fallbackHeight : fallbackHeight

      const boundsTop = isMobile ? (containerRect ? containerRect.top : 0) : 0
      const boundsLeft = isMobile ? (containerRect ? containerRect.left : 0) : 0
      const boundsRight = isMobile
        ? containerRect
          ? containerRect.right
          : fallbackWidth
        : desktopViewportWidth
      const boundsBottom = isMobile
        ? containerRect
          ? containerRect.bottom
          : fallbackHeight
        : desktopViewportHeight

      const visTop = Math.max(rect.top, boundsTop)
      const visLeft = Math.max(rect.left, boundsLeft)
      const visBottom = Math.min(rect.bottom, boundsBottom)
      const visRight = Math.min(rect.right, boundsRight)

      const fullyOut =
        visBottom - visTop <= 1 ||
        visRight - visLeft <= 1 ||
        visBottom <= boundsTop ||
        visTop >= boundsBottom ||
        visRight <= boundsLeft ||
        visLeft >= boundsRight

      setShow(!fullyOut)
      setLeftPx(containerRect ? rect.left - containerRect.left : rect.left)
      setOverlayWidth(rect.width)

      if (isMobile) {
        const baseHeight = containerRect ? containerRect.height : fallbackHeight
        const nextHeight = Math.max(
          MOBILE_MIN_HEIGHT,
          Math.round(baseHeight * MOBILE_HEIGHT_RATIO)
        )
        setMobileSlotHeight((prev) => (prev === nextHeight ? prev : nextHeight))
      }

      const topInset = Math.max(0, visTop - boundsTop)
      const leftInset = Math.max(0, visLeft - boundsLeft)
      const bottomInset = Math.max(0, boundsBottom - visBottom)
      const rightInset = Math.max(0, boundsRight - visRight)

      setClip(`inset(${topInset}px ${rightInset}px ${bottomInset}px ${leftInset}px)`)
      setControlsTop(topInset + 12)
    }

    const queueCalc = () => {
      if (raf) return
      raf = requestAnimationFrame(calc)
    }

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            queueCalc()
          })
        : null

    if (resizeObserver) resizeObserver.observe(el)

    calc()
    resolvedScrollTarget.addEventListener("scroll", queueCalc, { passive: true })
    window.addEventListener("resize", queueCalc)

    return () => {
      resolvedScrollTarget.removeEventListener("scroll", queueCalc)
      window.removeEventListener("resize", queueCalc)
      if (resizeObserver) resizeObserver.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [h, isMobile, scrollElement, viewportHeight, viewportWidth, w])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
    video.play().catch(() => {})
  }

  const replay = () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    setEnded(false)
    video.play().catch(() => {})
  }

  const overlayLayer = (
    <div
      className={isMobile && overlayRoot ? "absolute inset-0 z-[5000] pointer-events-none" : "fixed inset-0 z-[5000] pointer-events-none"}
      style={{ clipPath: clip, WebkitClipPath: clip }}
    >
      <div
        className="absolute"
        style={{ top: 0, bottom: 0, left: leftPx, width: overlayWidth }}
      >
        {mediaType === "video" ? (
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              poster={img}
              muted={muted}
              autoPlay
              loop
              playsInline
              preload="auto"
              onPlay={() => {
                setPaused(false)
                setEnded(false)
              }}
              onPause={() => setPaused(true)}
              onEnded={() => {
                setPaused(true)
                setEnded(true)
              }}
              className="h-full w-full object-cover"
            />
            <div
              className="pointer-events-auto absolute right-3 flex items-center gap-2"
              style={{ top: controlsTop }}
            >
              <button
                type="button"
                onClick={toggleMute}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/65 text-xs text-white shadow"
                aria-label={muted ? "Unmute video" : "Mute video"}
              >
                <span aria-hidden="true">{muted ? "🔇" : "🔊"}</span>
              </button>
              <button
                type="button"
                onClick={togglePlay}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/65 text-xs text-white shadow"
                aria-label={paused ? "Play video" : "Pause video"}
              >
                <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
              </button>
              {ended ? (
                <button
                  type="button"
                  onClick={replay}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black/65 text-xs text-white shadow"
                  aria-label="Replay video"
                >
                  <span aria-hidden="true">↻</span>
                </button>
              ) : null}
            </div>
          </>
        ) : (
          <img
            src={img}
            alt="Interscroller creative"
            draggable="false"
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  )

  return (
    <>
      <div className="w-full flex justify-center">
        <div
          ref={wrapRef}
          className="relative overflow-hidden"
          style={{
            width: isMobile ? "100%" : w,
            height: isMobile ? mobileSlotHeight : h,
            borderRadius: 10,
          }}
        />
      </div>

      {show
        ? isMobile && overlayRoot
          ? createPortal(overlayLayer, overlayRoot)
          : overlayLayer
        : null}
    </>
  )
}
