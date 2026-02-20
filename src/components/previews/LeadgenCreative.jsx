import { useState } from "react"

const BACKGROUND_IMAGE_URL =
  "https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/8f1c0681-46a5-4cd6-b4c6-b8fbc0b7b3aa/p%C3%A1gina-principal-de-running.png"
const LOGO_IMAGE_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/2560px-Logo_NIKE.svg.png"
const TRACKING_COUNTER_NAME = "LeadForm_Submit"

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function fireLeadgenCounter() {
  if (typeof window === "undefined") return

  const enabler = window.Enabler
  if (!enabler || typeof enabler.counter !== "function") return

  if (typeof enabler.isInitialized === "function") {
    if (!enabler.isInitialized()) return
  }

  enabler.counter(TRACKING_COUNTER_NAME)
}

export default function LeadgenCreative({ width = 300, height = 600 }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()

    if (!trimmedName || !isValidEmail(trimmedEmail)) {
      setSuccessMessage("")
      setErrorMessage("Por favor completa todos los campos correctamente.")
      return
    }

    fireLeadgenCounter()
    setName("")
    setEmail("")
    setErrorMessage("")
    setSuccessMessage("Gracias! Te contactaremos pronto.")
  }

  const onNameChange = (event) => {
    setName(event.target.value)
    if (errorMessage) setErrorMessage("")
    if (successMessage) setSuccessMessage("")
  }

  const onEmailChange = (event) => {
    setEmail(event.target.value)
    if (errorMessage) setErrorMessage("")
    if (successMessage) setSuccessMessage("")
  }

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        overflow: "hidden",
        fontFamily: '"Roboto Condensed", "Arial Narrow", Arial, sans-serif',
      }}
    >
      <img
        src={BACKGROUND_IMAGE_URL}
        alt="Leadgen background"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 280,
          height: 580,
          boxSizing: "border-box",
          overflow: "hidden",
          background: "#ffffff",
          borderRadius: 6,
          padding: "20px 0",
          boxShadow: "2px 2px 10px rgb(0, 0, 0)",
        }}
      >
        <img
          src={LOGO_IMAGE_URL}
          alt="Logo de Nike"
          style={{
            position: "relative",
            width: 90,
            padding: "20px 0",
          }}
        />

        <h1
          style={{
            margin: 0,
            padding: "0 20px",
            lineHeight: 1.3,
            fontWeight: 900,
            fontSize: 20,
            textAlign: "center",
            color: "#252525",
            textTransform: "uppercase",
          }}
        >
          Recibe noticias e informacion de ...
        </h1>

        <p
          style={{
            margin: 0,
            fontWeight: 400,
            fontSize: 12,
            textAlign: "center",
            color: "#7c7c7c",
            padding: "10px 30px",
          }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis blanditiis quidem provident sit
          unde.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 280,
            margin: "0 auto",
            padding: 20,
            boxSizing: "border-box",
          }}
        >
          <label
            htmlFor="leadgen-email"
            style={{
              textAlign: "left",
              fontWeight: 600,
              letterSpacing: "-0.4px",
              fontSize: 12,
              color: "#252525",
            }}
          >
            Direccion de correo electronico*
          </label>
          <input
            id="leadgen-email"
            type="email"
            name="email"
            value={email}
            onChange={onEmailChange}
            placeholder="Direccion de correo electronico*"
            autoComplete="off"
            required
            style={{
              fontFamily: '"Roboto Condensed", "Arial Narrow", Arial, sans-serif',
              width: "100%",
              padding: 10,
              margin: "8px 0",
              border: "1px solid #ccc",
              borderRadius: 4,
              fontSize: 11,
              boxSizing: "border-box",
            }}
          />

          <label
            htmlFor="leadgen-name"
            style={{
              textAlign: "left",
              fontWeight: 600,
              letterSpacing: "-0.4px",
              fontSize: 12,
              color: "#252525",
            }}
          >
            Nombre*
          </label>
          <input
            id="leadgen-name"
            type="text"
            name="name"
            value={name}
            onChange={onNameChange}
            placeholder="Nombre*"
            autoComplete="off"
            required
            style={{
              fontFamily: '"Roboto Condensed", "Arial Narrow", Arial, sans-serif',
              width: "100%",
              padding: 10,
              margin: "8px 0",
              border: "1px solid #ccc",
              borderRadius: 4,
              fontSize: 11,
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              fontFamily: '"Roboto Condensed", "Arial Narrow", Arial, sans-serif',
              width: "100%",
              padding: 10,
              margin: "8px 0",
              border: "1px solid #000000",
              borderRadius: 4,
              fontWeight: 400,
              backgroundColor: "#252525",
              color: "#ffffff",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all ease 0.3s",
              fontSize: 13,
              boxSizing: "border-box",
            }}
          >
            Registrate
          </button>

          {successMessage ? (
            <div
              style={{
                marginTop: 10,
                fontWeight: 700,
                color: "green",
                fontSize: 12,
              }}
            >
              {successMessage}
            </div>
          ) : null}

          {errorMessage ? (
            <div
              style={{
                marginTop: 10,
                fontWeight: 700,
                color: "#b91c1c",
                fontSize: 12,
              }}
            >
              {errorMessage}
            </div>
          ) : null}
        </form>

        <p
          style={{
            margin: 0,
            fontSize: 9,
            color: "#9b9b9b",
            textAlign: "center",
            padding: "0 16px",
          }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, ducimus.
        </p>
      </div>
    </div>
  )
}
