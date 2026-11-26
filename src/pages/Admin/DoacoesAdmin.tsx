import { useEffect, useState } from 'react'
import {
  Save,
  Heart,
  QrCode,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react'

import AdminSidebar from '../../components/AdminSidebar'
import {
  buscarConfiguracaoDoacoes,
  salvarConfiguracaoDoacoes,
  type ConfiguracaoDoacoesInput,
} from '../../services/doacoesService'

const configuracaoInicial: ConfiguracaoDoacoesInput = {
  titulo: 'Dízimo e Doações',
  texto_apresentacao:
    'Sua contribuição ajuda a manter nossa comunidade e fortalecer a missão evangelizadora da paróquia.',
  texto_dizimo:
    'O dízimo é uma expressão de fé, gratidão e compromisso com a comunidade. Cada contribuição ajuda a manter as atividades pastorais, evangelizadoras e sociais da nossa paróquia.',
  chave_pix: '',
  tipo_chave_pix: null,
  beneficiario_pix: '',
  banco_pix: '',
  pix_ativo: false,
  outras_informacoes: '',
}

export default function DoacoesAdmin() {
  const [dados, setDados] =
    useState<ConfiguracaoDoacoesInput>(configuracaoInicial)

  const [id, setId] = useState<string | undefined>()
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregarConfiguracoes() {
      try {
        setCarregando(true)

        const configuracao = await buscarConfiguracaoDoacoes()

        if (configuracao) {
          setId(configuracao.id)

          setDados({
            titulo: configuracao.titulo,
            texto_apresentacao: configuracao.texto_apresentacao,
            texto_dizimo: configuracao.texto_dizimo,
            chave_pix: configuracao.chave_pix || '',
            tipo_chave_pix: configuracao.tipo_chave_pix,
            beneficiario_pix: configuracao.beneficiario_pix || '',
            banco_pix: configuracao.banco_pix || '',
            pix_ativo: configuracao.pix_ativo,
            outras_informacoes: configuracao.outras_informacoes || '',
          })
        }
      } catch (error) {
        console.error(error)
        setErro('Não foi possível carregar as configurações.')
      } finally {
        setCarregando(false)
      }
    }

    carregarConfiguracoes()
  }, [])

  function atualizarCampo(
    campo: keyof ConfiguracaoDoacoesInput,
    valor: string | boolean | null
  ) {
    setDados((anterior) => ({
      ...anterior,
      [campo]: valor,
    }))

    setMensagem('')
    setErro('')
  }

  async function handleSalvar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setMensagem('')
    setErro('')

    if (dados.pix_ativo && !dados.chave_pix?.trim()) {
      setErro('Cadastre uma chave PIX antes de ativar sua exibição.')
      return
    }

    if (dados.pix_ativo && !dados.beneficiario_pix?.trim()) {
      setErro('Informe o nome do beneficiário antes de ativar o PIX.')
      return
    }

    try {
      setSalvando(true)

      const resultado = await salvarConfiguracaoDoacoes(dados, id)

      setId(resultado.id)
      setMensagem('Configurações salvas com sucesso!')
    } catch (error) {
      console.error(error)
      setErro('Ocorreu um erro ao salvar. Tente novamente.')
    } finally {
      setSalvando(false)
    }
  }

  const campoClass =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#315b40] focus:ring-2 focus:ring-[#315b40]/10'

  const labelClass = 'mb-2 block text-sm font-semibold text-gray-700'

  if (carregando) {
    return (
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-main flex min-h-screen items-center justify-center">
          <div className="flex items-center gap-3 text-gray-500">
            <Loader2 className="animate-spin" size={22} />
            Carregando configurações...
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <h1>Dízimo e Doações</h1>
            <p>Gerencie as informações de contribuição da paróquia.</p>
          </div>
        </div>

        <div className="admin-content-card">
          <form onSubmit={handleSalvar} className="space-y-8">
            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#173d2b]/10 text-[#173d2b]">
                  <Heart size={22} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-[#173d2b]">
                    Apresentação
                  </h2>
                  <p className="text-sm text-gray-500">
                    Informações exibidas na página pública.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Título da seção</label>
                  <input
                    className={campoClass}
                    value={dados.titulo}
                    onChange={(e) =>
                      atualizarCampo('titulo', e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Texto de apresentação
                  </label>
                  <textarea
                    className={campoClass}
                    rows={4}
                    value={dados.texto_apresentacao}
                    onChange={(e) =>
                      atualizarCampo('texto_apresentacao', e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Texto sobre a importância do dízimo
                  </label>
                  <textarea
                    className={campoClass}
                    rows={5}
                    value={dados.texto_dizimo}
                    onChange={(e) =>
                      atualizarCampo('texto_dizimo', e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Outras informações
                  </label>
                  <textarea
                    className={campoClass}
                    rows={3}
                    value={dados.outras_informacoes || ''}
                    onChange={(e) =>
                      atualizarCampo('outras_informacoes', e.target.value)
                    }
                    placeholder="Informações adicionais sobre contribuições..."
                  />
                </div>
              </div>
            </section>

            <div className="border-t border-gray-100" />

            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d9c58a]/20 text-[#9b7842]">
                  <QrCode size={22} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-[#173d2b]">
                    Dados para contribuição via PIX
                  </h2>
                  <p className="text-sm text-gray-500">
                    Você poderá preencher esses dados quando receber a chave.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Tipo de chave PIX</label>
                  <select
                    className={campoClass}
                    value={dados.tipo_chave_pix || ''}
                    onChange={(e) =>
                      atualizarCampo(
                        'tipo_chave_pix',
                        e.target.value
                          ? (e.target.value as ConfiguracaoDoacoesInput['tipo_chave_pix'])
                          : null
                      )
                    }
                  >
                    <option value="">Selecione o tipo de chave</option>
                    <option value="CPF">CPF</option>
                    <option value="CNPJ">CNPJ</option>
                    <option value="E-mail">E-mail</option>
                    <option value="Telefone">Telefone</option>
                    <option value="Aleatória">Chave aleatória</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Chave PIX</label>
                  <input
                    className={campoClass}
                    value={dados.chave_pix || ''}
                    onChange={(e) =>
                      atualizarCampo('chave_pix', e.target.value)
                    }
                    placeholder="A chave PIX será cadastrada posteriormente"
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Nome do beneficiário
                  </label>
                  <input
                    className={campoClass}
                    value={dados.beneficiario_pix || ''}
                    onChange={(e) =>
                      atualizarCampo('beneficiario_pix', e.target.value)
                    }
                    placeholder="Nome do titular da conta"
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Banco ou instituição financeira
                  </label>
                  <input
                    className={campoClass}
                    value={dados.banco_pix || ''}
                    onChange={(e) =>
                      atualizarCampo('banco_pix', e.target.value)
                    }
                    placeholder="Opcional"
                  />
                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 accent-[#315b40]"
                      checked={dados.pix_ativo}
                      disabled={!dados.chave_pix?.trim()}
                      onChange={(e) =>
                        atualizarCampo('pix_ativo', e.target.checked)
                      }
                    />

                    <span>
                      <span className="block font-semibold text-gray-800">
                        Exibir contribuição via PIX no site
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">
                        Quando ativado, os dados cadastrados serão exibidos
                        na página pública.
                      </span>
                    </span>
                  </label>

                  {!dados.chave_pix?.trim() && (
                    <p className="mt-3 text-xs text-amber-700">
                      Cadastre uma chave PIX para habilitar esta opção.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {mensagem && (
              <div className="flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm text-green-800">
                <CheckCircle size={19} />
                {mensagem}
              </div>
            )}

            {erro && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                <AlertCircle size={19} />
                {erro}
              </div>
            )}

            <div className="flex justify-end border-t border-gray-100 pt-6">
              <button
                type="submit"
                disabled={salvando}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#173d2b] px-6 py-3 font-semibold text-white transition hover:bg-[#315b40] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {salvando ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                {salvando ? 'Salvando...' : 'Salvar configurações'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
