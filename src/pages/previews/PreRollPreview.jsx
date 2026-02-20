import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"
import PrerollCreative from "../../components/previews/PrerollCreative"
import { useLocation } from "react-router-dom"

const DESKTOP_PREROLL_SLOT = "inline_preroll_730x330"
const MOBILE_PREROLL_SLOT = "mobile_preroll"

export default function PreRollPreview({ formatData }) {
  const location = useLocation()
  const isMobile = new URLSearchParams(location.search).get("vp") === "mobile"

  const renderAd = (slotId) => {
    if (!isMobile && slotId === DESKTOP_PREROLL_SLOT) {
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
          autoScrollIntoView
        />
      )
    }

    if (isMobile && slotId === MOBILE_PREROLL_SLOT) {
      return (
        <PrerollCreative
          mode="mobile-inline"
          ctaLabel={formatData?.cta?.label || "Visit Partner"}
          ctaUrl={formatData?.cta?.url || "https://example.com"}
          countdownSeconds={11}
          autoScrollIntoView
        />
      )
    }

    return null
  }

  return (
    <PreviewFrame maxWidth={1100}>
      <BaseNewsMock
        renderAd={renderAd}
        hideMobileVideoMock={isMobile}
        showMobilePrerollSlot={isMobile}
      />
    </PreviewFrame>
  )
}
