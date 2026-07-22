import {
  GLOBAL_AD_SPECS_VERSION,
  officialAdFormats2026,
  validateGlobalAdSpecs2026,
} from "../src/data/globalAdSpecs2026.js"

const errors = validateGlobalAdSpecs2026()

if (errors.length) {
  throw new Error(errors.join(" "))
} else {
  console.log(`Global Ad Specs ${GLOBAL_AD_SPECS_VERSION}: ${officialAdFormats2026.length} official formats validated.`)
}
