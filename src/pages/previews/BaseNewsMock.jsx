function Block({ h = 12, w = "100%", r = 8, className = "" }) {
  return <div className={`bg-neutral-200 ${className}`} style={{ height: h, width: w, borderRadius: r }} />
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

function TopItem({ index }) {
  return (
    <div className="grid grid-cols-[28px_56px_1fr] gap-3 items-start">
      <div className="h-6 w-7 rounded bg-neutral-200 flex items-center justify-center text-[11px] text-neutral-500">{index}</div>
      <div className="h-14 w-14 rounded bg-neutral-200" />
      <div className="grid gap-2">
        <Block h={12} w="85%" r={8} />
        <Block h={10} w="70%" r={8} />
      </div>
    </div>
  )
}

export default function BaseNewsMock() {
  return (
    <div className="bg-white grayscale saturate-0">
      <div className="bg-neutral-900 text-neutral-100">
        <div className="w-full px-4 py-2 flex items-center gap-3 overflow-hidden">
          <div className="h-5 w-5 rounded bg-neutral-700" />
          <div className="flex gap-2 items-center">
            <Block h={10} w={90} r={999} className="bg-neutral-700" />
            <Block h={10} w={110} r={999} className="bg-neutral-700" />
            <Block h={10} w={130} r={999} className="bg-neutral-700" />
            <Block h={10} w={150} r={999} className="bg-neutral-700" />
            <Block h={10} w={120} r={999} className="bg-neutral-700" />
          </div>
        </div>
      </div>

      <header className="border-b border-neutral-200">
        <div className="w-full px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-36 rounded bg-neutral-200" />
            <div className="h-6 w-16 rounded bg-neutral-200" />
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Block h={12} w={90} r={999} />
            <Block h={12} w={110} r={999} />
            <Block h={12} w={120} r={999} />
            <Block h={12} w={95} r={999} />
            <Block h={12} w={140} r={999} />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded bg-neutral-200" />
            <div className="h-9 w-9 rounded bg-neutral-200" />
          </div>
        </div>

        <div className="bg-neutral-100">
          <div className="w-full px-4 py-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Block h={10} w={70} r={999} />
              <Block h={10} w={90} r={999} />
              <Block h={10} w={80} r={999} />
              <Block h={10} w={110} r={999} />
              <Block h={10} w={95} r={999} />
            </div>
            <Block h={10} w={120} r={999} />
          </div>
        </div>
      </header>

      <div className="w-full px-4 py-3">
        <div className="border border-neutral-200 bg-neutral-50 rounded-lg p-3 flex items-center justify-center">
          <div className="w-full max-w-[970px]">
            <div className="h-3 w-24 rounded bg-neutral-200 mb-2 mx-auto" />
            <div className="h-20 rounded bg-neutral-200" />
          </div>
        </div>
      </div>

      <main className="w-full px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          <article className="pt-2">
            <div className="flex items-center gap-2 mb-3">
              <Block h={10} w={90} r={999} />
              <div className="h-2 w-2 rounded-full bg-neutral-200" />
              <Block h={10} w={120} r={999} />
            </div>

            <div className="grid gap-3">
              <Block h={18} w="92%" r={10} />
              <Block h={18} w="88%" r={10} />
              <Block h={18} w="70%" r={10} />
            </div>

            <div className="mt-4 grid gap-2">
              <Block h={12} w="78%" r={8} />
              <Block h={12} w="82%" r={8} />
            </div>

            <div className="mt-5 rounded-lg bg-neutral-200 h-[420px]" />

            <div className="mt-5 grid gap-3">
              <Lines n={6} />
              <div className="border-l-4 border-neutral-200 pl-4 py-2">
                <Lines n={4} />
              </div>
              <Lines n={7} />
            </div>

            <div className="mt-6 border border-neutral-200 bg-neutral-50 rounded-lg p-3">
              <div className="h-3 w-24 rounded bg-neutral-200 mb-2" />
              <div className="h-40 rounded bg-neutral-200" />
            </div>

            <div className="mt-6 grid gap-3">
              <Lines n={7} />
              <Lines n={6} />
            </div>
          </article>

          <aside className="pt-2">
            <div className="border border-neutral-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <Block h={14} w={140} r={10} />
                <Block h={10} w={60} r={999} />
              </div>
              <div className="grid gap-4">
                <TopItem index={1} />
                <TopItem index={2} />
                <TopItem index={3} />
                <TopItem index={4} />
                <TopItem index={5} />
              </div>
            </div>

            <div className="mt-6 border border-neutral-200 bg-neutral-50 rounded-lg p-3">
              <div className="h-3 w-24 rounded bg-neutral-200 mb-2" />
              <div className="h-64 rounded bg-neutral-200" />
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
