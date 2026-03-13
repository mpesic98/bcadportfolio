import { useEffect, useRef, useState } from "react"
import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"
import InterstitialLayer from "../../components/previews/InterstitialLayer"
import adImg from "../../assets/300x600.jpg"
import {
  assetLooksLikeVideo,
  resolveCreativeAsset,
} from "../../features/proposals/creativeResolver"
import { usePreviewCampaign } from "../../features/proposals/PreviewCampaignContext"

const INSTRUCTION_VISIBLE_MS = 2000
const INSTRUCTION_FADE_MS = 800

export default function InterstitialPreview() {
  const { campaign } = usePreviewCampaign()
  const [armed, setArmed] = useState(true)
  const [open, setOpen] = useState(false)
  const [instructionState, setInstructionState] = useState("visible")
  const rootRef = useRef(null)
  const creativeAsset = resolveCreativeAsset(campaign, "interstitial", adImg)
  const clickUrl = campaign?.landingPageUrl || "https://example.com"

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const onFirstUserClick = (e) => {
      if (!armed) return
      if (open) return

      const target = e.target
      if (target?.closest?.('[data-no-interstitial="1"]')) return

      setOpen(true)
      setArmed(false)
    }

    el.addEventListener("click", onFirstUserClick, true)
    return () => el.removeEventListener("click", onFirstUserClick, true)
  }, [armed, open])

  useEffect(() => {
    if (instructionState !== "visible") return undefined

    const fadeTimer = window.setTimeout(() => {
      setInstructionState("fading")
    }, INSTRUCTION_VISIBLE_MS)

    return () => window.clearTimeout(fadeTimer)
  }, [instructionState])

  useEffect(() => {
    if (instructionState !== "fading") return undefined

    const hideTimer = window.setTimeout(() => {
      setInstructionState("hidden")
    }, INSTRUCTION_FADE_MS)

    return () => window.clearTimeout(hideTimer)
  }, [instructionState])

  useEffect(() => {
    if (open) setInstructionState("hidden")
  }, [open])

  const renderAd = () => null

  return (
    <PreviewFrame maxWidth={1100}>
      <div ref={rootRef}>
        <BaseNewsMock renderAd={renderAd} />
      </div>

      {instructionState !== "hidden" ? (
        <div
          aria-hidden="true"
          className={[
            "fixed inset-0 z-[3100] flex items-center justify-center bg-neutral-900/70",
            "transition-opacity duration-[800ms] ease-out pointer-events-none",
            instructionState === "fading" ? "opacity-0" : "opacity-100",
          ].join(" ")}
        >
          <div className="px-5 py-3 rounded-md text-white text-base md:text-lg font-medium tracking-wide">
            Click to see interstitial
          </div>
        </div>
      ) : null}

      <InterstitialLayer
        isOpen={open}
        onClose={() => setOpen(false)}
        clickUrl={clickUrl}
        creative={
          <div className="w-[320px] h-[480px] md:w-[300px] md:h-[600px] overflow-hidden">
            {assetLooksLikeVideo(creativeAsset) ? (
              <video
                src={creativeAsset}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img src={creativeAsset} alt="" className="w-full h-full object-cover" />
            )}
          </div>
        }
      />
    </PreviewFrame>
  )
}
