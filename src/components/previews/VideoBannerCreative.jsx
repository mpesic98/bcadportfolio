import { useRef, useState } from "react"
import {
  assetLooksLikeVideo,
  resolveCreativeAsset,
} from "../../features/proposals/creativeResolver"
import { usePreviewCampaign } from "../../features/proposals/PreviewCampaignContext"
import fallbackVideo from "../../assets/video/V2_Web-Front-Page-Video_LOW-Quality.mp4"
import CreativeSpecsPopover from "./CreativeSpecsPopover"

const fallbackBySize = {
  "300x250": fallbackVideo,
  "300x600": fallbackVideo,
}

export default function VideoBannerCreative({
  slotId,
  size = "300x250",
  videoUrl,
}) {
  const { campaign } = usePreviewCampaign()
  const [w, h] = size.split("x").map(Number)
  const videoRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const [muted, setMuted] = useState(true)
  const fallbackAsset = videoUrl || fallbackBySize[size] || fallbackVideo
  const assetUrl = resolveCreativeAsset(campaign, "video_banner", fallbackAsset)
  const isVideoAsset = assetLooksLikeVideo(assetUrl)
  const isMobileSlot = slotId.startsWith("mobile_")

  const togglePlay = () => {
    if (!isVideoAsset) return
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play().catch(() => {})
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
      <CreativeSpecsPopover
        title="Video Banner"
        size={size}
        device={isMobileSlot ? "Mobile" : "Desktop"}
        rows={[
          { label: "Accepted formats", value: ["MP4 or WEBM", "JPG or PNG poster"] },
          { label: "Playback", value: "Autoplay muted; sound after user interaction" },
          { label: "Delivery", value: "Lightweight, web-optimized video" },
        ]}
        note="Video Banners are portfolio display units and remain separate from official in-stream and YouTube video formats."
      >
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
              alt={`Video Banner ${size}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          <div className="absolute left-2 top-2 rounded bg-black/65 px-2 py-1 text-[10px] text-white">
            {size} · Specs
          </div>

          {isVideoAsset ? (
            <div className="absolute bottom-2 right-2 flex gap-2 pointer-events-auto">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  togglePlay()
                }}
                className="rounded bg-black/65 px-2 py-1 text-[10px] text-white"
                aria-label="Play or pause video"
              >
                {paused ? "Play" : "Pause"}
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  toggleMute()
                }}
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
      </CreativeSpecsPopover>
    </div>
  )
}
