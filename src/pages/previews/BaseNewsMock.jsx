// src/pages/previews/BaseNewsMock.jsx
import { useMemo } from "react"
import { createPortal } from "react-dom"
import AdSlot from "../../components/previews/AdSlot"
import { usePreviewViewport } from "../../components/previews/previewViewport.jsx"

function Block({ h = 12, w = "100%", r = 8, className = "" }) {
  return (
    <div
      className={`bg-neutral-200 ${className}`}
      style={{ height: h, width: w, borderRadius: r }}
    />
  )
}

function Lines({ n = 5 }) {
  return (
    <div className="grid gap-2">
      {Array.from({ length: n }).map((_, i) => (
        <Block key={i} h={12} w={i === n - 1 ? "70%" : "100%"} r={8} />
      ))}
    </div>
  )
}

function MiniLinkRow() {
  return (
    <div className="grid grid-cols-[88px_1fr] gap-3 items-start">
      <Block h={56} w={88} r={10} />
      <div className="grid gap-2">
        <Block h={12} w="92%" r={8} />
        <Block h={10} w="70%" r={8} />
      </div>
    </div>
  )
}

function RankedItem({ index }) {
  return (
    <div className="grid grid-cols-[26px_56px_1fr] gap-3 items-start">
      <div className="h-6 w-[26px] rounded bg-neutral-200 flex items-center justify-center text-[11px] text-neutral-500">
        {index}
      </div>
      <Block h={56} w={56} r={10} />
      <div className="grid gap-2">
        <Block h={12} w="88%" r={8} />
        <Block h={10} w="66%" r={8} />
      </div>
    </div>
  )
}

function SidebarBox() {
  return (
    <div className="border border-neutral-200 rounded-lg bg-white overflow-hidden">
      <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Block h={12} w={120} r={999} />
          <div className="h-2 w-2 rounded-full bg-neutral-200" />
          <Block h={10} w={70} r={999} />
        </div>
        <Block h={10} w={56} r={999} />
      </div>

      <div className="p-4 grid gap-4">
        <div className="flex items-center gap-2">
          <Block h={12} w={140} r={999} />
          <Block h={10} w={60} r={999} />
        </div>

        <div className="grid gap-4">
          <RankedItem index={1} />
          <RankedItem index={2} />
          <RankedItem index={3} />
          <RankedItem index={4} />
          <RankedItem index={5} />
        </div>
      </div>
    </div>
  )
}

function MobileStickyBottom({ renderAd, mode = "flow" }) {
  const isFixed = mode === "fixed"
  const fixedRoot =
    typeof document !== "undefined"
      ? document.getElementById("preview-mobile-sticky-root")
      : null

  const stickyContent = (
    <div className="pointer-events-auto border-t border-neutral-200 bg-white/95 backdrop-blur">
      <div className="py-2 flex justify-center">
        <AdSlot slotId="mobile_sticky_320x50" renderAd={renderAd}>
          <div className="w-[320px] h-[50px] rounded bg-neutral-200" />
        </AdSlot>
      </div>
    </div>
  )

  if (isFixed && fixedRoot) return createPortal(stickyContent, fixedRoot)
  if (isFixed) return <div className="fixed bottom-0 inset-x-0 z-[120]">{stickyContent}</div>

  return <div className="sticky bottom-0 z-50">{stickyContent}</div>
}

function MobileVideoMock() {
  return (
    <div className="border border-neutral-200 bg-neutral-50 rounded-lg p-3">
      <div className="h-3 w-28 rounded bg-neutral-200 mb-2" />
      <div className="relative w-full rounded bg-neutral-200 overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 rounded-full bg-neutral-300" />
        </div>
      </div>
    </div>
  )
}

function MobileSummary() {
  return (
    <div className="mt-6 border border-neutral-200 bg-neutral-50 rounded-lg p-4">
      <Block h={14} w={170} r={10} />
      <div className="mt-3 grid gap-2">
        <div className="flex items-start gap-2">
          <div className="mt-[5px] h-2 w-2 rounded-full bg-neutral-200" />
          <Block h={12} w="92%" r={8} />
        </div>
        <div className="flex items-start gap-2">
          <div className="mt-[5px] h-2 w-2 rounded-full bg-neutral-200" />
          <Block h={12} w="86%" r={8} />
        </div>
        <div className="flex items-start gap-2">
          <div className="mt-[5px] h-2 w-2 rounded-full bg-neutral-200" />
          <Block h={12} w="90%" r={8} />
        </div>
      </div>
    </div>
  )
}

