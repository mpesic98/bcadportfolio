import { useMemo } from "react"
import { useLocation } from "react-router-dom"
import { usePreviewViewport } from "./previewViewport.jsx"
import skinL from "../../assets/skinl.png"
import skinR from "../../assets/skinr.png"

export default function SkinRails({
  railWidth = 160,
  railGap = 24,
  topBarHeight = 72,
  contentMaxWidth = 1100,
}) {
  const { vp } = usePreviewViewport()
  const location = useLocation()
  const state = location.state || {}

  if (vp === "mobile") return null

  const leftImg = state.leftImg || skinL
  const rightImg = state.rightImg || skinR
  const clickUrl = state.clickUrl

  const leftOffset = contentMaxWidth / 2 + railGap + railWidth
  const rightOffset = contentMaxWidth / 2 + railGap

  const leftStyle = useMemo(
    () => ({
      width: `${railWidth}px`,
      top: `${topBarHeight}px`,
      bottom: 0,
      left: `calc(50% - ${leftOffset}px)`,
      backgroundImage: `url(${leftImg})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center top",
      backgroundSize: "cover",
    }),
    [leftImg, railWidth, topBarHeight, leftOffset]
  )

  const rightStyle = useMemo(
    () => ({
      width: `${railWidth}px`,
      top: `${topBarHeight}px`,
      bottom: 0,
      left: `calc(50% + ${rightOffset}px)`,
      backgroundImage: `url(${rightImg})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center top",
      backgroundSize: "cover",
    }),
    [rightImg, railWidth, topBarHeight, rightOffset]
  )

  const Tag = clickUrl ? "a" : "div"
  const linkProps = clickUrl ? { href: clickUrl, target: "_blank", rel: "noreferrer" } : {}

  return (
    <>
      <Tag {...linkProps} className="fixed z-40 block cursor-pointer" style={leftStyle} />
      <Tag {...linkProps} className="fixed z-40 block cursor-pointer" style={rightStyle} />
    </>
  )
}
