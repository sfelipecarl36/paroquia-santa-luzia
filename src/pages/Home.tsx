import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { listarNoticias, type Noticia } from '../services/noticiasService'
import {
  listarHorariosMissas,
  type HorarioMissa,
  type DiaSemana,
} from '../services/missasService'

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Church,
  Clock3,
  HandHeart,
  MapPin,
} from 'lucide-react'

import Header from '../components/Header'
import Footer from '../components/Footer'

const diasSemana: DiaSemana[] = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

function Home() {
  const [news, setNews] = useState<Noticia[]>([])
  const [loadingNews, setLoadingNews] = useState(true)

  const [horarios, setHorarios] = useState<HorarioMissa[]>([])
  const [loadingMass, setLoadingMass] = useState(true)
  const [errorMass, setErrorMass] = useState(false)

  useEffect(() => {
    async function carregarNoticias() {
      try {
        const noticias = await listarNoticias()

        const publicadas = noticias
          .filter((noticia) => noticia.status === 'publicada')
          .sort((a, b) => {
            const dataA = new Date(a.publicada_em || a.created_at).getTime()
            const dataB = new Date(b.publicada_em || b.created_at).getTime()

            return dataB - dataA
          })
          .slice(0, 3)

        setNews(publicadas)
      } catch (error) {
        console.error('Erro ao carregar notícias:', error)
      } finally {
        setLoadingNews(false)
      }
    }

    void carregarNoticias()
  }, [])

  useEffect(() => {
    async function carregarHorarios() {
      try {
        setErrorMass(false)

        const dados = await listarHorariosMissas()

        setHorarios(dados.filter((horario) => horario.ativo))
      } catch (error) {
        console.error('Erro ao carregar horários das missas:', error)
        setErrorMass(true)
      } finally {
        setLoadingMass(false)
      }
    }

    void carregarHorarios()
  }, [])

  return (
    <>
      <Header />

      <main className="min-h-screen overflow-hidden bg-[#fffdf8]">
        {/* HERO */}
        <section id="inicio" className="hero">
          <div className="hero-media">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="https://images.unsplash.com/photo-1438032005730-c779502df39b?w=2000"
            >
              <source
                src="/videos/hero-paroquia.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          <div className="hero-overlay" />

          <div className="hero-content">
            <span className="hero-eyebrow">
              <span /> UMA COMUNIDADE DE FÉ
            </span>

            <h1>
              Um lugar de fé,
              <br />
              <em>esperança e amor.</em>
            </h1>

            <p>
              Seja bem-vindo à Paróquia Santa Luzia do Bom Futuro.
              Um espaço de encontro com Deus, fraternidade e comunhão.
            </p>

            <div className="hero-actions">
              <Link to="/paroquia" className="button-primary">
                Conheça nossa paróquia
                <ArrowRight size={18} />
              </Link>

              <Link to="/missas" className="button-outline">
                Horários das missas
              </Link>
            </div>
          </div>

          <div className="hero-bottom">
            <span>PARÓQUIA SANTA LUZIA DO BOM FUTURO</span>
            <span>FÉ · COMUNHÃO · SERVIÇO</span>
          </div>
        </section>

        {/* APRESENTAÇÃO */}
        <section className="welcome-section" id="paroquia">
          <div className="welcome-image">
            <img
              src="https://images.unsplash.com/photo-1548625361-987a2e7b4a6b?w=1000"
              alt="Interior de uma igreja"
            />

            <div className="image-caption">
              <Church size={20} />
              <span>Uma família reunida na fé</span>
            </div>
          </div>

          <div className="welcome-content">
            <span className="section-eyebrow">
              SEJA BEM-VINDO
            </span>

            <h2>
              Caminhando juntos,
              <br />
              <em>guiados pela fé.</em>
            </h2>

            <p>
              A Paróquia Santa Luzia do Bom Futuro é uma comunidade
              dedicada à evangelização, à oração e ao serviço ao próximo.
              Aqui, cada pessoa é convidada a viver a fé e fortalecer
              seus laços com Deus e com os irmãos.
            </p>

            <p>
              Nossa missão é acolher, evangelizar e construir uma
              comunidade cada vez mais unida no amor de Cristo.
            </p>

            <Link to="/paroquia" className="text-link">
              Conheça nossa história
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>

        {/* MISSAS */}
        <section className="mass-section" id="missas">
          <div className="section-heading">
            <span className="section-eyebrow">
              PARTICIPE CONOSCO
            </span>

            <h2>
              Momentos de <em>oração e encontro.</em>
            </h2>

            <p>
              Venha celebrar conosco. Será uma alegria receber você
              em nossa comunidade.
            </p>
          </div>

          {loadingMass ? (
            <div className="mass-card">
              <div className="mass-icon">
                <Church size={28} />
              </div>

              <div>
                <span className="card-eyebrow">CELEBRAÇÕES</span>
                <h3>Santa Missa</h3>
                <p>Carregando os horários das celebrações...</p>
              </div>

              <div className="mass-schedule">
                <Clock3 size={19} />
                <span>Carregando...</span>
              </div>
            </div>
          ) : errorMass ? (
            <div className="mass-card">
              <div className="mass-icon">
                <Church size={28} />
              </div>

              <div>
                <span className="card-eyebrow">CELEBRAÇÕES</span>
                <h3>Santa Missa</h3>
                <p>
                  Não foi possível consultar os horários neste momento.
                </p>
              </div>

              <Link
                to="/missas"
                className="round-link"
                aria-label="Consultar horários"
              >
                <ArrowUpRight size={21} />
              </Link>
            </div>
          ) : horarios.length === 0 ? (
            <div className="mass-card">
              <div className="mass-icon">
                <Church size={28} />
              </div>

              <div>
                <span className="card-eyebrow">CELEBRAÇÕES</span>
                <h3>Santa Missa</h3>
                <p>
                  Os horários das celebrações serão divulgados em breve.
                </p>
              </div>

              <div className="mass-schedule">
                <Clock3 size={19} />
                <span>Em atualização</span>
              </div>

              <Link
                to="/missas"
                className="round-link"
                aria-label="Consultar horários"
              >
                <ArrowUpRight size={21} />
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {diasSemana.map((dia) => {
                const horariosDoDia = horarios.filter(
                  (horario) => horario.dia_semana === dia
                )

                if (horariosDoDia.length === 0) return null

                return (
                  <article
                    key={dia}
                    className="overflow-hidden rounded-xl border border-[#e9e6dc] bg-white shadow-sm"
                  >
                    <div className="flex items-center gap-3 bg-[#f2f5ef] px-5 py-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#173d2b] text-[#d9c58a]">
                        <CalendarDays size={19} />
                      </div>

                      <h3 className="font-semibold text-[#173d2b]">
                        {dia}
                      </h3>
                    </div>

                    <div className="divide-y divide-gray-100 px-5">
                      {horariosDoDia.map((horario) => (
                        <div
                          key={horario.id}
                          className="flex flex-wrap items-center justify-between gap-3 py-4"
                        >
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
                      ))}
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          <p className="information-note">
            Os horários apresentados são os cadastrados pela administração
            paroquial. Consulte a página completa para mais informações.
          </p>

          <div className="mt-6 text-center">
            <Link to="/missas" className="text-link">
              Consultar todos os horários
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* NOTÍCIAS */}
        <section className="news-section" id="noticias">
          <div className="section-heading news-heading">
            <div>
              <span className="section-eyebrow">
                FIQUE POR DENTRO
              </span>

              <h2>
                Notícias da <em>comunidade.</em>
              </h2>
            </div>

            <Link to="/noticias" className="text-link">
              Todas as notícias
              <ArrowRight size={18} />
            </Link>
          </div>

          {loadingNews ? (
            <div className="admin-empty">
              Carregando notícias...
            </div>
          ) : news.length === 0 ? (
            <div className="admin-empty">
              <CalendarDays size={38} />
              <strong>Em breve, novidades da nossa comunidade</strong>
              <span>
                Acompanhe por aqui as notícias e os comunicados da paróquia.
              </span>
            </div>
          ) : (
            <div className="news-grid">
              {news.map((item) => (
                <article className="news-card" key={item.id}>
                  <div className="news-image">
                    {item.imagem_capa ? (
                      <img
                        src={item.imagem_capa}
                        alt={item.titulo}
                        loading="lazy"
                      />
                    ) : (
                      <div className="news-image-placeholder">
                        <Church size={38} />
                      </div>
                    )}

                    <span>{item.categoria}</span>
                  </div>

                  <div className="news-body">
                    <span className="news-date">
                      <CalendarDays size={14} />
                      {new Date(
                        item.publicada_em || item.created_at
                      ).toLocaleDateString('pt-BR')}
                    </span>

                    <h3>{item.titulo}</h3>

                    {item.resumo && <p>{item.resumo}</p>}

                    <Link
                      to={`/noticias/${item.slug}`}
                      className="text-link"
                    >
                      Saiba mais
                      <ArrowUpRight size={17} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* DÍZIMO E DOAÇÕES */}
        <section className="donation-section" id="dizimo">
          <div className="donation-content">
            <span className="section-eyebrow light">
              FAÇA PARTE DESTA MISSÃO
            </span>

            <h2>
              Sua contribuição
              <br />
              <em>transforma vidas.</em>
            </h2>

            <p>
              O dízimo é uma expressão de gratidão, fé e compromisso
              com a missão evangelizadora da Igreja. Cada contribuição
              ajuda a manter nossa comunidade e suas atividades.
            </p>

            <Link to="/dizimo" className="button-light">
              Contribua pelo PIX
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="donation-symbol">
            <HandHeart size={110} strokeWidth={0.9} />
            <span>PARTILHAR É UM ATO DE AMOR</span>
          </div>
        </section>

        {/* PASTORAIS */}
        <section className="pastoral-section" id="pastorais">
          <div>
            <span className="section-eyebrow">
              VIDA EM COMUNIDADE
            </span>

            <h2>
              Uma Igreja viva, <em>feita de pessoas.</em>
            </h2>

            <p>
              Nossa comunidade é construída por pessoas que dedicam
              seu tempo, seus dons e sua fé ao serviço de Deus e dos irmãos.
            </p>
          </div>

          <Link to="/pastorais" className="button-dark">
            Conheça nossas pastorais
            <ArrowRight size={18} />
          </Link>
        </section>

        {/* LOCALIZAÇÃO */}
        <section className="location-section" id="contato">
          <div className="location-content">
            <span className="section-eyebrow">
              VENHA NOS VISITAR
            </span>

            <h2>
              As portas estão <em>abertas para você.</em>
            </h2>

            <div className="location-detail">
              <MapPin size={21} />

              <div>
                <strong>Nosso endereço</strong>

                <p>
                  R. Wh-8, 1-99 - 1-99, Parque Verde,
                  Belém - PA, 66633-630
                </p>
              </div>
            </div>

            <div className="location-detail">
              <Church size={21} />

              <div>
                <strong>
                  Paróquia Santa Luzia do Bom Futuro
                </strong>

                <p>Belém – Pará</p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=R.+Wh-8%2C+Parque+Verde%2C+Bel%C3%A9m+-+PA"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Ver localização no mapa
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="map-placeholder">
            <MapPin size={38} />

            <span>PARÓQUIA SANTA LUZIA</span>

            <small>PARQUE VERDE · BELÉM – PA</small>

            <a
              href="https://www.google.com/maps/search/?api=1&query=R.+Wh-8%2C+Parque+Verde%2C+Bel%C3%A9m+-+PA"
              target="_blank"
              rel="noreferrer"
            >
              Abrir no Google Maps
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Home
