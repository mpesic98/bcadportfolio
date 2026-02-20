const BASE_WIDTH = 336
const BASE_HEIGHT = 280

const DEFAULT_CLICK_URL = "https://example.com"
const DEFAULT_HEADLINE = "Adidas presenta la nueva coleccion 2026"
const DEFAULT_SUBTITLE = "Descubre productos, ofertas y lanzamientos exclusivos para fans."
const DEFAULT_CTA = "Ver mas"
const DEFAULT_IMAGE_URL = "https://tpc.googlesyndication.com/pimgad/3601605128611183976?"
const DEFAULT_IMAGE_ALT = "Imagen promocional"

export default function NativeCreative({
  width = 300,
  height = 250,
  clickUrl = DEFAULT_CLICK_URL,
  headline = DEFAULT_HEADLINE,
  subtitle = DEFAULT_SUBTITLE,
  cta = DEFAULT_CTA,
  imageUrl = DEFAULT_IMAGE_URL,
  imageAlt = DEFAULT_IMAGE_ALT,
  thirdPartyImpressionPixelUrl = "",
}) {
  const safeWidth = Number.isFinite(Number(width)) ? Number(width) : 300
  const safeHeight = Number.isFinite(Number(height)) ? Number(height) : 250
  const scale = Math.min(safeWidth / BASE_WIDTH, safeHeight / BASE_HEIGHT)
  const impressionPixelUrl =
    typeof thirdPartyImpressionPixelUrl === "string" ? thirdPartyImpressionPixelUrl.trim() : ""

  return (
    <div
      style={{
        width: safeWidth,
        height: safeHeight,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <div
          role="region"
          aria-label="Publicidad - Anuncio nativo"
          data-iab-disclosure="external"
          style={{
            boxSizing: "border-box",
            width: BASE_WIDTH,
            height: BASE_HEIGHT,
            fontFamily: '"Roboto", system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
            color: "#111",
            background: "#fff",
            borderRadius: 10,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: 8,
            position: "relative",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <a
            href={clickUrl}
            target="_blank"
            rel="sponsored nofollow noopener"
            aria-label={headline}
            style={{ display: "block", textDecoration: "none", borderRadius: 8 }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingTop: "52.33%",
                overflow: "hidden",
                borderRadius: 8,
                background: "#ffffff",
              }}
            >
              <img
                src={imageUrl}
                alt={imageAlt}
                loading="lazy"
                decoding="async"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </a>

          <div
            style={{
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              gap: 6,
              minHeight: 0,
            }}
          >
            <a
              href={clickUrl}
              target="_blank"
              rel="sponsored nofollow noopener"
              dir="auto"
              style={{
                color: "#111",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 14,
                lineHeight: 1.25,
                overflowWrap: "anywhere",
                hyphens: "auto",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {headline}
            </a>

            {subtitle ? (
              <p
                dir="auto"
                style={{
                  margin: 0,
                  color: "#444",
                  fontSize: 12,
                  lineHeight: 1.3,
                  overflowWrap: "anywhere",
                  hyphens: "auto",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {subtitle}
              </p>
            ) : null}

            <a
              href={clickUrl}
              target="_blank"
              rel="sponsored nofollow noopener"
              role="button"
              aria-label={cta}
              dir="auto"
              style={{
                display: "block",
                textAlign: "center",
                textDecoration: "none",
                fontSize: 12,
                fontWeight: 700,
                padding: "6px 10px",
                width: "100%",
                borderRadius: 5,
                background: "#f7c100",
                color: "#000",
                lineHeight: 1,
              }}
            >
              {cta}
            </a>
          </div>

          {impressionPixelUrl ? (
            <img
              src={impressionPixelUrl}
              width={1}
              height={1}
              alt=""
              style={{ position: "absolute", left: -9999, top: -9999 }}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
