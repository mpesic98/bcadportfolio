import HomeFeatured from "../home/HomeFeatured"
import HomeFormatsGrid from "../home/HomeFormatsGrid"
import HomeHero from "../home/HomeHero"
import ProposalFormatsSection from "./ProposalFormatsSection"

export default function PortfolioPage({
  proposal = null,
  featuredItems = [],
  browseItems = [],
  region = "usa",
  onPreview,
  onOpenDetails,
}) {
  return (
    <div className="relative overflow-x-hidden bg-[var(--bc-green)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(1,91,73,0.98) 0%, rgba(1,72,58,0.96) 42%, rgba(8,33,28,0.98) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-4 pb-16 pt-3 md:px-6 md:pb-20">
        <HomeHero />

        {proposal ? (
          <div className="mt-14 md:mt-16">
            <ProposalFormatsSection proposal={proposal} />
          </div>
        ) : (
          <>
            <div id="featured-solutions" className="mt-14 md:mt-16">
              <HomeFeatured items={featuredItems} region={region} onPreview={onPreview} />
            </div>

            <div id="browse-all-formats" className="mt-14 md:mt-20">
              <HomeFormatsGrid
                items={browseItems}
                region={region}
                onPreview={onPreview}
                onOpenDetails={onOpenDetails}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
