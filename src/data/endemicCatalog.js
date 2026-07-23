import slider from "../assets/slider.png"
import displayBannerS from "../assets/displaybanner.png"
import adtype3 from "../assets/adtype3.png"
import exampleImg from "../assets/exampleImg.png"
import adImg from "../assets/adImg.jpg"
import interscrollerImg from "../assets/Interscroller.jpg"
import { withGlobalAdSpecs2026 } from "./globalAdSpecs2026"

// Kept only for backwards-compatible proposal/admin data. These formats are no
// longer exposed by the public portfolio.
export const legacyBetsenseCatalog = [
  {
    formatId: "endemic-bet-boost",
    title: "Bet Boost",
    previewKind: "generic",
    cardImage: slider,
    hoverImage: displayBannerS,
    showcaseSlides: [
      { id: "a", title: "Bet Boost A", image: slider },
      { id: "b", title: "Bet Boost B", image: displayBannerS },
    ],
    specs: {
      sizes: ["Widget: responsive", "Inline card", "Mobile sticky card"],
      kpis: ["Interaction Rate", "CTR >= 0.4%", "Conversion Assist"],
      description:
        "Promotional betting widget focused on dynamic boosted odds communication.",
    },
  },
  {
    formatId: "endemic-pro-acca",
    title: "Pro Acca",
    previewKind: "generic",
    cardImage: displayBannerS,
    hoverImage: adtype3,
    showcaseSlides: [
      { id: "a", title: "Pro Acca A", image: displayBannerS },
      { id: "b", title: "Pro Acca B", image: adtype3 },
    ],
    specs: {
      sizes: ["Desktop inline card", "Sidebar module", "Mobile card"],
      kpis: ["CTR >= 0.35%", "Selections Added", "Engaged Time"],
      description:
        "Accumulator recommendation module designed for high-intent audience moments.",
    },
  },
  {
    formatId: "endemic-countdown",
    title: "Countdown",
    previewKind: "generic",
    cardImage: adtype3,
    hoverImage: exampleImg,
    showcaseSlides: [
      { id: "a", title: "Countdown A", image: adtype3 },
      { id: "b", title: "Countdown B", image: exampleImg },
    ],
    specs: {
      sizes: ["Responsive timer", "Desktop module", "Mobile card"],
      kpis: ["Interaction Rate", "CTR >= 0.3%", "Session Depth"],
      description:
        "Urgency-driven countdown unit for match start, offer expiry and promo windows.",
    },
  },
  {
    formatId: "endemic-multi-event",
    title: "Multi-Event",
    previewKind: "generic",
    cardImage: interscrollerImg,
    hoverImage: slider,
    showcaseSlides: [
      { id: "a", title: "Multi-Event A", image: interscrollerImg },
      { id: "b", title: "Multi-Event B", image: slider },
    ],
    specs: {
      sizes: ["Desktop table module", "Inline widget", "Mobile stacked cards"],
      kpis: ["Interaction Rate", "Selections Added", "CTR >= 0.35%"],
      description:
        "Multi-market selection experience for combining events in a single interaction flow.",
    },
  },
  {
    formatId: "endemic-game-center",
    title: "Game Center",
    previewKind: "generic",
    cardImage: adImg,
    hoverImage: displayBannerS,
    showcaseSlides: [
      { id: "a", title: "Game Center A", image: adImg },
      { id: "b", title: "Game Center B", image: displayBannerS },
    ],
    specs: {
      sizes: ["Full-width module", "Desktop split view", "Mobile tabbed view"],
      kpis: ["Time in Module", "Interaction Rate", "CTR >= 0.4%"],
      description:
        "Rich module aggregating match context, odds and engagement actions in one place.",
    },
  },
  {
    formatId: "endemic-lineups",
    title: "Line-Ups",
    previewKind: "generic",
    cardImage: exampleImg,
    hoverImage: adtype3,
    showcaseSlides: [
      { id: "a", title: "Line-Ups A", image: exampleImg },
      { id: "b", title: "Line-Ups B", image: adtype3 },
    ],
    specs: {
      sizes: ["Sidebar module", "Inline card", "Mobile compact card"],
      kpis: ["CTR >= 0.28%", "Engagement Rate", "Session Extension"],
      description:
        "Contextual line-up module to connect pre-match information with relevant promotions.",
    },
  },
]

const sharedSetupTime = [
  "2 days: existing template and odds available",
  "Approximately 1 week: new design adaptation",
  "Multiple weeks: fully custom widget development",
]

export const betsenseCatalog = [
  {
    formatId: "betsense-countdown",
    title: "Countdown",
    previewKind: "generic",
    creativeOptions: ["Betting Widget", "Responsive"],
    cardImage: adtype3,
    hoverImage: exampleImg,
    showcaseSlides: [
      { id: "a", title: "Countdown widget", image: adtype3 },
    ],
    specStatus: "official",
    specs: {
      sizes: ["Responsive countdown widget"],
      description:
        "A responsive betting widget that counts down to a match, tournament, or campaign moment.",
      type: "Betting Widget",
      assets: [
        "High-resolution transparent PNG or SVG logo",
        "Teams and jerseys",
        "Tournament name",
        "Odds feed",
        "Tracking URLs",
      ],
      technicalNotes: ["Template-based implementation"],
      setupTime: sharedSetupTime,
      support: { pmp: true, pg: true, thirdParty: false },
    },
  },
  {
    formatId: "betsense-three-way-odds",
    title: "Three-way Odds",
    previewKind: "generic",
    creativeOptions: ["Odds Widget", "Template-based"],
    cardImage: interscrollerImg,
    hoverImage: slider,
    showcaseSlides: [
      { id: "a", title: "Three-way odds widget", image: interscrollerImg },
    ],
    specStatus: "official",
    specs: {
      sizes: ["Template-based format"],
      description:
        "A dynamic odds widget presenting three-way markets through a publisher-hosted template.",
      type: "Odds Widget",
      assets: [
        "High-resolution transparent PNG or SVG logo",
        "Teams and jerseys",
        "Odds feed",
        "Team colors",
        "Tracking URLs",
      ],
      technicalNotes: ["Dynamic odds and sports data"],
      setupTime: sharedSetupTime,
      support: { pmp: true, pg: true, thirdParty: false },
    },
  },
].map((format) => withGlobalAdSpecs2026(format))

// Backwards-compatible aliases for code outside the public portfolio. The
// public experience uses the consolidated Betsense naming above.
export const endemicCatalog = betsenseCatalog

export const endemicById = endemicCatalog.reduce((acc, item) => {
  acc[item.formatId] = item
  return acc
}, {})
