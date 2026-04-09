import { useEffect, useMemo, useState } from "react"
import LivescoreWidget from "../livescore/LivescoreWidget"
import { livescoreMockData } from "../../data/livescoreMockData"

const ROTATION_INTERVAL_MS = 5000

const DIMENSIONS_BY_SIZE = {
  "300x250": { width: 300, height: 250 },
  "300x600": { width: 300, height: 600 },
}

export default function LivescoreRotator({ size, variant = "card" }) {
  const sources = useMemo(() => livescoreMockData.bySize[size] || [], [size])
  const dimensions = DIMENSIONS_BY_SIZE[size]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setCurrentIndex(0)
  }, [size])

  useEffect(() => {
    if (sources.length <= 1) return undefined

    const intervalId = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sources.length)
    }, ROTATION_INTERVAL_MS)

    return () => window.clearInterval(intervalId)
  }, [sources])

  if (!dimensions || sources.length === 0) return null

  const { width, height } = dimensions
  const currentSource = sources[currentIndex] || sources[0]

  return (
    <div className="mx-auto" style={{ width, height, overflow: "hidden" }}>
      <LivescoreWidget
        width={width}
        height={height}
        source={currentSource}
        variant={variant}
        frameLabel={`BC ${size}`}
      />
    </div>
  )
}
