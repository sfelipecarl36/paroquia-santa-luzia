import { Link } from 'react-router-dom'
import { Camera, MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <Link to="/" className="footer-brand">
            <img src="/images/brasao-paroquia.png" alt="" />
            <span>
              <strong>PARÓQUIA</strong>
              <b>Santa Luzia</b>
              <small>DO BOM FUTURO</small>
            </span>
          </Link>

          <p style={{marginTop:"20px"}}>
            Uma comunidade de fé, esperança e amor.
            Caminhando juntos na missão de evangelizar.
          </p>
        </div>

        <div className="footer-links">
          <strong>NAVEGAÇÃO</strong>
          <Link to="/paroquia">Nossa Paróquia</Link>
          <Link to="/noticias">Notícias</Link>
          <Link to="/missas">Horários das Missas</Link>
          <Link to="/dizimo">Dízimo e Doações</Link>
          <Link to="/contato">Contato</Link>
        </div>

        <div className="footer-links">
          <strong>ENCONTRE-NOS</strong>
          <span><MapPin size={15} /> Parque Verde, Belém – PA</span>
          <span><Phone size={15} /> Telefone em atualização</span>
          <span><Mail size={15} /> E-mail em atualização</span>
          <a href="#instagram"><Camera size={15} /> Instagram oficial</a>
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
