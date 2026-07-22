import { globalAdSpecs2026 } from "../../data/globalAdSpecs2026"

function SpecList({ label, values }) {
  if (!values?.length) return null

  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/48">{label}</h4>
      <ul className="mt-2 space-y-1.5 text-sm leading-6 text-white/72">
        {values.map((value) => <li key={value}>• {value}</li>)}
      </ul>
    </div>
  )
}

function formatFileLimit(value) {
  if (typeof value === "string") return value
  return Object.entries(value || {})
    .map(([device, limit]) => `${device}: ${limit}`)
    .join(" · ")
}

function SupportFlag({ label, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
      <span className="block text-[10px] uppercase tracking-[0.15em] text-white/42">{label}</span>
      <span className="mt-1 block text-sm font-semibold text-white">{value ? "Supported" : "Not supported"}</span>
    </div>
  )
}

function FileLimits({ fileLimits }) {
  if (!fileLimits) return null
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/48">File limits</h4>
      <ul className="mt-2 space-y-1.5 text-sm leading-6 text-white/72">
        {Object.entries(fileLimits).map(([key, value]) => (
          <li key={key}>• {key.replaceAll(/([A-Z])/g, " $1")}: {formatFileLimit(value)}</li>
        ))}
      </ul>
    </div>
  )
}

function TechnicalRequirements({ spec }) {
  return (
    <SpecList
      label="Technical requirements"
      values={[
        spec.maxLength && `Maximum length: ${spec.maxLength}`,
        spec.bitrate && `Bitrate: ${spec.bitrate}`,
        spec.frameRate && `Frame rate: ${spec.frameRate}`,
        spec.animation && `Animation: ${spec.animation}`,
        spec.audioPolicy && `Audio: ${spec.audioPolicy}`,
        spec.labelingRequirements && `Labeling: ${spec.labelingRequirements}`,
        spec.setupNotes && `Setup: ${spec.setupNotes}`,
      ].filter(Boolean)}
    />
  )
}

function SupportGrid({ support }) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-2">
      <SupportFlag label="PMP" value={support.pmp} />
      <SupportFlag label="PG" value={support.pg} />
      <SupportFlag label="3rd party" value={support.thirdParty} />
    </div>
  )
}

function SpecHeader({ spec }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--bc-green-soft)]">
          2026 specification · {spec.section.replace("-", " ")}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-white">{spec.name}</h3>
      </div>
      <span className="bc-pill bc-pill--glass">Updated {spec.sourceUpdatedAt}</span>
    </div>
  )
}

function FormatSpecCard({ spec, compact }) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5">
      <SpecHeader spec={spec} />
      <div className={["mt-4 grid gap-4", compact ? "" : "md:grid-cols-2"].join(" ")}>
        <SpecList label="Dimensions" values={spec.dimensions} />
        <SpecList label="Included units" values={spec.includedUnits} />
        <SpecList label="Devices" values={spec.devices} />
        <SpecList label="Accepted formats / inputs" values={spec.acceptedFormats} />
        <SpecList label="Tracking" values={spec.tracking} />
        <FileLimits fileLimits={spec.fileLimits} />
        <TechnicalRequirements spec={spec} />
        <SpecList label="Operational notes" values={spec.operationalNotes} />
      </div>
      <SupportGrid support={spec.support} />
    </section>
  )
}

function DisplayBundleSpecs({ specs, compact }) {
  const shared = specs[0]
  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--bc-green-soft)]">
              2026 specification · display
            </p>
            <h3 className="mt-1 text-lg font-semibold text-white">Display placements</h3>
          </div>
          <span className="bc-pill bc-pill--glass">Updated {shared.sourceUpdatedAt}</span>
        </div>
        <div className={["mt-4 grid gap-3", compact ? "" : "sm:grid-cols-2"].join(" ")}>
          {specs.map((spec) => (
            <div key={spec.id} className="rounded-lg border border-white/10 bg-black/10 p-3">
              <h4 className="text-sm font-semibold text-white">{spec.name}</h4>
              <p className="mt-1 text-xs leading-5 text-white/64">{spec.dimensions.join(" · ")}</p>
              <p className="text-xs leading-5 text-white/48">{spec.devices.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5">
        <h3 className="text-base font-semibold text-white">Shared display delivery requirements</h3>
        <div className={["mt-4 grid gap-4", compact ? "" : "md:grid-cols-2"].join(" ")}>
          <SpecList label="Accepted formats / inputs" values={shared.acceptedFormats} />
          <FileLimits fileLimits={shared.fileLimits} />
          <TechnicalRequirements spec={shared} />
          <SpecList label="Operational notes" values={shared.operationalNotes} />
        </div>
        <SupportGrid support={shared.support} />
      </section>
    </div>
  )
}

export function FormatSpecsContent({ formatData, compact = false }) {
  const officialSpecs = formatData?.officialSpecs || []

  if (!officialSpecs.length) {
    const isLegacy = formatData?.specStatus === "legacy"
    return (
      <div className="rounded-xl border border-amber-200/20 bg-amber-100/8 p-4 text-sm leading-6 text-white/70">
        <span className="font-semibold text-white">{isLegacy ? "Legacy" : "Custom"} format.</span>{" "}
        {isLegacy
          ? "This format is retained for compatibility and is not explicitly defined in the supplied Global Ad Specs 2026 document."
          : "This portfolio offering remains available, but it is not presented as an official format from the supplied Global Ad Specs 2026 document."}
      </div>
    )
  }

  if ((formatData?.formatId || formatData?.id) === "display-banners" && officialSpecs.length > 1) {
    return <DisplayBundleSpecs specs={officialSpecs} compact={compact} />
  }

  return <div className="space-y-4">{officialSpecs.map((spec) => <FormatSpecCard key={spec.id} spec={spec} compact={compact} />)}</div>
}

export function GlobalPoliciesAndFaq() {
  return (
    <div className="space-y-3">
      <details className="rounded-xl border border-white/10 bg-white/5 p-4">
        <summary className="cursor-pointer text-sm font-semibold text-white">Shared delivery policies</summary>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-white/68">
          {globalAdSpecs2026.globalPolicies.map((policy) => <li key={policy}>• {policy}</li>)}
        </ul>
        <p className="mt-3 rounded-lg border border-amber-200/20 bg-amber-100/8 p-3 text-xs leading-5 text-white/68">
          {globalAdSpecs2026.clarifications.html5}
        </p>
      </details>
      <details className="rounded-xl border border-white/10 bg-white/5 p-4">
        <summary className="cursor-pointer text-sm font-semibold text-white">Global ad specs FAQ</summary>
        <dl className="mt-3 space-y-3 text-sm leading-6 text-white/68">
          {globalAdSpecs2026.faq.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold text-white/88">{item.question}</dt>
              <dd>{item.answer}</dd>
            </div>
          ))}
        </dl>
      </details>
    </div>
  )
}
