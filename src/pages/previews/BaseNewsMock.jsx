import AdSlot from "../../components/previews/AdSlot"

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

function SidebarBox({ title }) {
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

export default function BaseNewsMock({ renderAd }) {
  return (
    <div className="bg-white">
      <div className="sticky top-[72px] z-40">
        <div className="bg-neutral-900 text-neutral-100 w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <div className="mx-auto max-w-[1100px] px-4 py-2 flex items-center gap-3 overflow-hidden">
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

      <div className="mx-auto max-w-[1100px] px-4 pt-3">
        <div className="w-full flex items-center justify-center">
          <div className="w-[1070px] max-w-full">
            <AdSlot slotId="top_1070x27" renderAd={renderAd}>
              <Block h={27} w="100%" r={6} />
            </AdSlot>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1100px] px-4 pb-14 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          <article className="pt-2">
            <div className="flex items-center gap-2 mb-3">
              <Block h={10} w={110} r={999} />
              <div className="h-2 w-2 rounded-full bg-neutral-200" />
              <Block h={10} w={90} r={999} />
              <div className="h-2 w-2 rounded-full bg-neutral-200" />
              <Block h={10} w={130} r={999} />
            </div>

            <div className="grid gap-3">
              <Block h={18} w="94%" r={10} />
              <Block h={18} w="90%" r={10} />
              <Block h={18} w="72%" r={10} />
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Block h={10} w={120} r={999} />
                <Block h={10} w={80} r={999} />
                <Block h={10} w={90} r={999} />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-neutral-200" />
                <div className="h-8 w-8 rounded bg-neutral-200" />
                <div className="h-8 w-8 rounded bg-neutral-200" />
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-neutral-200 h-[420px]" />

            <div className="mt-5 grid gap-3">
              <Lines n={6} />
              <Lines n={7} />
            </div>

            <div className="mt-6 rounded-lg bg-neutral-200 h-[320px]" />

            <div className="mt-5 grid gap-3">
              <Lines n={7} />
              <Lines n={6} />
            </div>

            <div className="mt-6 border border-neutral-200 bg-neutral-50 rounded-lg p-3 flex items-center justify-center">
              <div className="w-full max-w-[970px]">
                <div className="h-3 w-24 rounded bg-neutral-200 mb-2 mx-auto" />
                <AdSlot slotId="inline_300x600" renderAd={renderAd}>
                  <div className="h-[250px] rounded bg-neutral-200" />
                </AdSlot>
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

            <div className="mt-6 border border-neutral-200 bg-neutral-50 rounded-lg p-3 flex items-center justify-center">
              <div className="w-full max-w-[970px]">
                <div className="h-3 w-24 rounded bg-neutral-200 mb-2 mx-auto" />
                <AdSlot slotId="inline_300x250_1" renderAd={renderAd}>
                  <div className="h-[250px] rounded bg-neutral-200" />
                </AdSlot>
              </div>
            </div>

            <div className="mt-7">
              <Block h={16} w={140} r={10} />
              <div className="mt-3 grid gap-2">
                <div className="flex items-start gap-2">
                  <div className="mt-[5px] h-2 w-2 rounded-full bg-neutral-200" />
                  <Block h={12} w="86%" r={8} />
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-[5px] h-2 w-2 rounded-full bg-neutral-200" />
                  <Block h={12} w="78%" r={8} />
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-[5px] h-2 w-2 rounded-full bg-neutral-200" />
                  <Block h={12} w="84%" r={8} />
                </div>
              </div>
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

                <div className="grid grid-cols-[120px_1fr] gap-4 items-start border border-neutral-200 rounded-lg p-3 bg-white">
                  <Block h={78} w={120} r={10} />
                  <div className="grid gap-2">
                    <Block h={12} w="90%" r={8} />
                    <Block h={10} w="68%" r={8} />
                    <Block h={10} w="86%" r={8} />
                  </div>
                </div>
              </div>
            </div>
          </article>

          <aside className="pt-2">
            <div className="border border-neutral-200 bg-neutral-50 rounded-lg p-3">
              <div className="h-3 w-20 rounded bg-neutral-200 mb-2" />
              <AdSlot slotId="sidebar_300x250_1" renderAd={renderAd}>
                <div className="h-[250px] rounded bg-neutral-200" />
              </AdSlot>
            </div>

            <div className="mt-6">
              <SidebarBox title="Top Bolavip" />
            </div>

            <div className="mt-6 border border-neutral-200 bg-neutral-50 rounded-lg p-3">
              <div className="h-3 w-20 rounded bg-neutral-200 mb-2" />
              <AdSlot slotId="sidebar_300x250_2" renderAd={renderAd}>
                <div className="h-[250px] rounded bg-neutral-200" />
              </AdSlot>
            </div>

            <div className="mt-6">
              <SidebarBox title="Apuestas" />
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
