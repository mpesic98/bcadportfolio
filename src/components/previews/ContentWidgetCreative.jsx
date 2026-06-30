import contentWidgetBg from "../../assets/contentwidget.png"
const DEFAULT_WIDGET_IFRAME_URL =
  "https://custom-ads.bolavip.com/articles/?site=RDG&tag=quix&size=2&color=FFFFFF&font-size=15px"

export default function ContentWidgetCreative({
  width = 300,
  height = 250,
  imageUrl,
  iframeUrl = DEFAULT_WIDGET_IFRAME_URL,
}) {
  const safeWidth = Number.isFinite(Number(width)) ? Number(width) : 300
  const safeHeight = Number.isFinite(Number(height)) ? Number(height) : 250
  const effectiveImageUrl = imageUrl || contentWidgetBg
  const iframeHeight = Math.min(145, safeHeight)

  return (
    <div
      style={{
        position: "relative",
        width: safeWidth,
        height: safeHeight,
        overflow: "hidden",
        borderRadius: 8,
        background: "#ffffff",
      }}
    >
      <img
        src={effectiveImageUrl}
        alt="Content Widget background"
        style={{
          position: "absolute",
          zIndex: 1,
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <div
        aria-label="Content Widget click layer"
        role="button"
        tabIndex={0}
        style={{
          position: "absolute",
          zIndex: 2,
          inset: 0,
          display: "block",
          cursor: "pointer",
        }}
      />

      <iframe
        src={iframeUrl}
        title={`Content Widget ${safeWidth}x${safeHeight}`}
        frameBorder="0"
        scrolling="no"
        style={{
          position: "absolute",
          zIndex: 3,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: iframeHeight,
          border: 0,
          background: "#ffffff00",
        }}
      />
    </div>
  )
}
