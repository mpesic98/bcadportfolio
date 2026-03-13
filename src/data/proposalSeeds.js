export const seededCampaigns = [
  {
    id: "pepsi-summer-2026",
    name: "Pepsi Summer 2026",
    brandName: "Pepsi",
    description:
      "A tournament-season campaign built to pair bold Pepsi branding with premium sports inventory across Better Collective's LATAM network.",
    logoUrl: "/campaigns/pepsi-summer-2026/logo.svg",
    landingPageUrl: "https://www.pepsi.com",
    ctaLabel: "Explore Pepsi",
    theme: {
      primary: "#004B93",
      secondary: "#E32934",
      surface: "#07162C",
      ink: "#F5F8FF",
    },
    creatives: {
      leaderboard: "/campaigns/pepsi-summer-2026/leaderboard.svg",
      mrec: "/campaigns/pepsi-summer-2026/mrec.svg",
      halfpage: "/campaigns/pepsi-summer-2026/halfpage.svg",
      mobile_sticky: "/campaigns/pepsi-summer-2026/mobile-sticky.svg",
      skin_left: "/campaigns/pepsi-summer-2026/skin-left.svg",
      skin_right: "/campaigns/pepsi-summer-2026/skin-right.svg",
      skin_background: "/campaigns/pepsi-summer-2026/skin-background.svg",
      interscroller: "/campaigns/pepsi-summer-2026/interscroller.svg",
      interstitial: "/campaigns/pepsi-summer-2026/interstitial.svg",
      video_banner: "/campaigns/pepsi-summer-2026/video-banner.svg",
      pre_roll: "/campaigns/pepsi-summer-2026/pre-roll.svg",
      native: "/campaigns/pepsi-summer-2026/native.svg",
      cube: "/campaigns/pepsi-summer-2026/cube.svg",
      countdown_widget: "/campaigns/pepsi-summer-2026/countdown-widget.svg",
      livescore: "/campaigns/pepsi-summer-2026/livescore.svg",
      leadgen: "/campaigns/pepsi-summer-2026/leadgen.svg",
      content_widget: "/campaigns/pepsi-summer-2026/content-widget.svg",
    },
  },
]

export const seededProposals = [
  {
    id: "pepsi-latam-q2",
    campaignId: "pepsi-summer-2026",
    name: "Pepsi LATAM Q2",
    title: "Pepsi LATAM Advertising Opportunities",
    description:
      "A curated Better Collective Sports Media Network proposal focused on bold, high-visibility LATAM placements for Pepsi's summer push.",
    visibleFormats: [
      "leaderboard",
      "mrec",
      "skin",
      "interscroller",
      "video-banner",
      "native",
    ],
    visibleSites: ["bolavip", "redgol", "somosfanaticos"],
    visibleCategories: ["display", "high-impact", "video", "branded-content"],
    status: "active",
    expiresAt: "2026-06-30",
  },
]
