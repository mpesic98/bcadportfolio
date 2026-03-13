import { createContext, useContext, useMemo, useState } from "react"
import { proposalService } from "../../services/proposals/proposalService"

const ProposalStoreContext = createContext(null)

function readInitialSnapshot() {
  return proposalService.readSnapshot()
}

export function ProposalStoreProvider({ children }) {
  const [snapshot, setSnapshot] = useState(readInitialSnapshot)

  const value = useMemo(() => {
    const replaceSnapshot = (nextSnapshot) => {
      setSnapshot(nextSnapshot)
      return nextSnapshot
    }

    const refresh = () => replaceSnapshot(proposalService.readSnapshot())

    const upsertCampaign = (campaign) => {
      const result = proposalService.saveCampaign(campaign)
      replaceSnapshot(result.snapshot)
      return result
    }

    const deleteCampaign = (campaignId) => {
      const result = proposalService.deleteCampaign(campaignId)
      replaceSnapshot(result.snapshot)
      return result.ok
    }

    const upsertProposal = (proposal) => {
      const result = proposalService.saveProposal(proposal)
      replaceSnapshot(result.snapshot)
      return result
    }

    const deleteProposal = (proposalId) => {
      const result = proposalService.deleteProposal(proposalId)
      replaceSnapshot(result.snapshot)
      return result.ok
    }

    return {
      dataProvider: snapshot.providerKey,
      campaigns: snapshot.campaigns,
      proposals: snapshot.proposals,
      campaignById: snapshot.campaignById,
      proposalById: snapshot.proposalById,
      resolvedProposalById: snapshot.resolvedProposalById,
      isSeededCampaign: (campaignId) => snapshot.seededCampaignIds.has(campaignId),
      isSeededProposal: (proposalId) => snapshot.seededProposalIds.has(proposalId),
      getCampaignById: (campaignId) => snapshot.campaignById[campaignId] || null,
      getProposalById: (proposalId) => snapshot.proposalById[proposalId] || null,
      getResolvedProposal: (proposalId) =>
        snapshot.resolvedProposalById[proposalId] ||
        proposalService.resolveProposalForPresentation(proposalId, snapshot),
      refresh,
      upsertCampaign,
      deleteCampaign,
      upsertProposal,
      deleteProposal,
    }
  }, [snapshot])

  return <ProposalStoreContext.Provider value={value}>{children}</ProposalStoreContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProposalStore() {
  const context = useContext(ProposalStoreContext)

  if (!context) {
    throw new Error("useProposalStore must be used inside ProposalStoreProvider")
  }

  return context
}
