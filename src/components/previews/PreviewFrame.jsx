import { useNavigate } from "react-router-dom"

export default function PreviewFrame({ children, maxWidth = 1100 }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-neutral-100 overflow-visible">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-white/80 backdrop-blur border-b border-neutral-200 flex items-center">
        <div className="mx-auto w-full px-6" style={{ maxWidth }}>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-1.5 bg-neutral-900 text-white rounded text-sm font-medium hover:bg-neutral-700"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="relative pt-[72px] z-10 overflow-visible">
        {children}
      </main>
    </div>
  )
}
