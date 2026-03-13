import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import ProposalPresentation from "../../components/proposals/ProposalPresentation"
import { getProposalFormatById } from "../../data/proposalFormats"
import { useProposalStore } from "../../features/proposals/ProposalStore"

function ProposalFallback({ mode, message }) {
  return (
    <div className="min-h-screen bg-[#09101A] px-4 py-8 text-white">
      <div className="mx-auto max-w-[920px] rounded-[30px] border border-white/10 bg-white/5 p-6 text-center md:p-10">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">
          Proposal unavailable
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
          {message}
        </h1>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {mode === "internal" ? (
            <Link
              to="/admin/proposals"
              className="rounded-full border border-white/12 px-4 py-2.5 text-sm text-white/78 transition-colors hover:bg-white/8 hover:text-white"
            >
              Back to proposals
            </Link>
          ) : (
            <Link
              to="/"
              className="rounded-full border border-white/12 px-4 py-2.5 text-sm text-white/78 transition-colors hover:bg-white/8 hover:text-white"
            >
              Open portfolio
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProposalPage({ mode = "external" }) {
  const { proposalId } = useParams()
  const { resolvedProposalById, getResolvedProposal } = useProposalStore()
  const [copied, setCopied] = useState(false)

  const proposalPayload =
    resolvedProposalById[proposalId] || getResolvedProposal(proposalId)
  const proposal = proposalPayload?.proposal || null
  const campaign = proposalPayload?.campaign || null

  if (proposalPayload?.status !== "ready" || !proposal || !campaign) {
    return <ProposalFallback mode={mode} message="The requested proposal could not be found." />
  }

  if (mode === "external" && !proposalPayload.isPubliclyAccessible) {
    return (
      <ProposalFallback
        mode={mode}
        message="This proposal is no longer publicly available."
      />
    )
  }

  const sharePath = proposalPayload.sharePath || `/p/${proposal.id}`
  const shareUrl =
    typeof window !== "undefined" ? `${window.location.origin}${sharePath}` : sharePath

  const headerActions =
    mode === "internal" ? (
      <>
        <Link
          to="/admin/proposals"
          className="rounded-full border border-white/12 px-4 py-2.5 text-sm text-white/78 transition-colors hover:bg-white/8 hover:text-white"
        >
          Back to proposals
        </Link>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(shareUrl)
              setCopied(true)
              window.setTimeout(() => setCopied(false), 1800)
            } catch {
              setCopied(false)
            }
          }}
          className="rounded-full border border-white/12 px-4 py-2.5 text-sm text-white/78 transition-colors hover:bg-white/8 hover:text-white"
        >
          {copied ? "Copied share URL" : "Copy share URL"}
        </button>
        <Link
          to={sharePath}
          className="rounded-full bg-white px-4 py-2.5 text-sm font-medium text-[#09111B]"
        >
          Open external view
        </Link>
      </>
    ) : null

  const buildLivePreviewHref = (format) => {
    const previewFormat = getProposalFormatById(format.id)
    const previewRoute = previewFormat?.previewRoute
    if (!previewRoute) return "/"

    const search = new URLSearchParams({
      proposal: proposal.id,
      proposalFormat: format.id,
    })

    return `/${previewRoute.region}/${previewRoute.segment}/preview/${previewRoute.formatId}?${search.toString()}`
  }

  return (
    <div className={mode === "external" ? "min-h-screen bg-[#09101A] px-4 py-6 md:px-6" : ""}>
      <div className={mode === "external" ? "mx-auto max-w-[1360px]" : ""}>
        <ProposalPresentation
          proposalPayload={proposalPayload}
          headerActions={headerActions}
          buildLivePreviewHref={buildLivePreviewHref}
        />
      </div>
    </div>
  )
}
