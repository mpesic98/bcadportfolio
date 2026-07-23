import { getOfficialAdSpec2026, withGlobalAdSpecs2026 } from "./globalAdSpecs2026"

const asset = (relativePath) => new URL(relativePath, import.meta.url).href

const nonEndemicImageRoutes = {
  displayBanners: {
    cardImage: asset("../assets/displaybannercard.png"),
    hoverImage: asset("../assets/displayb.png"),
    showcaseAImage: asset("../assets/displayb.png"),
    showcaseBImage: asset("../assets/displayb2.png"),
  },
  skin: {
    cardImage: asset("../assets/skincard.png"),
    hoverImage: asset("../assets/skincardp.png"),
    leftImage: asset("../assets/skinl.png"),
    rightImage: asset("../assets/skinr.png"),
    showcaseAImage: asset("../assets/skinl.png"),
    showcaseBImage: asset("../assets/skinr.png"),
  },
  interstitial: {
    cardImage: asset("../assets/ittcard.png"),
    hoverImage: asset("../assets/ittcard.png"),
    showcaseAImage: asset("../assets/adImg.jpg"),
    showcaseBImage: asset("../assets/Interscroller.jpg"),
  },
  interscroller: {
    cardImage: asset("../assets/interscrollerS.gif"),
    hoverImage: asset("../assets/interscrollerP.gif"),
    showcaseAImage: asset("../assets/Interscroller.jpg"),
    showcaseBImage: asset("../assets/adImg.jpg"),
  },
  mobileSlider: {
    cardImage: asset("../assets/slidermobile.gif"),
    hoverImage: asset("../assets/display_300x250.png"),
    showcaseAImage: asset("../assets/slider.png"),
    showcaseBImage: asset("../assets/display_300x250.png"),
  },
  videoBanners: {
    cardImage: asset("../assets/videobannercard.gif"),
    hoverImage: asset("../assets/skincard.png"),
    showcaseAImage: asset("../assets/displayb.png"),
    showcaseBImage: asset("../assets/skincard.png"),
  },
  preRollVideo: {
    cardImage: asset("../assets/prerollcard.gif"),
    hoverImage: asset("../assets/Interscroller.jpg"),
    showcaseAImage: asset("../assets/skincard.png"),
    showcaseBImage: asset("../assets/Interscroller.jpg"),
  },
  livescore: {
    cardImage: asset("../assets/livescorecard.png"),
    hoverImage: asset("../assets/displayb.png"),
    showcaseAImage: asset("../assets/slider.png"),
    showcaseBImage: asset("../assets/displayb.png"),
  },
  countdownWidget: {
    cardImage: asset("../assets/countdowncard.gif"),
    hoverImage: asset("../assets/slider.png"),
    showcaseAImage: asset("../assets/displayb.png"),
    showcaseBImage: asset("../assets/slider.png"),
  },
  cube: {
    cardImage: asset("../assets/cubocard.gif"),
    hoverImage: asset("../assets/skincard.png"),
    showcaseAImage: asset("../assets/Interscroller.jpg"),
    showcaseBImage: asset("../assets/skincard.png"),
  },
  native: {
    cardImage: asset("../assets/nativecard.png"),
    hoverImage: asset("../assets/slider.png"),
    showcaseAImage: asset("../assets/exampleImg.png"),
    showcaseBImage: asset("../assets/slider.png"),
  },
  leadgen: {
    cardImage: asset("../assets/leadgencard.png"),
    hoverImage: asset("../assets/exampleImg.png"),
    showcaseAImage: asset("../assets/skincard.png"),
    showcaseBImage: asset("../assets/exampleImg.png"),
  },
  contentWidget: {
    cardImage: asset("../assets/contentwidgetcard.png"),
    hoverImage: asset("../assets/displayb.png"),
    showcaseAImage: asset("../assets/adImg.jpg"),
    showcaseBImage: asset("../assets/displayb.png"),
  },
}

