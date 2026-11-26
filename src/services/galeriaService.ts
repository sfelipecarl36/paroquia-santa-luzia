import { supabase } from './supabase'

export interface FotoGaleria {
  id: string
  imagem_url: string
  caminho_arquivo: string
  legenda: string | null
  ordem: number
  created_at: string
}

export interface FotoGaleriaInput {
  legenda?: string
}

const BUCKET = 'galeria'

export async function listarFotosGaleria(): Promise<FotoGaleria[]> {
  const { data, error } = await supabase
    .from('galeria')
    .select('*')
    .order('ordem', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erro ao listar fotos da galeria:', error)
    throw new Error('Não foi possível carregar as fotografias.')
  }

  return data || []
}

export async function enviarFotoGaleria(
  arquivo: File,
  dados: FotoGaleriaInput = {}
): Promise<FotoGaleria> {
  const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp']

  if (!tiposPermitidos.includes(arquivo.type)) {
    throw new Error('Formato inválido. Envie uma imagem JPG, PNG ou WEBP.')
  }

  if (arquivo.size > 5 * 1024 * 1024) {
    throw new Error('A imagem deve ter no máximo 5 MB.')
  }

  const extensao = arquivo.name.split('.').pop()?.toLowerCase() || 'jpg'
  const caminhoArquivo = `fotos/${crypto.randomUUID()}.${extensao}`

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(caminhoArquivo, arquivo, {
      cacheControl: '3600',
      upsert: false,
      contentType: arquivo.type,
    })

  if (uploadError) {
    console.error('Erro ao enviar imagem:', uploadError)
    throw new Error('Não foi possível enviar a fotografia.')
  }

  const { data: urlData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(caminhoArquivo)

  const { data, error: insertError } = await supabase
    .from('galeria')
    .insert({
      imagem_url: urlData.publicUrl,
      caminho_arquivo: caminhoArquivo,
      legenda: dados.legenda?.trim() || null,
    })
    .select()
    .single()

  if (insertError) {
    await supabase.storage.from(BUCKET).remove([caminhoArquivo])

    console.error('Erro ao cadastrar fotografia:', insertError)
    throw new Error('A imagem foi enviada, mas não foi possível cadastrá-la na galeria.')
  }

  return data
}

export async function excluirFotoGaleria(id: string): Promise<void> {
  const { data: foto, error: buscaError } = await supabase
    .from('galeria')
    .select('caminho_arquivo')
    .eq('id', id)
    .single()

  if (buscaError || !foto) {
    throw new Error('Não foi possível localizar a fotografia.')
  }

  const { error: storageError } = await supabase.storage
    .from(BUCKET)
    .remove([foto.caminho_arquivo])

  if (storageError) {
    console.error('Erro ao excluir imagem do Storage:', storageError)
    throw new Error('Não foi possível excluir o arquivo da fotografia.')
  }

  const { error: deleteError } = await supabase
    .from('galeria')
    .delete()
    .eq('id', id)

  if (deleteError) {
    console.error('Erro ao excluir registro da galeria:', deleteError)
    throw new Error('A imagem foi removida do armazenamento, mas não do cadastro.')
  }
}
