import { seededCampaigns, seededProposals } from "../../data/proposalSeeds"
import { createProposalStorageAdapter } from "./createProposalStorageAdapter"
import { buildResolvedProposalById, resolveProposalForPresentation } from "./proposalPresentationResolver"

function mergeById(seedItems, runtimeItems) {
  const map = new Map()

  seedItems.forEach((item) => {
    map.set(item.id, item)
  })

  runtimeItems.forEach((item) => {
    map.set(item.id, item)
  })

  return Array.from(map.values())
}

function indexById(items) {
  return items.reduce((acc, item) => {
    acc[item.id] = item
    return acc
  }, {})
}

function replaceById(items, nextItem) {
  const nextItems = items.filter((item) => item.id !== nextItem.id)
  nextItems.push(nextItem)
  return nextItems
}

export function createProposalService({
  adapter = createProposalStorageAdapter(),
  seedState = {
    campaigns: seededCampaigns,
    proposals: seededProposals,
  },
} = {}) {
  const seededCampaignIds = new Set(seedState.campaigns.map((item) => item.id))
  const seededProposalIds = new Set(seedState.proposals.map((item) => item.id))

  function buildSnapshot(runtimeState = adapter.getRuntimeState()) {
    const campaigns = mergeById(seedState.campaigns, runtimeState.campaigns || [])
    const proposals = mergeById(seedState.proposals, runtimeState.proposals || [])
    const campaignById = indexById(campaigns)
    const proposalById = indexById(proposals)

    const snapshot = {
      providerKey: adapter.key,
      runtimeState,
      campaigns,
      proposals,
      campaignById,
      proposalById,
      seededCampaignIds,
      seededProposalIds,
    }

    return {
      ...snapshot,
      resolvedProposalById: buildResolvedProposalById(snapshot),
    }
  }

  function persistRuntimeState(runtimeState) {
    adapter.setRuntimeState(runtimeState)
    return buildSnapshot(runtimeState)
  }

  return {
    getProviderKey() {
      return adapter.key
    },
    readSnapshot() {
      return buildSnapshot()
    },
    listCampaigns(snapshot = buildSnapshot()) {
      return snapshot.campaigns
    },
    getCampaignById(campaignId, snapshot = buildSnapshot()) {
      return snapshot.campaignById[campaignId] || null
    },
    listProposals(snapshot = buildSnapshot()) {
      return snapshot.proposals
    },
    getProposalById(proposalId, snapshot = buildSnapshot()) {
      return snapshot.proposalById[proposalId] || null
    },
    isSeededCampaign(campaignId) {
      return seededCampaignIds.has(campaignId)
    },
    isSeededProposal(proposalId) {
      return seededProposalIds.has(proposalId)
    },
    saveCampaign(campaign) {
      const runtimeState = adapter.getRuntimeState()
      const nextRuntimeState = {
        ...runtimeState,
        campaigns: replaceById(runtimeState.campaigns || [], campaign),
      }

      const snapshot = persistRuntimeState(nextRuntimeState)

      return {
        ok: true,
        snapshot,
        campaign: snapshot.campaignById[campaign.id] || campaign,
      }
    },
    deleteCampaign(campaignId) {
      const snapshot = buildSnapshot()

      if (seededCampaignIds.has(campaignId)) {
        return { ok: false, reason: "seeded-campaign", snapshot }
      }

      const hasLinkedProposals = snapshot.proposals.some(
        (proposal) => proposal.campaignId === campaignId
      )

      if (hasLinkedProposals) {
        return { ok: false, reason: "campaign-has-linked-proposals", snapshot }
      }

      const nextRuntimeState = {
        ...snapshot.runtimeState,
        campaigns: (snapshot.runtimeState.campaigns || []).filter(
          (item) => item.id !== campaignId
        ),
      }

      return {
        ok: true,
        snapshot: persistRuntimeState(nextRuntimeState),
      }
    },
    saveProposal(proposal) {
      const runtimeState = adapter.getRuntimeState()
      const nextRuntimeState = {
        ...runtimeState,
        proposals: replaceById(runtimeState.proposals || [], proposal),
      }

      const snapshot = persistRuntimeState(nextRuntimeState)

      return {
        ok: true,
        snapshot,
        proposal: snapshot.proposalById[proposal.id] || proposal,
      }
    },
    deleteProposal(proposalId) {
      const snapshot = buildSnapshot()

      if (seededProposalIds.has(proposalId)) {
        return { ok: false, reason: "seeded-proposal", snapshot }
      }

      const nextRuntimeState = {
        ...snapshot.runtimeState,
        proposals: (snapshot.runtimeState.proposals || []).filter(
          (item) => item.id !== proposalId
        ),
      }

      return {
        ok: true,
        snapshot: persistRuntimeState(nextRuntimeState),
      }
    },
    resolveProposalForPresentation(proposalId, snapshot = buildSnapshot()) {
      return resolveProposalForPresentation(snapshot, proposalId)
    },
  }
}

export const proposalService = createProposalService()
