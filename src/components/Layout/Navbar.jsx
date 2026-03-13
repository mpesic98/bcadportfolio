import { useEffect, useMemo, useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import logo from "../../assets/BClogo.png"
import { endemicCatalog } from "../../data/endemicCatalog"
import { nonEndemicCatalog } from "../../data/nonEndemicCatalog"
import {
  buildLandingPath,
  normalizeSegment,
  resolveRegionFromPath,
} from "../../data/regionConfig"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const region = useMemo(
    () => resolveRegionFromPath(location.pathname),
    [location.pathname]
  )

  const segment = useMemo(() => {
    const search = new URLSearchParams(location.search)
    return normalizeSegment(search.get("segment"))
  }, [location.search])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname, location.search])

  const getLinkClass = ({ isActive }) =>
    `cursor-pointer border-b-2 border-transparent pb-1 text-sm font-medium tracking-wide transition-colors duration-200 ${
      isActive
        ? "border-green-500 text-white"
        : "text-white/70 hover:text-white"
    }`

  const buildRegionLink = (nextRegion) => ({
    pathname: buildLandingPath(nextRegion),
    search: `?segment=${segment}`,
  })

  const previewTarget = segment === "endemic" ? endemicCatalog[0] : nonEndemicCatalog[0]

  const openPreview = () => {
    if (!previewTarget) return
    setIsOpen(false)
    navigate(`/${region}/${segment}/preview/${previewTarget.formatId}`)
  }

  return (
    <nav className="sticky top-0 z-50 h-[72px] border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto grid h-full max-w-[1120px] grid-cols-[1fr_auto_1fr] items-center px-4 md:px-6">
        <NavLink to={buildRegionLink(region)} className="inline-flex w-fit items-center">
          <img src={logo} alt="Better Collective Ads" className="h-10 w-auto rounded-md" />
        </NavLink>

        <ul className="hidden items-center gap-10 md:flex">
          <li>
            <NavLink to={buildRegionLink("usa")} className={getLinkClass} end>
              USA
            </NavLink>
          </li>
          <li>
            <NavLink to={buildRegionLink("latam")} className={getLinkClass}>
              LATAM
            </NavLink>
          </li>
          <li>
            <NavLink to={buildRegionLink("europe")} className={getLinkClass}>
              EUROPE
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin" className={getLinkClass}>
              Proposal Studio
            </NavLink>
          </li>
        </ul>

        <div className="hidden justify-end md:flex">
          <button
            type="button"
            onClick={openPreview}
            className="rounded-full border border-green-400/40 px-5 py-2.5 text-sm font-medium text-green-200 transition-colors hover:bg-green-500/10"
          >
            Ads Preview
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="col-start-3 justify-self-end rounded-full border border-white/20 p-2 md:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-white transition-all ${
                isOpen ? "top-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 bg-white transition-opacity ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-5 bg-white transition-all ${
                isOpen ? "top-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-[#0D1118]/95 px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-2">
            <li>
              <NavLink to={buildRegionLink("usa")} className={getLinkClass} end>
                USA
              </NavLink>
            </li>
            <li>
              <NavLink to={buildRegionLink("latam")} className={getLinkClass}>
                LATAM
              </NavLink>
            </li>
            <li>
              <NavLink to={buildRegionLink("europe")} className={getLinkClass}>
                EUROPE
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" className={getLinkClass}>
                Proposal Studio
              </NavLink>
            </li>
          </ul>

          <button
            type="button"
            onClick={openPreview}
            className="mt-4 w-full rounded-full border border-green-400/40 px-4 py-2.5 text-sm font-medium text-green-200 transition-colors hover:bg-green-500/10"
          >
            Ads Preview
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
