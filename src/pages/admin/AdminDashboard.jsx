import { Link } from "react-router-dom"
import { useProposalStore } from "../../features/proposals/ProposalStore"

function StatCard({ label, value, tone = "default" }) {
  const tones = {
    default: "from-white/9 to-white/4",
    lime: "from-[var(--bc-green-soft)]/18 to-[var(--bc-green-soft)]/6",
    ember: "from-[var(--bc-cream)]/16 to-[var(--bc-cream)]/5",
  }

  return (
    <div
      className={`rounded-xl border border-white/10 bg-gradient-to-br ${tones[tone]} p-5`}
    >
      <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
        {label}
      </p>
      <p className="mt-3 text-4xl font-semibold text-white">{value}</p>
    </div>
  )
}

export default function AdminDashboard() {
  const { campaigns, proposals, campaignById } = useProposalStore()

  const activeProposals = proposals.filter((proposal) => proposal.status === "active")
  const draftProposals = proposals.filter((proposal) => proposal.status === "draft")

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-white/10 bg-white/5 p-5 md:p-6">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--bc-green-soft)]">
          Control Room
        </p>
        <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Campaign and proposal management in one place
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/62 md:text-base">
              Campaigns store reusable branding and creative assets. Proposals
              select the format mix, copy and sites for each Client Preview.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/admin/campaigns"
              className="bc-button bc-button--dark bc-button--sm"
            >
              Manage campaigns
            </Link>
            <Link
              to="/admin/proposals/new"
              className="bc-button bc-button--hero bc-button--sm"
            >
              New Client Preview
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Campaigns" value={campaigns.length} tone="lime" />
        <StatCard label="Active proposals" value={activeProposals.length} />
        <StatCard label="Draft proposals" value={draftProposals.length} tone="ember" />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                Recent proposals
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                Client Preview workspace
              </h3>
            </div>
            <Link
              to="/admin/proposals"
              className="bc-button bc-button--dark bc-button--sm"
            >
              All proposals
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {proposals.map((proposal) => (
              <article
                key={proposal.id}
                className="flex flex-col gap-4 rounded-lg border border-white/10 bg-black/10 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                    {proposal.status}
                  </p>
                  <h4 className="mt-2 truncate text-xl font-semibold text-white">
                    {proposal.name}
                  </h4>
                  <p className="mt-2 text-sm text-white/58">
                    {campaignById[proposal.campaignId]?.brandName || "Unknown campaign"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/admin/preview/${proposal.id}`}
                    className="bc-button bc-button--hero bc-button--sm"
                  >
                    Internal preview
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
            Workflow
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            MVP builder flow
          </h3>
          <ol className="mt-5 space-y-4 text-sm leading-7 text-white/64">
            <li>1. Create or update a campaign with brand logo, theme colors and creative URLs.</li>
            <li>2. Build a proposal by selecting the campaign, included formats, sites and categories.</li>
            <li>3. Validate the internal preview, then export the standalone Client Preview HTML.</li>
          </ol>
        </div>
      </section>
    </div>
  )
}
