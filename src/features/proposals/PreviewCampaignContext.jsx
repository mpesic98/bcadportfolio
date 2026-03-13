import { createContext, useContext } from "react"

const PreviewCampaignContext = createContext({
  proposal: null,
  campaign: null,
  proposalFormatKey: null,
  proposalFormat: null,
})

export function PreviewCampaignProvider({ value, children }) {
  return (
    <PreviewCampaignContext.Provider value={value}>
      {children}
    </PreviewCampaignContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePreviewCampaign() {
  return useContext(PreviewCampaignContext)
}
