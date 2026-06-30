import {
  resolveSitesForFormat,
  resolveVisibleProposalFormats,
} from "../../data/proposalFormats"
import { resolveFormatPreviewAsset } from "../../features/proposals/creativeResolver"

export function resolveProposalForPresentation(snapshot, proposalId) {
  const proposal = snapshot?.proposalById?.[proposalId] || null

  if (!proposal) {
    return {
      id: proposalId,
      status: "missing-proposal",
      proposal: null,
      campaign: null,
      visibleFormats: [],
    }
  }

  const campaign = snapshot?.campaignById?.[proposal.campaignId] || null

  if (!campaign) {
    return {
      id: proposal.id,
      status: "missing-campaign",
      proposal,
      campaign: null,
      visibleFormats: [],
    }
  }

  const visibleFormats = resolveVisibleProposalFormats(proposal)
    .map((format) => {
      const proposalSites = resolveSitesForFormat(format, proposal.visibleSites || [])

      return {
        ...format,
        proposalSites,
        previewAsset: resolveFormatPreviewAsset(format, campaign),
      }
    })
    .filter((format) => {
      if (!(proposal.visibleSites || []).length) return true
      return format.proposalSites.length > 0
    })

  return {
    id: proposal.id,
    status: "ready",
    proposal,
    campaign,
    visibleFormats,
  }
}

export function buildResolvedProposalById(snapshot) {
  return (snapshot?.proposals || []).reduce((acc, proposal) => {
    acc[proposal.id] = resolveProposalForPresentation(snapshot, proposal.id)
    return acc
  }, {})
}
