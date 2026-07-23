import { useEffect, useRef, useState } from "react"
import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"
import InterstitialLayer from "../../components/previews/InterstitialLayer"
import PreviewVariantSwitcher from "../../components/previews/PreviewVariantSwitcher"
import adImg from "../../assets/display_300x600.png"
import {
  assetLooksLikeVideo,
  resolveCreativeAsset,
} from "../../features/proposals/creativeResolver"
import { usePreviewCampaign } from "../../features/proposals/PreviewCampaignContext"
import { usePreviewViewport } from "../../components/previews/previewViewport.jsx"

const INSTRUCTION_VISIBLE_MS = 2000
const INSTRUCTION_FADE_MS = 800
const SIZE_OPTIONS = {
  mobile: [
    { value: "320x480", label: "320x480" },
    { value: "300x600", label: "300x600" },
  ],
  desktop: [
    { value: "640x480", label: "640x480" },
    { value: "800x600", label: "800x600" },
  ],
}

function InterstitialPreviewContent() {
  const { campaign } = usePreviewCampaign()
  const { vp } = usePreviewViewport()
  const [armed, setArmed] = useState(true)
  const [open, setOpen] = useState(false)
  const [instructionState, setInstructionState] = useState("visible")
  const [selectedSize, setSelectedSize] = useState(
    vp === "mobile" ? "320x480" : "640x480"
  )
  const rootRef = useRef(null)
  const creativeAsset = resolveCreativeAsset(campaign, "interstitial", adImg)
  const [selectedWidth, selectedHeight] = selectedSize.split("x").map(Number)

  useEffect(() => {
    setSelectedSize(vp === "mobile" ? "320x480" : "640x480")
  }, [vp])

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
      <PreviewVariantSwitcher
        value={selectedSize}
        options={SIZE_OPTIONS[vp] || SIZE_OPTIONS.desktop}
        onChange={setSelectedSize}
        label={`${vp === "mobile" ? "Mobile" : "Desktop"} interstitial size`}
      />

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
          <div className="inline-flex max-w-full overflow-hidden">
            {assetLooksLikeVideo(creativeAsset) ? (
              <video
                src={creativeAsset}
                className="block h-auto w-auto max-w-full object-contain"
                style={{
                  maxWidth: `min(${selectedWidth}px, calc(100vw - ${vp === "mobile" ? 48 : 80}px))`,
                  maxHeight: `min(${selectedHeight}px, calc(100dvh - 180px))`,
                }}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={creativeAsset}
                alt="Interstitial advertising creative"
                className="block h-auto w-auto max-w-full object-contain"
                style={{
                  maxWidth: `min(${selectedWidth}px, calc(100vw - ${vp === "mobile" ? 48 : 80}px))`,
                  maxHeight: `min(${selectedHeight}px, calc(100dvh - 180px))`,
                }}
              />
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
