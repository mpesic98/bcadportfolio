import { Link } from "react-router-dom"
import { useState } from "react"
import { assetLooksLikeVideo } from "../../features/proposals/creativeResolver"

function hexToRgba(hex, alpha) {
  const normalized = String(hex || "").replace("#", "")
  if (![3, 6].includes(normalized.length)) return `rgba(255,255,255,${alpha})`

  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((chunk) => chunk + chunk)
          .join("")
      : normalized

  const numeric = Number.parseInt(value, 16)
  if (Number.isNaN(numeric)) return `rgba(255,255,255,${alpha})`

  const r = (numeric >> 16) & 255
  const g = (numeric >> 8) & 255
  const b = numeric & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function formatDateLabel(value) {
  if (!value) return "No expiry"

  const parsed = new Date(`${value}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return value

  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function Tag({ children }) {
  return (
    <span className="rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-white/72">
      {children}
    </span>
  )
}

function MetricCard({ label, value, accent }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <div
        className="h-1.5 w-16 rounded-full"
        style={{ backgroundColor: accent || "#D7FF64" }}
      />
      <p className="mt-4 text-[11px] uppercase tracking-[0.28em] text-white/46">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
    </div>
  )
}

function SnippetPreview({
  assetUrl,
  title,
  brandName,
  compact = false,
  allowVideo = false,
}) {
  if (!assetUrl) {
    return (
      <div className="flex h-full min-h-[88px] items-center justify-center rounded-2xl bg-[#EEF3F8] text-center text-[#65758B]">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em]">Creative pending</p>
          {!compact ? <p className="mt-2 text-sm font-medium">{title}</p> : null}
        </div>
      </div>
    )
  }

  const isVideo = assetLooksLikeVideo(assetUrl)

  if (isVideo && allowVideo) {
    return (
      <video
        src={assetUrl}
        className="h-full w-full rounded-2xl object-cover"
        autoPlay
        muted
        loop
        playsInline
        controls={!compact}
      />
    )
  }

  if (isVideo) {
    return (
      <div className="flex h-full min-h-[88px] items-center justify-center rounded-2xl bg-[#0F172A] px-4 text-center text-white">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-white/66">
            Video creative
          </p>
          <p className="mt-2 text-sm font-medium">{brandName}</p>
        </div>
      </div>
    )
  }

  return (
    <img
      src={assetUrl}
      alt={title}
      className="h-full w-full rounded-2xl object-cover"
    />
  )
}

function MockupStage({
  format,
  campaign,
  previewAsset,
  detail = false,
}) {
  const theme = campaign?.theme || {}
  const brandName = campaign?.brandName || "Campaign"

  return (
    <div
      className="relative overflow-hidden rounded-[28px] border border-[#D9E3EC] bg-[#F7FAFD] shadow-[0_24px_70px_rgba(6,12,22,0.08)]"
      style={{
        backgroundImage: `
          radial-gradient(500px circle at 0% 0%, ${hexToRgba(theme.secondary, 0.12)}, transparent 60%),
          radial-gradient(440px circle at 100% 0%, ${hexToRgba(theme.primary, 0.14)}, transparent 58%),
          linear-gradient(180deg, #F7FAFD, #F1F5F9)
        `,
      }}
    >
      <img
        src={format.mockupUrl || format.fallbackImage}
        alt={`${format.name} mockup`}
        className="h-full w-full object-cover"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 md:p-5">
        <div className="rounded-full border border-[#D8E3ED] bg-white/94 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-[#435168] shadow-sm">
          Format mockup
        </div>
        <div
          className="rounded-full border bg-white/94 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-[#1E293B] shadow-sm"
          style={{
            borderColor: hexToRgba(theme.primary, 0.28),
            boxShadow: `0 10px 30px ${hexToRgba(theme.primary, 0.12)}`,
          }}
        >
          Branded for {brandName}
        </div>
      </div>

      <div
        className={[
          "absolute right-4 rounded-[24px] border border-[#D8E3ED] bg-white/96 p-2.5 shadow-[0_22px_40px_rgba(10,16,26,0.14)] backdrop-blur",
          detail ? "bottom-5 w-[260px] md:w-[300px]" : "bottom-4 w-[152px] md:w-[168px]",
        ].join(" ")}
      >
        <p className="px-1 text-[10px] uppercase tracking-[0.24em] text-[#66768D]">
          Campaign creative
        </p>
        <div className={detail ? "mt-2 h-[176px]" : "mt-2 h-[92px]"}>
          <SnippetPreview
            assetUrl={previewAsset}
            title={`${format.name} creative`}
            brandName={brandName}
            compact={!detail}
            allowVideo={detail}
          />
        </div>
      </div>

      <div
        className="absolute bottom-4 left-4 h-1.5 w-24 rounded-full"
        style={{ backgroundColor: theme.primary || "#D7FF64" }}
      />
    </div>
  )
}

function DetailSection({ label, children }) {
  return (
    <section>
      <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
        {label}
      </p>
      <div className="mt-3 text-sm leading-6 text-white/68">{children}</div>
    </section>
  )
}

export default function ProposalPresentation({
  proposalPayload,
  headerActions = null,
  buildLivePreviewHref = null,
}) {
  const [openFormatId, setOpenFormatId] = useState(null)

  const proposal = proposalPayload?.proposal || null
  const campaign = proposalPayload?.campaign || null
  const visibleFormats = proposalPayload?.visibleFormats || []
  const theme = campaign?.theme || {}

  const activeFormat = visibleFormats.find((format) => format.id === openFormatId) || null

  return (
    <div
      className="min-h-full rounded-[30px] border border-white/10 bg-[#0B111B] text-white"
      style={{
        backgroundImage: `
          radial-gradient(980px circle at 0% 0%, ${hexToRgba(theme.secondary, 0.14)}, transparent 58%),
          radial-gradient(900px circle at 100% 10%, ${hexToRgba(theme.primary, 0.18)}, transparent 60%),
          linear-gradient(180deg, rgba(7,12,20,0.98), rgba(10,15,24,0.98))
        `,
      }}
    >
      <section className="border-b border-white/10 px-5 py-6 md:px-8 md:py-8">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[28px] border border-white/10 bg-white/6 p-5 md:p-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/46">
              Better Collective Sports Media Network
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              {campaign?.logoUrl ? (
                <div className="flex h-18 items-center rounded-[22px] border border-white/10 bg-white px-5 py-4 shadow-xl shadow-black/20">
                  <img
                    src={campaign.logoUrl}
                    alt={`${campaign.brandName} logo`}
                    className="max-h-11 w-auto object-contain"
                  />
                </div>
              ) : null}

              <div className="min-w-0">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-white/54">
                  {campaign?.brandName || "Campaign"} proposal
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  {proposal?.title || proposal?.name}
                </h1>
              </div>
            </div>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/66 md:text-base">
              {proposal?.description || campaign?.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Tag>{proposal?.status || "draft"}</Tag>
              <Tag>{formatDateLabel(proposal?.expiresAt)}</Tag>
              <Tag>{visibleFormats.length} formats</Tag>
              <Tag>{(proposal?.visibleSites || []).length || "All"} sites</Tag>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              <MetricCard
                label="Format mix"
                value={visibleFormats.length}
                accent={theme.primary}
              />
              <MetricCard
                label="Site reach"
                value={(proposal?.visibleSites || []).length || "All"}
                accent={theme.secondary}
              />
              <MetricCard
                label="Brand"
                value={campaign?.brandName || "N/A"}
                accent={theme.primary}
              />
            </div>

            {headerActions ? (
              <div className="flex flex-wrap gap-2 rounded-[24px] border border-white/10 bg-white/5 p-4">
                {headerActions}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="px-5 py-6 md:px-8 md:py-8">
        <div className="mb-7 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
              Format grid
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              Curated advertising opportunities
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/56">
            Each card stays visually consistent around the format itself, while
            the proposal is customized through restrained campaign badging and
            creative accents.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {visibleFormats.map((format) => (
            <article
              key={format.id}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-white/6 shadow-xl shadow-black/15 transition-transform hover:-translate-y-0.5"
            >
              <button
                type="button"
                onClick={() => setOpenFormatId(format.id)}
                className="block w-full text-left"
              >
                <div className="aspect-[16/10] p-3 md:p-4">
                  <MockupStage
                    format={format}
                    campaign={campaign}
                    previewAsset={format.previewAsset}
                  />
                </div>
              </button>

              <div className="space-y-4 px-5 pb-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                      {format.categoryLabel}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      {format.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenFormatId(format.id)}
                    className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-white/78 transition-colors hover:bg-white/9 hover:text-white"
                  >
                    View format
                  </button>
                </div>

                <p className="text-sm leading-6 text-white/62">
                  {format.description}
                </p>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {(format.proposalSites.length
                      ? format.proposalSites.slice(0, 2)
                      : [{ id: "network", name: "Network-wide" }]
                    ).map((site) => (
                      <span
                        key={site.id}
                        className="rounded-full bg-white/8 px-3 py-1.5 text-sm text-white/72"
                      >
                        {site.name}
                      </span>
                    ))}
                    {format.proposalSites.length > 2 ? (
                      <span className="rounded-full bg-white/8 px-3 py-1.5 text-sm text-white/56">
                        +{format.proposalSites.length - 2} more
                      </span>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenFormatId(format.id)}
                    className="text-sm font-medium"
                    style={{ color: theme.primary || "#D7FF64" }}
                  >
                    Explore format {"->"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {activeFormat ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
          <button
            type="button"
            aria-label="Close format detail"
            onClick={() => setOpenFormatId(null)}
            className="absolute inset-0 bg-[#04070C]/76"
          />

          <section className="relative z-10 grid w-full max-w-[1240px] overflow-hidden rounded-[32px] border border-white/10 bg-[#09101A] shadow-2xl shadow-black/40 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="bg-[#EEF3F8]">
              <div className="p-4 md:p-6">
                <MockupStage
                  format={activeFormat}
                  campaign={campaign}
                  previewAsset={activeFormat.previewAsset}
                  detail
                />
              </div>

              <div className="border-t border-[#D5DEE8] bg-white/92 p-5 md:p-6">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#66768D]">
                  Campaign creative
                </p>
                <div className="mt-3 h-[220px] overflow-hidden rounded-[26px] border border-[#D8E3ED] bg-[#EDF2F7] shadow-[0_18px_36px_rgba(9,17,27,0.08)]">
                  <SnippetPreview
                    assetUrl={activeFormat.previewAsset}
                    title={`${activeFormat.name} creative detail`}
                    brandName={campaign?.brandName || "Campaign"}
                    allowVideo
                  />
                </div>
              </div>
            </div>

            <div className="flex max-h-[88vh] flex-col overflow-y-auto p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">
                    Format detail
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold text-white">
                    {activeFormat.name}
                  </h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.24em] text-white/52">
                    {activeFormat.categoryLabel}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenFormatId(null)}
                  className="rounded-full border border-white/12 bg-white/6 px-3 py-2 text-sm text-white/74 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 space-y-7">
                <DetailSection label="Description">
                  <p>{activeFormat.description}</p>
                </DetailSection>

                <DetailSection label="Specs">
                  <ul className="space-y-2">
                    {activeFormat.sizes.map((size) => (
                      <li key={size}>{size}</li>
                    ))}
                  </ul>
                </DetailSection>

                <DetailSection label="Available sites">
                  <ul className="space-y-2">
                    {(activeFormat.proposalSites.length
                      ? activeFormat.proposalSites
                      : [{ id: "network", name: "Network-wide" }]
                    ).map((site) => (
                      <li key={site.id}>{site.name}</li>
                    ))}
                  </ul>
                </DetailSection>

                <DetailSection label="Supported creative types">
                  <ul className="space-y-2">
                    {activeFormat.creativeTypes.map((creativeType) => (
                      <li key={creativeType}>{creativeType}</li>
                    ))}
                  </ul>
                </DetailSection>

                <DetailSection label="Creative guidelines">
                  <ul className="space-y-2">
                    {activeFormat.creativeGuidelines.map((guideline) => (
                      <li key={guideline}>{guideline}</li>
                    ))}
                  </ul>
                </DetailSection>
              </div>

              {buildLivePreviewHref ? (
                <div className="mt-auto pt-8">
                  <Link
                    to={buildLivePreviewHref(activeFormat)}
                    className="inline-flex rounded-full px-5 py-3 text-sm font-medium text-[#07111F]"
                    style={{ backgroundColor: theme.primary || "#D7FF64" }}
                  >
                    Open full placement preview
                  </Link>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  )
}
