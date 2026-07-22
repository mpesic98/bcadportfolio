import { useEffect, useRef, useState } from "react"
import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"
import InterstitialLayer from "../../components/previews/InterstitialLayer"
import adImg from "../../assets/display_300x600.png"
import {
  assetLooksLikeVideo,
  resolveCreativeAsset,
} from "../../features/proposals/creativeResolver"
import { usePreviewCampaign } from "../../features/proposals/PreviewCampaignContext"
import { usePreviewViewport } from "../../components/previews/previewViewport.jsx"

const INSTRUCTION_VISIBLE_MS = 2000
const INSTRUCTION_FADE_MS = 800

function InterstitialPreviewContent() {
  const { campaign } = usePreviewCampaign()
  const { vp } = usePreviewViewport()
  const [armed, setArmed] = useState(true)
  const [open, setOpen] = useState(false)
  const [instructionState, setInstructionState] = useState("visible")
  const rootRef = useRef(null)
  const creativeAsset = resolveCreativeAsset(campaign, "interstitial", adImg)

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
    <>
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
        creative={
          <div
            className="overflow-hidden"
            style={{ width: vp === "mobile" ? 320 : 640, height: 480, maxWidth: "100%" }}
          >
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
    </>
  )
}

export default function InterstitialPreview() {
  return (
    <PreviewFrame maxWidth={1100}>
      <InterstitialPreviewContent />
    </PreviewFrame>
  )
}
