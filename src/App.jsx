import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import AdminShell from "./components/admin/AdminShell"
import MainLayout from "./components/Layout/MainLayout"
import { ProposalStoreProvider } from "./features/proposals/ProposalStore"
import AdminDashboard from "./pages/admin/AdminDashboard"
import CampaignsAdminPage from "./pages/admin/CampaignsAdminPage"
import ProposalsAdminPage from "./pages/admin/ProposalsAdminPage"
import ProposalPage from "./pages/proposals/ProposalPage"
import HomeLanding from "./components/home/HomeLanding"
import PreviewRouter from "./router/PreviewRouter"

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomeLanding />} />
            <Route path="/:region" element={<Navigate to="/" replace />} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProposalStoreProvider>
                <AdminShell />
              </ProposalStoreProvider>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="campaigns" element={<CampaignsAdminPage />} />
            <Route path="proposals" element={<ProposalsAdminPage />} />
            <Route path="proposals/new" element={<ProposalsAdminPage forceNew />} />
          </Route>

          <Route
            path="/admin/preview/:proposalId"
            element={
              <ProposalStoreProvider>
                <ProposalPage mode="internal" />
              </ProposalStoreProvider>
            }
          />
          <Route
            path="/preview/:formatId"
            element={
              <ProposalStoreProvider>
                <PreviewRouter />
              </ProposalStoreProvider>
            }
          />
          <Route
            path="/:region/:segment/preview/:formatId"
            element={
              <ProposalStoreProvider>
                <PreviewRouter />
              </ProposalStoreProvider>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