const rawNonEndemicCatalog = [
  {
    formatId: "display-banners",
    title: "Display Banners",
    previewKind: "display",
    creativeOptions: ["Image", "GIF"],
    cardImage: nonEndemicImageRoutes.displayBanners.cardImage,
    hoverImage: nonEndemicImageRoutes.displayBanners.hoverImage,
    showcaseSlides: [
      { id: "a", title: "Display A", image: nonEndemicImageRoutes.displayBanners.showcaseAImage },
      { id: "b", title: "Display B", image: nonEndemicImageRoutes.displayBanners.showcaseBImage },
    ],
    specs: {
      sizes: ["Desktop: 970x250, 300x250, 300x600", "Mobile: 320x50, 300x250"],
      kpis: ["Viewability >= 70%", "CTR >= 0.25%", "Attention Time >= 5s"],
      description:
        "High-reach format for upper and mid funnel campaigns with broad inventory coverage.",
    },
  },
  {
    formatId: "skin",
    title: "Skin",
    previewKind: "skin",
    creativeOptions: ["Skin", "Select-site rails"],
    cardImage: nonEndemicImageRoutes.skin.cardImage,
    hoverImage: nonEndemicImageRoutes.skin.hoverImage,
    leftImg: nonEndemicImageRoutes.skin.leftImage,
    rightImg: nonEndemicImageRoutes.skin.rightImage,
    showcaseSlides: [
      { id: "a", title: "Skin Left/Right A", image: nonEndemicImageRoutes.skin.showcaseAImage },
      { id: "b", title: "Skin Left/Right B", image: nonEndemicImageRoutes.skin.showcaseBImage },
    ],
    specs: {
      sizes: ["Desktop rails: 160x900", "Companion: 1070x27 / 300x250", "Mobile: fallback display units"],
      kpis: ["Viewability >= 75%", "Brand Lift", "CTR >= 0.15%"],
      description:
        "Takeover-style rails around editorial content for strong branding and high share of voice.",
    },
  },
  {
    formatId: "interstitial",
    title: "Interstitial",
    previewKind: "interstitial",
    creativeOptions: ["Image"],
    cardImage: nonEndemicImageRoutes.interstitial.cardImage,
    hoverImage: nonEndemicImageRoutes.interstitial.hoverImage,
    showcaseSlides: [
      { id: "a", title: "Interstitial A", image: nonEndemicImageRoutes.interstitial.showcaseAImage },
      { id: "b", title: "Interstitial B", image: nonEndemicImageRoutes.interstitial.showcaseBImage },
    ],
    specs: {
      sizes: ["Mobile: 320x480 primary, 300x600", "Desktop: 640x480 primary, 800x600"],
      kpis: ["Open Rate", "CTR >= 0.8%", "Time to Close"],
      description:
        "Interruptive high-impact layer triggered by user interaction to drive immediate attention.",
    },
  },
  {
    formatId: "interscroller",
    title: "Interscroller",
    previewKind: "interscroller",
    creativeOptions: ["Image", "MP4", "VAST / HTTPS .mp4 URL"],
    cardImage: nonEndemicImageRoutes.interscroller.cardImage,
    hoverImage: nonEndemicImageRoutes.interscroller.hoverImage,
    showcaseSlides: [
      { id: "a", title: "Interscroller A", image: nonEndemicImageRoutes.interscroller.showcaseAImage },
      { id: "b", title: "Interscroller B", image: nonEndemicImageRoutes.interscroller.showcaseBImage },
    ],
    specs: {
      sizes: ["Mobile: 300x600", "Behavior: scroll reveal"],
      kpis: ["Viewability >= 70%", "Engaged Time", "CTR >= 0.3%"],
      description:
        "Scroll-reactive creative that reveals while the ad slot is inside the viewport.",
    },
  },
  {
    formatId: "mobile-slider",
    title: "Mobile Slider",
    previewKind: "mobile-slider",
    creativeOptions: ["Image"],
    cardImage: nonEndemicImageRoutes.mobileSlider.cardImage,
    hoverImage: nonEndemicImageRoutes.mobileSlider.hoverImage,
    showcaseSlides: [
      { id: "a", title: "Mobile Slider closed", image: nonEndemicImageRoutes.mobileSlider.showcaseAImage },
      { id: "b", title: "Mobile Slider expanded", image: nonEndemicImageRoutes.mobileSlider.showcaseBImage },
    ],
    specs: {
      sizes: ["Mobile only", "Expanded panel: 300x250", "Handle: 40x300"],
      kpis: ["Open Rate", "Interaction Rate", "CTR"],
      description:
        "Mobile-only side panel that users can open, close or drag without interrupting article scroll.",
    },
  },
  {
    formatId: "video-banners",
    title: "Video Banners",
    previewKind: "video-banners",
    creativeOptions: ["Video"],
    cardImage: nonEndemicImageRoutes.videoBanners.cardImage,
    hoverImage: nonEndemicImageRoutes.videoBanners.hoverImage,
    showcaseSlides: [
      { id: "a", title: "Video Banner A", image: nonEndemicImageRoutes.videoBanners.showcaseAImage },
      { id: "b", title: "Video Banner B", image: nonEndemicImageRoutes.videoBanners.showcaseBImage },
    ],
    specs: {
      sizes: ["Desktop: 300x250, 300x600", "In-article: 970x250", "Mobile: 300x250"],
      kpis: ["VTR >= 60%", "Viewability >= 70%", "CTR >= 0.35%"],
      description:
        "Video-capable banners designed for autoplay muted playback with lightweight controls.",
    },
  },
  {
    formatId: "pre-roll-video",
    title: "Pre-Roll Video",
    previewKind: "pre-roll",
    creativeOptions: ["Video"],
    cardImage: nonEndemicImageRoutes.preRollVideo.cardImage,
    hoverImage: nonEndemicImageRoutes.preRollVideo.hoverImage,
    showcaseSlides: [
      { id: "a", title: "Pre-Roll A", image: nonEndemicImageRoutes.preRollVideo.showcaseAImage },
      { id: "b", title: "Pre-Roll B", image: nonEndemicImageRoutes.preRollVideo.showcaseBImage },
    ],
    specs: {
      sizes: ["Video: 16:9 and 1:1", "Duration: 6s, 15s, 30s", "Delivery: autoplay muted"],
      kpis: ["VTR >= 70%", "Completion Rate", "CTR >= 0.5%"],
      description:
        "Video ad served before editorial/player content with countdown and configurable CTA.",
    },
    cta: { label: "Contact sales", url: "" },
  },
  {
    formatId: "livescore",
    title: "Livescore",
    previewKind: "generic",
    creativeOptions: ["Dynamic"],
    cardImage: nonEndemicImageRoutes.livescore.cardImage,
    hoverImage: nonEndemicImageRoutes.livescore.hoverImage,
    showcaseSlides: [
      { id: "a", title: "Livescore A", image: nonEndemicImageRoutes.livescore.showcaseAImage },
      { id: "b", title: "Livescore B", image: nonEndemicImageRoutes.livescore.showcaseBImage },
    ],
    specs: {
      sizes: ["Widget: fluid", "Desktop rail + inline", "Mobile inline card"],
      kpis: ["Engaged Time", "CTR >= 0.3%", "Interaction Rate"],
      description:
        "Contextual widget aligned with live events to increase interaction during match coverage.",
    },
  },
  {
    formatId: "countdown-widget",
    title: "Countdown Widget",
    previewKind: "generic",
    creativeOptions: ["Image", "GIF", "Video"],
    cardImage: nonEndemicImageRoutes.countdownWidget.cardImage,
    hoverImage: nonEndemicImageRoutes.countdownWidget.hoverImage,
    showcaseSlides: [
      { id: "a", title: "Countdown A", image: nonEndemicImageRoutes.countdownWidget.showcaseAImage },
      { id: "b", title: "Countdown B", image: nonEndemicImageRoutes.countdownWidget.showcaseBImage },
    ],
    specs: {
      sizes: ["Widget: fluid / responsive", "Desktop inline", "Mobile card"],
      kpis: ["Interaction Rate", "CTR >= 0.3%", "Session Depth"],
      description:
        "Time-sensitive widget for event countdowns, offer windows and launch moments.",
    },
  },
  {
    formatId: "cube",
    title: "Cube",
    previewKind: "generic",
    creativeOptions: ["Image", "GIF", "HTML5"],
    cardImage: nonEndemicImageRoutes.cube.cardImage,
    hoverImage: nonEndemicImageRoutes.cube.hoverImage,
    showcaseSlides: [
      { id: "a", title: "Cube A", image: nonEndemicImageRoutes.cube.showcaseAImage },
      { id: "b", title: "Cube B", image: nonEndemicImageRoutes.cube.showcaseBImage },
    ],
    specs: {
      sizes: ["Interactive module", "Desktop sidebar", "Mobile inline"],
      kpis: ["Interaction Rate", "Hover/Swipe Events", "CTR >= 0.25%"],
      description:
        "Interactive creative container designed for richer product storytelling and engagement.",
    },
  },
  {
    formatId: "native",
    title: "Native",
    previewKind: "generic",
    creativeOptions: ["Image", "Copy"],
    cardImage: nonEndemicImageRoutes.native.cardImage,
    hoverImage: nonEndemicImageRoutes.native.hoverImage,
    showcaseSlides: [
      { id: "a", title: "Native A", image: nonEndemicImageRoutes.native.showcaseAImage },
      { id: "b", title: "Native B", image: nonEndemicImageRoutes.native.showcaseBImage },
    ],
    specs: {
      sizes: ["Feed card: responsive", "Desktop inline list", "Mobile feed card"],
      kpis: ["CTR >= 0.35%", "Scroll Depth", "Engaged Sessions"],
      description:
        "Feed-integrated unit designed to match surrounding editorial while remaining clearly labeled.",
    },
  },
  {
    formatId: "leadgen",
    title: "Leadgen",
    previewKind: "generic",
    creativeOptions: ["Image", "Form"],
    cardImage: nonEndemicImageRoutes.leadgen.cardImage,
    hoverImage: nonEndemicImageRoutes.leadgen.hoverImage,
    showcaseSlides: [
      { id: "a", title: "Leadgen A", image: nonEndemicImageRoutes.leadgen.showcaseAImage },
      { id: "b", title: "Leadgen B", image: nonEndemicImageRoutes.leadgen.showcaseBImage },
    ],
    specs: {
      sizes: ["Inline form block", "300x250 companion", "Mobile full-width card"],
      kpis: ["Form Completion", "Qualified Leads", "CPL"],
      description:
        "Lead capture unit with intent-focused messaging and conversion-first interaction flow.",
    },
  },
  {
    formatId: "content-widget",
    title: "Content Widget",
    previewKind: "generic",
    creativeOptions: ["Image", "Copy"],
    cardImage: nonEndemicImageRoutes.contentWidget.cardImage,
    hoverImage: nonEndemicImageRoutes.contentWidget.hoverImage,
    showcaseSlides: [
      { id: "a", title: "Content Widget A", image: nonEndemicImageRoutes.contentWidget.showcaseAImage },
      { id: "b", title: "Content Widget B", image: nonEndemicImageRoutes.contentWidget.showcaseBImage },
    ],
    specs: {
      sizes: ["Module: responsive", "Desktop inline and sidebar", "Mobile full-width block"],
      kpis: ["Widget CTR", "Interaction Rate", "Time on Module"],
      description:
        "Editorial-aligned widget block suitable for recommendations, offers and contextual promotions.",
    },
  },
]

