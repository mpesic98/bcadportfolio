import { useMemo } from "react"
import { useLocation } from "react-router-dom"

import skinRail from "../../assets/skin.png"

export default function SkinRails({
  railWidth = 160,
  topBarHeight = 72,
  contentMaxWidth = 1100,
}) {
  const location = useLocation()
  const state = location.state || {}

  const leftImg = state.leftImg || skinRail
  const rightImg = state.rightImg || skinRail
  const clickUrl = state.clickUrl

  const offset = contentMaxWidth / 2 + railWidth

  const leftStyle = useMemo(
    () => ({
      width: `${railWidth}px`,
      top: `${topBarHeight}px`,
      bottom: 0,
      left: `calc(50% - ${offset}px)`,
      backgroundImage: `url(${leftImg})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center top",
      backgroundSize: "cover",
    }),
    [leftImg, railWidth, topBarHeight, offset]
  )

  const rightStyle = useMemo(
    () => ({
      width: `${railWidth}px`,
      top: `${topBarHeight}px`,
      bottom: 0,
      left: `calc(50% + ${contentMaxWidth / 2}px)`,
      backgroundImage: `url(${rightImg})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center top",
      backgroundSize: "cover",
    }),
    [rightImg, railWidth, topBarHeight, contentMaxWidth]
  )

  const LeftTag = clickUrl ? "a" : "div"
  const RightTag = clickUrl ? "a" : "div"

  return (
    <>
      <LeftTag
        {...(clickUrl ? { href: clickUrl, target: "_blank", rel: "noreferrer" } : {})}
        className="fixed z-[999] block cursor-pointer"
        style={leftStyle}
      />
      <RightTag
        {...(clickUrl ? { href: clickUrl, target: "_blank", rel: "noreferrer" } : {})}
        className="fixed z-[999] block cursor-pointer"
        style={rightStyle}
      />
    </>
  )
}
