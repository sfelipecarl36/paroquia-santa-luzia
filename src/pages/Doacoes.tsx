import { useEffect, useState } from 'react'
import {
  Heart,
  Copy,
  Check,
  HandHeart,
  Church,
  Loader2,
  QrCode,
  Gift,
} from 'lucide-react'
import * as QRCode from 'qrcode'

import Header from '../components/Header'
import Footer from '../components/Footer'

import {
  buscarConfiguracaoDoacoes,
  type ConfiguracaoDoacoes,
} from '../services/doacoesService'

function campoPix(id: string, valor: string) {
  return `${id}${String(valor.length).padStart(2, '0')}${valor}`
}

function calcularCRC16(texto: string) {
  let crc = 0xffff

  for (let i = 0; i < texto.length; i++) {
    crc ^= texto.charCodeAt(i) << 8

    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021
      } else {
        crc <<= 1
      }

      crc &= 0xffff
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, '0')
}

function gerarCodigoPix(
  chave: string,
  beneficiario: string
) {
  const nomeBeneficiario = beneficiario
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, '')
    .trim()
    .slice(0, 25)

  const cidade = 'BELEM'

  const identificacaoPix =
    campoPix('00', 'BR.GOV.BCB.PIX') +
    campoPix('01', chave.trim())

  const dadosAdicionais = campoPix('05', '***')

  const payload =
    campoPix('00', '01') +
    campoPix('26', identificacaoPix) +
    campoPix('52', '0000') +
    campoPix('53', '986') +
    campoPix('58', 'BR') +
    campoPix('59', nomeBeneficiario) +
    campoPix('60', cidade) +
    campoPix('62', dadosAdicionais)

  const payloadComCRC = `${payload}6304`
  const crc = calcularCRC16(payloadComCRC)

  return `${payloadComCRC}${crc}`
}

