import { BrowserRouter, Routes, Route } from "react-router-dom";

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
        </Route>

        <Route element={<PreviewLayout />}>
          <Route path="/preview/:title" element={<Preview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
