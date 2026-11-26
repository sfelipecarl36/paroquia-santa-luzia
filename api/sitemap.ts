
import { createClient } from '@supabase/supabase-js'

const SITE_URL = 'https://www.paroquiasantaluziadobomfuturo.com'

const paginasInstitucionais = [
  '/',
  '/paroquia',
  '/noticias',
  '/missas',
  '/doacoes',
  '/galeria',
  '/pastorais',
  '/contato',
]

function escaparXML(valor: string) {
  return valor
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function formatarData(data: string | null) {
  if (!data) return ''

  const dataValida = new Date(data)

  if (Number.isNaN(dataValida.getTime())) return ''

  return dataValida.toISOString().split('T')[0]
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).send('Método não permitido')
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).send('Configuração do Supabase não encontrada.')
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  const agora = new Date().toISOString()

  const { data: noticias, error } = await supabase
    .from('noticias')
    .select('slug, publicada_em, updated_at')
    .eq('status', 'publicada')
    .not('publicada_em', 'is', null)
    .lte('publicada_em', agora)
    .order('publicada_em', { ascending: false })

  if (error) {
    console.error('Erro ao gerar sitemap:', error)
    return res.status(500).send('Não foi possível gerar o sitemap.')
  }

  const urlsInstitucionais = paginasInstitucionais
    .map((pagina) => {
      return `  <url>
    <loc>${SITE_URL}${pagina}</loc>
  </url>`
    })
    .join('\n')

  const urlsNoticias = (noticias || [])
    .filter((noticia) => noticia.slug)
    .map((noticia) => {
      const slug = escaparXML(noticia.slug)
      const data = formatarData(
        noticia.updated_at || noticia.publicada_em
      )

      return `  <url>
    <loc>${SITE_URL}/noticias/${slug}</loc>
    ${data ? `<lastmod>${data}</lastmod>` : ''}
  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsInstitucionais}
${urlsNoticias}
</urlset>`

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')

  return res.status(200).send(xml)
}
