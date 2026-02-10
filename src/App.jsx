import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import MainLayout from "./components/Layout/MainLayout"
import RegionLandingResolver from "./router/RegionLandingResolver"
import PreviewRouter from "./router/PreviewRouter"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<RegionLandingResolver />} />
          <Route path="/:region" element={<RegionLandingResolver />} />
        </Route>

        <Route path="/:region/:segment/preview/:formatId" element={<PreviewRouter />} />
        <Route path="*" element={<Navigate to="/?segment=non-endemic" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
