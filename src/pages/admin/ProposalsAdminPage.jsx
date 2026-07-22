import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  proposalCategoryCatalog,
  createProposalFormatSelection,
  createProposalFormatSelectionsFromIds,
  proposalFormatCatalog,
  proposalSiteCatalog,
  proposalStatusCatalog,
} from "../../data/proposalFormats"
import { useProposalStore } from "../../features/proposals/ProposalStore"
import { ensureId } from "../../lib/slugify"
import {
  buildPortableProposal,
  DEFAULT_PUBLIC_HERO_VIDEO_URL,
  downloadTextFile,
  validatePortableProposal,
} from "../../features/proposals/portableProposal"
import { buildStandaloneClientHtml } from "../../features/proposals/buildStandaloneClientHtml"

const selectableProposalFormats = proposalFormatCatalog.filter(
  (format) => !["leaderboard", "mrec", "halfpage", "leadgen"].includes(format.id)
)

function createEmptyProposal(defaultCampaignId = "") {
  return {
    id: "",
    campaignId: defaultCampaignId,
    name: "",
    title: "",
    description: "",
    market: "",
    brandLogoUrl: "",
    heroBackgroundVideoUrl: DEFAULT_PUBLIC_HERO_VIDEO_URL,
    fallbackHeroImageUrl: "",
    visibleFormats: [],
    formats: [],
    visibleSites: [],
    visibleCategories: [],
    status: "draft",
    expiresAt: "",
  }
}

function cloneProposal(proposal) {
  const formats = proposal?.formats?.length
    ? proposal.formats.map((format) => ({
        ...format,
        sizes: [...(format.sizes || [])],
        creativeKeys: [...(format.creativeKeys || [])],
        placements: (format.placements || []).map((placement) => ({ ...placement })),
        assets: { ...(format.assets || {}) },
        creatives: (format.creatives || []).map((creative) => ({ ...creative })),
      }))
    : createProposalFormatSelectionsFromIds(proposal?.visibleFormats || [])

  return {
    ...createEmptyProposal(proposal?.campaignId || ""),
    ...proposal,
    visibleFormats: [...(proposal?.visibleFormats || [])],
    formats,
    visibleSites: [...(proposal?.visibleSites || [])],
    visibleCategories: [...(proposal?.visibleCategories || [])],
  }
}

function toggleValue(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

function ChipSelector({ label, selected, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        "bc-pill border transition-colors",
        selected
          ? "border-transparent bg-[var(--bc-green-softest)] text-[var(--bc-green-strong)]"
          : "border-white/10 bg-white/5 text-white/68 hover:bg-white/8 hover:text-white",
      ].join(" ")}
    >
      {label}
    </button>
  )
}

