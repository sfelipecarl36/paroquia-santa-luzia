import { useEffect, useRef, useState } from 'react'
import {
  ImagePlus,
  Images,
  Trash2,
  Upload,
  X,
  LoaderCircle,
  Image as ImageIcon,
} from 'lucide-react'

import AdminSidebar from '../../components/AdminSidebar'
import {
  listarFotosGaleria,
  enviarFotoGaleria,
  excluirFotoGaleria,
  type FotoGaleria,
} from '../../services/galeriaService'

export default function GaleriaAdmin() {
  const [fotos, setFotos] = useState<FotoGaleria[]>([])
  const [carregando, setCarregando] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [excluindo, setExcluindo] = useState<string | null>(null)
  const [legenda, setLegenda] = useState('')
  const [arquivo, setArquivo] = useState<File | null>(null)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  async function carregarFotos() {
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

  useEffect(() => {
    carregarFotos()
  }, [])

  function selecionarArquivo(event: React.ChangeEvent<HTMLInputElement>) {
    const selecionado = event.target.files?.[0]

    if (!selecionado) return

    setMensagem('')
    setErro('')

    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp']

    if (!tiposPermitidos.includes(selecionado.type)) {
      setErro('Selecione uma imagem JPG, PNG ou WEBP.')
      event.target.value = ''
      return
    }

    if (selecionado.size > 5 * 1024 * 1024) {
      setErro('A imagem deve ter no máximo 5 MB.')
      event.target.value = ''
      return
    }

    setArquivo(selecionado)
  }

  async function cadastrarFoto(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!arquivo) {
      setErro('Selecione uma fotografia antes de enviar.')
      return
    }

    try {
      setEnviando(true)
      setErro('')
      setMensagem('')

      await enviarFotoGaleria(arquivo, { legenda })

      setArquivo(null)
      setLegenda('')

      if (inputRef.current) {
        inputRef.current.value = ''
      }

      setMensagem('Fotografia adicionada à galeria com sucesso!')

      await carregarFotos()
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Não foi possível enviar a fotografia.'
      )
    } finally {
      setEnviando(false)
    }
  }

  async function removerFoto(foto: FotoGaleria) {
    const confirmar = window.confirm(
      'Tem certeza de que deseja excluir esta fotografia da galeria?'
    )

    if (!confirmar) return

    try {
      setExcluindo(foto.id)
      setErro('')
      setMensagem('')

      await excluirFotoGaleria(foto.id)

      setFotos((atuais) => atuais.filter((item) => item.id !== foto.id))
      setMensagem('Fotografia excluída com sucesso!')
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Não foi possível excluir a fotografia.'
      )
    } finally {
      setExcluindo(null)
    }
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-8">
          <header>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-800">
                <Images size={25} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Galeria de fotos
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Gerencie as fotografias da comunidade paroquial.
                </p>
              </div>
            </div>
          </header>

          {mensagem && (
            <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              <span>{mensagem}</span>
              <button
                type="button"
                onClick={() => setMensagem('')}
                aria-label="Fechar mensagem"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {erro && (
            <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <span>{erro}</span>
              <button
                type="button"
                onClick={() => setErro('')}
                aria-label="Fechar erro"
              >
                <X size={18} />
              </button>
            </div>
          )}

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-7">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Adicionar fotografia
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Envie uma imagem para ela aparecer na galeria pública do site.
              </p>
            </div>

            <form onSubmit={cadastrarFoto} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Fotografia
                </label>

                <input
                  ref={inputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={selecionarArquivo}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="flex min-h-36 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center transition hover:border-green-700 hover:bg-green-50"
                >
                  {arquivo ? (
                    <>
                      <ImageIcon size={30} className="mb-2 text-green-700" />
                      <span className="font-medium text-gray-800">
                        {arquivo.name}
                      </span>
                      <span className="mt-1 text-xs text-gray-500">
                        {(arquivo.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </>
                  ) : (
                    <>
                      <ImagePlus
                        size={32}
                        className="mb-3 text-gray-400"
                      />
                      <span className="font-medium text-gray-700">
                        Clique para selecionar uma fotografia
                      </span>
                      <span className="mt-1 text-xs text-gray-500">
                        JPG, PNG ou WEBP — máximo de 5 MB
                      </span>
                    </>
                  )}
                </button>

                {arquivo && (
                  <button
                    type="button"
                    onClick={() => {
                      setArquivo(null)
                      if (inputRef.current) inputRef.current.value = ''
                    }}
                    className="mt-2 text-sm text-red-600 hover:underline"
                  >
                    Remover arquivo selecionado
                  </button>
                )}
              </div>

              <div>
                <label
                  htmlFor="legenda"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Legenda (opcional)
                </label>

                <input
                  id="legenda"
                  type="text"
                  value={legenda}
                  onChange={(event) => setLegenda(event.target.value)}
                  maxLength={180}
                  placeholder="Ex.: Celebração de Santa Luzia"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <button
                type="submit"
                disabled={!arquivo || enviando}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173d2b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#315b40] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {enviando ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    Enviando fotografia...
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    Adicionar à galeria
                  </>
                )}
              </button>
            </form>
          </section>

          <section className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Fotografias cadastradas
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {fotos.length}{' '}
                  {fotos.length === 1 ? 'fotografia cadastrada' : 'fotografias cadastradas'}
                </p>
              </div>

              <button
                type="button"
                onClick={carregarFotos}
                disabled={carregando}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Atualizar
              </button>
            </div>

            {carregando ? (
              <div className="flex min-h-48 items-center justify-center gap-3 text-gray-500">
                <LoaderCircle size={22} className="animate-spin" />
                Carregando fotografias...
              </div>
            ) : fotos.length === 0 ? (
              <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-4 text-center">
                <Images size={42} className="mb-3 text-gray-300" />
                <h3 className="font-semibold text-gray-700">
                  Sua galeria está vazia
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  As fotografias que você enviar aparecerão aqui.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {fotos.map((foto) => (
                  <article
                    key={foto.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                      <img
                        src={foto.imagem_url}
                        alt={foto.legenda || 'Fotografia da galeria paroquial'}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-3 p-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-800">
                          {foto.legenda || 'Sem legenda'}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {new Date(foto.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removerFoto(foto)}
                        disabled={excluindo === foto.id}
                        title="Excluir fotografia"
                        aria-label="Excluir fotografia"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        {excluindo === foto.id ? (
                          <LoaderCircle size={19} className="animate-spin" />
                        ) : (
                          <Trash2 size={19} />
                        )}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
