import { supabase } from './supabase'

export interface Noticia {
  id: string
  titulo: string
  slug: string
  resumo: string | null
  conteudo: string
  imagem_capa: string | null
  categoria: string
  status: 'rascunho' | 'publicada'
  destaque: boolean
  autor_id: string | null
  publicada_em: string | null
  created_at: string
  updated_at: string
}

export interface NoticiaInput {
  titulo: string
  slug: string
  resumo: string
  conteudo: string
  imagem_capa: string | null
  categoria: string
  status: 'rascunho' | 'publicada'
  destaque: boolean
}

export function gerarSlug(titulo: string) {
  return titulo
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function listarNoticias() {
  const { data, error } = await supabase
    .from('noticias')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error

  return data as Noticia[]
}

export async function buscarNoticia(id: string) {
  const { data, error } = await supabase
    .from('noticias')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error

  return data as Noticia
}


export async function buscarNoticiaPorSlug(slug: string) {
  const { data, error } = await supabase
    .from('noticias')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'publicada')
    .single()

  if (error) throw error

  return data as Noticia
}


export async function salvarNoticia(
  noticia: NoticiaInput,
  id?: string
) {
  const { data: { user }, error: userError } =
    await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error('Sua sessão expirou. Entre novamente.')
  }

  const payload = {
    ...noticia,
    autor_id: user.id,
    publicada_em:
      noticia.status === 'publicada'
        ? new Date().toISOString()
        : null,
  }

  if (id) {
    const { data, error } = await supabase
      .from('noticias')
      .update(payload)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return data
  }

  const { data, error } = await supabase
    .from('noticias')
    .insert(payload)
    .select()
    .single()

  if (error) throw error

  return data
}

export async function excluirNoticia(id: string) {
  const { error } = await supabase
    .from('noticias')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function enviarImagemNoticia(file: File) {
  const tiposPermitidos = [
    'image/jpeg',
    'image/png',
    'image/webp',
  ]

  if (!tiposPermitidos.includes(file.type)) {
    throw new Error('Utilize uma imagem JPG, PNG ou WEBP.')
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error('A imagem deve ter no máximo 5 MB.')
  }

  const extensao = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const nomeArquivo = `${crypto.randomUUID()}.${extensao}`
  const caminho = `capas/${nomeArquivo}`

  const { error } = await supabase.storage
    .from('noticias')
    .upload(caminho, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    })

  if (error) throw error

  const { data } = supabase.storage
    .from('noticias')
    .getPublicUrl(caminho)

  return data.publicUrl
}