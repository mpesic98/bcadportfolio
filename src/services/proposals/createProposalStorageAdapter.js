import { PROPOSAL_DATA_PROVIDER, PROPOSAL_STORAGE_KEY } from "./config"
import { createLocalStorageProposalAdapter } from "./adapters/localStorageProposalAdapter"

export function createProposalStorageAdapter(providerKey = PROPOSAL_DATA_PROVIDER) {
  if (providerKey === "local") {
    return createLocalStorageProposalAdapter({ storageKey: PROPOSAL_STORAGE_KEY })
  }

  throw new Error(`Unsupported proposal data provider: ${providerKey}`)
}
