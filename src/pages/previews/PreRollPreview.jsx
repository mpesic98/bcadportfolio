import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"
import DisplayCreative from "../../components/previews/DisplayCreative"
import PrerollCreative from "../../components/previews/PrerollCreative"
import { useLocation } from "react-router-dom"

const sizeMap = {
  top_1070x27: "1070x27",
  sidebar_300x250_1: "300x250",
  sidebar_300x250_2: "300x250",
  inline_300x600: "300x600",
  inline_300x250_1: "300x250",
  mobile_sticky_320x50: "320x50",
  mobile_inline_300x250_1: "300x250",
  mobile_inline_300x250_2: "300x250",
  mobile_inline_300x250_3: "300x250",
  mobile_inline_300x600: "300x600",
}

const prerollSlots = new Set([
  "inline_300x600",
  "inline_300x250_1",
  "mobile_inline_300x250_1",
  "mobile_inline_300x250_2",
  "mobile_inline_300x250_3",
  "mobile_inline_300x600",
])

export default function PreRollPreview({ formatData }) {
  const location = useLocation()
  const isMobile = new URLSearchParams(location.search).get("vp") === "mobile"
  let mobilePrerollRendered = false

  const renderAd = (slotId) => {
    if (!isMobile && slotId === "inline_preroll_730x330") {
      return (
        <PrerollCreative
          mode="primis"
          ctaLabel={formatData?.cta?.label || "Visit Partner"}
          ctaUrl={formatData?.cta?.url || "https://example.com"}
          containerWidth={730}
          containerHeight={330}
          videoWidth={546}
          sidebarWidth={184}
          stickyWidth={400}
          stickyHeight={225}
          countdownSeconds={11}
        />
      )
    }

    if (isMobile && slotId === "mobile_inline_300x250_1" && !mobilePrerollRendered) {
      mobilePrerollRendered = true
      return (
        <PrerollCreative
          mode="mobile-inline"
          ctaLabel={formatData?.cta?.label || "Visit Partner"}
          ctaUrl={formatData?.cta?.url || "https://example.com"}
          countdownSeconds={11}
        />
      )
    }

    if (isMobile && prerollSlots.has(slotId)) {
      const fallbackSize = slotId === "mobile_inline_300x600" ? "300x600" : "300x250"
      return <DisplayCreative slotId={slotId} size={fallbackSize} />
    }

    return <DisplayCreative slotId={slotId} size={sizeMap[slotId] || "300x250"} />
  }

  return (
    <PreviewFrame maxWidth={1100}>
      <BaseNewsMock renderAd={renderAd} hideMobileVideoMock={isMobile} />
    </PreviewFrame>
  )
}
