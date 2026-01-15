import ad1 from "../../assets/adImg.jpg"
import ad2 from "../../assets/displaybanner.png"
import ad3 from "../../assets/exampleImg.png"
import ad4 from "../../assets/adtype3.png"

export default function Display300({ slotId }) {
  const creatives = {
    inline_1: ad1,
    inline_2: ad2,
    sidebar_1: ad3,
    sidebar_2: ad4
  }

  const src = creatives[slotId] || ad1

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-[300px] h-[250px] rounded overflow-hidden border border-neutral-300 bg-white shadow-sm">
        <img src={src} alt={slotId} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 text-[10px] px-2 py-1 rounded bg-neutral-900 text-white">
          {slotId} · 300x250
        </div>
      </div>
    </div>
  )
}
