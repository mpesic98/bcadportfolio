import { useEffect, useMemo, useState } from "react"
import fallbackCountdownVideo from "../../assets/video/50-8bit-420-mobile.webm"
import {
  assetLooksLikeVideo,
  resolveCreativeAsset,
} from "../../features/proposals/creativeResolver"
import { usePreviewCampaign } from "../../features/proposals/PreviewCampaignContext"

const SUPPORTED_SIZES = new Set(["300x250", "300x600"])
const COUNTDOWN_DURATION_SECONDS = 12 * 24 * 60 * 60 + 8 * 60 * 60 + 37 * 60

function twoDigits(value) {
  return String(value).padStart(2, "0")
}

function getCountdownParts(totalSeconds) {
  return [
    { label: "Days", value: twoDigits(Math.floor(totalSeconds / 86400)) },
    { label: "Hours", value: twoDigits(Math.floor((totalSeconds % 86400) / 3600)) },
    { label: "Minutes", value: twoDigits(Math.floor((totalSeconds % 3600) / 60)) },
  ]
}

export default function VideoCountdownBannerCreative({ size }) {
  const { campaign } = usePreviewCampaign()
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_DURATION_SECONDS)

  const isSupported = SUPPORTED_SIZES.has(size)
  const [width, height] = isSupported ? size.split("x").map(Number) : [0, 0]
  const isTall = height === 600
  const uploadedVideo = resolveCreativeAsset(campaign, "video_banner_countdown")
  const videoUrl = assetLooksLikeVideo(uploadedVideo)
    ? uploadedVideo
    : fallbackCountdownVideo
  const countdown = useMemo(() => getCountdownParts(secondsLeft), [secondsLeft])

  useEffect(() => {
    if (!isSupported) return undefined

    const timer = window.setInterval(() => {
      setSecondsLeft((current) =>
        current <= 1 ? COUNTDOWN_DURATION_SECONDS : current - 1
      )
    }, 1000)

    return () => window.clearInterval(timer)
  }, [isSupported])

  if (!isSupported) return null

  return (
    <div className="flex w-full justify-center">
      <div
        className="relative overflow-hidden bg-neutral-950 font-sans"
        style={{ width, height }}
      >
        <video
          src={videoUrl}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/45" />

        <div
          className={[
            "pointer-events-none absolute left-1/2 z-10 flex -translate-x-1/2 items-start justify-center",
            isTall ? "bottom-[12%] gap-2" : "bottom-7 gap-1.5",
          ].join(" ")}
        >
          {countdown.map((unit) => (
            <div key={unit.label} className="grid justify-items-center gap-1.5">
              <div
                className={[
                  "grid place-items-center bg-white font-bold tabular-nums text-black shadow-[0_4px_14px_rgba(0,0,0,0.2)]",
                  isTall ? "h-11 w-12 text-[22px]" : "h-10 w-[42px] text-xl",
                ].join(" ")}
              >
                {unit.value}
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wide text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
