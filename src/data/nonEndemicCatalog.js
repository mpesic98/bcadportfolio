import displayBannerone from "../assets/banner.png"
import displayBanner from "../assets/displaybanner.png"
import adtype3 from "../assets/adtype3.png"
import skin from "../assets/skin.png"
import skinLeft from "../assets/skinl.png"
import skinRight from "../assets/skinr.png"
import exampleImg from "../assets/exampleImg.png"
import adImg from "../assets/adImg.jpg"
import interscrollerImg from "../assets/Interscroller.jpg"
import slider from "../assets/slider.png"

export const nonEndemicCatalog = [
  {
    formatId: "display-banners",
    title: "Display Banners",
    previewKind: "display",
    cardImage: displayBannerone,
    hoverImage: displayBanner,
    showcaseSlides: [
      { id: "a", title: "Display A", image: displayBanner },
      { id: "b", title: "Display B", image: displayBannerone },
    ],
    specs: {
      sizes: ["Desktop: 970x250, 300x250, 300x600", "Mobile: 320x50, 300x250"],
      kpis: ["Viewability >= 70%", "CTR >= 0.25%", "Attention Time >= 5s"],
      description:
        "High-reach format for upper and mid funnel campaigns with broad inventory coverage.",
    },
    descriptionByRegion: {
      usa: "US setup optimized for broad reach and recurring visibility across sports publishers.",
      latam: "LATAM setup optimized for efficient CPM and mobile-first traffic patterns.",
      europe: "EU setup optimized for compliant placements and premium contextual inventory.",
    },
  },
  {
    formatId: "skin",
    title: "Skin",
    previewKind: "skin",
    cardImage: skin,
    hoverImage: skin,
    leftImg: skinLeft,
    rightImg: skinRight,
    showcaseSlides: [
      { id: "a", title: "Skin Left/Right A", image: skinLeft },
      { id: "b", title: "Skin Left/Right B", image: skinRight },
    ],
    specs: {
      sizes: ["Desktop rails: 160x900", "Companion: 1070x27 / 300x250", "Mobile: fallback display units"],
      kpis: ["Viewability >= 75%", "Brand Lift", "CTR >= 0.15%"],
      description:
        "Takeover-style rails around editorial content for strong branding and high share of voice.",
    },
    descriptionByRegion: {
      usa: "US skin templates tuned for wide desktop layouts and sticky nav experiences.",
      latam: "LATAM skin templates tuned for lighter creatives and fast-loading assets.",
      europe: "EU skin templates tuned for regional compliance and accessibility standards.",
    },
  },
  {
    formatId: "interstitial",
    title: "Interstitial",
    previewKind: "interstitial",
    cardImage: slider,
    hoverImage: adImg,
    showcaseSlides: [
      { id: "a", title: "Interstitial A", image: adImg },
      { id: "b", title: "Interstitial B", image: interscrollerImg },
    ],
    specs: {
      sizes: ["Mobile: 320x480", "Desktop: 300x600 / 320x480", "Trigger: first interaction"],
      kpis: ["Open Rate", "CTR >= 0.8%", "Time to Close"],
      description:
        "Interruptive high-impact layer triggered by user interaction to drive immediate attention.",
    },
    descriptionByRegion: {
      usa: "US interstitial defaults to click-activated launch with brand-safe close controls.",
      latam: "LATAM interstitial prioritizes smooth mobile rendering on constrained devices.",
      europe: "EU interstitial includes stricter close behavior and visible dismissal controls.",
    },
  },
  {
    formatId: "interscroller",
    title: "Interscroller",
    previewKind: "interscroller",
    cardImage: interscrollerImg,
    hoverImage: adImg,
    showcaseSlides: [
      { id: "a", title: "Interscroller A", image: interscrollerImg },
      { id: "b", title: "Interscroller B", image: adImg },
    ],
    specs: {
      sizes: ["Desktop: 300x600, 300x250", "Mobile: 300x250, 300x600", "Behavior: scroll reveal"],
      kpis: ["Viewability >= 70%", "Engaged Time", "CTR >= 0.3%"],
      description:
        "Scroll-reactive creative that reveals while the ad slot is inside the viewport.",
    },
    descriptionByRegion: {
      usa: "US interscroller setup emphasizes smooth reveal transitions on long-read pages.",
      latam: "LATAM interscroller setup emphasizes lightweight assets and fluid mobile scrolling.",
      europe: "EU interscroller setup emphasizes readable overlays and stable in-view behavior.",
    },
  },
  {
    formatId: "video-banners",
    title: "Video Banners",
    previewKind: "video-banners",
    cardImage: displayBanner,
    hoverImage: adtype3,
    showcaseSlides: [
      { id: "a", title: "Video Banner A", image: displayBanner },
      { id: "b", title: "Video Banner B", image: adtype3 },
    ],
    specs: {
      sizes: ["Desktop: 300x250, 300x600", "In-article: 970x250", "Mobile: 300x250"],
      kpis: ["VTR >= 60%", "Viewability >= 70%", "CTR >= 0.35%"],
      description:
        "Video-capable banners designed for autoplay muted playback with lightweight controls.",
    },
    descriptionByRegion: {
      usa: "US video setup focuses on VTR and watch time across high-volume placements.",
      latam: "LATAM video setup balances bitrate and smooth playback on mobile networks.",
      europe: "EU video setup emphasizes consent-safe playback and measurable engagement.",
    },
  },
  {
    formatId: "pre-roll-video",
    title: "Pre-Roll Video",
    previewKind: "pre-roll",
    cardImage: adtype3,
    hoverImage: interscrollerImg,
    showcaseSlides: [
      { id: "a", title: "Pre-Roll A", image: adtype3 },
      { id: "b", title: "Pre-Roll B", image: interscrollerImg },
    ],
    specs: {
      sizes: ["Video: 16:9 and 1:1", "Duration: 6s, 15s, 30s", "Delivery: autoplay muted"],
      kpis: ["VTR >= 70%", "Completion Rate", "CTR >= 0.5%"],
      description:
        "Video ad served before editorial/player content with countdown and configurable CTA.",
    },
    descriptionByRegion: {
      usa: "US pre-roll setup prioritizes completion rate and mid-roll transition stability.",
      latam: "LATAM pre-roll setup prioritizes startup time and low rebuffer rate.",
      europe: "EU pre-roll setup aligns with stricter media and consent expectations.",
    },
    cta: { label: "Visit Partner", url: "https://example.com" },
  },
  {
    formatId: "livescore",
    title: "Livescore",
    previewKind: "generic",
    cardImage: slider,
    hoverImage: displayBanner,
    showcaseSlides: [
      { id: "a", title: "Livescore A", image: slider },
      { id: "b", title: "Livescore B", image: displayBanner },
    ],
    specs: {
      sizes: ["Widget: fluid", "Desktop rail + inline", "Mobile inline card"],
      kpis: ["Engaged Time", "CTR >= 0.3%", "Interaction Rate"],
      description:
        "Contextual widget aligned with live events to increase interaction during match coverage.",
    },
    descriptionByRegion: {
      usa: "US livescore focuses on game-center integrations and league coverage depth.",
      latam: "LATAM livescore focuses on football-first modules and rapid updates.",
      europe: "EU livescore focuses on multi-league depth and multilingual labels.",
    },
  },
  {
    formatId: "countdown-widget",
    title: "Countdown Widget",
    previewKind: "generic",
    cardImage: displayBanner,
    hoverImage: slider,
    showcaseSlides: [
      { id: "a", title: "Countdown A", image: displayBanner },
      { id: "b", title: "Countdown B", image: slider },
    ],
    specs: {
      sizes: ["Widget: fluid / responsive", "Desktop inline", "Mobile card"],
      kpis: ["Interaction Rate", "CTR >= 0.3%", "Session Depth"],
      description:
        "Time-sensitive widget for event countdowns, offer windows and launch moments.",
    },
    descriptionByRegion: {
      usa: "US countdown setup emphasizes pre-game and launch-event promotion windows.",
      latam: "LATAM countdown setup emphasizes local derby and tournament key moments.",
      europe: "EU countdown setup emphasizes fixture-based activation and urgency messaging.",
    },
  },
  {
    formatId: "cube",
    title: "Cube",
    previewKind: "generic",
    cardImage: interscrollerImg,
    hoverImage: adtype3,
    showcaseSlides: [
      { id: "a", title: "Cube A", image: interscrollerImg },
      { id: "b", title: "Cube B", image: adtype3 },
    ],
    specs: {
      sizes: ["Interactive module", "Desktop sidebar", "Mobile inline"],
      kpis: ["Interaction Rate", "Hover/Swipe Events", "CTR >= 0.25%"],
      description:
        "Interactive creative container designed for richer product storytelling and engagement.",
    },
    descriptionByRegion: {
      usa: "US cube setup emphasizes richer interaction without affecting page stability.",
      latam: "LATAM cube setup emphasizes smooth transitions on lower-end mobile devices.",
      europe: "EU cube setup emphasizes accessibility-friendly interaction patterns.",
    },
  },
  {
    formatId: "native",
    title: "Native",
    previewKind: "generic",
    cardImage: exampleImg,
    hoverImage: slider,
    showcaseSlides: [
      { id: "a", title: "Native A", image: exampleImg },
      { id: "b", title: "Native B", image: slider },
    ],
    specs: {
      sizes: ["Feed card: responsive", "Desktop inline list", "Mobile feed card"],
      kpis: ["CTR >= 0.35%", "Scroll Depth", "Engaged Sessions"],
      description:
        "Feed-integrated unit designed to match surrounding editorial while remaining clearly labeled.",
    },
    descriptionByRegion: {
      usa: "US native templates emphasize clear sponsorship labels and editorial alignment.",
      latam: "LATAM native templates emphasize concise copy and lightweight visuals.",
      europe: "EU native templates emphasize transparent labeling and contextual matching.",
    },
  },
  {
    formatId: "leadgen",
    title: "Leadgen",
    previewKind: "generic",
    cardImage: adtype3,
    hoverImage: exampleImg,
    showcaseSlides: [
      { id: "a", title: "Leadgen A", image: adtype3 },
      { id: "b", title: "Leadgen B", image: exampleImg },
    ],
    specs: {
      sizes: ["Inline form block", "300x250 companion", "Mobile full-width card"],
      kpis: ["Form Completion", "Qualified Leads", "CPL"],
      description:
        "Lead capture unit with intent-focused messaging and conversion-first interaction flow.",
    },
    descriptionByRegion: {
      usa: "US leadgen templates prioritize compliant opt-in and CRM-ready payloads.",
      latam: "LATAM leadgen templates prioritize concise forms and high mobile completion.",
      europe: "EU leadgen templates prioritize explicit consent states and GDPR-safe copy.",
    },
  },
  {
    formatId: "content-widget",
    title: "Content Widget",
    previewKind: "generic",
    cardImage: adImg,
    hoverImage: displayBanner,
    showcaseSlides: [
      { id: "a", title: "Content Widget A", image: adImg },
      { id: "b", title: "Content Widget B", image: displayBanner },
    ],
    specs: {
      sizes: ["Module: responsive", "Desktop inline and sidebar", "Mobile full-width block"],
      kpis: ["Widget CTR", "Interaction Rate", "Time on Module"],
      description:
        "Editorial-aligned widget block suitable for recommendations, offers and contextual promotions.",
    },
    descriptionByRegion: {
      usa: "US content widget setup emphasizes recommendation density and click-through flow.",
      latam: "LATAM content widget setup emphasizes compact cards and clear mobile hierarchy.",
      europe: "EU content widget setup emphasizes readability and multilingual fallback copy.",
    },
  },
]

export const nonEndemicById = nonEndemicCatalog.reduce((acc, item) => {
  acc[item.formatId] = item
  return acc
}, {})
