import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Heart, ChevronRight } from 'lucide-react'

const links = [
  { label: 'Início', path: '/' },
  { label: 'A Paróquia', path: '/paroquia' },
  { label: 'Notícias', path: '/noticias' },
  { label: 'Missas', path: '/missas' },
  { label: 'Dízimo e Doações', path: '/dizimo' },
  { label: 'Pastorais', path: '/pastorais' },
  { label: 'Galeria', path: '/galeria' },
  { label: 'Contato', path: '/contato' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img
            src="/images/brasao-paroquia.png"
            alt="Brasão paroquial"
            className="brand-logo"
          />

          <span className="brand-name">
            <strong>PARÓQUIA</strong>
            <span>Santa Luzia</span>
            <small>DO BOM FUTURO</small>
          </span>
        </Link>

        <nav className="desktop-nav">
          {links.map((item) => (
            <Link key={item.path} to={item.path}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link to="/dizimo" className="header-donation">
          <Heart size={16} />
          Contribua
        </Link>

        <button
          className="mobile-menu-button"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="mobile-nav" id="mobile-navigation">
          {links.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
            >
              {item.label}
              <ChevronRight size={17} />
            </Link>
          ))}

          <Link
            to="/dizimo"
            className="mobile-donation"
            onClick={() => setOpen(false)}
          >
            <Heart size={16} />
            Contribua
          </Link>
        </nav>
      )}
    </header>
  )
}
