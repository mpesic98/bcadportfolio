import { NavLink, Outlet } from "react-router-dom"
import { useProposalStore } from "../../features/proposals/ProposalStore"
import logo from "../../assets/Logo-3.png"

function getNavClass({ isActive }) {
  return [
    "block rounded-lg border px-4 py-3 text-sm font-semibold transition-colors",
    isActive
      ? "border-white bg-white text-[var(--bc-green)] shadow-sm"
      : "border-transparent text-white/68 hover:border-white/10 hover:bg-white/8 hover:text-white",
  ].join(" ")
}

export default function AdminShell() {
  const { campaigns, proposals, dataProvider } = useProposalStore()

  return (
    <div className="admin-shell min-h-screen bg-[var(--bc-green)] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(900px circle at 8% 0%, rgba(143,220,199,0.18), transparent 58%), linear-gradient(180deg, rgba(1,91,73,0.98) 0%, rgba(1,72,58,0.98) 38%, rgba(8,33,28,1) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1360px] px-4 py-5 md:px-6 md:py-7">
        <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-xl border border-white/12 bg-black/12 p-5 shadow-[0_22px_55px_rgba(0,0,0,0.18)] backdrop-blur-xl">
            <div className="border-b border-white/10 pb-5">
              <img src={logo} alt="Better Collective" className="h-9 w-auto object-contain" />
              <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-[var(--bc-green-soft)]">
                BC Admin
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-white">
                Campaign Builder
              </h1>
              <p className="mt-3 text-sm leading-6 text-white/62">
                Campaigns store brand assets and creative URLs. Proposals turn
                them into read-only Client Previews.
              </p>
              <div className="bc-pill bc-pill--glass mt-4">
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
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                  Campaigns
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {campaigns.length}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
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
              className="bc-button bc-button--dark bc-button--sm mt-6"
            >
              Open public portfolio
            </a>
          </aside>

          <main className="min-w-0 rounded-xl border border-white/10 bg-[rgba(8,33,28,0.76)] p-4 shadow-2xl shadow-black/25 backdrop-blur md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
