import TeamKitSvg from "./TeamKitSvg"
import "./livescoreWidget.css"
import { livescoreTeamConfigs } from "../../data/livescoreMockData"

function resolveTeam(team) {
  const preset = livescoreTeamConfigs[team.teamKey] || {}
  const mergedKit = {
    primaryColor: "#e2e8f0",
    secondaryColor: "#0f172a",
    accentColor: "#ffffff",
    patternType: "solid",
    ...(preset.kit || {}),
    ...(team.kit || {}),
  }

  return {
    ...preset,
    ...team,
    name: team.name || preset.name || "Team",
    shortName: team.shortName || preset.shortName || "FC",
    logoUrl: team.logoUrl || preset.logoUrl || null,
    kit: mergedKit,
  }
}

export default function LivescoreWidget({
  source,
  width = 300,
  height = 250,
  variant = "card",
  frameLabel = "Iframe Preview",
}) {
  const isTall = height >= 500
  const homeTeam = resolveTeam(source.homeTeam)
  const awayTeam = resolveTeam(source.awayTeam)
  const sponsor = source.sponsor || null
  const shellClassName =
    variant === "iframe"
      ? "livescore-widget-shell livescore-widget-shell--iframe"
      : "livescore-widget-shell livescore-widget-shell--card"

  return (
    <div
      className={shellClassName}
      style={{ width, height, "--lw-shell-offset": variant === "iframe" ? "24px" : "0px" }}
    >
      <div className="livescore-widget-shell__bar" aria-hidden={variant !== "iframe"}>
        <span>{frameLabel}</span>
        <span>
          {width} x {height}
        </span>
      </div>

      <section
        className={["livescore-widget", isTall ? "livescore-widget--tall" : ""].filter(Boolean).join(" ")}
        aria-label={`${source.leagueName} livescore`}
      >
        <div className="livescore-widget__glow" />
        <div className="livescore-widget__glow livescore-widget__glow--top" />

        <div className="livescore-widget__inner">
          <header className="livescore-widget__topline">
            <div className="livescore-widget__league">
              <span className="livescore-widget__live-dot" />
              <span className="livescore-widget__league-name">{source.leagueName}</span>
            </div>
            <div className="livescore-widget__minute">{source.minute}</div>
          </header>

          <div className="livescore-widget__body">
            <div className="livescore-widget__team">
              <span className="livescore-widget__team-badge">{homeTeam.shortName}</span>
              <TeamKitSvg teamName={homeTeam.name} logoUrl={homeTeam.logoUrl} size={isTall ? 88 : 74} {...homeTeam.kit} />
              <div className="livescore-widget__team-name">{homeTeam.name}</div>
            </div>

            <div className="livescore-widget__score">
              <div className="livescore-widget__score-line">
                <span className="livescore-widget__score-number">{source.homeTeam.score}</span>
                <span className="livescore-widget__score-divider">:</span>
                <span className="livescore-widget__score-number">{source.awayTeam.score}</span>
              </div>
              <div className="livescore-widget__score-label">Live Match Mock</div>
            </div>

            <div className="livescore-widget__team">
              <span className="livescore-widget__team-badge">{awayTeam.shortName}</span>
              <TeamKitSvg teamName={awayTeam.name} logoUrl={awayTeam.logoUrl} size={isTall ? 88 : 74} {...awayTeam.kit} />
              <div className="livescore-widget__team-name">{awayTeam.name}</div>
            </div>
          </div>

          {sponsor ? (
            <footer className="livescore-widget__sponsor">
              <span className="livescore-widget__sponsor-label">{sponsor.label}</span>
              <span className="livescore-widget__sponsor-name">{sponsor.name}</span>
            </footer>
          ) : null}
        </div>
      </section>
    </div>
  )
}
