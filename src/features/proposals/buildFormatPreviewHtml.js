function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

function baseHtml(body, script = "") {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><base target="_blank"><style>*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#eef2f1;font-family:Arial,sans-serif}img,video,iframe{display:block;border:0}.stage{position:relative;width:100%;height:100%;overflow:hidden}.cover{width:100%;height:100%;object-fit:cover}.label{position:absolute;top:10px;left:10px;z-index:20;padding:5px 8px;background:rgba(0,0,0,.68);color:#fff;font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.phone{position:absolute;left:50%;top:50%;width:44%;height:88%;transform:translate(-50%,-50%);border:8px solid #122f29;border-radius:22px;overflow:hidden;background:#fff}.line{height:7px;margin:10px 12px;border-radius:8px;background:#d9e1df}.article{position:absolute;inset:0;background:#fff}.shade{position:absolute;inset:0;background:linear-gradient(180deg,transparent 25%,rgba(0,0,0,.55))}.empty{display:grid;width:100%;height:100%;place-items:center;background:#e1e7e5;color:#8a9894;font-size:9px;font-weight:700;text-transform:uppercase}.display-page{background:#d8e0de}.site-nav{position:absolute;z-index:3;top:0;left:0;right:0;height:10%;display:flex;align-items:center;gap:5%;padding:0 5%;background:#12211e;color:#fff}.site-nav i{width:11%;height:6px;border-radius:6px;background:#52635f}.slot{position:relative;width:100%;height:100%;overflow:hidden;background:#fff;box-shadow:0 3px 12px rgba(0,0,0,.14)}.slot>span{position:absolute;left:4px;bottom:4px;padding:3px 5px;background:#000b;color:#fff;font-size:7px;font-weight:700}.slot.disabled{box-shadow:inset 0 0 0 1px #b9c6c2}.display-top{position:absolute;top:12%;left:17%;width:66%;height:12%}.display-left,.display-right{position:absolute;top:27%;bottom:3%;width:13%}.display-left{left:2%}.display-right{right:2%}.display-content{position:absolute;top:27%;bottom:3%;left:17%;right:17%;display:grid;grid-template-columns:1fr 29%;gap:4%;padding:4%;background:#fff}.headline,.copyline{height:10px;margin-bottom:9px;border-radius:7px;background:#cfd9d6}.headline{height:16px}.headline.short,.copyline.short{width:68%}.hero-placeholder{height:45%;margin:15px 0;background:#e3e9e7}.display-content aside{height:38%}</style></head><body>${body}${script ? `<script>${script}</script>` : ""}</body></html>`
}

function asset(format, key) {
  return format.assets?.[key] || ""
}

