import { useRef, useState } from "react"

export default function VideoBannerCreative({
  slotId,
  size = "300x250",
  videoUrl = "https://www.pexels.com/download/video/1943483/"
}) {
  const [w, h] = size.split("x").map(Number)
  const videoRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const [muted, setMuted] = useState(true)

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPaused(false)
    } else {
      v.pause()
      setPaused(true)
    }
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    <div className="w-full flex justify-center">
      <div
        className="relative overflow-hidden"
        style={{ width: w, height: h }}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          playsInline
          autoPlay
          loop
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute bottom-2 right-2 flex gap-2">
          <button
            onClick={togglePlay}
            className="h-7 w-5 text-white text-xs flex items-center justify-center"
            aria-label="Pause / Play"
          >
            {paused ? "▶" : "⏸"}
          </button>

          <button
            onClick={toggleMute}
            className="h-7 w-5 text-white text-xs flex items-center justify-center"
            aria-label="Mute / Unmute"
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      </div>
    </div>
  )
}
