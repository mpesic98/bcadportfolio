import { useId } from "react"

function ShirtPattern({ patternType, primaryColor, secondaryColor, accentColor }) {
  switch (patternType) {
    case "stripes":
      return (
        <>
          <rect width="120" height="128" fill={primaryColor} />
          <rect x="16" width="14" height="128" fill={secondaryColor} />
          <rect x="44" width="14" height="128" fill={secondaryColor} />
          <rect x="72" width="14" height="128" fill={secondaryColor} />
          <rect x="100" width="14" height="128" fill={secondaryColor} />
        </>
      )
    case "hoops":
      return (
        <>
          <rect width="120" height="128" fill={primaryColor} />
          <rect y="22" width="120" height="18" fill={secondaryColor} />
          <rect y="52" width="120" height="18" fill={secondaryColor} />
          <rect y="82" width="120" height="18" fill={secondaryColor} />
        </>
      )
    case "sash":
      return (
        <>
          <rect width="120" height="128" fill={primaryColor} />
          <polygon points="-10,18 22,0 130,110 98,128" fill={secondaryColor} />
        </>
      )
    case "pinstripes":
      return (
        <>
          <rect width="120" height="128" fill={primaryColor} />
          {Array.from({ length: 8 }).map((_, index) => (
            <rect key={index} x={11 + index * 13} width="2" height="128" fill={secondaryColor} opacity="0.85" />
          ))}
        </>
      )
    case "halves":
      return (
        <>
          <rect width="60" height="128" fill={primaryColor} />
          <rect x="60" width="60" height="128" fill={secondaryColor} />
        </>
      )
    default:
      return <rect width="120" height="128" fill={primaryColor} />
  }
}

export default function TeamKitSvg({
  teamName,
  logoUrl,
  primaryColor = "#e2e8f0",
  secondaryColor = "#0f172a",
  accentColor = "#ffffff",
  patternType = "solid",
  size = 72,
}) {
  const clipPathId = useId().replace(/:/g, "")

  return (
    <svg
      viewBox="0 0 120 128"
      width={size}
      height={size}
      role="img"
      aria-label={`${teamName} kit`}
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        <clipPath id={`kit-shape-${clipPathId}`}>
          <path d="M33 14 46 6h28l13 8 17-4 12 23-18 13v60c0 10-8 18-18 18H40c-10 0-18-8-18-18V46L4 33l12-23z" />
        </clipPath>
      </defs>

      <g clipPath={`url(#kit-shape-${clipPathId})`}>
        <ShirtPattern
          patternType={patternType}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          accentColor={accentColor}
        />
      </g>

      <path
        d="M33 14 46 6h28l13 8 17-4 12 23-18 13v60c0 10-8 18-18 18H40c-10 0-18-8-18-18V46L4 33l12-23z"
        fill="none"
        stroke="rgba(15, 23, 42, 0.14)"
        strokeWidth="2"
      />
      <path d="M47 7h26l-5 12H52z" fill={accentColor} opacity="0.95" />
      <path d="M21 39h19v10H21zm59 0h19v10H80z" fill={accentColor} opacity="0.88" />

      {logoUrl ? (
        <g>
          <circle cx="84" cy="42" r="11" fill="rgba(255,255,255,0.96)" />
          <image href={logoUrl} x="74" y="32" width="20" height="20" preserveAspectRatio="xMidYMid meet" />
        </g>
      ) : null}
    </svg>
  )
}
