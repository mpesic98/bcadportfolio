/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useLayoutEffect, useMemo, useState } from "react"

const DEFAULT_VIEWPORT = {
  vp: "desktop",
  width: 0,
  height: 0,
  scrollElement: null,
  isContainerViewport: false,
}

const PreviewViewportContext = createContext(DEFAULT_VIEWPORT)

function readRect(node) {
  if (!node || typeof node.getBoundingClientRect !== "function") {
    return { width: 0, height: 0 }
  }

  const rect = node.getBoundingClientRect()
  return {
    width: Math.max(0, Math.round(rect.width)),
    height: Math.max(0, Math.round(rect.height)),
  }
}

export function PreviewViewportProvider({
  vp,
  width = 0,
  height = 0,
  scrollElement = null,
  isContainerViewport = false,
  children,
}) {
  const value = useMemo(
    () => ({
      vp,
      width: Math.max(0, Math.round(width || 0)),
      height: Math.max(0, Math.round(height || 0)),
      scrollElement,
      isContainerViewport,
    }),
    [vp, width, height, scrollElement, isContainerViewport]
  )

  return (
    <PreviewViewportContext.Provider value={value}>
      {children}
    </PreviewViewportContext.Provider>
  )
}

export function usePreviewViewport(ref) {
  const context = useContext(PreviewViewportContext)
  const [observedRect, setObservedRect] = useState(() => readRect(ref?.current))

  useLayoutEffect(() => {
    const node = ref?.current
    if (!node) return undefined

    const update = () => {
      const next = readRect(node)
      setObservedRect((prev) =>
        prev.width === next.width && prev.height === next.height ? prev : next
      )
    }

    update()

    if (typeof ResizeObserver === "undefined") return undefined

    let raf = 0
    const observer = new ResizeObserver(() => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        raf = 0
        update()
      })
    })

    observer.observe(node)

    return () => {
      observer.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ref])

  if (!ref) return context

  return {
    ...context,
    width: observedRect.width || context.width,
    height: observedRect.height || context.height,
  }
}
