import Navbar from './components/Layout/Navbar.jsx'
import Footer from './components/Layout/Footer.jsx'
import Betsense from './pages/Betsense.jsx';
import BcAds from './pages/BcAds.jsx'; 
import Modal from './pages/Modal.jsx'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Betsense />} />
        <Route path="/bcads" element={<BcAds />} />
        <Route path="/modal" element={<Modal />} />
      </Routes>
      <Footer />
    </BrowserRouter>

    </div>

  )
}

export default App
