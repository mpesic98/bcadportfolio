export default function PreviewControls({ maxWidth = 1100, children }) {
  return (
    <div className="sticky top-[72px] z-40 bg-neutral-100/90 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto px-6 py-3 flex flex-wrap items-center gap-3" style={{ maxWidth }}>
        {children}
      </div>
    </div>
  )
}
