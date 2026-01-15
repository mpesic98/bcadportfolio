import adA from "../../assets/adImg.jpg"
import adB from "../../assets/displaybanner.png"
import adC from "../../assets/exampleImg.png"
import adD from "../../assets/adtype3.png"
import adE from "../../assets/slider.png"

export default function DisplayCreative({ slotId, size = "300x250" }) {
  const map = {
    top_1070x27: adB,
    sidebar_300x250_1: adA,
    sidebar_300x250_2: adC,
    inline_300x600: adD,
    inline_300x250_1: adE
  }

  const [w, h] = size.split("x").map(Number)
  const src = map[slotId] || adA

  return (
    <div className="w-full flex justify-center">
      <div
        className="relative overflow-hidden rounded bg-white border border-neutral-300 shadow-sm"
        style={{ width: w, height: h }}
      >
        <img src={src} alt={slotId} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 text-[10px] px-2 py-1 rounded bg-neutral-900 text-white">
          {slotId} · {w}x{h}
        </div>
      </div>
    </div>
  )
}
