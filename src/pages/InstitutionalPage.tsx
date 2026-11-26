import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Church,
  Clock3,
  Heart,
  MapPin,
  BookOpen,
  Users,
  Images,
  Eye,
  HandHeart,
  Cross,
  Sun,
  MessageCircle,
  ExternalLink
} from 'lucide-react'

import {
  siWhatsapp,
  siInstagram,
  siFacebook,
} from 'simple-icons'

import Header from '../components/Header'
import Footer from '../components/Footer'

import SEO from '../components/SEO'

const pages: Record<
  string,
  {
    eyebrow: string
    title: string
    subtitle: string
    description: string
  }
> = {
  paroquia: {
    eyebrow: 'NOSSA IDENTIDADE',
    title: 'Uma comunidade de fé, acolhida e esperança.',
    subtitle: 'Conheça a Paróquia Santa Luzia do Bom Futuro.',
    description:
      'Somos uma comunidade católica que encontra na fé em Jesus Cristo a inspiração para acolher, evangelizar e servir. Nossa paróquia é um espaço de oração, fraternidade e encontro, onde cada pessoa é convidada a caminhar na fé.',
  },
  noticias: {
    eyebrow: 'ACONTECE NA PARÓQUIA',
    title: 'Notícias e comunicados.',
    subtitle: 'Acompanhe a vida da nossa comunidade.',
    description:
      'Aqui você encontrará comunicados, acontecimentos, eventos, celebrações e notícias da Paróquia Santa Luzia do Bom Futuro.',
  },
  missas: {
    eyebrow: 'CELEBRAÇÕES',
    title: 'Encontre-se com Deus.',
    subtitle: 'Participe das celebrações da nossa comunidade.',
    description:
      'A Santa Missa é o centro da vida cristã. Consulte nesta página os horários das celebrações e acompanhe os avisos sobre solenidades e celebrações especiais.',
  },
  dizimo: {
    eyebrow: 'GESTO DE FÉ E GRATIDÃO',
    title: 'Partilhar é um ato de amor.',
    subtitle: 'Seu dízimo fortalece a missão evangelizadora.',
    description:
      'O dízimo é uma expressão de gratidão a Deus e compromisso com a comunidade. Sua contribuição ajuda a manter as atividades pastorais, a evangelização e as necessidades da nossa paróquia.',
  },
  pastorais: {
    eyebrow: 'SERVIR E EVANGELIZAR',
    title: 'Uma Igreja feita de pessoas.',
    subtitle: 'Conheça nossas pastorais e movimentos.',
    description:
      'As pastorais e movimentos são expressões vivas da missão da Igreja. São pessoas que colocam seus dons a serviço de Deus e dos irmãos.',
  },
  galeria: {
    eyebrow: 'NOSSOS MOMENTOS',
    title: 'A fé também se faz memória.',
    subtitle: 'Recordações da caminhada da nossa comunidade.',
    description:
      'Um espaço dedicado aos registros de nossas celebrações, festas, encontros, atividades pastorais e momentos especiais.',
  },
  contato: {
    eyebrow: 'ESTAMOS À SUA DISPOSIÇÃO',
    title: 'Será uma alegria receber você.',
    subtitle: 'Entre em contato ou venha nos visitar.',
    description:
      'A Paróquia Santa Luzia do Bom Futuro está localizada no bairro Parque Verde, em Belém do Pará. Será uma alegria acolher você em nossa comunidade.',
  },
}

