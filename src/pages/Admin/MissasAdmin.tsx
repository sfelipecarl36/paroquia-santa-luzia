import AdminSidebar from '../../components/AdminSidebar'

import { useEffect, useState } from 'react'
import {
  CalendarDays,
  Clock3,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  MapPin,
  Church,
  Eye,
  EyeOff,
} from 'lucide-react'

import {
  listarHorariosMissas,
  salvarHorarioMissa,
  alterarStatusHorarioMissa,
  excluirHorarioMissa,
  type HorarioMissa,
  type HorarioMissaInput,
  type DiaSemana,
} from '../../services/missasService'

const diasSemana: DiaSemana[] = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

const formularioInicial: HorarioMissaInput = {
  dia_semana: 'Domingo',
  horario: '08:00',
  celebracao: 'Santa Missa',
  local: 'Igreja Matriz',
  observacoes: '',
  ativo: true,
  ordem: 0,
}

export default function MissasAdmin() {
  const [horarios, setHorarios] = useState<HorarioMissa[]>([])
  const [formulario, setFormulario] =
    useState<HorarioMissaInput>(formularioInicial)
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  async function carregarHorarios() {
    try {
      setCarregando(true)
      const dados = await listarHorariosMissas()
      setHorarios(dados)
    } catch (error) {
      console.error(error)
      setErro('Não foi possível carregar os horários das missas.')
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarHorarios()
  }, [])

  function abrirNovoHorario() {
    setFormulario(formularioInicial)
    setEditandoId(null)
    setMensagem('')
    setErro('')
    setMostrarFormulario(true)
  }

  function abrirEdicao(horario: HorarioMissa) {
    setFormulario({
      dia_semana: horario.dia_semana,
      horario: horario.horario.slice(0, 5),
      celebracao: horario.celebracao,
      local: horario.local,
      observacoes: horario.observacoes || '',
      ativo: horario.ativo,
      ordem: horario.ordem,
    })

    setEditandoId(horario.id)
    setMensagem('')
    setErro('')
    setMostrarFormulario(true)
  }

  function fecharFormulario() {
    setMostrarFormulario(false)
    setEditandoId(null)
    setFormulario(formularioInicial)
  }

  function atualizarCampo(
    campo: keyof HorarioMissaInput,
    valor: string | boolean | number
  ) {
    setFormulario((atual) => ({
      ...atual,
      [campo]: valor,
    }))
  }

  async function handleSalvar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErro('')
    setMensagem('')

    if (!formulario.celebracao.trim() || !formulario.local.trim()) {
      setErro('Preencha o nome da celebração e o local.')
      return
    }

    try {
      setSalvando(true)

      await salvarHorarioMissa(
        formulario,
        editandoId || undefined
      )

      await carregarHorarios()
      fecharFormulario()
      setMensagem(
        editandoId
          ? 'Horário atualizado com sucesso!'
          : 'Horário cadastrado com sucesso!'
      )
    } catch (error) {
      console.error(error)
      setErro('Não foi possível salvar o horário. Tente novamente.')
    } finally {
      setSalvando(false)
    }
  }

  async function handleAlterarStatus(horario: HorarioMissa) {
    try {
      await alterarStatusHorarioMissa(horario.id, !horario.ativo)
      await carregarHorarios()
      setMensagem(
        horario.ativo
          ? 'Horário desativado com sucesso.'
          : 'Horário ativado com sucesso.'
      )
      setErro('')
    } catch (error) {
      console.error(error)
      setErro('Não foi possível alterar o status do horário.')
    }
  }

  async function handleExcluir(horario: HorarioMissa) {
    const confirmar = window.confirm(
      `Deseja realmente excluir o horário de ${horario.celebracao} de ${horario.dia_semana} às ${horario.horario.slice(0, 5)}?`
    )

    if (!confirmar) return

    try {
      await excluirHorarioMissa(horario.id)
      await carregarHorarios()
      setMensagem('Horário excluído com sucesso.')
      setErro('')
    } catch (error) {
      console.error(error)
      setErro('Não foi possível excluir o horário.')
    }
  }

  const horariosAtivos = horarios.filter((horario) => horario.ativo).length

  return (
  <div className="admin-layout">
    <AdminSidebar />

    <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="text-sm text-gray-500">
              Administração / Conteúdo
            </span>
            <h1 className="text-2xl font-bold text-gray-900">
              Horários das Missas
            </h1>
          </div>

          <button
            onClick={abrirNovoHorario}
            className="inline-flex items-center gap-2 rounded-lg bg-[#173d2b] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#315b40]"
          >
            <Plus size={18} />
            Novo horário
          </button>
        </header>

        <div className="admin-content-card">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Programação das celebrações
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Gerencie os dias, horários e locais das missas.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3">
              <CalendarDays size={19} className="text-green-700" />
              <span className="text-sm font-semibold text-green-800">
                {horariosAtivos} {horariosAtivos === 1 ? 'horário ativo' : 'horários ativos'}
              </span>
            </div>
          </div>

          {mensagem && (
            <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              {mensagem}
            </div>
          )}

          {erro && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {erro}
            </div>
          )}

          {carregando ? (
            <div className="py-16 text-center text-sm text-gray-500">
              Carregando horários...
            </div>
          ) : horarios.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                <Church size={26} className="text-[#315b40]" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                Nenhum horário cadastrado
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                Comece cadastrando os dias e horários das celebrações da paróquia.
              </p>

              <button
                onClick={abrirNovoHorario}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#173d2b] px-5 py-3 text-sm font-semibold text-white hover:bg-[#315b40]"
              >
                <Plus size={18} />
                Cadastrar primeiro horário
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {diasSemana.map((dia) => {
                const horariosDoDia = horarios.filter(
                  (horario) => horario.dia_semana === dia
                )

                if (horariosDoDia.length === 0) return null

                return (
                  <section key={dia}>
                    <h3 className="mb-3 border-b border-gray-100 pb-2 text-sm font-bold uppercase tracking-wide text-[#315b40]">
                      {dia}
                    </h3>

                    <div className="space-y-3">
                      {horariosDoDia.map((horario) => (
                        <div
                          key={horario.id}
                          className="flex flex-col justify-between gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f2f5ef]">
                              <Clock3 size={22} className="text-[#315b40]" />
                            </div>

                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="font-semibold text-gray-900">
                                  {horario.celebracao}
                                </h4>

                                <span
                                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                    horario.ativo
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {horario.ativo ? 'Ativo' : 'Inativo'}
                                </span>
                              </div>

                              <p className="mt-1 text-sm font-medium text-gray-700">
                                {horario.horario.slice(0, 5)}
                              </p>

                              <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                                <MapPin size={14} />
                                {horario.local}
                              </p>

                              {horario.observacoes && (
                                <p className="mt-2 text-sm text-gray-500">
                                  {horario.observacoes}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => handleAlterarStatus(horario)}
                              title={horario.ativo ? 'Desativar' : 'Ativar'}
                              className="rounded-lg border border-gray-200 p-2.5 text-gray-600 transition hover:bg-gray-50"
                            >
                              {horario.ativo ? (
                                <EyeOff size={17} />
                              ) : (
                                <Eye size={17} />
                              )}
                            </button>

                            <button
                              onClick={() => abrirEdicao(horario)}
                              title="Editar"
                              className="rounded-lg border border-gray-200 p-2.5 text-gray-600 transition hover:bg-gray-50"
                            >
                              <Pencil size={17} />
                            </button>

                            <button
                              onClick={() => handleExcluir(horario)}
                              title="Excluir"
                              className="rounded-lg border border-red-200 p-2.5 text-red-600 transition hover:bg-red-50"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )
              })}
            </div>
          )}
        </div>
      </main>

      {mostrarFormulario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {editandoId ? 'Editar horário' : 'Novo horário'}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Informe os dados da celebração.
                </p>
              </div>

              <button
                onClick={fecharFormulario}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Fechar formulário"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSalvar} className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Dia da semana
                </label>
                <select
                  value={formulario.dia_semana}
                  onChange={(event) =>
                    atualizarCampo('dia_semana', event.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#315b40] focus:ring-2 focus:ring-[#315b40]/10"
                  required
                >
                  {diasSemana.map((dia) => (
                    <option key={dia} value={dia}>
                      {dia}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Horário
                  </label>
                  <input
                    type="time"
                    value={formulario.horario}
                    onChange={(event) =>
                      atualizarCampo('horario', event.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#315b40] focus:ring-2 focus:ring-[#315b40]/10"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Tipo de celebração
                  </label>
                  <input
                    type="text"
                    value={formulario.celebracao}
                    onChange={(event) =>
                      atualizarCampo('celebracao', event.target.value)
                    }
                    placeholder="Ex.: Santa Missa"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#315b40] focus:ring-2 focus:ring-[#315b40]/10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Local
                </label>
                <input
                  type="text"
                  value={formulario.local}
                  onChange={(event) =>
                    atualizarCampo('local', event.target.value)
                  }
                  placeholder="Ex.: Igreja Matriz"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#315b40] focus:ring-2 focus:ring-[#315b40]/10"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Observações (opcional)
                </label>
                <textarea
                  value={formulario.observacoes || ''}
                  onChange={(event) =>
                    atualizarCampo('observacoes', event.target.value)
                  }
                  rows={3}
                  placeholder="Informações adicionais sobre a celebração..."
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#315b40] focus:ring-2 focus:ring-[#315b40]/10"
                />
              </div>

              <label className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                <input
                  type="checkbox"
                  checked={Boolean(formulario.ativo)}
                  onChange={(event) =>
                    atualizarCampo('ativo', event.target.checked)
                  }
                  className="h-4 w-4 accent-[#315b40]"
                />
                <span className="text-sm font-medium text-gray-700">
                  Horário ativo e visível no site público
                </span>
              </label>

              <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-5 sm:flex-row">
                <button
                  type="button"
                  onClick={fecharFormulario}
                  className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={salvando}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#173d2b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#315b40] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Check size={18} />
                  {salvando ? 'Salvando...' : 'Salvar horário'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
