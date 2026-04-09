import { useEffect, useMemo, useState } from "react"

const DEFAULT_CLICK_URL =
  "https://adclick.g.doubleclick.net/pcs/click?xai=AKAOjsvm4ecLFeSx8y3atFhLVl2cFV2K1nOD-0HIvIM1O2ke_Dx3ghbO6ypqCriWIehTLmVAhDdE91nunntttaHgXE9392JhtzrIBhEUONBnI6C4ak8nF2iaco3GYWir-_RVDE_-BS4zqZMO0qLSJSWkh_bGw_YP89xUU-5azBaEvDxDz5N9rEWY1_5oqY_t7sx-vgihSm4up82xUX1gjEjG7yXSSnQ2F22IfUQyOg&sai=AMfl-YQ5K0gnE3QZXOi9geTw1M5wbwjS-WKNpTHmgYjOfvQapeAA8lf1RK2iukSzFauBrOobtCjoXkSGz6nQbQ0KiV3HHKJgp1n6sYlvzWas9xF_7f20RFjpfr1dEYlGPlCr5Cj-en12-dbFxGwc1TqjEyZbImv_HhZDXBoph64AYKHbimxualV4GNtxb3p1PvA_z49DUzHOFmx8fm-Yvoop6DM0RJprghgocs-94OREU1o&sig=Cg0ArKJSzGOfYL2RCGVnEAE&fbs_aeid=%5Bgw_fbsaeid%5D&urlfix=1&adurl=https://www.adidas.com.ar/futbol-hombre"

const COUNTDOWN_TICK_MS = 1000
const RESET_THRESHOLD_SECONDS = 8
const SHORT_RESET_THRESHOLD_SECONDS = 20 * 60
const LONG_RESET_MIN_SECONDS = 2 * 60 * 60 + 14 * 60 + 18
const LONG_RESET_MAX_SECONDS = 18 * 60 * 60 + 47 * 60 + 42
const SHORT_RESET_MIN_SECONDS = 36 * 60 + 12
const SHORT_RESET_MAX_SECONDS = 3 * 60 * 60 + 8 * 60 + 33

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function createMockCountdown({ shortWindow = false } = {}) {
  if (shortWindow) {
    return randomInt(SHORT_RESET_MIN_SECONDS, SHORT_RESET_MAX_SECONDS)
  }

  return randomInt(LONG_RESET_MIN_SECONDS, LONG_RESET_MAX_SECONDS)
}

function formatSegment(value) {
  return String(value).padStart(2, "0")
}

function getCountdownParts(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return {
    hours: formatSegment(hours),
    minutes: formatSegment(minutes),
    seconds: formatSegment(seconds),
  }
}

function CountdownUnit({ value, label, isTall }) {
  return (
    <div
      style={{
        minWidth: isTall ? 70 : 58,
        display: "grid",
        gap: isTall ? 8 : 6,
        justifyItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: isTall ? 72 : 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: isTall ? 16 : 14,
          background: "rgba(255, 255, 255, 0.92)",
          border: "1px solid rgba(255, 255, 255, 0.55)",
          boxShadow: "0 12px 28px rgba(0, 0, 0, 0.22)",
          fontSize: isTall ? 31 : 26,
          fontWeight: 800,
          lineHeight: 1,
          color: "#111827",
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.04em",
        }}
      >
        {value}
      </div>

      <span
        style={{
          fontSize: isTall ? 11 : 10,
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(255, 255, 255, 0.96)",
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.35)",
        }}
      >
        {label}
      </span>
    </div>
  )
}

export default function CountdownCreative({
  width = 300,
  height = 250,
  imageUrl,
  clickUrl = DEFAULT_CLICK_URL,
}) {
  const isTall = height >= 600
  const [secondsLeft, setSecondsLeft] = useState(() => createMockCountdown())

  const countdown = useMemo(() => getCountdownParts(secondsLeft), [secondsLeft])
  const countdownLayout = useMemo(
    () => ({
      gap: isTall ? 12 : 10,
      bottom: isTall ? 42 : 26,
      padding: isTall ? "14px 16px 12px" : "12px 12px 10px",
      borderRadius: isTall ? 22 : 18,
    }),
    [isTall]
  )

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSecondsLeft((current) => {
        const next = current - 1

        if (next <= RESET_THRESHOLD_SECONDS) {
          const shortWindow = current <= SHORT_RESET_THRESHOLD_SECONDS
          return createMockCountdown({ shortWindow })
        }

        return next
      })
    }, COUNTDOWN_TICK_MS)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        margin: "0 auto",
        overflow: "hidden",
        background: "#0f172a",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <a
        href={clickUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Countdown widget click area"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
        }}
      />

      <img
        src={imageUrl}
        alt="Countdown background"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(7, 13, 24, 0.08) 0%, rgba(7, 13, 24, 0.22) 52%, rgba(7, 13, 24, 0.56) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: countdownLayout.bottom,
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: countdownLayout.gap,
          padding: countdownLayout.padding,
          borderRadius: countdownLayout.borderRadius,
          background: "rgba(8, 15, 31, 0.36)",
          backdropFilter: "blur(6px)",
          boxShadow: "0 18px 40px rgba(0, 0, 0, 0.24)",
          zIndex: 2,
        }}
      >
        <CountdownUnit value={countdown.hours} label="Hours" isTall={isTall} />
        <CountdownUnit value={countdown.minutes} label="Minutes" isTall={isTall} />
        <CountdownUnit value={countdown.seconds} label="Seconds" isTall={isTall} />
      </div>
    </div>
  )
}
