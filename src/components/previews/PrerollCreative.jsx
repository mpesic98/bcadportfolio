import { useEffect, useMemo, useRef, useState } from "react"
import {
  assetLooksLikeVideo,
  resolveCreativeAsset,
} from "../../features/proposals/creativeResolver"
import { usePreviewCampaign } from "../../features/proposals/PreviewCampaignContext"

function VideoPane({
  source,
  isVideo,
  muted,
  onToggleMute,
  onVideoError,
  countdownLabel,
  ctaLabel,
  ctaUrl,
  showClose,
  onClose,
  className = "",
  style,
}) {
  return (
    <div className={["relative overflow-hidden bg-black", className].join(" ")} style={style}>
      {isVideo ? (
        <video
          src={source}
          autoPlay
          muted={muted}
          playsInline
          loop
          preload="metadata"
          onError={onVideoError}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <img src={source} alt="" className="absolute inset-0 h-full w-full object-cover" />
      )}

      <div className="absolute left-2 top-2 rounded bg-black/70 px-2 py-1 text-[11px] font-medium text-yellow-300">
        {countdownLabel}
      </div>

      {isVideo ? (
        <button
          type="button"
          onClick={onToggleMute}
          className="absolute right-2 top-2 rounded bg-black/70 px-2 py-1 text-[11px] text-white"
          aria-label="Toggle video sound"
        >
          {muted ? "Muted" : "Sound on"}
        </button>
      ) : (
        <div className="absolute right-2 top-2 rounded bg-black/70 px-2 py-1 text-[11px] text-white">
          Poster
        </div>
      )}

      {showClose ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sticky player"
          className="absolute right-2 top-10 rounded bg-black/75 px-2 py-1 text-[11px] text-white"
        >
          X
        </button>
      ) : null}

      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
        <a
          href={ctaUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded bg-white px-2 py-1 text-[11px] font-medium text-black"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  )
}

export default function PrerollCreative({
  mode = "standard",
  size = "300x250",
  videoUrl = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  fallbackVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  countdownSeconds = 11,
  ctaLabel = "Visit Partner",
  ctaUrl = "https://example.com",
  containerWidth = 730,
  containerHeight = 330,
  videoWidth = 546,
  sidebarWidth = 184,
  stickyWidth = 400,
  stickyHeight = 225,
  autoScrollIntoView = false,
}) {
  const { campaign } = usePreviewCampaign()
  const containerRef = useRef(null)
  const scrollAnchorRef = useRef(null)
  const hasEnteredViewportRef = useRef(false)
  const [isSticky, setIsSticky] = useState(false)
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false)
  const [stickyClosed, setStickyClosed] = useState(false)
  const [muted, setMuted] = useState(true)
  const [sourceIndex, setSourceIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(countdownSeconds)

  const campaignSource = resolveCreativeAsset(campaign, "pre_roll", videoUrl)
  const sources = useMemo(
    () => [campaignSource, fallbackVideoUrl].filter(Boolean),
    [campaignSource, fallbackVideoUrl]
  )
  const activeSource = sources[Math.min(sourceIndex, sources.length - 1)]
  const isVideoSource = assetLooksLikeVideo(activeSource)
  const [standardW, standardH] = size.split("x").map(Number)

  // Stickiness depends only on viewport visibility of the original player block.
  useEffect(() => {
    if (mode !== "primis") return undefined
    const target = containerRef.current
    if (!target) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasEnteredViewportRef.current) {
            hasEnteredViewportRef.current = true
            setHasEnteredViewport(true)
          }
          setIsSticky(false)
          return
        }

        setIsSticky(hasEnteredViewportRef.current)
      },
      { threshold: 0 }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [mode])

  useEffect(() => {
    if (!isSticky) setStickyClosed(false)
  }, [isSticky])

  useEffect(() => {
    setSecondsLeft(countdownSeconds)
  }, [countdownSeconds, activeSource])

  useEffect(() => {
    if (secondsLeft <= 0) return undefined

    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [secondsLeft])

  useEffect(() => {
    if (!autoScrollIntoView) return undefined

    const target = containerRef.current || scrollAnchorRef.current
    if (!target) return undefined

    const raf = window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
    })

    return () => window.cancelAnimationFrame(raf)
  }, [autoScrollIntoView, mode])

  const handleVideoError = () => {
    setSourceIndex((prev) => Math.min(prev + 1, sources.length - 1))
  }

  const countdownLabel = secondsLeft > 0 ? `Ad: (0:${String(secondsLeft).padStart(2, "0")})` : "Ad ready"

  if (mode === "mobile-inline") {
    return (
      <div ref={scrollAnchorRef} className="w-full">
        <VideoPane
          source={activeSource}
          isVideo={isVideoSource}
          muted={muted}
          onToggleMute={() => setMuted((prev) => !prev)}
          onVideoError={handleVideoError}
          countdownLabel={countdownLabel}
          ctaLabel={ctaLabel}
          ctaUrl={ctaUrl}
          className="rounded"
          style={{ width: "100%", aspectRatio: "16 / 9" }}
        />
      </div>
    )
  }

  if (mode !== "primis") {
    return (
      <div ref={scrollAnchorRef} className="w-full flex justify-center">
        <VideoPane
          source={activeSource}
          isVideo={isVideoSource}
          muted={muted}
          onToggleMute={() => setMuted((prev) => !prev)}
          onVideoError={handleVideoError}
          countdownLabel={countdownLabel}
          ctaLabel={ctaLabel}
          ctaUrl={ctaUrl}
          className="rounded"
          style={{ width: standardW || 300, height: standardH || 250 }}
        />
      </div>
    )
  }

  const resolvedSidebarWidth = Math.max(0, Math.min(sidebarWidth, containerWidth))
  const resolvedVideoWidth = Math.max(0, containerWidth - resolvedSidebarWidth)
  const appliedVideoWidth = Math.min(videoWidth, resolvedVideoWidth)
  const finalVideoWidth = appliedVideoWidth === resolvedVideoWidth ? appliedVideoWidth : resolvedVideoWidth

  return (
    <>
      <div
        ref={containerRef}
        className="relative mx-auto overflow-hidden rounded border border-neutral-300 bg-black"
        style={{ width: containerWidth, height: containerHeight }}
      >
        <div
          className="grid h-full w-full"
          style={{ gridTemplateColumns: `${finalVideoWidth}px ${resolvedSidebarWidth}px` }}
        >
          <VideoPane
            source={activeSource}
            isVideo={isVideoSource}
            muted={muted}
            onToggleMute={() => setMuted((prev) => !prev)}
            onVideoError={handleVideoError}
            countdownLabel={countdownLabel}
            ctaLabel={ctaLabel}
            ctaUrl={ctaUrl}
          />

          <div className="h-full border-l border-white/10 bg-neutral-300">
            <div className="h-full overflow-hidden">
              <div className="h-[110px] border-b border-white/25 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=500&q=60')] bg-cover bg-center opacity-90" />
              <div className="h-[110px] border-b border-white/25 bg-[url('https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=500&q=60')] bg-cover bg-center opacity-90" />
              <div className="h-[110px] bg-[url('https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=500&q=60')] bg-cover bg-center opacity-90" />
            </div>
          </div>
        </div>
      </div>

      {hasEnteredViewport && isSticky && !stickyClosed ? (
        <div className="fixed bottom-5 right-5 z-[3400] overflow-hidden rounded border border-neutral-300 bg-black shadow-2xl" style={{ width: stickyWidth, height: stickyHeight }}>
          <VideoPane
            source={activeSource}
            isVideo={isVideoSource}
            muted={muted}
            onToggleMute={() => setMuted((prev) => !prev)}
            onVideoError={handleVideoError}
            countdownLabel={countdownLabel}
            ctaLabel={ctaLabel}
            ctaUrl={ctaUrl}
            showClose
            onClose={() => setStickyClosed(true)}
            className="h-full w-full"
          />
        </div>
      ) : null}
    </>
  )
}
