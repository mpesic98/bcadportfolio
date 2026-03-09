import { useMemo } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  buildLandingPath,
  normalizeSegment,
  resolveRegionFromPath,
} from "../../data/regionConfig"

const regions = [
  { key: "usa", label: "USA" },
  { key: "latam", label: "LATAM" },
  { key: "europe", label: "EUROPE" },
]

const resources = [
  { label: "Specs", href: "#" },
  { label: "Contact", href: "mailto:ads@bettercollective.com" },
  { label: "Policy", href: "#" },
]

export default function HomeFooter() {
  const location = useLocation()

  const region = useMemo(
    () => resolveRegionFromPath(location.pathname),
    [location.pathname]
  )

  const segment = useMemo(() => {
    const search = new URLSearchParams(location.search)
    return normalizeSegment(search.get("segment"))
  }, [location.search])

  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto max-w-[1120px] px-4 pb-8 pt-10 md:px-6 md:pt-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-lg font-semibold text-white">Better Collective Ads</h2>
            <p className="mt-3 max-w-[290px] text-sm leading-relaxed text-white/60">
              Commercial ad solutions built for agencies and brands that need scale,
              quality, and measurable business impact.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">Regions</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {regions.map((entry) => (
                <li key={entry.key}>
                  <Link
                    to={{
                      pathname: buildLandingPath(entry.key),
                      search: `?segment=${segment}`,
                    }}
                    className={`transition-colors ${
                      entry.key === region
                        ? "text-green-300"
                        : "text-white/65 hover:text-white"
                    }`}
                  >
                    {entry.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">Resources</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {resources.map((entry) => (
                <li key={entry.label}>
                  <a href={entry.href} className="text-white/65 transition-colors hover:text-white">
                    {entry.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-white/40">
          Copyright {new Date().getFullYear()} Better Collective Ads. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
