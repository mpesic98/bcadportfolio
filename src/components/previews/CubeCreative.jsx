import { useMemo, useState } from "react"

const DEFAULT_CLICK_URL =
  "https://adclick.g.doubleclick.net/pcs/click?xai=AKAOjstvqUwPljrUuwQ-mWUTjyL5KNUrZoUzxXkgPMP8-Lx5BlzZUbmJEA8XgJwH0z9yjBvfUEU-s5xTZO7ijMYvY9ib7D854KcUAN3Vt3YTWumrrKcKZpGYDLntQMAvUFZuEnhrhNTHhDoOOjqE4pxUj49ziZ5Ny6WpLfHsturkt5nxUOemgqoZRmbwug0R9OfX4N4L0Z_LVrrMPhIJd3gDnrwtR5aZSAwFuvtNdg&sai=AMfl-YQmFB6l7IJqzzRX8xZuRA9Bn5WQLNyTzHzBqVXIawBoa4O3qQLwq4ERm01x1J4MM5kbmZckPzRqsaHiumw5yuo8TbgZQYL_-PdYiM6iMBSJ2G_SIn9G460aRklIXyqX72Rk5lQGwLQfB5Y34Ic1j8WTV9fhZmDzkCyDzQGLZw9sYXbuZGbl445oZj8LXVWdcpYR5mgjabtCCw6kQE78ZEtrPrGdxv1mL6SSkW_buZw&sig=Cg0ArKJSzPTdhr44lzN9EAE&fbs_aeid=%5Bgw_fbsaeid%5D&urlfix=1&adurl=https://www.google.com/"

const DEFAULT_IMAGES = [
  "https://tpc.googlesyndication.com/simgad/6237543862516787629?",
  "https://img1.niftyimages.com/hw1h/cehp/mpsf",
  "https://tpc.googlesyndication.com/simgad/6237543862516787629?",
  "https://img1.niftyimages.com/hw1h/cehp/mpsf",
]

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
      <div
        style={{
          position: "absolute",
          inset: -12,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px)",
          transform: "scale(1.1)",
          backgroundImage: `url("${imageUrl.replace(/"/g, '\\"')}")`,
        }}
      />
      <img
        src={imageUrl}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  )
}

export default function CubeCreative({
  width = 300,
  height = 250,
  clickUrl = DEFAULT_CLICK_URL,
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
    const [img1, img2, img3, img4] = images
    return [img1, img2, img3, img4]
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

      <a
        href={clickUrl}
        target="_blank"
        rel="noopener noreferrer"
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
