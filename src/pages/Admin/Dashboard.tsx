import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Newspaper,
  Eye,
  FileText,
  Plus,
  ArrowRight,
  Church,
  CalendarDays,
} from 'lucide-react'

import { supabase } from '../../services/supabase'
import { useAuth } from '../../contexts/AuthContext'
import AdminSidebar from '../../components/AdminSidebar'

interface Stats {
  total: number
  published: number
  drafts: number
}

interface RecentNews {
  id: string
  titulo: string
  status: string
  created_at: string
}

export default function Dashboard() {
  const { admin } = useAuth()

  const [stats, setStats] = useState<Stats>({
    total: 0,
    published: 0,
    drafts: 0,
  })

  const [recentNews, setRecentNews] = useState<RecentNews[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregarDashboard() {
      try {
        const [total, published, drafts, recent] = await Promise.all([
          supabase.from('noticias').select('id', { count: 'exact', head: true }),
          supabase.from('noticias').select('id', { count: 'exact', head: true }).eq('status', 'publicada'),
          supabase.from('noticias').select('id', { count: 'exact', head: true }).eq('status', 'rascunho'),
          supabase.from('noticias')
            .select('id, titulo, status, created_at')
            .order('created_at', { ascending: false })
            .limit(5),
        ])

        if (total.error) throw total.error
        if (published.error) throw published.error
        if (drafts.error) throw drafts.error
        if (recent.error) throw recent.error

        setStats({
          total: total.count ?? 0,
          published: published.count ?? 0,
          drafts: drafts.count ?? 0,
        })

        setRecentNews(recent.data ?? [])
      } catch (error) {
        console.error('Erro ao carregar dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    void carregarDashboard()
  }, [])

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <span>PAINEL ADMINISTRATIVO</span>
            <h1>Visão geral</h1>
          </div>

          <Link to="/" target="_blank" className="admin-view-site">
            <Church size={17} />
            Ver site
          </Link>
        </header>

        <section className="admin-welcome">
          <div>
            <span>ÁREA ADMINISTRATIVA</span>
            <h2>Olá, {admin?.nome || 'Administrador'}!</h2>
            <p>
              Seja bem-vindo ao centro de administração
              da Paróquia Santa Luzia do Bom Futuro.
            </p>
          </div>

          <div className="admin-welcome-icon">
            <Church size={58} />
          </div>
        </section>

        <section className="admin-stats">
          <article className="admin-stat-card">
            <div className="stat-icon wine">
              <Newspaper size={23} />
            </div>
            <span>Total de notícias</span>
            <strong>{loading ? '...' : stats.total}</strong>
            <small>Publicações cadastradas</small>
          </article>

          <article className="admin-stat-card">
            <div className="stat-icon green">
              <Eye size={23} />
            </div>
            <span>Publicadas</span>
            <strong>{loading ? '...' : stats.published}</strong>
            <small>Visíveis no site</small>
          </article>

          <article className="admin-stat-card">
            <div className="stat-icon gold">
              <FileText size={23} />
            </div>
            <span>Rascunhos</span>
            <strong>{loading ? '...' : stats.drafts}</strong>
            <small>Aguardando publicação</small>
          </article>
        </section>

        <section className="admin-content-card">
          <div className="admin-content-heading">
            <div>
              <h2>Notícias recentes</h2>
              <p>Últimas publicações cadastradas no sistema.</p>
            </div>

            <Link to="/admin/noticias">
              Ver todas <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <p className="admin-empty">Carregando notícias...</p>
          ) : recentNews.length === 0 ? (
            <div className="admin-empty">
              <Newspaper size={35} />
              <strong>Nenhuma notícia cadastrada</strong>
              <span>Suas publicações aparecerão aqui.</span>
            </div>
          ) : (
            <div className="admin-news-list">
              {recentNews.map((item) => (
                <div className="admin-news-row" key={item.id}>
                  <div className="admin-news-icon">
                    <CalendarDays size={20} />
                  </div>

                  <div className="admin-news-info">
                    <strong>{item.titulo}</strong>
                    <span>
                      {new Date(item.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <span className={`admin-status ${item.status}`}>
                    {item.status === 'publicada' ? 'Publicada' : 'Rascunho'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <Link to="/admin/noticias" className="admin-create-button">
          <Plus size={19} />
          Gerenciar notícias
        </Link>
      </main>
    </div>
  )
}
