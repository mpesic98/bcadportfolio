import { useEffect, useMemo, useState } from "react"

const ROTATION_INTERVAL_MS = 5000

const URLS_BY_SIZE = {
  "300x250": [
    "https://ads-builder.fsnservice.com/templates/template1_300_250_b.html?matchId=e14000a9-004b-4f35-902a-5ce22226a23c&color=ffffff&bg=aHR0cHM6Ly9pbWFnZXMuZnV0Ym9sc2l0ZXMubmV0L2xpdmVzY29yZS8yMDI1LzA3LzExLzFjYzMwODhlLTQ3ODgtNGEyMS04YjI5LWQ1NzJkZGU4MGMwMy5wbmc=",
    "https://ads-builder.fsnservice.com/templates/template1_300_250_b.html?matchId=0ccc24f1-b30d-4266-a2d7-c3851160fbbd&color=000000&bg=aHR0cHM6Ly9pbWFnZXMuZnV0Ym9sc2l0ZXMubmV0L2xpdmVzY29yZS8yMDI1LzExLzA0L2FmNTg4MGNlLTExMDAtNDg1NS05MmIzLTU2OTJlMGU3ZGUxNy5qcGc=",
  ],
  "300x600": [
    "https://ads-builder.fsnservice.com/templates/template1_300_600.html?matchId=e14000a9-004b-4f35-902a-5ce22226a23c&color=ffffff&bg=aHR0cHM6Ly9pbWFnZXMuZnV0Ym9sc2l0ZXMubmV0L2xpdmVzY29yZS8yMDI1LzA3LzExLzY2NmE2NzMyLTc4ODctNDZjOC04NTU5LWYyZmJhYzlkNTA4NS5wbmc=",
    "https://ads-builder.fsnservice.com/templates/template1_300_600.html?matchId=0ccc24f1-b30d-4266-a2d7-c3851160fbbd&color=000000&bg=aHR0cHM6Ly9pbWFnZXMuZnV0Ym9sc2l0ZXMubmV0L2xpdmVzY29yZS8yMDI1LzExLzA0LzM2NjQ2ZWU0LTU4OTMtNDY0Zi05ZDFmLTRlNWNmNDJlY2UzMS5qcGc=",
  ],
}

const DIMENSIONS_BY_SIZE = {
  "300x250": { width: 300, height: 250 },
  "300x600": { width: 300, height: 600 },
}

export default function LivescoreRotator({ size }) {
  const urls = useMemo(() => URLS_BY_SIZE[size] || [], [size])
  const dimensions = DIMENSIONS_BY_SIZE[size]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setCurrentIndex(0)
  }, [size])

  useEffect(() => {
    if (urls.length <= 1) return undefined

    const intervalId = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % urls.length)
    }, ROTATION_INTERVAL_MS)

    return () => window.clearInterval(intervalId)
  }, [urls])

  if (!dimensions || urls.length === 0) return null

  const { width, height } = dimensions
  const currentUrl = urls[currentIndex] || urls[0]

  return (
    <div className="mx-auto" style={{ width, height, overflow: "hidden" }}>
      <iframe
        title={`Livescore ${size} ${currentIndex + 1}`}
        src={currentUrl}
        width={width}
        height={height}
        frameBorder="0"
        scrolling="no"
        style={{ display: "block", border: 0 }}
      />
    </div>
  )
}
