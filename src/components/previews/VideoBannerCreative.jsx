import { useRef, useState } from "react"

export default function VideoBannerCreative({
  slotId,
  size = "300x250",
  videoUrl = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
}) {
  const [w, h] = size.split("x").map(Number)
  const videoRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const [muted, setMuted] = useState(true)

  const togglePlay = () => {
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
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
    <div className="w-full flex justify-center">
      <div className="relative overflow-hidden rounded" style={{ width: w, height: h }}>
        <video
          ref={videoRef}
          src={videoUrl}
          muted={muted}
          playsInline
          autoPlay
          loop
          preload="metadata"
          onPause={() => setPaused(true)}
          onPlay={() => setPaused(false)}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute top-2 left-2 rounded bg-black/65 px-2 py-1 text-[10px] text-white">
          {slotId}
        </div>

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
      </div>
    </div>
  )
}
