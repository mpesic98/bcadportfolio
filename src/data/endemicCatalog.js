import slider from "../assets/slider.png"
import displayBanner from "../assets/displaybanner.png"
import adtype3 from "../assets/adtype3.png"
import exampleImg from "../assets/exampleImg.png"
import adImg from "../assets/adImg.jpg"
import interscrollerImg from "../assets/Interscroller.jpg"

export const endemicCatalog = [
  {
    formatId: "endemic-bet-boost",
    title: "Bet Boost",
    previewKind: "generic",
    cardImage: slider,
    hoverImage: displayBanner,
    showcaseSlides: [
      { id: "a", title: "Bet Boost A", image: slider },
      { id: "b", title: "Bet Boost B", image: displayBanner },
    ],
    specs: {
      sizes: ["Widget: responsive", "Inline card", "Mobile sticky card"],
      kpis: ["Interaction Rate", "CTR >= 0.4%", "Conversion Assist"],
      description:
        "Promotional betting widget focused on dynamic boosted odds communication.",
    },
    descriptionByRegion: {
      usa: "US endemic setup highlights boost windows and regional market availability.",
      latam: "LATAM endemic setup emphasizes football matchday boosts and mobile discovery.",
      europe: "EU endemic setup emphasizes market depth and compliance-safe promotion labels.",
    },
  },
  {
    formatId: "endemic-pro-acca",
    title: "Pro Acca",
    previewKind: "generic",
    cardImage: displayBanner,
    hoverImage: adtype3,
    showcaseSlides: [
      { id: "a", title: "Pro Acca A", image: displayBanner },
      { id: "b", title: "Pro Acca B", image: adtype3 },
    ],
    specs: {
      sizes: ["Desktop inline card", "Sidebar module", "Mobile card"],
      kpis: ["CTR >= 0.35%", "Selections Added", "Engaged Time"],
      description:
        "Accumulator recommendation module designed for high-intent audience moments.",
    },
    descriptionByRegion: {
      usa: "US pro-acca emphasizes fewer legs with stronger explanatory copy.",
      latam: "LATAM pro-acca emphasizes match context and concise odds visual hierarchy.",
      europe: "EU pro-acca emphasizes multi-league combinations and transparent labeling.",
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
    descriptionByRegion: {
      usa: "US countdown emphasizes event reminders and pre-game engagement windows.",
      latam: "LATAM countdown emphasizes derby/event urgency and compact mobile layout.",
      europe: "EU countdown emphasizes fixture cadence and multilingual timing labels.",
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
    descriptionByRegion: {
      usa: "US multi-event emphasizes key league bundles and low-friction selection.",
      latam: "LATAM multi-event emphasizes football-heavy bundles with concise cards.",
      europe: "EU multi-event emphasizes deep market lists with stable navigation.",
    },
  },
  {
    formatId: "endemic-game-center",
    title: "Game Center",
    previewKind: "generic",
    cardImage: adImg,
    hoverImage: displayBanner,
    showcaseSlides: [
      { id: "a", title: "Game Center A", image: adImg },
      { id: "b", title: "Game Center B", image: displayBanner },
    ],
    specs: {
      sizes: ["Full-width module", "Desktop split view", "Mobile tabbed view"],
      kpis: ["Time in Module", "Interaction Rate", "CTR >= 0.4%"],
      description:
        "Rich module aggregating match context, odds and engagement actions in one place.",
    },
    descriptionByRegion: {
      usa: "US game-center focuses on major leagues and event-day engagement depth.",
      latam: "LATAM game-center focuses on football-centric event cards and quick actions.",
      europe: "EU game-center focuses on multi-competition depth and compact navigation.",
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
    descriptionByRegion: {
      usa: "US line-up modules focus on roster news and matchday context.",
      latam: "LATAM line-up modules focus on starters updates and rapid mobile scanning.",
      europe: "EU line-up modules focus on squad updates across multiple competitions.",
    },
  },
]

export const endemicById = endemicCatalog.reduce((acc, item) => {
  acc[item.formatId] = item
  return acc
}, {})