function DesktopSiteRails({
  renderAd,
  railWidth = 160,
  railHeight = 600,
  railGap = 24,
  topBarHeight = 72,
  contentMaxWidth = 1070,
  viewportWidth = 0,
}) {
  const { effectiveGap, effectiveRailWidth, margin } = useMemo(() => {
    const outerMargin = 8
    const available = (viewportWidth - contentMaxWidth) / 2 - outerMargin

    if (!Number.isFinite(available) || available <= 0) {
      return { effectiveGap: 0, effectiveRailWidth: 0, margin: outerMargin }
    }

    const gap = Math.min(railGap, Math.max(0, Math.floor(available - railWidth)))
    const width = Math.min(railWidth, Math.max(0, Math.floor(available - gap)))

    return { effectiveGap: gap, effectiveRailWidth: width, margin: outerMargin }
  }, [contentMaxWidth, railGap, railWidth, viewportWidth])

  if (effectiveRailWidth < 20) return null

  const leftOffset = contentMaxWidth / 2 + effectiveGap + effectiveRailWidth
  const rightOffset = contentMaxWidth / 2 + effectiveGap

  return (
    <div className="block" aria-hidden="true">
      <div
        className="fixed z-30"
        style={{
          width: effectiveRailWidth,
          height: railHeight,
          top: topBarHeight + 96,
          left: `max(${margin}px, calc(50% - ${leftOffset}px))`,
        }}
      >
        <AdSlot slotId="rail_left_160x600" renderAd={renderAd}>
          <div className="h-full w-full rounded border border-neutral-300 bg-neutral-200" />
        </AdSlot>
      </div>

      <div
        className="fixed z-30"
        style={{
          width: effectiveRailWidth,
          height: railHeight,
          top: topBarHeight + 96,
          left: `min(calc(100% - ${effectiveRailWidth + margin}px), calc(50% + ${rightOffset}px))`,
        }}
      >
        <AdSlot slotId="rail_right_160x600" renderAd={renderAd}>
          <div className="h-full w-full rounded border border-neutral-300 bg-neutral-200" />
        </AdSlot>
      </div>
    </div>
  )
}

