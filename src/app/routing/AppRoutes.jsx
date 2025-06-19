import React from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PrivateRoutes } from './PrivateRoutes'
import { ErrorsPage } from '../modules/errors/ErrorsPage'
import { Logout, AuthPage } from '../modules/auth'
import { App } from '../App'

const AppRoutes = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const BASE_URL = import.meta.env.BASE_URL || '/'

  const isAuthResolved = typeof currentUser !== 'undefined'

  return (
    <BrowserRouter basename={BASE_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          <Route path="logout" element={<Logout />} />

          {!isAuthResolved ? (
            <Route path="*" element={<div>Loading...</div>} />
          ) : currentUser ? (
            <Route path="/*" element={<PrivateRoutes />} />
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { AppRoutes }