const officialExpansionCatalog = [
  {
    formatId: "high-impact-latam-takeover",
    title: "LATAM Takeover",
    previewKind: "generic",
    creativeOptions: ["Bundle", "Publisher setup"],
    cardImage: nonEndemicImageRoutes.skin.cardImage,
    hoverImage: nonEndemicImageRoutes.skin.hoverImage,
    showcaseSlides: rawNonEndemicCatalog.find((item) => item.formatId === "skin")?.showcaseSlides,
  },
  {
    formatId: "high-impact-nam-takeover",
    title: "NAM Takeover",
    previewKind: "generic",
    creativeOptions: ["Bundle", "Publisher setup"],
    cardImage: nonEndemicImageRoutes.skin.cardImage,
    hoverImage: nonEndemicImageRoutes.skin.hoverImage,
    showcaseSlides: rawNonEndemicCatalog.find((item) => item.formatId === "skin")?.showcaseSlides,
  },
  {
    formatId: "high-impact-emea-takeover",
    title: "EMEA Takeover",
    previewKind: "generic",
    creativeOptions: ["Bundle"],
    cardImage: nonEndemicImageRoutes.displayBanners.cardImage,
    hoverImage: nonEndemicImageRoutes.displayBanners.hoverImage,
    showcaseSlides: rawNonEndemicCatalog.find((item) => item.formatId === "display-banners")?.showcaseSlides,
  },
  {
    formatId: "video-instream-skippable-onsite",
    title: "In-Stream Video (On-site)",
    previewKind: "official-instream",
    creativeOptions: ["MP4", "VAST", "Skippable / Non-skippable"],
    officialIds: ["video-instream-skippable-onsite", "video-instream-nonskippable-onsite"],
    cardImage: nonEndemicImageRoutes.preRollVideo.cardImage,
    hoverImage: nonEndemicImageRoutes.preRollVideo.hoverImage,
    showcaseSlides: rawNonEndemicCatalog.find((item) => item.formatId === "pre-roll-video")?.showcaseSlides,
  },
  {
    formatId: "video-instream-nonskippable-onsite",
    title: "In-Stream Non-Skippable (On-site)",
    previewKind: "official-instream",
    creativeOptions: ["MP4", "VAST", "Non-skippable"],
    officialIds: ["video-instream-skippable-onsite", "video-instream-nonskippable-onsite"],
    cardImage: nonEndemicImageRoutes.preRollVideo.cardImage,
    hoverImage: nonEndemicImageRoutes.preRollVideo.hoverImage,
    showcaseSlides: rawNonEndemicCatalog.find((item) => item.formatId === "pre-roll-video")?.showcaseSlides,
  },
  {
    formatId: "video-instream-skippable-youtube",
    title: "In-Stream Video (YouTube)",
    previewKind: "official-instream",
    creativeOptions: ["MP4", "VAST", "Skippable / Non-skippable"],
    officialIds: ["video-instream-skippable-youtube", "video-instream-nonskippable-youtube"],
    cardImage: nonEndemicImageRoutes.preRollVideo.cardImage,
    hoverImage: nonEndemicImageRoutes.preRollVideo.hoverImage,
    showcaseSlides: rawNonEndemicCatalog.find((item) => item.formatId === "pre-roll-video")?.showcaseSlides,
  },
  {
    formatId: "video-instream-nonskippable-youtube",
    title: "In-Stream Non-Skippable (YouTube)",
    previewKind: "official-instream",
    creativeOptions: ["MP4", "VAST", "YouTube-style"],
    officialIds: ["video-instream-skippable-youtube", "video-instream-nonskippable-youtube"],
    cardImage: nonEndemicImageRoutes.preRollVideo.cardImage,
    hoverImage: nonEndemicImageRoutes.preRollVideo.hoverImage,
    showcaseSlides: rawNonEndemicCatalog.find((item) => item.formatId === "pre-roll-video")?.showcaseSlides,
  },
].map((format) => {
  const officialSpec = getOfficialAdSpec2026(format.formatId)
  return withGlobalAdSpecs2026(
    {
      ...format,
      specs: {
        sizes: officialSpec?.dimensions || officialSpec?.includedUnits || [],
        kpis: [],
        description:
          officialSpec?.section === "video"
            ? "In-stream video placement with illustrative preview media; accepted delivery follows the official specification."
            : "Regional high-impact package defined in the Global Ad Specs catalog.",
      },
    },
    { officialIds: format.officialIds || [format.formatId] }
  )
})