export default function ProposalsAdminPage({ forceNew = false }) {
  const {
    campaigns,
    proposals,
    campaignById,
    isSeededProposal,
    upsertProposal,
    deleteProposal,
  } = useProposalStore()

  const defaultCampaignId = campaigns[0]?.id || ""
  const [selectedProposalId, setSelectedProposalId] = useState("")
  const [form, setForm] = useState(createEmptyProposal(defaultCampaignId))
  const [message, setMessage] = useState("")
  const [idTouched, setIdTouched] = useState(false)

  useEffect(() => {
    if (!forceNew) return
    setSelectedProposalId("")
    setForm(createEmptyProposal(defaultCampaignId))
    setIdTouched(false)
  }, [defaultCampaignId, forceNew])

  useEffect(() => {
    if (!message) return undefined

    const timer = window.setTimeout(() => setMessage(""), 6000)
    return () => window.clearTimeout(timer)
  }, [message])

  const selectProposal = (proposal) => {
    setSelectedProposalId(proposal.id)
    setForm(cloneProposal(proposal))
    setIdTouched(true)
  }

  const resetForm = () => {
    setSelectedProposalId("")
    setForm(createEmptyProposal(defaultCampaignId))
    setIdTouched(false)
  }

  const updateForm = (field, value) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value }

      if (!idTouched && (field === "name" || field === "title")) {
        next.id = ensureId(field === "name" ? value : prev.name)
      }

      return next
    })
  }

  const handleSave = () => {
    if (!form.name || !form.campaignId || !form.formats.length) {
      setMessage("Name, campaign and at least one format are required.")
      return
    }

    const nextProposal = {
      ...form,
      id: ensureId(form.id || form.name),
      title: form.title || form.name,
      visibleFormats: form.formats.map((format) => format.id),
    }

    if (
      !selectedProposalId &&
      proposals.some((proposal) => proposal.id === nextProposal.id)
    ) {
      setMessage("That proposal slug already exists. Select it to edit or choose another name.")
      return
    }

    try {
      upsertProposal(nextProposal)
    } catch (error) {
      setMessage(error.message || "The proposal could not be saved locally.")
      return
    }
    setSelectedProposalId(nextProposal.id)
    setForm(cloneProposal(nextProposal))
    setIdTouched(true)
    setMessage("Proposal saved.")
  }

  const handleDelete = () => {
    if (!selectedProposalId) return

    const deleted = deleteProposal(selectedProposalId)
    if (!deleted) {
      setMessage("Seeded proposals cannot be deleted.")
      return
    }

    resetForm()
    setMessage("Proposal deleted.")
  }

  const createExportPayload = () => {
    const campaign = campaignById[form.campaignId]
    return buildPortableProposal({ proposal: form, campaign, formats: form.formats })
  }

  const validateForExport = (payload) => {
    const errors = validatePortableProposal(payload)
    if (errors.length) {
      const seededRelativeAssetWarning = isSeededProposal(selectedProposalId)
        ? "Seeded demo assets can work in Internal Preview, but Client Preview export requires public HTTPS asset URLs."
        : ""
      const baseMessage =
        "Client Preview requires public HTTPS asset URLs. Replace local, relative, localhost, blob, data or file URLs before exporting."
      setMessage([baseMessage, seededRelativeAssetWarning, ...errors].filter(Boolean).join(" "))
      return false
    }
    return true
  }

  const exportClientPreview = () => {
    const payload = createExportPayload()
    if (!validateForExport(payload)) return
    downloadTextFile(
      `${ensureId(payload.proposal.slug || payload.proposal.title)}-client.html`,
      buildStandaloneClientHtml(payload),
      "text/html"
    )
    setMessage("Client Preview downloaded.")
  }

  const statusBadgeClass = (status) => {
    if (status === "active") return "bg-[var(--bc-green-softest)] text-[var(--bc-green-strong)]"
    if (status === "expired") return "bg-[var(--bc-cream)] text-[var(--bc-black)]"
    return "bg-white/8 text-white/74"
  }

  const toggleFormat = (formatId) => {
    setForm((current) => {
      const exists = current.formats.some((format) => format.id === formatId)
      const formats = exists
        ? current.formats.filter((format) => format.id !== formatId)
        : [...current.formats, createProposalFormatSelection(formatId)].filter(Boolean)

      return {
        ...current,
        formats,
        visibleFormats: formats.map((format) => format.id),
      }
    })
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
      <section className="rounded-xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
              Proposal library
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Client Previews</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={resetForm}
              className="bc-button bc-button--dark bc-button--sm"
            >
              New Client Preview
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {proposals.map((proposal) => (
            <button
              key={proposal.id}
              type="button"
              onClick={() => selectProposal(proposal)}
              className={[
                "w-full rounded-lg border p-4 text-left transition-colors",
                selectedProposalId === proposal.id
                  ? "border-[var(--bc-green-soft)]/60 bg-[var(--bc-green-soft)]/10"
                  : "border-white/10 bg-white/4 hover:bg-white/7",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-xl font-semibold text-white">{proposal.name}</h3>
                  <p className="mt-2 text-sm text-white/56">
                    {campaignById[proposal.campaignId]?.brandName || "Unknown campaign"}
                  </p>
                </div>
                <span
                  className={`bc-pill ${statusBadgeClass(
                    proposal.status
                  )}`}
                >
                  {proposal.status}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to={`/admin/preview/${proposal.id}`}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/74 transition-colors hover:bg-white/8 hover:text-white"
                  onClick={(event) => event.stopPropagation()}
                >
                  Internal Preview
                </Link>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-white/10 bg-white/5 p-5 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
              Client Preview editor
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              {selectedProposalId ? "Update Client Preview" : "Create Client Preview"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">
              Campaigns hold reusable brand assets. This screen defines the proposal copy,
              selected formats and sites for one exported Client Preview.
            </p>
          </div>
          {message ? (
            <div className="max-w-xl rounded-lg border border-white/10 bg-white/8 px-4 py-2 text-sm leading-6 text-white/78">
              {message}
            </div>
          ) : null}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            type="text"
            value={form.name}
            onChange={(event) => updateForm("name", event.target.value)}
            className="rounded-[22px] border border-white/10 bg-[#0A1018] px-4 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#D7FF64]/50"
            placeholder="Internal proposal name"
          />
          <select
            value={form.campaignId}
            onChange={(event) => updateForm("campaignId", event.target.value)}
            className="rounded-[22px] border border-white/10 bg-[#0A1018] px-4 py-3 text-sm text-white outline-none focus:border-[#D7FF64]/50"
          >
            {campaigns.map((campaign) => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.brandName} - {campaign.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={form.id}
            onChange={(event) => {
              setIdTouched(true)
              updateForm("id", ensureId(event.target.value))
            }}
            className="rounded-[22px] border border-white/10 bg-[#0A1018] px-4 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#D7FF64]/50"
            placeholder="proposal-id"
          />
          <input
            type="date"
            value={form.expiresAt}
            onChange={(event) => updateForm("expiresAt", event.target.value)}
            className="rounded-[22px] border border-white/10 bg-[#0A1018] px-4 py-3 text-sm text-white outline-none focus:border-[#D7FF64]/50"
          />
          <input
            type="text"
            value={form.title}
            onChange={(event) => updateForm("title", event.target.value)}
            className="rounded-[22px] border border-white/10 bg-[#0A1018] px-4 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#D7FF64]/50 md:col-span-2"
            placeholder="Client-facing title"
          />
          <input
            type="text"
            value={form.market}
            onChange={(event) => updateForm("market", event.target.value)}
            className="rounded-[22px] border border-white/10 bg-[#0A1018] px-4 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#D7FF64]/50 md:col-span-2"
            placeholder="Market (for example LATAM)"
          />
          <input
            type="url"
            value={form.brandLogoUrl}
            onChange={(event) => updateForm("brandLogoUrl", event.target.value)}
            className="rounded-[22px] border border-white/10 bg-[#0A1018] px-4 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#D7FF64]/50 md:col-span-2"
            placeholder="HTTPS logo URL for Client Preview (optional)"
          />
          <input
            type="url"
            value={form.heroBackgroundVideoUrl}
            onChange={(event) => updateForm("heroBackgroundVideoUrl", event.target.value)}
            className="rounded-[22px] border border-white/10 bg-[#0A1018] px-4 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#D7FF64]/50 md:col-span-2"
            placeholder="HTTPS hero background video URL"
          />
          <input
            type="url"
            value={form.fallbackHeroImageUrl}
            onChange={(event) => updateForm("fallbackHeroImageUrl", event.target.value)}
            className="rounded-[22px] border border-white/10 bg-[#0A1018] px-4 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#D7FF64]/50 md:col-span-2"
            placeholder="HTTPS fallback hero image URL (optional)"
          />
        </div>

        <textarea
          value={form.description}
          onChange={(event) => updateForm("description", event.target.value)}
          className="mt-4 min-h-[110px] w-full rounded-[24px] border border-white/10 bg-[#0A1018] px-4 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#D7FF64]/50"
          placeholder="Client-facing description"
        />

        <div className="mt-5">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">Status</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {proposalStatusCatalog.map((status) => (
              <ChipSelector
                key={status.id}
                label={status.label}
                selected={form.status === status.id}
                onToggle={() => updateForm("status", status.id)}
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
            Included formats
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {selectableProposalFormats.map((format) => (
              <ChipSelector
                key={format.id}
                label={format.name}
                selected={form.formats.some((selected) => selected.id === format.id)}
                onToggle={() => toggleFormat(format.id)}
              />
            ))}
          </div>
          {form.formats.length ? (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {form.formats.map((format) => {
                return (
                  <label key={format.id} className="rounded-lg border border-white/10 bg-black/10 p-3">
                    <span className="text-xs font-medium text-white/68">
                      {format.name} demo URL (optional)
                    </span>
                    <input
                      type="url"
                      value={format.demoUrl || ""}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          formats: current.formats.map((item) =>
                            item.id === format.id
                              ? { ...item, demoUrl: event.target.value }
                              : item
                          ),
                        }))
                      }
                      className="mt-2 w-full border border-white/10 px-3 py-2 text-sm text-white outline-none"
                      placeholder="https://example.com/live-demo"
                    />
                  </label>
                )
              })}
            </div>
          ) : null}
        </div>

        <div className="mt-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
            Included sites
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {proposalSiteCatalog.map((site) => (
              <ChipSelector
                key={site.id}
                label={site.name}
                selected={form.visibleSites.includes(site.id)}
                onToggle={() => updateForm("visibleSites", toggleValue(form.visibleSites, site.id))}
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
            Included categories
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {proposalCategoryCatalog.map((category) => (
              <ChipSelector
                key={category.id}
                label={category.label}
                selected={form.visibleCategories.includes(category.id)}
                onToggle={() =>
                  updateForm(
                    "visibleCategories",
                    toggleValue(form.visibleCategories, category.id)
                  )
                }
              />
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="bc-button bc-button--hero"
          >
            Save proposal
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bc-button bc-button--dark"
          >
            Delete proposal
          </button>
          {selectedProposalId ? (
            <Link
              to={`/admin/preview/${selectedProposalId}`}
              className="bc-button bc-button--dark"
            >
              Open Internal Preview
            </Link>
          ) : null}
          <button
            type="button"
            onClick={exportClientPreview}
            className="bc-button bc-button--hero"
          >
            Download Client Preview
          </button>
        </div>

        {selectedProposalId && isSeededProposal(selectedProposalId) ? (
          <p className="mt-4 text-sm text-white/46">
            Seeded proposals can be edited and overridden locally, but not deleted. Internal Preview can use seeded demo assets, while Client Preview export requires public HTTPS asset URLs.
          </p>
        ) : null}
      </section>
    </div>
  )
}
