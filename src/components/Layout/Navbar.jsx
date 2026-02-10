import { useMemo, useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import closeImg from "../../assets/close.png"
import menuImg from "../../assets/menu.png"
import logo from "../../assets/BClogo.png"
import { endemicCatalog } from "../../data/endemicCatalog"
import { nonEndemicCatalog } from "../../data/nonEndemicCatalog"
import {
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

  const getLinkClass = ({ isActive }) =>
    `cursor-pointer transition-all duration-200 pb-1 ${
      isActive
        ? "text-green-500 border-b-2 border-green-500"
        : "hover:text-green-500 text-black"
    }`

  const buildRegionLink = (nextRegion) => ({
    pathname: `/${nextRegion}`,
    search: `?segment=${segment}`,
  })

  const previewTarget = segment === "endemic" ? endemicCatalog[0] : nonEndemicCatalog[0]

  const openPreview = () => {
    if (!previewTarget) return
    setIsOpen(false)
    navigate(`/${region}/${segment}/preview/${previewTarget.formatId}`)
  }

  return (
    <nav className="flex justify-between items-center p-6 border-b border-gray-300 text-xl shadow-lg relative bg-white z-50">
      <img src={logo} alt="logo-img" className="w-20 h-20 rounded-md shadow-lg" />

      <ul className="hidden md:flex gap-16">
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
      </ul>

      <button
        type="button"
        onClick={openPreview}
        className="hidden md:inline-flex relative items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 focus:ring-4 focus:outline-none focus:ring-lime-200"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-black rounded-md group-hover:bg-transparent">
          Ads Preview
        </span>
      </button>

      <button
        type="button"
        className="block md:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img
          src={isOpen ? closeImg : menuImg}
          alt="menu toggle"
          className="w-6 h-6"
        />
      </button>

      {isOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-white shadow-md md:hidden z-40">
          <ul className="flex flex-col items-center gap-4 py-6">
            <li onClick={() => setIsOpen(false)}>
              <NavLink to={buildRegionLink("usa")} className={getLinkClass} end>
                USA
              </NavLink>
            </li>
            <li onClick={() => setIsOpen(false)}>
              <NavLink to={buildRegionLink("latam")} className={getLinkClass}>
                LATAM
              </NavLink>
            </li>
            <li onClick={() => setIsOpen(false)}>
              <NavLink to={buildRegionLink("europe")} className={getLinkClass}>
                EUROPE
              </NavLink>
            </li>

            <button
              type="button"
              onClick={openPreview}
              className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
            >
              Ads Preview
            </button>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
