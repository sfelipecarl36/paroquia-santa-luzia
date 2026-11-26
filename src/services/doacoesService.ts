import { supabase } from './supabase'

export interface ConfiguracaoDoacoes {
  id: string
  titulo: string
  texto_apresentacao: string
  texto_dizimo: string
  chave_pix: string | null
  tipo_chave_pix: 'CPF' | 'CNPJ' | 'E-mail' | 'Telefone' | 'Aleatória' | null
  beneficiario_pix: string | null
  banco_pix: string | null
  pix_ativo: boolean
  outras_informacoes: string | null
  updated_at: string
}

export type ConfiguracaoDoacoesInput = Omit<
  ConfiguracaoDoacoes,
  'id' | 'updated_at'
>

export async function buscarConfiguracaoDoacoes(): Promise<ConfiguracaoDoacoes | null> {
  const { data, error } = await supabase
    .from('configuracoes_doacoes')
    .select('*')
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('Erro ao buscar configurações de doações:', error)
    throw error
  }

  return data
}

export async function salvarConfiguracaoDoacoes(
  dados: ConfiguracaoDoacoesInput,
  id?: string
): Promise<ConfiguracaoDoacoes> {
  const dadosAtualizados = {
    ...dados,
    updated_at: new Date().toISOString(),
  }

  let query

  if (id) {
    query = supabase
      .from('configuracoes_doacoes')
      .update(dadosAtualizados)
      .eq('id', id)
      .select()
      .single()
  } else {
    query = supabase
      .from('configuracoes_doacoes')
      .insert(dadosAtualizados)
      .select()
      .single()
  }

  const { data, error } = await query

  if (error) {
    console.error('Erro ao salvar configurações de doações:', error)
    throw error
  }

  return data
}
