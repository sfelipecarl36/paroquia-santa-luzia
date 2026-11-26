
import { useLocation } from 'react-router-dom'
import { siWhatsapp } from 'simple-icons'

export default function WhatsAppButton() {
  const location = useLocation()

  if (location.pathname.startsWith('/admin')) {
    return null
  }

  const telefone = '5591983794121'

  const mensagem =
    'Olá! Paz e bem! Gostaria de entrar em contato com a Paróquia Santa Luzia do Bom Futuro para tirar uma dúvida. Poderiam me ajudar, por favor?'

  const linkWhatsApp = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`

  return (
    <a
      href={linkWhatsApp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale com a Paróquia Santa Luzia pelo WhatsApp"
      title="Fale conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-900/20 transition duration-300 hover:scale-110 hover:bg-[#1ebe5d] focus:outline-none focus:ring-4 focus:ring-green-200 md:bottom-8 md:right-8 md:h-16 md:w-16"
    >
      <svg
        viewBox="0 0 24 24"
        width="30"
        height="30"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={siWhatsapp.path} />
      </svg>

      <span className="absolute -left-2 -top-1 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
        <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-green-500" />
      </span>
    </a>
  )
}
