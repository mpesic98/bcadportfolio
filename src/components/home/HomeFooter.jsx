import logo from "../../assets/Logo-3.png"

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/better-collective/",
    path: "M19.7 3H4.3C3.58 3 3 3.58 3 4.3v15.4c0 .72.58 1.3 1.3 1.3h15.4c.72 0 1.3-.58 1.3-1.3V4.3c0-.72-.58-1.3-1.3-1.3ZM8.34 18.34H5.67V9.75h2.67v8.59ZM7 8.57a1.55 1.55 0 1 1 0-3.09 1.55 1.55 0 0 1 0 3.09Zm11.34 9.77h-2.67v-4.18c0-1-.02-2.28-1.39-2.28-1.39 0-1.6 1.09-1.6 2.21v4.25h-2.67V9.75h2.56v1.17h.04c.36-.68 1.23-1.39 2.53-1.39 2.7 0 3.2 1.78 3.2 4.09v4.72Z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@bettercollective7641",
    path: "M21.8 8s-.2-1.38-.8-1.98c-.76-.8-1.61-.8-2-.85C16.2 4.97 12 4.97 12 4.97s-4.2 0-7 .2c-.39.05-1.24.05-2 .85C2.4 6.62 2.2 8 2.2 8S2 9.62 2 11.24v1.52c0 1.62.2 3.24.2 3.24s.2 1.38.8 1.98c.76.8 1.76.77 2.2.86 1.6.15 6.8.2 6.8.2s4.2-.01 7-.21c.4-.05 1.25-.05 2-.85.6-.6.8-1.98.8-1.98s.2-1.62.2-3.24v-1.52C22 9.62 21.8 8 21.8 8ZM9.94 14.59V8.97l5.4 2.82-5.4 2.8Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/bettercollectivecom/",
    path: "M12 7.38A4.62 4.62 0 1 0 12 16.62 4.62 4.62 0 0 0 12 7.38Zm0 7.62a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.8-8.88a1.08 1.08 0 1 0 0 2.16 1.08 1.08 0 0 0 0-2.16ZM12 3c-2.44 0-2.75.01-3.71.05-.96.05-1.61.2-2.19.42a4.42 4.42 0 0 0-1.59 1.04A4.42 4.42 0 0 0 3.47 6.1c-.22.58-.37 1.23-.42 2.19C3.01 9.25 3 9.56 3 12s.01 2.75.05 3.71c.05.96.2 1.61.42 2.19.23.59.54 1.09 1.04 1.59.5.5 1 .81 1.59 1.04.58.22 1.23.37 2.19.42.96.04 1.27.05 3.71.05s2.75-.01 3.71-.05c.96-.05 1.61-.2 2.19-.42.59-.23 1.09-.54 1.59-1.04.5-.5.81-1 .04-1.59.22-.58.37-1.23.42-2.19.04-.96.05-1.27.05-3.71s-.01-2.75-.05-3.71c-.05-.96-.2-1.61-.42-2.19a4.42 4.42 0 0 0-1.04-1.59 4.42 4.42 0 0 0-1.59-1.04c-.58-.22-1.23-.37-2.19-.42C14.75 3.01 14.44 3 12 3Zm0 1.62c2.4 0 2.69.01 3.64.05.88.04 1.35.19 1.67.31.42.16.72.36 1.03.67.32.32.51.62.68 1.04.12.31.27.79.31 1.67.04.95.05 1.23.05 3.64s-.01 2.69-.05 3.64c-.04.88-.19 1.35-.31 1.67-.17.42-.36.72-.68 1.03-.31.32-.61.51-1.03.68-.32.12-.79.27-1.67.31-.95.04-1.23.05-3.64.05s-2.69-.01-3.64-.05c-.88-.04-1.35-.19-1.67-.31-.42-.17-.72-.36-1.04-.68a2.78 2.78 0 0 1-.67-1.03c-.12-.32-.27-.79-.31-1.67-.04-.95-.05-1.23-.05-3.64s.01-2.69.05-3.64c.04-.88.19-1.36.31-1.67.16-.42.36-.72.67-1.04.32-.31.62-.51 1.04-.67.32-.12.79-.27 1.67-.31.95-.04 1.23-.05 3.64-.05Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/BetterCollective/",
    path: "M12 2a10 10 0 0 0-1.6 19.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 12 2Z",
  },
]

const footerColumns = [
  [
    { label: "Sports media", href: "https://bettercollective.com/sports-media/" },
    { label: "Esports", href: "https://bettercollective.com/esports/" },
    { label: "Investor", href: "https://bettercollective.com/investors/" },
  ],
  [
    { label: "About", href: "https://bettercollective.com/about/" },
    { label: "News", href: "https://bettercollective.com/press-releases/" },
    { label: "Press", href: "https://bettercollective.com/press/" },
    { label: "Contacts", href: "https://bettercollective.com/contact/" },
  ],
]

function FooterLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-white/72 transition-colors hover:text-white"
    >
      {children}
    </a>
  )
}

export default function HomeFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#00855d] text-white">
      <div className="mx-auto max-w-[1240px] px-4 pb-14 pt-14 md:px-6 md:pb-16 md:pt-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <img
            src={logo}
            alt="Better Collective"
            className="h-10 w-auto shrink-0 object-contain md:h-12"
          />

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="grid h-9 w-9 place-items-center rounded-full text-white transition-colors hover:bg-white/12"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path d={link.path} fill="currentColor" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-[1.35fr_0.7fr_0.7fr_1fr] md:gap-14">
          <p className="max-w-[430px] text-base leading-relaxed text-white/72">
            With a vision to become the leading digital sports media group, Better
            Collective owns global and national sports media brands. We connect
            brands with passionate sports communities worldwide.
          </p>

          {footerColumns.map((column, index) => (
            <nav key={index} aria-label={`Footer navigation ${index + 1}`}>
              <ul className="grid gap-4 text-sm font-medium">
                {column.map((item) => (
                  <li key={item.label}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="text-sm leading-relaxed text-white/72">
            <p>
              Better Collective A/S
              <br />
              Sankt Annae Plads 28
              <br />
              1250 Copenhagen K
              <br />
              Denmark (DK)
            </p>
            <p className="mt-5">CVR. 27652913</p>
          </div>
        </div>
      </div>

      <div className="bg-[#00734f] px-4 py-4 text-center text-sm text-white/82 md:px-6">
        Copyright © {year} by Better Collective. All rights reserved.{" "}
        <FooterLink href="https://bettercollective.com/privacy-policy/">Privacy Policy</FooterLink>
        .{" "}
        <FooterLink href="https://bettercollective.com/cookie-policy/">Cookie Policy</FooterLink>.
      </div>
    </footer>
  )
}
