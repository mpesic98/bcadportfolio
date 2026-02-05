import { createContext, useContext } from "react"

const PreviewViewportContext = createContext({ vp: "desktop" })

export function PreviewViewportProvider({ vp, children }) {
  return (
    <PreviewViewportContext.Provider value={{ vp }}>
      {children}
    </PreviewViewportContext.Provider>
  )
}

export function usePreviewViewport() {
  return useContext(PreviewViewportContext)
}