const commercialDescriptionById = {
  "display-banners":
    "Scalable display inventory across high-visibility leaderboard, MPU, rail, billboard, and mobile placements.",
  skin:
    "The standard desktop skin execution across supported publishers, with rail assets available only on a limited set of sites.",
  interstitial:
    "A high-attention overlay triggered by the first interaction, suited to launches, offers, and priority campaign moments.",
  interscroller:
    "A mobile-first reveal placement that turns natural page scrolling into a large, immersive brand moment.",
  "mobile-slider":
    "A retained mobile interaction format with an expandable side panel for campaigns that need an on-demand canvas.",
  "video-banners":
    "Muted autoplay video within standard banner positions, adding motion and product storytelling without using in-stream inventory.",
  "pre-roll-video":
    "A retained publisher-player preview for legacy campaign planning; use the dedicated in-stream products for current specifications.",
  livescore:
    "A custom live-match module that places sponsorship alongside scores and high-intent game updates.",
  "countdown-widget":
    "A custom urgency module for launches, fixtures, and limited campaign windows with dynamic countdown messaging.",
  cube:
    "An interactive custom canvas for multi-panel product stories, swipe states, and richer campaign engagement.",
  native:
    "A feed-integrated placement built from headline, image, logo, and CTA assets to match the surrounding editorial experience.",
  leadgen:
    "A retained compatibility format for saved proposals that use an embedded lead-capture experience.",
  "content-widget":
    "A custom editorial-style module for sponsored recommendations, branded stories, and contextual recirculation.",
  "high-impact-latam-takeover":
    "A LATAM package combining Skin, MPU, Leaderboard, and Mobile Leaderboard for coordinated cross-device impact.",
  "high-impact-nam-takeover":
    "A North America package combining Skin, MPU, Leaderboard, and Mobile Leaderboard in one coordinated activation.",
  "high-impact-emea-takeover":
    "An EMEA package combining MPU, Leaderboard, Mobile Leaderboard, and Billboard placements without a Skin unit.",
  "video-instream-skippable-onsite":
    "In-stream video delivered inside Better Collective publisher players, available as skippable or non-skippable within one official format.",
  "video-instream-nonskippable-onsite":
    "A focused 15- or 30-second video message delivered inside Better Collective publisher players without a skip control.",
  "video-instream-skippable-youtube":
    "A YouTube video ad experience available as skippable or non-skippable, with sponsored messaging and a direct response CTA.",
  "video-instream-nonskippable-youtube":
    "A concise non-skippable YouTube ad experience for the Cracks channel, built for guaranteed message delivery before content.",
}

export const nonEndemicCatalog = [
  ...rawNonEndemicCatalog.map((format) =>
    withGlobalAdSpecs2026(format, {
      status: format.formatId === "video-banners" ? "custom" : "legacy",
    })
  ),
  ...officialExpansionCatalog,
].map((format) => ({
  ...format,
  cardDescription: commercialDescriptionById[format.formatId] || format.specs?.description,
}))

export const nonEndemicById = nonEndemicCatalog.reduce((acc, item) => {
  acc[item.formatId] = item
  return acc
}, {})
