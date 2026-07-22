import InstreamPlayerCreative from "./InstreamPlayerCreative"
import { usePreviewViewport } from "./previewViewport.jsx"

function Recommendation({ index }) {
  return (
    <div className="grid grid-cols-[168px_1fr] gap-2.5">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-neutral-700 to-neutral-900">
        <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-[9px] text-white">{8 + index}:2{index}</div>
      </div>
      <div className="min-w-0 py-0.5">
        <div className="h-2.5 w-full rounded bg-neutral-700" />
        <div className="mt-2 h-2.5 w-4/5 rounded bg-neutral-700" />
        <p className="mt-2 text-[10px] text-neutral-500">Cracks · {120 + index * 34}K views</p>
      </div>
    </div>
  )
}

function YouTubeHeader({ mobile }) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-white/5 bg-[#0f0f0f] px-4 text-white">
      <span className="text-xl" aria-hidden="true">☰</span>
      <div className="flex items-center gap-1.5 font-semibold">
        <span className="grid h-5 w-7 place-items-center rounded-md bg-red-600 text-[10px]">▶</span>
        <span>YouTube</span>
      </div>
      {!mobile ? (
        <div className="mx-auto flex h-9 w-full max-w-[520px] overflow-hidden rounded-full border border-neutral-700 bg-[#121212]">
          <div className="flex flex-1 items-center px-4 text-sm text-neutral-500">Search</div>
          <div className="grid w-14 place-items-center border-l border-neutral-700 bg-neutral-800">⌕</div>
        </div>
      ) : <div className="flex-1" />}
      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[var(--bc-green-soft)] to-[var(--bc-green)]" />
    </header>
  )
}

export default function YouTubeWatchMock({ spec }) {
  const { vp, height: viewportHeight } = usePreviewViewport()
  const mobile = vp === "mobile"
  const mockHeight = mobile
    ? viewportHeight
    : "calc(100dvh - var(--preview-header-height, 72px))"

  return (
    <div className="overflow-hidden bg-[#0f0f0f] text-white" style={{ height: mockHeight }}>
      <YouTubeHeader mobile={mobile} />
      <div className={mobile
        ? "overflow-hidden pb-6"
        : "mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1fr)_360px] gap-6 overflow-hidden px-5 py-5"}
        style={{ height: "calc(100% - 3.5rem)" }}
      >
        <section aria-label="YouTube watch page">
          <div className={mobile ? "w-full" : "overflow-hidden rounded-xl"}>
            <InstreamPlayerCreative spec={spec} compact />
          </div>
          <div className={mobile ? "px-4 pt-4" : "pt-4"}>
            <h1 className="text-base font-semibold leading-6 md:text-lg">
              The stories, skills and moments shaping world football
            </h1>
            <p className="mt-1 text-xs text-neutral-400">482K views · Cracks</p>
            <div className="mt-4 flex items-center justify-between gap-3 border-y border-white/10 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red-600 text-xs font-bold">C</div>
                <div className="min-w-0">
                  <p className="font-semibold">Cracks</p>
                  <p className="text-xs text-neutral-500">Global football culture</p>
                </div>
              </div>
              <button type="button" className="rounded-full bg-white px-4 py-2 text-xs font-bold text-black">Subscribe</button>
            </div>
            <div className="mt-4 rounded-xl bg-[#272727] p-4 text-sm text-neutral-300">
              Premium football stories, interviews and original entertainment from the Cracks channel.
            </div>
          </div>
        </section>

        {!mobile ? (
          <aside className="space-y-3" aria-label="Recommended videos">
            <div className="mb-4 flex gap-2">
              <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black">All</span>
              <span className="rounded-lg bg-neutral-800 px-3 py-1.5 text-xs text-white">Football</span>
            </div>
            {Array.from({ length: 6 }).map((_, index) => <Recommendation key={index} index={index + 1} />)}
          </aside>
        ) : null}
      </div>
    </div>
  )
}
