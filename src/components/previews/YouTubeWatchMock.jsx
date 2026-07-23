import InstreamPlayerCreative from "./InstreamPlayerCreative"
import { usePreviewViewport } from "./previewViewport.jsx"
import youtubeLogo from "../../assets/youtube-logo-dark.svg"

const RECOMMENDATION_TITLES = [
  "The goals that changed football history",
  "Inside the world's loudest stadiums",
  "Skills you have to watch twice",
  "The next generation of global stars",
  "Derby day: passion beyond the pitch",
  "Greatest saves of the season",
  "How champions prepare for the final",
  "Football culture around the world",
]

function Recommendation({ index, compact = false }) {
  return (
    <div className={["grid gap-2.5", compact ? "grid-cols-[132px_1fr]" : "grid-cols-[168px_1fr]"].join(" ")}>
      <div className="relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-neutral-500 via-neutral-700 to-neutral-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_32%,rgba(255,255,255,0.22),transparent_20%),linear-gradient(135deg,transparent_48%,rgba(255,255,255,0.12)_49%,transparent_52%)]" />
        <div className="absolute left-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-white/16 text-[10px] font-bold backdrop-blur">C</div>
        <div className="absolute inset-0 grid place-items-center text-xl text-white/85">▶</div>
        <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-[9px] text-white">{8 + index}:2{index}</div>
      </div>
      <div className="min-w-0 py-0.5">
        <p className="line-clamp-2 text-[11px] font-semibold leading-4 text-white">
          {RECOMMENDATION_TITLES[index % RECOMMENDATION_TITLES.length]}
        </p>
        <p className="mt-1 text-[10px] text-neutral-400">Cracks</p>
        <p className="text-[10px] text-neutral-500">{120 + index * 34}K views · 2 days ago</p>
      </div>
    </div>
  )
}

function ActionButton({ icon, label }) {
  return (
    <div aria-hidden="true" className="flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-[#272727] px-3 text-xs font-semibold text-white">
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </div>
  )
}

function YouTubeHeader({ mobile }) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-white/5 bg-[#0f0f0f] px-4 text-white">
      <span className="text-xl" aria-hidden="true">☰</span>
      <img src={youtubeLogo} alt="YouTube" className="h-5 w-auto" />
      {!mobile ? (
        <div className="mx-auto flex h-9 w-full max-w-[520px] overflow-hidden rounded-full border border-neutral-700 bg-[#121212]">
          <div className="flex flex-1 items-center px-4 text-sm text-neutral-500">Search</div>
          <div className="grid w-14 place-items-center border-l border-neutral-700 bg-neutral-800">⌕</div>
        </div>
      ) : (
        <div className="ml-auto flex items-center gap-4">
          <span aria-hidden="true">⌕</span>
          <span aria-hidden="true">⋮</span>
        </div>
      )}
      {!mobile ? <span className="rounded-full bg-[#272727] px-4 py-2 text-xs font-semibold">Create</span> : null}
      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[var(--bc-green-soft)] to-[var(--bc-green)]" />
    </header>
  )
}

export default function YouTubeWatchMock({ spec }) {
  const { vp } = usePreviewViewport()
  const mobile = vp === "mobile"
  const mockHeight = mobile
    ? "100%"
    : "calc(100dvh - var(--preview-header-height, 72px))"

  return (
    <div className="select-none overflow-hidden bg-[#0f0f0f] text-white" style={{ height: mockHeight }}>
      <YouTubeHeader mobile={mobile} />
      <div className={mobile
        ? "overflow-hidden pb-4"
        : "mx-auto grid w-full max-w-[1440px] grid-cols-[minmax(0,1fr)_390px] gap-6 overflow-hidden px-6 py-5"}
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
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red-600 text-xs font-bold">C</div>
                <div className="min-w-0">
                  <p className="font-semibold">Cracks</p>
                  <p className="text-xs text-neutral-500">Global football culture</p>
                </div>
              </div>
              <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-black">Subscribe</span>
            </div>

            <div className="youtube-actions-scroll mt-3 flex gap-2 overflow-hidden">
              <ActionButton icon="＋" label="24K" />
              <ActionButton icon="↗" label="Share" />
              <ActionButton icon="⇩" label="Download" />
              <ActionButton icon="⋯" label="More" />
            </div>

            <div className="mt-3 rounded-xl bg-[#272727] p-3 text-xs leading-5 text-neutral-200">
              <p className="font-semibold text-white">482K views · 2 days ago</p>
              <p>Premium football stories, interviews and original entertainment from the Cracks channel.</p>
            </div>

            <div className="mt-4 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">Comments</p>
                <span className="text-xs text-neutral-500">1,284</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-amber-400 to-red-600" />
                <div className="h-8 flex-1 rounded-full border border-neutral-700 px-3 text-xs leading-8 text-neutral-500">Add a comment...</div>
              </div>
            </div>

            {mobile ? (
              <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Up next</p>
                  <span className="rounded-full bg-[#272727] px-3 py-1 text-[10px]">Autoplay</span>
                </div>
                <Recommendation index={1} compact />
                <Recommendation index={2} compact />
              </div>
            ) : null}
          </div>
        </section>

        {!mobile ? (
          <aside className="space-y-3" aria-label="Recommended videos">
            <div className="mb-4 flex gap-2">
              <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black">All</span>
              <span className="rounded-lg bg-neutral-800 px-3 py-1.5 text-xs text-white">Football</span>
            </div>
            {Array.from({ length: 9 }).map((_, index) => <Recommendation key={index} index={index + 1} />)}
          </aside>
        ) : null}
      </div>
    </div>
  )
}
