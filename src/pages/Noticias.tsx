import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, CalendarDays, Church } from 'lucide-react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { listarNoticias, type Noticia } from '../services/noticiasService'

export default function Noticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function carregarNoticias() {
      try {
        const resultado = await listarNoticias()

        const publicadas = resultado
          .filter((noticia) => noticia.status === 'publicada')
          .sort((a, b) => {
            const dataA = new Date(a.publicada_em || a.created_at).getTime()
            const dataB = new Date(b.publicada_em || b.created_at).getTime()

            return dataB - dataA
          })

        setNoticias(publicadas)
      } catch (err) {
        console.error('Erro ao carregar notícias:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    void carregarNoticias()
  }, [])

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#fffdf8]">
        <section className="bg-[#173d2b] px-6 py-20 text-white md:py-28">
          <div className="mx-auto max-w-6xl">
            <span className="mb-5 block text-sm font-semibold tracking-[0.2em] text-[#d9c58a]">
              VIDA EM COMUNIDADE
            </span>

            <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
              Notícias da nossa <em className="font-serif font-normal">comunidade.</em>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
              Acompanhe os acontecimentos, celebrações e comunicados
              da Paróquia Santa Luzia do Bom Futuro.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-sm font-semibold tracking-widest text-[#9b7842]">
                FIQUE POR DENTRO
              </span>
              <h2 className="mt-2 text-3xl font-semibold text-[#24352b] md:text-4xl">
                Últimas publicações
              </h2>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#315b40] hover:gap-3"
            >
              Voltar ao início
              <ArrowRight size={17} />
            </Link>
          </div>

          {loading ? (
            <p className="py-16 text-center text-gray-500">
              Carregando notícias...
            </p>
          ) : error ? (
            <p className="py-16 text-center text-red-600">
              Não foi possível carregar as notícias. Tente novamente mais tarde.
            </p>
          ) : noticias.length === 0 ? (
            <div className="rounded-2xl border border-[#e9e4d8] bg-white px-6 py-16 text-center">
              <Church className="mx-auto mb-4 text-[#9b7842]" size={42} />
              <h3 className="text-xl font-semibold text-[#24352b]">
                Ainda não há notícias publicadas
              </h3>
              <p className="mt-2 text-gray-500">
                Em breve teremos novidades para compartilhar com você.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {noticias.map((noticia) => (
                <article
                  key={noticia.id}
                  className="group overflow-hidden rounded-2xl border border-[#eee9df] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link
                    to={`/noticias/${noticia.slug}`}
                    className="block"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#eee9df]">
                      {noticia.imagem_capa ? (
                        <img
                          src={noticia.imagem_capa}
                          alt={noticia.titulo}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[#9b7842]">
                          <Church size={48} />
                        </div>
                      )}

                      <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#315b40] shadow">
                        {noticia.categoria}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6">
                    <span className="flex items-center gap-2 text-sm text-gray-500">
                      <CalendarDays size={15} />
                      {new Date(
                        noticia.publicada_em || noticia.created_at
                      ).toLocaleDateString('pt-BR')}
                    </span>

                    <h3 className="mt-4 text-xl font-semibold leading-snug text-[#24352b]">
                      {noticia.titulo}
                    </h3>

                    {noticia.resumo && (
                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-600">
                        {noticia.resumo}
                      </p>
                    )}

                    <Link
                      to={`/noticias/${noticia.slug}`}
                      className="mt-6 inline-flex items-center gap-2 font-semibold text-[#315b40] transition hover:gap-3"
                    >
                      Ler notícia
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}
