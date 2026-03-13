import { NavLink, Outlet } from "react-router-dom"
import { useProposalStore } from "../../features/proposals/ProposalStore"

function getNavClass({ isActive }) {
  return [
    "block rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
    isActive
      ? "bg-[#D7FF64] text-[#0B1020]"
      : "text-white/70 hover:bg-white/6 hover:text-white",
  ].join(" ")
}

export default function AdminShell() {
  const { campaigns, proposals, dataProvider } = useProposalStore()

  return (
    <div className="min-h-screen bg-[#090E16] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(900px circle at 10% 0%, rgba(215,255,100,0.12), transparent 60%), radial-gradient(720px circle at 100% 10%, rgba(255,132,70,0.12), transparent 52%)",
        }}
      />

      <div className="relative mx-auto max-w-[1360px] px-4 py-5 md:px-6 md:py-7">
        <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-[28px] border border-white/10 bg-white/6 p-5 backdrop-blur-xl">
            <div className="rounded-[24px] border border-white/10 bg-[#0D1320] p-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#D7FF64]">
                BC Admin
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-white">
                Proposal Studio
              </h1>
              <p className="mt-3 text-sm leading-6 text-white/62">
                Build campaigns, assign creatives, curate proposal views and
                generate clean client-facing links.
              </p>
              <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-white/62">
                Data source: {dataProvider}
              </div>
            </div>

            <nav className="mt-5 space-y-2">
              <NavLink to="/admin" end className={getNavClass}>
                Dashboard
              </NavLink>
              <NavLink to="/admin/campaigns" className={getNavClass}>
                Campaigns
              </NavLink>
              <NavLink to="/admin/proposals" className={getNavClass}>
                Proposals
              </NavLink>
            </nav>

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                  Campaigns
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {campaigns.length}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                  Proposals
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {proposals.length}
                </p>
              </div>
            </div>

            <a
              href="/"
              className="mt-6 inline-flex rounded-full border border-white/12 px-4 py-2 text-sm text-white/80 transition-colors hover:border-white/20 hover:bg-white/8 hover:text-white"
            >
              Open public portfolio
            </a>
          </aside>

          <main className="min-w-0 rounded-[28px] border border-white/10 bg-[#0B111B]/88 p-4 shadow-2xl shadow-black/30 backdrop-blur md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
