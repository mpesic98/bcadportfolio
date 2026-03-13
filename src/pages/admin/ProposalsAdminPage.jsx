import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  proposalCategoryCatalog,
  proposalFormatCatalog,
  proposalSiteCatalog,
  proposalStatusCatalog,
} from "../../data/proposalFormats"
import { useProposalStore } from "../../features/proposals/ProposalStore"
import { ensureId } from "../../lib/slugify"

function createEmptyProposal(defaultCampaignId = "") {
  return {
    id: "",
    campaignId: defaultCampaignId,
    name: "",
    title: "",
    description: "",
    visibleFormats: [],
    visibleSites: [],
    visibleCategories: [],
    status: "draft",
    expiresAt: "",
  }
}

function cloneProposal(proposal) {
  return {
    ...createEmptyProposal(proposal?.campaignId || ""),
    ...proposal,
    visibleFormats: [...(proposal?.visibleFormats || [])],
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
        "rounded-full border px-3 py-1.5 text-sm transition-colors",
        selected
          ? "border-[#D7FF64]/60 bg-[#D7FF64]/12 text-[#F1FFBF]"
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

  const [selectedProposalId, setSelectedProposalId] = useState("")
  const [form, setForm] = useState(createEmptyProposal(campaigns[0]?.id || ""))
  const [message, setMessage] = useState("")
  const [idTouched, setIdTouched] = useState(false)

  useEffect(() => {
    if (!forceNew) return
    setSelectedProposalId("")
    setForm(createEmptyProposal(campaigns[0]?.id || ""))
    setIdTouched(false)
  }, [campaigns, forceNew])

  useEffect(() => {
    if (!message) return undefined

    const timer = window.setTimeout(() => setMessage(""), 2800)
    return () => window.clearTimeout(timer)
  }, [message])

  const selectProposal = (proposal) => {
    setSelectedProposalId(proposal.id)
    setForm(cloneProposal(proposal))
    setIdTouched(true)
  }

  const resetForm = () => {
    setSelectedProposalId("")
    setForm(createEmptyProposal(campaigns[0]?.id || ""))
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
    if (!form.name || !form.campaignId || !form.visibleFormats.length) {
      setMessage("Name, campaign and at least one format are required.")
      return
    }

    const nextProposal = {
      ...form,
      id: ensureId(form.id || form.name),
      title: form.title || form.name,
    }

    upsertProposal(nextProposal)
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

  const statusBadgeClass = (status) => {
    if (status === "active") return "bg-[#D7FF64]/14 text-[#F1FFBF]"
    if (status === "expired") return "bg-[#FF8446]/16 text-[#FFD1B7]"
    return "bg-white/8 text-white/74"
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
      <section className="rounded-[28px] border border-white/10 bg-white/4 p-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
              Proposal library
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Client views</h2>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="rounded-full border border-white/12 px-4 py-2 text-sm text-white/75 transition-colors hover:bg-white/8 hover:text-white"
          >
            New proposal
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {proposals.map((proposal) => (
            <button
              key={proposal.id}
              type="button"
              onClick={() => selectProposal(proposal)}
              className={[
                "w-full rounded-[24px] border p-4 text-left transition-colors",
                selectedProposalId === proposal.id
                  ? "border-[#D7FF64]/60 bg-[#D7FF64]/8"
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
                  className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.24em] ${statusBadgeClass(
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
                  Preview
                </Link>
                <Link
                  to={`/p/${proposal.id}`}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/74 transition-colors hover:bg-white/8 hover:text-white"
                  onClick={(event) => event.stopPropagation()}
                >
                  Share URL
                </Link>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-white/4 p-5 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
              Proposal editor
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              {selectedProposalId ? "Update proposal" : "Create proposal"}
            </h2>
          </div>
          {message ? (
            <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/78">
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
            placeholder="Proposal name"
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
            placeholder="Public proposal title"
          />
        </div>

        <textarea
          value={form.description}
          onChange={(event) => updateForm("description", event.target.value)}
          className="mt-4 min-h-[110px] w-full rounded-[24px] border border-white/10 bg-[#0A1018] px-4 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#D7FF64]/50"
          placeholder="Proposal description"
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
            Visible formats
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {proposalFormatCatalog.map((format) => (
              <ChipSelector
                key={format.id}
                label={format.name}
                selected={form.visibleFormats.includes(format.id)}
                onToggle={() =>
                  updateForm("visibleFormats", toggleValue(form.visibleFormats, format.id))
                }
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
            Visible sites
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
            Visible categories
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
            className="rounded-full bg-[#D7FF64] px-5 py-3 text-sm font-medium text-[#09111A]"
          >
            Save proposal
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-full border border-white/12 px-5 py-3 text-sm text-white/78 transition-colors hover:bg-white/8 hover:text-white"
          >
            Delete proposal
          </button>
          {selectedProposalId ? (
            <Link
              to={`/admin/preview/${selectedProposalId}`}
              className="rounded-full border border-white/12 px-5 py-3 text-sm text-white/78 transition-colors hover:bg-white/8 hover:text-white"
            >
              Open preview
            </Link>
          ) : null}
        </div>

        {selectedProposalId && isSeededProposal(selectedProposalId) ? (
          <p className="mt-4 text-sm text-white/46">
            Seeded proposals can be edited and overridden locally, but not deleted.
          </p>
        ) : null}
      </section>
    </div>
  )
}
