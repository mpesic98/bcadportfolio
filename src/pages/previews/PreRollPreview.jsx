import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import PreviewFrame from "../../components/previews/PreviewFrame"
import PrerollCreative from "../../components/previews/PrerollCreative"
import { usePreviewViewport } from "../../components/previews/previewViewport.jsx"
import BaseNewsMock from "./BaseNewsMock"

const DESKTOP_PREROLL_SLOT = "inline_preroll_730x330"
const MOBILE_PREROLL_SLOT = "mobile_preroll"
const MOBILE_PREROLL_VISIBILITY_THRESHOLD = 0.25

function PreRollContent({ formatData }) {
  const { vp, scrollElement } = usePreviewViewport()
  const isMobile = vp === "mobile"
  const [showMobileSticky, setShowMobileSticky] = useState(false)

  const ctaLabel = formatData?.cta?.label || "Visit Partner"
  const ctaUrl = formatData?.cta?.url || "https://example.com"

  const stickyRoot =
    typeof document !== "undefined"
      ? document.getElementById("preview-mobile-sticky-root")
      : null

  useEffect(() => {
    if (!isMobile) {
      setShowMobileSticky(false)
      return undefined
    }

    const scroller = scrollElement
    if (!scroller) return undefined

    let raf = 0
    let observer = null
    let cancelled = false

    const bindObserver = () => {
      if (cancelled) return

      const slotWrapper = scroller.querySelector(`[data-slotid="${MOBILE_PREROLL_SLOT}"]`)
      const target = slotWrapper?.firstElementChild || slotWrapper
      if (!target) {
        raf = requestAnimationFrame(bindObserver)
        return
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          setShowMobileSticky(!entry.isIntersecting)
        },
        {
          root: scroller,
          threshold: MOBILE_PREROLL_VISIBILITY_THRESHOLD,
        }
      )

      observer.observe(target)
    }

    raf = requestAnimationFrame(bindObserver)

    return () => {
      cancelled = true
      if (raf) cancelAnimationFrame(raf)
      if (observer) observer.disconnect()
    }
  }, [isMobile, scrollElement])

  const renderAd = (slotId) => {
    if (!isMobile && slotId === DESKTOP_PREROLL_SLOT) {
      return (
        <PrerollCreative
          mode="primis"
          ctaLabel={ctaLabel}
          ctaUrl={ctaUrl}
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
          ctaLabel={ctaLabel}
          ctaUrl={ctaUrl}
          countdownSeconds={11}
        />
      )
    }

    return null
  }

  return (
    <>
      <BaseNewsMock
        renderAd={renderAd}
        hideMobileVideoMock={isMobile}
        showMobilePrerollSlot={isMobile}
      />

      {isMobile && showMobileSticky && stickyRoot
        ? createPortal(
            <div className="pointer-events-auto absolute inset-x-0 bottom-[64px] flex justify-center px-3">
              <div className="w-[220px] overflow-hidden rounded border border-neutral-300 bg-black shadow-2xl">
                <PrerollCreative
                  mode="mobile-inline"
                  ctaLabel={ctaLabel}
                  ctaUrl={ctaUrl}
                  countdownSeconds={11}
                />
              </div>
            </div>,
            stickyRoot
          )
        : null}
    </>
  )
}

export default function PreRollPreview({ formatData }) {
  return (
    <PreviewFrame maxWidth={1100}>
      <PreRollContent formatData={formatData} />
    </PreviewFrame>
  )
}
