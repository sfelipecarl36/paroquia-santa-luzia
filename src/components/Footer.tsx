
import { Link } from 'react-router-dom'
import { MapPin, ExternalLink } from 'lucide-react'
import {
  siInstagram,
  siFacebook,
  siWhatsapp,
} from 'simple-icons'

function BrandIcon({
  path,
  color,
  label,
}: {
  path: string
  color: string
  label: string
}) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill={`#${color}`}
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path d={path} />
    </svg>
  )
}

export default function Footer() {
  const endereco =
    'R. Wh-8, 1-99 - Parque Verde, Belém - PA, 66633-630'

  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <Link to="/" className="footer-brand">
            <img
              src="/images/brasao-paroquia.png"
              alt="Brasão da paróquia"
            />

            <span>
              <strong>PARÓQUIA</strong>
              <b>Santa Luzia</b>
              <small>DO BOM FUTURO</small>
            </span>
          </Link>

          <p style={{ marginTop: '20px' }}>
            Uma comunidade de fé, esperança e amor.
            Caminhando juntos na missão de evangelizar.
          </p>
        </div>

        <div className="footer-links">
          <strong>NAVEGAÇÃO</strong>

          <Link to="/paroquia">Nossa Paróquia</Link>
          <Link to="/noticias">Notícias</Link>
          <Link to="/missas">Horários das Missas</Link>
          <Link to="/doacoes">Dízimo e Doações</Link>
          <Link to="/pastorais">Pastorais</Link>
          <Link to="/contato">Contato</Link>
        </div>

        <div className="footer-links">
          <strong>ENCONTRE-NOS</strong>

          <a
            href="https://www.google.com/maps/place/Par%C3%B3quia+Santa+Luzia+do+Bom+Futuro/@-1.3688296,-48.4396789,18.75z/data=!4m6!3m5!1s0x92a461d4cfdc3283:0x262032cb7b7118ec!8m2!3d-1.368678!4d-48.4394465!16s%2Fg%2F11bzzzcm1m"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={15} />
            <span>{endereco}</span>
          </a>

          <a
            href="https://wa.me/5591983794121"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BrandIcon
              path={siWhatsapp.path}
              color="25D366"
              label="WhatsApp"
            />
            <span>(91) 98379-4121</span>
            <ExternalLink size={13} />
          </a>

          <a
            href="https://www.instagram.com/paroquiasantaluziabomfuturo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BrandIcon
              path={siInstagram.path}
              color="E1306C"
              label="Instagram"
            />
            <span>@paroquiasantaluziabomfuturo</span>
            <ExternalLink size={13} />
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61554055960689"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BrandIcon
              path={siFacebook.path}
              color="1877F2"
              label="Facebook"
            />
            <span>Facebook oficial</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Paróquia Santa Luzia do Bom Futuro.
        </span>

        <span>Todos os direitos reservados.</span>
      </div>
    </footer>
  )
}