function media(url, alt, className = "cover") {
  const safeUrl = escapeHtml(url)
  if (!safeUrl) {
    return `<div class="empty">Missing creative</div>`
  }
  if (/\.(mp4|webm|ogg|mov)(\?|#|$)/i.test(url)) {
    return `<video class="${className}" src="${safeUrl}" autoplay muted loop playsinline></video>`
  }
  return `<img class="${className}" src="${safeUrl}" alt="${escapeHtml(alt)}">`
}

function getCreative(format, placement) {
  return (format.creatives || []).find((creative) => creative.placement === placement) || null
}

export function buildFormatPreviewHtml(format = {}) {
  const type = format.previewType || "image"
  const primary = escapeHtml(format.assetUrl || "")
  const demoUrl = escapeHtml(format.demoUrl || "")
  const title = escapeHtml(format.title || "Creative preview")

  if (demoUrl || type === "custom_demo_url") {
    if (!demoUrl) {
      return baseHtml(`<div class="empty">Missing external demo URL</div>`)
    }
    return baseHtml(`<div class="stage" style="background:#0d1816"><iframe title="${title}" src="${demoUrl}" style="position:absolute;inset:0;width:100%;height:100%" allow="autoplay; fullscreen"></iframe><div style="position:absolute;left:14px;right:14px;bottom:14px;z-index:2;padding:10px 12px;background:rgba(8,20,17,.82);color:#fff;font-size:11px;line-height:1.5;border-radius:12px"><strong style="display:block;margin-bottom:4px">External demo</strong>If this preview is blocked by the destination site, <a href="${demoUrl}" target="_blank" rel="noopener noreferrer" style="color:#8fdcc7;font-weight:700;text-decoration:none">open the demo in a new tab</a>.</div></div>`)
  }

  if (type === "display_banners") {
    const placements = [
      ["top_970x90", "top"],
      ["rail_left_160x600", "rail left"],
      ["rail_right_160x600", "rail right"],
      ["sidebar_300x250", "sidebar"],
    ]
    const creative = Object.fromEntries(
      placements.map(([placement]) => [placement, getCreative(format, placement)])
    )
    const slot = (placement, label) => {
      const item = creative[placement]
      return `<div class="slot ${item?.assetUrl ? "" : "disabled"}">${media(item?.assetUrl || "", label)}<span>${label}${item?.assetUrl ? "" : " · empty"}</span></div>`
    }
    return baseHtml(`<div class="stage display-page"><div class="site-nav"><b>SPORTS</b><i></i><i></i><i></i></div><div class="display-top">${slot("top_970x90", "970x90")}</div><div class="display-left">${slot("rail_left_160x600", "160x600 left")}</div><div class="display-right">${slot("rail_right_160x600", "160x600 right")}</div><main class="display-content"><article><div class="headline"></div><div class="headline short"></div><div class="hero-placeholder"></div><div class="copyline"></div><div class="copyline short"></div></article><aside>${slot("sidebar_300x250", "300x250")}</aside></main><span class="label">Display banners</span></div>`)
  }

  if (type === "interscroller_image" || type === "interscroller_video") {
    const previewMedia = media(format.assetUrl || "", title)
    return baseHtml(`<div class="stage" style="background:#111">${previewMedia}<div class="article" style="clip-path:polygon(0 0,100% 0,100% 22%,0 22%,0 78%,100% 78%,100% 100%,0 100%)"><div class="line" style="width:62%"></div><div class="line"></div><div class="line" style="width:78%"></div><div style="height:38%;margin:14px;background:#e2e8e6"></div><div class="line"></div><div class="line" style="width:72%"></div></div><span class="label">Interscroller ${type.endsWith("video") ? "video" : "image"}</span></div>`)
  }

  if (type === "desktop_skin") {
    const background = escapeHtml(asset(format, "skin_background") || format.assetUrl)
    const left = escapeHtml(asset(format, "skin_left") || background)
    const right = escapeHtml(asset(format, "skin_right") || background)
    return baseHtml(`<div class="stage" style="background:#dfe7e4"><img class="cover" src="${background}" alt="${title}"><img src="${left}" style="position:absolute;left:0;top:0;width:18%;height:100%;object-fit:cover"><img src="${right}" style="position:absolute;right:0;top:0;width:18%;height:100%;object-fit:cover"><div style="position:absolute;left:20%;right:20%;top:7%;bottom:0;background:#fff;padding:12px"><div class="line" style="width:55%"></div><div class="line"></div><div style="height:48%;margin:16px 12px;background:#e5ebe9"></div><div class="line"></div></div><span class="label">Desktop skin</span></div>`)
  }

  if (type === "mobile_skin" || type === "sticky_mobile") {
    const previewMedia = format.assetUrl
      ? media(format.assetUrl, format.title, "")
      : `<div class="empty">Missing mobile creative</div>`
    return baseHtml(`<div class="stage" style="background:#cbd8d4"><div class="phone"><div class="line"></div><div class="line" style="width:65%"></div><div style="height:38%;margin:12px;background:#e1e8e6"></div><div class="line"></div><div class="line"></div><div style="position:absolute;left:0;right:0;bottom:0;width:100%;max-height:34%;overflow:hidden">${previewMedia}</div></div><span class="label">Mobile placement</span></div>`)
  }

  if (type === "video_banner") {
    const previewMedia = format.assetUrl
      ? media(format.assetUrl, format.title)
      : `<div class="empty" style="width:min(74%,300px);height:88%">Missing video creative</div>`
    return baseHtml(`<div class="stage" style="background:#081d18;display:grid;place-items:center"><div style="width:min(74%,300px);height:88%;overflow:hidden;background:#000">${previewMedia}</div><span class="label">Video banner</span></div>`)
  }

  if (type === "instream_onsite" || type === "instream_youtube") {
    const youtube = type === "instream_youtube"
    const sourceId = format.sourceFormatId || format.id || ""
    const skippable = !sourceId.includes("-nonskippable-")
    const previewMedia = format.assetUrl
      ? media(format.assetUrl, format.title)
      : `<div class="empty">Missing in-stream creative</div>`
    const skipControl = skippable
      ? `<button id="skip" type="button" disabled style="position:absolute;right:0;bottom:45px;padding:10px 14px;border:1px solid #ffffff88;border-right:0;background:#000c;color:#fff;font-size:11px;font-weight:700">Skip in 5</button>`
      : `<div style="position:absolute;right:12px;bottom:45px;padding:8px 11px;background:#000c;color:#fff;font-size:10px;font-weight:700">Non-skippable · 0:15</div>`
    const sponsored = youtube
      ? `<div style="position:absolute;left:12px;top:12px;padding:7px 9px;background:#000b;color:#fff;font-size:10px"><b>Sponsored</b> · Cracks partner</div><div style="position:absolute;left:12px;bottom:45px;padding:9px 13px;border-radius:18px;background:#3ea6ff;color:#0f0f0f;font-size:10px;font-weight:700">Visit advertiser</div>`
      : `<div style="position:absolute;left:12px;top:12px;padding:7px 9px;background:#000b;color:#fff;font-size:10px;font-weight:700">On-site player</div>`
    const chrome = youtube
      ? `<div style="position:absolute;left:0;right:0;bottom:0;padding:20px 12px 9px;background:linear-gradient(transparent,#000d)"><div style="height:3px;background:#ffffff55"><div id="progress" style="height:100%;width:0;background:#ff0033"></div></div><div style="display:flex;justify-content:space-between;margin-top:8px;color:#fff;font-size:10px"><span>▶ &nbsp; 🔇 &nbsp; Ad</span><span>CC &nbsp; ⚙ &nbsp; □</span></div></div>`
      : `<div style="position:absolute;left:12px;bottom:12px;color:#fff;font-size:10px;font-weight:700">Illustrative preview · MP4 H.264 / VAST delivery</div>`
    const script = skippable
      ? `let n=5;const b=document.getElementById('skip');const p=document.getElementById('progress');const t=setInterval(()=>{n-=1;if(p)p.style.width=((5-n)/5*100)+'%';if(n<=0){clearInterval(t);b.disabled=false;b.textContent='Skip ad  ›'}else{b.textContent='Skip in '+n}},1000);b.addEventListener('click',()=>{if(b.disabled)return;document.getElementById('player').innerHTML='<div class="empty" style="color:#fff;background:#101817">Editorial video · Ad preview complete</div>'});`
      : `const p=document.getElementById('progress');if(p){let n=0;setInterval(()=>{n=(n+1)%16;p.style.width=(n/15*100)+'%'},1000)}`
    return baseHtml(`<div class="stage" style="display:grid;place-items:center;background:${youtube ? "#0f0f0f" : "#dfe7e4"}"><div id="player" style="position:relative;width:min(92%,730px);aspect-ratio:16/9;overflow:hidden;background:#000">${previewMedia}<div style="position:absolute;inset:0;background:linear-gradient(180deg,#0003,transparent 45%,#0008)"></div>${sponsored}${skipControl}${chrome}</div><span class="label">${youtube ? "YouTube in-stream" : "On-site in-stream"} · ${skippable ? "Skippable" : "Non-skippable"}</span></div>`, script)
  }

  if (type === "takeover") {
    const background = asset(format, "skin_background")
    const left = asset(format, "skin_left") || background
    const right = asset(format, "skin_right") || background
    const top = asset(format, "display_top") || asset(format, "leaderboard")
    const sidebar = asset(format, "display_sidebar") || asset(format, "mrec")
    const mobile = asset(format, "mobile_sticky")
    const slot = (url, label) => `<div class="slot ${url ? "" : "disabled"}">${media(url, label)}<span>${label}${url ? "" : " · empty"}</span></div>`
    return baseHtml(`<div class="stage display-page"><div class="site-nav"><b>SPORTS</b><i></i><i></i><i></i></div>${left ? `<div class="display-left">${slot(left, "Skin left")}</div><div class="display-right">${slot(right, "Skin right")}</div>` : ""}<div class="display-top">${slot(top, "Leaderboard / Billboard")}</div><main class="display-content"><article><div class="headline"></div><div class="headline short"></div><div class="hero-placeholder"></div><div class="copyline"></div><div class="copyline short"></div></article><aside>${slot(sidebar, "MPU")}</aside></main>${mobile ? `<div style="position:absolute;left:50%;bottom:3%;width:min(48%,320px);height:8%;transform:translateX(-50%);z-index:5">${slot(mobile, "Mobile leaderboard")}</div>` : ""}<span class="label">${title} · Coordinated takeover</span></div>`)
  }

  if (type === "countdown") {
    const isVideo = /\.(mp4|webm|ogg|mov)(\?|#|$)/i.test(format.assetUrl || "")
    const media = isVideo
      ? `<video class="cover" src="${primary}" autoplay muted loop playsinline></video>`
      : `<img class="cover" src="${primary}" alt="${title}">`
    const script = `let left=31062;const els=[document.getElementById('h'),document.getElementById('m'),document.getElementById('s')];function tick(){left=left<=1?31062:left-1;els[0].textContent=String(Math.floor(left/3600)).padStart(2,'0');els[1].textContent=String(Math.floor(left%3600/60)).padStart(2,'0');els[2].textContent=String(left%60).padStart(2,'0')}tick();setInterval(tick,1000);`
    return baseHtml(`<div class="stage" style="background:#111">${media}<div style="position:absolute;left:50%;bottom:14%;transform:translateX(-50%);display:flex;gap:7px">${[["h","Hours"],["m","Minutes"],["s","Seconds"]].map(([id,label]) => `<div style="text-align:center;color:#fff;font-size:10px;font-weight:700"><b id="${id}" style="display:grid;place-items:center;width:44px;height:42px;margin-bottom:6px;background:#fff;color:#000;font-size:20px">00</b>${label}</div>`).join("")}</div><span class="label">Countdown</span></div>`, script)
  }

  const previewMedia = format.assetUrl
    ? media(format.assetUrl, format.title, "")
    : `<div class="empty" style="width:70%;height:70%">Missing creative</div>`
  return baseHtml(`<div class="stage" style="display:grid;place-items:center;background:#dfe7e4"><div style="display:grid;width:88%;height:88%;place-items:center;overflow:hidden">${previewMedia}</div><span class="label">${title}</span></div>`)
}
