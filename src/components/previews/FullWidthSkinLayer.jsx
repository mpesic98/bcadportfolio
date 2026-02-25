import { useMemo } from "react"
import { usePreviewViewport } from "./previewViewport.jsx"

const DEFAULT_SAFE_WIDTH = 1080
const DEFAULT_GAP = 5
const DEFAULT_BG_SIZE = "1940px auto"
const DEFAULT_BG_POSITION = "calc(50% - 8px) top"

export default function FullWidthSkinLayer({
  imageUrl,
  clickUrl,
  showBehindContent = false,
  safeWidth = DEFAULT_SAFE_WIDTH,
  gap = DEFAULT_GAP,
  siteBgColor = "#fff",
  backgroundSize = DEFAULT_BG_SIZE,
  backgroundPosition = DEFAULT_BG_POSITION,
}) {
  const { width: previewViewportWidth } = usePreviewViewport()
  const viewportWidth =
    previewViewportWidth || (typeof window === "undefined" ? 0 : window.innerWidth || 0)

  const clickAreaWidth = useMemo(() => {
    const raw = Math.floor((viewportWidth - safeWidth) / 2) - gap
    return raw > 0 ? raw : 0
  }, [gap, safeWidth, viewportWidth])

  return (
    <>
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${imageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition,
          backgroundSize,
        }}
      />

      {!showBehindContent && (
        <div
          className="fixed inset-y-0 left-1/2 -translate-x-1/2 z-[2] pointer-events-none"
          aria-hidden="true"
          style={{ width: safeWidth, background: siteBgColor }}
        />
      )}

      {clickUrl ? (
        <>
          <a
            href={clickUrl}
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
            aria-label="Skin click area left"
            className="fixed top-0 left-0 z-[3] block"
            style={{
              width: clickAreaWidth,
              height: "100vh",
              pointerEvents: clickAreaWidth > 0 ? "auto" : "none",
            }}
          />
          <a
            href={clickUrl}
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
            aria-label="Skin click area right"
            className="fixed top-0 right-0 z-[3] block"
            style={{
              width: clickAreaWidth,
              height: "100vh",
              pointerEvents: clickAreaWidth > 0 ? "auto" : "none",
            }}
          />
        </>
      ) : null}
    </>
  )
}
