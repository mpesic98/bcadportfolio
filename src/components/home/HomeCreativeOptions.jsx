export default function HomeCreativeOptions({ options = [], className = "" }) {
  if (!options.length) return null

  return (
    <div
      className={["flex flex-wrap gap-1.5", className].filter(Boolean).join(" ")}
      aria-label="Available creative options"
    >
      {options.map((option) => (
        <span
          key={option}
          className="bc-pill bc-pill--glass"
        >
          {option}
        </span>
      ))}
    </div>
  )
}
