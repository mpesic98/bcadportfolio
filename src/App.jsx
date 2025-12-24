import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrieviewSkin from "./pages/PrieviewSkin";

import MainLayout from "./components/Layout/MainLayout";
import PreviewLayout from "./components/Layout/previews/PreviewLayout";

import Usa from "./pages/USA";
import Latam from "./pages/LATAM";
import Europe from "./pages/Europe";
import Preview from "./components/Preview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Usa />} />
          <Route path="/latam" element={<Latam />} />
          <Route path="/europe" element={<Europe />} />
          {/* <Route path="/preview" element={<PrieviewSkin />} /> */}
        </Route>

        <Route element={<PreviewLayout />}>
          <Route path="/preview" element={<PrieviewSkin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
