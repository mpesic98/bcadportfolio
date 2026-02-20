import { useEffect, useMemo, useState } from "react"

const EVENT_DATE_STRING = "2026-08-05T14:00:00-03:00"
const UPDATE_INTERVAL_MS = 60000

const DEFAULT_IMAGE_URL = "https://tpc.googlesyndication.com/simgad/13050797919982899298?"
const DEFAULT_CLICK_URL =
  "https://adclick.g.doubleclick.net/pcs/click?xai=AKAOjsvm4ecLFeSx8y3atFhLVl2cFV2K1nOD-0HIvIM1O2ke_Dx3ghbO6ypqCriWIehTLmVAhDdE91nunntttaHgXE9392JhtzrIBhEUONBnI6C4ak8nF2iaco3GYWir-_RVDE_-BS4zqZMO0qLSJSWkh_bGw_YP89xUU-5azBaEvDxDz5N9rEWY1_5oqY_t7sx-vgihSm4up82xUX1gjEjG7yXSSnQ2F22IfUQyOg&sai=AMfl-YQ5K0gnE3QZXOi9geTw1M5wbwjS-WKNpTHmgYjOfvQapeAA8lf1RK2iukSzFauBrOobtCjoXkSGz6nQbQ0KiV3HHKJgp1n6sYlvzWas9xF_7f20RFjpfr1dEYlGPlCr5Cj-en12-dbFxGwc1TqjEyZbImv_HhZDXBoph64AYKHbimxualV4GNtxb3p1PvA_z49DUzHOFmx8fm-Yvoop6DM0RJprghgocs-94OREU1o&sig=Cg0ArKJSzGOfYL2RCGVnEAE&fbs_aeid=%5Bgw_fbsaeid%5D&urlfix=1&adurl=https://www.adidas.com.ar/futbol-hombre"

function getCountdownState(eventDateString) {
  const eventTimeMs = new Date(eventDateString).getTime()
  const nowMs = Date.now()
  const diffMs = eventTimeMs - nowMs

  if (!Number.isFinite(eventTimeMs) || diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, ended: true }
  }

  const totalMinutes = Math.floor(diffMs / 60000)
  const days = Math.floor(totalMinutes / 1440)
  const hours = Math.floor((totalMinutes % 1440) / 60)
  const minutes = totalMinutes % 60

  return { days, hours, minutes, ended: false }
}

function CountdownBox({ value, label, tall }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: tall ? 46 : 42,
        height: tall ? 44 : 40,
        backgroundColor: "#ffffff",
        borderRadius: "30%",
        fontSize: tall ? 23 : 21,
        fontWeight: 700,
        color: "#000000",
      }}
    >
      {value}
      <span
        style={{
          position: "absolute",
          display: "block",
          bottom: tall ? -22 : -20,
          textShadow: "0px 0px 1px #000000b3",
          fontSize: 12,
          color: "#ffffff",
          whiteSpace: "nowrap",
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
  imageUrl = DEFAULT_IMAGE_URL,
  clickUrl = DEFAULT_CLICK_URL,
}) {
  const [countdown, setCountdown] = useState(() => getCountdownState(EVENT_DATE_STRING))
  const isTall = height >= 600

  const countdownPosition = useMemo(
    () => ({
      bottom: isTall ? "18%" : "22%",
      gap: isTall ? 20 : 18,
      transform: `translateX(-50%) scale(${isTall ? 1.08 : 1})`,
    }),
    [isTall]
  )

  useEffect(() => {
    let intervalId = null

    const updateCountdown = () => {
      const nextCountdown = getCountdownState(EVENT_DATE_STRING)
      setCountdown(nextCountdown)

      if (nextCountdown.ended && intervalId) {
        window.clearInterval(intervalId)
        intervalId = null
      }
    }

    updateCountdown()
    intervalId = window.setInterval(updateCountdown, UPDATE_INTERVAL_MS)

    return () => {
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [])

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        textAlign: "center",
        overflow: "hidden",
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
          zIndex: 1,
        }}
      />

      {!countdown.ended && (
        <div
          style={{
            fontFamily: "Roboto, -apple-system, sans-serif",
            position: "absolute",
            display: "flex",
            gap: countdownPosition.gap,
            zIndex: 2,
            bottom: countdownPosition.bottom,
            left: "50%",
            transform: countdownPosition.transform,
          }}
        >
          <CountdownBox value={countdown.days} label="DIAS" tall={isTall} />
          <CountdownBox value={countdown.hours} label="HORAS" tall={isTall} />
          <CountdownBox value={countdown.minutes} label="MINUTOS" tall={isTall} />
        </div>
      )}

      {countdown.ended && (
        <div
          style={{
            position: "absolute",
            zIndex: 2,
            bottom: isTall ? "18%" : "22%",
            color: "#ffffff",
            fontSize: isTall ? 20 : 18,
            fontWeight: 700,
            padding: "0 0 10px 0",
            textShadow: "0px 0px 1px #000000b3",
          }}
        >
          SORTEO EN VIVO
        </div>
      )}
    </div>
  )
}