function ParoquiaContent() {
  return (
    <div className="bg-[#fffdf8]">
      <section className="relative overflow-hidden px-6 py-20 md:py-28">
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full border border-[#d9c58a]/30" />
        <div className="absolute -right-20 top-12 h-72 w-72 rounded-full border border-[#d9c58a]/20" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="mb-5 block text-xs font-bold uppercase tracking-[0.3em] text-[#9b7842]">
              Nossa comunidade
            </span>

            <h2 className="mb-7 text-4xl font-semibold leading-tight text-[#173d2b] md:text-6xl">
              Um lugar de fé,
              <br />
              <span className="font-serif italic text-[#9b7842]">
                encontro e esperança.
              </span>
            </h2>

            <p className="max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
              A Paróquia Santa Luzia do Bom Futuro é uma comunidade
              católica que busca viver e testemunhar o Evangelho,
              fortalecendo os laços de fé, fraternidade e solidariedade.
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600">
              Aqui, cada pessoa é convidada a se aproximar de Deus,
              participar da vida comunitária e descobrir a alegria
              de caminhar junto com os irmãos.
            </p>

            <Link
              to="/missas"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#173d2b] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#315b40]"
            >
              Participe conosco
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border border-[#d9c58a]/70" />

            <div className="relative flex min-h-[390px] items-center justify-center overflow-hidden rounded-[2rem] bg-[#173d2b] p-10 md:min-h-[470px]">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[1px] border-white" />
                <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border-[1px] border-white" />
                <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full border-[1px] border-white" />
              </div>

              <div className="relative text-center">
                <div className="mx-auto mb-7 flex h-64 w-64 items-center justify-center rounded-full border border-[#d9c58a]/40 bg-white/5 p-7 md:h-72 md:w-72">
                  <img
                    src="/images/brasao-paroquia.png"
                    alt="Brasão da Paróquia Santa Luzia do Bom Futuro"
                    className="h-full w-full object-contain"
                  />
                </div>

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d9c58a]">
                  Paróquia Santa Luzia
                </span>

                <p className="mt-2 text-sm text-white/70">
                  Bom Futuro · Belém - PA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e9e2d2] bg-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.25em] text-[#9b7842]">
              Nossa essência
            </span>

            <h2 className="text-3xl font-semibold leading-tight text-[#173d2b] md:text-4xl">
              Uma Igreja que acolhe, evangeliza e serve.
            </h2>

            <p className="mt-5 leading-relaxed text-gray-600">
              A vida paroquial é construída pela participação de
              pessoas que compartilham a mesma fé e o desejo de
              contribuir para uma comunidade cada vez mais fraterna.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-[#e9e2d2] bg-[#fffdf8] p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#173d2b]/10 text-[#173d2b]">
                <Heart size={28} />
              </div>

              <h3 className="mb-3 text-xl font-semibold text-[#173d2b]">
                Acolhimento
              </h3>

              <p className="leading-relaxed text-gray-600">
                Uma comunidade aberta ao encontro, à escuta e à
                fraternidade, onde cada pessoa é recebida com respeito
                e amor.
              </p>
            </div>

            <div className="rounded-3xl border border-[#e9e2d2] bg-[#fffdf8] p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d9c58a]/20 text-[#9b7842]">
                <BookOpen size={28} />
              </div>

              <h3 className="mb-3 text-xl font-semibold text-[#173d2b]">
                Evangelização
              </h3>

              <p className="leading-relaxed text-gray-600">
                A missão de anunciar o Evangelho e cultivar uma fé
                viva, fortalecida pela Palavra de Deus e pela vida
                sacramental.
              </p>
            </div>

            <div className="rounded-3xl border border-[#e9e2d2] bg-[#fffdf8] p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#173d2b]/10 text-[#173d2b]">
                <HandHeart size={28} />
              </div>

              <h3 className="mb-3 text-xl font-semibold text-[#173d2b]">
                Serviço
              </h3>

              <p className="leading-relaxed text-gray-600">
                A disposição de colocar os dons a serviço dos irmãos,
                promovendo a solidariedade e o cuidado com o próximo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#173d2b] p-10 text-white md:p-14">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full border border-white/10" />

            <div className="relative">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d9c58a]/15 text-[#d9c58a]">
                <Eye size={32} />
              </div>

              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.25em] text-[#d9c58a]">
                Nossa padroeira
              </span>

              <h2 className="mb-6 text-3xl font-semibold leading-tight md:text-4xl">
                Santa Luzia,
                <br />
                testemunho de fé e luz.
              </h2>

              <p className="leading-relaxed text-white/75">
                Santa Luzia é venerada na tradição católica como
                testemunha de fidelidade a Cristo. Seu testemunho
                inspira os cristãos a permanecerem firmes na fé,
                mesmo diante das dificuldades.
              </p>

              <p className="mt-5 leading-relaxed text-white/75">
                Sob sua proteção e inspiração, nossa comunidade
                encontra um convite permanente à oração, à esperança
                e à vivência do Evangelho.
              </p>
            </div>
          </div>

          <div>
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.25em] text-[#9b7842]">
              Inspirados pelo Evangelho
            </span>

            <h2 className="mb-6 text-3xl font-semibold leading-tight text-[#173d2b] md:text-4xl">
              Ser comunidade é caminhar juntos na fé.
            </h2>

            <p className="leading-relaxed text-gray-600">
              A caminhada cristã é vivida em comunidade. Na oração,
              nas celebrações, nos encontros e nas ações de serviço,
              somos chamados a construir relações de amor e comunhão.
            </p>

            <p className="mt-5 leading-relaxed text-gray-600">
              Cada fiel tem um papel importante nessa missão.
              A participação de todos fortalece a vida da Igreja
              e torna o testemunho do Evangelho presente no cotidiano.
            </p>

            <div className="mt-9 flex items-center gap-4 border-l-2 border-[#d9c58a] pl-5">
              <Cross className="shrink-0 text-[#9b7842]" size={25} />

              <p className="font-serif text-lg italic text-[#173d2b]">
                Fé que acolhe, esperança que une e amor que transforma.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e9e2d2] bg-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-[#e9e2d2] bg-[#fffdf8] p-8 text-center md:p-14">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#d9c58a]/20 text-[#9b7842]">
              <BookOpen size={30} />
            </div>

            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.25em] text-[#9b7842]">
              Nossa caminhada
            </span>

            <h2 className="mb-5 text-3xl font-semibold text-[#173d2b]">
              Uma história que continua sendo construída.
            </h2>

            <p className="mx-auto max-w-2xl leading-relaxed text-gray-600">
              Toda comunidade tem uma trajetória marcada por pessoas,
              encontros, celebrações e experiências de fé. Este espaço
              será dedicado a registrar a história da Paróquia Santa
              Luzia do Bom Futuro, sua origem e os momentos importantes
              de sua caminhada.
            </p>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#9b7842]">
              O conteúdo histórico oficial será acrescentado assim
              que as informações forem reunidas junto à comunidade.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#173d2b] px-6 py-20 text-center text-white md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#d9c58a]/40 bg-white/5 text-[#d9c58a]">
            <Sun size={30} />
          </div>

          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.25em] text-[#d9c58a]">
            Você faz parte desta comunidade
          </span>

          <h2 className="mb-6 text-3xl font-semibold leading-tight md:text-5xl">
            Nossa comunidade tem espaço para você.
          </h2>

          <p className="mx-auto max-w-2xl leading-relaxed text-white/75">
            Venha participar das celebrações, conhecer nossa
            comunidade e caminhar conosco na fé.
            Será uma alegria receber você!
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/missas"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d9c58a] px-7 py-4 text-sm font-semibold text-[#173d2b] transition hover:bg-[#ead9a7]"
            >
              Horários das missas
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/contato"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Como chegar
              <MapPin size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}


function PageContent({ page }: { page: string }) {
  if (page === 'noticias') {
    return (
      <div className="internal-content">
        <div className="empty-state">
          <CalendarDays size={42} />
          <h2>Em breve, novidades da nossa comunidade.</h2>
          <p>
            As notícias e comunicados oficiais serão publicados
            nesta página pela administração paroquial.
          </p>
        </div>
      </div>
    )
  }

  if (page === 'missas') {
    return (
      <div className="internal-content">
        <div className="info-card">
          <Church size={35} />
          <h2>Santa Missa</h2>
          <p>
            Os dias e horários oficiais das celebrações serão
            divulgados aqui.
          </p>
          <span className="status-label">
            <Clock3 size={15} /> Horários em atualização
          </span>
        </div>
      </div>
    )
  }

  if (page === 'dizimo') {
    return (
      <div className="internal-content">
        <div className="info-card donation-info-card">
          <Heart size={38} />
          <h2>Contribua com nossa missão</h2>
          <p>
            A paróquia já possui uma chave PIX para receber
            contribuições. Os dados oficiais e o QR Code serão
            disponibilizados nesta área após a configuração.
          </p>
          <span className="status-label">
            PIX disponível — cadastro em configuração
          </span>
        </div>
      </div>
    )
  }


  if (page === 'pastorais') {
    return (
      <div className="bg-[#fffdf8]">
        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf0e9] text-[#315b40]">
                <Users size={32} />
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9b7842]">
                Nossa missão
              </span>

              <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#173d2b] md:text-5xl">
                Muitos dons, uma só missão: servir e evangelizar.
              </h2>

              <p className="mt-6 text-base leading-relaxed text-gray-600 md:text-lg">
                A Igreja é construída pela participação de pessoas
                que colocam seus talentos, sua fé e seu tempo a
                serviço de Deus e dos irmãos.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: <Church size={28} />,
                  title: 'Vida litúrgica',
                  description:
                    'A participação na oração, nas celebrações e na vivência dos sacramentos fortalece a fé e a comunhão da comunidade.',
                },
                {
                  icon: <BookOpen size={28} />,
                  title: 'Formação e evangelização',
                  description:
                    'Anunciar o Evangelho, aprofundar o conhecimento da Palavra de Deus e ajudar outras pessoas a crescerem na fé.',
                },
                {
                  icon: <HandHeart size={28} />,
                  title: 'Serviço e solidariedade',
                  description:
                    'Colocar os dons a serviço do próximo, acolher quem precisa e construir uma comunidade mais fraterna e solidária.',
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-[#e9e2d2] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${index === 1
                        ? 'bg-[#f5f0e4] text-[#9b7842]'
                        : 'bg-[#eaf0e9] text-[#315b40]'
                      }`}
                  >
                    {item.icon}
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-[#173d2b]">
                    {item.title}
                  </h3>

                  <p className="leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#e9e2d2] bg-white px-6 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9b7842]">
                Faça parte
              </span>

              <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#173d2b] md:text-4xl">
                Existe um lugar para você em nossa comunidade.
              </h2>

              <p className="mt-6 leading-relaxed text-gray-600">
                Cada pessoa tem dons e talentos que podem contribuir
                para a missão da Igreja. Participar de uma pastoral,
                movimento ou serviço é uma oportunidade de crescer
                na fé, fazer novas amizades e ajudar a transformar
                vidas.
              </p>

              <p className="mt-5 leading-relaxed text-gray-600">
                Se você deseja conhecer as atividades pastorais
                ou descobrir como participar, entre em contato
                conosco. Será uma alegria acolher você!
              </p>

              <a
                href="https://wa.me/5591983794121?text=Ol%C3%A1!%20Paz%20e%20bem!%20Gostaria%20de%20conhecer%20as%20pastorais%20e%20formas%20de%20participar%20da%20Par%C3%B3quia%20Santa%20Luzia%20do%20Bom%20Futuro."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#315b40] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#173d2b]"
              >
                Quero participar
                <MessageCircle size={19} />
              </a>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-[#dce7dc] bg-[#edf3ed] p-10 text-[#173d2b] md:p-14">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-[#315b40]/10" />
              <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full border border-[#315b40]/10" />

              <div className="relative">
                <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#315b40] shadow-sm">
                  <Heart size={32} />
                </div>

                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9b7842]">
                  Comunidade em missão
                </span>

                <h3 className="mt-5 text-3xl font-semibold leading-tight md:text-4xl">
                  Servir é uma forma de amar.
                </h3>

                <p className="mt-6 leading-relaxed text-gray-600">
                  Quando cada pessoa oferece um pouco de si,
                  toda a comunidade cresce. A missão de evangelizar
                  é responsabilidade de todos nós.
                </p>

                <div className="mt-8 border-l-2 border-[#d9c58a] pl-5">
                  <p className="font-serif text-lg italic text-[#315b40]">
                    Fé que se transforma em serviço e amor ao próximo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }


  if (page === 'galeria') {
    return (
      <div className="internal-content">
        <div className="empty-state">
          <Images size={42} />
          <h2>Nossos registros e celebrações.</h2>
          <p>
            Em breve, você poderá acompanhar os registros
            fotográficos da nossa comunidade.
          </p>
        </div>
      </div>
    )
  }



  if (page === 'contato') {
    const endereco =
      'R. Wh-8, 1-99 - Parque Verde, Belém - PA, 66633-630'

    const mapa =
      'https://www.google.com/maps/place/Par%C3%B3quia+Santa+Luzia+do+Bom+Futuro/@-1.3688296,-48.4396789,18.75z/data=!4m6!3m5!1s0x92a461d4cfdc3283:0x262032cb7b7118ec!8m2!3d-1.368678!4d-48.4394465!16s%2Fg%2F11bzzzcm1m'

    const mapaEmbed =
      'https://www.google.com/maps?q=-1.368678,-48.4394465&z=17&output=embed'

    const redesSociais = [
      {
        title: 'WhatsApp',
        description: 'Fale diretamente com nossa equipe de atendimento.',
        detail: '(91) 98379-4121',
        href: 'https://wa.me/5591983794121',
        icon: siWhatsapp,
        color: 'bg-[#e8f7ed]',
        iconColor: '#25D366',
      },
      {
        title: 'Instagram',
        description: 'Acompanhe nossas celebrações, atividades e comunicados.',
        detail: '@paroquiasantaluziabomfuturo',
        href: 'https://www.instagram.com/paroquiasantaluziabomfuturo/',
        icon: siInstagram,
        color: 'bg-[#fbeaf0]',
        iconColor: '#E1306C',
      },
      {
        title: 'Facebook',
        description: 'Fique por dentro das novidades e publicações da nossa paróquia.',
        detail: 'Acessar nossa página',
        href: 'https://www.facebook.com/profile.php?id=61554055960689',
        icon: siFacebook,
        color: 'bg-[#eaf1ff]',
        iconColor: '#1877F2',
      },
    ]

    return (
      <div className="bg-[#fffdf8]">
        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf0e9] text-[#315b40]">
                <MessageCircle size={32} />
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9b7842]">
                Estamos à sua disposição
              </span>

              <h2 className="mt-4 text-3xl font-semibold text-[#173d2b] md:text-5xl">
                Será uma alegria falar com você.
              </h2>

              <p className="mt-5 leading-relaxed text-gray-600">
                Entre em contato, acompanhe nossas redes sociais
                ou venha nos visitar. Nossa comunidade está de
                portas abertas para acolher você.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {redesSociais.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-3xl border border-[#e9e2d2] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="29"
                      height="29"
                      fill={item.iconColor}
                      role="img"
                      aria-label={item.title}
                    >
                      <path d={item.icon.path} />
                    </svg>
                  </div>

                  <h3 className="text-xl font-semibold text-[#173d2b]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {item.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#315b40]">
                    {item.detail}
                    <ExternalLink size={15} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#e9e2d2] bg-white px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9b7842]">
                  Como chegar
                </span>

                <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#173d2b] md:text-4xl">
                  Venha nos visitar!
                </h2>

                <p className="mt-5 leading-relaxed text-gray-600">
                  Será uma alegria receber você em nossa
                  comunidade para compartilhar momentos de fé,
                  oração e fraternidade.
                </p>

                <div className="mt-8 flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eaf0e9] text-[#315b40]">
                    <MapPin size={24} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#173d2b]">
                      Endereço
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {endereco}
                    </p>
                  </div>
                </div>

                <a
                  href={mapa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#315b40] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#173d2b]"
                >
                  Como chegar
                  <ArrowUpRight size={18} />
                </a>
              </div>

              <div className="overflow-hidden rounded-3xl border border-[#e9e2d2] bg-[#f2f0e8] shadow-sm">
                <iframe
                  src={mapaEmbed}
                  title="Localização da Paróquia Santa Luzia do Bom Futuro no Google Maps"
                  width="100%"
                  height="430"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#dce7dc] bg-[#edf3ed] px-6 py-16 text-center">
          <div className="mx-auto max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9b7842]">
              Paróquia Santa Luzia do Bom Futuro
            </span>

            <h2 className="mt-4 text-3xl font-semibold text-[#173d2b] md:text-4xl">
              Esperamos por você!
            </h2>

            <p className="mt-5 leading-relaxed text-gray-600">
              Que a paz de Cristo esteja em seu lar.
              Conte conosco e faça parte da nossa comunidade.
            </p>

            <a
              href="https://wa.me/5591983794121"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#315b40] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#173d2b]"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d={siWhatsapp.path} />
              </svg>

              Fale conosco
            </a>
          </div>
        </section>
      </div>
    )
  }



  return null
}


export default function InstitutionalPage() {
  const { page } = useParams()
  const data = page ? pages[page] : undefined

  if (!data || !page) {
    return (
      <>
        <Header />
        <section className="not-found">
          <h1>404</h1>
          <p>Esta página não foi encontrada.</p>
          <Link to="/" className="button-primary">
            Voltar ao início <ArrowRight size={17} />
          </Link>
        </section>
        <Footer />
      </>
    )
  }

  if (page === 'paroquia') {
    return (
      <>
        <Header />
        <SEO
          title={data.title}
          description={data.description}
        />

        <section className="internal-hero">
          <div className="internal-hero-content">
            <span className="section-eyebrow">{data.eyebrow}</span>
            <h1>{data.title}</h1>
            <p>{data.subtitle}</p>

            <div className="breadcrumb">
              <Link to="/">Início</Link>
              <span>/</span>
              <span>{data.eyebrow}</span>
            </div>
          </div>
        </section>

        <ParoquiaContent />

        <div className="internal-back">
          <Link to="/" className="text-link">
            <ArrowRight size={17} /> Voltar à página inicial
          </Link>
        </div>

        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      <section className="internal-hero">
        <div className="internal-hero-content">
          <span className="section-eyebrow">{data.eyebrow}</span>
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>

          <div className="breadcrumb">
            <Link to="/">Início</Link>
            <span>/</span>
            <span>{data.eyebrow}</span>
          </div>
        </div>
      </section>

      <section className="internal-intro">
        <div>
          <span className="section-eyebrow">
            SANTA LUZIA DO BOM FUTURO
          </span>
          <h2>{data.subtitle}</h2>
          <p>{data.description}</p>
        </div>
      </section>

      <PageContent page={page} />

      <div className="internal-back">
        <Link to="/" className="text-link">
          <ArrowRight size={17} /> Voltar à página inicial
        </Link>
      </div>

      <Footer />
    </>
  )
}