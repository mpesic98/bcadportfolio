import { useEffect, useMemo, useRef, useState } from "react"
import previewVideo from "../../assets/video/V2_Web-Front-Page-Video_LOW-Quality.mp4"
import {
  assetLooksLikeVideo,
  resolveCreativeAsset,
} from "../../features/proposals/creativeResolver"
import { usePreviewCampaign } from "../../features/proposals/PreviewCampaignContext"

export default function InstreamPlayerCreative({
  spec,
  compact = false,
  autoScrollIntoView = false,
  sticky = false,
}) {
  const { campaign } = usePreviewCampaign()
  const playerRef = useRef(null)
  const mediaRef = useRef(null)
  const hasEnteredViewportRef = useRef(false)
  const duration = useMemo(() => {
    if (spec?.playerStyle === "youtube" && spec?.skippable) return 30
    return 15
  }, [spec])
  const [secondsLeft, setSecondsLeft] = useState(duration)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)
  const [skipped, setSkipped] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [stickyClosed, setStickyClosed] = useState(false)
  const mediaSource = resolveCreativeAsset(campaign, "pre_roll", previewVideo)
  const isVideoSource = assetLooksLikeVideo(mediaSource)
  const secondsElapsed = duration - secondsLeft
  const skipAvailable = Boolean(spec?.skippable) && secondsElapsed >= 5

  useEffect(() => {
    setSecondsLeft(duration)
    setSkipped(false)
    setMuted(true)
    setPlaying(true)
  }, [duration, spec?.id])

  useEffect(() => {
    if (!playing || skipped || secondsLeft <= 0) return undefined
    const timer = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [playing, secondsLeft, skipped])

  useEffect(() => {
    if (!sticky || compact) return undefined
    const target = playerRef.current
    if (!target) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasEnteredViewportRef.current = true
          setIsSticky(false)
          return
        }

        if (hasEnteredViewportRef.current) setIsSticky(true)
      },
      { threshold: 0 }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [compact, sticky])

  useEffect(() => {
    if (!isSticky) setStickyClosed(false)
  }, [isSticky])

  useEffect(() => {
    if (!autoScrollIntoView || compact) return undefined
    const target = playerRef.current
    if (!target) return undefined

    const raf = window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
    })

    return () => window.cancelAnimationFrame(raf)
  }, [autoScrollIntoView, compact])

  const restart = () => {
    setSkipped(false)
    setSecondsLeft(duration)
    setPlaying(true)
  }

  const togglePlayback = () => {
    const media = mediaRef.current
    if (!media) {
      setPlaying((value) => !value)
      return
    }

    if (media.paused) {
      media.play().catch(() => {})
      setPlaying(true)
    } else {
      media.pause()
      setPlaying(false)
    }
  }

  const renderPlayer = (stickyPlayer = false) => (
    <div
      className="relative overflow-hidden rounded-lg border border-neutral-700 bg-black text-white shadow-xl"
      style={{ width: stickyPlayer ? 400 : compact ? "100%" : 730, maxWidth: "100%", aspectRatio: "16 / 9" }}
    >
      {stickyPlayer ? (
        <button
          type="button"
          onClick={() => setStickyClosed(true)}
          className="absolute right-3 top-3 z-20 grid h-8 w-8 place-items-center rounded-full bg-black/75 text-sm font-semibold text-white"
          aria-label="Close sticky player"
        >
          ×
        </button>
      ) : null}
      {skipped || secondsLeft === 0 ? (
        <div className="grid h-full place-items-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Editorial video</p>
            <p className="mt-2 text-lg font-semibold">Ad preview complete</p>
            <button type="button" onClick={restart} className="mt-4 rounded bg-white px-3 py-2 text-xs font-semibold text-black">
              Replay ad
            </button>
          </div>
        </div>
      ) : (
        <>
          {isVideoSource ? (
            <video ref={mediaRef} src={mediaSource} autoPlay muted={muted} playsInline loop className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <img src={mediaSource} alt="In-stream advertising creative" className="absolute inset-0 h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />

          {spec?.playerStyle === "youtube" ? (
            <>
              <div className="absolute left-3 top-3 flex items-center gap-2 rounded bg-black/72 px-2.5 py-1.5 text-[11px] font-medium">
                <span className="font-semibold">Sponsored</span>
                <span className="text-white/70">· Cracks partner</span>
              </div>

              <button type="button" className="absolute bottom-12 left-3 rounded-full bg-[#3ea6ff] px-4 py-2 text-[11px] font-bold text-[#0f0f0f]">
                Visit advertiser
              </button>

              {spec?.skippable ? (
                <button
                  type="button"
                  disabled={!skipAvailable}
                  onClick={() => setSkipped(true)}
                  className="absolute bottom-12 right-0 border border-r-0 border-white/45 bg-black/78 px-4 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:text-white/55"
                >
                  {skipAvailable ? "Skip ads  ›" : `Video will play after ad · ${5 - secondsElapsed}`}
                </button>
              ) : (
                <div className="absolute bottom-12 right-3 rounded bg-black/72 px-3 py-2 text-[11px] font-medium">
                  Ad · 0:{String(secondsLeft).padStart(2, "0")}
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-3 pb-2 pt-8">
                <div className="mb-2 h-[3px] overflow-hidden bg-white/35">
                  <div
                    className="h-full bg-[#ff0033] transition-[width] duration-1000"
                    style={{ width: `${Math.max(0, Math.min(100, (secondsElapsed / duration) * 100))}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3 text-xs">
                    <button type="button" onClick={togglePlayback} className="text-base" aria-label={playing ? "Pause video" : "Play video"}>
                      {playing ? "❚❚" : "▶"}
                    </button>
                    <button type="button" onClick={() => setMuted((value) => !value)} className="text-base" aria-label="Toggle sound">
                      {muted ? "🔇" : "🔊"}
                    </button>
                    <span>Ad · 0:{String(secondsLeft).padStart(2, "0")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm" aria-hidden="true">
                    <span>CC</span><span>⚙</span><span>□</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="absolute left-3 top-3 rounded bg-black/72 px-2.5 py-1.5 text-xs font-semibold">On-site player</div>
              <div className={[
                "absolute flex gap-3",
                compact
                  ? "bottom-2 left-2 right-2 flex-col items-stretch"
                  : "bottom-3 left-3 right-3 items-end justify-between",
              ].join(" ")}>
                <div className="min-w-0">
                  <p className="text-xs font-semibold">Ad · 0:{String(secondsLeft).padStart(2, "0")}</p>
                  {!compact ? <p className="mt-1 text-[10px] text-white/68">Illustrative preview media · MP4 H.264 / VAST delivery</p> : null}
                </div>
                <div className={["flex gap-2", compact ? "justify-end" : ""].join(" ")}>
                  <button type="button" onClick={() => setMuted((value) => !value)} className="rounded bg-black/72 px-3 py-2 text-xs font-semibold">
                    {muted ? "Unmute" : "Mute"}
                  </button>
                  {spec?.skippable ? (
                    <button
                      type="button"
                      disabled={!skipAvailable}
                      onClick={() => setSkipped(true)}
                      className="rounded border border-white/40 bg-black/72 px-3 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      {skipAvailable ? "Skip ad" : `Skip in ${5 - secondsElapsed}`}
                    </button>
                  ) : null}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )

  return (
    <>
      <div ref={playerRef} className={compact ? "w-full" : "mx-auto w-[730px] max-w-full"}>
        {renderPlayer()}
      </div>
      {sticky && !compact && isSticky && !stickyClosed ? (
        <div className="instream-sticky-player fixed bottom-5 right-5 z-[3400]">
          {renderPlayer(true)}
        </div>
      ) : null}
    </>
  )
}
