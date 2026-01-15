import { Routes, Route, Navigate } from "react-router-dom"

import SkinPreview from "../pages/previews/SkinPreview"
import DisplayPreview from "../pages/previews/DisplayPreview"
import InterscrollerPreview from "../pages/previews/InterscrollerPreview"
import InterstitialPreview from "../pages/previews/InterstitialPreview"
import VideoBannerPreview from "../pages/previews/VideoBannerPreview"

export default function PreviewRouter() {
  return (
    <Routes>
      <Route path="skin" element={<SkinPreview />} />
      <Route path="display" element={<DisplayPreview />} />
      <Route path="interscroller" element={<InterscrollerPreview />} />
      <Route path="interstitial" element={<InterstitialPreview />} />
      <Route path="videobanner" element={<VideoBannerPreview />} />
      <Route path="*" element={<Navigate to="display" replace />} />
    </Routes>
  )
}
