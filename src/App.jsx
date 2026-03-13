import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import AdminShell from "./components/admin/AdminShell"
import MainLayout from "./components/Layout/MainLayout"
import { ProposalStoreProvider } from "./features/proposals/ProposalStore"
import AdminDashboard from "./pages/admin/AdminDashboard"
import CampaignsAdminPage from "./pages/admin/CampaignsAdminPage"
import ProposalsAdminPage from "./pages/admin/ProposalsAdminPage"
import ProposalPage from "./pages/proposals/ProposalPage"
import RegionLandingResolver from "./router/RegionLandingResolver"
import PreviewRouter from "./router/PreviewRouter"

function App() {
  return (
    <ProposalStoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<RegionLandingResolver />} />
            <Route path="/:region" element={<RegionLandingResolver />} />
          </Route>

          <Route path="/admin" element={<AdminShell />}>
            <Route index element={<AdminDashboard />} />
            <Route path="campaigns" element={<CampaignsAdminPage />} />
            <Route path="proposals" element={<ProposalsAdminPage />} />
            <Route path="proposals/new" element={<ProposalsAdminPage forceNew />} />
          </Route>

          <Route path="/admin/preview/:proposalId" element={<ProposalPage mode="internal" />} />
          <Route path="/p/:proposalId" element={<ProposalPage mode="external" />} />
          <Route path="/:region/:segment/preview/:formatId" element={<PreviewRouter />} />
          <Route path="*" element={<Navigate to="/?segment=non-endemic" replace />} />
        </Routes>
      </BrowserRouter>
    </ProposalStoreProvider>
  )
}

export default App