export default function Doacoes() {
  const [configuracao, setConfiguracao] =
    useState<ConfiguracaoDoacoes | null>(null)

  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const [copiadoCodigo, setCopiadoCodigo] = useState(false)
  const [qrCode, setQrCode] = useState('')
  const [erroQr, setErroQr] = useState(false)

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await buscarConfiguracaoDoacoes()
        setConfiguracao(dados)
      } catch (error) {
        console.error('Erro ao carregar página de doações:', error)
        setErro(true)
      } finally {
        setCarregando(false)
      }
    }

    void carregar()
  }, [])

  const pixDisponivel = Boolean(
    configuracao?.pix_ativo &&
    configuracao.chave_pix?.trim() &&
    configuracao.beneficiario_pix?.trim()
  )

  useEffect(() => {
    let cancelado = false

    async function gerarQR() {
      setQrCode('')
      setErroQr(false)

      if (
        !pixDisponivel ||
        !configuracao?.chave_pix ||
        !configuracao.beneficiario_pix
      ) {
        return
      }

      try {
        const codigo = gerarCodigoPix(
          configuracao.chave_pix,
          configuracao.beneficiario_pix
        )

        const imagem = await QRCode.toDataURL(codigo, {
          errorCorrectionLevel: 'M',
          margin: 2,
          width: 300,
          color: {
            dark: '#173d2b',
            light: '#FFFFFF',
          },
        })

        if (!cancelado) {
          setQrCode(imagem)
        }
      } catch (error) {
        console.error('Erro ao gerar QR Code Pix:', error)

        if (!cancelado) {
          setErroQr(true)
        }
      }
    }

    void gerarQR()

    return () => {
      cancelado = true
    }
  }, [
    pixDisponivel,
    configuracao?.chave_pix,
    configuracao?.beneficiario_pix,
  ])

  async function copiarChavePix() {
    if (!configuracao?.chave_pix) return

    try {
      await navigator.clipboard.writeText(configuracao.chave_pix)
      setCopiado(true)

      setTimeout(() => {
        setCopiado(false)
      }, 2500)
    } catch (error) {
      console.error('Não foi possível copiar a chave PIX:', error)
    }
  }

  async function copiarCodigoPix() {
    if (
      !configuracao?.chave_pix ||
      !configuracao?.beneficiario_pix
    ) {
      return
    }

    try {
      const codigo = gerarCodigoPix(
        configuracao.chave_pix,
        configuracao.beneficiario_pix
      )

      await navigator.clipboard.writeText(codigo)
      setCopiadoCodigo(true)

      setTimeout(() => {
        setCopiadoCodigo(false)
      }, 2500)
    } catch (error) {
      console.error('Não foi possível copiar o código Pix:', error)
    }
  }

  const titulo = configuracao?.titulo?.trim() || 'Dízimo e Doações'

  const textoApresentacao =
    configuracao?.texto_apresentacao?.trim() ||
    'Sua generosidade fortalece nossa comunidade e ajuda a manter viva a missão evangelizadora da Paróquia Santa Luzia do Bom Futuro.'

  const textoDizimo =
    configuracao?.texto_dizimo?.trim() ||
    'O dízimo é uma expressão de gratidão a Deus e de compromisso com a comunidade. Cada contribuição ajuda nossa paróquia a continuar sua missão.'

  return (
    <>
      <Header />

      <main className="bg-[#fffdf8]">
        <section className="relative overflow-hidden bg-[#173d2b] px-6 py-24 text-center text-white md:py-32">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/10" />

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#d9c58a]/40 bg-white/5 text-[#d9c58a]">
              <Heart size={30} />
            </div>

            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.3em] text-[#d9c58a]">
              Generosidade e fé
            </span>

            <h1 className="mb-6 text-4xl font-semibold leading-tight md:text-6xl">
              {titulo}
            </h1>

            <p className="mx-auto max-w-2xl whitespace-pre-line text-base leading-relaxed text-white/80 md:text-lg">
              {textoApresentacao}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.25em] text-[#9b7842]">
                Um gesto de amor
              </span>

              <h2 className="mb-6 text-3xl font-semibold leading-tight text-[#173d2b] md:text-4xl">
                Partilhar também é uma forma de evangelizar.
              </h2>

              <p className="whitespace-pre-line leading-relaxed text-gray-600">
                {textoDizimo}
              </p>
            </div>

            <div className="relative">
              <div className="rounded-3xl bg-[#173d2b] p-8 text-white shadow-xl md:p-10">
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d9c58a]/15 text-[#d9c58a]">
                  <HandHeart size={30} />
                </div>

                <h3 className="mb-4 text-2xl font-semibold">
                  Uma comunidade que se constrói com amor.
                </h3>

                <p className="leading-relaxed text-white/75">
                  Sua participação contribui para a manutenção da igreja,
                  das atividades pastorais, das ações evangelizadoras
                  e dos trabalhos de caridade.
                </p>

                <div className="mt-8 h-px bg-white/15" />

                <div className="mt-6 flex items-center gap-3 text-sm text-[#d9c58a]">
                  <Church size={19} />
                  <span>Paróquia Santa Luzia do Bom Futuro</span>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-5 -z-10 h-full w-full rounded-3xl border border-[#d9c58a]/50" />
            </div>
          </div>
        </section>

        <section className="border-y border-[#e9e2d2] bg-white px-6 py-16 md:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#d9c58a]/20 text-[#9b7842]">
              <Gift size={27} />
            </div>

            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.25em] text-[#9b7842]">
              Sua contribuição faz a diferença
            </span>

            <h2 className="mb-5 text-3xl font-semibold text-[#173d2b]">
              Obrigado por fazer parte desta missão!
            </h2>

            <p className="mx-auto max-w-2xl leading-relaxed text-gray-600">
              Agradecemos a todos os dizimistas e benfeitores que,
              com fé e generosidade, colaboram para que nossa comunidade
              continue acolhendo, evangelizando e servindo.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <span className="mb-3 block text-xs font-bold uppercase tracking-[0.25em] text-[#9b7842]">
                Contribua com a paróquia
              </span>

              <h2 className="text-3xl font-semibold text-[#173d2b]">
                Faça sua contribuição
              </h2>

              <p className="mt-4 text-gray-600">
                Sua ajuda é muito importante para continuarmos nossa missão.
              </p>
            </div>

            {carregando ? (
              <div className="flex justify-center py-12 text-[#315b40]">
                <Loader2 size={30} className="animate-spin" />
              </div>
            ) : erro ? (
              <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center text-red-700">
                Não foi possível carregar as informações de contribuição.
                Tente novamente mais tarde.
              </div>
            ) : pixDisponivel ? (
              <div className="rounded-3xl border border-[#e9e2d2] bg-white p-8 shadow-lg md:p-12">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#173d2b]/10 text-[#173d2b]">
                  <QrCode size={32} />
                </div>

                <h3 className="mb-2 text-center text-2xl font-semibold text-[#173d2b]">
                  Contribua pelo PIX
                </h3>

                <p className="mb-8 text-center text-sm text-gray-500">
                  Escaneie o QR Code com o aplicativo do seu banco.
                  Você poderá escolher o valor da sua contribuição.
                </p>

                <div className="mb-8 flex flex-col items-center rounded-2xl border border-[#e9e2d2] bg-[#fffdf8] p-6">
                  {qrCode ? (
                    <div className="rounded-2xl bg-white p-3 shadow-sm">
                      <img
                        src={qrCode}
                        alt="QR Code Pix para contribuição à Paróquia Santa Luzia do Bom Futuro"
                        className="h-64 w-64 object-contain"
                      />
                    </div>
                  ) : erroQr ? (
                    <div className="py-8 text-center text-sm text-red-600">
                      Não foi possível gerar o QR Code.
                      Você ainda pode utilizar a chave Pix abaixo.
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-12 text-[#315b40]">
                      <Loader2 size={30} className="animate-spin" />
                      <span className="text-sm">Gerando QR Code...</span>
                    </div>
                  )}

                  <span className="mt-4 text-center text-sm font-semibold text-[#173d2b]">
                    Pix sem valor definido
                  </span>

                  <span className="mt-1 text-center text-xs text-gray-500">
                    Escolha o valor diretamente no seu banco.
                  </span>
                </div>

                <div className="space-y-4 rounded-2xl bg-[#fffdf8] p-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Beneficiário
                    </span>

                    <p className="mt-1 font-semibold text-[#173d2b]">
                      {configuracao?.beneficiario_pix}
                    </p>
                  </div>

                  {configuracao?.banco_pix && (
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Instituição financeira
                      </span>

                      <p className="mt-1 text-gray-700">
                        {configuracao.banco_pix}
                      </p>
                    </div>
                  )}

                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Tipo de chave
                    </span>

                    <p className="mt-1 text-gray-700">
                      {configuracao?.tipo_chave_pix || 'PIX'}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Chave PIX
                    </span>

                    <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e9e2d2] bg-white p-3">
                      <span className="break-all font-medium text-[#173d2b]">
                        {configuracao?.chave_pix}
                      </span>

                      <button
                        type="button"
                        onClick={copiarChavePix}
                        className="flex shrink-0 items-center gap-2 rounded-lg bg-[#173d2b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#315b40]"
                      >
                        {copiado ? <Check size={17} /> : <Copy size={17} />}
                        {copiado ? 'Copiado!' : 'Copiar chave'}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={copiarCodigoPix}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#173d2b] px-5 py-3 font-semibold text-[#173d2b] transition hover:bg-[#173d2b] hover:text-white"
                >
                  {copiadoCodigo ? <Check size={19} /> : <Copy size={19} />}
                  {copiadoCodigo ? 'Pix Copia e Cola copiado!' : 'Copiar Pix Copia e Cola'}
                </button>

                <p className="mt-6 text-center text-sm leading-relaxed text-gray-500">
                  Antes de confirmar a transferência, confira os dados
                  do beneficiário no aplicativo do seu banco.
                </p>
              </div>
            ) : (
              <div className="rounded-3xl border border-[#e9e2d2] bg-white px-6 py-12 text-center shadow-sm">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#d9c58a]/20 text-[#9b7842]">
                  <Heart size={30} />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-[#173d2b]">
                  Em breve, novas formas de contribuição
                </h3>

                <p className="mx-auto max-w-lg leading-relaxed text-gray-600">
                  Estamos preparando este espaço para disponibilizar
                  informações seguras e práticas para sua contribuição.
                  Agradecemos sua generosidade e compreensão.
                </p>
              </div>
            )}

            {configuracao?.outras_informacoes?.trim() && (
              <div className="mt-8 rounded-2xl border border-[#e9e2d2] bg-white p-6">
                <h3 className="mb-3 font-semibold text-[#173d2b]">
                  Informações adicionais
                </h3>

                <p className="whitespace-pre-line leading-relaxed text-gray-600">
                  {configuracao.outras_informacoes}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
