import { useMemo, useState } from "react"
import cuboImage from "../../assets/cubo.png"

const DEFAULT_IMAGES = [cuboImage, cuboImage, cuboImage, cuboImage]

function Face({ imageUrl, transform }) {
  return (
    <div
      style={{
        position: "absolute",
        width: 210,
        height: 190,
        backfaceVisibility: "hidden",
        overflow: "hidden",
        background: "#0b0b0b",
        transform,
      }}
    >
      <img
        src={imageUrl}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  )
}

export default function CubeCreative({
  width = 300,
  height = 250,
  images = DEFAULT_IMAGES,
  spinSeconds = 12,
  hoverSpinSeconds = 12,
}) {
  const [isHovering, setIsHovering] = useState(false)

  const safeSpinSeconds = Number.isFinite(Number(spinSeconds)) && Number(spinSeconds) > 0 ? spinSeconds : 12
  const safeHoverSpinSeconds =
    Number.isFinite(Number(hoverSpinSeconds)) && Number(hoverSpinSeconds) > 0
      ? hoverSpinSeconds
      : safeSpinSeconds

  const animationDuration = isHovering ? safeHoverSpinSeconds : safeSpinSeconds
  const faces = useMemo(() => {
    const fallback = DEFAULT_IMAGES[0]
    return Array.from({ length: 4 }, (_, index) => images[index] || fallback)
  }, [images])

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      <style>
        {`@keyframes cubeSpin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }`}
      </style>

      <div
        role="button"
        tabIndex={0}
        aria-label="Cube click layer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={() => setIsHovering(true)}
        onTouchEnd={() => setIsHovering(false)}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          display: "block",
          cursor: "pointer",
        }}
      />

      <div style={{ width: 210, height: 190, perspective: 1200 }}>
        <div
          style={{
            width: 210,
            height: 190,
            position: "relative",
            transformStyle: "preserve-3d",
            animationName: "cubeSpin",
            animationDuration: `${animationDuration}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            willChange: "transform",
          }}
        >
          <Face imageUrl={faces[0]} transform="rotateY(0deg) translateZ(105px)" />
          <Face imageUrl={faces[1]} transform="rotateY(90deg) translateZ(105px)" />
          <Face imageUrl={faces[2]} transform="rotateY(180deg) translateZ(105px)" />
          <Face imageUrl={faces[3]} transform="rotateY(-90deg) translateZ(105px)" />
        </div>
      </div>
    </div>
  )
}
