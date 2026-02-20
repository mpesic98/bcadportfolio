const DEFAULT_BG_IMAGE_URL_300X600 = "https://tpc.googlesyndication.com/simgad/11810175350149768104?"
const DEFAULT_CLICK_URL_300X600 =
  "https://adclick.g.doubleclick.net/pcs/click?xai=AKAOjsscL9XTnaNIYtFa0vBJgf49yGQHlbjR1-en3uTYEm7wXsQ9pF2LdbfnUdNbsMKOs_0kiy-V7rDq6r9jbYw7STUJSvt0eFvM0f6mTkh2Dqk5BR2w5Eau_fwr-u20C5fYYGxyvqMlEmA69HItc1iGNITBvRKEYB2oeGdFVPFyAonmzUewH0y1ATLrEM5g_D0SzA9JdxCyux3LjT1xMW-Z8aMbPtXNJWICvZYTKQ&sai=AMfl-YT-fSchTvLxzb2QHwf7gBNL9IfJSsRJQWSpHFLFqs4g_EDB6A2QnV2l0mx8JJjS1xhONHTfuwtNfo2pWDWSxTRvLjMCGoEGK6weTJivQAP_8S_tx2-RtUUmSQ19Ykau99XCuQWf-vK9zDIufh_IttvK9ZpQVvsQStvHJbWu6Anwlu9JnuzQ6cbSvckQUiFghyrzRPNrwikg6PHas33rrOgS4noYsXckhZlBL2VoEbw&sig=Cg0ArKJSzM_bGvjYGnaBEAE&fbs_aeid=%5Bgw_fbsaeid%5D&urlfix=1&adurl=https://www.google.com/"
const DEFAULT_BG_IMAGE_URL_300X250 = "https://tpc.googlesyndication.com/simgad/13722722032083548317?"
const DEFAULT_CLICK_URL_300X250 =
  "https://adclick.g.doubleclick.net/pcs/click?xai=AKAOjssvlvPVRXNs00MLc26gMIORCiyorTRpf3pnuZ29UKb0DLxJw-U-6_jxc0H7bV18rD1XMWMWaM9FrTEtmlBIGsqGvgPA4J57KDKM9GJEwExTE4Di2h7j8zjMLZZw-EF0xPYo01M8z34LtmJ5fQjpl28xfsQAyZwy3NFC5SgeApJP_DmdBoAoK13oTZVI3G08kCZJ9JEMuDwzx4SBKKd9fVxuRYET-yt09CwVxQ&sai=AMfl-YQQtE1nlSLfSIsTAY5tMAlTfvgapneOhRm8HNkaQb702prUMquAU38RxoGje24cStNt8goBw9z7anBBNyyiTQ6BFRILTfDugct91qQFZlibY5z1z_H9x_tCPP5IwJDLsyfY4eoTKIpQgIR1R1nq02p-s6aV8dXao6AWATDwVFh-HWT0RbHuEpVQZvpwOoG5hxA57jHFLJpdHjWwwA-xWVRCDYtQJiO7_Yp0zbg1eK4&sig=Cg0ArKJSzP_6JgEb-fJWEAE&fbs_aeid=%5Bgw_fbsaeid%5D&urlfix=1&adurl=https://redgol.cl/tiempolibre/nieve-en-marzo-aclaran-la-ocurrencia-de-este-fenomeno-en-santiago"
const DEFAULT_WIDGET_IFRAME_URL =
  "https://custom-ads.bolavip.com/articles/?site=RDG&tag=quix&size=2&color=FFFFFF&font-size=15px"

export default function ContentWidgetCreative({
  width = 300,
  height = 250,
  imageUrl,
  clickUrl,
  iframeUrl = DEFAULT_WIDGET_IFRAME_URL,
}) {
  const safeWidth = Number.isFinite(Number(width)) ? Number(width) : 300
  const safeHeight = Number.isFinite(Number(height)) ? Number(height) : 250
  const is300x250 = safeHeight <= 250
  const effectiveImageUrl =
    imageUrl || (is300x250 ? DEFAULT_BG_IMAGE_URL_300X250 : DEFAULT_BG_IMAGE_URL_300X600)
  const effectiveClickUrl =
    clickUrl || (is300x250 ? DEFAULT_CLICK_URL_300X250 : DEFAULT_CLICK_URL_300X600)
  const iframeHeight = Math.min(145, safeHeight)

  return (
    <div
      style={{
        position: "relative",
        width: safeWidth,
        height: safeHeight,
        overflow: "hidden",
        borderRadius: 8,
        background: "#ffffff",
      }}
    >
      <img
        src={effectiveImageUrl}
        alt="Content Widget background"
        style={{
          position: "absolute",
          zIndex: 1,
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <a
        href={effectiveClickUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Content Widget click layer"
        style={{
          position: "absolute",
          zIndex: 2,
          inset: 0,
          display: "block",
        }}
      />

      <iframe
        src={iframeUrl}
        title={`Content Widget ${safeWidth}x${safeHeight}`}
        frameBorder="0"
        scrolling="no"
        style={{
          position: "absolute",
          zIndex: 3,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: iframeHeight,
          border: 0,
          background: "#ffffff00",
        }}
      />
    </div>
  )
}
