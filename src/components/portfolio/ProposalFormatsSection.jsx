import { useState } from "react"
import FormatCard from "./FormatCard"
import FormatPreviewModal from "./FormatPreviewModal"

export default function ProposalFormatsSection({ proposal }) {
  const [selectedFormat, setSelectedFormat] = useState(null)
  const siteNames = (proposal.sites || []).map((site) => site.name || site.id || site).join(" · ")

  return (
    <>
      <section id="proposal-formats">
        <div className="mb-7 grid gap-5 border-b border-white/10 pb-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--bc-green-soft)]">
              {proposal.advertiser}{proposal.market ? ` · ${proposal.market}` : ""}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              {proposal.title}
            </h2>
            {proposal.description ? (
              <p className="mt-3 max-w-[760px] text-sm leading-relaxed text-white/62 md:text-base">
                {proposal.description}
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {siteNames ? <span className="bc-pill bc-pill--glass">{siteNames}</span> : null}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {proposal.formats.map((format) => (
            <FormatCard key={format.id} format={format} onOpen={setSelectedFormat} />
          ))}
        </div>
      </section>

      {selectedFormat ? (
        <FormatPreviewModal format={selectedFormat} onClose={() => setSelectedFormat(null)} />
      ) : null}
    </>
  )
}
