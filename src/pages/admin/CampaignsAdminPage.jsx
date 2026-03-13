import { useEffect, useMemo, useState } from "react"
import { ensureId } from "../../lib/slugify"
import { useProposalStore } from "../../features/proposals/ProposalStore"

const creativeFieldCatalog = [
  { key: "leaderboard", label: "Leaderboard", hint: "970x90 / 728x90" },
  { key: "mrec", label: "MREC", hint: "300x250" },
  { key: "halfpage", label: "Half Page", hint: "300x600" },
  { key: "mobile_sticky", label: "Mobile Sticky", hint: "320x50" },
  { key: "skin_left", label: "Skin Left", hint: "160x900" },
  { key: "skin_right", label: "Skin Right", hint: "160x900" },
  { key: "skin_background", label: "Skin Background", hint: "Full-width background" },
  { key: "interscroller", label: "Interscroller", hint: "300x600 / reveal" },
  { key: "interstitial", label: "Interstitial", hint: "320x480 / 300x600" },
  { key: "video_banner", label: "Video Banner", hint: "MP4 or poster" },
  { key: "pre_roll", label: "Pre-Roll", hint: "MP4 or poster" },
  { key: "native", label: "Native", hint: "Feed card" },
  { key: "cube", label: "Cube", hint: "Interactive square" },
  { key: "countdown_widget", label: "Countdown Widget", hint: "Responsive widget" },
  { key: "livescore", label: "Livescore", hint: "Responsive module" },
  { key: "leadgen", label: "Leadgen", hint: "Form module" },
  { key: "content_widget", label: "Content Widget", hint: "Recommendation block" },
]

function createEmptyCampaign() {
  return {
    id: "",
    name: "",
    brandName: "",
    description: "",
    logoUrl: "",
    landingPageUrl: "",
    ctaLabel: "Learn more",
    theme: {
      primary: "#0EA5E9",
      secondary: "#F97316",
      surface: "#0F172A",
      ink: "#F8FAFC",
    },
    creatives: {},
  }
}

function cloneCampaign(campaign) {
  return {
    ...createEmptyCampaign(),
    ...campaign,
    theme: {
      ...createEmptyCampaign().theme,
      ...(campaign?.theme || {}),
    },
    creatives: {
      ...(campaign?.creatives || {}),
    },
  }
}

function CampaignCard({ campaign, proposalCount, isSeeded, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "w-full rounded-[24px] border p-4 text-left transition-colors",
        isSelected
          ? "border-[#D7FF64]/60 bg-[#D7FF64]/8"
          : "border-white/10 bg-white/4 hover:bg-white/7",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">
            {campaign.brandName || "Brand"}
          </p>
          <h3 className="mt-2 truncate text-xl font-semibold text-white">
            {campaign.name}
          </h3>
          <p className="mt-2 text-sm text-white/58">{proposalCount} linked proposals</p>
        </div>
        {isSeeded ? (
          <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/64">
            Seed
          </span>
        ) : null}
      </div>
    </button>
  )
}

function AssetInput({ label, hint, value, onChange, onUpload }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-[#0A1018] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white">{label}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/42">
            {hint}
          </p>
        </div>
        <label className="cursor-pointer rounded-full border border-white/12 px-3 py-1.5 text-xs text-white/72 transition-colors hover:bg-white/8 hover:text-white">
          Upload
          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (!file) return
              onUpload(file)
              event.target.value = ""
            }}
          />
        </label>
      </div>

      <input
        type="text"
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#D7FF64]/50"
        placeholder="/campaigns/brand/asset.svg or data URL"
      />
      {value ? (
        <p className="mt-3 truncate text-xs text-white/42">{value}</p>
      ) : null}
    </div>
  )
}

