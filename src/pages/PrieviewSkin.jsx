import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SkinPreview({
  railWidth = 160,
  contentMaxWidth = 1100,
  topBarHeight = 72,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  // Receives state passed from the Card component
  const { leftImg, rightImg, clickUrl } = location.state || {};

  const railStyleLeft = useMemo(
    () => ({
      width: `${railWidth}px`,
      top: `${topBarHeight}px`,
      backgroundImage: leftImg ? `url(${leftImg})` : undefined,
    }),
    [leftImg, railWidth, topBarHeight]
  );

  const railStyleRight = useMemo(
    () => ({
      width: `${railWidth}px`,
      top: `${topBarHeight}px`,
      backgroundImage: rightImg ? `url(${rightImg})` : undefined,
    }),
    [rightImg, railWidth, topBarHeight]
  );

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Navigation Header */}
      <div
        className="fixed left-0 right-0 z-40 bg-white/80 backdrop-blur border-b border-neutral-200"
        style={{ height: `${topBarHeight}px` }}
      >
        <div className="mx-auto h-full flex items-center justify-between px-6" style={{ maxWidth: `${contentMaxWidth}px` }}>
          <button 
            onClick={() => navigate(-1)} 
            className="px-4 py-1.5 bg-neutral-900 text-white rounded text-sm font-medium hover:bg-neutral-700 cursor-pointer"
          >
            ← Back
          </button>
          <div className="h-6 w-40 rounded bg-neutral-200" />
        </div>
      </div>

      {/* Ad Rails */}
      <div className="fixed left-0 z-20 bg-center bg-cover bg-no-repeat" style={railStyleLeft} />
      <div className="fixed right-0 z-20 bg-center bg-cover bg-no-repeat" style={railStyleRight} />

      {/* Mock Content */}
      <main className="relative z-10 pt-[72px]">
        <div className="mx-auto px-6" style={{ maxWidth: `${contentMaxWidth}px` }}>
          <div className="py-10">
            <div className="h-9 w-2/3 rounded bg-neutral-200" />
            <div className="mt-8 grid grid-cols-12 gap-6">
              <div className="col-span-8">
                <div className="h-96 rounded bg-neutral-200/50 border-2 border-dashed border-neutral-300 flex items-center justify-center text-neutral-400">
                  Main Content Area
                </div>
              </div>
              <div className="col-span-4 space-y-6">
                <div className="h-40 rounded bg-neutral-200" />
                <div className="h-40 rounded bg-neutral-200" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}