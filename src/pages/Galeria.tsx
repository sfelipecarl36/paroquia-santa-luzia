import { useEffect, useState } from 'react'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Images,
  LoaderCircle,
  Camera,
} from 'lucide-react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  listarFotosGaleria,
  type FotoGaleria,
} from '../services/galeriaService'

export default function Galeria() {
  const [fotos, setFotos] = useState<FotoGaleria[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [fotoSelecionada, setFotoSelecionada] = useState<number | null>(null)

  useEffect(() => {
    async function carregarGaleria() {
      try {
        setCarregando(true)
        setErro('')

        const dados = await listarFotosGaleria()
        setFotos(dados)
      } catch (error) {
        setErro(
          error instanceof Error
            ? error.message
            : 'Não foi possível carregar a galeria.'
        )
      } finally {
        setCarregando(false)
      }
    }

    carregarGaleria()
  }, [])

  function fecharModal() {
    setFotoSelecionada(null)
  }

  function fotoAnterior() {
    if (fotoSelecionada === null || fotos.length === 0) return

    setFotoSelecionada(
      (fotoSelecionada - 1 + fotos.length) % fotos.length
    )
  }

  function proximaFoto() {
    if (fotoSelecionada === null || fotos.length === 0) return

    setFotoSelecionada((fotoSelecionada + 1) % fotos.length)
  }

  useEffect(() => {
    if (fotoSelecionada === null) return

    function pressionarTecla(event: KeyboardEvent) {
      if (event.key === 'Escape') fecharModal()
      if (event.key === 'ArrowLeft') fotoAnterior()
      if (event.key === 'ArrowRight') proximaFoto()
    }

    document.addEventListener('keydown', pressionarTecla)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', pressionarTecla)
      document.body.style.overflow = ''
    }
  }, [fotoSelecionada, fotos.length])

  const fotoAtual =
    fotoSelecionada !== null ? fotos[fotoSelecionada] : null

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#fffdf8]">
        <section className="relative overflow-hidden bg-[#173d2b] px-4 py-20 text-center text-white md:py-28">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full border border-white/10" />

          <div className="relative mx-auto max-w-3xl">
            <div className="mb-5 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <Images size={32} />
              </div>
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d9c58a]">
              Nossa comunidade
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Galeria de Fotos
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/75 md:text-base">
              Momentos de fé, celebração, fraternidade e comunhão
              vividos em nossa comunidade paroquial.
            </p>

            <div className="mx-auto mt-8 h-1 w-16 rounded-full bg-[#d9c58a]" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b7842]">
                Registros da comunidade
              </span>

              <h2 className="mt-2 text-2xl font-bold text-[#173d2b] md:text-3xl">
                Nossos momentos
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Cada fotografia guarda um pouco da nossa caminhada.
              </p>
            </div>

            {!carregando && !erro && fotos.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Camera size={17} />
                {fotos.length} {fotos.length === 1 ? 'fotografia' : 'fotografias'}
              </div>
            )}
          </div>

          {carregando ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-4 text-gray-500">
              <LoaderCircle size={32} className="animate-spin text-[#315b40]" />
              <p className="text-sm">Carregando fotografias...</p>
            </div>
          ) : erro ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
              <p className="text-sm text-red-700">{erro}</p>
            </div>
          ) : fotos.length === 0 ? (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-[#d9d2c3] bg-white px-6 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f2f0e8] text-[#315b40]">
                <Images size={30} />
              </div>

              <h3 className="text-xl font-semibold text-[#173d2b]">
                Em breve, nossa galeria estará disponível
              </h3>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                Estamos preparando os registros dos momentos especiais
                vividos em nossa comunidade. Volte em breve!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {fotos.map((foto, index) => (
                <button
                  key={foto.id}
                  type="button"
                  onClick={() => setFotoSelecionada(index)}
                  className="group overflow-hidden rounded-2xl bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#315b40] focus:ring-offset-4"
                  aria-label={`Ampliar fotografia ${foto.legenda || index + 1}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={foto.imagem_url}
                      alt={foto.legenda || 'Momento da comunidade paroquial'}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-[#173d2b]/0 transition duration-300 group-hover:bg-[#173d2b]/25">
                      <div className="scale-90 rounded-full bg-white/90 p-3 text-[#173d2b] opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                        <Images size={22} />
                      </div>
                    </div>
                  </div>

                  {foto.legenda && (
                    <div className="px-4 py-4">
                      <p className="text-sm font-medium leading-6 text-[#173d2b]">
                        {foto.legenda}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {new Date(foto.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      {fotoAtual && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          onClick={fecharModal}
          role="dialog"
          aria-modal="true"
          aria-label="Visualização da fotografia"
        >
          <button
            type="button"
            onClick={fecharModal}
            className="absolute right-4 top-4 z-20 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
            aria-label="Fechar fotografia"
          >
            <X size={24} />
          </button>

          {fotos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  fotoAnterior()
                }}
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 md:left-6"
                aria-label="Fotografia anterior"
              >
                <ChevronLeft size={28} />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  proximaFoto()
                }}
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 md:right-6"
                aria-label="Próxima fotografia"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          <div
            className="flex max-h-full w-full max-w-5xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={fotoAtual.imagem_url}
              alt={fotoAtual.legenda || 'Fotografia da comunidade paroquial'}
              className="max-h-[78vh] max-w-full rounded-lg object-contain"
            />

            <div className="mt-5 text-center text-white">
              {fotoAtual.legenda && (
                <p className="text-base font-medium">
                  {fotoAtual.legenda}
                </p>
              )}

              <p className="mt-2 text-xs text-white/50">
                {fotoSelecionada! + 1} de {fotos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
