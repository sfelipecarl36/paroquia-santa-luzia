import { useEffect, useState } from 'react'
import {
  CalendarDays,
  Clock3,
  Church,
  MapPin,
  Info,
} from 'lucide-react'

import Header from '../components/Header'
import Footer from '../components/Footer'

import {
  listarHorariosMissas,
  type HorarioMissa,
  type DiaSemana,
} from '../services/missasService'

const diasSemana: DiaSemana[] = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export default function Missas() {
  const [horarios, setHorarios] = useState<HorarioMissa[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregarHorarios() {
      try {
        setCarregando(true)
        setErro('')

        const dados = await listarHorariosMissas()
        setHorarios(dados.filter((horario) => horario.ativo))
      } catch (error) {
        console.error('Erro ao carregar horários das missas:', error)
        setErro('Não foi possível carregar os horários. Tente novamente mais tarde.')
      } finally {
        setCarregando(false)
      }
    }

    carregarHorarios()
  }, [])

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#fffdf8]">
        <section className="relative overflow-hidden bg-[#173d2b] px-6 py-20 text-white md:py-28">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full border border-white/10" />

          <div className="relative mx-auto max-w-6xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d9c58a]">
              <Church size={15} />
              Vida litúrgica
            </span>

            <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
              Horários das
              <span className="block text-[#d9c58a]">Santas Missas</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              Confira os dias e horários das celebrações em nossa comunidade.
              Será uma alegria receber você e sua família.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b7842]">
                  Programe sua visita
                </span>

                <h2 className="mt-3 text-3xl font-semibold text-[#173d2b] md:text-4xl">
                  Nossa programação
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
                  Consulte abaixo os horários das celebrações cadastrados pela
                  administração paroquial.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays size={18} className="text-[#9b7842]" />
                Horários das celebrações
              </div>
            </div>

            {carregando ? (
              <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
                <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-[#e8e8df] border-t-[#315b40]" />
                <p className="text-sm text-gray-500">
                  Carregando programação...
                </p>
              </div>
            ) : erro ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center">
                <p className="text-sm text-red-700">{erro}</p>
              </div>
            ) : horarios.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#d9d5c8] bg-white px-6 py-16 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f2f5ef]">
                  <Clock3 size={28} className="text-[#315b40]" />
                </div>

                <h3 className="text-xl font-semibold text-[#173d2b]">
                  Programação em atualização
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-500">
                  Os horários das celebrações serão divulgados em breve.
                  Acompanhe nossos canais oficiais para novidades.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {diasSemana.map((dia) => {
                  const horariosDoDia = horarios.filter(
                    (horario) => horario.dia_semana === dia
                  )

                  if (horariosDoDia.length === 0) return null

                  return (
                    <article
                      key={dia}
                      className="overflow-hidden rounded-2xl border border-[#e9e6dc] bg-white shadow-sm"
                    >
                      <div className="flex items-center gap-3 bg-[#f2f5ef] px-6 py-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#173d2b] text-[#d9c58a]">
                          <CalendarDays size={19} />
                        </div>

                        <h3 className="text-lg font-semibold text-[#173d2b]">
                          {dia}
                        </h3>
                      </div>

                      <div className="divide-y divide-gray-100 px-6">
                        {horariosDoDia.map((horario) => (
                          <div key={horario.id} className="py-5">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  {horario.celebracao}
                                </h4>

                                <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                                  <MapPin size={14} />
                                  {horario.local}
                                </p>
                              </div>

                              <div className="flex items-center gap-2 rounded-lg bg-[#f2f5ef] px-3 py-2 font-semibold text-[#173d2b]">
                                <Clock3 size={17} />
                                {horario.horario.slice(0, 5)}
                              </div>
                            </div>

                            {horario.observacoes && (
                              <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-gray-500">
                                <Info
                                  size={15}
                                  className="mt-0.5 shrink-0 text-[#9b7842]"
                                />
                                {horario.observacoes}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </article>
                  )
                })}
              </div>
            )}

            <div className="mt-10 rounded-2xl border border-[#e9e1cd] bg-[#f8f5ec] p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#173d2b] text-[#d9c58a]">
                  <Church size={21} />
                </div>

                <div>
                  <h3 className="font-semibold text-[#173d2b]">
                    Venha celebrar conosco
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    Participe das celebrações e fortaleça sua caminhada de fé
                    junto à nossa comunidade paroquial. Em caso de alterações
                    excepcionais na programação, acompanhe os comunicados
                    oficiais da paróquia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
