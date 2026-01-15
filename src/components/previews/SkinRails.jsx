import { useMemo } from "react"
import { useLocation } from "react-router-dom"
import skinL from "../../assets/skinl.png"
import skinR from "../../assets/skinr.png"

export default function SkinRails({
  railWidth = 160,
  topBarHeight = 108,
  contentMaxWidth = 1052,
}) {
  const location = useLocation()
  const state = location.state || {}

  const leftImg = state.leftImg || skinL
  const rightImg = state.rightImg || skinR
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

  const linkProps = clickUrl
    ? { href: clickUrl, target: "_blank", rel: "noreferrer" }
    : {}

  return (
    <>
      <LeftTag {...linkProps} className="fixed z-[999] block cursor-pointer" style={leftStyle} />
      <RightTag {...linkProps} className="fixed z-[999] block cursor-pointer" style={rightStyle} />
    </>
  )
}
