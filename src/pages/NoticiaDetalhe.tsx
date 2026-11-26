
import SEO from '../components/SEO'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  CalendarDays,
  Church,
  Share2,
  Copy,
  Check,
  MessageCircle,
} from 'lucide-react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  buscarNoticiaPorSlug,
  type Noticia,
} from '../services/noticiasService'

export default function NoticiaDetalhe() {
  const { slug } = useParams()

  const [noticia, setNoticia] = useState<Noticia | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [copiado, setCopiado] = useState(false)

  useEffect(() => {
    async function carregarNoticia() {
      if (!slug) {
        setError(true)
        setLoading(false)
        return
      }

      try {
        const resultado = await buscarNoticiaPorSlug(slug)
        setNoticia(resultado)
      } catch (err) {
        console.error('Erro ao carregar notícia:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    void carregarNoticia()
  }, [slug])

  const linkNoticia =
    typeof window !== 'undefined' ? window.location.href : ''

  const compartilharWhatsApp = () => {
    if (!noticia) return

    const mensagem = `${noticia.titulo}\n\nConfira esta notícia da Paróquia Santa Luzia do Bom Futuro:\n${linkNoticia}`

    window.open(
      `https://wa.me/?text=${encodeURIComponent(mensagem)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const compartilharNoticia = async () => {
    if (!noticia) return

    const dados = {
      title: noticia.titulo,
      text: noticia.resumo || 'Confira esta notícia da nossa Paróquia.',
      url: linkNoticia,
    }

    try {
      if (navigator.share) {
        await navigator.share(dados)
      } else {
        await navigator.clipboard.writeText(linkNoticia)
        setCopiado(true)
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return

      try {
        await navigator.clipboard.writeText(linkNoticia)
        setCopiado(true)
      } catch {
        console.error('Não foi possível compartilhar ou copiar o link.')
      }
    }
  }

  const copiarLink = async () => {
    try {
      await navigator.clipboard.writeText(linkNoticia)
      setCopiado(true)
    } catch (err) {
      console.error('Erro ao copiar o link:', err)
    }
  }

  return (
    <>
      {noticia && !loading && (
        <SEO
          title={noticia.titulo}
          description={
            noticia.resumo ||
            'Confira esta notícia da Paróquia Santa Luzia do Bom Futuro, em Belém do Pará.'
          }
          image={noticia.imagem_capa || undefined}
          type="article"
          publishedTime={noticia.publicada_em}
        />
      )}

      <Header />

      <main className="min-h-screen bg-[#fffdf8]">
        {loading ? (
          <div className="px-6 py-32 text-center text-gray-500">
            Carregando notícia...
          </div>
        ) : error || !noticia ? (
          <section className="mx-auto max-w-3xl px-6 py-32 text-center">
            <Church className="mx-auto mb-5 text-[#9b7842]" size={48} />

            <h1 className="text-3xl font-semibold text-[#24352b]">
              Notícia não encontrada
            </h1>

            <p className="mt-4 text-gray-600">
              Essa publicação pode ter sido removida ou não está disponível.
            </p>

            <Link
              to="/noticias"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-[#315b40]"
            >
              <ArrowLeft size={18} />
              Voltar para notícias
            </Link>
          </section>
        ) : (
          <article>
            <header className="bg-[#173d2b] px-6 py-16 text-white md:py-24">
              <div className="mx-auto max-w-4xl">
                <Link
                  to="/noticias"
                  className="mb-10 inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-white"
                >
                  <ArrowLeft size={17} />
                  Todas as notícias
                </Link>

                <span className="mb-5 block text-sm font-semibold tracking-widest text-[#d9c58a]">
                  {noticia.categoria}
                </span>

                <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
                  {noticia.titulo}
                </h1>

                {noticia.resumo && (
                  <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
                    {noticia.resumo}
                  </p>
                )}

                <span className="mt-8 flex items-center gap-2 text-sm text-white/70">
                  <CalendarDays size={16} />
                  {new Date(
                    noticia.publicada_em || noticia.created_at
                  ).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </header>

            <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
              {noticia.imagem_capa && (
                <img
                  src={noticia.imagem_capa}
                  alt={noticia.titulo}
                  className="mb-12 max-h-[520px] w-full rounded-2xl object-cover"
                />
              )}

              <div
                className="noticia-conteudo"
                dangerouslySetInnerHTML={{
                  __html: noticia.conteudo,
                }}
              />

              <div className="mt-14 rounded-2xl border border-[#e9e4d8] bg-white p-6 md:p-8">
                <h2 className="text-xl font-semibold text-[#24352b]">
                  Compartilhe esta notícia
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Ajude a divulgar as notícias e atividades da nossa Paróquia.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={compartilharWhatsApp}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-semibold text-white transition hover:bg-[#1ebe5d]"
                  >
                    <MessageCircle size={19} />
                    WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={compartilharNoticia}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#173d2b] px-5 py-3 font-semibold text-white transition hover:bg-[#315b40]"
                  >
                    <Share2 size={19} />
                    Compartilhar
                  </button>

                  <button
                    type="button"
                    onClick={copiarLink}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#d9d3c6] px-5 py-3 font-semibold text-[#315b40] transition hover:bg-[#f8f6f0]"
                  >
                    {copiado ? <Check size={19} /> : <Copy size={19} />}
                    {copiado ? 'Link copiado!' : 'Copiar link'}
                  </button>
                </div>
              </div>

              <div className="mt-16 border-t border-[#e9e4d8] pt-8">
                <Link
                  to="/noticias"
                  className="inline-flex items-center gap-2 font-semibold text-[#315b40] transition hover:gap-3"
                >
                  <ArrowLeft size={18} />
                  Voltar para todas as notícias
                </Link>
              </div>
            </div>
          </article>
        )}
      </main>

      <Footer />
    </>
  )
}
