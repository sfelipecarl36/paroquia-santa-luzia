import { createClient } from '@supabase/supabase-js'

const SITE_URL = 'https://www.paroquiasantaluziadobomfuturo.com'
const NOME_SITE = 'Paróquia Santa Luzia do Bom Futuro'
const IMAGEM_PADRAO = `${SITE_URL}/images/brasao-paroquia.png`

function escaparHTML(valor: string) {
  return valor
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function gerarHTML(dados: {
  titulo: string
  descricao: string
  imagem: string
  url: string
  publicadaEm?: string | null
}) {
  const titulo = escaparHTML(dados.titulo)
  const descricao = escaparHTML(dados.descricao)
  const imagem = escaparHTML(dados.imagem)
  const url = escaparHTML(dados.url)
  const publicadaEm = dados.publicadaEm
    ? escaparHTML(dados.publicadaEm)
    : ''

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>${titulo} | ${NOME_SITE}</title>
  <meta name="description" content="${descricao}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${url}">

  <meta property="og:type" content="article">
  <meta property="og:site_name" content="${NOME_SITE}">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:title" content="${titulo} | ${NOME_SITE}">
  <meta property="og:description" content="${descricao}">
  <meta property="og:image" content="${imagem}">
  <meta property="og:image:alt" content="${titulo}">
  <meta property="og:url" content="${url}">
  ${publicadaEm ? `<meta property="article:published_time" content="${publicadaEm}">` : ''}

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${titulo} | ${NOME_SITE}">
  <meta name="twitter:description" content="${descricao}">
  <meta name="twitter:image" content="${imagem}">

  <meta http-equiv="refresh" content="0;url=${url}">
</head>
<body>
  <p>Redirecionando para a notícia...</p>
  <a href="${url}">Acessar notícia</a>
</body>
</html>`
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).send('Método não permitido')
  }

  const slug = Array.isArray(req.query.slug)
    ? req.query.slug[0]
    : req.query.slug

  if (!slug || typeof slug !== 'string') {
    return res.status(400).send('Notícia não informada.')
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

  const { data: noticia, error } = await supabase
    .from('noticias')
    .select('titulo, slug, resumo, imagem_capa, publicada_em')
    .eq('slug', slug)
    .eq('status', 'publicada')
    .not('publicada_em', 'is', null)
    .lte('publicada_em', new Date().toISOString())
    .maybeSingle()

  if (error) {
    console.error('Erro ao buscar notícia para compartilhamento:', error)
    return res.status(500).send('Não foi possível carregar a notícia.')
  }

  if (!noticia) {
    return res.status(404).send('Notícia não encontrada.')
  }

  const titulo = noticia.titulo || NOME_SITE
  const descricao =
    noticia.resumo ||
    `Confira esta notícia da ${NOME_SITE}, em Belém do Pará.`

  const imagem = noticia.imagem_capa || IMAGEM_PADRAO
  const url = `${SITE_URL}/noticias/${encodeURIComponent(noticia.slug)}`

  const html = gerarHTML({
    titulo,
    descricao,
    imagem,
    url,
    publicadaEm: noticia.publicada_em,
  })

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=3600'
  )

  return res.status(200).send(html)
}
