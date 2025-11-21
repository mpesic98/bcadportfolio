import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/Layout/MainLayout";
import PreviewLayout from "./components/Layout/previews/PreviewLayout";

import Betsense from "./pages/Betsense";
import BcAds from "./pages/BcAds";
import Modal from "./pages/Modal";
import Preview from "./components/Preview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Betsense />} />
          <Route path="/bcads" element={<BcAds />} />
          <Route path="/modal" element={<Modal />} />
        </Route>

        <Route element={<PreviewLayout />}>
          <Route path="/preview/:title" element={<Preview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
