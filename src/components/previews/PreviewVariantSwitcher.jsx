import { createPortal } from "react-dom"

export default function PreviewVariantSwitcher({
  value,
  options,
  onChange,
  label = "Creative variant",
  positionClassName = "bottom-4 right-4",
}) {
  const switcher = (
    <div className={`fixed z-[3201] pointer-events-none ${positionClassName}`}>
      <div
        className="pointer-events-auto flex max-w-[calc(100vw-1rem)] flex-nowrap items-center gap-1 rounded-xl border border-neutral-200 bg-white/90 p-1 shadow-sm backdrop-blur sm:gap-2"
        role="group"
        aria-label={label}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={[
              "whitespace-nowrap rounded-lg border px-2 py-1.5 text-xs font-medium transition sm:px-3 sm:text-sm",
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

  return typeof document !== "undefined"
    ? createPortal(switcher, document.body)
    : switcher
}