export default function BaseNewsMock({
  renderAd,
  mobileStickyMode = "fixed",
  hideMobileVideoMock = false,
  showDesktopRails = false,
  showMobilePrerollSlot = false,
  containerClassName,
}) {
  const { vp, width: viewportWidth } = usePreviewViewport()
  const isMobile = vp === "mobile"
  const mobilePadding = isMobile
    ? mobileStickyMode === "fixed"
      ? "pb-[124px]"
      : "pb-[84px]"
    : "pb-14"
  const containerBg = containerClassName || (isMobile ? "bg-white" : "bg-neutral-50")
  const containerOverflow = !isMobile && showDesktopRails ? "" : "overflow-x-hidden"

  return (
    <div className={["w-full", containerOverflow, containerBg].filter(Boolean).join(" ")}>
      <div className="sticky top-0 z-40">
        <div className="bg-neutral-900 text-neutral-100 w-full">
          <div
            className={[
              "px-4 py-2 flex items-center gap-3 overflow-hidden",
              isMobile ? "w-full max-w-full" : "w-full",
            ].join(" ")}
          >
            <div className="h-5 w-5 rounded bg-neutral-700" />
            <div className="flex gap-2 items-center">
              <div className="h-[10px] w-[90px] rounded-full bg-neutral-700" />
              <div className="h-[10px] w-[110px] rounded-full bg-neutral-700" />
              <div className="h-[10px] w-[130px] rounded-full bg-neutral-700" />
              <div className="h-[10px] w-[150px] rounded-full bg-neutral-700" />
              <div className="h-[10px] w-[120px] rounded-full bg-neutral-700" />
            </div>
          </div>
        </div>
      </div>

      {vp === "desktop" && (
        <div className="mx-auto max-w-[1070px] py-3">
          <div className="w-full flex items-center justify-center">
            <div className="h-[90px] w-full max-w-[1000px] rounded-md border border-neutral-200 bg-white px-2 py-1 overflow-hidden">
              <div className="h-full w-full flex items-center justify-center overflow-hidden">
                <AdSlot slotId="top_1070x27" renderAd={renderAd}>
                  <Block h={90} w="100%" r={6} />
                </AdSlot>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isMobile && showDesktopRails && (
        <DesktopSiteRails renderAd={renderAd} viewportWidth={viewportWidth} />
      )}

      <main
        className={[
          "mx-auto pt-4",
          isMobile ? "w-full max-w-full px-4 overflow-x-hidden" : "max-w-[1070px] px-0",
          mobilePadding,
        ].join(" ")}
      >
        <div
          className={
            isMobile
              ? "grid grid-cols-1 min-w-0"
              : "grid grid-cols-1 min-w-0 lg:grid-cols-[730px_320px] lg:gap-5"
          }
        >
          <article className="pt-2 min-w-0 w-full max-w-full overflow-x-hidden">
            {isMobile ? (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <Block h={10} w={110} r={999} />
                  <div className="h-2 w-2 rounded-full bg-neutral-200" />
                  <Block h={10} w={90} r={999} />
                  <div className="h-2 w-2 rounded-full bg-neutral-200" />
                  <Block h={10} w={130} r={999} />
                </div>

                <div className="grid gap-3">
                  <Block h={22} w="96%" r={10} />
                  <Block h={22} w="92%" r={10} />
                  <Block h={22} w="88%" r={10} />
                </div>

                <div className="mt-4 grid gap-2">
                  <Block h={12} w="94%" r={8} className="bg-neutral-300" />
                  <Block h={12} w="88%" r={8} className="bg-neutral-300" />
                </div>

                <div className="mt-4 grid gap-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-[5px] h-2.5 w-2.5 rounded-full bg-neutral-500" />
                    <Block h={12} w="84%" r={8} className="bg-neutral-400" />
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="mt-[5px] h-2.5 w-2.5 rounded-full bg-neutral-500" />
                    <Block h={12} w="72%" r={8} className="bg-neutral-400" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <Block h={10} w={120} r={999} />
                  <div className="h-2 w-2 rounded-full bg-neutral-300" />
                  <Block h={10} w={92} r={999} />
                  <div className="h-2 w-2 rounded-full bg-neutral-300" />
                  <Block h={10} w={140} r={999} />
                </div>

                <div className="grid gap-2.5">
                  <Block h={26} w="99%" r={10} className="bg-neutral-300" />
                  <Block h={26} w="95%" r={10} className="bg-neutral-300" />
                  <Block h={26} w="78%" r={10} className="bg-neutral-300" />
                </div>

                <div className="mt-4 grid gap-2">
                  <Block h={12} w="94%" r={8} className="bg-neutral-300" />
                  <Block h={12} w="88%" r={8} className="bg-neutral-300" />
                </div>

                <div className="mt-4 grid gap-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-[5px] h-2.5 w-2.5 rounded-full bg-neutral-500" />
                    <Block h={12} w="84%" r={8} className="bg-neutral-400" />
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="mt-[5px] h-2.5 w-2.5 rounded-full bg-neutral-500" />
                    <Block h={12} w="70%" r={8} className="bg-neutral-400" />
                  </div>
                </div>
              </>
            )}

            <div className="mt-4 rounded-lg bg-neutral-200" style={{ height: isMobile ? 220 : 420 }} />

            {isMobile && (
              <>
                <div className="mt-5 grid gap-3">
                  <Lines n={5} />
                </div>

                {showMobilePrerollSlot && (
                  <div className="mt-6">
                    <AdSlot slotId="mobile_preroll" renderAd={renderAd}>
                      <div className="w-full rounded bg-neutral-200" style={{ aspectRatio: "16 / 9" }} />
                    </AdSlot>
                  </div>
                )}

                <div className="mt-6 flex justify-center">
                  <AdSlot slotId="mobile_inline_300x250_1" renderAd={renderAd}>
                    <div className="w-[300px] h-[250px] rounded bg-neutral-200" />
                  </AdSlot>
                </div>

                <div className="mt-6 grid gap-3">
                  <Lines n={6} />
                  <Lines n={5} />
                </div>

                {!hideMobileVideoMock && (
                  <div className="mt-6">
                    <MobileVideoMock />
                  </div>
                )}

                <div className="mt-6 flex justify-center">
                  <AdSlot slotId="mobile_inline_300x250_2" renderAd={renderAd}>
                    <div className="w-[300px] h-[250px] rounded bg-neutral-200" />
                  </AdSlot>
                </div>

                <div className="mt-5 grid gap-3">
                  <Lines n={6} />
                </div>

                <div className="mt-6 grid gap-3">
                  <Lines n={6} />
                  <Lines n={5} />
                </div>

                <div className="mt-6 flex justify-center">
                  <AdSlot slotId="mobile_inline_300x600" renderAd={renderAd}>
                    <div className="w-[300px] h-[600px] rounded bg-neutral-200" />
                  </AdSlot>
                </div>

                <MobileSummary />

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <Block h={14} w={180} r={10} />
                    <Block h={10} w={80} r={999} />
                  </div>

                  <div className="grid gap-4">
                    <MiniLinkRow />
                    <MiniLinkRow />
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  <Lines n={7} />
                  <Lines n={6} />
                </div>

                <div className="mt-7 border border-neutral-200 rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-neutral-200" />
                      <div className="grid gap-2">
                        <Block h={12} w={160} r={8} />
                        <Block h={10} w={110} r={8} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-neutral-200" />
                      <div className="h-8 w-8 rounded bg-neutral-200" />
                      <div className="h-8 w-8 rounded bg-neutral-200" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Lines n={5} />
                  </div>
                </div>

                <div className="mt-7 border-l-4 border-neutral-200 bg-neutral-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Block h={14} w={140} r={10} />
                    <Block h={10} w={70} r={999} />
                  </div>
                  <Lines n={6} />
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-between mb-3">
                    <Block h={14} w={160} r={10} />
                    <Block h={10} w={90} r={999} />
                  </div>

                  <div className="grid gap-5">
                    <div className="grid grid-cols-[120px_1fr] gap-4 items-start border border-neutral-200 rounded-lg p-3 bg-white">
                      <Block h={78} w={120} r={10} />
                      <div className="grid gap-2">
                        <Block h={12} w="92%" r={8} />
                        <Block h={10} w="70%" r={8} />
                        <Block h={10} w="84%" r={8} />
                      </div>
                    </div>

                    <div className="grid grid-cols-[120px_1fr] gap-4 items-start border border-neutral-200 rounded-lg p-3 bg-white">
                      <Block h={78} w={120} r={10} />
                      <div className="grid gap-2">
                        <Block h={12} w="88%" r={8} />
                        <Block h={10} w="72%" r={8} />
                        <Block h={10} w="80%" r={8} />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {!isMobile && (
              <>
                <div className="mt-5 grid gap-3">
                  <Lines n={6} />
                  <Lines n={7} />
                </div>

                <div className="mt-6 rounded-lg bg-neutral-200 h-[320px]" />

                <div className="mt-5 grid gap-3">
                  <Lines n={7} />
                  <Lines n={6} />
                </div>

                <div className="mt-6 border border-neutral-200 bg-neutral-50 rounded-lg p-3">
                  <div className="h-3 w-24 rounded bg-neutral-200 mb-2 mx-auto" />
                  <div className="flex justify-center">
                    <AdSlot slotId="inline_preroll_730x330" renderAd={renderAd}>
                      <div className="h-[250px] w-[300px] rounded bg-neutral-200" />
                    </AdSlot>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  <Lines n={3} />
                </div>

                <div className="mt-6 h-[600px] w-full rounded-lg border border-neutral-300 bg-white p-5">
                  <div className="h-full w-full rounded border border-dashed border-neutral-300 bg-neutral-100 flex flex-col items-center justify-center gap-4">
                    <Block h={16} w="58%" r={8} className="bg-neutral-400" />
                    <Block h={12} w="46%" r={8} className="bg-neutral-400" />
                    <Block h={10} w="40%" r={8} className="bg-neutral-500" />
                  </div>
                </div>

                <div className="mt-6">
                  <Block h={24} w="70%" r={8} className="bg-neutral-300" />
                </div>

                <div className="mt-6 flex justify-center">
                  <AdSlot slotId="inline_300x600" renderAd={renderAd}>
                    <div className="h-[600px] w-[300px] rounded border border-neutral-300 bg-neutral-200" />
                  </AdSlot>
                </div>

                <div className="mt-6 grid gap-2">
                  <LinkPlaceholder w="86%" />
                  <LinkPlaceholder w="74%" />
                </div>

                <div className="mt-6 grid gap-3">
                  <Lines n={6} />
                  <Lines n={5} />
                </div>

                <div className="mt-6">
                  <Block h={20} w="52%" r={8} className="bg-neutral-300" />
                </div>

                <div className="mt-4 grid gap-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-[5px] h-2.5 w-2.5 rounded-full bg-neutral-500" />
                    <Block h={12} w="84%" r={8} className="bg-neutral-400" />
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="mt-[5px] h-2.5 w-2.5 rounded-full bg-neutral-500" />
                    <Block h={12} w="72%" r={8} className="bg-neutral-400" />
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <AdSlot slotId="inline_300x250_3" renderAd={renderAd}>
                    <div className="h-[250px] w-[300px] rounded border border-neutral-300 bg-neutral-200" />
                  </AdSlot>
                </div>

                <div className="mt-6 grid gap-4">
                  <div className="grid grid-cols-[124px_1fr] gap-4 items-start border border-neutral-200 rounded-lg p-3 bg-white">
                    <div className="h-[86px] w-[124px] rounded bg-neutral-200" />
                    <div className="grid gap-2 pt-1">
                      <Block h={12} w="92%" r={8} />
                      <Block h={10} w="78%" r={8} />
                      <Block h={10} w="84%" r={8} />
                    </div>
                  </div>
                  <div className="grid grid-cols-[124px_1fr] gap-4 items-start border border-neutral-200 rounded-lg p-3 bg-white">
                    <div className="h-[86px] w-[124px] rounded bg-neutral-200" />
                    <div className="grid gap-2 pt-1">
                      <Block h={12} w="90%" r={8} />
                      <Block h={10} w="74%" r={8} />
                      <Block h={10} w="80%" r={8} />
                    </div>
                  </div>
                </div>

                <div className="mt-7">
                  <Block h={20} w="48%" r={8} className="bg-neutral-300" />
                  <div className="mt-3 grid gap-2">
                    <LinkPlaceholder w="82%" />
                    <LinkPlaceholder w="76%" />
                    <LinkPlaceholder w="68%" />
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <Block h={14} w={180} r={10} />
                    <Block h={10} w={80} r={999} />
                  </div>

                  <div className="grid gap-4">
                    <MiniLinkRow />
                    <MiniLinkRow />
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  <Lines n={7} />
                  <Lines n={6} />
                </div>
              </>
            )}
          </article>

          <aside className={isMobile ? "hidden" : "pt-2 hidden lg:block min-w-0"}>
            <div className="border border-neutral-200 bg-neutral-50 rounded-lg p-3">
              <div className="h-3 w-20 rounded bg-neutral-200 mb-2" />
              <AdSlot slotId="sidebar_300x250_1" renderAd={renderAd}>
                <div className="h-[250px] rounded bg-neutral-200" />
              </AdSlot>
            </div>

            <div className="mt-6">
              <SidebarBox />
            </div>

            <div className="mt-6 border border-neutral-200 bg-neutral-50 rounded-lg p-3">
              <div className="h-3 w-20 rounded bg-neutral-200 mb-2" />
              <AdSlot slotId="sidebar_300x250_2" renderAd={renderAd}>
                <div className="h-[250px] rounded bg-neutral-200" />
              </AdSlot>
            </div>

            <div className="mt-6">
              <SidebarBox />
            </div>
          </aside>
        </div>
      </main>

      {isMobile && <MobileStickyBottom renderAd={renderAd} mode={mobileStickyMode} />}
    </div>
  )
}

function LinkPlaceholder({ w = "88%" }) {
  return (
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      aria-label="Related article link"
      className="block"
    >
      <span className="block h-[11px] rounded bg-neutral-300" style={{ width: w }} />
    </a>
  )
}
