import { Link, useParams } from "react-router-dom"
import HomeFooter from "../../components/home/HomeFooter"
import PortfolioPage from "../../components/portfolio/PortfolioPage"
import { useProposalStore } from "../../features/proposals/ProposalStore"
import { buildPortableProposal } from "../../features/proposals/portableProposal"

function ProposalFallback({ mode, message }) {
  return (
    <div className="home-dark min-h-screen px-4 py-8 text-white">
      <div className="mx-auto max-w-[920px] rounded-xl border border-white/10 bg-white/5 p-6 text-center md:p-10">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">
          {mode === "internal" ? "Internal Preview unavailable" : "Proposal unavailable"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{message}</h1>
        <Link
          to={mode === "internal" ? "/admin/proposals" : "/"}
          className="bc-button bc-button--dark mt-6"
        >
          {mode === "internal" ? "Back to proposals" : "Open portfolio"}
        </Link>
      </div>
    </div>
  )
}

export default function ProposalPage({ mode = "internal" }) {
  const { proposalId } = useParams()
  const { resolvedProposalById, getResolvedProposal } = useProposalStore()
  const resolved = resolvedProposalById[proposalId] || getResolvedProposal(proposalId)

  if (resolved?.status !== "ready" || !resolved.proposal || !resolved.campaign) {
    return <ProposalFallback mode={mode} message="The requested proposal could not be found." />
  }

  const payload = buildPortableProposal({
    proposal: resolved.proposal,
    campaign: resolved.campaign,
    formats: resolved.proposal.formats || [],
  })

  return (
    <div className="home-dark min-h-screen text-white">
      <PortfolioPage proposal={payload.proposal} />
      <HomeFooter />
    </div>
  )
}
