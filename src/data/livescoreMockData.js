export const livescoreTeamConfigs = {
  river: {
    name: "River Plate",
    shortName: "RIV",
    kit: {
      primaryColor: "#f8fafc",
      secondaryColor: "#e11d48",
      accentColor: "#111827",
      patternType: "sash",
    },
  },
  boca: {
    name: "Boca Juniors",
    shortName: "BOC",
    kit: {
      primaryColor: "#0f3d8c",
      secondaryColor: "#facc15",
      accentColor: "#f8fafc",
      patternType: "hoops",
    },
  },
  city: {
    name: "Manchester City",
    shortName: "MCI",
    kit: {
      primaryColor: "#7dd3fc",
      secondaryColor: "#0f172a",
      accentColor: "#f8fafc",
      patternType: "pinstripes",
    },
  },
  inter: {
    name: "Inter",
    shortName: "INT",
    kit: {
      primaryColor: "#0f172a",
      secondaryColor: "#2563eb",
      accentColor: "#f8fafc",
      patternType: "stripes",
    },
  },
  madrid: {
    name: "Madrid",
    shortName: "MAD",
    kit: {
      primaryColor: "#f8fafc",
      secondaryColor: "#dbeafe",
      accentColor: "#f59e0b",
      patternType: "solid",
    },
  },
  milan: {
    name: "Milan",
    shortName: "MIL",
    kit: {
      primaryColor: "#111827",
      secondaryColor: "#dc2626",
      accentColor: "#f8fafc",
      patternType: "stripes",
    },
  },
}

export const livescoreMockData = {
  bySize: {
    "300x250": [
      {
        leagueName: "Serie A Mock",
        minute: "78'",
        homeTeam: { teamKey: "inter", score: 2 },
        awayTeam: { teamKey: "milan", score: 1 },
        sponsor: { label: "Presented by", name: "BC Sportsbook" },
      },
      {
        leagueName: "Superclasico Mock",
        minute: "45+2'",
        homeTeam: { teamKey: "river", score: 1 },
        awayTeam: { teamKey: "boca", score: 1 },
        sponsor: { label: "Official Partner", name: "Better Collective" },
      },
      {
        leagueName: "Champions Mock",
        minute: "90+4'",
        homeTeam: { teamKey: "madrid", score: 3 },
        awayTeam: { teamKey: "city", score: 2 },
      },
    ],
    "300x600": [
      {
        leagueName: "Champions Mock",
        minute: "12'",
        homeTeam: { teamKey: "madrid", score: 0 },
        awayTeam: { teamKey: "inter", score: 0 },
        sponsor: { label: "Live odds by", name: "BC Ad Portfolio" },
      },
      {
        leagueName: "Premier Mock",
        minute: "67'",
        homeTeam: { teamKey: "city", score: 2 },
        awayTeam: { teamKey: "boca", score: 0 },
        sponsor: { label: "Match Center", name: "Better Collective" },
      },
      {
        leagueName: "Cup Mock",
        minute: "88'",
        homeTeam: { teamKey: "river", score: 4 },
        awayTeam: { teamKey: "milan", score: 2 },
      },
    ],
  },
}
