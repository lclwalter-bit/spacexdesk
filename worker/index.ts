export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)
    if (!url.pathname.startsWith('/api/yahoo')) {
      return new Response('Not found', { status: 404 })
    }

    const yahooPath = url.pathname.replace(/^\/api\/yahoo/, '') || '/'
    const upstream = await fetch(
      `https://query1.finance.yahoo.com${yahooPath}${url.search}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SPCXDesk/1.0)',
          Accept: 'application/json',
        },
      },
    )

    const body = await upstream.arrayBuffer()
    return new Response(body, {
      status: upstream.status,
      headers: {
        'Content-Type':
          upstream.headers.get('content-type') || 'application/json',
        'Cache-Control': 'public, max-age=15',
      },
    })
  },
}
