import { useRef, useState } from "react"
import {
  assetLooksLikeVideo,
  resolveCreativeAsset,
} from "../../features/proposals/creativeResolver"
import { usePreviewCampaign } from "../../features/proposals/PreviewCampaignContext"

export default function VideoBannerCreative({
  slotId,
  size = "300x250",
  videoUrl = "https://bettercollective.com/wp-content/uploads/2024/05/50-8bit-420.webm",
}) {
  const { campaign } = usePreviewCampaign()
  const [w, h] = size.split("x").map(Number)
  const videoRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const [muted, setMuted] = useState(true)
  const assetUrl = resolveCreativeAsset(campaign, "video_banner", videoUrl)
  const isVideoAsset = assetLooksLikeVideo(assetUrl)

  const togglePlay = () => {
    if (!isVideoAsset) return
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
      setPaused(false)
    } else {
      video.pause()
      setPaused(true)
    }
  }

  const toggleMute = () => {
    if (!isVideoAsset) return
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
    <div className="w-full flex justify-center">
      <div className="relative overflow-hidden rounded" style={{ width: w, height: h }}>
        {isVideoAsset ? (
          <video
            ref={videoRef}
            src={assetUrl}
            muted={muted}
            playsInline
            autoPlay
            loop
            preload="metadata"
            onPause={() => setPaused(true)}
            onPlay={() => setPaused(false)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img
            src={assetUrl}
            alt={slotId}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute top-2 left-2 rounded bg-black/65 px-2 py-1 text-[10px] text-white">
          {slotId}
        </div>

        {isVideoAsset ? (
          <div className="absolute bottom-2 right-2 flex gap-2 pointer-events-auto">
            <button
              type="button"
              onClick={togglePlay}
              className="rounded bg-black/65 px-2 py-1 text-[10px] text-white"
              aria-label="Play or pause video"
            >
              {paused ? "Play" : "Pause"}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="rounded bg-black/65 px-2 py-1 text-[10px] text-white"
              aria-label="Mute or unmute video"
            >
              {muted ? "Muted" : "Sound"}
            </button>
          </div>
        ) : (
          <div className="absolute bottom-2 right-2 rounded bg-black/65 px-2 py-1 text-[10px] text-white">
            Poster
          </div>
        )}
      </div>
    </div>
  )
}
