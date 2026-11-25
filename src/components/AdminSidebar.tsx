import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Newspaper,
  LogOut,
  Church,
  ExternalLink,
} from 'lucide-react'

import { logoutAdmin } from '../services/authService'
import { useAuth } from '../contexts/AuthContext'

export default function AdminSidebar() {
  const navigate = useNavigate()
  const { admin } = useAuth()

  async function handleLogout() {
    try {
      await logoutAdmin()
      navigate('/admin/login', { replace: true })
    } catch (error) {
      console.error('Erro ao sair:', error)
    }
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <img
          src="/images/brasao-paroquia.png"
          alt="Brasão paroquial"
        />

        <div>
          <strong>PARÓQUIA</strong>
          <span>Santa Luzia</span>
          <small>ADMINISTRAÇÃO</small>
        </div>
      </div>

      <div className="admin-sidebar-section">
        <span>MENU PRINCIPAL</span>

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive ? 'admin-nav-link active' : 'admin-nav-link'
          }
        >
          <LayoutDashboard size={19} />
          Visão geral
        </NavLink>

        <NavLink
          to="/admin/noticias"
          className={({ isActive }) =>
            isActive ? 'admin-nav-link active' : 'admin-nav-link'
          }
        >
          <Newspaper size={19} />
          Notícias
        </NavLink>
      </div>

      <div className="admin-sidebar-bottom">
        <div className="admin-user">
          <div className="admin-avatar">
            <Church size={19} />
          </div>

          <div>
            <strong>{admin?.nome || 'Administrador'}</strong>
            <span>Administrador</span>
          </div>
        </div>

        <NavLink to="/" className="admin-nav-link">
          <ExternalLink size={18} />
          Ver site
        </NavLink>

        <button
          type="button"
          className="admin-logout"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Sair do painel
        </button>
      </div>
    </aside>
  )
}