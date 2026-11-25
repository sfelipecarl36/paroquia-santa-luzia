import { supabase } from './supabase'

export type DiaSemana =
  | 'Domingo'
  | 'Segunda-feira'
  | 'Terça-feira'
  | 'Quarta-feira'
  | 'Quinta-feira'
  | 'Sexta-feira'
  | 'Sábado'

export interface HorarioMissa {
  id: string
  dia_semana: DiaSemana
  horario: string
  celebracao: string
  local: string
  observacoes: string | null
  ativo: boolean
  ordem: number
  created_at: string
  updated_at: string
}

export interface HorarioMissaInput {
  dia_semana: DiaSemana
  horario: string
  celebracao: string
  local: string
  observacoes?: string | null
  ativo?: boolean
  ordem?: number
}

const ordemDias: DiaSemana[] = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export async function listarHorariosMissas(): Promise<HorarioMissa[]> {
  const { data, error } = await supabase
    .from('horarios_missas')
    .select('*')
    .order('ordem', { ascending: true })
    .order('horario', { ascending: true })

  if (error) {
    throw error
  }

  return (data || []).sort((a, b) => {
    const diaA = ordemDias.indexOf(a.dia_semana as DiaSemana)
    const diaB = ordemDias.indexOf(b.dia_semana as DiaSemana)

    if (diaA !== diaB) {
      return diaA - diaB
    }

    return a.horario.localeCompare(b.horario)
  }) as HorarioMissa[]
}

export async function buscarHorarioMissa(
  id: string
): Promise<HorarioMissa> {
  const { data, error } = await supabase
    .from('horarios_missas')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw error
  }

  return data as HorarioMissa
}

export async function salvarHorarioMissa(
  dados: HorarioMissaInput,
  id?: string
): Promise<HorarioMissa> {
  const dadosFormatados = {
    dia_semana: dados.dia_semana,
    horario: dados.horario,
    celebracao: dados.celebracao.trim(),
    local: dados.local.trim(),
    observacoes: dados.observacoes?.trim() || null,
    ativo: dados.ativo ?? true,
    ordem: dados.ordem ?? 0,
    updated_at: new Date().toISOString(),
  }

  if (id) {
    const { data, error } = await supabase
      .from('horarios_missas')
      .update(dadosFormatados)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data as HorarioMissa
  }

  const { data, error } = await supabase
    .from('horarios_missas')
    .insert(dadosFormatados)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data as HorarioMissa
}

export async function alterarStatusHorarioMissa(
  id: string,
  ativo: boolean
): Promise<void> {
  const { error } = await supabase
    .from('horarios_missas')
    .update({
      ativo,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    throw error
  }
}

export async function excluirHorarioMissa(id: string): Promise<void> {
  const { error } = await supabase
    .from('horarios_missas')
    .delete()
    .eq('id', id)

  if (error) {
    throw error
  }
}
