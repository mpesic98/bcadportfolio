import {
  resolveSitesForFormat,
  resolveVisibleProposalFormats,
} from "../../data/proposalFormats"
import { resolveFormatPreviewAsset } from "../../features/proposals/creativeResolver"

export function isProposalExpired(proposal, now = new Date()) {
  if (!proposal?.expiresAt) return false

  const expiresAt = new Date(`${proposal.expiresAt}T23:59:59`)
  if (Number.isNaN(expiresAt.getTime())) return false

  return expiresAt.getTime() < now.getTime()
}

export function resolveProposalForPresentation(snapshot, proposalId) {
  const proposal = snapshot?.proposalById?.[proposalId] || null

  if (!proposal) {
    return {
      id: proposalId,
      status: "missing-proposal",
      proposal: null,
      campaign: null,
      visibleFormats: [],
      isExpired: false,
      isPubliclyAccessible: false,
      sharePath: null,
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
      isExpired: false,
      isPubliclyAccessible: false,
      sharePath: `/p/${proposal.id}`,
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

  const expired = isProposalExpired(proposal)

  return {
    id: proposal.id,
    status: "ready",
    proposal,
    campaign,
    visibleFormats,
    isExpired: expired,
    isPubliclyAccessible: proposal.status === "active" && !expired,
    sharePath: `/p/${proposal.id}`,
  }
}

export function buildResolvedProposalById(snapshot) {
  return (snapshot?.proposals || []).reduce((acc, proposal) => {
    acc[proposal.id] = resolveProposalForPresentation(snapshot, proposal.id)
    return acc
  }, {})
}
