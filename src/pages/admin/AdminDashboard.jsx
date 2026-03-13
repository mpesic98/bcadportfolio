import { Link } from "react-router-dom"
import { useProposalStore } from "../../features/proposals/ProposalStore"

function StatCard({ label, value, tone = "default" }) {
  const tones = {
    default: "from-white/9 to-white/4",
    lime: "from-[#D7FF64]/18 to-[#D7FF64]/6",
    ember: "from-[#FF8446]/20 to-[#FF8446]/6",
  }

  return (
    <div
      className={`rounded-[24px] border border-white/10 bg-gradient-to-br ${tones[tone]} p-5`}
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
      <section className="rounded-[28px] border border-white/10 bg-white/4 p-5 md:p-6">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#D7FF64]">
          Control Room
        </p>
        <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Campaign and proposal management in one place
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/62 md:text-base">
              Use this workspace to define reusable campaign branding, curate
              proposal-specific format mixes and open branded previews before
              sharing them with clients.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/admin/campaigns"
              className="rounded-full border border-white/12 px-4 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/8 hover:text-white"
            >
              Manage campaigns
            </Link>
            <Link
              to="/admin/proposals/new"
              className="rounded-full bg-[#D7FF64] px-4 py-2.5 text-sm font-medium text-[#0A1220]"
            >
              New proposal
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
        <div className="rounded-[28px] border border-white/10 bg-white/4 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                Recent proposals
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                Client-ready links
              </h3>
            </div>
            <Link
              to="/admin/proposals"
              className="rounded-full border border-white/12 px-4 py-2 text-sm text-white/75 transition-colors hover:bg-white/8 hover:text-white"
            >
              All proposals
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {proposals.map((proposal) => (
              <article
                key={proposal.id}
                className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-[#0A1019] p-4 md:flex-row md:items-center md:justify-between"
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
                    className="rounded-full border border-white/12 px-4 py-2 text-sm text-white/78 transition-colors hover:bg-white/8 hover:text-white"
                  >
                    Internal preview
                  </Link>
                  <Link
                    to={`/p/${proposal.id}`}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#09111B]"
                  >
                    External view
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/4 p-5">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
            Workflow
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            MVP proposal sequence
          </h3>
          <ol className="mt-5 space-y-4 text-sm leading-7 text-white/64">
            <li>1. Create or update a campaign with brand logo, theme colors and creative URLs.</li>
            <li>2. Build a proposal by selecting the campaign, visible formats, sites and categories.</li>
            <li>3. Open the internal preview to validate branding and copy the external share link.</li>
          </ol>
        </div>
      </section>
    </div>
  )
}
