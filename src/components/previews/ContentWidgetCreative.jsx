import contentWidgetBg from "../../assets/contentwidget.png"

const DEFAULT_STORIES = [
  "The stories shaping the game today",
  "Latest analysis from across the network",
  "More premium sports coverage",
]

export default function ContentWidgetCreative({
  width = 300,
  height = 250,
  imageUrl,
  iframeUrl = "",
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

      {iframeUrl ? (
        <iframe
          src={iframeUrl}
          title={`Content Widget ${safeWidth}x${safeHeight}`}
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
            background: "transparent",
          }}
        />
      ) : (
        <div
          aria-label="Sponsored content recommendations"
          style={{
            position: "absolute",
            zIndex: 3,
            left: 0,
            right: 0,
            bottom: 0,
            minHeight: iframeHeight,
            padding: "10px 12px",
            background: "rgba(255,255,255,0.96)",
            color: "#10251f",
          }}
        >
          <div
            style={{
              marginBottom: 7,
              color: "#65736f",
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Sponsored content
          </div>
          {DEFAULT_STORIES.slice(0, safeHeight >= 500 ? 3 : 2).map((story) => (
            <div
              key={story}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                padding: "7px 0",
                borderTop: "1px solid #dfe6e3",
                fontSize: 11,
                fontWeight: 700,
                lineHeight: 1.25,
              }}
            >
              <span>{story}</span>
              <span aria-hidden="true" style={{ color: "#00745b" }}>→</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
