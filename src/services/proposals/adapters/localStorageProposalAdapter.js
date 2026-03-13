function normalizeRuntimeState(rawState) {
  return {
    campaigns: Array.isArray(rawState?.campaigns) ? rawState.campaigns : [],
    proposals: Array.isArray(rawState?.proposals) ? rawState.proposals : [],
  }
}

export function createLocalStorageProposalAdapter({
  storageKey,
  storage = typeof window !== "undefined" ? window.localStorage : null,
} = {}) {
  return {
    key: "local",
    getRuntimeState() {
      if (!storage) return normalizeRuntimeState()

      try {
        const raw = storage.getItem(storageKey)
        if (!raw) return normalizeRuntimeState()
        return normalizeRuntimeState(JSON.parse(raw))
      } catch {
        return normalizeRuntimeState()
      }
    },
    setRuntimeState(runtimeState) {
      if (!storage) return
      storage.setItem(storageKey, JSON.stringify(normalizeRuntimeState(runtimeState)))
    },
  }
}
