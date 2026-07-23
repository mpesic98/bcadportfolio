import { betsenseCatalog } from "./endemicCatalog"
import { nonEndemicCatalog } from "./nonEndemicCatalog"

export const publicCatalog = [...nonEndemicCatalog, ...betsenseCatalog]

export const publicCatalogById = publicCatalog.reduce((acc, item) => {
  acc[item.formatId] = item
  return acc
}, {})
