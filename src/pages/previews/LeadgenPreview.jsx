import { useEffect, useRef } from "react"
import LeadgenCreative from "../../components/previews/LeadgenCreative"
import PreviewFrame from "../../components/previews/PreviewFrame"
import { usePreviewViewport } from "../../components/previews/previewViewport.jsx"
import BaseNewsMock from "./BaseNewsMock"

const LEADGEN_SLOTS = new Set(["inline_300x600", "mobile_inline_300x600"])

export default function LeadgenPreview() {
  const contentMaxWidth = 1100
  const { vp } = usePreviewViewport()
  const isMobile = vp === "mobile"
  const anchorRef = useRef(null)
  const didAutoScrollRef = useRef(false)

  useEffect(() => {
    if (didAutoScrollRef.current || !anchorRef.current) return

    const element = anchorRef.current
    let rafId = 0
    let settleTimerId = 0

    const centerSlot = () => {
      if (!element) return

      const mobileScroller = isMobile ? element.closest(".preview-scroll") : null
      if (mobileScroller) {
        const scrollerRect = mobileScroller.getBoundingClientRect()
        const elementRect = element.getBoundingClientRect()
        const offsetToCenter =
          elementRect.top -
          scrollerRect.top -
          (scrollerRect.height / 2 - elementRect.height / 2)

        mobileScroller.scrollTo({
          top: Math.max(0, mobileScroller.scrollTop + offsetToCenter),
          behavior: "smooth",
        })
        return
      }

      const elementRect = element.getBoundingClientRect()
      const targetTop =
        window.scrollY + elementRect.top - (window.innerHeight / 2 - elementRect.height / 2)

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: "smooth",
      })
    }

    rafId = window.requestAnimationFrame(() => {
      centerSlot()
      didAutoScrollRef.current = true
      settleTimerId = window.setTimeout(() => {
        centerSlot()
      }, 350)
    })

    return () => {
      window.cancelAnimationFrame(rafId)
      window.clearTimeout(settleTimerId)
    }
  }, [isMobile])

  const renderAd = (slotId) => {
    if (!LEADGEN_SLOTS.has(slotId)) return null

    return (
      <div ref={anchorRef} className="mx-auto" style={{ width: 300, height: 600, overflow: "hidden" }}>
        <LeadgenCreative width={300} height={600} />
      </div>
    )
  }

  return (
    <PreviewFrame maxWidth={contentMaxWidth}>
      <BaseNewsMock renderAd={renderAd} />
    </PreviewFrame>
  )
}