export default function CampaignsAdminPage() {
  const {
    campaigns,
    proposals,
    isSeededCampaign,
    upsertCampaign,
    deleteCampaign,
  } = useProposalStore()

  const [form, setForm] = useState(createEmptyCampaign())
  const [selectedCampaignId, setSelectedCampaignId] = useState("")
  const [message, setMessage] = useState("")
  const [idTouched, setIdTouched] = useState(false)

  const proposalCountByCampaign = useMemo(() => {
    return proposals.reduce((acc, proposal) => {
      acc[proposal.campaignId] = (acc[proposal.campaignId] || 0) + 1
      return acc
    }, {})
  }, [proposals])

  useEffect(() => {
    if (!message) return undefined

    const timer = window.setTimeout(() => setMessage(""), 2800)
    return () => window.clearTimeout(timer)
  }, [message])

  const selectCampaign = (campaign) => {
    setSelectedCampaignId(campaign.id)
    setForm(cloneCampaign(campaign))
    setIdTouched(true)
  }

  const resetForm = () => {
    setSelectedCampaignId("")
    setForm(createEmptyCampaign())
    setIdTouched(false)
  }

  const updateForm = (field, value) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value }

      if (!idTouched && (field === "name" || field === "brandName")) {
        next.id = ensureId(
          `${field === "brandName" ? value : prev.brandName} ${field === "name" ? value : prev.name}`
        )
      }

      return next
    })
  }

  const updateTheme = (field, value) => {
    setForm((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        [field]: value,
      },
    }))
  }

  const updateCreative = (key, value) => {
    setForm((prev) => ({
      ...prev,
      creatives: {
        ...prev.creatives,
        [key]: value,
      },
    }))
  }

  const uploadFileAsDataUrl = (onValue) => (file) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") onValue(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    if (!form.name || !form.brandName) {
      setMessage("Campaign name and brand are required.")
      return
    }

    const nextCampaign = {
      ...form,
      id: ensureId(form.id || `${form.brandName} ${form.name}`),
    }

    upsertCampaign(nextCampaign)
    setSelectedCampaignId(nextCampaign.id)
    setForm(cloneCampaign(nextCampaign))
    setIdTouched(true)
    setMessage("Campaign saved.")
  }

  const handleDelete = () => {
    if (!selectedCampaignId) return

    const deleted = deleteCampaign(selectedCampaignId)
    if (!deleted) {
      setMessage("This campaign is seeded or still linked to proposals.")
      return
    }

    resetForm()
    setMessage("Campaign deleted.")
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[340px_minmax(0,1fr)]">
      <section className="rounded-[28px] border border-white/10 bg-white/4 p-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
              Campaign library
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Brands and assets</h2>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="rounded-full border border-white/12 px-4 py-2 text-sm text-white/75 transition-colors hover:bg-white/8 hover:text-white"
          >
            New campaign
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              proposalCount={proposalCountByCampaign[campaign.id] || 0}
              isSeeded={isSeededCampaign(campaign.id)}
              isSelected={selectedCampaignId === campaign.id}
              onSelect={() => selectCampaign(campaign)}
            />
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-white/4 p-5 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
              Campaign editor
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              {selectedCampaignId ? "Update campaign" : "Create campaign"}
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
            placeholder="Campaign name"
          />
          <input
            type="text"
            value={form.brandName}
            onChange={(event) => updateForm("brandName", event.target.value)}
            className="rounded-[22px] border border-white/10 bg-[#0A1018] px-4 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#D7FF64]/50"
            placeholder="Brand name"
          />
          <input
            type="text"
            value={form.id}
            onChange={(event) => {
              setIdTouched(true)
              updateForm("id", ensureId(event.target.value))
            }}
            className="rounded-[22px] border border-white/10 bg-[#0A1018] px-4 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#D7FF64]/50"
            placeholder="campaign-id"
          />
          <input
            type="text"
            value={form.logoUrl}
            onChange={(event) => updateForm("logoUrl", event.target.value)}
            className="rounded-[22px] border border-white/10 bg-[#0A1018] px-4 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#D7FF64]/50"
            placeholder="Logo URL"
          />
          <input
            type="text"
            value={form.landingPageUrl}
            onChange={(event) => updateForm("landingPageUrl", event.target.value)}
            className="rounded-[22px] border border-white/10 bg-[#0A1018] px-4 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#D7FF64]/50"
            placeholder="Landing page URL"
          />
          <input
            type="text"
            value={form.ctaLabel}
            onChange={(event) => updateForm("ctaLabel", event.target.value)}
            className="rounded-[22px] border border-white/10 bg-[#0A1018] px-4 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#D7FF64]/50"
            placeholder="CTA label"
          />
        </div>

        <textarea
          value={form.description}
          onChange={(event) => updateForm("description", event.target.value)}
          className="mt-4 min-h-[110px] w-full rounded-[24px] border border-white/10 bg-[#0A1018] px-4 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#D7FF64]/50"
          placeholder="Campaign description"
        />

        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <label className="rounded-[22px] border border-white/10 bg-[#0A1018] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">Primary</p>
            <input
              type="color"
              value={form.theme.primary}
              onChange={(event) => updateTheme("primary", event.target.value)}
              className="mt-3 h-10 w-full cursor-pointer rounded-xl border border-white/10 bg-transparent"
            />
          </label>
          <label className="rounded-[22px] border border-white/10 bg-[#0A1018] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">Secondary</p>
            <input
              type="color"
              value={form.theme.secondary}
              onChange={(event) => updateTheme("secondary", event.target.value)}
              className="mt-3 h-10 w-full cursor-pointer rounded-xl border border-white/10 bg-transparent"
            />
          </label>
          <label className="rounded-[22px] border border-white/10 bg-[#0A1018] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">Surface</p>
            <input
              type="color"
              value={form.theme.surface}
              onChange={(event) => updateTheme("surface", event.target.value)}
              className="mt-3 h-10 w-full cursor-pointer rounded-xl border border-white/10 bg-transparent"
            />
          </label>
          <label className="rounded-[22px] border border-white/10 bg-[#0A1018] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">Ink</p>
            <input
              type="color"
              value={form.theme.ink}
              onChange={(event) => updateTheme("ink", event.target.value)}
              className="mt-3 h-10 w-full cursor-pointer rounded-xl border border-white/10 bg-transparent"
            />
          </label>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
              Creative assignments
            </p>
            <p className="mt-2 text-sm text-white/58">
              Assets can be project-relative URLs or uploaded files stored as data URLs.
            </p>
          </div>
          <label className="cursor-pointer rounded-full border border-white/12 px-4 py-2 text-sm text-white/75 transition-colors hover:bg-white/8 hover:text-white">
            Upload logo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (!file) return
                uploadFileAsDataUrl((value) => updateForm("logoUrl", value))(file)
                event.target.value = ""
              }}
            />
          </label>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-2">
          {creativeFieldCatalog.map((field) => (
            <AssetInput
              key={field.key}
              label={field.label}
              hint={field.hint}
              value={form.creatives[field.key]}
              onChange={(value) => updateCreative(field.key, value)}
              onUpload={uploadFileAsDataUrl((value) => updateCreative(field.key, value))}
            />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-full bg-[#D7FF64] px-5 py-3 text-sm font-medium text-[#09111A]"
          >
            Save campaign
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-full border border-white/12 px-5 py-3 text-sm text-white/78 transition-colors hover:bg-white/8 hover:text-white"
          >
            Delete campaign
          </button>
        </div>
      </section>
    </div>
  )
}
