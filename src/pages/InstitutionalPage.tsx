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
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const pages: Record<string, {
  eyebrow: string
  title: string
  subtitle: string
  description: string
}> = {
  paroquia: {
    eyebrow: 'NOSSA IDENTIDADE',
    title: 'Uma história de fé e comunidade.',
    subtitle: 'Conheça a Paróquia Santa Luzia do Bom Futuro.',
    description:
      'Nossa comunidade é um espaço de acolhida, evangelização, oração e serviço. Em breve, apresentaremos aqui a história da nossa paróquia, sua caminhada pastoral e os momentos que marcaram sua trajetória.',
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
      <div className="internal-content">
        <div className="info-card">
          <Users size={38} />
          <h2>Nossa comunidade em missão</h2>
          <p>
            Em breve, apresentaremos as pastorais, movimentos,
            serviços e grupos que fazem parte da vida paroquial.
          </p>
        </div>
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

  if (page === 'paroquia') {
    return (
      <div className="internal-content history-content">
        <BookOpen size={38} />
        <h2>Nossa história será contada aqui.</h2>
        <p>
          Estamos preparando um espaço especial para apresentar
          a história da Paróquia Santa Luzia do Bom Futuro,
          sua fundação, seus momentos importantes e sua caminhada
          de fé.
        </p>
        <p>
          O conteúdo histórico oficial será acrescentado
          posteriormente.
        </p>
      </div>
    )
  }

  if (page === 'contato') {
    return (
      <div className="internal-content">
        <div className="info-card contact-info-card">
          <MapPin size={38} />
          <h2>Visite nossa paróquia</h2>
          <p>
            R. Wh-8, 1-99 - 1-99, Parque Verde,
            Belém - PA, 66633-630.
          </p>
          <a
            className="button-primary"
            href="https://www.google.com/maps/search/?api=1&query=R.+Wh-8%2C+Parque+Verde%2C+Bel%C3%A9m+-+PA"
            target="_blank"
            rel="noreferrer"
          >
            Abrir no Google Maps <ArrowUpRight size={17} />
          </a>
        </div>
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
          <span className="section-eyebrow">SANTA LUZIA DO BOM FUTURO</span>
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
