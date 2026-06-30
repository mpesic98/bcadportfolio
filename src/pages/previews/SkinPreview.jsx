import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"
import { useLocation } from "react-router-dom"
import { useMemo, useState } from "react"
import skinBg from "../../assets/display_Skin.png"
import defaultLeftRail from "../../assets/display_160x600.png"
import defaultRightRail from "../../assets/display_160x600.png"
import FullWidthSkinLayer from "../../components/previews/FullWidthSkinLayer.jsx"
import { resolveCreativeAsset } from "../../features/proposals/creativeResolver"
import { usePreviewCampaign } from "../../features/proposals/PreviewCampaignContext"

const VERSION_LABELS = {
  v1: "Full-width skin",
  v3: "Full-width background",
  v2: "Site rails",
}

export default function SkinPreview() {
  const location = useLocation()
  const { campaign } = usePreviewCampaign()
  const [version, setVersion] = useState("v1")
  const state = location.state || {}

  const leftRail =
    resolveCreativeAsset(campaign, "skin_left") || state.leftImg || defaultLeftRail
  const rightRail =
    resolveCreativeAsset(campaign, "skin_right") || state.rightImg || defaultRightRail
  const backgroundCreative = resolveCreativeAsset(campaign, "skin_background") || skinBg

  const renderSkinRailsOnly = useMemo(() => {
    const railStyle = "w-full h-full cursor-pointer overflow-hidden rounded border border-neutral-300 bg-neutral-100"

    const buildRail = (src, alt) => (
      <div className={railStyle} role="button" tabIndex={0}>
        <img src={src} alt={alt} draggable="false" className="h-full w-full object-cover" />
      </div>
    )

    return (slotId) => {
      if (slotId === "rail_left_160x600") return buildRail(leftRail, "Skin rail left")
      if (slotId === "rail_right_160x600") return buildRail(rightRail, "Skin rail right")
      return null
    }
  }, [leftRail, rightRail])

  const renderNoCreatives = useMemo(() => () => null, [])

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
            imageUrl={backgroundCreative}
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
            imageUrl={backgroundCreative}
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
