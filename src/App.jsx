import { BrowserRouter, Routes, Route } from "react-router-dom"

import MainLayout from "./components/Layout/MainLayout"

import Usa from "./pages/USA"
import Latam from "./pages/LATAM"
import Europe from "./pages/Europe"

import PreviewRouter from "./router/PreviewRouter"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Site normal */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Usa />} />
          <Route path="/latam" element={<Latam />} />
          <Route path="/europe" element={<Europe />} />
        </Route>

        {/* Previews */}
        <Route path="/preview/*" element={<PreviewRouter />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
