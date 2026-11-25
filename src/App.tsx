import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom'

import { AuthProvider, useAuth } from './contexts/AuthContext'

import Home from './pages/Home'
import InstitutionalPage from './pages/InstitutionalPage'
import Noticias from './pages/Noticias'
import NoticiaDetalhe from './pages/NoticiaDetalhe'
import Missas from './pages/Missas'

import Login from './pages/Admin/Login'
import Dashboard from './pages/Admin/Dashboard'
import NoticiasAdmin from './pages/Admin/NoticiasAdmin'
import NoticiaForm from './pages/Admin/NoticiaForm'
import MissasAdmin from './pages/Admin/MissasAdmin'

function ProtectedAdmin() {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="admin-loading">
        Verificando acesso...
      </div>
    )
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/noticias" element={<Noticias />} />
      <Route path="/noticias/:slug" element={<NoticiaDetalhe />} />

      <Route path="/admin/login" element={<Login />} />

      <Route element={<ProtectedAdmin />}>
        <Route path="/admin" element={<Dashboard />} />


        <Route
          path="/admin/noticias"
          element={<NoticiasAdmin />}
        />

        <Route
          path="/admin/noticias/nova"
          element={<NoticiaForm />}
        />

        <Route
          path="/admin/noticias/editar/:id"
          element={<NoticiaForm />}
        />

        <Route
          path="/admin/missas"
          element={<MissasAdmin />}
        />

      </Route>

      <Route path="/missas" element={<Missas />} />
      <Route path="/:page" element={<InstitutionalPage />} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
