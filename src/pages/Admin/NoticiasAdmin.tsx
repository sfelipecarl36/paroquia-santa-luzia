import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus,
  Newspaper,
  Search,
  Trash2,
  Eye,
  CalendarDays,
  Pencil,
} from 'lucide-react'

import { supabase } from '../../services/supabase'
import { excluirNoticia } from '../../services/noticiasService'
import AdminSidebar from '../../components/AdminSidebar'

interface Noticia {
  id: string
  titulo: string
  slug: string
  categoria: string
  status: string
  created_at: string
  imagem_capa: string | null
}

export default function NoticiasAdmin() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('todas')
  const [error, setError] = useState('')

  const carregarNoticias = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase
        .from('noticias')
        .select('id, titulo, slug, categoria, status, created_at, imagem_capa')
        .order('created_at', { ascending: false })

      if (error) throw error

      setNoticias(data ?? [])
    } catch (err) {
      console.error(err)
      setError('Não foi possível carregar as notícias.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void carregarNoticias()
  }, [carregarNoticias])

  async function handleExcluirNoticia(id: string) {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir esta notícia?'
    )

    if (!confirmar) return

    try {
      await excluirNoticia(id)

      setNoticias((current) =>
        current.filter((item) => item.id !== id)
      )
    } catch (err) {
      console.error(err)
      alert('Não foi possível excluir a notícia.')
    }
  }

  const filtradas = noticias.filter((noticia) => {
    const correspondeBusca = noticia.titulo
      .toLowerCase()
      .includes(search.toLowerCase())

    const correspondeStatus =
      filter === 'todas' || noticia.status === filter

    return correspondeBusca && correspondeStatus
  })

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <span>CONTEÚDO DO SITE</span>
            <h1>Notícias</h1>
          </div>

          <Link
            to="/admin/noticias/nova"
            className="admin-create-button"
          >
            <Plus size={18} />
            Nova notícia
          </Link>
        </header>

        <section className="admin-content-card">
          <div className="admin-content-heading">
            <div>
              <h2>Publicações</h2>
              <p>
                Gerencie as notícias e comunicados da paróquia.
              </p>
            </div>

            <span className="admin-total">
              {noticias.length} registros
            </span>
          </div>

          <div className="admin-filters">
            <div className="admin-search">
              <Search size={18} />

              <input
                type="text"
                placeholder="Pesquisar notícia..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="todas">Todas</option>
              <option value="publicada">Publicadas</option>
              <option value="rascunho">Rascunhos</option>
            </select>
          </div>

          {error && (
            <p className="admin-error">{error}</p>
          )}

          {loading ? (
            <div className="admin-empty">
              Carregando publicações...
            </div>
          ) : filtradas.length === 0 ? (
            <div className="admin-empty">
              <Newspaper size={38} />
              <strong>Nenhuma notícia encontrada</strong>
              <span>
                Cadastre uma notícia para começar a preencher seu portal.
              </span>
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Notícia</th>
                    <th>Categoria</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {filtradas.map((noticia) => (
                    <tr key={noticia.id}>
                      <td>
                        <div className="admin-table-news">
                          {noticia.imagem_capa ? (
                            <img
                              src={noticia.imagem_capa}
                              alt=""
                            />
                          ) : (
                            <div className="admin-table-placeholder">
                              <Newspaper size={20} />
                            </div>
                          )}

                          <strong>{noticia.titulo}</strong>
                        </div>
                      </td>

                      <td>{noticia.categoria}</td>

                      <td>
                        <span className="admin-date">
                          <CalendarDays size={14} />
                          {new Date(
                            noticia.created_at
                          ).toLocaleDateString('pt-BR')}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`admin-status ${noticia.status}`}
                        >
                          {noticia.status === 'publicada'
                            ? 'Publicada'
                            : 'Rascunho'}
                        </span>
                      </td>

                      <td>
                        <div className="admin-actions">
                          <Link
                            to={`/admin/noticias/editar/${noticia.id}`}
                            className="admin-action edit"
                            aria-label="Editar notícia"
                          >
                            <Pencil size={17} />
                          </Link>

                          <button
                            type="button"
                            className="admin-action delete"
                            onClick={() =>
                              handleExcluirNoticia(noticia.id)
                            }
                            aria-label="Excluir notícia"
                          >
                            <Trash2 size={17} />
                          </button>

                          {noticia.status === 'publicada' && noticia.slug && (
                            <Link
                              to={`/noticias/${noticia.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="admin-action view"
                              aria-label="Visualizar notícia"
                            >
                              <Eye size={17} />
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
