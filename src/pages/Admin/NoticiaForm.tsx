import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Heading2,
  ImagePlus,
  Save,
  Send,
  Star,
  X,
  LoaderCircle,
} from 'lucide-react'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import LinkExtension from '@tiptap/extension-link'

import {
  buscarNoticia,
  gerarSlug,
  salvarNoticia,
  enviarImagemNoticia,
} from '../../services/noticiasService'

import AdminSidebar from '../../components/AdminSidebar'

const categorias = [
  'Comunicados',
  'Eventos',
  'Liturgia',
  'Pastorais',
  'Formação',
  'Ação Social',
  'Notícias',
]

export default function NoticiaForm() {
  const { id } = useParams()
  const navigate = useNavigate()

  const editando = Boolean(id)

  const [titulo, setTitulo] = useState('')
  const [slug, setSlug] = useState('')
  const [resumo, setResumo] = useState('')
  const [categoria, setCategoria] = useState('Comunicados')
  const [imagem, setImagem] = useState('')
  const [arquivo, setArquivo] = useState<File | null>(null)
  const [destaque, setDestaque] = useState(false)
  const [status, setStatus] = useState<'rascunho' | 'publicada'>('rascunho')

  const [carregando, setCarregando] = useState(editando)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')

  const [conteudoCarregado, setConteudoCarregado] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'news-editor-content',
      },
    },
  })

  useEffect(() => {
    if (!id) {
      setCarregando(false)
      return
    }

    let cancelado = false

    async function carregar() {
      setCarregando(true)
      setErro('')

      try {
        const noticia = await buscarNoticia(id!)

        if (cancelado) return

        setTitulo(noticia.titulo)
        setSlug(noticia.slug)
        setResumo(noticia.resumo || '')
        setCategoria(noticia.categoria)
        setImagem(noticia.imagem_capa || '')
        setDestaque(noticia.destaque)
        setStatus(noticia.status)
        setConteudoCarregado(noticia.conteudo)
      } catch (error) {
        if (cancelado) return

        console.error('Erro ao carregar notícia:', error)
        setErro('Não foi possível carregar esta notícia.')
      } finally {
        if (!cancelado) {
          setCarregando(false)
        }
      }
    }

    void carregar()

    return () => {
      cancelado = true
    }
  }, [id])

  useEffect(() => {
    if (!editor || !conteudoCarregado) return

    editor.commands.setContent(conteudoCarregado)
  }, [editor, conteudoCarregado])

  function handleTitulo(value: string) {
    setTitulo(value)
    setSlug(gerarSlug(value))
  }

  function selecionarImagem(file?: File) {
    if (!file) return

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setErro('Escolha uma imagem JPG, PNG ou WEBP.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setErro('A imagem deve ter no máximo 5 MB.')
      return
    }

    setErro('')
    setArquivo(file)
    setImagem(URL.createObjectURL(file))
  }

  async function handleSalvar(novoStatus: 'rascunho' | 'publicada') {
    setErro('')
    setSucesso('')

    const conteudo = editor?.getHTML() || ''

    if (!titulo.trim()) {
      setErro('Informe o título da notícia.')
      return
    }

    if (!slug.trim()) {
      setErro('O endereço da notícia não pode ficar vazio.')
      return
    }

    if (!editor || editor.isEmpty) {
      setErro('Escreva o conteúdo da notícia.')
      return
    }

    setSalvando(true)

    try {
      let imagemFinal = imagem

      if (arquivo) {
        imagemFinal = await enviarImagemNoticia(arquivo)
      }

      await salvarNoticia(
        {
          titulo: titulo.trim(),
          slug,
          resumo: resumo.trim(),
          conteudo,
          imagem_capa: imagemFinal || null,
          categoria,
          status: novoStatus,
          destaque,
        },
        id
      )

      setSucesso(
        novoStatus === 'publicada'
          ? 'Notícia publicada com sucesso!'
          : 'Rascunho salvo com sucesso!'
      )

      setTimeout(() => {
        navigate('/admin/noticias')
      }, 900)
    } catch (error) {
      console.error(error)
      setErro(
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao salvar a notícia.'
      )
    } finally {
      setSalvando(false)
    }
  }

  function adicionarLink() {
    const url = window.prompt('Informe o endereço do link:')

    if (!url || !editor) return

    const urlValida = /^https?:\/\//i.test(url)
      ? url
      : `https://${url}`

    editor.chain().focus().extendMarkRange('link').setLink({
      href: urlValida,
    }).run()
  }

  if (carregando) {
    return <div className="admin-loading">Carregando notícia...</div>
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <span>GERENCIAMENTO DE CONTEÚDO</span>
            <h1>{editando ? 'Editar notícia' : 'Nova notícia'}</h1>
          </div>

          <Link to="/admin/noticias" className="admin-view-site">
            <ArrowLeft size={17} />
            Voltar
          </Link>
        </header>

        <form
          className="news-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="news-form-main">
            <section className="admin-content-card">
              <div className="news-form-heading">
                <h2>Informações da publicação</h2>
                <p>Preencha os dados principais da notícia.</p>
              </div>

              <label className="news-label" htmlFor="news-title">
                Título da notícia *
              </label>

              <input
                id="news-title"
                className="news-input news-title-input"
                placeholder="Ex.: Celebração da Festa de Santa Luzia"
                value={titulo}
                onChange={(e) => handleTitulo(e.target.value)}
                maxLength={180}
                required
              />

              <label className="news-label" htmlFor="news-slug">
                Endereço da notícia (slug)
              </label>

              <div className="news-slug-field">
                <span>/noticias/</span>
                <input
                  id="news-slug"
                  value={slug}
                  onChange={(e) => setSlug(gerarSlug(e.target.value))}
                />
              </div>

              <label className="news-label" htmlFor="news-summary">
                Resumo
              </label>

              <textarea
                id="news-summary"
                className="news-input news-summary"
                placeholder="Escreva uma breve apresentação da notícia..."
                value={resumo}
                onChange={(e) => setResumo(e.target.value)}
                maxLength={300}
                rows={3}
              />

              <div className="news-character-count">
                {resumo.length}/300 caracteres
              </div>
            </section>

            <section className="admin-content-card news-editor-card">
              <div className="news-form-heading">
                <h2>Conteúdo da notícia</h2>
                <p>Escreva o texto que será apresentado aos visitantes.</p>
              </div>

              <div className="news-toolbar">
                <button
                  type="button"
                  title="Negrito"
                  className={editor?.isActive('bold') ? 'selected' : ''}
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                  <Bold size={18} />
                </button>

                <button
                  type="button"
                  title="Itálico"
                  className={editor?.isActive('italic') ? 'selected' : ''}
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                  <Italic size={18} />
                </button>

                <button
                  type="button"
                  title="Título"
                  className={editor?.isActive('heading', { level: 2 }) ? 'selected' : ''}
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                  <Heading2 size={18} />
                </button>

                <span />

                <button
                  type="button"
                  title="Lista"
                  className={editor?.isActive('bulletList') ? 'selected' : ''}
                  onClick={() => editor?.chain().focus().toggleBulletList().run()}
                >
                  <List size={18} />
                </button>

                <button
                  type="button"
                  title="Lista numerada"
                  className={editor?.isActive('orderedList') ? 'selected' : ''}
                  onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                >
                  <ListOrdered size={18} />
                </button>

                <button
                  type="button"
                  title="Adicionar link"
                  className={editor?.isActive('link') ? 'selected' : ''}
                  onClick={adicionarLink}
                >
                  <LinkIcon size={18} />
                </button>
              </div>

              <EditorContent editor={editor} />
            </section>
          </div>

          <aside className="news-form-sidebar">
            <section className="admin-content-card">
              <div className="news-form-heading">
                <h2>Publicação</h2>
                <p>Defina as opções da notícia.</p>
              </div>

              <label className="news-label" htmlFor="news-category">
                Categoria
              </label>

              <select
                id="news-category"
                className="news-input"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                {categorias.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <label className="news-featured">
                <input
                  type="checkbox"
                  checked={destaque}
                  onChange={(e) => setDestaque(e.target.checked)}
                />

                <span>
                  <Star size={17} />
                  Destacar na página inicial
                </span>
              </label>

              <div className="news-current-status">
                Status atual:
                <strong className={`admin-status ${status}`}>
                  {status === 'publicada' ? 'Publicada' : 'Rascunho'}
                </strong>
              </div>

              <button
                type="button"
                className="news-save-draft"
                disabled={salvando}
                onClick={() => handleSalvar('rascunho')}
              >
                <Save size={17} />
                Salvar rascunho
              </button>

              <button
                type="button"
                className="login-submit news-publish-button"
                disabled={salvando}
                onClick={() => handleSalvar('publicada')}
              >
                {salvando ? (
                  <LoaderCircle size={17} className="news-spinner" />
                ) : (
                  <Send size={17} />
                )}
                {salvando ? 'Salvando...' : 'Publicar notícia'}
              </button>
            </section>

            <section className="admin-content-card">
              <div className="news-form-heading">
                <h2>Imagem de capa</h2>
                <p>Imagem principal da publicação.</p>
              </div>

              <label className="news-image-upload">
                {imagem ? (
                  <img src={imagem} alt="Prévia da capa" />
                ) : (
                  <div>
                    <ImagePlus size={32} />
                    <strong>Adicionar imagem</strong>
                    <span>JPG, PNG ou WEBP</span>
                    <small>Máximo de 5 MB</small>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => selecionarImagem(e.target.files?.[0])}
                  hidden
                />
              </label>

              {imagem && (
                <button
                  type="button"
                  className="news-remove-image"
                  onClick={() => {
                    setImagem('')
                    setArquivo(null)
                  }}
                >
                  <X size={15} />
                  Remover imagem
                </button>
              )}
            </section>
          </aside>

          {(erro || sucesso) && (
            <div className={`news-feedback ${erro ? 'error' : 'success'}`}>
              {erro || sucesso}
            </div>
          )}
        </form>
      </main>
    </div>
  )
}
