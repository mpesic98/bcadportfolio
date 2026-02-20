import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"
import { useLocation } from "react-router-dom"
import { useMemo, useState } from "react"
import skinBg from "../../assets/skincocacola.png"
import defaultLeftRail from "../../assets/sideskin.png"
import defaultRightRail from "../../assets/sideskin.png"
import FullWidthSkinLayer from "../../components/previews/FullWidthSkinLayer.jsx"

const VERSION_LABELS = {
  v1: "Fullwidth sin fondo",
  v3: "Fullwidth con fondo",
  v2: "Rails tipo site",
}

export default function SkinPreview() {
  const location = useLocation()
  const isMobile = new URLSearchParams(location.search).get("vp") === "mobile"
  const [version, setVersion] = useState("v1")
  const state = location.state || {}

  const leftRail = state.leftImg || defaultLeftRail
  const rightRail = state.rightImg || defaultRightRail
  const clickUrl = state.clickUrl

  const renderSkinRailsOnly = useMemo(() => {
    const railStyle = "w-full h-full overflow-hidden rounded border border-neutral-300 bg-neutral-100"

    const buildRail = (src, alt) => (
      <div className={railStyle}>
        <img src={src} alt={alt} draggable="false" className="h-full w-full object-cover" />
      </div>
    )

    const wrap = (node) =>
      clickUrl ? (
        <a href={clickUrl} target="_blank" rel="noreferrer">
          {node}
        </a>
      ) : (
        node
      )

    return (slotId) => {
      if (slotId === "rail_left_160x600") return wrap(buildRail(leftRail, "Skin rail left"))
      if (slotId === "rail_right_160x600") return wrap(buildRail(rightRail, "Skin rail right"))
      return null
    }
  }, [clickUrl, leftRail, rightRail])

  const renderNoCreatives = useMemo(() => () => null, [])

  if (isMobile) {
    return (
      <PreviewFrame maxWidth={1100} controlsMaxWidth={1100}>
        <div className="px-4 py-4">
          <div className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white p-1">
            {Object.keys(VERSION_LABELS).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setVersion(key)}
                className={[
                  "px-3 py-1.5 rounded text-sm font-medium border transition",
                  version === key
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50",
                ].join(" ")}
              >
                {VERSION_LABELS[key]}
              </button>
            ))}
          </div>
        </div>

        <BaseNewsMock renderAd={renderNoCreatives} mobileStickyMode="fixed" />
      </PreviewFrame>
    )
  }

  return (
    <PreviewFrame maxWidth={1100} controlsMaxWidth={1100}>
      <div className="fixed bottom-4 right-4 z-[3201] pointer-events-none">
        <div className="pointer-events-auto flex flex-wrap items-center gap-2 rounded-xl border border-neutral-200 bg-white/90 backdrop-blur p-1 shadow-sm">
          {Object.keys(VERSION_LABELS).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setVersion(key)}
              className={[
                "px-3 py-1.5 rounded-lg text-sm font-medium border transition",
                version === key
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50",
              ].join(" ")}
            >
              {VERSION_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      {version === "v1" ? (
        <>
          <FullWidthSkinLayer
            imageUrl={skinBg}
            clickUrl={clickUrl}
            showBehindContent={false}
            safeWidth={1080}
            siteBgColor="#fff"
          />
          <div className="relative z-10">
            <BaseNewsMock
              renderAd={renderNoCreatives}
              mobileStickyMode="fixed"
              containerClassName="bg-transparent"
            />
          </div>
        </>
      ) : null}

      {version === "v2" ? (
        <BaseNewsMock renderAd={renderSkinRailsOnly} mobileStickyMode="fixed" showDesktopRails />
      ) : null}

      {version === "v3" ? (
        <>
          <FullWidthSkinLayer
            imageUrl={skinBg}
            clickUrl={clickUrl}
            showBehindContent
            safeWidth={1080}
            siteBgColor="#fff"
          />
          <div className="relative z-10">
            <BaseNewsMock
              renderAd={renderNoCreatives}
              mobileStickyMode="fixed"
              containerClassName="bg-transparent"
            />
          </div>
        </>
      ) : null}
    </PreviewFrame>
  )
}
