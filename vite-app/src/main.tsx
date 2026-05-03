import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './globals.css'
import SignIn from './pages/sign-in'
import SignUp from './pages/sign-up'
import HomePage from './pages/homepage'
import TypePage from './pages/type'
import FolderPage from './pages/id'

import ProtectedRoute from './layouts/ProtectedRoute'
import AuthLayout from './layouts/AuthLayout'
import RootLayout from './layouts/RootLayout'
import { RefreshProvider } from './context/RefreshContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <RefreshProvider>
       <Routes>
         <Route element={<AuthLayout />}>
           <Route path="/sign-in" element={<SignIn />} />
           <Route path="/sign-up" element={<SignUp />} />
         </Route>
         <Route element={<ProtectedRoute><RootLayout /></ProtectedRoute>}>
           <Route path="/" element={<HomePage />} />
           <Route path="/:type" element={<TypePage />} />
           <Route path="/folders/:id" element={<FolderPage />} />
         </Route>
       </Routes>
     </RefreshProvider>
     </BrowserRouter>
  </StrictMode>
)
