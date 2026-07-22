export default function PreviewVariantSwitcher({
  value,
  options,
  onChange,
  label = "Creative variant",
  positionClassName = "bottom-4 right-4",
}) {
  return (
    <div className={`fixed z-[3201] pointer-events-none ${positionClassName}`}>
      <div
        className="pointer-events-auto flex flex-wrap items-center gap-2 rounded-xl border border-neutral-200 bg-white/90 p-1 shadow-sm backdrop-blur"
        role="group"
        aria-label={label}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={[
              "rounded-lg border px-3 py-1.5 text-sm font-medium transition",
              value === option.value
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50",
            ].join(" ")}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
