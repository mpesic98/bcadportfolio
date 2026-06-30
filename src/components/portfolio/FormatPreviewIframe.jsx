import { useMemo } from "react"
import { buildFormatPreviewHtml } from "../../features/proposals/buildFormatPreviewHtml"

export default function FormatPreviewIframe({ format, interactive = false }) {
  const srcDoc = useMemo(() => buildFormatPreviewHtml(format), [format])

  return (
    <iframe
      title={`${format.title} live preview`}
      srcDoc={srcDoc}
      sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
      allow="autoplay; fullscreen"
      loading="lazy"
      className={`h-full w-full border-0 bg-white ${interactive ? "" : "pointer-events-none"}`}
    />
  )
}
