import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'

const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

const PrivateRoutes = () => {
  const currentUser = useSelector((state) => state.user.currentUser)

  if (typeof currentUser === 'undefined') return null
  if (!currentUser) return <Navigate to="/auth/login" replace />

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="dashboard/*" element={<DashboardWrapper />} />
        <Route path="builder" element={<BuilderPageWrapper />} />
        <Route path="menu-test" element={<MenuTestPage />} />

          <Route path="dashboard/*" element={<SuspensedView><ProfilePage /></SuspensedView>} />
        <Route path="crafted/pages/wizards/*" element={<SuspensedView><WizardsPage /></SuspensedView>} />
        <Route path="crafted/widgets/*" element={<SuspensedView><WidgetsPage /></SuspensedView>} />
        <Route path="crafted/account/*" element={<SuspensedView><AccountPage /></SuspensedView>} />
        <Route path="apps/chat/*" element={<SuspensedView><ChatPage /></SuspensedView>} />
        <Route path="apps/user-management/*" element={<SuspensedView><UsersPage /></SuspensedView>} />

        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  )
}

const SuspensedView = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })

  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
